(function(window){

	function ChangeConfigCardsResponse(){
		this.type = BingoResponseTypes.CHANGE_CONFIG_CARDS;

		this.jackpot;
		this.totalBet;
	}

	window.ChangeConfigCardsResponse = ChangeConfigCardsResponse;

}(window));