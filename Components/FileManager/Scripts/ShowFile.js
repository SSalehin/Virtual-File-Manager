document.getElementById("1").addEventListener('click', e=>{
    document.getElementById("fileDisplay").innerHTML="";
    GetFiles("");
});
document.getElementById("2").addEventListener('click', e=>{
    document.getElementById("fileDisplay").innerHTML="";
    GetFiles("/A B");
});

function GetFiles(directory){
    let formData = new FormData();
    formData.append("request","LIST");
    formData.append("path",directory);

    let xhr = new XMLHttpRequest();
    xhr.open("POST","Utility/Server/FileSystemUtility.php");
    xhr.onload = function(){
        if(xhr.status==200){
            let fileNames=this.responseText.split("#");
            DisplayFiles(fileNames, directory);
            console.log(document.getElementById("fileDisplay").childNodes);
        }else console.log("UploadFailed");
    }
    xhr.send(formData);
}
function DisplayFiles(fileNames, directory){
    for(let i=0; i<fileNames.length; i++){
        if(fileNames[i]!=""){
            let nameParts=fileNames[i].split(".");
            let extention = nameParts[nameParts.length-1].toLowerCase();
            if(extention=="png"||extention=="jpg"||extention=="jpeg"||extention=="gif"){
                let image = document.createElement('img');
                image.src="Files/"+directory+"/"+fileNames[i];
                let caption = document.createElement("figcaption");
                caption.innerHTML=fileNames[i];
                let figure = document.createElement('figure');
                figure.appendChild(image);
                figure.appendChild(caption);
                let button = document.createElement("button");
                button.appendChild(figure);
                button.onclick = function(event){
                    let nodes = document.getElementById("fileDisplay").childNodes;
                    if(!event.ctrlKey) for(let i=0; i<nodes.length; i++){
                        nodes[i].classList.remove("selected");
                    }
                    this.classList.add("selected");
                }
                document.getElementById("fileDisplay").appendChild(button);
            }
        }
    }
}

function MakeImageButton(name){

}
