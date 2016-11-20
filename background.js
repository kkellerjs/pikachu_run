


//when click icon...
chrome.browserAction.onClicked.addListener(function(tab) {



  chrome.storage.local.get("onOff", function (data) {
  
   console.log(data.onOff);
 
   if (data.onOff == "on") {
    chrome.storage.local.set({"onOff": "off"}, function(){
     chrome.browserAction.setIcon({path:{"16": "16grey.png", "48": "48grey.png","128": "128grey.png"}});
	 });
	 
   } else {
     chrome.storage.local.set({"onOff": "on"}, function() {
      chrome.browserAction.setIcon({path:{"16": "16.png", "48": "48.png","128": "128.png"}});
     });
   }
  
  }); 
  
  

});
