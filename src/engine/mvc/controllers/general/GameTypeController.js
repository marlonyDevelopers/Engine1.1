(function(window){
	

	//public variables

	GameTypeController.prototype.gameConfig;  //GameConfig;
	GameTypeController.prototype.roundConfig; //RoundConfig;
	GameTypeController.prototype.gcActive = true;

	GameTypeController.prototype._getCreditsTimer;             //AS3 protected vas - Timer
	GameTypeController.prototype._callGetCreditsEverySeconds;  //AS3 protected vas - Number
	GameTypeController.prototype._jackpotTimer;                //AS3 protected vas - Timer;
	GameTypeController.prototype._callJackpotEverySeconds;     //AS3 protected vas - Number;     
	GameTypeController.prototype._server;                      //AS3 protected vas - ServerCommunicationManager;
	GameTypeController.prototype._countersController;          //AS3 protected vas - CountersController;


	//public functions

	function GameTypeController(){}

	GameTypeController.prototype.registerCustomCounters = function (countersController){  //AS3 -> countersController:CountersController
		_countersController = countersController;
	}

	GameTypeController.prototype.getServer = function(decoder, dummyWorker, forceDummy){  //AS3 -> (decoder:IMessageDecoder, dummyWorker:Object = null, forceDummy:Boolean = true):ServerCommunicationManager
		console.log("must override this");
		return null;
	}
	
	GameTypeController.prototype.stopGetcreditTimer = function(){
		console.log("stopGetcreditTimer");
		//_getCreditsTimer.stop();
		//creo que debe de hacerse con por ejemplo: setInterval(function () {alert("Hello")}, aca poner tiempo En milisegundos);
	}

	GameTypeController.prototype.startGetcreditTimer = function(){
		console.log("startGetcreditTimer");
		//_getCreditsTimer.start();
		//creo que debe de hacerse con por ejemplo: setInterval(function () {alert("Hello")}, aca poner tiempo En milisegundos);
	}


	//private functions




	//to global scope access:
	window.GameTypeController = GameTypeController;

}(window));