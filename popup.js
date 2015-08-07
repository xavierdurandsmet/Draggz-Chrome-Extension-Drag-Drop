var dragButton = document.getElementById('draggable');
var saveChanges = document.getElementById('saveChanges');
var getOldChanges = document.getElementById('getOldChanges');
// console.log("document",)
dragButton.onclick = function () {
	console.log("POPUP1");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {button: 'draggable'}, function(response) {
	    console.log("POPUP");
	  });
	});
}

saveChanges.onclick = function () {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {button: 'saveChanges'}, function(response) {
	    console.log(response.farewell);
	  });
	});
}

getOldChanges.onclick = function () {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {button: 'getOldChanges'}, function(response) {
	    console.log(response.farewell);
	  });
	});
}