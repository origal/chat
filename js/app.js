(function(){
	var app = angular.module("chat",[]);

	app.directive("myChat",function(){
		return {
			restrict: "E",
			templateUrl: "templates/chat.html",
			controller: function($scope){
				this.iframes = [];
				this.addClient = function(){
					var newIframe = {}; //this object could hold more attributes on the next version :)
					this.iframes.push(newIframe);
					var lastBuddy = "iframe"+(this.iframes.length-1)+"";
					if (this.iframes.length != 1){
						for (var i=0; i<this.iframes.length; i++){
							var iframe = document.querySelector("#iframe"+i);
							iframe.contentWindow.postMessage("System: "+lastBuddy+" has joined the party.","*");	
						}
					}
				};
				var self = this;
				$scope.setup = function(){
					window.addEventListener('message',function(e){
						var iframes = self.iframes;
						var message = e.data;
						for (var i=0; i<iframes.length; i++){
							var iframe = document.querySelector("#iframe"+i);
							iframe.contentWindow.postMessage(message,"*");
						}
					});	
				};
			},
			link: function(scope,element,attrs){
				scope.setup();
			},
			controllerAs: "chatCtrl"
		};
	});

	app.directive("chatClient",function(){
		return {
			restrict: "E",
			templateUrl: "templates/chat-client.html",
			link: function(scope, element, attrs, ctrl) {
				//element.draggable(); //drag and drop functionality currently N/A :/
			}
		};
	});
})();