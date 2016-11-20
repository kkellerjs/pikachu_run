

//retrieve on/off setting

chrome.storage.local.get("onOff", function(data) {

	//if nothing set, set to on
	if (data.onOff == undefined) {
	 chrome.storage.local.set({"onOff": "on"}, function(){});
	 maybe_run_script();
	}

    if(data.onOff === "on") {
     maybe_run_script();
    }
    
});




//   1/3 chance of pika coming out

function maybe_run_script() {
 var num = Math.floor(Math.random() * 3) + 1;
  if (num == 2) {
   //timeout for DOM load
   setTimeout(runScript, 300);
  }
}




function runScript() {

	//append a canvas to the body
	var canvasDiv = document.createElement("div");
	canvasDiv.innerHTML = "<div id='div1'><canvas id='canvas'></canvas></div>";
	document.body.insertBefore(canvasDiv, document.body.firstChild);
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.style.position = "absolute";
	ctx.canvas.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	ctx.canvas.height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	canvas.style.pointerEvents = "none";

	//pika size
	var frameWidth = 55;
	var frameHeight = 40;

	//pika position on sprite sheet
	var imageX = 6;
	var imageY = 160;


	//pika position on screen
	var pointX = 0;
	var pointY = Math.floor(Math.random() * (ctx.canvas.height-(frameHeight+10))) + (frameHeight+10);



	 walk_pika();



//............FUNCTIONS........................................



 //---------------------------------
 function walk_pika() {

  //create 1st image
  var pika = new Image();
  pika.onload = function() {
  ctx.drawImage(pika, imageX, imageY, frameWidth, frameHeight, pointX, pointY, frameWidth, frameHeight);
   }
  pika.src = chrome.extension.getURL("spritesheet.png"); 
  
  
  var walking = setInterval(next_frame, 90);
  var pikaOffscreen = false;
  
  //check 3 times to see if offscreen, then clear interval
  var checkHeGone = setTimeout(clear_all, 3000);
  var checkHeGone2 = setTimeout(clear_all, 5000);
  var checkHeGone3 = setTimeout(clear_all, 10000);
  
  //---------------------------------
  function next_frame() {
   
   if (imageX == 175.5) {
    imageX = 6;
   } else {
    imageX+=56.5;
   }
   pointX += 10;
  
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.drawImage(pika, imageX, imageY, frameWidth, frameHeight, pointX, pointY, frameWidth, frameHeight);
  }
  
  //---------------------------------
  //when pika is offscreen, clear interval & delete canvas
  
  function clear_all() {
   if (pointX > ctx.canvas.width && !pikaOffscreen) {
    pikaOffscreen = true;
    clearInterval(walking);
    canvasDiv.innerHTML = "";
   }
  } 

  }//---------------------------------
  
  
  
} //---------------------------