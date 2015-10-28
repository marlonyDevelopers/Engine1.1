(function(window){

	//public functions

	function BingoGameType(gameConfig, decoder){   //(gameConfig:BingoGameConfig, decoder:BingoMessageDecoder = null, responseDelay:Number = .2)

		var _this = this;
		var _sendDelegate;      //:Function = null;
		var _decoder;           //:BingoMessageDecoder;
		var _countersController;//:CountersController;
		var _openCards  = 4;
		var _cards      = []; //new Vector.<BingoCardsData>();
		
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
			*/
			_countersController = ApplicationController.getApplicationController().getController("CountersController");
		}

		this.sendMessageDelegate =  function (delegate){   //(delegate:Function):void{
			_sendDelegate = delegate;
		}

		this.login = function(gameName, password){  //(gameName:String, password:String):void{
			sendToServer("L:" + gameName + ":" + password); //descomentar
			
			//Provisorio
			//console.log("CAMBIAR BingoGameType - envio provisorio de mensage LOGIN");
			//sendToServer("L:LOGIN_OK");

		}
		
		this.initialization = function(){
			sendToServer("I"); //descomentar

			//Provisorio
			//console.log("CAMBIAR BingoGameType - envio provisorio de mensage INIT");
			//sendToServer("I:5:99985:0:78020:1:1111:0:10;20;39;57;73;11;26;44;60;75;16;30;53;68;76:1;21;40;56;84;6;22;45;58;86;15;32;46;63;90:2;24;48;61;80;7;27;51;66;81;9;34;52;72;88:3;25;37;55;74;8;31;47;59;78;14;36;50;69;89:-1:-1:1:-1");

			// numbers
			// 10;20;39;57;73;11;26;44;60;75;16;30;53;68;76
			// 1;21;40;56;84;6;22;45;58;86;15;32;46;63;90
			// 2;24;48;61;80;7;27;51;66;81;9;34;52;72;88
			// 3;25;37;55;74;8;31;47;59;78;14;36;50;69;89
		}



		/**
		 * Send the change bet (CB) message to the server
		 * @param newBet The velue of the new bet
		 */
		this.changeBet = function(newBet){  //:int):void{
			_this.bet = newBet;
			sendToServer("CB:" + newBet.toString());
		}
		
		/**
		 * Send the change numbers (CN) message to the server
		 */
		this.changeNumbers = function(){
			sendToServer("CN");
		}
		
		/**
		 * Send the change cards configuration (CCC) message to the server
		 * @param cardStatus This vector represents each card, if the value is true then the card is eneabled, if false then is disabled
		 */
		this.changeCardsConfiguration = function(cardStatus){  //cardStatus:Vector.<Boolean>):void{
			//convert the vector into a string of int;int;int;.....;int
			_openCards = 0;
			var card   = [];
			for(var i = 0; i < cardStatus.length; i++){
				card.push(parseInt(cardStatus[i]));
				_this.cards[i].enabled = cardStatus[i];
				_openCards += (_this.cards[i].enabled) ? 1 : 0;
			}
			
			sendToServer("CCC:" + card.join(""));
		}
		
		/**
		 * Send the play (W) message to the server
		 */
		this.Play = function(){
			//alert("BingoGameType - Engine - Play ->  TODO: _countersController.setCounterValue(CountersController.PAID_IN_CASH_STANDARDBAR_COUNTER, 0);");
			//_countersController.setCounterValue(CountersController.PAID_IN_CASH_STANDARDBAR_COUNTER, 0);
			var playCost = _openCards * _this.bet;
			if(checkCredits(playCost, false)){
				sendToServer("W");
			}else{
				noMoreCredits();
				return false;
			}
			return true;
		}
		
		/**
		 * Send the Get Extra ball (GEB) message to the server
		 */
		this.getExtraBall = function(index){
			if(index == null)index = -1;
			if(checkCredits(_decoder.getNextExtraCost(), gameConfig.useWonCreditsToPlay)){
				if(index != -1){
					sendToServer("GEBE:" + index.toString());
				}else{
					sendToServer("GEB");
				}
				
			}else{
				noMoreCredits();
				return false;
			}
			return true;
		}
		
		/**
		 * Send the Cancel Extra ball (CEB) message to the server
		 */
		this.cancelExtraBall = function(){
			sendToServer("CEB");
		}
		
		/**
		 * Send the Change Coin (CC) message to the server
		 * @param coin Coin value
		 */
		this.changeCoin = function(coin){
			_this.coin = coin;
			sendToServer("CC:" + coin);
		}
		
		/**
		 * Send the Get Credits (GC) message to the server
		 */
		this.getCredits = function(){
			sendToServer("GC");
		}
		
		this.changeStage = function(stageData){  //(stageData:String):void{
			sendToServer("CS:" + stageData);
		}
		
		this.getJackpot = function(){
			sendToServer("J");
		}
		
		this.jackpotShow = function(){
			sendToServer("NJS");
		}

		this.decodeServerMessage = function(message){   //(message:Array):BaseResponse{
			return _decoder.decodeServerMessage(message);
		}
		
		this.sendMessageDelegate = function(delegate){  //(delegate:Function):void{
			_sendDelegate = delegate;
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
			_this.cards = _cards;
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


		/*
		function checkCreditsNormalsPlay(){
			var playCost = _openCards * bet;
			if(checkCredits(playCost, false)){
				return true;
			}else{
				return false;
			}
		}
		
		function checkCreditsExtra(){
			if(checkCredits(_decoder.getNextExtraCost(), gameConfig.useWonCreditsToPlay)){
				return true;
			}else{
				return false;
			}
		}*/
		
		function checkCredits(playCost, tryToUseWonCreditsIfSupported){  //(playCost:int, tryToUseWonCreditsIfSupported:Boolean):Boolean{

			if(ApplicationController.getApplicationController().gameType.roundConfig.isFreePlayActivated){ return true; }
			if(ApplicationController.getApplicationController().parameters.is_log){ return true; }
			
			var creditsInCash      = _countersController.getCounterValue(CountersController.CREDITS_IN_CASH_COUNTER);
			var coin               = _countersController.getCounterValue(CountersController.COIN_COUNTER);
			var coinDivisor        = coin < 1 ? 1:100 //ej: hay juegos que tratan ya 0.25 la moneda, y la mayoria con 25
			var playCostInCash     = playCost * (coin/coinDivisor);
			var creditsAfterInCash = creditsInCash - playCostInCash;

			if(creditsAfterInCash < 0){
				if(tryToUseWonCreditsIfSupported && gameConfig.useWonCreditsToPlay){
					return (creditsAfterInCash + (_decoder.getLastWin()) * (coin/coinDivisor)) >= 0;
				}else{
					return false;
				}
			}
			return true;
		}
		
		function noMoreCredits(){
			ApplicationController.getApplicationController().startTimerGC();
			ApplicationController.getApplicationController().sendNotification(EngineNotificationsEnum.NO_MORE_CREDITS_NOTIFICATION);

			alert("BingoGameType - Engine - noMoreCredits ->  TODO: standardBarController");
			/*
			var standardBarController = ApplicationController.getApplicationController().getController("StandardBarController");
			if(standardBarController.isAutoOn){
				standardBarController.autoOff();
			}*/
		}

		this.cards = _cards;

	}


	//to global scope access:
	window.BingoGameType = BingoGameType;

	//Extends GameTypeController
	//BingoGameType.prototype = GameTypeController.prototype;

}(window));