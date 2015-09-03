(function(window){

	//public variables

/*	Controller.prototype._type;  //:String;
	Controller.prototype._model; //:Model;
	Controller.prototype._view;  //:IView;*/

	//private variables

	var _dependencies = [];  //:Vector.<Class>;

	//type en el Engine en as3 se sacaba automatico del nombre de la clase...
	function Controller(type,view, model, dependencies){ //view:IView, model:Model, dependencies:Vector.<Class> = null

		Controller.prototype._type  = type;
		Controller.prototype._model = model;
		Controller.prototype._view  = view;
		_dependencies = dependencies;

		if(_view != null)  { _view.setController(this); }
		if(_model != null) { _model.setController(this);}
	}

	//TODO
	Controller.prototype.init = function(){
		/*if(_dependencies != null && _dependencies.length > 0){
			var applicationController:ApplicationController = ApplicationController.getApplicationController();
			for(var i:int = 0; i < _dependencies.length; i++){
				if(!applicationController.hasController(_dependencies[i])){
					throw new Error("Controller "+ _type +" has a direct dependency with controller "+ getQualifiedClassName(_dependencies[i]) +" you must register the controller");
				}
			}
		}*/
	}

/*
	Controller.prototype.model = function(){
		return Controller.prototype._model;
	}

	Controller.prototype.view = function(){
		return Controller.prototype._view;
	}

	Controller.prototype.type = function(){
		return Controller.prototype._type;
	}

	Controller.prototype.type = function(value){
		Controller.prototype._type = value;
	}*/


	//to global scope access:
	window.Controller = Controller;

}(window));