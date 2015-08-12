(function(window){


	//public functions

	function BingoController(gameConfig, roundConfig, callGetCreditsEverySeconds, callJackpotEverySeconds){ //(gameConfig:GameConfig, roundConfig:RoundConfig, callGetCreditsEverySeconds:Number, callJackpotEverySeconds:Number)
		
		console.log("BingoController created");
		this.gameConfig                  = gameConfig;
		this.roundConfig                 = roundConfig;
		this._callGetCreditsEverySeconds = callGetCreditsEverySeconds;
		this._callJackpotEverySeconds    = callJackpotEverySeconds;

		this.getServer = function (decoder, dummyWorker, forceDummy){ //AS3 -> (decoder:IMessageDecoder, dummyWorker:Object = null, forceDummy:Boolean = true):ServerCommunicationManager

			if(this._server){ return this._server; }

			
			var parameters = ApplicationController.getApplicationController().parameters;
			console.log(parameters);
			
			/*if(parameters.is_log == true || forceDummy == true){
				
				
				if(dummyWorker == null){ throw new Error("LOG OR DUMMY needs a dummyworker to functi on")}
				
				if(parameters.is_log){
					parameters.logData = buildLogData(parameters);
					replaceRoundConfigWithLogData(parameters.logData, roundConfig as BingoRoundConfig);
				}
				
				var iServer:IServer = new DummyBingoServer(gameConfig as BingoGameConfig, roundConfig as BingoRoundConfig, dummyWorker);
				_server = new ServerCommunicationManager(new BingoGameType(gameConfig as BingoGameConfig, decoder as BingoMessageDecoder), iServer);
				
				
			}else{
				_server = new ServerCommunicationManager(new BingoGameType(gameConfig as BingoGameConfig, decoder as BingoMessageDecoder), new SocketServer(null));
			}
				_server.addEventListener(ServerResponseEvent.SERVER_RESPONSE_EVENT, onServerResponse);
				return _server; */
			}

	}

	//por ahora no va, parece que solo se necesita por SPEED_COUNTER, y deberia estar en ApplicationController
	/*override public function registerCustomCounters(countersController){
		//super.registerCustomCounters(countersController);
		countersController.registerCounter(CountersController.SPEED_COUNTER); //Y esto!?? pasarlo a ApplicationController con los demas
	}*/




	//private functions




	//to global scope access:
	window.BingoController = BingoController;

	//Extends GameTypeController
	BingoController.prototype = GameTypeController.prototype;

}(window));

