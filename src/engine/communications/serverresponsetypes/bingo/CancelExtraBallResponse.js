(function(window){

	function CancelExtraBallResponse(){

		this.type = BingoResponseTypes.CANCEL_EXTRA_BALL;

		this.credits;
		this.creditsEnd; //guarda el cedito sin restarle el win
		this.credits_in_cash;
		this.credits_in_cashEnd; //guarda el cedito sin restarle el win
		this.jackpot;
		this.win;
		this.win_in_cash;

		this.remainingBalls = []; // new Vector.<CancelBall>();
	}

	window.CancelExtraBallResponse = CancelExtraBallResponse;

}(window));