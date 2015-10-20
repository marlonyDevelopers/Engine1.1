(function(window){
	
	function GetCreditsResponse(){

		this.type = BingoResponseTypes.GET_CREDITS_RESPONSE;

		this.credits;
		this.credits_in_cash;
		this.jackpot;
		this.specialValue;
	}

	window.GetCreditsResponse = GetCreditsResponse;

}(window));