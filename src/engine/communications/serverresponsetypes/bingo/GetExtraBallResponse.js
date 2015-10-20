(function(window){

	function GetExtraBallResponse(){
		
		this.type = BingoResponseTypes.GET_EXTRA_BALL;

		this.credits;
		this.credits_in_cash;
		this.win;
		this.win_in_cash;
		this.jackpot;
		this.ball;
		this.hasMoreExtras;
		this.nextExtraCost;
		this.currentExtraPosition;
		this.bonusData;
		this.bonusData2;
		this.bonusExtraData; //nombre protocolo: Bonus Data Position
		this.specialValue;

		this.winPaid   = []; // new Vector.<WinPrizes>();
		this.willPay   = []; // new Vector.<WillPay>();
		this.cardsData = []; // new Vector.<BingoCardsData>();
	}

	window.GetExtraBallResponse = GetExtraBallResponse;

}(window));