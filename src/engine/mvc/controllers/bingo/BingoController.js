(function(window){

	function BingoController(gameConfig, roundConfig, callGetCreditsEverySeconds, callJackpotEverySeconds){ //(gameConfig:GameConfig, roundConfig:RoundConfig, callGetCreditsEverySeconds:Number, callJackpotEverySeconds:Number)
		var _this = this;
		this.gameConfig                  = gameConfig;
		this.roundConfig                 = roundConfig;
		this._callGetCreditsEverySeconds = callGetCreditsEverySeconds;
		this._callJackpotEverySeconds    = callJackpotEverySeconds;

		
		//anterior
		//window.addEventListener("SERVER_RESPONSE_EVENT", onServerResponse);
		//nuevo -> paso a init, porque no estaba aun applicationcontroller
		


		//public functions

		this.getServer = function (decoder, dummyWorker, forceDummy){ //AS3 -> (decoder:IMessageDecoder, dummyWorker:Object = null, forceDummy:Boolean = true):ServerCommunicationManager

			if(_this._server){ return _this._server; }

			var parameters = ApplicationController.getApplicationController().parameters;
			//console.log(parameters);
			
			if(parameters.is_log == true || forceDummy == true){
				
				if(dummyWorker == null){ throw new Error("LOG OR DUMMY needs a dummyworker to function")}
				
				if(parameters.is_log){
					parameters.logData = buildLogData(parameters);
					replaceRoundConfigWithLogData(parameters.logData, roundConfig);  //replaceRoundConfigWithLogData(parameters.logData, roundConfig as BingoRoundConfig);
				}
				
				//Todo:
				//var iServer:IServer = new DummyBingoServer(gameConfig as BingoGameConfig, roundConfig as BingoRoundConfig, dummyWorker);
				//_server = new ServerCommunicationManager(new BingoGameType(gameConfig as BingoGameConfig, decoder as BingoMessageDecoder), iServer);
				
			}else{
				soketServer = new SocketServer();
				_server     = new ServerCommunicationManager(new BingoGameType(gameConfig, decoder), soketServer);  //_server = new ServerCommunicationManager(new BingoGameType(gameConfig as BingoGameConfig, decoder as BingoMessageDecoder), new SocketServer(null));
				soketServer.setMyCommunicationManager(_server);
			}

			//_server.addEventListener(ServerResponseEvent.SERVER_RESPONSE_EVENT, onServerResponse); //TODO custom event
			
			return _server; 
		}

		//nuevo
		this.init = function(){
			setupSubscriptions();
		}	

		//nuevo
		this.notificationReceived = function(type, data){
			switch(type){
				case EngineNotificationsEnum.SERVER_RESPONSE_EVENT:
					onServerResponse(data);
				break;
			}
		}

		//private functions

		//nuevo
		function setupSubscriptions(){
			var notifications = []; 
			notifications.push(
				EngineNotificationsEnum.CONNECTION_OK,
				EngineNotificationsEnum.SERVER_RESPONSE_EVENT);
			//ApplicationController.getApplicationController();
			ApplicationController.getApplicationController().addSubscriber(notifications, _this);	
		}

		function onServerResponse(data){ 
			var response = data;
			if(response && response.type){
				
				switch(response.type){
					case "InitResponse":
						
						//var initResponse:InitResponse = event.response as InitResponse;
						_this._countersController.setCounterValue(CountersController.JACKPOT_COUNTER, response.jackpot);
						_this._countersController.setCounterValue(CountersController.COIN_COUNTER, response.coin);
						_this._countersController.setCounterValue(CountersController.CREDITS_COUNTER, response.credits);
						_this._countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (response.credits_in_cash));
						_this._countersController.setCounterValue(CountersController.BET_COUNTER, response.bet);
						_this._countersController.setCounterValue(CountersController.TOTAL_BET_COUNTER, (response.totalBet));
						_this._countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (response.totalBet * _server.gameType.coin)/100); //por que aca y no en la respuesta??
						
						
						_this.startGcTimer(_server.gameType.getCredits, _this._callGetCreditsEverySeconds);

						//To TEST parar
						/*setTimeout(stop, 7000);
						function stop(){
							_this.stopGcTimer();
						}*/
						
					break;
					case "PlayResponse":
						/*
						var playResponse:PlayResponse = event.response as PlayResponse;
						_countersController.setCounterValue(CountersController.CREDITS_COUNTER, playResponse.credits);
						_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (playResponse.credits_in_cash));
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, playResponse.jackpot);
						*/
					break;
					case "GetExtraBallResponse":
						/*
						var getExtraResponse:GetExtraBallResponse = event.response as GetExtraBallResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, getExtraResponse.jackpot);
						//cuando es ultima extra, la resta del win se hace mismo en BingoMessageDecoder, cuando se arma getExtraResponse
						_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (getExtraResponse.credits_in_cash));
						_countersController.setCounterValue(CountersController.CREDITS_COUNTER, getExtraResponse.credits);
						*/
					break;
					case "GetCreditsResponse":
						/*
						var getCreditsResponse:GetCreditsResponse = event.response as GetCreditsResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, getCreditsResponse.jackpot);
						var parameters:ParametersData = ApplicationController.getApplicationController().parameters;
						if(gcActive && !parameters.is_log )
						{
							//trace("GC - updateCounter - BingoController");
							_countersController.setCounterValue(CountersController.SPECIAL_VALUE_COUNTER, getCreditsResponse.specialValue);
							_countersController.setCounterValue(CountersController.CREDITS_COUNTER, getCreditsResponse.credits);
							_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (getCreditsResponse.credits_in_cash));
						}
						*/
					break;
					case "ChangeConfigCards":
						/*
						var changeConfigCardResponse:ChangeConfigCardsResponse = event.response as ChangeConfigCardsResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeConfigCardResponse.jackpot);
						_countersController.setCounterValue(CountersController.TOTAL_BET_COUNTER, changeConfigCardResponse.totalBet);
						_countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (changeConfigCardResponse.totalBet * _server.gameType.getCoin())/100);
						*/
					break;
					case "ChangeCoinResponse":
						/*
						var changeCoinResponse:ChangeCoinResponse = event.response as ChangeCoinResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeCoinResponse.jackpot);
						_countersController.setCounterValue(CountersController.COIN_COUNTER, changeCoinResponse.coin);
						_countersController.setCounterValue(CountersController.CREDITS_COUNTER, changeCoinResponse.credits);
						_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (changeCoinResponse.credits_in_cash));
						_countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (changeCoinResponse.totalBet * _server.gameType.getCoin())/100);
						_countersController.setCounterValue(CountersController.SPECIAL_VALUE_COUNTER, changeCoinResponse.specialValue);
						*/
					break;
					case "ChangeBetResponse":
						/*
						var changeBetResponse:ChangeBetResponse = event.response as ChangeBetResponse;
						_countersController.setCounterValue(CountersController.BET_COUNTER, changeBetResponse.bet);
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeBetResponse.jackpot);
						_countersController.setCounterValue(CountersController.TOTAL_BET_COUNTER, changeBetResponse.totalBet);
						_countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (changeBetResponse.totalBet * _server.gameType.getCoin())/100);
						_countersController.setCounterValue(CountersController.SPECIAL_VALUE_COUNTER, changeBetResponse.specialValue);
						*/
					break;
					case "CancelExtraBallResponse":
						/*
						var cancelExtraBallResponse:CancelExtraBallResponse = event.response as CancelExtraBallResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, cancelExtraBallResponse.jackpot);
						_countersController.setCounterValue(CountersController.CREDITS_COUNTER, cancelExtraBallResponse.credits);
						*/
					break;
					case "ConnLostResponse":
						/*
						ApplicationController.getApplicationController().getCurrentApplicationView().showConnLost();
						*/
					break;
					case "ChangeStageResponse":
						/*
						var changeStageResponse:ChangeStageResponse = event.response as ChangeStageResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeStageResponse.jackpot);
						*/
					break;
					case "JackpotResponse":
						/*
						var jackpotResponse:JackpotResponse = event.response as JackpotResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, jackpotResponse.jackpot);
						*/
					break;
					case "JackpotShowResponse":
						/*
						var jackpotShowResponse:JackpotShowResponse = event.response as JackpotShowResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, jackpotShowResponse.jackpot);
						
						//TODO: RESTARLE el win y el jackpot al credit, para asi animar
						_countersController.setCounterValue(CountersController.CREDITS_COUNTER, jackpotShowResponse.credits);
						_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (jackpotShowResponse.credits_in_cash));
						*/
					break;
				}
			}
		}


		/*anterior

		function onServerResponse(event){ 

			var response = event.detail;
			if(response && response.type){
				
				switch(response.type){
					case "InitResponse":
						
						//var initResponse:InitResponse = event.response as InitResponse;
						_this._countersController.setCounterValue(CountersController.JACKPOT_COUNTER, response.jackpot);
						_this._countersController.setCounterValue(CountersController.COIN_COUNTER, response.coin);
						_this._countersController.setCounterValue(CountersController.CREDITS_COUNTER, response.credits);
						_this._countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (response.credits_in_cash));
						_this._countersController.setCounterValue(CountersController.BET_COUNTER, response.bet);
						_this._countersController.setCounterValue(CountersController.TOTAL_BET_COUNTER, (response.totalBet));
						_this._countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (response.totalBet * _server.gameType.coin)/100); //por que aca y no en la respuesta??
						
						
						_this.startGcTimer(_server.gameType.getCredits, _this._callGetCreditsEverySeconds);

						//To TEST parar
						/*setTimeout(stop, 7000);
						function stop(){
							_this.stopGcTimer();
						}
						
					break;
					case "PlayResponse":
						
						var playResponse:PlayResponse = event.response as PlayResponse;
						_countersController.setCounterValue(CountersController.CREDITS_COUNTER, playResponse.credits);
						_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (playResponse.credits_in_cash));
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, playResponse.jackpot);
						
					break;
					case "GetExtraBallResponse":
						
						var getExtraResponse:GetExtraBallResponse = event.response as GetExtraBallResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, getExtraResponse.jackpot);
						//cuando es ultima extra, la resta del win se hace mismo en BingoMessageDecoder, cuando se arma getExtraResponse
						_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (getExtraResponse.credits_in_cash));
						_countersController.setCounterValue(CountersController.CREDITS_COUNTER, getExtraResponse.credits);
						
					break;
					case "GetCreditsResponse":
						
						var getCreditsResponse:GetCreditsResponse = event.response as GetCreditsResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, getCreditsResponse.jackpot);
						var parameters:ParametersData = ApplicationController.getApplicationController().parameters;
						if(gcActive && !parameters.is_log )
						{
							//trace("GC - updateCounter - BingoController");
							_countersController.setCounterValue(CountersController.SPECIAL_VALUE_COUNTER, getCreditsResponse.specialValue);
							_countersController.setCounterValue(CountersController.CREDITS_COUNTER, getCreditsResponse.credits);
							_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (getCreditsResponse.credits_in_cash));
						}
						
					break;
					case "ChangeConfigCards":
						
						var changeConfigCardResponse:ChangeConfigCardsResponse = event.response as ChangeConfigCardsResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeConfigCardResponse.jackpot);
						_countersController.setCounterValue(CountersController.TOTAL_BET_COUNTER, changeConfigCardResponse.totalBet);
						_countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (changeConfigCardResponse.totalBet * _server.gameType.getCoin())/100);
						
					break;
					case "ChangeCoinResponse":
						
						var changeCoinResponse:ChangeCoinResponse = event.response as ChangeCoinResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeCoinResponse.jackpot);
						_countersController.setCounterValue(CountersController.COIN_COUNTER, changeCoinResponse.coin);
						_countersController.setCounterValue(CountersController.CREDITS_COUNTER, changeCoinResponse.credits);
						_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (changeCoinResponse.credits_in_cash));
						_countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (changeCoinResponse.totalBet * _server.gameType.getCoin())/100);
						_countersController.setCounterValue(CountersController.SPECIAL_VALUE_COUNTER, changeCoinResponse.specialValue);
						
					break;
					case "ChangeBetResponse":
						
						var changeBetResponse:ChangeBetResponse = event.response as ChangeBetResponse;
						_countersController.setCounterValue(CountersController.BET_COUNTER, changeBetResponse.bet);
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeBetResponse.jackpot);
						_countersController.setCounterValue(CountersController.TOTAL_BET_COUNTER, changeBetResponse.totalBet);
						_countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (changeBetResponse.totalBet * _server.gameType.getCoin())/100);
						_countersController.setCounterValue(CountersController.SPECIAL_VALUE_COUNTER, changeBetResponse.specialValue);
						
					break;
					case "CancelExtraBallResponse":
						
						var cancelExtraBallResponse:CancelExtraBallResponse = event.response as CancelExtraBallResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, cancelExtraBallResponse.jackpot);
						_countersController.setCounterValue(CountersController.CREDITS_COUNTER, cancelExtraBallResponse.credits);
						
					break;
					case "ConnLostResponse":
						
						ApplicationController.getApplicationController().getCurrentApplicationView().showConnLost();
						
					break;
					case "ChangeStageResponse":
						
						var changeStageResponse:ChangeStageResponse = event.response as ChangeStageResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeStageResponse.jackpot);
						
					break;
					case "JackpotResponse":
						
						var jackpotResponse:JackpotResponse = event.response as JackpotResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, jackpotResponse.jackpot);
						
					break;
					case "JackpotShowResponse":
						
						var jackpotShowResponse:JackpotShowResponse = event.response as JackpotShowResponse;
						_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, jackpotShowResponse.jackpot);
						
						//TODO: RESTARLE el win y el jackpot al credit, para asi animar
						_countersController.setCounterValue(CountersController.CREDITS_COUNTER, jackpotShowResponse.credits);
						_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (jackpotShowResponse.credits_in_cash));
						
					break;
				}
			}
		}*/


		//por ahora no va, parece que solo se necesita por SPEED_COUNTER, y deberia estar en ApplicationController
		/*override public function registerCustomCounters(countersController){
			//super.registerCustomCounters(countersController);
			countersController.registerCounter(CountersController.SPEED_COUNTER); //Y esto!?? pasarlo a ApplicationController con los demas
		}*/



		//private functions

		function replaceRoundConfigWithLogData(logs, roundConfig){ //function replaceRoundConfigWithLogData(logs:LogData, roundConfig:BingoRoundConfig):void
			/*
			roundConfig.cards        = logs.cards;
			roundConfig.coin         = logs.coin;
			roundConfig.credits      = logs.initialCredits;
			roundConfig.jackpot      = logs.jackpot;
			roundConfig.stake        = logs.betByCard;
			roundConfig.win          = logs.win; // logs.addedCredits;   //A cambiar win no esta multiplicado por la apuesta, esta en base 1, ticket id: 15219
			roundConfig.testPlays    = new Object();
			roundConfig.bonusData    = logs.bonus;	
			roundConfig.finalCredits = logs.finalCredits;
			//roundConfig.bonusExtraData = logs.bonusExtraData;
		
			var obj = new Object();
			obj.drawnBalls = JSON.parse('[' + logs.drawnBalls.join(",") + ']');
			var extraBalls:Array = new Array();
			var freeExtraPosition:int = -1;
			
			//A cambiar - ticket id: 15219
			for(var e:int = 0; e < logs.drawnExtraBalls.length; e++){
				extraBalls.push({isExtra: (e == logs.drawnExtraBalls.length-1) ? 0  : 1, extraCost: logs.extraBallsCost[e], ball: logs.drawnExtraBalls[e]});
				if(logs.extraBallsCost[e] == 0){ 
					freeExtraPosition = e; 
				}
			}
			obj.extraBalls = extraBalls;
			
			//A cambiar - ticket id: 15219
			if(extraBalls.length > 0){
				//roundConfig.initialExtraData = "1:" + extraBalls[1].ball + ":" + freeExtraPosition.toString();
				roundConfig.initialExtraData = "1:" + extraBalls[1].ball + ":" + extraBalls[1].extraCost;
			}else{
				roundConfig.initialExtraData = "0:0:-1";
			}
			
			var cards:Array = new Array();
			for(var i:int = 0; i < roundConfig.cards.length; i++){
				cards.push({"enabled":roundConfig.cards[i].enabled, "numbers":roundConfig.cards[i].numbers.join(",").split(",")});
			}
			
			roundConfig.testPlays = {"cards":cards, "plays":[obj]};
			ApplicationController.getApplicationController().sendNotification(EngineNotificationsEnum.LOG_NOTIFICATION, logs); // Martin
			*/
		}
	}




	//to global scope access:
	window.BingoController = BingoController;

	//Extends GameTypeController
	BingoController.prototype = GameTypeController.prototype;

}(window));

