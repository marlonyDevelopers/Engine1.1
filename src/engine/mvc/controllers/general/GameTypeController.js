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
	GameTypeController.prototype.setIntervalId;


	//public functions

	function GameTypeController(){
	}

	GameTypeController.prototype.registerCustomCounters = function (countersController){  //AS3 -> countersController:CountersController
		GameTypeController.prototype._countersController = countersController;
	}

	GameTypeController.prototype.getServer = function(decoder, dummyWorker, forceDummy){  //AS3 -> (decoder:IMessageDecoder, dummyWorker:Object = null, forceDummy:Boolean = true):ServerCommunicationManager
		console.log("must override this");
		return null;
	}
	
	GameTypeController.prototype.startGcTimer = function(callBack, callGetCreditsEverySeconds){
		//console.log("LLEGO: " + callBack + "  " + callGetCreditsEverySeconds + " - GameTypeController");
		GameTypeController.prototype.setIntervalId = setInterval(update, callGetCreditsEverySeconds);
		function update(){
			//console.log("Get Credit - GameTypeController");
			callBack();
		}
	}

	GameTypeController.prototype.stopGcTimer = function(){
		//console.log("stopGcTimer - GameTypeController");
		clearInterval(GameTypeController.prototype.setIntervalId);
	}

	//to global scope access:
	window.GameTypeController = GameTypeController;

}(window));