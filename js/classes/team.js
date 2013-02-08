function Team(num){
	this.number = num;
	this.wins = 0;
	this.loses = 0;
	this.ties = 0;
	
	this.update = function(){
		if(typeof AllMatches === 'undefined'){
			return 'No matches';
		}
		
		for(m in AllMatches){
			var status = AllMatches[m].checkTeam(this.number);
			switch(status){
				case 1:
					alert( "Team " + this.number + " is Red and is waitng for match " + m);
					break;
				case 3:
					alert( "Team " + this.number + " is Blue and is waitng for match " + m);
					break;
				case 5:
					alert( "Team " + this.number + " is Red and has lost match " + m);
					break;
				case 7:
					alert( "Team " + this.number + " is Blue and has Won match " + m);
					break;
				case 9:
					alert( "Team " + this.number + " is Red and has Won match " + m);
					break;
				case 11:
					alert( "Team " + this.number + " is Blue and has Lost match " + m);
					break;
				case 13:
					alert( "Team " + this.number + " is Red and has Tied match " + m);
					break;
				case 15:
					alert( "Team " + this.number + " is Blue and has Tied match " + m);
					break;
				default:
					alert( "Team " + this.number + " is not in match " + m);
			} 
		}
	}
}
