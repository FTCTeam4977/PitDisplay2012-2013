
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

function updateTeamStat(num, stat){
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
