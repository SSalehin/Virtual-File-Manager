function GetFiles(){
    let directory = "";
    for(let i=0; i<fsParameters.currentDir.length; i++) directory+="/"+fsParameters.currentDir[i];
    document.getElementById("fileDisplay").innerHTML="";
    
    let formData = new FormData();
    formData.append("request","LIST");
    formData.append("path",directory);

    let xhr = new XMLHttpRequest();
    xhr.open("POST","Utility/Server/FileSystemUtility.php");
    xhr.onload = function(){
        if(xhr.status==200){
            let fileNames=this.responseText.split("#");
            DisplayFiles(fileNames, directory);
        }else console.log("UploadFailed");
    }
    xhr.send(formData);
}
function DisplayFiles(fileNames){
    for(let i=0; i<fileNames.length; i++){
        if(fileNames[i]=="")continue;
        let nameParts=fileNames[i].split(".");
        let extention = nameParts[nameParts.length-1].toLowerCase();
        if(fsParameters.supprotedTypes[extention]=="image")MakeButton(fileNames[i], "image");
        else if(fsParameters.supprotedTypes[extention]=="video")MakeButton(fileNames[i], "video");
        else if(fsParameters.supprotedTypes[extention]=="audio")MakeButton(fileNames[i], "audio");
        else if(fsParameters.supprotedTypes[extention]=="text")MakeButton(fileNames[i], "text");
        else if(fsParameters.supprotedTypes[extention]=="folder"){
            let folderName = "";
            for(let i=0; i<nameParts.length-1; i++){
                if(i!=0)folderName+=".";
                folderName+=nameParts[i];
            }
            MakeButton(folderName, "folder");
        }
        else MakeButton(fileNames[i], "unsupported");
    }
}

function MakeButton(name, type){
    let icon =  document.createElement('img');
    icon.classList.add("fileDisplayIcon");
    let caption = document.createElement("figcaption");
    caption.innerHTML=name;
    caption.classList.add("fileDisplayCaption");
    let figure = document.createElement('figure');
    figure.appendChild(icon);
    figure.appendChild(caption);
    figure.classList.add("fileDisplayFigure");
    let button = document.createElement("button");
    button.appendChild(figure);
    button.classList.add("fileDisplayButton");

    if(type=="image"){
        button.setAttribute("data-type","image");
        icon.src="Files"+fsParameters.fullCurrentDirectory()+name;
        button.onclick = FileClickHandler;
    }else if(type=="video"){
        button.setAttribute("data-type","video");
        icon.src="Components/FileManager/Icons/Video.png";
        button.onclick = FileClickHandler;
    }else if(type=="audio"){
        button.setAttribute("data-type","audio");
        icon.src="Components/FileManager/Icons/Audio.png";
        button.onclick = FileClickHandler;
    }else if(type=="text"){
        console.log("From text");
        button.setAttribute("data-type","text");
        icon.src="Components/FileManager/Icons/Text.png";
        button.onclick = FileClickHandler;
    }else if(type == "folder"){
        button.setAttribute("data-type","folder");
        icon.src="Components/FileManager/Icons/Folder.png";
        button.onclick = FileClickHandler;
        button.ondblclick = function(event){
            fsParameters.currentDir.push(this.getElementsByTagName("figcaption")[0].innerHTML);
            document.getElementById("renameForm").style.visibility="hidden";
            GetFiles();
        }
    }else{
        button.setAttribute("data-type","unsupported");
        icon.src="Components/FileManager/Icons/Unsupported.jpg";
        button.onclick = FileClickHandler;
    }
    //------------------------------------------------
    //------Add other file type support---------------
    //------------------------------------------------
    document.getElementById("fileDisplay").appendChild(button);
}

function FileClickHandler(event){
    let nodes = document.getElementById("fileDisplay").childNodes;
    if(!event.ctrlKey) for(let i=0; i<nodes.length; i++){
        nodes[i].classList.remove("selected");
    }
    this.classList.add("selected");
    let selectedCount = document.getElementById("fileDisplay").getElementsByClassName("selected").length;
    if(selectedCount==1) document.getElementById("renameForm").style.visibility="visible";
    else document.getElementById("renameForm").style.visibility="hidden";
}
