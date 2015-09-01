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
		_gameType = ServerCommunicationManager.prototype.gameType = gameType;
		_server   = server;
		_toSend   = [];
		_received = true;
		_this     = this;
		_gameType.sendMessageDelegate(data_send); 

		//addEventListener(Event.ENTER_FRAME, checkForUserActivity);
	}


    //public functions

	ServerCommunicationManager.prototype.connect = function(serverIP){ // as3 -> serverIP, serverPort
		/*_ws = new WebSocket(serverIP); 
		_ws.onopen    = function(event) { onConectionOk(event) }; 
		_ws.onclose   = function(event) { onClose(event) }; 
		_ws.onmessage = function(event) { onDataReceivedFromServer(event) }; 
		_ws.onerror   = function(event) { onDataError(event) };*/
		
		_server.connect(serverIP);
	}


	//private functions

	
	ServerCommunicationManager.prototype.onConectionOk = function(){
		console.log('--> onConectionOk (ServerCommunicationManager)');
    	window.dispatchEvent(new CustomEvent("CONNECTION_OK"));
		//_ws.send("hola soy el serverCommunicationManager");  //TO TEST
	}

	
	ServerCommunicationManager.prototype.onClose = function(){ //no estaba en AS3
		console.log('--> onClose ' + event.data);
	}

	ServerCommunicationManager.prototype.onDataReceivedFromServer = function(event){ 
		console.log('<-- dataReceived ' + event.data);
		_received = true;
		var serverMessage = _gameType.serverMessageToArray(event.data); //devuelve a BaseResponse
		
		sendServerResponseToClient(serverMessage);


		
		/*if (_toSend.length > 0 ) {
			data_send(_toSend.shift(), true);
		}*/
	}





	function sendServerResponseToClient(data){
		window.dispatchEvent(new CustomEvent("SERVER_RESPONSE_EVENT", {detail:data}));
	}





	ServerCommunicationManager.prototype.onDataError = function(){
		console.log('--> onDataError ' + event.data);
		//dispatchEvent(new ServerResponseEvent(ServerResponseEvent.SERVER_RESPONSE_EVENT, new ConnLostResponse()));
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