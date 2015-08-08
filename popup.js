var app = angular.module('myDraggzApp', [])	

app.controller('ButtonCtrl', function ($scope, ButtonFactory, $rootScope) {

	//$scope.buttons = $rootScope.buttons

	$scope.addNewChange = function () {
		console.log('in addNewChange',ButtonFactory.addNewChange)
		ButtonFactory.addNewChange()
	}
	$scope.getButtons = function(){
		ButtonFactory.getAllButtons()
	}
	$scope.loadChangedDOM = function(idx){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {button: 'getOldChanges', index: idx}, function(response) {
					console.log(response.farewell);
			});
		});
	}
	//ButtonFactory.getAllButtons()
	// .then(function (buttonsArr) {
	// 	console.log('getAllButtons controller')
	// 	$scope.buttons = buttonsArr;
	// })
})

app.factory('ButtonFactory', function ($rootScope) {
	return {
		getAllButtons: function () {
			console.log('in getAllButtons factory')
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			  chrome.tabs.sendMessage(tabs[0].id, {getAllButtons: 'getAll'}, function(response) {
			  	console.log('in getAllButtons factory response', response.allChanges)
			    //return response.allChanges;
			    $rootScope.buttons = response.allChanges;
			    $rootScope.$digest()
			  });
			});
		},
		addNewChange: function () {
			console.log('in addNewChange factory')
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			  chrome.tabs.sendMessage(tabs[0].id, {button: 'addNew'}, function(response) {
			  	console.log('in addNewChange factory, response',response)
			    	return response;
			  });
			});
		}
	}
})






var dragButton = document.getElementById('draggable');
// var saveChanges = document.getElementById('saveChanges');
// var getOldChanges = document.getElementById('getOldChanges');
// // console.log("document",)
dragButton.onclick = function () {
	console.log("POPUP1");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {button: 'draggable'}, function(response) {
	    console.log("POPUP");
	  });
	});
}

// saveChanges.onclick = function () {
// 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 	  chrome.tabs.sendMessage(tabs[0].id, {button: 'saveChanges'}, function(response) {
// 	    console.log(response.farewell);
// 	  });
// 	});
// }

// getOldChanges.onclick = function () {
// 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 	  chrome.tabs.sendMessage(tabs[0].id, {button: 'getOldChanges'}, function(response) {
// 	    console.log(response.farewell);
// 	  });
// 	});
// }