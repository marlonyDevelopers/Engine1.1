(function(window){

	function CardBox(number, parentChangeFunction){
		var _this = this;

		this.changed = false;
	    this.number  = number;
	    this.marked  = false;
	    this.almost  = [];
	    this.totalToWin;
	    this.parentChangeFunction = parentChangeFunction;

	    this.setMarked = function(value){
	    	this.changed    = true;
			this.marked     = value;
			this.almost     = [];
			this.totalToWin = 0;
			this.parentChangeFunction(true);
		}

		this.addAlmost = function(prizeIndex, pays){  //(prizeIndex:int, pays:int):void{
			this.changed = true;
			this.marked = false;
			this.almost.push(new Almost(prizeIndex, pays));
			this.totalToWin += pays;
			this.parentChangeFunction(true);
		}

		this.hasAlmost = function(index){
			for(var i = 0; i < _almost.length; i++){
				if(_almost[i].box == index){
					return true;
				}
			}
			return false;
		}

		this.reset = function(){
			_changed = false;
			_marked = false;
			resetAlmost();
		}
	
		function resetAlmost(){
			_almost = [];
			_totalToWin = 0;
		}
	}




	//"class" Almost 
	function Almost(prizeIndex, pays, card){
		this.box  = prizeIndex;
		this.pays = pays;
		card == null? this.card = -1 : this.card = card;
	}


	//to global scope access:
	window.CardBox = CardBox;
	window.Almost  = Almost;

}(window));