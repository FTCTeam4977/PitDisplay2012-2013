<?php

if($_POST['xml']){
	$saveFile = $_POST['xml'];
}

if($_GET['task'])
	$task = $_GET['task'];
else
	$task = ' ';
if($_GET['file'])
	$file = $_GET['file'];
else
	$file = null;

switch($task){
	case 'makeNewFile':
	
		if($file == null)
			echo 'ERROR: could not save file, name not defined.';
		$newFile = new DOMDocument();
		$root = $newFile->createElement('content');
		$blank = $newFile->createTextNode('');
	
		$newFile->appendChild($root);
		$root->appendChild($blank);
	
		$newFile->save($file);
	
	case 'getFiles':
		$fileNames = scandir('.');
		
		echo '<h3>saved files:</h3>';
		
		foreach($fileNames as $fileName){
			$ext = pathinfo($fileName, PATHINFO_EXTENSION);
			
			if($ext == 'xml' || $ext == 'XML')
				echo 'file: <a href="#" onclick="return false" ondblclick=" FM.loadFile(\''.$fileName.'\')">'.$fileName.'</a><br> ';
		}
		
		echo "<br>";
		
		break;
	
	case 'saveFile':
		print_r($_POST);
		
		break;
		
	default:
		echo "ERROR: task not defined '".$task."'" ;
		break;
}


?>