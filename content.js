// var server = "http://yourserver.com";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

	// tagArr of all tags
	var tagArr = Array.prototype.slice.call(document.getElementsByTagName("*"));

	// create put Ajax put request method
	$.put = function(url, data, callback, type){
	  if ( $.isFunction(data) ){
	    type = type || callback,
	    callback = data,
	    data = {}
	  }
	  return $.ajax({
	    url: url,
	    type: 'PUT',
	    success: callback,
	    data: data,
	    contentType: type
	  });
	}

	var backgroundColors = [];

    if (request.button == "draggable") {

			if (Array.prototype.slice.call(tagArr[0].classList).indexOf("draggable") === -1) {
			    for (var i = 0; i < tagArr.length ; i++) {
			    	tagArr[i].classList.add("draggable");
			    	tagArr[i].style.border = "2px solid #42dca3";
			    	tagArr[i].style.borderStyle = "dotted";
			    }
			} else {
				for (var i = 0; i < tagArr.length ; i++) {
			    	tagArr[i].classList.remove("draggable");
			    	tagArr[i].style.border = "";
			    	tagArr[i].style.borderStyle = "";
			    	// tagArr[i].style.backgroundColor = backgroundColors[i];
			    }
		}
	}
	if (request.button == "addNew") {

		// if user did not undrag elements 
		if (Array.prototype.slice.call(tagArr[0].classList).indexOf("draggable") !== -1) {
			for (var i = 0; i < tagArr.length ; i++) {
			    	tagArr[i].classList.remove("draggable");
			    	tagArr[i].style.border = "";
			    	tagArr[i].style.borderStyle = "";
			    }
		}
			var entireHTML = document.documentElement.outerHTML;
			var urlPage = window.location.href;
			urlPage = urlPage.replace(/\//g, "+")
			// hardcoded server IP
				$.post('http://192.168.1.11:8000/', {url: urlPage, changesAvailable: entireHTML}, function () {
					sendResponse({done: "I'm done"})
				}).done(function(dat, one, two){
					})

			// added local storage
			localStorage.setItem(urlPage, entireHTML);
			sendResponse({done: "I'm done"})
	}
	if (request.button == "getOldChanges") {
		var urlPage = window.location.href;
		urlPage = urlPage.replace(/\//g, "+")
		// hardcoded server IP
		$.get("http://192.168.1.11:8000/"+urlPage,function(changedDOM){
				console.log('changedDOM.length after get request',changedDOM.length)
				document.documentElement.innerHTML = changedDOM[request.index]
			})
	}

	if (request.getAllButtons == "getAll") {
		var urlPage = window.location.href;
		urlPage = urlPage.replace(/\//g, "+")
		console.log('ssnding get request NOW!')
		// hardcoded server IP
		$.get("http://192.168.1.11:8000/"+urlPage).then(function(data){
				console.log('in response of GetALL',data.length)
				sendResponse({allChanges: data})
			})

	}
	if (request.button == "deleteOne") {
		var urlPage = window.location.href;
		urlPage = urlPage.replace(/\//g, "+")
		console.log('ssnding get request NOW! and request.index is,', request.index)
		// hardcoded server IP
		$.put("http://192.168.1.11:8000/"+urlPage, {url: urlPage, stringToDeleteIndex: request.index})
		.then(function(data){
				console.log('in response of deleteOne',data.length)
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
