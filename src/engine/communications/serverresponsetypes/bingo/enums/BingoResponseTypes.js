(function(window){

	function BingoResponseTypes(){}

	BingoResponseTypes.LOGIN                 = "LoginResponse";
	BingoResponseTypes.INIT                  = "InitResponse";
	BingoResponseTypes.PLAY                  = "PlayResponse";
	BingoResponseTypes.GET_EXTRA_BALL        = "GetExtraBallResponse";
	BingoResponseTypes.GET_CREDITS_RESPONSE  = "GetCreditsResponse";
	BingoResponseTypes.CHANGE_CONFIG_CARDS   = "ChangeConfigCards";
	BingoResponseTypes.CHANGE_COIN_RESPONSE  = "ChangeCoinResponse";
	BingoResponseTypes.CHANGE_BET_RESPONSE   = "ChangeBetResponse";
	BingoResponseTypes.CANCEL_EXTRA_BALL     = "CancelExtraBallResponse";
	BingoResponseTypes.CONN_LOST             = "ConnLostResponse";
	BingoResponseTypes.CHANGE_STAGE_RESPONSE = "ChangeStageResponse"; 
	BingoResponseTypes.JACKPOT_RESPONSE      = "JackpotResponse";
	BingoResponseTypes.JACKPOT_SHOW_RESPONSE = "JackpotShowResponse";
	BingoResponseTypes.CHANGE_CARD_NUMBERS   = "ChangeCardNumbersResponse";
	BingoResponseTypes.SELECT_BONUS_RESPONSE = "SelectBonusResponse";
	BingoResponseTypes.FREE_CASH_RESPONSE    = "FreeCashResponse";

	window.BingoResponseTypes = BingoResponseTypes;

}(window));