(function(window){

	function ChangeCardNumbersResponse(){
		this.type  = BingoResponseTypes.CHANGE_CARD_NUMBERS;
		this.cards = []; //new Vector.<BingoCardsData>();
	}

	window.ChangeCardNumbersResponse = ChangeCardNumbersResponse;

}(window));