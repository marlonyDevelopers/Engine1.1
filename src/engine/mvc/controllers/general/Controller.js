(function(window){


	Controller.prototype.model;
	Controller.prototype.view;
	Controller.prototype.type;

	//private variables

	var _dependencies = [];  //:Vector.<Class>;

	//type en el Engine en as3 se sacaba automatico del nombre de la clase...
	function Controller(){ //view:IView, model:Model, dependencies:Vector.<Class> = null

		//nadie hace new de Conrtoller, solo importa prototype

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






	//to global scope access:
	window.Controller = Controller;

}(window));