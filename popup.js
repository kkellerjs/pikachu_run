var storage = chrome.storage.local;
var obj = {};


//retrieve & populate settings -------------------------

storage.get(["ppf", "maxInt"], function(items) {

var defSpeed = items.ppf;
var maxInt = items.maxInt;

if (defSpeed == 40 || defSpeed == undefined) { 
  select_icon(document.getElementById("fast"));
} else {
  select_icon(document.getElementById("slow"));
}


//de-translate frequency value into range points
var sliderValue;

switch(maxInt) {
 case 100: sliderValue = "1"; break;
 case 10: sliderValue = "11"; break;
 case 4: sliderValue = "21"; break;
 case 2: sliderValue = "31"; break;
 //in case of initial load not firing content script first--set at 25%
 default: sliderValue = "21"; break;
}

update_slider(sliderValue);

});







//click events---------------------------------------

var speeds = document.getElementsByClassName("poke-pic");
for (var i = 0; i < speeds.length; i++) {
 speeds[i].onclick = function() {
   select_icon(this);
 }
}


var slider = document.getElementById("slider");
var freqText = document.getElementById("category");
slider.onchange = function() {
  update_slider(this.value);
}








//functions -----------------------------------------

function select_icon(elem) {

 //remove styles
 var speeds = document.getElementsByClassName("poke-pic");
 speeds[0].classList.remove("selected");
 speeds[1].classList.remove("selected");
 speeds[0].parentElement.style.color = "#DCDCC6";
 speeds[1].parentElement.style.color = "#DCDCC6";
 
 //apply styles
 elem.classList.add("selected");
 elem.parentElement.style.color = "#009933";

 //store speed
 if (elem.id == "fast") {
   obj.ppf = 40;
   obj.mpf = 120;
   storage.set(obj);
  } 
  
  if (elem.id == "slow") {
   obj.ppf = 15;
   obj.mpf = 95;
   storage.set(obj);
  }
  
}





function update_slider(val) {
  
  var maxInt, freq, opac;
  switch(val) {
   
    //translate preset values into what they actually represent
    case "1": freq = 1; maxInt = 100; opac = 0.4; break;
    case "11": freq = 10; maxInt = 10; opac = 0.6; break;
    case "21": freq = 25; maxInt = 4; opac = 0.7; break;
    case "31": freq = 50; maxInt = 2; opac = 0.8; break;
    
  }
  
  //store frequency (max Int == 1 out of maxInt chance)
  obj.maxInt = maxInt;
  storage.set(obj);
  
  freqText.innerHTML = "<span style='color: forestgreen; font-weight: 200;'>" + freq + "%</span> chance of appearing";
  
  //set pika pic opacity
  document.getElementById("pika").style.opacity = opac;
  
  //in case of populating range from storage, set slider range
  slider.value = val;

}
