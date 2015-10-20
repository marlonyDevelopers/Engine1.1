(function(window){
	
	function WinPrizes(cardNumber){  //(cardNumber:int){
		this.cardNumber    = cardNumber;
		this.prizesIndexes =  []; // new Vector.<int>();
		this.prizes        =  [];// new Vector.<Prize>();
	}

	window.WinPrizes = WinPrizes;

}(window));