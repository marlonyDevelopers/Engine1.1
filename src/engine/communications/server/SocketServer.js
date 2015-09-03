(function(window){

	function SocketServer(){

		var _ws;
		var _myCommunicationManager


		//public functions

		this.connect = function(host){  // AS3 -> host:String, port:int
			try {
				_ws = new WebSocket(host); 
				_ws.onopen    = function(event) { onConectionOk(event) }; 
				_ws.onclose   = function(event) { onClose(event) }; 
				_ws.onmessage = function(event) { onDataReceivedFromServer(event) }; 
				_ws.onerror   = function(event) { onError(event) };
			}catch(error) {
				alert(error.message);
			}
		}

		this.setMyCommunicationManager = function(myCommunicationManager){
			_myCommunicationManager = myCommunicationManager;
		}
		
		this.send = function(message){
			_ws.send(message);
		}


		//private functions

		function onConectionOk(event){
			console.log('--> onConectionOk (SocketServer)');
			//dispatchEvent(event);
			_myCommunicationManager.onConectionOk();
		}

		function onClose(event){
			console.log('--> onClose ' + event.data);
			_myCommunicationManager.onClose();
		}
		
		function onDataReceivedFromServer(event){
			//console.log('<-- dataReceived ' + event.data);
			_myCommunicationManager.onDataReceivedFromServer(event);
			//dispatchEvent(event);
		}
		
		function onError(event){
			console.log('--> onDataError ' + event.data);
			//dispatchEvent(event);
		}

	}


	//to global scope access:
	window.SocketServer = SocketServer;

}(window));