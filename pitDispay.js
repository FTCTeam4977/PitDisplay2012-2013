
function addTeam(num){
	if(typeof AllTeams === 'undefined'){
		AllTeams = new Array();
	}
	
	if(AllTeams[num] != undefined)
		return "Team exists";
	else{
		AllTeams[num] = new Team(num);
	}
	
	return true;
}

function updateStat(num, stat){
	if(AllTeams[num] == undefined)
		return "Team exists";
	
	var team = AllTeams[num];
	switch(stat){
		case 0:
		case 'win':
			team.wins = team.wins + 1;
			break;
		case 1:
		case 'lose':
			team.loses = team.loses + 1;
			break;
		case 3:
		case 'tie':
			team.ties = team.ties + 1;
			break;
	}
	
}

function addMatch(num, red, blue){
	if(num == undefined || red == undefined || blue == undefined){
		return 'Invalid arguments; addMatch arguments: addMatch(int MATCH NUMBER, int array [RED TEAM 1, RED TEAM 2...], int array [BLUE TEAM 1, BLUE TEAM 2...])';
	}
	
	if(typeof AllTeams === 'undefined'){
		AllTeams = new Array();
	}
	
	if(typeof AllMatches === 'undefined'){
		AllMatches = new Array();
	}
	
	var newTeams = '';
	
	for(r in red){
		if(typeof AllTeams[red[r]] === 'undefined'){
			addTeam(red[r]);
			newTeams = newTeams + " " + red[r];
		}
	}
	
	for(b in blue){
		if(typeof AllTeams[blue[b]] === 'undefined'){
			addTeam(blue[b]);
			newTeams = newTeams + " " + blue[b];
		}
	}
	
	AllMatches[num] = new Match(num, red, blue);
	
	if(newTeams != ''){
		return "Teams created:" + newTeams;
	}
	
	return true;
}

function Team(num){
	this.wins = 0;
	this.loses = 0;
	this.ties = 0;
}

function Match(num, red, blue){
	this.matchNum
	this.rTeam = red;
	this.bTeam = blue;
	this.rScore = "N/A";
	this.bScore = "N/A";

	this.ele = createElement('div', {'class':'match'}, "match: "+num);
	insertElementAt(this.ele, document.getElementById('matches'));
	
	this.redDiv = createElement('div', {'class':'redMatches'}, 'Red Teams: ');
	this.blueDiv = createElement('div', {'class':'blueMatches'}, 'Blue Teams: ');
	insertElementAt(this.redDiv,this.ele);
	insertElementAt(this.blueDiv,this.ele);
	
	for(r in this.rTeam){
		insertElementAt(createElement('div',{'class':'team','id':"team_"+this.rTeam[r]},this.rTeam[r]), this.redDiv);
	}
	
	for(b in this.bTeam){
		insertElementAt(createElement('div',{'class':'team','id':"team_"+this.bTeam[b]},this.bTeam[b]), this.blueDiv);
	}
	
	this.rScoreDiv = createElement('div',{'class':'score'},this.rScore);
	this.bScoreDiv = createElement('div',{'class':'score'},this.bScore);
	insertElementAt(this.rScoreDiv,this.redDiv);
	insertElementAt(this.bScoreDiv,this.blueDiv);
	
	
	this.updateMatch = function(red, blue){
		var wList = "";
		var lList = "";
		var tList = "";
		
		this.rScore = red;
		this.bScore = blue;
		
		if(red > blue){// red won
			for(r in this.rTeam){
				updateStat(this.rTeam[r], 'win');
				wList = wList + " " + this.rTeam[r] + " ";
			}
			
			for(b in this.bTeam){
				updateStat(this.bTeam[b], 'lose');
				lList = lList + " " + this.bTeam[b] + " ";
			}
		}
		else if(red < blue){// blue won
			for(r in this.rTeam){
				updateStat(this.rTeam[r], 'lose');
				lList = lList + " " + this.rTeam[r] + " ";
			}
			
			for(b in this.bTeam){
				updateStat(this.bTeam[b], 'win');
				wList = wList + " " + this.bTeam[b] + " ";
			}
		}
		else{// tie
			for(r in this.rTeam){
				updateStat(this.rTeam[r], 'tie');
				tList = tList + " " + this.rTeam[r];
			}
			
			for(b in this.bTeam){
				updateStat(this.bTeam[b], 'tie');
				tList = tList + " " + this.bTeam[b];
			}
			updateElementContent(this.rScoreDiv,this.rScore);
			updateElementContent(this.rScoreDiv,this.bScore);
			
			
			return "ties: " + tList;
		}
		
		updateElementContent(this.rScoreDiv,this.rScore);
		updateElementContent(this.bScoreDiv,this.bScore);
		
		return "wins:" + wList + "loses: " + lList;
	}
	
	this.checkTeam = function (num) {
		var inMatch = false;
		for(r in this.rTeam){
			if(this.rTeam[r] == num){
				inMatch = true;
			}
		}
		for(b in this.bTeam){
			if(this.bTeam[b] == num){
				inMatch = true;
			}
		}
		
		return inMatch;
	}
	
}