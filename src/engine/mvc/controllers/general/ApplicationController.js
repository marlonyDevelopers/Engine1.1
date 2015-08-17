(function(window){

	//public variables
	ApplicationController.prototype.parameters; //una de las maneras de hacer variables publicas

	//private variables
	var _gameName;
	var _gameConfig; //GameConfig
	var _gameSessionId;

	var _canvas;
	var _controllers      //Dictionary
	var _applicationViews;//Dictionary
	var _notifications    //Dictionary

	var _currentApplicationView  //String
	var _notificationsSubscribers//Vector.<INotificationReceiver>
	var _initialized = false;

	var _countersController; //CountersController
	var _gameTypeController; //GameTypeController
	var _soundController;    //SoundController


	//static variable
	var _instance;
	ApplicationController.freePlaySign;//static var freePlaySign:freePlayOverlay; //todo


	function ApplicationController(canvas, gameName, LanguageXmlEmbed, supportedLanguages, gameConfig, roundConfig, parameters, callGetCreditsEverySeconds, autoPanel, callJackpotEverySeconds){	
		//this.parameters //public variables -> se hace asi, con this, o afuera con el prototype...
		console.log("ApplicationController created");

		_instance = this;
		
		if(ApplicationController.prototype.parameters == null){
			loadParams();
		}else{
			ApplicationController.prototype.parameters = parameters;
		}

		gameName   == null ? alert('gameName can not be null') :   _gameName   = gameName;
		gameConfig == null ? alert('gameConfig can not be null') : _gameConfig = gameConfig;

		switch(gameConfig.gameType){
			case "SLOT":
				_gameTypeController = new SlotController(gameConfig, roundConfig, callGetCreditsEverySeconds * 1000);
			break;
			case "BINGO":
				_gameTypeController = new BingoController(gameConfig, roundConfig, callGetCreditsEverySeconds * 1000, callJackpotEverySeconds * 1000); 
			break;
		}	
		_controllers = [];
	}



	//public functions
 
	ApplicationController.prototype.init = function(){
		
		console.log("init");

		for(var key in _controllers){
			_controllers[key].init();
		}
		_initialized = true;

		//TODO
		//sendNotification(EngineNotificationsEnum.INITIALIZATION_COMPLETED_NOTIFICATION);
	}

	ApplicationController.prototype.registerController = function(controller){
		var registered = false;
		for(var key in _controllers){
			if(_controllers[key].type == controller.type){
				registered = true;
				break;
			} 
		}

		(!registered)? _controllers[controller.type] = controller : alert("The controller " + controller.type + " is already registered");
	}

	ApplicationController.prototype.getGameName = function(){
		return _gameName;
	}

	ApplicationController.prototype.getGameConfig = function(){
		return _gameConfig;
	}

	ApplicationController.prototype.getGameSessionId = function(){
		return _gameSessionId;
	}

	ApplicationController.prototype.setGameSessionId = function(value){
		_gameSessionId = value;
	}
	
	ApplicationController.prototype.getGameTypeController = function(){
		return _gameTypeController;
	}

	//public static functions

	ApplicationController.getApplicationController = function(){
		if(_instance == null){
			alert("You must construct ApplicationController before you can access its instance");
		} else{
			return _instance;
		}
	}



	//private functions

	function loadParams(objetoParams){
		console.log('TEST - loadParams - leer ApplicationController');
		//ApplicationController.prototype.parameters = "ShowBall3";


 		/*
 		Los de web deben dejar guardado un  objeto en algun lado, por ejemplo en objeto window:
 		window.loadParams = {};
		*/


		//TEST
		window.language = "es";
		window.session  = "FREEOOJJAGHGA222453789";
		window.routes   = "eeee";


		ApplicationController.prototype.parameters          = new ParametersData();
		ApplicationController.prototype.parameters.language = window.language;
		ApplicationController.prototype.parameters.session  = window.session;
		ApplicationController.prototype.parameters.routes   = window.routes;
	}



	//to global scope access:
	window.ApplicationController = ApplicationController;

}(window));