

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	// tagArr of all tags
	var dragged = false;
	var tagArr = Array.prototype.slice.call(document.getElementsByTagName("*"));
    if (request.button == "draggable") {
    		// console.log('DRAGGABLE')
			if (dragged === false) {
			    for (var i = 0; i < tagArr.length ; i++) {
			    	tagArr[i].classList.add("draggable");
			    }
			    dragged = true;
			} else {
				for (var i = 0; i < tagArr.length ; i++) {
			    	tagArr[i].classList.remove("draggable");
			    }
			    dragged = false;
		}
	}
	if (request.button == "addNew") {
			var entireHTML = document.documentElement.outerHTML;
			var urlPage = window.location.href;
			urlPage = urlPage.replace(/\//g, "+")
			console.log('AJAX ONCE OR TWICE????!!!!!!')
			$.post("http://192.168.1.194:8000/", {url: urlPage, changesAvailable: entireHTML}, function () {
				console.log('AJAX INSIDE CB ONCE OR TWICE????!!!!!!')
				sendResponse({done: "I'm done"})
			}).done(function(dat, one, two){
					// console.log("done", dat);
					// console.log("done", one);
					// console.log("done", two);
				})
			// localStorage.setItem(urlPage, entireHTML);
	}
	if (request.button == "getOldChanges") {
		var urlPage = window.location.href;
		urlPage = urlPage.replace(/\//g, "+")
		$.get("http://192.168.1.194:8000/"+urlPage,function(changedDOM){
				console.log('changedDOM.length after get request',changedDOM.length)
				document.documentElement.innerHTML = changedDOM[request.index]
			})
	}

	if (request.getAllButtons == "getAll") {
		// console.log('INSIDE THE IF for get ALL buttons')
		var urlPage = window.location.href;
		urlPage = urlPage.replace(/\//g, "+")
		console.log('ssnding get request NOW!')
		$.get("http://192.168.1.194:8000/"+urlPage).then(function(data){
				console.log('in response of GetALL',data.length)
				sendResponse({allChanges: data})
			})

	}
	return true
})





// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing demo
  window.dragMoveListener = dragMoveListener;
