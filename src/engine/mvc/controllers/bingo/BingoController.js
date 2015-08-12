(function(window){


	//public functions

	function BingoController(gameConfig, roundConfig, callGetCreditsEverySeconds, callJackpotEverySeconds){ //(gameConfig:GameConfig, roundConfig:RoundConfig, callGetCreditsEverySeconds:Number, callJackpotEverySeconds:Number)
		
		console.log("BingoController created");
		this.gameConfig                  = gameConfig;
		this.roundConfig                 = roundConfig;
		this._callGetCreditsEverySeconds = callGetCreditsEverySeconds;
		this._callJackpotEverySeconds    = callJackpotEverySeconds;
	}


	//BingoController.prototype.startGetcreditTimer = function(){
		//_getCreditsTimer.start();
		//creo que debe de hacerse con por ejemplo: setInterval(function () {alert("Hello")}, aca poner tiempo En milisegundos);
	//}


	//private functions




	//to global scope access:
	window.BingoController = BingoController;

	//Extends GameTypeController
	BingoController.prototype = GameTypeController.prototype;

}(window));

