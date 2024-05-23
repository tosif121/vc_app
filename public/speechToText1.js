var audioArray =[];
let customersocket = new WebSocket("wss://devapp.iotcom.io/socket");

var isrequseted = false ;
const recgtext1 = document.getElementById("customerText");

var customermediaRecorder;

let customerText = "";



customersocket.onmessage = (msg) => {
    //console.log(JSON.parse(msg.data));
    const user = document.getElementById('username').value;
   const text = JSON.parse(msg.data);
   console.log("answer line no 16",text.answer);
   //console.log("fixed text",agentText);
    //recgtext.value = agentText + text.data;
   // console.log(text.isFixed);
    if(text.isFixed === "true" || text.isFixed === true){
        customerText = customerText + text.data;
      recgtext1.value = customerText ;
     // console.log("new final Data", text.data);
     // console.log('Updated agentText:', agentText);
     if(text.answer.fileName){
        botplayrequest(user,text.answer.fileName);
     }
    }else{
      recgtext1.value = customerText + text.data;
    }
  
  };



 function startspeechToText(stream,mediaRecorder,websocket){
  mediaRecorder = new MediaRecorder(stream, {
    //audioBitsPerSecond: 8000 * 16,
    mimeType: "audio/webm;codecs=opus",
  });
  mediaRecorder.ondataavailable = (event) => {
    //console.log(event);
    if (event.data.size > 0) {
     // console.log(event.data);
      websocket.send(event.data);
      //socket.send(JSON.stringify({'video': event.data}));
      //chunks.push(event.data);
    }
  };

  mediaRecorder.onstop = async () => {
    const Tracks = await stream.getAudioTracks();
    console.log(Tracks);
    Tracks.forEach((track) => {
      console.log(track.getSettings());
      track.stop();
    });

  };

  mediaRecorder.start(1000);
}

 function stopSpeechTotext(mediaRecorder,websocket){
  mediaRecorder.stop();
  //websocket.close(1000, "Closing connection gracefully");
  websocket.send(JSON.stringify("streamClose"));
}


async function botplayrequest(user,sound){
    if(isrequseted==false){
          isrequseted = true;
    const url = `/reqPlayBot/${user}`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //"Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify({
        sound: "file1716213415570.slin24",
      }),
    })
      .then((response) => {
       

        return response.json();
      })
      .then((data) => {
        
          console.log(data.message);
          isrequseted = false;
        
      })
      .catch((error) => {
        console.error('Error sending request to playBot:', error);
      });
  
    }{
        // not to do anything
    }


}