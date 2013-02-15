function GUI(){
	this.activeFile = null;
	
	this.activeFileEle = createElement('spawn',{'id':'activeFile'}, 'N/A');
	this.saveButtonEle = createElement('button',{'disabled':'false', 'id':'saveButton', 'onclick':'FM.saveFile()'},'Save File');
	this.deleteButtonEle = createElement('button',{'disabled':'false', 'id':'deleteButton', 'onclick':'FM.deleteFile()'},'Delete File');
	this.newFileButtonEle = createElement('button',{'id':'newFileButton', 'onclick':'FM.newFile(document.getElementById("FM_newFile").value)'},'Create new File');
	this.newFileInputEle = createElement('input',{'id':'FM_newFile'});
	insertElementAt(this.activeFileEle, document.getElementById('active'));
	insertElementAt(this.saveButtonEle, document.getElementById('loadForm'));
	insertElementAt(this.deleteButtonEle, document.getElementById('loadForm'));
	insertElementAt(this.newFileButtonEle, document.getElementById('loadForm'));
	insertElementAt(this.newFileInputEle, document.getElementById('loadForm'));	
		
	this.newFile = function(filename){
		if(filename == ''|| filename ==' '  || filename ==null ){
			return false;
		}
		
		this.activeFile = filename+'.xml';
		this.saveButtonEle.disabled = false;
		this.deleteButtonEle.disabled = false;
		updateElementContent(this.activeFileEle, this.activeFile);
		serverTask('newFile',filename);
		document.forms["load"].reset();
		return true;
	}
	
	this.loadFile = function(filename){
		this.activeFile = filename;
		this.saveButtonEle.disabled = false;
		this.deleteButtonEle.disabled = false;
		updateElementContent(this.activeFileEle, this.activeFile);
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
	
	this.deleteFile = function(){
		serverTask('delete', this.activeFile);
		
		this.activeFile = 'N/A';
		this.saveButtonEle.disabled = true;
		this.deleteButtonEle.disabled = true;
		updateElementContent(this.activeFileEle, this.activeFile);
	}
	
	serverTask('getFiles');
}
