
function addTeam(num, w, l, t){
	if(typeof AllTeams === 'undefined'){
		AllTeams = new Array();
	}
	
	if(AllTeams[num] != undefined)
		return "Team exists";
	else{
		AllTeams[num] = new Team(num);
	}
	
	if(w != undefined){
		AllTeams[num].wins = w;
	}
	
	if(l != undefined){
		AllTeams[num].loses = l;
	}
	
	if(t != undefined){
		AllTeams[num].ties = t;
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

function addMatch(num, red, blue, rScore, bScore){
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
	
	AllMatches[num] = new Match(parseInt(num, 10), red, blue);
	document.forms["newMatch"].reset();

	if(rScore != undefined && bScore != undefined){
		AllMatches[num].updateMatch(rScore, bScore);
	}

	if(newTeams != ''){
		return "Teams created:" + newTeams;
	}
	
	
	return true;
}

function RemoveMatch(num){
	removeElement(AllMatches[num].ele);
	delete AllMatches[num];
}

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

function Match(num, red, blue){
	this.matchNum = num;
	this.matchStatus = 'waiting for result';
	this.matchStatusNum = 0;
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
	
	this.redEle = createElement('td', {'class':'redMatches'}, null, createElement('td'));
	this.blueEle = createElement('td', {'class':'blueMatches'}, null, createElement('td'));
	insertElementAt(this.redEle,this.firstRow);
	insertElementAt(this.blueEle,this.firstRow);
	
	for(r in this.rTeam){
		insertElementAt(createElement('td',{'class':'team'},this.rTeam[r]), this.redEle);
	}
	
	for(b in this.bTeam){
		insertElementAt(createElement('td',{'class':'team'},this.bTeam[b]), this.blueEle);
	}
	
		this.rScoreHolder = createElement('td',{'class':'score'},'Score: ');
		this.bScoreHolder = createElement('td',{'class':'score'},'Score: ');
		insertElementAt(this.rScoreHolder, this.redEle);
		insertElementAt(this.bScoreHolder, this.blueEle);
		
		this.rScoreEle = createElement('span',{'class':'numScore'},this.rScore);
		this.bScoreEle = createElement('span',{'class':'numScore'},this.bScore);
		insertElementAt(this.rScoreEle,this.rScoreHolder);
		insertElementAt(this.bScoreEle,this.bScoreHolder);
	
	this.formEle = createElement('form', {'name':"matchForm_"+this.matchNum,'onsubmit':'return false'});
	insertElementAt(this.formEle, this.secondRow);
	
	insertElementAt(createElement('input',{'name':'RedScore','placeholder':'Red Score','onkeypress':'return validateKeypress(event,2,9000)'}),this.formEle);
	insertElementAt(createElement('input',{'name':'BlueScore','placeholder':'Blue Score','onkeypress':'return validateKeypress(event,2,9000)'}),this.formEle);
	insertElementAt(createElement('button',{'onclick':"getScore("+this.matchNum+")"},'submit score'),this.formEle);
	
	this.updateMatch = function(red, blue){
		var wList = "";
		var lList = "";
		var tList = "";
		
		this.rScore = red;
		this.bScore = blue;
		
		if(parseInt(red, 10) > parseInt(blue, 10)){// red won
			for(r in this.rTeam){
				updateStat(this.rTeam[r], 'win');
				wList = wList + " " + this.rTeam[r] + " ";
			}
			
			for(b in this.bTeam){
				updateStat(this.bTeam[b], 'lose');
				lList = lList + " " + this.bTeam[b] + " ";
			}
			
			this.matchStatus = 'Red Won';
			this.matchStatusNum = 1;
			
			setElement(this.statusEle,{'style':'color:red;font-size:27px;'});
		}
		else if(parseInt(red, 10) < parseInt(blue, 10)){// blue won
			for(r in this.rTeam){
				updateStat(this.rTeam[r], 'lose');
				lList = lList + " " + this.rTeam[r] + " ";
			}
			
			for(b in this.bTeam){
				updateStat(this.bTeam[b], 'win');
				wList = wList + " " + this.bTeam[b] + " ";
			}
			
			this.matchStatus = 'Blue Won';
			this.matchStatusNum = 2;
			
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
			setElement(this.statusEle,{'style':'font-size:27px;'});
			this.matchStatusNum = 3;
			
			removeElement(this.formEle);
			updateElementContent(this.statusEle,this.matchStatus);
			updateElementContent(this.rScoreEle,this.rScore);
			updateElementContent(this.bScoreEle,this.bScore);
			
			return "ties: " + tList;
		}
		
		removeElement(this.formEle);
		updateElementContent(this.statusEle,this.matchStatus);
		updateElementContent(this.rScoreEle,this.rScore);
		updateElementContent(this.bScoreEle,this.bScore);
		
		return "wins:" + wList + "loses: " + lList;
	}
	
	this.checkTeam = function (num) {
		var RW = 0;
		var BW = 0;
		var color = 0;
		var inMatch = 0;
		for(r in this.rTeam){
			if(this.rTeam[r] == num){
				inMatch = 1;
				color = 0;
			}
		}
		for(b in this.bTeam){
			if(this.bTeam[b] == num){
				inMatch = 1;
				color = 2;
			}
		}
		
		switch(this.matchStatusNum){
			case 0:
				RW = 0;
				BW = 0;
				break;
			case 1:
				RW = 8;
				BW = 0;
				break;
			case 2:
				RW = 0;
				BW = 4;
				break;
			case 3:
				RW = 8;
				BW = 4;
				break;
			
		}
		
		return RW + BW + color + inMatch;
	}
}

function GUI(){
	this.activeFile = null;
	
	this.loadFile = function(filename){
		this.activeFile = filename;
		loadPitFile("saved/" + filename);	
	}
	
	this.saveFile = function(){
		if(window.data == null){
			return "not active file";
		}
		savePitFile(window.data);
		
		serverTask('save',this.activeFile, window.data);
		return true
		
	}
	
	serverTask('getFiles');
}
