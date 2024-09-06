<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function getLng($lng) {
    $r = file_get_contents('lng/'.$lng);
    $l = json_decode($r,true);
    return $l;
}

function replaceWordsInFiles($sourceDirectory, $destinationDirectory, $wordsArray) {
    var_dump($wordsArray);
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($sourceDirectory));

    foreach ($iterator as $file) {
        if ($file->isFile()) {
            $relativePath = str_replace($sourceDirectory, '', str_replace('src','',$file->getPath()));
            $destinationPath = $destinationDirectory . $relativePath;
            if (!is_dir($destinationPath)) {
                mkdir($destinationPath, 0777, true);
            }
            $filePath = $file->getPathname();
            $content = file_get_contents($filePath);
            foreach ($wordsArray as $oldWord => $newWord) {
                echo '~!'.$oldWord.'!~'.'  '. $newWord.'<br>';
                $content = str_replace('~!'.$oldWord.'!~', $newWord, $content);
            }
            file_put_contents($destinationPath . '/' . $file->getFilename(), $content);
        }
    }
}

$l = scandir('lng');

foreach ($l as $lf) {
    if ($lf !== '.' && $lf !== '..' ) {
        // Replace words in all files
        echo $lf;
        $newDir = str_replace('.json','',$lf);
        if (!file_exists($newDir)) {     mkdir($newDir, 0777, true); }
        replaceWordsInFiles('src/', $newDir.'/', getLng($lf));
    }
}

?>

