(function(window){


	function ParametersData(){
		this.language;
		this.session;
		this.routes;
		this.hostName;
		this.is_log  = false;
		this.is_free = false;
		this.logData = null;
		this.version;
	}


	//to global scope access:
	window.ParametersData = ParametersData;

}(window));