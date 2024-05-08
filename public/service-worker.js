const liveInterval = 1000; // 1 seconds in milliseconds
 setInterval(connectioncheck, liveInterval);

 async function connectioncheck() {
    if (userlogin === true) {
      const user = document.getElementById('username').value;
      try {
        const response = await Promise.race([
          fetch('/userconnection', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user }),
          }),
          new Promise((_, reject) => {
            // Create a timer that rejects after 3 seconds
            setTimeout(() => {
              //  console.log("timeout code");
              reject(new Error('Timeout')); // Timeout after 3 seconds
            }, 3000); // 3 seconds in milliseconds
          }),
        ]);

        if (response.status === 401) {
          // Unauthorized response handling: redirect to index page or handle as needed
          window.location.href = '/index.html'; // Replace with your index page URL
        } else {
          const data = await response.json();
          // console.log("line no 2348",data.message);
          if (data.message === 'ok connection for user') {
            // empty timeout array for short conn. problem
            timeoutarray = [];
          } else if (data.message == 'poor connection problem ,please login again') {
            console.log('connection problem block need to alert');
            alert(data.message);
            userlogin = false;
            logoutfunction();
            //window.location.href = `/forcelogout/${user}`;
          } else {
            console.log('other block');
            // Handle other cases as needed
          }
        }
      } catch (err) {
        if (err.message === 'Timeout') {
          // Handle the timeout case
          const timeout = { timeout: true };
          timeoutarray.push(timeout);
          if (timeoutarray.length > 2) {
            alert('Connection problem: The request timed out');
          } else {
            console.log('slight connection problem');
          }
        } else {
          console.log('Error in connection check function', err);
        }
      }
    }
  }
