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

function main(){
	loadScript('js/tasks.js');
	loadScript('js/classes/GUI.js');
	loadScript('js/classes/match.js');
	loadScript('js/classes/team.js');
	
	
	FM = new GUI();
}