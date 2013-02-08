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
