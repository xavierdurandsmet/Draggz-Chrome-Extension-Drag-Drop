/* When the browser-action button is clicked... */
// chrome.browserAction.addListener(function(tab) {
//   chrome.tabs.sendMessage(tab.id, {
//       command: "change_title",
//       title: "hoge"
//     },
//     function(msg) {
//       console.log("result message:", msg);
//     });
// });

// chrome.webNavigation.onCompleted.addListener(function(details) {
//   chrome.tabs.executeScript(details.tabId, {
//       code: "var dst = msg.title;
//     for (var i = 0; i < document.getElementsByTagName('div').length ; i++) {
//     	document.getElementsByTagName('div')[i].style.marginTop = Math.random()*300 + 'px';
//     }",
//     },
//     function(msg) {
//       console.log("result message:", msg);
//     });
// });
