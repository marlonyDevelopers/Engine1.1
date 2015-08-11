(function(window){
	

	//public variables

	GameTypeController.prototype.gameConfig;  //GameConfig;
	GameTypeController.prototype.roundConfig; //RoundConfig;
	GameTypeController.prototype.gcActive = true;

	var _getCreditsTimer;                       //AS3 protected vas - Timer
	var _callGetCreditsEverySeconds;            //AS3 protected vas - Number
	var _jackpotTimer;                          //AS3 protected vas - Timer;
	var _callJackpotEverySeconds;               //AS3 protected vas - Number;     
	var _server;                                //AS3 protected vas - ServerCommunicationManager;
	var _countersController;                    //AS3 protected vas - CountersController;


	//public functions

	function GameTypeController(){}

	GameTypeController.prototype.registerCustomCounters = function (countersController){  //AS3 -> countersController:CountersController
		_countersController = countersController;
	}

	GameTypeController.prototype.getServer = function(decoder:IMessageDecoder, dummyWorker:Object = null, forceDummy:Boolean = true):ServerCommunicationManager{  //AS3 -> (decoder:IMessageDecoder, dummyWorker:Object = null, forceDummy:Boolean = true):ServerCommunicationManager
		console.log("must override this");
		return null;
	}
	
	GameTypeController.prototype.stopGetcreditTimer = function(){
		//_getCreditsTimer.stop();
		//creo que debe de hacerse con por ejemplo: setInterval(function () {alert("Hello")}, aca poner tiempo En milisegundos);
	}

	GameTypeController.prototype.startGetcreditTimer = function(){
		//_getCreditsTimer.start();
		//creo que debe de hacerse con por ejemplo: setInterval(function () {alert("Hello")}, aca poner tiempo En milisegundos);
	}


	//private functions




	//to global scope access:
	window.GameTypeController = GameTypeController;

}(window));