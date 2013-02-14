<?php

if($_POST['xml'] && $_POST['file']){
	echo $_POST['xml']." ".$_POST['file'];
	$saveFile = $_POST['xml'];
	$path = 'saved/';
	$FN = $path.$_POST['file'];
}

if($_GET['task'])
	$task = $_GET['task'];
else
	$task = ' ';
if($_GET['file'])
	$file = "saved/".$_GET['file'];
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
		$fileNames = scandir('saved/');
		
		echo '<h3>saved files:</h3>';
		
		foreach($fileNames as $fileName){
			$ext = pathinfo($fileName, PATHINFO_EXTENSION);
			
			if($ext == 'xml' || $ext == 'XML')
				echo 'file: <a href="#" onclick="return false" ondblclick=" FM.loadFile(\''.$fileName.'\')">'.$fileName.'</a><br> ';
		}
		
		echo "<br>";
		
		break;
	
	case 'saveFile':
		$file = new DOMDocument();
		$doc->formatOutput = true;
		$file->loadXML($saveFile);
		$file->formatOutput = true;
		$file->save($FN);
		echo "file saved";
		
		break;
		
	case 'deleteFile':
		unlink($file);
		break;
		
	default:
		echo "ERROR: task not defined '".$task."'" ;
		break;
}


?>
