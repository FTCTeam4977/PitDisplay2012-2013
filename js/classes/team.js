function Team(num){
	this.number = num;
	this.rMatches = [];
	this.bMatches = [];
	this.rWins = 0;
	this.rLoses = 0;
	this.bWins = 0;
	this.bLoses = 0;
	this.ties = 0;
	this.data = '';
	
	this.update = function(){
		this.number = num;
		this.rMatches = [];
		this.bMatches = [];
		this.rWins = 0;
		this.bWins = 0;
		this.rLoses = 0;
		this.bLoses = 0;
		this.ties = 0;
		
		if(typeof AllMatches === 'undefined'){
			return 'No matches';
		}
		
		for(m in AllMatches){
			var status = AllMatches[m].checkTeam(this.number);
			switch(status){
				case 1:
					this.rMatches.push(parseInt(m, 10));
					break;
				case 3:
					this.rMatches.push(parseInt(m, 10));
					break;
				case 5:
					this.rMatches.push(parseInt(m, 10));
					this.rLoses++;
					break;
				case 7:
					this.bMatches.push(parseInt(m, 10));
					this.bWins = this.bWins+1;
					break;
				case 9:
					this.rMatches.push(parseInt(m, 10));
					this.rWins = this.rWins+1;
					break;
				case 11:
					this.rMatches.push(parseInt(m, 10));
					this.rLoses++;
					break;
				case 13:
					this.rMatches.push(parseInt(m, 10));
					this.ties++;
					break;
				case 15:
					this.bMatches.push(parseInt(m, 10));
					this.ties++;
					break;
				default:
					alert( "Team " + this.number + " is not in match " + m);
			} 
		}
		
		return true;
	}
}
