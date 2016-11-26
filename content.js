
//retrieve pikachu settings & set defaults

var storage = chrome.storage.local;
var mpf, ppf, maxInt;
var obj = {};


storage.get(["ppf", "mpf", "maxInt"], function(items) {

 ppf = items.ppf; //pixels of movement per frame
 mpf = items.mpf; //milliseconds per frame
 maxInt = items.maxInt; //i.e. 1 out of maxInt chance of appearing
 
 if (ppf == undefined) {  
  ppf = 40;
  mpf = 120;
  obj.ppf = ppf;
  obj.mpf = mpf;
  storage.set(obj);
 }
 
 if (maxInt == undefined) {
  maxInt = 4;
  obj.maxInt = maxInt;
  storage.set(obj);
 }
 
 maybe_run_script(maxInt, ppf, mpf); 
 
});







//-----FUNCTIONS----------------------------------------------------------

//run script based on % chance

function maybe_run_script(maxInt, ppf, mpf) {

 //testing stored vals
 //console.log("there is a one out of " + maxInt + " chance that pika will come out.");
 //console.log("Pika will move " + ppf + " pixels per frame every " + mpf + " milliseconds.");


 var num = Math.floor(Math.random() * maxInt) + 1;
  if (num == 2) {
  
   //extra timeout on DOM load
   setTimeout(function() {
    runScript(ppf, mpf);
   }, 300);
  }
}





function runScript(ppf, mpf) {

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
   var walking = setInterval(next_frame, mpf);
   var pikaOffscreen = false;
   }
  pika.src = chrome.extension.getURL("images/spritesheet.png"); 
  
  
  //var walking = setInterval(next_frame, mpf);
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
   pointX += ppf;
  
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
