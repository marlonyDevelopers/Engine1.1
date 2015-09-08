(function(window){
	
		CountersController.CREDITS_IN_CASH_COUNTER          = "CASH";
		CountersController.TOTALAPUESTA_IN_CASH_COUNTER     = "APUESTA_IN_CASH_COUNTER";
		CountersController.TOTALEXTRA_IN_CASH_COUNTER       = "EXTRA_IN_CASH_COUNTER";
		CountersController.TOTALBET_IN_CASH_COUNTER         = "BET_IN_CASH_COUNTER";
		CountersController.WIN_IN_CASH_COUNTER              = "WIN_IN_CASH_COUNTER";
		CountersController.PAID_IN_CASH_STANDARDBAR_COUNTER = "PAID_IN_CASH_STANDARDBAR_COUNTER";
		CountersController.CREDITS_COUNTER                  = "CREDITS";
		CountersController.COIN_COUNTER                     = "COIN";
		CountersController.BET_COUNTER                      = "BET";
		CountersController.TOTAL_BET_COUNTER                = "TOTAL_BET";
		CountersController.WIN_COUNTER                      = "WIN";
		CountersController.JACKPOT_COUNTER                  = "JACKPOT";
		CountersController.JACKPOT_COUNTER_VECTOR           = "JACKPOT_VECTOR";
		CountersController.SPEED_COUNTER                    = "SPEED";
		CountersController.FREE_PLAY_COUNTER                = "FREEPLAY";
		CountersController.DOUBLE_UP_COUNTER                = "DOUBLE_UP_BONUS";
		CountersController.AUTOPLAYS_COUNTER                = "AUTOPLAYS_COUNTER";
		CountersController.SPECIAL_VALUE_COUNTER            = "SPECIAL_VALUE_COUNTER";
		CountersController.SLOT_LINES_ON_COUNTER            = "SLOT_LINES_ON_COUNTER";

	function CountersController(model){ //:CountersModel

		var _this  = this;
		this.type  = "CountersController";
		this.model = model;


		/**
		 * Add a new Counter to the counter's collection 
		 * @param key A key to identify the new Counter, must be unique
		 * @param initialValue An optional initial value for the counter
		 * 
		 */
		this.registerCounter = function(key, initialValue){  //(key:String, initialValue:Number = 0):void{
			if(initialValue == null)initialValue = 0;
			_this.model.registerCounter(key, initialValue);
		}
		
		/**
		 * Obtains the value of the specified counter
		 * @param key A key to identify the new Counter
		 * @return The value of the selected counter
		 * 
		 */
		this.getCounterValue = function(key){  //(key:String):Number
			return _this.model.getCounterValue(key);
		}
		
		this.getCounterValueVector = function(key){  //(key:String):Vector.<int>
			return _this.model.getCounterValueVector(key);
		}		
		
		/**
		 * Sets the value of the specified counter 
		 * @param key The key that identify the counter
		 * @param newValue The new value for the counter
		 */
		this.setCounterValue = function(key, newValue){  //(key:String, newValue:Number):void
			_this.model.setCounterValue(key, newValue);
			ApplicationController.getApplicationController().sendNotification(EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION, key);
		}
		
		this.setCounterValueVector = function(key, newValue){  //(key:String, newValue:Vector.<int>):void{
			_this.model.setCounterValueVector(key, newValue);
			ApplicationController.getApplicationController().sendNotification(EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION, key);
		}		
		
		/**
		 * Performs a Sum operation on the counter 
		 * @param key The key that identify the counter
		 * @param valueToAdd The value to add to the current value of the counter
		 * 
		 */
		this.addValueToCounter = function(key, valueToAdd){  //(key:String, valueToAdd:Number):void{
			_this.model.addValueToCounter(key, valueToAdd);
			ApplicationController.getApplicationController().sendNotification(EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION, key);
		}
		
		this.validateCounterExistance = function(key){ //(key:String):Boolean{
			return _this.model.validateCounterExistance(key);
		}
	}




	//to global scope access:
	window.CountersController = CountersController;
	//Extends Controller
	CountersController.prototype = Controller.prototype;

}(window));