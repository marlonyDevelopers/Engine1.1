(function(window){

	function InitResponse(){
		this.type = BingoResponseTypes.INIT;

		this.coin;
		this.credits;
		this.credits_in_cash;
		this.win;
		this.win_in_cash;
		this.jackpot;
		this.bet;
		this.totalBet;
		this.freeBallsPosition;
		this.bonusData;
		this.firstTime;
		this.specialValue;

		this.drawnBalls = []; // new Vector.<int>();
		this.cards = [];     //  new Vector.<BingoCardsData>();
	}

	window.InitResponse = InitResponse;

}(window));