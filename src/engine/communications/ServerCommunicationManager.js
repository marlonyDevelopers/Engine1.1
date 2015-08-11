(function(window){

	//public variables

	/*
	public static const CONNECTION_CLOSE_EVENT:String = "CONNECTION_CLOSE";
	public static const CONNECTION_OK_EVENT:String    = "CONNECTION_OK";
	public static const CONNECTION_ERROR_EVENT:String = "CONNECTION_ERROR";
	*/

	//private variables
	
	const MESSAGE_START = "&&";
	const MESSAGE_END   = "##";
	
	var _gameType //IGameComunicationType;
	var _server   //IServer;
	var _hostName  = "localhost";
	var _port      = 8080;
	var _received //Boolean;
	var _toSend   //Vector.<String>;
	var _activeGame   = false;
	var _checkCounter = 0;
	var _this;
	var _ws;


	function ServerCommunicationManager(gameType, server){
		_gameType = gameType;
		_server   = server;
		//_toSend   = new Vector.<String>();
		_received = true;
		_this     = this;
		//_gameType.sendMessageDelegate(data_send); 
		//addEventListener(Event.ENTER_FRAME, checkForUserActivity);
	}


    //public functions

	ServerCommunicationManager.prototype.connect = function(serverIP){ // as3 -> serverIP, serverPort
		_ws = new WebSocket(serverIP); 
		_ws.onopen    = function(event) { onConectionOk(event) }; 
		_ws.onclose   = function(event) { onClose(event) }; 
		_ws.onmessage = function(event) { onDataReceivedFromServer(event) }; 
		_ws.onerror   = function(event) { onDataError(event) };
	}


	//private functions

	function onConectionOk(event){
		console.log('--> onConectionOk ' + event.data);
		//dispatchEvent(new Event(CONNECTION_OK_EVENT));

		//_ws.send("hola");  //TO TEST
	}

	function onClose(event){ //no estaba en AS3
		console.log('--> onClose ' + event.data);
	}

	function onDataError(event){
		console.log('--> onDataError ' + event.data);
		//dispatchEvent(new ServerResponseEvent(ServerResponseEvent.SERVER_RESPONSE_EVENT, new ConnLostResponse()));
	}

	function onDataReceivedFromServer(event){ 
		console.log('--> dataReceived ' + event.data);

		//var serverMessage:BaseResponse = _gameType.serverMessageToArray(event.data);
		//sendServerResponseToClient(serverMessage);
		_received = true;
		/*if (_toSend.length > 0 ) {
			data_send(_toSend.shift(), true);
		}*/
	}

	function data_send(message, headersReady){

		var msg = (headersReady) ? message : MESSAGE_START + message + MESSAGE_END;
		
		// 1.Get credit Bingo    2. Get Credit Slot
		if(msg == "&&GC##" || msg == "GC_HIT_"){ 
			if(_activeGame) {
				return;
			}
		}else{
			if(msg != "&&J##"){
				_activeGame   = true;
				_checkCounter = 0;
			}
		}
		
		if (_received) {
			_received = false;
			console.log('--> datasend ' + msg);
			_server.send(msg);
		} else {
			if(msg != "&&J##")
				_toSend.push(msg);
		}
	}



	//to global scope access:
	window.ServerCommunicationManager = ServerCommunicationManager;

}(window));