(function(window){
	
	function WillPay(card, line, column, boxIndex, boxTotalWin){  //(card:int, line:int, column:int, boxIndex:int = -1, boxTotalWin:int = 0){
		
		if(!boxIndex) boxIndex    = -1;
		if(!boxTotalWin) boxIndex = 0;

		this.card           = card;
		this.line           = line;
		this.column         = column;
		this.boxTotalWin    = boxTotalWin;
		this.prizeIndexList = [];
		this.boxIndex == -1? this.boxIndex = this.column + (this.line * 5): this.boxIndex = boxIndex;
	
		this.sameBox = function(other){ //(other:WillPay):Boolean{
			if(other.card == this.card && other.boxIndex == this.boxIndex) return true;
			return false;
		}
		
		this.sameBoxSameState = function(other){                        //(other:WillPay):Boolean{
			if(!this.sameBox) alert('to use only if are the same box'); //throw new Error('to use only if are the same box');
			if(other.prizeIndexList.length != this.prizeIndexList.length) return false;
			if(other.boxTotalWin != this.boxTotalWin) return false;
			for(var i = 0; i < other.prizeIndexList.length; i++){
				if(this.prizeIndexList.indexOf(other.prizeIndexList[i]) == -1) return false;
			}
			return true;
		}
	}

	window.WillPay = WillPay;

}(window));