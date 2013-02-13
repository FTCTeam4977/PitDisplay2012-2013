function GUI(){
	this.activeFile = null;
	
	this.activeFileEle = createElement('spawn',{'id':'activeFile'}, 'N/A');
	this.saveButtonEle = createElement('button',{'disabled':'false', 'id':'saveButton', 'onclick':'FM.saveFile()'},'Save File');
	this.saveButtonEle = createElement('button',{'id':'newFileButton', 'onclick':'FM.newFile()'},'Create new File');
	insertElementAt(this.activeFileEle, document.getElementById('active'));
	insertElementAt(this.saveButtonEle, document.getElementById('loadForm'));
	
	this.newFile = function(filename){
		this.activeFile = filename;
		this.saveButtonEle.disabled = false;
		updateElementContent(this.activeFileEle, filename);
		serverTask('newFile',this.activeFile);
		return true;
	}
	
	this.loadFile = function(filename){
		this.activeFile = filename;
		this.saveButtonEle.disabled = false;
		updateElementContent(this.activeFileEle, filename);
		openPitFile(filename);
		return true;
	}
	
	this.saveFile = function(){
		if(window.data == null){
			return "not active file";
		}
		savePitFile(window.data);
		
		serverTask('save',this.activeFile, window.data);
		return true;
		
	}
	
	serverTask('getFiles');
}
