
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

function updateTeamStat(num){
	if(AllTeams[num] == undefined)
		return "Team does not exist";
	
	AllTeams[num].update();
	return true;
	
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

function toggleHide(ele, header, str1, str2){
	if(this.hidding == undefined){
		this.hidding = false;
	}
	
	if(this.hidding == true){
		ele.style.display = 'inline';
		updateElementContent(header,str1);
		this.hidding = false;
	}
	else{
		ele.style.display = 'none';
		updateElementContent(header,str2);
		this.hidding = true;
	}
}

function NewMatch(){
	mn = document.forms['newMatch']['MatchNum'].value;
	r1 = document.forms['newMatch']['Red1'].value;
	r2 = document.forms['newMatch']['Red2'].value;
	b1 = document.forms['newMatch']['Blue1'].value;
	b2 = document.forms['newMatch']['Blue2'].value;
	
	if(mn == '' || r1 == '' || r2 == '' || b1 == '' || b2 == ''){
			return false
	}
	else{
		addMatch(mn,[r1,r2],[b1,b2]);
		return true;
	}
}

function getScore(match){
	rs = document.forms["matchForm_"+match]['RedScore'].value;
	bs = document.forms["matchForm_"+match]['BlueScore'].value;
	
	if(rs == '' || bs == ''){
		alert("incomplete");
	}
	else{
		AllMatches[match].updateMatch(rs,bs);
	}
}