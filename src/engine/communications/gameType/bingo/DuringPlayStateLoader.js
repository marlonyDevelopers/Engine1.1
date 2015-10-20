(function(window){

	function DuringPlayStateLoader(_game){  //(_game:BingoGameType){
		
		var game = _game;
		var cardsWinStates;      //:Array;                       
		var duringPlayWinPrizes; //:Vector.<WinPrizes>;     
		var duringPlayWillPay;   //:Vector.<WillPay>;  

		this.reset = function(){
			cardsWinStates      = [0,0,0,0]; 
			duringPlayWillPay   = []; //new Vector.<WillPay>;
			duringPlayWinPrizes = []; // new Vector.<WinPrizes>;
			for(var i = 0; i < 4; i++){
				duringPlayWinPrizes.push(new WinPrizes(i));
			}
		}

		
		this.loadCurrentBallData = function(number, card, box, response){  //(number, card:int, box:int, response:PlayResponse):void{
			/*console.log("");
			console.log("______________________________________________");
			console.log("");
			console.log("BALL " + number);
			console.log("");
			if(number == 2){
				console.log("");
			}
			*/
			var currentBallState = new DuringPlayState(); //:DuringPlayState
			//load wins data
			addWinData(currentBallState, card, duringPlayWinPrizes[card].prizesIndexes);
			saveWinPrizesData(currentBallState, duringPlayWinPrizes, card);
			//load almosts data
			addAlmostData(currentBallState, duringPlayWinPrizes[card].prizesIndexes, card);
			response.cardsStateDuringPlay[number] = currentBallState;
		}
		
		function addWinData(playState, card, prizes){ //(playState:DuringPlayState, card:int, prizes:Vector.<int>):void{
			var wins = [];
			for(var prize = game.gameConfig.prizes.length - 1; prize > -1; prize--){
				
				if(isWinPrize(prize, card)){
					
					tryToRemoveCoveredPrizes(wins, prize);
					wins.push(prize);
				}
			}
			//load playState
			playState.addWinPaid   = wins;
			playState.card         = card;
		}
		
		
		function saveWinPrizesData(playState, winPrizesVec, card){  //(playState:DuringPlayState, winPrizesVec:Vector.<WinPrizes>, card:int):void{
			/*
			console.log("");
			console.log("WIN PRIZES");
			console.log("");
			*/
			if(playState.addWinPaid.length > 0){

				winPrizesVec[card] = new WinPrizes(card);

				for( var i = 0; i < playState.addWinPaid.length; i++){

					winPrizesVec[card].prizesIndexes.push(playState.addWinPaid[i]);
					winPrizesVec[card].cardNumber = card;
					winPrizesVec[card].prizes.push(game.gameConfig.prizes[playState.addWinPaid[i]]);
				}
			}
			//load playState
			playState.cardWin   = getCardWin(playState.addWinPaid);
			playState.totalWin  = getTotalWin(playState.cardWin, card);
			playState.winPrizes = getCopy(winPrizesVec); 
			/*
			for(var _card:int = 0; _card < winPrizesVec.length; _card++){
				console.log("Card " + _card);
				for(var t:int = 0; t < winPrizesVec[_card].prizesIndexes.length; t++){
					console.log("win prize " + winPrizesVec[_card].prizesIndexes[t]);
				}
			}
			console.log("");
			
			console.log("card " + card + "  win " + playState.cardWin);
			console.log("total win "+ playState.totalWin);
			*/
		}
		
		function addAlmostData(playState, prizes, card){  //(playState:DuringPlayState, prizes:Vector.<int>, card:int):void{

			var almostVec = []  //:Vector.<WillPay> = new Vector.<WillPay>();
			var almost;         //:WillPay;
			var potentialState; //:DuringPlayState
			
			for(var k = 0; k < game.cards[card].boxes.length; k++){
				if(!game.cards[card].boxes[k].marked){
					
					game.cards[card].boxes[k].mark(true); //change to a potential card state
					
					potentialState = new DuringPlayState(); 
					addWinData(potentialState, card, prizes);
					var newWins = getNewsPrizes(prizes, potentialState.addWinPaid);

					var amount = 0;
					if(newWins.length > 0){
						for(var i = 0; i < newWins.length; i++){
							amount += game.gameConfig.prizes[newWins[i]].pay * game.bet;
						}
						almost = new WillPay(card, -1, -1, k, amount);
						almost.prizeIndexList = newWins;
						almostVec.push(almost);
					}
					
					game.cards[card].boxes[k].mark(false); //back to current card state
				}
			}

			playState.almostVec = almostVec;
			for(var h = 0; h < duringPlayWillPay.length; h++){
				if(card != duringPlayWillPay[h].card){
					playState.almostVec.push(duringPlayWillPay[h]);
				}
			}

			duringPlayWillPay = playState.almostVec;
			
			/*
			console.log("");
			console.log("ALMOST");
			console.log("");
			for(var r:int = 0; r < playState.almostVec.length; r++){
				console.log("");
				console.log("almost box " + playState.almostVec[r].boxIndex + " card " + playState.almostVec[r].card);
				if(playState.almostVec[r].prizeIndexList.length > 0){
					for( var g:int = 0; g < playState.almostVec[r].prizeIndexList.length; g++){
						console.log("	 prize " + playState.almostVec[r].prizeIndexList[g]);
					}
					console.log("boxTotalWin " + playState.almostVec[r].boxTotalWin);
				}
			}
			console.log("");
			*/
		}
		
		function isWinPrize(prizeIndex, card){  //(prizeIndex:int, card:int):Boolean{
			for(var box = 0; box < game.cards[card].boxes.length; box++){
				if(game.gameConfig.prizes[prizeIndex].definition[box] == 1 && !game.cards[card].boxes[box].marked){
					return  false;
				}
			}
			return true;
		}
		
		function tryToRemoveCoveredPrizes(wins, prizeIndex, checkindex){  //(wins:Array, prizeIndex:int, checkindex:int = 0):void{
			if(!checkindex) checkindex = 0;

			var auxIndex = game.gameConfig.prizes[prizeIndex].overriddenIndexes.indexOf(checkindex);
			if(auxIndex != -1){
				var removeIndex   = wins.indexOf(checkindex);
				if(removeIndex != -1)
					wins.splice(removeIndex, 1);
			}
			checkindex++;
			if(checkindex < game.gameConfig.prizes.length){
				tryToRemoveCoveredPrizes(wins, prizeIndex, checkindex);
			}
		}
		
		function tryToRemoveWonPrizes(wins, winPrizesCard){  //(wins:Array, winPrizesCard:Vector.<int>):void{
			var removeIndex;
			for(var i = 0; i < wins.length; i++){
				removeIndex = winPrizesCard.indexOf(wins[i]);
				if(removeIndex != -1){
					wins.splice(wins.indexOf(winPrizesCard[removeIndex]),1);
				}
			}
		}
		
		function getCardWin(wins){  //(wins:Array):int{
			var cardWin = 0;
			for(var i = 0; i < wins.length; i++){
				cardWin += game.gameConfig.prizes[wins[i]].pay * game.bet;
			}
			return cardWin;
		}
		
		function getTotalWin(currentCardWin, currentCard){  //(currentCardWin:int, currentCard:int):int{
			cardsWinStates[currentCard] = currentCardWin;
			return cardsWinStates[0] + cardsWinStates[1] + cardsWinStates[2] + cardsWinStates[3];
		}
		
		function getNewsPrizes(existPrizes, newPrizes){  //(existPrizes:Vector.<int>, newPrizes:Array):Vector.<int>{
			var vect = []; //:Vector.<int> = new Vector.<int>();
			for(var i = 0; i < newPrizes.length; i++){
				if(existPrizes.indexOf(newPrizes[i]) == -1){
					vect.push(newPrizes[i]);
				}
			}
			return vect;
		}
		
		function getCopy(winPrizesVec){ //(winPrizesVec:Vector.<WinPrizes>):Vector.<WinPrizes>{
			var newWinPrizesVect = []; //:Vector.<WinPrizes> = new Vector.<WinPrizes>();
			var winPrize; //:WinPrizes;
			for(var i = 0; i < winPrizesVec.length; i++){
				
				winPrize = new WinPrizes(winPrizesVec[i].cardNumber);
				newWinPrizesVect.push(winPrize);
				for(var j = 0; j < winPrizesVec[i].prizesIndexes.length; j++){  
					winPrize.prizesIndexes.push(winPrizesVec[i].prizesIndexes[j]);
					winPrize.prizes.push(winPrizesVec[i].prizes[j]);
				}
			}
			return newWinPrizesVect;
		}
		
		function copyArrayToVector(array){  //(array:Array):Vector.<int>{
			var vect = []; //:Vector.<int> = new Vector.<int>();
			for(var i = 0; i < array.length; i++){
				vect.push(array[i]);
			}
			return vect;
		}
		
		function printDuringPLayData(playRespose){  //(playRespose:PlayResponse):void{
			
			console.log("");
			console.log("_________________________________________________________________________________________________________________");
			console.log("*****************************************************************************************************************");
			console.log("      **** DURING PLAY PRINT DATA **** ");
			console.log("                                                                     *class DuringPlayStateLoader.as - Engine 1.1");
			console.log("_________________________________________________________________________________________________________________");
			
			var balls  = playRespose.drawnBalls; //:Vector.<int> = playRespose.drawnBalls
			var ballNumer; //:int;
			var playState; //:DuringPlayState;
			
			for(var i = 0; i < balls.length; i++){
				
				console.log("");
				console.log("__________________________");
				console.log("__________________________");
				console.log("");
				console.log("BALL " + balls[i]);
				console.log("");
				
				ballNumer = balls[i];
				
				if(ballNumer == 5){
					console.log("STOP")
				}
				
				if(playRespose.cardsStateDuringPlay[ballNumer]){
					
					playState = playRespose.cardsStateDuringPlay[ballNumer];
					
					console.log("");
					console.log("WIN PRIZES");
					console.log("");
					
					
					for(var _card = 0; _card < playState.winPrizes.length; _card++){
						console.log("Card " + _card);
						for(var t = 0; t < playState.winPrizes[_card].prizesIndexes.length; t++){
							console.log("win prize " + playState.winPrizes[_card].prizesIndexes[t]);
						}

					}
					
					console.log("");
					
					console.log("card " + playState.card + "  win " + playState.cardWin);
					console.log("total win "+ playState.totalWin);
					
					console.log("");
					console.log("..........................");
					console.log("");
					console.log("ALMOST");
					console.log("");
					for(var r = 0; r < playState.almostVec.length; r++){
						console.log("");
						console.log("almost box " + playState.almostVec[r].boxIndex + " card " + playState.almostVec[r].card);
						if(playState.almostVec[r].prizeIndexList.length > 0){
							for( var g = 0; g < playState.almostVec[r].prizeIndexList.length; g++){
								console.log("	 prize " + playState.almostVec[r].prizeIndexList[g]);
							}
							console.log("boxTotalWin " + playState.almostVec[r].boxTotalWin);
						}
					}
					
				}
				
			}
			
			console.log("");
			console.log("_____________________________________________");
			console.log("*********************************************");
			console.log("");
		}

	}

	window.DuringPlayStateLoader = DuringPlayStateLoader;

}(window));