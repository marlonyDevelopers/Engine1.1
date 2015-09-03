(function(window){

	function BingoMessageDecoder(){

		var game;
		var _this = this;


		//public functions

		this.setGameType = function(gameType){
			game = gameType;
			/*
			if(this.game.gameConfig.loadCardsStateDuringPlay){
				duringPlayLoader = new DuringPlayStateLoader(game);
			}*/
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
			var response = {};
			
			response.type              = "InitResponse";
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
			response.cards = [];
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
			response.drawnBalls = [];
			for(i = 0; i < drawBalls.length; i++){
				response.drawnBalls.push(drawBalls[i]);
			}

			response.bonusData    = message[14];
			response.firstTime    = message[15];
			response.specialValue = message[16]/100;
			
			game.setCards(response.cards);
			
			return response;
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

	}






	//to global scope access:
	window.BingoMessageDecoder = BingoMessageDecoder;

}(window));