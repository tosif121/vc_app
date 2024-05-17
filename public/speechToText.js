let agentsocket = new WebSocket("wss://devapp.iotcom.io/socket");
let customersocket = new WebSocket("wss://devapp.iotcom.io/socket");

const recgtext = document.getElementById("agentText");
const recgtext1 = document.getElementById("customerText");
var agentmediaRecorder;
var customermediaRecorder;
let agentText="";
let customerText = "";

agentsocket.onmessage = (msg) => {
  //console.log(JSON.parse(msg.data));
 const text = JSON.parse(msg.data);
 //console.log("fixed text",agentText);
  //recgtext.value = agentText + text.data;
 // console.log(text.isFixed);
  if(text.isFixed === "true" || text.isFixed === true){
    agentText = agentText + text.data;
    recgtext.value = agentText ;
   // console.log("new final Data", text.data);
   // console.log('Updated agentText:', agentText);
  }else{
    recgtext.value = agentText + text.data;
  }

};

customersocket.onmessage = (msg) => {
    //console.log(JSON.parse(msg.data));
   const text = JSON.parse(msg.data);
   //console.log("fixed text",agentText);
    //recgtext.value = agentText + text.data;
   // console.log(text.isFixed);
    if(text.isFixed === "true" || text.isFixed === true){
        customerText = customerText + text.data;
      recgtext.value = customerText ;
     // console.log("new final Data", text.data);
     // console.log('Updated agentText:', agentText);
    }else{
      recgtext.value = customerText + text.data;
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