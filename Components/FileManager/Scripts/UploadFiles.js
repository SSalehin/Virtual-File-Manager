
function ShowUploadMessage(message){
    let targetElement = document.getElementById("uploadMessages");
    let messageElement = document.createElement("li");
    messageElement.innerHTML=message;
    targetElement.appendChild(messageElement);
}

function UploadFiles(files, destinationPath){
    //console.log(files);
    //console.log(destinationPath);
    //Clear Upload Messages First
    document.getElementById("uploadMessages").innerHTML="";
    for(let i=0; i<files.length; i++){
        if(files[i].size>=fsParameters.maxFileSize){
            //console.log(files[i].name);
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
                GetFiles();
            }else console.log("UploadFailed");
        }
        xhr.send(formData);
    }
}

