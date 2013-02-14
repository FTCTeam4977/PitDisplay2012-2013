function serverTask(task, file, xml){
	if(window.XMLHttpRequest){
		request = new XMLHttpRequest();
	}
	else{
		request = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	switch(task){
		case 'newFile':
			var run = displayFileNames;
			alert("php/saveManager.php?task=makeNewFile&file="+file+".xml");
			request.open('GET',"php/saveManager.php?task=makeNewFile&file="+file+".xml", true);
			request.send();
			break;
			
		case 'getFiles':
			var run = displayFileNames;
			request.open('GET',"php/saveManager.php?task=getFiles", true);
			request.send();
			break;
			
		case 'save':
			var run = alert;
			xmlString = xmlToString(xml);
			xmlString = escape(xmlString);
			request.open('POST',"php/saveManager.php?task=saveFile", true);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.send("xml=" + xmlString + "&file=" + file); 
			break;
		
		case 'delete':
			var run = displayFileNames;
			request.open('GET',"php/saveManager.php?task=deleteFile&file="+file, true);
			request.send();
			break;
		
		default:
			return "task not valid";
	}

	request.onreadystatechange=function(){
		if(request.readyState==4 && request.status==200){
				run(request.responseText);
		}
	}
}

function downloadPitFile(f, run, data){
	if(window.XMLHttpRequest){
		request = new XMLHttpRequest();
	}
	else{
		request = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	request.open('GET', "php/saved/"+f + "?" + (new Date).getTime(), true);
	
	if(data != undefined){
		request.setRequestHeader('Content-Type', 'text/xml');
		request.send(data);
	}
	
	request.send();
	
	request.onreadystatechange=function(){
		if(request.readyState==4 && request.status==200){
				run(request.responseXML);
				window.data = request.responseXML;
		}
	}
}

function runPitFile(f){
	teams = f.getElementsByTagName('team');
	matches = f.getElementsByTagName('match');
	
	for(i=0;i<teams.length;i++){
		number = getFirstChild(teams[i]);
		data = getNextSibling(number);
		
		nValue = parseInt(number.childNodes[0].nodeValue, 10);
		dValue = data.childNodes[0].nodeValue, 10;
		
		addTeam(nValue, dValue);
	}
	
	for(i=0; i<matches.length; i++){
		number = getFirstChild(matches[i]);
		red = getNextSibling(number);
		blue = getNextSibling(red);
		rScore = getNextSibling(blue);
		bScore = getNextSibling(rScore);
		
		nValue = number.childNodes[0].nodeValue;
		RS = rScore.childNodes[0].nodeValue == "N/A" ? null: parseInt(rScore.childNodes[0].nodeValue, 10);
		BS = bScore.childNodes[0].nodeValue == "N/A" ? null: parseInt(bScore.childNodes[0].nodeValue, 10);
		
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
		
		addMatch(nValue, redTeams, blueTeams, RS, BS);
	}
}

function openPitFile(f){
	downloadPitFile(f, runPitFile);
	AllMatches = undefined;
	AllTeams = undefined;
	document.getElementById('matchTable').innerHTML='';
	return request;
}

function savePitFile(f){
	var file = f;
	var root = file.createElement('content');
	
	while(file.childNodes[0].firstChild){
		removeElement(file.childNodes[0].firstChild);
	}
	
	for(t in AllTeams ){
		
		if(AllTeams[t].data != ''){
			alert('Saving some data!');
			var team = file.createElement('team');
			var number = file.createElement('number');
			var data = file.createElement('data');
			
			number.appendChild(file.createTextNode(AllTeams[t].number));
			data.appendChild(file.createTextNode(AllTeams[t].data));
			
			team.appendChild(number);
			team.appendChild(data);
			
			file.childNodes[0].appendChild(team);
		}		
	}
	
	for(m in AllMatches){
		var match = file.createElement('match');
		var number = file.createElement('number');
		var RT = file.createElement('red');
		var BT = file.createElement('blue');
		var RS = file.createElement('RScore');
		var BS = file.createElement('BScore');
		
		number.appendChild(file.createTextNode(AllMatches[m].matchNum));
		RS.appendChild(file.createTextNode(AllMatches[m].rScore));
		BS.appendChild(file.createTextNode(AllMatches[m].bScore));
		
		for(r in AllMatches[m].rTeam){
			var team = file.createElement('t');
			
			team.appendChild(file.createTextNode(AllMatches[m].rTeam[r]));
			RT.appendChild(team);
		}
		
		for(b in AllMatches[m].rTeam){
			var team = file.createElement('t');
			
			team.appendChild(file.createTextNode(AllMatches[m].bTeam[b]));
			BT.appendChild(team);
		}
		
		match.appendChild(number);
		match.appendChild(RT);
		match.appendChild(BT);
		match.appendChild(RS);
		match.appendChild(BS);
		
		file.childNodes[0].appendChild(match);
	}
	return true;
}


