(function(window){


	var _sendDelegate; //:Function = null;
	var _decoder;//:BingoMessageDecoder;
	var _countersController;//:CountersController;
	var _openCards = 4;
	var _cards; //:Vector.<BingoCardsData>;
	
	BingoGameType.prototype.coin = 0;
	BingoGameType.prototype.bet  = 0;
	BingoGameType.prototype.gameConfig; //:BingoGameConfig;

	//public functions

	function BingoGameType(gameConfig, decoder){   //(gameConfig:BingoGameConfig, decoder:BingoMessageDecoder = null, responseDelay:Number = .2)

		_cards = []; //new Vector.<BingoCardsData>();
		BingoGameType.prototype.gameConfig = gameConfig;
		
		/*
		_decoder = (decoder) ? decoder : new BingoMessageDecoder(); //must doBingoMessageDecoder
		_decoder.setGameType(this);
		
		var aux:int;
		for(var i:int = 0; i<(ApplicationController.getApplicationController().gameType.roundConfig).cards.length; i++){
			if((ApplicationController.getApplicationController().gameType.roundConfig).cards[i].enabled){
				aux++;
			}
		}
		_openCards = aux;
		_countersController = ApplicationController.getApplicationController().getController(CountersController);
		*/
	}

	BingoGameType.prototype.sendMessageDelegate =  function (delegate){   //(delegate:Function):void{
		_sendDelegate = delegate;
	}

	BingoGameType.prototype.login = function(gameName, password){  //(gameName:String, password:String):void{
		sendToServer("L:" + gameName + ":" + password);
	}
	
	BingoGameType.prototype.initialization = function(){
		sendToServer("I");
	}



	//private functions


	function sendToServer(message){ //(message:String):void{
		if(_sendDelegate == null){
			alert("You must set the send function delegate");
		}else{
			_sendDelegate(message);
		}
	}




	//to global scope access:
	window.BingoGameType = BingoGameType;

	//Extends GameTypeController
	//BingoGameType.prototype = GameTypeController.prototype;

}(window));