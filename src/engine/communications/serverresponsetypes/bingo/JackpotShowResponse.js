(function(window){
	
	function JackpotShowResponse(){
		this.type = BingoResponseTypes.JACKPOT_SHOW_RESPONSE;

		this.jackpot;
		this.credits;
		this.credits_in_cash;
	}

	window.JackpotShowResponse = JackpotShowResponse;

}(window));