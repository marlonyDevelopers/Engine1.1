(function(window){

	function ApplicationController(canvas, gameName, LanguageXmlEmbed, supportedLanguages, gameConfig, roundConfig, parameters, callGetCreditsEverySeconds, autoPanel, callJackpotEverySeconds){	
		//this.parameters //public variables -> se hace asi, con this, o afuera con el prototype...
		
		this.parameters; //una de las maneras de hacer variables publicas

		var _this = this;;

		var _gameName;
		var _gameConfig; //GameConfig
		var _gameSessionId;

		var _canvas;
		var _controllers              = []; //Dictionary
		var _applicationViews         = []; //Dictionary
		var _notifications            = []; //Dictionary
		var _notificationsSubscribers = []; //Vector.<INotificationReceiver>

		var _currentApplicationView  //String
		
		var _initialized = false;

		var _countersController; //CountersController
		var _gameTypeController; //GameTypeController
		var _soundController;    //SoundController

		
		this.getGameName = function(){
			return _gameName;
		}
 
		this.getGameConfig = function(){
			return _gameConfig;
		}

		this.getGameSessionId = function(){
			return _gameSessionId;
		}

		this.setGameSessionId = function(value){
			_gameSessionId = value;
		}
		
		this.getGameTypeController = function(){
			return _gameTypeController;
		}

		//static variable
		ApplicationController.freePlaySign;//static var freePlaySign:freePlayOverlay; //todo

		
		if(parameters == null){
			loadParams();
		}else{
			this.parameters = parameters;
		}

		_canvas    = canvas;
		gameName   == null ? alert('gameName can not be null') :   _gameName   = gameName;
		gameConfig == null ? alert('gameConfig can not be null') : _gameConfig = gameConfig;

		/*
		freePlaySign = new freePlayOverlay();
		_gameName = gameName;
		_gameSessionId = this.parameters.session;*/

		switch(gameConfig.gameType){
			case "SLOT":
				_gameTypeController = new SlotController(gameConfig, roundConfig, callGetCreditsEverySeconds * 1000);
			break;
			case "BINGO":
				_gameTypeController = new BingoController(gameConfig, roundConfig, callGetCreditsEverySeconds * 1000, callJackpotEverySeconds * 1000); 
			break;
		}	

		_controllers              = [];
		_notifications            = [];
		_applicationViews         = [];
		_notificationsSubscribers = [];

		/*
		var translatorController:TranslatorController = new TranslatorController(LanguageXmlEmbed, supportedLanguages, this.parameters.language); 
		translatorController.setupSubscriptions();*/	
		
		_countersController = new CountersController(new CountersModel());
		_countersController.registerCounter(CountersController.CREDITS_IN_CASH_COUNTER);
		_countersController.registerCounter(CountersController.TOTALBET_IN_CASH_COUNTER);
		_countersController.registerCounter(CountersController.WIN_IN_CASH_COUNTER);
		_countersController.registerCounter(CountersController.PAID_IN_CASH_STANDARDBAR_COUNTER);
		_countersController.registerCounter(CountersController.BET_COUNTER);
		_countersController.registerCounter(CountersController.WIN_COUNTER);
		_countersController.registerCounter(CountersController.JACKPOT_COUNTER);
		_countersController.registerCounter(CountersController.JACKPOT_COUNTER_VECTOR);
		_countersController.registerCounter(CountersController.COIN_COUNTER);
		_countersController.registerCounter(CountersController.CREDITS_COUNTER);
		_countersController.registerCounter(CountersController.TOTAL_BET_COUNTER);
		_countersController.registerCounter(CountersController.AUTOPLAYS_COUNTER);
		_countersController.registerCounter(CountersController.TOTALEXTRA_IN_CASH_COUNTER);
		_countersController.registerCounter(CountersController.TOTALAPUESTA_IN_CASH_COUNTER);
		_countersController.registerCounter(CountersController.SPECIAL_VALUE_COUNTER);
		_countersController.registerCounter(CountersController.SLOT_LINES_ON_COUNTER);
		_countersController.registerCounter(CountersController.DOUBLE_UP_COUNTER);



		



		//public functions
 
		this.init = function(){
			
			console.log("init");

			for(var key in _controllers){
				_controllers[key].init();
			}
			_initialized = true;

			_this.sendNotification(EngineNotificationsEnum.INITIALIZATION_COMPLETED_NOTIFICATION);
		}

		this.registerController = function(controller){
			var registered = false;
			for(var key in _controllers){
				if(_controllers[key].type == controller.type){
					registered = true;
					break;
				} 
			}
			(!registered)? _controllers[controller.type] = controller : alert("The controller " + controller.type + " is already registered");
		}

		this.registerController(_gameTypeController);

		this.getController = function(controllerType){  //(controllerType:Class):Controller{
			if(!_controllers.hasOwnProperty(controllerType)){
				alert("The controller of type: " + type + " is not registered");
				return null;
			}
			return _controllers[controllerType];
		}

		this.registerApplicationView = function(applicationView){  //(applicationView:IApplicationView):void{

			//controla que tenga los metodos 
			if(!applicationView.onShow || !applicationView.onHide){
				alert("The applicationView needs 'onShow' and 'onHide' functions");
			}
			//controla que tenga la propiedad type
			if(applicationView.type == ""){
				alert("The applicationView needs 'type' propertie");
			}
			//controla si ya esta registrada
			if(_applicationViews.hasOwnProperty(applicationView.type)){
				alert(applicationView.type + "  (applicationView) is already registered");
			}else{
				_applicationViews[applicationView.type] = applicationView;
			}
		}

		this.showApplicationView = function(type){
			if(_initialized){
				if(!_applicationViews.hasOwnProperty(type)){
					alert("The ApplicationView of type: " + type + " is not registered");
				}
				
				//TODO:
				if(_canvas.children.length > 0){
					for(var i = 0; i < _canvas.children.length; i++){
						_canvas.remove(_canvas.children[0]);
					}
				}

				_currentApplicationView = type;
				
				_canvas.add(_applicationViews[type].getView());
				_applicationViews[type].onShow();
				
				//_applicationViews[type].start();
				
				/*
				if((_applicationViews[type] as IApplicationView).isGameView()){
					if(parameters.is_log){
						(_applicationViews[type] as IApplicationView).showLogScreen(parameters.logData);
					}
				}
				*/

				_this.sendNotification(EngineNotificationsEnum.APPLICATIONVIEW_CHANGED_NOTIFICATION);
			}else{
				alert("You MUST call ApplicationController::init after you've registered all you Controllers");
			}
		}

		this.addSubscriber = function(notificationList, subscriber){  //(notificationList:Vector.<String>, subscriber:INotificationReceiver):void{
			
			for(var i = 0; i < notificationList.length; i++){
				var tmpVector;
				if(_notifications.hasOwnProperty(notificationList[i])){
					tmpVector = _notifications[notificationList[i]];
				}else{
					tmpVector = [];
					_notifications[notificationList[i]] = tmpVector;
				}

				tmpVector.push(subscriber);
			}
			/*
			va agregando notificaciones a medida que llegan,si ya la tiene agrega el subscritor a la lista de esa notificacion
			sino la tiene crea una lista para esa notificacion y agrega al subscritor
			para cada indice de _notifications guarda una lista de subscriptores.*/
		}

		this.sendNotification = function(type, data){ //(type:String, data:Object = null):void{
			if(_notifications.hasOwnProperty(type)){
				var subscribers = _notifications[type];
				for(var i = 0; i < subscribers.length; i++){
					if(subscribers[i].notificationReceived){
						subscribers[i].notificationReceived(type, data);
					}else{
						alert("All subscribers need to implement notificationReceived public function");
					}
				}
			}
		}

		this.getServer = function (decoder, dummyWorker, forceDummy){    //(decoder:IMessageDecoder, dummyWorker:Object = null, forceDummy:Boolean = true):ServerCommunicationManager{
			return _gameTypeController.getServer(decoder, dummyWorker, forceDummy);
		}


		//static functions

		ApplicationController.getApplicationController = function(){
			if(_this == null){
				alert("You must construct ApplicationController before you can access its instance");
			} else{
				return _this;
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


			_this.parameters          = new ParametersData();
			_this.parameters.language = window.language;
			_this.parameters.session  = window.session;
			_this.parameters.routes   = window.routes;
		}


		this.registerController(_countersController);
		_gameTypeController.registerCustomCounters(_countersController);

		/*
		
		
		_soundController = new SoundController();
		registerController(_soundController);
		
		registerController(translatorController);
		
		if(gameConfig.useStandardBar){
			var _stardardBarController:StandardBarController = new StandardBarController(autoPanel);
			registerController(_stardardBarController);
		
		_soundController.addSound(new GameSound('standardClickSnd', new standardClick()));
		}
		*/

		this.gameType = _gameTypeController;
	}


	//to global scope access:
	window.ApplicationController = ApplicationController;

}(window));