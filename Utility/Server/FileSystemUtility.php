<?php
    $rootDir="../../Files/";
    if(isset($_POST))if(isset($_POST["request"])){
        if($_POST["request"]=="UPLOAD"){
            $destination=$rootDir.$_POST["path"]."/";
            $status = move_uploaded_file($_FILES["file"]["tmp_name"],$destination.$_FILES["file"]["name"]);
            if($status)echo $_FILES["file"]["name"].": Upload successful.";
            else echo $_FILES["file"]["name"].": Upload Failed";
        }elseif($_POST["request"]=="LIST"){
            $files = scandir($rootDir.$_POST["path"]);
            for($i=0; $i<count($files); $i++){
                if($files[$i]!="." && $files[$i]!=".."){
                    if(is_dir($rootDir.$_POST["path"]."/".$files[$i])){
                        echo $files[$i].".folder"."#";
                    }else echo $files[$i]."#";
                }  
            }
        }elseif($_POST["request"]=="COPY"){
            $source = $rootDir.$_POST["sourcePath"].$_POST["fileName"];
            $destination = $rootDir.$_POST["destinationPath"].$_POST["fileName"];
            if(is_dir($source)){
                CopyDirectory($source,$destination);
            }else{
                if(!copy($source,$destination))echo "FAILED";
                else echo "SUCCEEDED";
            }
        }elseif($_POST["request"]=="CUT"){
            $source = $rootDir.$_POST["sourcePath"].$_POST["fileName"];
            $destination = $rootDir.$_POST["destinationPath"].$_POST["fileName"];
            rename($source,$destination);
        }elseif($_POST["request"]=="DELETE"){
            $source = $rootDir.$_POST["sourcePath"].$_POST["fileName"];
            if(is_dir($source))DeleteDirectory($source);
            else unlink($source);
        }elseif($_POST["request"]=="ADD_FOLDER"){
            $fullDir = $rootDir.$_POST["path"];
            $attempts=0;
            while(!mkdir($fullDir."NewFolder".$attempts)){
                $attempts++;
                if($attempts>=50) break;
            }
        }elseif($_POST["request"]=="RENAME"){
            /*echo "\nRename request recieved\n";
            echo "Source path: ".$rootDir.$_POST["sourcePath"]."\n";
            echo "Target path: "$rootDir.$_POST["targetPath"]"\n";*/
            if(rename($rootDir.$_POST["sourcePath"], $rootDir.$_POST["targetPath"]))echo "Okay";
            else echo "Not okay";
        }
    }

    function CopyDirectory($source, $destination){
        mkdir($destination, 0777);
        $directoryContents = scandir($source);
        for($i=2;$i<count($directoryContents);$i++){
            if(is_dir($source."/".$directoryContents[$i]))
                CopyDirectory($source."/".$directoryContents[$i] , $destination."/".$directoryContents[$i]);
            else{
                if(!copy($source."/".$directoryContents[$i], $destination."/".$directoryContents[$i]))echo "FAILED";
                else echo "SUCCEEDED";
            }
        }
    }

    function DeleteDirectory($source){
        $directoryContents = scandir($source);
        for($i=2;$i<count($directoryContents);$i++){
            if(is_dir($source."/".$directoryContents[$i]))DeleteDirectory($source."/".$directoryContents[$i]);
            else unlink($source."/".$directoryContents[$i]);
        }
        rmdir($source);
    }
?>