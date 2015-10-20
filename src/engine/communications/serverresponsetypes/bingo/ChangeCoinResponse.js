(function(window){
		
	function ChangeCoinResponse(){

		this.type = BingoResponseTypes.CHANGE_COIN_RESPONSE;

		this.credits;
		this.credits_in_cash;
		this.jackpot;
		this.bonusData;
		this.coin;
		this.totalBet;
		this.specialValue;
	}
	
	window.ChangeCoinResponse = ChangeCoinResponse;

}(window));