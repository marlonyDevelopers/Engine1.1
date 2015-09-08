(function(window){

	function CountersModel(){ 

		var _this     = this;
		var _counters = [];

		/**
		 * Add a new Counter to the counter's collection 
		 * @param key A key to identify the new Counter, must be unique
		 * @param initialValue An optional initial value for the counter
		 * 
		 */
		this.registerCounter = function(key, initialValue){  //(key:String, initialValue:Number = 0):void{
			if(!_counters.hasOwnProperty(key)){
				_counters[key] = initialValue;
			}else{
				alert("The counter " + key + " was already registered");
			}
		}
		
		/**
		 * Obtains the value of the specified counter
		 * @param key A key to identify the new Counter
		 * @return The value of the selected counter
		 * 
		 */
		this.getCounterValue = function(key){  //key:String):Number{
			if(_this.validateCounterExistance(key))
				return _counters[key];
			alert("Counter never registered: " + key);
		}
		
		this.getCounterValueVector = function(key){  //key:String):Vector.<int>{
			if(validateCounterExistance(key)){}
				return _counters[key];
			alert("Counter never registered: " + key);
		}		
		
		/**
		 * Sets the value of the specified counter 
		 * @param key The key that identify the counter
		 * @param newValue The new value for the counter
		 */
		this.setCounterValue = function(key, newValue){  //(key:String, newValue:Number):void{
			if(_this.validateCounterExistance(key))
				_counters[key] = newValue;
		}
		
		this.setCounterValueVector = function(key, newValue){  //(key:String, newValue:Vector.<int>):void{
			if(_this.validateCounterExistance(key))
				_counters[key] = newValue;
		}		
		
		/**
		 * Performs a Sum operation on the counter 
		 * @param key The key that identify the counter
		 * @param valueToAdd The value to add to the current value of the counter
		 * 
		 */
		this.addValueToCounter = function(key, valueToAdd){  //(key:String, valueToAdd:Number):void{
			if(_this.validateCounterExistance(key))
				_counters[key] += valueToAdd;
		}
		
		this.validateCounterExistance = function(key){  //(key:String):Boolean{
			return _counters.hasOwnProperty(key);
		}
	}


	//to global scope access:
	window.CountersModel = CountersModel;
	//Extends Model
	//CountersModel.prototype = Model.prototype; //falta, hacer si hace falta.

}(window));