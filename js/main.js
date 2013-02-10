function loadScript(url, callback){
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	
	script.type = 'text/javascript';
	script.src = url;
	
	if( callback != null){
		script.onreadystatechange = callback;
		script.onload = callback;
	}
	
	head.appendChild(script);
}

function loadFiles(){
	loadScript('js/tasks/file.js');
	loadScript('js/tasks/pit.js');
	loadScript('js/tasks/xml.js');
	loadScript('js/tasks/displayGUI.js');
	
	loadScript('js/classes/GUI.js');
	loadScript('js/classes/match.js');
	loadScript('js/classes/team.js');
}

function main(){
	FM = new GUI();
}

loadFiles();