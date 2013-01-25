
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
	
	if(AllMatches[num] != undefined){
		return "Match: "+num+" exists";
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
	this.number = num;
	this.wins = 0;
	this.loses = 0;
	this.ties = 0;
	
	this.update = function(){
		if(typeof AllMatches === 'undefined'){
			return false;
		}
	}
}

function Match(num, red, blue){
	this.matchNum = num;
	this.matchStatus = 'waiting for result';
	this.rTeam = red;
	this.bTeam = blue;
	this.rScore = "N/A";
	this.bScore = "N/A";

	this.ele = createElement('tr', {'class':'match'});
	insertElementAt(this.ele, document.getElementById('matchTable'));
	
	this.firstRow = createElement('tr',{'class':'firstRow'});
	this.secondRow = createElement('tr',{'class':'secondRow'});
	insertElementAt(this.firstRow,this.ele);
	insertElementAt(this.secondRow,this.ele);
	
	this.matchNumEle = createElement('td', {'class':'matchNum'}, "Match: "+this.matchNum);
	this.statusEle = createElement('td', {'class':'matchStatus'}, this.matchStatus);
	insertElementAt(this.matchNumEle, this.firstRow);
	insertElementAt(this.statusEle, this.secondRow);
	
	this.formEle = createElement('form', {'name':"matchForm_"+this.matchNum,'onsubmit':'return false'});
	insertElementAt(this.formEle, this.firstRow);
	
	insertElementAt(createElement('input',{'name':'RedScore','placeholder':'Red Score','onkeypress':'return validateKeypress(event,2,9000)'}),this.formEle);
	insertElementAt(createElement('input',{'name':'BlueScore','placeholder':'Blue Score','onkeypress':'return validateKeypress(event,2,9000)'}),this.formEle);
	insertElementAt(createElement('button',{'onclick':"getScore("+this.matchNum+")"},'submit score'),this.formEle);
	
	
	this.redEle = createElement('td', {'class':'redMatches'}, null, createElement('td',null ,'Red Teams: '));
	this.blueEle = createElement('td', {'class':'blueMatches'}, null, createElement('td',null ,'Blue Teams: '));
	insertElementAt(this.redEle,this.secondRow);
	insertElementAt(this.blueEle,this.secondRow);
	
	for(r in this.rTeam){
		insertElementAt(createElement('td',{'class':'team'},this.rTeam[r]), this.redEle);
	}
	
	for(b in this.bTeam){
		insertElementAt(createElement('td',{'class':'team'},this.bTeam[b]), this.blueEle);
	}
	
	this.rScoreEle = createElement('td',{'class':'score'},this.rScore);
	this.bScoreEle = createElement('td',{'class':'score'},this.bScore);
	insertElementAt(this.rScoreEle,this.redEle);
	insertElementAt(this.bScoreEle,this.blueEle);
	
	
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
			
			this.matchStatus = 'Red Won';
			setElement(this.statusEle,{'style':'color:red;font-size:27px;'});
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
			
			this.matchStatus = 'Blue Won';
			setElement(this.statusEle,{'style':'color:blue;font-size:27px;'});
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
			this.matchStatus = 'Tie';
			
			updateElementContent(this.statusEle,this.matchStatus);
			updateElementContent(this.rScoreEle,this.rScore);
			updateElementContent(this.bScoreEle,this.bScore);
			
			
			return "ties: " + tList;
		}
		updateElementContent(this.statusEle,this.matchStatus);
		updateElementContent(this.rScoreEle,this.rScore);
		updateElementContent(this.bScoreEle,this.bScore);
		
		return "wins:" + wList + "loses: " + lList;
	}
	
	this.checkTeam = function (num) {
		var inMatch = false;
		for(r in this.rTeam){
			if(this.rTeam[r] == num){
				inMatch = 1;
			}
		}
		for(b in this.bTeam){
			if(this.bTeam[b] == num){
				inMatch = 0;
			}
		}
		
		return inMatch;
	}
	
}