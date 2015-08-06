/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.command && (msg.command == "change_title")) {
    var dst = msg.title;
  	document.getElementsByTagName("div").forEach(function (elem) {
    	 elem.innerHTML = dst;
  	})
    // document.getElementsByTagName("div")[0].innerHTML = dst;
    // sendResponse("the page title's changed: '" + src + "' -> '" + dst + "'");
  }
});