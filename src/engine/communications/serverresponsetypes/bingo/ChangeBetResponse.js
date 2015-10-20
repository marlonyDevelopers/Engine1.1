(function(window){

	function ChangeBetResponse(){

		this.type = BingoResponseTypes.CHANGE_BET_RESPONSE;

		this.jackpot;
		this.bonusData;
		this.bet;
		this.totalBet;
		this.specialValue;
	}

	window.ChangeBetResponse = ChangeBetResponse;

}(window));