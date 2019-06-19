Initialize();

function Initialize(){
    document.getElementsByTagName("body")[0].id="body";
    let componentNames = document.getElementById("components").innerHTML.split("@");
    for(let i=1; i<componentNames.length; i++){
        let componentName = componentNames[i].trim();
        let componentElement = document.createElement("div");
        componentElement.id=componentName;
        document.getElementById("body").appendChild(componentElement);

        LoadUI(componentName.replace(/^\s+|\s+$/g, ''));
        LoadScripts(componentName.replace(/^\s+|\s+$/g, ''));
        LoadStyle(componentName.replace(/^\s+|\s+$/g, ''));
    }
}

function LoadUI(componentName) {
    let formData = new FormData();
    formData.append("request","LOAD_HTML");
    formData.append("name",componentName);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'Utility/Server/LoadComponent.php');
    xhr.onload=function(){
        if(xhr.status=400){
            document.getElementById(componentName).innerHTML+=this.responseText;
        }else console.log("Upload failed");
    }
    xhr.send(formData);
}

function LoadScripts(componentName){
    let formData = new FormData();
    formData.append("request","LOAD_SCRIPTS");
    formData.append("name",componentName);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'Utility/Server/LoadComponent.php');
    xhr.onload=function(){
        if(xhr.status=400){
            if(this.responseText=="COMPONENT DOES NOT EXIST")return;
            let files=this.responseText.split("#");
            for(let i=0; i<files.length; i++){
                let fileName = files[i];
                if(fileName=="")continue;
                else{
                    let path = "Components/"+componentName+"/Scripts/"+fileName;
                    let targetElement=document.getElementById(componentName);
                    let scriptElement=document.createElement('script'); 
                    scriptElement.src=path;
                    targetElement.appendChild(scriptElement);
                }
            } 
        }else console.log("Upload failed");
    }
    xhr.send(formData);
}

function LoadStyle(componentName){
    let formData = new FormData();
    formData.append("request","LOAD_STYLE");
    formData.append("name",componentName);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'Utility/Server/LoadComponent.php');
    xhr.onload=function(){
        if(xhr.status=400){
            if(this.responseText=="COMPONENT DOES NOT EXIST")return;
            let files=this.responseText.split("#");
            for(let i=0; i<files.length; i++){
                let fileName = files[i];
                if(fileName=="")continue;
                else{
                    let path = "Components/"+componentName+"/StyleSheets/"+fileName;
                    let targetElement=document.getElementById(componentName);
                    let styleElement=document.createElement('link');
                    styleElement.rel="stylesheet"; 
                    styleElement.type="text/css";
                    styleElement.href=path;
                    targetElement.appendChild(styleElement);
                }
            }
        }else console.log("Upload failed");
    }
    xhr.send(formData);
}
