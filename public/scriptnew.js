let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e)=>{
 let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
 arrowParent.classList.toggle("showMenu");
  });
}

// let sidebar = document.querySelector(".sidebar");
// let sidebarBtn = document.querySelector(".bx-menu");
// console.log(sidebarBtn);
// sidebarBtn.addEventListener("click", ()=>{
//   sidebar.classList.toggle("close");
// });
// window.addEventListener('beforeunload', function(event) {
//   // Cancel the event
//   event.preventDefault();
//   // Chrome requires returnValue to be set
//   event.returnValue = '';

//   // Show alert message
//   return('Are you sure you want to refresh the page?');
// });





// const toggleBtn = document.querySelector('.toggle-btn');
// const sidebar = document.querySelector('.sidebar');

// toggleBtn.addEventListener('click', () => {
//     sidebar.classList.toggle('close');
    
// });


 dragElement(document.getElementById("mydiv"));

 function dragElement(elmnt) {
   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
   if (document.getElementById(elmnt.id + "header")) {
     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
     document.getElementById(elmnt.id + "header").addEventListener("touchstart", touchStart, { passive: false });
   } else {
     elmnt.onmousedown = dragMouseDown;
     elmnt.addEventListener("touchstart", touchStart, { passive: false });
   }

   function dragMouseDown(e) {
     e = e || window.event;
     e.preventDefault();
     // get the mouse cursor position at startup:
     pos3 = e.clientX;
     pos4 = e.clientY;
     document.onmouseup = closeDragElement;
     // call a function whenever the cursor moves:
     document.onmousemove = elementDrag;
   }

   function elementDrag(e) {
     e = e || window.event;
     e.preventDefault();
     // calculate the new cursor position:
     pos1 = pos3 - e.clientX;
     pos2 = pos4 - e.clientY;
     pos3 = e.clientX;
     pos4 = e.clientY;
     // set the element's new position:
     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
   }

   function closeDragElement() {
     // stop moving when the mouse button is released:
     document.onmouseup = null;
     document.onmousemove = null;
   }
  
   function touchStart(e) {
     // Get the initial touch position
     var touch = e.touches[0];
     pos3 = touch.clientX;
     pos4 = touch.clientY;
     elmnt.addEventListener("touchmove", touchMove, { passive: false });
     elmnt.addEventListener("touchend", touchEnd);
   }
  
   function touchMove(e) {
     e.preventDefault();
     var touch = e.touches[0];
     // calculate the new touch position
     pos1 = pos3 - touch.clientX;
     pos2 = pos4 - touch.clientY;
     pos3 = touch.clientX;
     pos4 = touch.clientY;
     // set the element's new position
     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  
   function touchEnd() {
     elmnt.removeEventListener("touchmove", touchMove);
     elmnt.removeEventListener("touchend", touchEnd);
   }
 }



