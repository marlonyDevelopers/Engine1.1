(function(window){

	var _this;	

	function BingoCardsData(){
		_this = this;
		this.enabled;
		this.changed  = false;
		this.totalWin = 0;
		this.numbers  = [];
		this.boxes    = [];

		this.addNumbersFromString = function(stringOfNumbers, separator){  //(stringOfNumbers:String, separator:String=";")
			//if(separator == undefined || separator == "") separator = ";";
			if(separator == null) separator = ";";
			var _numbers = stringOfNumbers.split(separator);

			for(var i = 0; i < _numbers.length; i++){
				_this.numbers.push(_numbers[i]);
				var box = new CardBox(_numbers[i], _this.setChanged); //:CardBox 
				_this.boxes.push(box);
			}
		}

		this.setChanged = function(value){
			this.changed = value;
		}

		this.addNumbersFromArray = function(arrayOfNumbers){
			addNumbersFromString(arrayOfNumbers.join(";"));
		}

		this.reset = function(){
			for(var i = 0; i < this.boxes.length; i++){
				this.boxes[i].reset();
			}
			setChanged(false);
			this.totalWin = 0;
		}

		this.changed = function(value){
			for(var i = 0; i < this.boxes.length; i++){
				this.boxes[i].changed(value);
			}
		}

		this.addWin = function(value){
			this.totalWin += value;
		}
	}


	//to global scope access:
	window.BingoCardsData = BingoCardsData;


}(window));