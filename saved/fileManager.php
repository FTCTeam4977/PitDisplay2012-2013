<?php

if($_GET['task'])
	$task = $_GET['task'];
else
	$task = ' ';


switch($task){
	case 'getFiles':
		$fileNames = scandir('.');
		foreach($fileNames as $fileName){
			$ext = pathinfo($fileName, PATHINFO_EXTENSION);
			if($ext == 'xml' || $ext == 'XML')
				echo 'file: <a href="#" onclick="loadPitFile(\'saved/'.$fileName.'\')">'.$fileName.'</a><br> ';
		}
		echo "<br>";
		break;
	
	case 'makeNewFile':
		echo 'making file';
		break;
	default:
		echo "ERROR: task not defined '".$task."'" ;
		break;
}


?>