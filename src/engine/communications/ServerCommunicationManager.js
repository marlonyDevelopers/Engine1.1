(function(window){

	function ServerCommunicationManager(gameType, server){

		var _this = this;
		var _gameType = ServerCommunicationManager.prototype.gameType = gameType;//IGameComunicationType;
		var _server   = server;   //IServer;
		var _hostName = "localhost";
		var _port     = 8080;
		var _received = true; //Boolean;
		var _toSend   = [];   //Vector.<String>;
		var _activeGame   = false;
		var _checkCounter = 0;
		var _ws;

		const MESSAGE_START = "&&";
		const MESSAGE_END   = "##";

		_gameType.sendMessageDelegate(data_send); 


		this.gameType = _gameType;

		// public functions

		this.checkForUserActivity = function(){  //(event:Event):void{
			//console.log("checkForUserActivity - ServerCommunicationManager");
			_checkCounter++;
			if(_checkCounter > 10){
				_activeGame = false;
			}
		}

		//TODO:
		//addEventListener(Event.ENTER_FRAME, checkForUserActivity);
		setInterval(this.checkForUserActivity, 1000);
		

		this.connect = function(serverIP){ // as3 -> serverIP, serverPort
			/*_ws = new WebSocket(serverIP); 
			_ws.onopen    = function(event) { onConectionOk(event) }; 
			_ws.onclose   = function(event) { onClose(event) }; 
			_ws.onmessage = function(event) { onDataReceivedFromServer(event) }; 
			_ws.onerror   = function(event) { onDataError(event) };*/
			
			_server.connect(serverIP);
		}

		this.onConectionOk = function(){
			console.log('--> onConectionOk (ServerCommunicationManager)');
	    	window.dispatchEvent(new CustomEvent("CONNECTION_OK"));
			//_ws.send("hola soy el serverCommunicationManager");  //TO TEST
		}

		this.onClose = function(){ //no estaba en AS3
			console.log('--> onClose ' + event.data);
		}

		this.onDataReceivedFromServer = function(event){ 
			console.log('<-- dataReceived ' + event.data);
			_received = true;
			var serverMessage = _gameType.serverMessageToArray(event.data); //devuelve a BaseResponse
			
			sendServerResponseToClient(serverMessage);

			/*if (_toSend.length > 0 ) {
				data_send(_toSend.shift(), true);
			}*/
		}

		this.onDataError = function(){
			console.log('--> onDataError ' + event.data);
			//dispatchEvent(new ServerResponseEvent(ServerResponseEvent.SERVER_RESPONSE_EVENT, new ConnLostResponse()));
		}


		//private functions

		function sendServerResponseToClient(data){
			window.dispatchEvent(new CustomEvent("SERVER_RESPONSE_EVENT", {detail:data}));
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
	}


	//to global scope access:
	window.ServerCommunicationManager = ServerCommunicationManager;

}(window));