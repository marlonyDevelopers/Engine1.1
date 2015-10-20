
(function(window){

	function LoginResponse(){
		this.type = BingoResponseTypes.LOGIN;
	}
	
	LoginResponse.LOGIN_OK      = "LOGIN_OK";
	LoginResponse.NO_BALANCE    = "NO_BALANCE";
	LoginResponse.NO_ACCESS     = "NO_ACCESS";
	LoginResponse.LOGIN_PLAYING = "LOGIN_PLAYING";
		
	window.LoginResponse = LoginResponse;

}(window));