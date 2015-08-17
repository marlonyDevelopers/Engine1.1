function BingoRoundConfig(){

	this.defaultLoginResponse = "LOGIN_OK";
	this.win     = 0;
	this.coin    = 25;
	this.credits = 100;
	this.jackpot = 106540;
	this.stake   = 1;
	this.bonusData = 0;
	this.initialExtraData = "1:5:2";
	this.winPaid = []; 
	this.willPay = [];
	this.testPlays =
	{
		  cards:[
	  	    {enabled:true, numbers:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}, 
	        {enabled:true, numbers:[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]},
	        {enabled:true, numbers:[31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]},
	        {enabled:true, numbers:[46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]}
  			],
 		 plays:[
   			{
   			drawnBalls:[1,2,3,4,5,6,7,8,9,10,11,12,13,59,16,17,60,19,20,21 ,22,23,24,25,26,31,32,33,34,35],
			extraBalls:[
				{isExtra:1, extraCost:5,   ball:11},
				{isExtra:1, extraCost:5,   ball:4},
				{isExtra:1, extraCost:5,   ball:12},
				{isExtra:1, extraCost:5,   ball:13},
				{isExtra:1, extraCost:5,   ball:14},
				{isExtra:1, extraCost:5,   ball:90},
				{isExtra:1, extraCost:5,   ball:15},
				{isExtra:1, extraCost:5,   ball:90},
				{isExtra:1, extraCost:5,   ball:90},
				{isExtra:1, extraCost:100, ball:90},
				{isExtra:1, extraCost:100, ball:90}
			]}
		]
	};
	this.freeSpinPrize  = 15; 
	this.freeSpinCount  = 03;
	this.bonusExtraData = "";
}