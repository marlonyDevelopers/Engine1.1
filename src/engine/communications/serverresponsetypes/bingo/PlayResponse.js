(function(window){

		function PlayResponse(){

			this.type = BingoResponseTypes.PLAY ; //BingoResponseTypes.PLAY;

			this.credits;
			this.credits_in_cash;
			this.win;
			this.win_in_cash;
			this.jackpot;
			this.hasExtra = true;
			this.extraCost;
			this.bonusData;
			this.bonusData2;
			this.bonusExtraData;  //nombre protocolo: Bonus Data Position
			this.toPayJackpot  = false;
			this.toPayJackpotValue = 0;
			this.specialValue;

			this.winPaid              = []; // new Vector.<WinPrizes>();
			this.willPay              = []; //  new Vector.<WillPay>();
			this.drawnBalls           = []; //  new Vector.<int>();
			this.freeExtraPos         = []; //  new Vector.<int>();
			this.stopOnPrizes         = []; //  new Vector.<StopOnPrize>();
			this.cardsData            = []; //  new Vector.<BingoCardsData>();
			this.cardsStateDuringPlay = []; //  new Vector.<DuringPlayState>((ApplicationController.getApplicationController().gameConfig as BingoGameConfig).maxBallNumber + 1);
		}

	window.PlayResponse = PlayResponse;

}(window));