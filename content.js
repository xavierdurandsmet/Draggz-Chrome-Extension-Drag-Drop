var newDom;

chrome.storage.local.get("allNodesArr",function(data){
	//if (!data) 
	newDom = data;
	console.log('refresh check', newDom)
		})
// tagArr of all tags
var tagArr = Array.prototype.slice.call(document.getElementsByTagName("*"));

// button that saves the changes to the DOM
var buttonSave = document.createElement('button');
buttonSave.innerHTML = "get tags"
buttonSave.style.position = "absolute";
		buttonSave.style.position = "fixed";
		buttonSave.style.zIndex = "10";
		buttonSave.style.top = "70px";
buttonSave.onclick = function () {
	var finalArr = [];
	for (var i = 0; i < tagArr.length ; i++) {
		//console.log('hit first')
		var node = {
			"nodeName": tagArr[i].tagName,
			"attributeName": [],
			"attributeValue": []
			}
		var allAttributesOfTag = Array.prototype.slice.call(tagArr[i].attributes)
		for (var j = 0; j < allAttributesOfTag.length; j++) {
			//console.log('hit second');
			node.attributeName.push(allAttributesOfTag[j].nodeName);
			node.attributeValue.push(allAttributesOfTag[j].nodeValue);
		}
		//console.log('hit third')
		finalArr.push(node)
	}
	console.log('FINAL ARRRRRRAAAAY', finalArr)
	chrome.storage.local.set({"allNodesArr": finalArr},function(){
		chrome.storage.local.get("allNodesArr",function(data){
			console.log('got?', data)
		})
		console.log('SAVED NODES')
	})
}
document.body.appendChild(buttonSave);

	var newNode = document.createElement('button');
		newNode.innerHTML = "DRAGGABLE"
		newNode.style.position = "absolute";
		newNode.style.position = "fixed";
		newNode.style.zIndex = "10";
		newNode.style.top = "50px";
	var dragged = false;
	newNode.onclick = function() {
		console.log("dragging?",tagArr)
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
document.body.appendChild(newNode);





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
