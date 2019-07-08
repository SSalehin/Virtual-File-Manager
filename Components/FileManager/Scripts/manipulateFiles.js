function PrepareClipboard(method){
    fsParameters.clipBoard.sourcePath = fsParameters.fullCurrentDirectory();
    fsParameters.clipBoard.fileList = [];
    fsParameters.clipBoard.method = method;
    let selectedElements = document.getElementById("fileDisplay").getElementsByClassName("selected");
    for(let i=0; i<selectedElements.length; i++){
        fsParameters.clipBoard.fileList.push(selectedElements[i].getElementsByTagName("figcaption")[0].innerHTML);
    }
}

function RelocateSelectedFiles(){
    for(let i=0; i<fsParameters.clipBoard.fileList.length; i++){
        let formData = new FormData();
        formData.append("request",fsParameters.clipBoard.method);
        formData.append("sourcePath",fsParameters.clipBoard.sourcePath.slice(1));
        formData.append("destinationPath", fsParameters.fullCurrentDirectory().slice(1));
        formData.append("fileName",fsParameters.clipBoard.fileList[i]);
        let xhr = new XMLHttpRequest();
        xhr.open("POST","Utility/Server/FileSystemUtility.php");
        xhr.onload = function(){
            fsParameters.clipBoard.doneProcessing++;
            if(fsParameters.clipBoard.doneProcessing==fsParameters.clipBoard.fileList.length){
                fsParameters.clipBoard.doneProcessing=0;
                GetFiles();
            }
            if(xhr.status==200){
                console.log("Relocation status: "+this.responseText);
            }else console.log("Relocation Failed");
        }
        xhr.send(formData);
    }
}

function DeleteSelectedFiles(){
    for(let i=0; i<fsParameters.clipBoard.fileList.length; i++){
        let formData = new FormData();
        formData.append("request",fsParameters.clipBoard.method);
        formData.append("sourcePath",fsParameters.clipBoard.sourcePath.slice(1));
        formData.append("fileName",fsParameters.clipBoard.fileList[i]);
        let xhr = new XMLHttpRequest();
        xhr.open("POST","Utility/Server/FileSystemUtility.php");
        xhr.onload = function(){
            fsParameters.clipBoard.doneProcessing++;
            if(fsParameters.clipBoard.doneProcessing==fsParameters.clipBoard.fileList.length){
                fsParameters.clipBoard.doneProcessing=0;
                GetFiles();
            }
            if(xhr.status==200){
                console.log("Deletion status: "+this.responseText);
            }else console.log("Deletion Failed");
        }
        xhr.send(formData);
    }
}

function DownloadSelectedFiles(){
    let selectedFiles = document.getElementById("fileDisplay").getElementsByClassName("selected");
    for(let i=0; i<selectedFiles.length; i++){
        let currentFileName = selectedFiles[i].getElementsByTagName("figcaption")[0].innerHTML;
        let currentFileType = selectedFiles[i].getAttribute("data-type");
        if(currentFileType!="folder"){
            console.log("Downloading:"+currentFileName);
            let link=document.createElement('a');
            link.setAttribute("href",
            fsParameters.rootDir+"/"+fsParameters.fullCurrentDirectory()+currentFileName);
            link.setAttribute("download","true");
            link.click();
        }
    }
}

function AddFolder(){
    let formData = new FormData();
    formData.append("request","ADD_FOLDER");
    formData.append("path",fsParameters.fullCurrentDirectory().slice(1));
    let xhr = new XMLHttpRequest();
    xhr.open("POST","Utility/Server/FileSystemUtility.php");
    xhr.onload = function(){
        if(xhr.status==200){
            console.log("Folder added");
        }else console.log("Folder addition failed");
        GetFiles();
    }
    xhr.send(formData);
}

function RenameFile(targetName, preserveExtention){
    PrepareClipboard("RENAME");
    if(fsParameters.clipBoard.fileList.length!=1)alert("Please, select exactly one file.");
    else{
        if(preserveExtention){
            let fileNameParts = fsParameters.clipBoard.fileList[0].split(".");
            let extention = fileNameParts[fileNameParts.length-1];
            targetName+="."+extention;
            console.log(targetName);
        }

        let sourcePath = fsParameters.fullCurrentDirectory()+fsParameters.clipBoard.fileList[0];
        sourcePath = sourcePath.slice(1);
        let targetPath = fsParameters.fullCurrentDirectory()+targetName;
        targetPath = targetPath.slice(1);
        let formData = new FormData();
        formData.append("request","RENAME");
        formData.append("sourcePath",sourcePath);
        formData.append("targetPath",targetPath);
        let xhr = new XMLHttpRequest();
        xhr.open("POST","Utility/Server/FileSystemUtility.php");
        xhr.onload = function(){
            if(xhr.status==200){
                console.log("Rename said: "+this.responseText);
            }else console.log("Rename failed");
            GetFiles();
        }
        xhr.send(formData);
    }
}