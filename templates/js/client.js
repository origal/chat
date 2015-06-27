/*
 Native Javascript, just for kicks.
 This file is here and not on `../js/` just because with this app running on localhost, the browser kept looking for this script at the wrong path.
*/

function displayMessage(evt) { //this function updates the view with newly received messages.
	//TODO: an application on production would validate message origin with evt.origin
	partyLine = document.querySelector("#party-line");
	partyLine.value = partyLine.value +"\n" + evt.data;
}

window.addEventListener("message",displayMessage, false); // listen for arrived messages.

window.setTimeout(function(){ //fake onload replacment. must make sure iframe is fully loaded
	var sendButton = document.querySelector("#send-button");
	sendButton.addEventListener("click",function(){ //attach the send button with it's respective listener
		var iFrameId = window.frameElement.id;
		var userInput = document.querySelector("#client-input");
		var text = userInput.value;
		if (text.length == 0) { return; } //validate the inputs. Could be something more complex.
		var message = iFrameId + " : " + text;
		userInput.value = ""; // clear
		parent.postMessage(message,"*"); //energize!
	});
},1500);

