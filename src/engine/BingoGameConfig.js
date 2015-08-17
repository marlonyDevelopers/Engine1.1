function BingoGameConfig(){

	this.gameType   = "BINGO";
	this.gameName   = "Show Ball 3";
	this.forceDummy = false;
	this.isTesting  = true; 
	this.toWeb      = false; 
	this.parametersIfTesting =
	 {
	  language:"pt",
	  session:"88888",
	  routes:"",
	  hostName:"173.192.149.236",
	  _hostName:"localhost",
	  swfUrl:"",
	  is_log:0,
	  is_free:0,
	  version:"_001"
 	};
 	this.supportedLanguages       = ["EN", "ES", "PT"];
 	this.loadCardsStateDuringPlay = 0;
	this.essentialSoundIndex      = 1;
	this.numberOfBalls            = 33;
	this.numberOfExtraBalls       = 10;
	this.maxBallNumber            = 90;
	this.maxBet                   = 10;
	this.coinValues               = [5,10,25];
	this.cardsSize                = {x:5, y:3};
	this.useWonCreditsToPlay = 1;
	this.prizes = [
		{index:0,  name:"Bingo",        pay:1500,  definition:[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  	overriddenIndexes:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
		{index:1,  name:"Perimeter",    pay:600,   definition:[1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],  	overriddenIndexes:[6,11,12,14]},
		{index:2,  name:"DoubleH",      pay:300,   definition:[1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],  	overriddenIndexes:[8,9,11,13,15,16]},
		{index:3,  name:"Tower",        pay:200,   definition:[1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0],  	overriddenIndexes:[4,12,16]},
		{index:4,  name:"DoubleT",  	pay:100,   definition:[1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],  	overriddenIndexes:[12]},
		{index:5,  name:"DoubLinSup",   pay:100,   definition:[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],  	overriddenIndexes:[12,13]},
		{index:6,  name:"DoubLinCen",   pay:100,   definition:[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],  	overriddenIndexes:[12,14]},
		{index:7,  name:"DoubLinInf",   pay:100,   definition:[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  	overriddenIndexes:[13,14]},
		{index:8,  name:"DoubleX",		pay:40,    definition:[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],  	overriddenIndexes:[15,16]},
		{index:9,  name:"ArrowDown",    pay:40,    definition:[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],  	overriddenIndexes:[13,16]},
		{index:10, name:"TriangUp",  	pay:10,    definition:[0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],  	overriddenIndexes:[14,15]},
		{index:11, name:"Sides",        pay:8,     definition:[1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],  	overriddenIndexes:[]},
		{index:12, name:"LinSup",       pay:3,     definition:[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  	overriddenIndexes:[]},
		{index:13, name:"LinCen", 		pay:3,     definition:[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],  	overriddenIndexes:[]},
		{index:14, name:"LinInf",       pay:3,     definition:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],  	overriddenIndexes:[]},
		{index:15, name:"PrizeA", 	    pay:3,     definition:[0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],  	overriddenIndexes:[]},
		{index:16, name:"PrizeV",       pay:3,     definition:[1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0],  	overriddenIndexes:[]}
	];
	this.mapping_prizes_payCards = [
		{indexPrize:0,  indexPayCards:"0"},
		{indexPrize:1,  indexPayCards:"1"},
		{indexPrize:2,  indexPayCards:"2"},
		{indexPrize:3,  indexPayCards:"3"},
		{indexPrize:4,  indexPayCards:"4"},
		{indexPrize:5,  indexPayCards:"5"},
		{indexPrize:6,  indexPayCards:"5"},
		{indexPrize:7,  indexPayCards:"5"},
		{indexPrize:8,  indexPayCards:"6"},
		{indexPrize:9,  indexPayCards:"7"},
		{indexPrize:10, indexPayCards:"8"},
		{indexPrize:11, indexPayCards:"9"},
		{indexPrize:12, indexPayCards:"10"},
		{indexPrize:13, indexPayCards:"10"},
		{indexPrize:14, indexPayCards:"10"},
		{indexPrize:15, indexPayCards:"11"},
		{indexPrize:16, indexPayCards:"11"}
	];
	this.maxPayCards           = 12;
	this.amountOfPayCardsLines = 2;
	this.stopOnPrizes          = [0, 1, 2];
	this.normalVelocities      = [0.9, 0.4, 0.09];
	this.turboVelocity         = 0.80;
	this.initialSpeedIndex     = 2;
	this.help = 
	{
		PageCount:6,
		textPerPage:[4,1,1,1,1,1]
	};	
	this.jackpotRules =
	{
		lastBallToWinJackpot:30,
		minimumBetToWinJackpot:1,
		minimumCardsOpenToWinJackpot:4
	}
}