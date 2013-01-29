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
	for(i=0;i<teams.length;i++){
		number = getFirstChild(teams[i]);
		wins = getNextSibling(number);
		loses = getNextSibling(wins);
		ties = getNextSibling(loses);
		
		nValue = number.childNodes[0].nodeValue;
		wValue = wins.childNodes[0].nodeValue;
		lValue = loses.childNodes[0].nodeValue;
		tValue = ties.childNodes[0].nodeValue;
		addTeam(nValue, wValue, lValue, tValue);
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
				
		}
	}
}

function loadFile(f){
	var request = new getFile('saved/test.xml');
	AllMatches = undefined;
	AllTeams = undefined;
	document.getElementById('matchTable').innerHTML='';
	return request;
}


