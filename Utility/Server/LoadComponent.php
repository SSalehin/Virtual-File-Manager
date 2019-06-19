<?php
    function Existance(){
        $existingComponents = scandir("../../Components");
        for($i=2;$i<count($existingComponents);$i++){
            if($existingComponents[$i]==$_POST["name"])return 1;
        }return 0;
    }
   
    if($_POST["request"]=="LOAD_HTML"){
        if(Existance()) echo file_get_contents("../../Components/".$_POST["name"]."/UI.html");
        else echo file_get_contents("../../Components/Sample/UI.html");
    }elseif ($_POST["request"]=="LOAD_SCRIPTS") {
        if(Existance()){
            $scriptDirContentNames = scandir("../../Components/".$_POST["name"]."/Scripts");
            for($i=0; $i<count($scriptDirContentNames); $i++){
                if($scriptDirContentNames[$i]!="." && $scriptDirContentNames[$i]!=".."){
                    $parts = explode(".", $scriptDirContentNames[$i]);
                    if($parts[count($parts)-1]=="js"){
                        echo $scriptDirContentNames[$i]."#";
                    }
                }
            }
        }else echo "COMPONENT DOES NOT EXIST";
        
    }elseif ($_POST["request"]=="LOAD_STYLE") {
        if(Existance()){
            $styleDirContentNames = scandir("../../Components/".$_POST["name"]."/StyleSheets");
            for($i=0; $i<count($styleDirContentNames); $i++){
                if($styleDirContentNames[$i]!="." && $styleDirContentNames[$i]!=".."){
                    $parts = explode(".", $styleDirContentNames[$i]);
                    if($parts[count($parts)-1]=="css"){
                        echo $styleDirContentNames[$i]."#";
                    }
                }
            }
        }else echo "COMPONENT DOES NOT EXIST";
    }

    //NOTE: Here, path is sensitive to location of this x.php file
?>