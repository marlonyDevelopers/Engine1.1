(function(window){

    var _isGameView;
    //var _type;
    var _logScreen;
    var _conLost;

    ApplicationView.prototype.type 

	function ApplicationView(isGameView, type){
		_isGameView = isGameView
		ApplicationView.prototype.type = type;
	}

	ApplicationView.prototype.showConnLost = function(width, height){ //(width:int=0, height:int=0){
		/*
		var _conLost:_ConLost = new _ConLost();
		
		if(width == 0){
			_conLost.width  = (getDisplayObject() as DisplayObject).stage.stageWidth;
			_conLost.height = (getDisplayObject() as DisplayObject).stage.stageHeight;
		}else{
			_conLost.width  = width;
			_conLost.height = height;	
		}

		_conLost.mouseChildren = _conLost.mouseEnabled = true;
		getDisplayObject().stage.addChild(_conLost);*/
	}

	ApplicationView.prototype.showLogScreen = function(logData){ //(logData:LogData){
		/*
		_logScreen         = new LogScreen();
		_logScreen.name    = "logScreen";
		var screenW:Number = (getDisplayObject() as DisplayObject).stage.width;
		var screenH:Number = (getDisplayObject() as DisplayObject).stage.height;
		
		_logScreen.x = 0; _logScreen.y = 0;
		_logScreen.session_data.x = 0; _logScreen.session_data.y = screenH/2;
		_logScreen.play_data.x = screenW/2; _logScreen.play_data.y = screenH/2; 
		_logScreen.background.x = screenW/2; _logScreen.background.y = screenH/2;
		_logScreen.mouseChildren = true; _logScreen.mouseEnabled = true;
		
		fillLogData();
		getDisplayObject().addChild(_logScreen);
		
		function fillLogData():void{
			_logScreen.session_data.user.text = "User: " +  logData.userName;
			_logScreen.session_data.session.text = "Session: " + logData.sessionId;
			_logScreen.session_data.start.text = "Start: [" + CurrencyUtil.getInstance().format(logData.initialCredits/100) + "] " + logData.startTime;
			_logScreen.session_data.end.text = "End: [" + CurrencyUtil.getInstance().format(logData.finalCredits/100) + "] " + logData.endTime;
			
			_logScreen.play_data.bet.text = "Bet: [" + CurrencyUtil.getInstance().format(logData.totalBet * (logData.coin/100)) + "]";
			_logScreen.play_data.win.text = "Win: [" + CurrencyUtil.getInstance().format(logData.win/100) + "]";
			_logScreen.play_data.extra.text = "Extras (" + logData.buyedExtraBalls + "): [";
			
			var totalCost:Number = 0;
			for(var i:int = 0; i < logData.buyedExtraBalls; i++){
				
				////////////////////////////////////////////////////////
				var cost:Number = logData.extraBallsCost[i] * ((ApplicationController.getApplicationController().gameType.roundConfig as BingoRoundConfig).coin / 100);
				////////////////////////////////////////////////////////
				
				totalCost += cost;
				var added:String = CurrencyUtil.getInstance().format(cost);
				added += (i == logData.buyedExtraBalls-1) ? "" : ", ";
				_logScreen.play_data.extra.text += added; 
			}
			_logScreen.play_data.extra.text += "] = " + CurrencyUtil.getInstance().format(totalCost);
		}*/
	}

	ApplicationView.prototype.logConfiguration = function(moviePoint, alphaBackText, sessionDataPoint, playDataPoint,  waterMark){ //(moviePoint:Point, alphaBackText:Number = 0.6, sessionDataPoint:Point = null, playDataPoint:Point = null,  waterMark:Point = null):void
		/*
		if(_logScreen!=null){
			_logScreen.x = moviePoint.x; 
			_logScreen.y = moviePoint.y;
		}else{
			alert("logScreen Movie is not been created yet")
		}
		if(sessionDataPoint){
			_logScreen.session_data.x = sessionDataPoint.x;
			_logScreen.session_data.y = sessionDataPoint.y;
		}
		if(playDataPoint){
			_logScreen.play_data.x = playDataPoint.x;
			_logScreen.play_data.y = playDataPoint.y;
		}
		_logScreen.water_mark.alpha = alphaBackText;
		if(waterMark != null){
			_logScreen.water_mark.x = waterMark.x;
			_logScreen.water_mark.y = waterMark.y;	
		}
		*/
	}

	function showFreePlayMark(asset){ //(asset:DisplayObject){

		//agregar el Asset , pero que se cargue desde el Engine de alguyn modo, pensarlo como para que no tener que hacer
		//nada desde el juego

		/*
		asset.x = getDisplayObject().stage.stageWidth / 2 - (asset.width / 2);
		asset.y = getDisplayObject().stage.stageHeight / 2 - (asset.height / 2);
		(asset as Sprite).mouseEnabled = false;
		(asset as Sprite).alpha = .6;
		getDisplayObject().stage.addChild(asset);
		*/
	}

	ApplicationView.prototype.hideFreePlayMark = function(asset){ //(asset:DisplayObject){
		/*if(getDisplayObject().stage.contains(asset)){
			getDisplayObject().stage.removeChild(asset);
		}*/
	}

	ApplicationView.prototype.isGameView = function(){
		return _isGameView;
	}


	ApplicationView.prototype.getLogScreen = function(){
		return _logScreen;
	}

	/*ApplicationView.prototype.getType = function(){

	}*/

	ApplicationView.prototype.onShow = function(event){  //no va mas event aca no?
		//super.onShow(e);
	}
	
	ApplicationView.prototype.onHide = function(event){
		//super.onHide(e);
		//if(ApplicationController.getApplicationController().parameters.is_free){
		//	getDisplayObject().stage.removeChild(freePlaySign);
		//}
	}

	//to global scope access:
	window.ApplicationView = ApplicationView;

}(window));