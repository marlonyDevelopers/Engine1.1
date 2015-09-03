(function(window){




	//public functions

	function BingoGameType(gameConfig, decoder){   //(gameConfig:BingoGameConfig, decoder:BingoMessageDecoder = null, responseDelay:Number = .2)

		var _this = this;
		var _sendDelegate; //:Function = null;
		var _decoder;//:BingoMessageDecoder;
		var _countersController;//:CountersController;
		var _openCards = 4;
		var _cards     = []; //new Vector.<BingoCardsData>();
		
		this.coin       = 0;
		this.bet        = 0;
		this.gameConfig = gameConfig;
		
		init();

		function init(){

			_decoder = (decoder) ? decoder : new BingoMessageDecoder(); //must doBingoMessageDecoder
			_decoder.setGameType(_this);

			/*
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

		this.sendMessageDelegate =  function (delegate){   //(delegate:Function):void{
			_sendDelegate = delegate;
		}

		this.login = function(gameName, password){  //(gameName:String, password:String):void{
			//sendToServer("L:" + gameName + ":" + password); //descomentar
			
			//Provisorio
			console.log("CAMBIAR BingoGameType - envio provisorio de mensage LOGIN");
			sendToServer("L:LOGIN_OK");

		}
		
		this.initialization = function(){
			//sendToServer("I"); //descomentar

			//Provisorio
			console.log("CAMBIAR BingoGameType - envio provisorio de mensage INIT");
			sendToServer("I:5:99985:0:78020:1:1111:0:10;20;39;57;73;11;26;44;60;75;16;30;53;68;76:1;21;40;56;84;6;22;45;58;86;15;32;46;63;90:2;24;48;61;80;7;27;51;66;81;9;34;52;72;88:3;25;37;55;74;8;31;47;59;78;14;36;50;69;89:-1:-1:1:-1");

			// numbers
			// 10;20;39;57;73;11;26;44;60;75;16;30;53;68;76
			// 1;21;40;56;84;6;22;45;58;86;15;32;46;63;90
			// 2;24;48;61;80;7;27;51;66;81;9;34;52;72;88
			// 3;25;37;55;74;8;31;47;59;78;14;36;50;69;89
		}

		this.serverMessageToArray = function(message){ //:BaseResponse
			
			var msg = []; 
			msg = (message.split(":"));

			var vMessage = [];	
			
			if (message.substr(0, 3) != "&&:") {
				message = "&&:" + message.slice(2, message.length)
			}

			if (message !== 'NOT') {
				vMessage = (message.split("##"));
				for (var x = 0; x < vMessage.length; x++) vMessage[x] = (vMessage[x].split(':', message.length));
			}
			
			for(var i = 0; i < vMessage.length; i++){
				if(vMessage[i][vMessage[i].length-1] == ""){
					vMessage[i].splice(vMessage[i].length-1,1);
				}
			}
			
			for (i = 0; i < vMessage.length - 1 ; i++){
				if (vMessage[i] == 'NOT') return null;
			}
			
			return decodeServerMessage(vMessage[0]);
		}

		this.setCards = function(value){ //(value:Vector.<BingoCardsData>):void{
			for(var i = 0; i < _cards.length; i++){
				value[i].enabled = _cards[i].enabled;
			}
			_cards = value;
		}

		//private functions

		function decodeServerMessage(message){  //message:Array):BaseResponse
			return _decoder.decodeServerMessage(message);
		}

		function sendToServer(message){ //(message:String):void{
			if(_sendDelegate == null){
				alert("You must set the send function delegate");
			}else{
				_sendDelegate(message);
			}
		}
	}


	//to global scope access:
	window.BingoGameType = BingoGameType;

	//Extends GameTypeController
	//BingoGameType.prototype = GameTypeController.prototype;

}(window));