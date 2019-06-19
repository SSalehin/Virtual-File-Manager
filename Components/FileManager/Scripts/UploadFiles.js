let fsParameters={//This object CONTAINS ALL FILE SYSTEM CONFIGURATION AND GLOBAL variables
    rootDir         :   "Files",
    currentDir      :   "",
    maxFileSize     :   1048576,
    fileTree        :   {}
};

function ShowUploadMessage(message){
    let targetElement = document.getElementById("uploadMessages");
    let messageElement = document.createElement("li");
    messageElement.innerHTML=message;
    targetElement.appendChild(messageElement);
}

function UploadFiles(files, destinationPath){
    //Clear Upload Messages First
    document.getElementById("uploadMessages").innerHTML="";
    for(let i=0; i<files.length; i++){
        if(files[i].size>=fsParameters.maxFileSize){
            console.log(files[i].name)
            ShowUploadMessage(files[i].name+": File too big.");
            continue;
        }
        let formData = new FormData();
        formData.append("request","UPLOAD");
        formData.append("path",destinationPath);
        formData.append("file",files[i]);

        let xhr = new XMLHttpRequest();
        xhr.open("POST","Utility/Server/FileSystemUtility.php");
        xhr.onload = function(){
            if(xhr.status==200){
                ShowUploadMessage(this.responseText);
            }else console.log("UploadFailed");
        }
        xhr.send(formData);
    }
}

document.getElementById("fileForm").addEventListener("submit", e=>{
    e.preventDefault();
    let files = document.getElementById("fileSource").files;
    if(files.length==0){
        ShowUploadMessage("No file Selected.");
    }else{
        UploadFiles(files,fsParameters.currentDir);
    }
});