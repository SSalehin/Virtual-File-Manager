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
                if($files[$i]!="." && $files[$i]!="..") echo $files[$i]."#"; 
            }
        }
    }
?>