(function(window){

	var game;

	function BingoMessageDecoder(){

	}


	BingoMessageDecoder.prototype.setGameType = function(gameType){
		game = gameType;
		/*
		if(this.game.gameConfig.loadCardsStateDuringPlay){
			duringPlayLoader = new DuringPlayStateLoader(this.game);
		}*/
	}


	BingoMessageDecoder.prototype.decodeServerMessage = function(message){   //(message:Array):BaseResponse{
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

	function decodeLoginMessage(message){   //message:Array):LoginResponse{
		console.log('--> login '+ message.toString());
		var response = {};//:LoginResponse = new LoginResponse();
		response.status = message[2];
		return response;
	}



	//to global scope access:
	window.BingoMessageDecoder = BingoMessageDecoder;


}(window));