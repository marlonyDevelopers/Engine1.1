(function(window){

	function BingoMessageDecoder(){

		var game;
		var _this = this;

		var lastWin              = 0;
		var nextExtraCost        = 0;
		var currentExtraPosition = 1;
		var duringPlayLoader;

		//public functions

		this.setGameType = function(gameType){
			game = gameType;
			
			if(game.gameConfig.loadCardsStateDuringPlay){
				duringPlayLoader = new DuringPlayStateLoader(game);
			}
		}

		this.decodeServerMessage = function(message){   //(message:Array):BaseResponse{
			var response;
			if (message[0] == "&&") {
				switch(message[1]){
					case 'L':
						response = decodeLoginMessage(message);
						break;     
					case 'I':      
						response = decodeInitMessage(message);
						break;     
					case 'CB':     
						response = decodeChangeBetMessage(message);
						break;     
					case 'CN':     
						response = decodeChangeCardNumbersMessage(message);
						break;     
					case 'CCC':  
						response = decodeChangeConfigCards(message);
						break;     
					case 'W':      
						response = decodePlayResponse(message);
						break;     
					case 'GEB':
					case 'GEBE':
						response = decodeExtraBallResponse(message);
						break;     
					case 'CEB':    
						response = decodeCancelExtraBallResponse(message);
						break;     
					case 'CC':     
						response = decodeChangeCoinResponse(message);
						break;     
					case 'GC':     
						response = decodeGetCreditsResponse(message);
						break;
					case 'CS':    
						response = decodeChangeStage(message);
						break;
					case 'J':    
						response = decodeJackpotResponse(message);
						break;
					case 'NJS':    
						response = decodeJackpotShow(message);
						break;
					default:
						response = decodeConnLostResponse(message);
						break;
				}
			}else{
				alert("Server message format error");
			}
			return response;
		}

		this.getLastWin = function(){
			return lastWin;
		}
		
		this.getNextExtraCost = function(){
			return nextExtraCost;
		}

		//private functions

		function decodeLoginMessage(message){   //message:Array):LoginResponse{
			console.log('--> login '+ message.toString());

			var response    = {};//:LoginResponse = new LoginResponse();
			response.type   = "LoginResponse";
			response.status = message[2];
			return response;
		}

		function decodeInitMessage(message){
			console.log('--> init '+ message.toString());
			var response = new InitResponse();
			
			response.coin              = game.coin = message[2];
			response.credits           = message[3] / game.coin;
			response.credits_in_cash   = (parseInt(message[3]))/100;
			response.win               = message[4];
			response.win_in_cash       = response.win * (game.coin/100);    
			response.jackpot           = message[5]/100;
			response.bet               = game.bet = message[6];
			response.freeBallsPosition = message[8];
			
			var openCards  = message[7].split("");
			var index      = 9;

			for(var i = 0; i < openCards.length; i++){
				var card = new BingoCardsData(); //var card:BingoCardsData
				card.addNumbersFromString(message[index]);
				card.enabled = (openCards[i] == 0) ? false : true;
				response.cards.push(card);
				index++;
			}
			
			response.totalBet = response.bet * countOpenCards(response.cards);
			
			var drawBalls = message[index].split(";");
			index++;
			for(i = 0; i < drawBalls.length; i++){
				response.drawnBalls.push(drawBalls[i]);
			}

			response.bonusData    = message[14];
			response.firstTime    = message[15];
			response.specialValue = message[16]/100;
			
			game.setCards(response.cards);
			
			return response;
		}


		function decodeChangeCardNumbersMessage(message){
			console.log('--> ChangeCardNumbers '+ message.toString());
			
			var response  = new ChangeCardNumbersResponse();//{};
			var cards     = message.length;
			
			for(var i = 2; i < cards; i++){
				var card = new BingoCardsData();
				card.addNumbersFromString(message[i]);
				response.cards.push(card);
			}
			game.setCards(response.cards);
			return response;
		}


		function decodeGetCreditsResponse(message){
			var response  = new GetCreditsResponse(); //{};
			//response.type = "GetCreditsResponse";

			response.credits         = message[2] / game.coin;
			response.credits_in_cash = (parseInt(message[2]))/100;
			response.jackpot         = message[3]/100;
			response.specialValue    = message[4]/100;
			return response;
		}

		function decodePlayResponse(message){
			
			if(game.gameConfig.loadCardsStateDuringPlay) duringPlayLoader.reset(); 
			
			for(var i = 0; i < game.cards.length; i++){
				game.cards[i].reset();
			}
			currentExtraPosition = 1;

			var response  = new PlayResponse(); 
			
			response.credits         = message[2] / game.coin;
			response.credits_in_cash = (parseInt(message[2])) / 100;
			lastWin = response.win   = message[3];
			response.win_in_cash     = response.win * (game.coin/100);
			response.jackpot         = message[4]/100;
			if(message[13] > 0){
				response.toPayJackpot      = true;
				response.toPayJackpotValue = message[13];
			}
			response.bonusData      = message[9];
			response.bonusExtraData = message[10];  //nombre protocolo: Bonus Data Position
			response.bonusData2     = message[14];
			response.hasExtra       = (message[6] == "0") ? false : true;
			response.extraCost      = message[7]; 
			
			var freeExtra = message[8].split(";");
			for(i = 0; i < freeExtra.length; i++){
				response.freeExtraPos.push(freeExtra[i]);
			}
			
			response.specialValue = message[15]/100;
			nextExtraCost         = response.extraCost;
			var drawnBalls        = message[5].split(";");

			for(i = 0; i < drawnBalls.length; i++){
				response.drawnBalls.push(drawnBalls[i]);
				tryToMarkNumber(drawnBalls[i], response);
			}
			
			var winPaid      = JSON.parse(message[11]);// as Array;
			response.winPaid = processWinPaidArray(winPaid);

			var willPayList  = JSON.parse(message[12]); //as Array;
			response.willPay = processWillPayArray(willPayList);

			response.cardsData = game.cards;

			//to print duringPLayData -> printDuringPlayData = 1 in game bingoGameConfig.js
			if(game.gameConfig.loadCardsStateDuringPlay && game.gameConfig.printDuringPlayData) duringPlayLoader.printDuringPLayData(response);
			
			return response;
		}

		function decodeExtraBallResponse(message){  //(message:Array):GetExtraBallResponse{
			
			for(var i = 0; i < game.cards.length; i++){
				game.cards[i].changedfunc(false); //era changed(false) pero tenia 2 definiciones una funcion y otra variable incompatibles y saltaba
			}
				
			var response                  = new GetExtraBallResponse();
			response.credits              = message[2] / game.coin;
			response.credits_in_cash      = (parseInt(message[2]))/100;
			lastWin    = response.win     = message[3];
			response.win_in_cash          = response.win * (game.coin/100);
			response.jackpot              = parseInt(message[4])/100;
			response.bonusData            = message[8];
			response.bonusExtraData       = message[11]; //nombre protocolo: Bonus Data Position
			response.bonusData2           = message[12];
			response.currentExtraPosition = currentExtraPosition;

			//quita el win de ultima extra.
			
			var index = game.gameConfig.numberOfExtraBalls;
			if(	currentExtraPosition == index){
				response.credits -= response.win;
				response.credits_in_cash -= response.win_in_cash;
			}
			
			response.ball          = message[5];
			tryToMarkNumber(response.ball);
			response.hasMoreExtras = (message[6] == "0") ? false : true;
			response.nextExtraCost = message[7];

			nextExtraCost = response.nextExtraCost;
			
			var winPaid      = JSON.parse(message[9]);
			response.winPaid = processWinPaidArray(winPaid);
			
			var willPay      = JSON.parse(message[10]);
			response.willPay = processWillPayArray(willPay);
			
			currentExtraPosition++;
			
			response.cardsData    = game.cards;
			response.specialValue = message[12]/100;

			return response;
		}

		function decodeCancelExtraBallResponse(message){  //(message:Array):CancelExtraBallResponse{
			for(var i = 0; i < game.cards.length; i++){
				game.cards[i].reset();
			}
			
			var response               = new CancelExtraBallResponse();
			response.credits           = message[2] / game.coin;
			response.creditsEnd        = message[2] / game.coin;
			response.credits_in_cash   = (parseInt(message[2]))/100;
			response.jackpot           = parseInt(message[3])/100;
			response.win               = lastWin;
			response.win_in_cash       = response.win * (game.coin/100);
			
			response.credits          -= lastWin;
		
			//A cambiar - ticket id: 15220
			response.credits_in_cashEnd = response.credits_in_cash;
			response.credits_in_cash   -= response.win_in_cash;
			
			var balls   = message[4].split(";");
			var params  = ApplicationController.getApplicationController().parameters;
			var willPay = (params.is_log && params.logData) ? calculateCancelPayFromLog(params.logData) : message[5].split(";");
			if(balls.length != willPay.length){
				alert("Error on cancel extra ball, the server sent different ball and ball pays numbers");
			}
			for(i = 0; i < balls.length; i++){
				response.remainingBalls.push({ballNumber:balls[i], win:willPay[i] * game.bet});
			}
			return response;
		}

		function tryToMarkNumber(number, response){  //(number:int, response:PlayResponse = null):void{
			for(var i = 0; i < game.cards.length; i++){
				if(game.cards[i].enabled){
					for(var j = 0; j < game.cards[i].numbers.length; j++){
						if(game.cards[i].enabled && game.cards[i].numbers[j] == number){
							game.cards[i].boxes[j].setMarked(true);
							if(game.gameConfig.loadCardsStateDuringPlay && response.type == "PlayResponse"){

								duringPlayLoader.loadCurrentBallData(number, i, j, response);
							}
							break;
						}
					}
				}
			}
		}

		function processWinPaidArray(winPaid){  //(winPaid:Array):Vector.<WinPrizes>{

			/*
				ver si JSON.parse() funciona en los otros navegadores.
				LLega un array con 4 array adentro descodificando esto: [[],[],[],[6,11,13]]
				1 vacio
				2 vacio
				3 vacio
				4 lenht = 3   6,11,13
			*/


			var list = [];
			for(var i = 0; i < winPaid.length; i++){


				//objeto "WinPrizes".
				var win = {};
				win.cardNumber = i;
				win.prizes = new Array();
				win.prizesIndexes = new Array();



				var hasWonSomething = false;
				
				if(game.cards[i].hasChanged){
					game.cards[i].setTotalWin(0);
				}
				
				for(var j = 0; j < winPaid[i].length; j++){
					hasWonSomething = true;
					var prizeIndex  = winPaid[i][j];
					
					//objeto "Prize".
					var prize       = {};
					prize.index     = prizeIndex;
					prize.name      = game.gameConfig.prizes[prizeIndex].name;
					
					win.prizesIndexes.push(prizeIndex);
					win.prizes.push(prize);
					
					if(game.cards[i].enabled){
						if(game.cards[i].hasChanged){
							game.cards[i].addWin(game.gameConfig.prizes[prizeIndex].pay * game.bet);
						}
					}
					
				}
				if(hasWonSomething){ list.push(win); }
			}
			return list;

			/*
			var list = [];
			for(var i = 0; i < winPaid.length; i++){

				var win = new WinPrizes(i);
				var hasWonSomething = false;
				
				if(game.cards[i].hasChanged){
					game.cards[i].setTotalWin(0);
				}
				
				for(var j = 0; j < winPaid[i].length; j++){
					hasWonSomething = true;
					var prizeIndex  = winPaid[i][j];
					
					var prize       = new Prize();
					prize.index     = prizeIndex;
					prize.name      = game.gameConfig.prizes[prizeIndex].name;
					
					win.prizesIndexes.push(prizeIndex);
					win.prizes.push(prize);
					
					if(game.cards[i].enabled){
						if(game.cards[i].hasChanged){
							game.cards[i].addWin(game.gameConfig.prizes[prizeIndex].pay * game.bet);
						}
					}
					
				}
				if(hasWonSomething){ list.push(win); }
			}
			return list;*/
		}

		function processWillPayArray(willPayList){  //(willPayList:Array):Vector.<WillPay>{


			// [[1, 1, 1, [17]], [3, 0, 0, [3]], [3, 0, 3, [9]]]

			
			var list = [];
			for(var i = 0; i < willPayList.length; i++){
				if(willPayList[i].length == 4){
					

					//objeto "willPay".
					var willPay = {}; //new WillPay(willPayList[i][0], willPayList[i][1], willPayList[i][2]);
					willPay.card           = willPayList[i][0];
					willPay.line           = willPayList[i][1];
					willPay.column         = willPayList[i][2];
					willPay.boxIndex       = willPay.column + (willPay.line * 5);
					willPay.boxTotalWin    = 0; //se setea mas abajo
					willPay.prizeIndexList = new Array();


					for(var j = 0; j < willPayList[i][3].length; j++){
						willPay.prizeIndexList.push(willPayList[i][3][j]);
						//new:
						console.log("->>>" + typeof ApplicationController.getApplicationController().getGameConfig().prizes);
						console.log("->>>" +  ApplicationController.getApplicationController().getGameConfig().prizes.length);
						console.log("->>>" +  ApplicationController.getApplicationController().getGameConfig().prizes[willPayList[i][3][j]]);


						console.log("->>>" +  willPayList);
						console.log("->>>" +  willPayList[i].length);
						console.log("->>>" +  willPayList[i][3].length);
						console.log("->>>" +  willPayList[i][3][j]);

						// ->>>object
						// ->>>17
						// ->>>undefined
						// ->>>4
						// ->>>1
						// ->>>17
						/*
						El probelma es que busca por el indice, viene 17, pero
						*/

						willPay.boxTotalWin += ApplicationController.getApplicationController().getGameConfig().prizes[willPayList[i][3][j]].pay * game.bet;
					}
					if(willPay.prizeIndexList.length > 0){
						list.push(willPay);
						var box     = game.cards[willPay.card].boxes[getIndexByColAndRow(willPay.column, willPay.line, game.gameConfig.cardsSize.x)];
						var changed = false;
						for(var x = 0; x < willPay.prizeIndexList.length; x++){
							var index = willPay.prizeIndexList[x];
							if(!box.hasAlmost(index)){
								changed = true;
								box.addAlmost(index, game.gameConfig.prizes[index].pay * game.bet);
							}
						}
						if(!changed){
							box.changed(false);
						}
					}
				}
			}
			return list;

			/*
			var list = [];
			for(var i = 0; i < willPayList.length; i++){
				if(willPayList[i].length == 4){
					var willPay = new WillPay(willPayList[i][0], willPayList[i][1], willPayList[i][2]);
					for(var j = 0; j < willPayList[i][3].length; j++){
						willPay.prizeIndexList.push(willPayList[i][3][j]);
						//new:
						willPay.boxTotalWin += ApplicationController.getApplicationController().gameConfig.prizes[willPayList[i][3][j]].pay * game.bet;
					}
					if(willPay.prizeIndexList.length > 0){
						list.push(willPay);
						var box     = game.cards[willPay.card].boxes[getIndexByColAndRow(willPay.column, willPay.line, game.gameConfig.cardsSize.x)];
						var changed = false;
						for(var x = 0; x < willPay.prizeIndexList.length; x++){
							var index = willPay.prizeIndexList[x];
							if(!box.hasAlmost(index)){
								changed = true;
								box.addAlmost(index, game.gameConfig.prizes[index].pay * game.bet);
							}
						}
						if(!changed){
							box.changed(false);
						}
					}
				}
			}
			return list;*/
		}
		
		function getIndexByColAndRow(column, row, totalColumns){  //(column:int, row:int, totalColumns:int):int{
			var pos = column + (row * totalColumns);
			return pos;
		}

		function countOpenCards(cards){
			var openCards = 0;
			for(var i = 0; i < cards.length; i++){
				if(cards[i].enabled){
					openCards++;
				}
			}
			return openCards;
		}


		function calculateCancelPayFromLog(logData){  //(logData:LogData):Array{
			
			alert("TODO:  bingoMessageDecoder.js -> calculateCancelPayFromLog");
			/*
			var willPay:Array = new Array();
			var ocurrences:Dictionary = new Dictionary();
			var wins:Array;
			var lastWin:String = "";
			
			for(var i:int = 0; i <= logData.buyedExtraBalls; i++){
				if(lastWin != logData.priceIndexes[i]){
					lastWin = logData.priceIndexes[i];
					wins = logData.priceIndexes[i].split(",");
					for(var j:int = 0; j < wins.length; j++){
						var count:int = lastWin.split(wins[j]).length;
						if(wins[j] in ocurrences && ocurrences[wins[j]] < count){
							ocurrences[wins[j]] = count;
						}else{
							ocurrences[wins[j]] = 1;
						}
					}
				}
			}
			
			for(i; i <logData.priceIndexes.length; i++){
				if(lastWin != logData.priceIndexes[i]){
					lastWin = logData.priceIndexes[i];
					wins = logData.priceIndexes[i].split(",");
					var lineOcurrences:Dictionary = new Dictionary();
					for(var l:int = 0; l < wins.length; l++){
						if(wins[l] in lineOcurrences){
							lineOcurrences[wins[l]] += 1;
						}else{
							lineOcurrences[wins[l]] = 1;
						}
					}
					
					var prizePay:int = 0;
					for(var key:String in lineOcurrences){
						var prev:int = (ocurrences.hasOwnProperty(key)) ? ocurrences[key] : 0;
						var newCount:int = lineOcurrences[key];
						var dif:int = newCount - prev;
						if(dif > 0){
							ocurrences[key] = (ocurrences.hasOwnProperty(key)) ? ocurrences[key] + dif : dif;
							prizePay += getPrizePay(key) * dif;
						}
					}
					willPay.push(prizePay);	
				}else{
					willPay.push(0);
				}
				
			}
			
			function getPrizePay(prizeName:String):int{
				var gameConfig:BingoGameConfig = ApplicationController.getApplicationController().gameType.gameConfig as BingoGameConfig;
				for(var i:int = 0; i < gameConfig.prizes.length; i++){
					if(gameConfig.prizes[i].name == prizeName){
						return gameConfig.prizes[i].pay;
					}
				}
				return null;
			}
			
			return willPay;*/
		}


	}

	//to global scope access:
	window.BingoMessageDecoder = BingoMessageDecoder;

}(window));