(function(window){

	function BingoCardsData(){
		var _this = this;
		this.enabled;
		this.changed  = false;
		this.totalWin = 0;
		this.numbers  = [];
		this.boxes    = [];

		this.hasChanged = function(){
			return _changed;
		}

		
		/*public function get numbers():Vector.<int>
		{
			return _numbers;
		}
		
		public function set numbers(value:Vector.<int>):void{
			_numbers = value;
		}
		
		public function get boxes():Vector.<CardBox>{
			return _boxes;
		}*/


		this.addNumbersFromString = function(stringOfNumbers, separator){  //(stringOfNumbers:String, separator:String=";")
			//if(separator == undefined || separator == "") separator = ";";
			if(separator == null) separator = ";";
			var _numbers = stringOfNumbers.split(separator);

			for(var i = 0; i < _numbers.length; i++){
				_this.numbers.push(parseInt(_numbers[i]));
				var box = new CardBox(_numbers[i], _this.setChanged); //:CardBox 
				_this.boxes.push(box);
			}

			/*
			if(separator == null) separator = ";";
			_this.numbers = stringOfNumbers.split(separator);

			for(var i = 0; i < _this.numbers.length; i++){
				//_this.numbers.push(_numbers[i]);
				var box = new CardBox(_this.numbers[i], _this.setChanged); //:CardBox 
				_this.boxes.push(box);
			}*/
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
			_this.setChanged(false);
			_this.totalWin = 0;
		}

		this.changed = function(value){
			for(var i = 0; i < this.boxes.length; i++){
				this.boxes[i].changed(value);
			}
		}

		this.setTotalWin = function(value){
			_this.totalWin = 0;
		}

		this.addWin = function(value){
			this.totalWin += value;
		}
	}


	//to global scope access:
	window.BingoCardsData = BingoCardsData;


}(window));