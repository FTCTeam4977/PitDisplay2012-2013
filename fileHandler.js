function getFirstChild(n)
{
	y=n.firstChild;
	
	while (y.nodeType!=1){
		y=y.nextSibling;
	}
	
	return y;
}

function getNextSibling(n)
{
	y=n.nextSibling;
	
	while (y.nodeType!=1){
		y=y.nextSibling;
	}
	
	return y;
}

function runFile(f){
	teams = f.data.getElementsByTagName('team');
	matches = f.data.getElementsByTagName('match');
	
	for(i=0;i<teams.length;i++){
		number = getFirstChild(teams[i]);
		wins = getNextSibling(number);
		loses = getNextSibling(wins);
		ties = getNextSibling(loses);
		
		nValue = parseInt(number.childNodes[0].nodeValue, 10);
		wValue = parseInt(wins.childNodes[0].nodeValue, 10);
		lValue = parseInt(loses.childNodes[0].nodeValue, 10);
		tValue = parseInt(ties.childNodes[0].nodeValue, 10);
		addTeam(nValue, wValue, lValue, tValue);
	}
	
	for(i=0; i<matches.length; i++){
		number = getFirstChild(matches[i]);
		red = getNextSibling(number);
		blue = getNextSibling(red);
		rScore = getNextSibling(blue);
		bScore = getNextSibling(rScore);
		
		nValue = number.childNodes[0].nodeValue;
		rS = rScore.childNodes[0].nodeValue == "N/A" ? null: parseInt(rScore.childNodes[0].nodeValue, 10);
		bS = bScore.childNodes[0].nodeValue == "N/A" ? null: parseInt(bScore.childNodes[0].nodeValue, 10);
		
		redTeams = new Array();
		blueTeams = new Array();
		for(r=0; r<red.childNodes.length; r++){
			if(red.childNodes[r].nodeType == 1){
				redTeams.push(red.childNodes[r].childNodes[0].nodeValue);
			}
		}
		
		for(b=0; b<blue.childNodes.length; b++){
			if(blue.childNodes[b].nodeType == 1){
				blueTeams.push(blue.childNodes[b].childNodes[0].nodeValue);
			}
		}
		
		addMatch(nValue, redTeams, blueTeams, rS, bS);
	}
}

function getFile(f){
	this.data = 'sending request';
	var _STORE = this;
	
	if(window.XMLHttpRequest){
		request = new XMLHttpRequest();
	}
	else{
		request = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	request.open('GET', f, true);
	request.send();
	
	request.onreadystatechange=function(){
		if(request.readyState==4 && request.status==200){
				_STORE.data = request.responseXML;
				runFile(_STORE);
		}
	}
}

function loadFile(f){
	var request = new getFile(f);
	AllMatches = undefined;
	AllTeams = undefined;
	document.getElementById('matchTable').innerHTML='';
	return request;
}


