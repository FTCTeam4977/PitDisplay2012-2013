<?php

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
	
	$newFile->save($file.'.xml');
	case 'getFiles':
		$fileNames = scandir('.');
		foreach($fileNames as $fileName){
			$ext = pathinfo($fileName, PATHINFO_EXTENSION);
			if($ext == 'xml' || $ext == 'XML')
				echo 'file: <a href="#" onclick="return false" ondblclick="loadPitFile(\'saved/'.$fileName.'\'); return false">'.$fileName.'</a><br> ';
		}
		echo "<br>";
		break;
	
	
		
		break;
	default:
		echo "ERROR: task not defined '".$task."'" ;
		break;
}


?>