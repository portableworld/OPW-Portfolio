<?php
// Declare return string
$fileNames = "";

// Get name of all files in folder and add it to return string
foreach (new DirectoryIterator("../digiart/") as $file) {
    if (! $file->isDot()) {
        if ($file->isFile()) {
        	$fileNames .= $file . ":";
        }
    }
}

// Return string
echo $fileNames;


function thumbnail($fileName, $newHeight = 200) {
    $info = getimagesize($fileName);

    $width = isset($info['width']) ? $info['width'] : $info[0];
    $height = isset($info['height']) ? $info['height'] : $info[1];

    $newWidth = floor( $width * ($newHeight/$height));

    $imageSource = imagecreatefromstring(file_get_contents($fileName));

    
}
?>
