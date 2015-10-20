(function(window){

	function DuringPlayState(){
		this.card;               //:int;
		this.totalWin;           //:int;
		this.cardWin;            //:int;
		this.almostVec     = []; //new Vector.<WillPay>();
		this.winPrizes     = []; //new Vector.<WinPrizes>();
		this.addWinPaid    = []; // uso interno
	}

	window.DuringPlayState = DuringPlayState;

}(window));