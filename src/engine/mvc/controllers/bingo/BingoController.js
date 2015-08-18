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
				_server = new ServerCommunicationManager(new BingoGameType(gameConfig, decoder), new SocketServer());  //_server = new ServerCommunicationManager(new BingoGameType(gameConfig as BingoGameConfig, decoder as BingoMessageDecoder), new SocketServer(null));
			}

			//_server.addEventListener(ServerResponseEvent.SERVER_RESPONSE_EVENT, onServerResponse); //TODO custom event
			
			return _server; 
		}

	}

	function onServerResponse(event){ 
		/*if(event.response && event.response.type){
			switch(event.response.type){
				case BingoResponseTypes.PLAY:
					var playResponse:PlayResponse = event.response as PlayResponse;
					_countersController.setCounterValue(CountersController.CREDITS_COUNTER, playResponse.credits);
					_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (playResponse.credits_in_cash));
					_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, playResponse.jackpot);
				break;
				case BingoResponseTypes.INIT:
					var initResponse:InitResponse = event.response as InitResponse;
					_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, initResponse.jackpot);
					_countersController.setCounterValue(CountersController.COIN_COUNTER, initResponse.coin);
					_countersController.setCounterValue(CountersController.CREDITS_COUNTER, initResponse.credits);
					_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (initResponse.credits_in_cash));
					_countersController.setCounterValue(CountersController.BET_COUNTER, initResponse.bet);
					_countersController.setCounterValue(CountersController.TOTAL_BET_COUNTER, (initResponse.totalBet));
					_countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (initResponse.totalBet * _server.gameType.getCoin())/100);
					
					_getCreditsTimer = new Timer(_callGetCreditsEverySeconds);
					_getCreditsTimer.addEventListener(TimerEvent.TIMER, function (e:TimerEvent):void{
							_server.gameType.getCredits();
						});
					_getCreditsTimer.start();
					
					if((this.gameConfig as BingoGameConfig).toWeb){
						
						if((this.gameConfig as BingoGameConfig).toWeb == 0){
							_jackpotTimer = new Timer(_callJackpotEverySeconds);
							_jackpotTimer.addEventListener(TimerEvent.TIMER, function (e:TimerEvent):void{
								(_server.gameType as BingoGameType).getJackpot();
							});	
							if(!ApplicationController.getApplicationController().parameters.is_log)
								_jackpotTimer.start();	
						}
					}
				break;
				case BingoResponseTypes.GET_EXTRA_BALL:
					
					var getExtraResponse:GetExtraBallResponse = event.response as GetExtraBallResponse;
					_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, getExtraResponse.jackpot);
					//cuando es ultima extra, la resta del win se hace mismo en BingoMessageDecoder, cuando se arma getExtraResponse
					_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (getExtraResponse.credits_in_cash));
					_countersController.setCounterValue(CountersController.CREDITS_COUNTER, getExtraResponse.credits);

				break;
				case BingoResponseTypes.GET_CREDITS_RESPONSE:
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
				case BingoResponseTypes.CHANGE_CONFIG_CARDS:
					var changeConfigCardResponse:ChangeConfigCardsResponse = event.response as ChangeConfigCardsResponse;
					_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeConfigCardResponse.jackpot);
					_countersController.setCounterValue(CountersController.TOTAL_BET_COUNTER, changeConfigCardResponse.totalBet);
					_countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (changeConfigCardResponse.totalBet * _server.gameType.getCoin())/100);
				break;
				case BingoResponseTypes.CHANGE_COIN_RESPONSE:
					var changeCoinResponse:ChangeCoinResponse = event.response as ChangeCoinResponse;
					_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeCoinResponse.jackpot);
					_countersController.setCounterValue(CountersController.COIN_COUNTER, changeCoinResponse.coin);
					_countersController.setCounterValue(CountersController.CREDITS_COUNTER, changeCoinResponse.credits);
					_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (changeCoinResponse.credits_in_cash));
					_countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (changeCoinResponse.totalBet * _server.gameType.getCoin())/100);
					_countersController.setCounterValue(CountersController.SPECIAL_VALUE_COUNTER, changeCoinResponse.specialValue);
					
				break;
				case BingoResponseTypes.CHANGE_BET_RESPONSE:
					var changeBetResponse:ChangeBetResponse = event.response as ChangeBetResponse;
					_countersController.setCounterValue(CountersController.BET_COUNTER, changeBetResponse.bet);
					_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeBetResponse.jackpot);
					_countersController.setCounterValue(CountersController.TOTAL_BET_COUNTER, changeBetResponse.totalBet);
					_countersController.setCounterValue(CountersController.TOTALBET_IN_CASH_COUNTER, (changeBetResponse.totalBet * _server.gameType.getCoin())/100);
					_countersController.setCounterValue(CountersController.SPECIAL_VALUE_COUNTER, changeBetResponse.specialValue);
				break;
				case BingoResponseTypes.CANCEL_EXTRA_BALL:
					var cancelExtraBallResponse:CancelExtraBallResponse = event.response as CancelExtraBallResponse;
					_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, cancelExtraBallResponse.jackpot);
					_countersController.setCounterValue(CountersController.CREDITS_COUNTER, cancelExtraBallResponse.credits);
					//_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (cancelExtraBallResponse.credits_in_cash)); must to do in game
				break;
				case BingoResponseTypes.CONN_LOST:
					ApplicationController.getApplicationController().getCurrentApplicationView().showConnLost();
				break;
				case BingoResponseTypes.CHANGE_STAGE_RESPONSE:
					var changeStageResponse:ChangeStageResponse = event.response as ChangeStageResponse;
					_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, changeStageResponse.jackpot);
				break;
				case BingoResponseTypes.JACKPOT_RESPONSE:
					
					var jackpotResponse:JackpotResponse = event.response as JackpotResponse;
					//trace("JACKPOT: " + jackpotResponse.jackpot);
					//_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, jackpotResponse.jackpot);
					
				break;
				case BingoResponseTypes.JACKPOT_SHOW_RESPONSE:
					
					var jackpotShowResponse:JackpotShowResponse = event.response as JackpotShowResponse;
					_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, jackpotShowResponse.jackpot);
					
					//TODO: RESTARLE el win y el jackpot al credit, para asi animar
					_countersController.setCounterValue(CountersController.CREDITS_COUNTER, jackpotShowResponse.credits);
					_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, (jackpotShowResponse.credits_in_cash));
					
				break;
			}
		}*/
	}


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


	//to global scope access:
	window.BingoController = BingoController;

	//Extends GameTypeController
	BingoController.prototype = GameTypeController.prototype;

}(window));

