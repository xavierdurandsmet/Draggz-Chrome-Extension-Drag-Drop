// /* Listen for messages */
// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//   if (msg.command && (msg.command == "change_title")) {
//     var dst = msg.title;
//     for (var i = 0; i < document.getElementsByTagName("div").length ; i++) {
//     	document.getElementsByTagName("div")[i].style.marginTop = Math.random()*300 + 'px';
//     }
//     // document.getElementsByTagName("div")[0].innerHTML = dst;
//     sendResponse("the page title's changed");
//   }
// });




    for (var i = 0; i < document.getElementsByTagName("div").length ; i++) {
    	document.getElementsByTagName("div")[i].style.border = "thick solid blue";
    }