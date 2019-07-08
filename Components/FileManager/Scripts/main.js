let fsParameters={//This object CONTAINS ALL FILE SYSTEM CONFIGURATION AND GLOBAL variables
    rootDir         :   "Files",
    currentDir      :   [],
    maxFileSize     :   1048576000,
    supprotedTypes  :   {
                            "png"       :   "image",
                            "jpg"       :   "image",
                            "jpeg"      :   "image",
                            "gif"       :   "image",
                            "mp4"       :   "video",
                            "wmv"       :   "video",
                            "flv"       :   "video",
                            "avi"       :   "video",
                            "mp3"       :   "audio",
                            "txt"       :   "text",
                            "xml"       :   "text",
                            "json"      :   "text",
                            "folder"    :   "folder"
                        },
    clipBoard       :   {
                            method          :   "",
                            sourcePath      :   "",
                            fileList        :   [],
                            doneProcessing  : 0
                        },
    fullCurrentDirectory    :   function (){
        let fullDir = "/";
        for(let i=0; i<this.currentDir.length; i++)
            fullDir+=this.currentDir[i]+"/";
        return fullDir;
    }
};

document.getElementById("1").addEventListener('click', e=>{
    console.log("clicked: root");
    document.getElementById("fileDisplay").innerHTML="";
    for(let i=0; i<fsParameters.currentDir.length; i++)fsParameters.currentDir.pop();
    GetFiles();
});

document.getElementById("fileForm").addEventListener("submit", e=>{
    e.preventDefault();
    let files = document.getElementById("fileSource").files;
    console.log(files);
    if(files.length==0){
        ShowUploadMessage("No file Selected.");
    }else{
        UploadFiles(files,fsParameters.fullCurrentDirectory());
    }
});

document.getElementById("renameForm").addEventListener("submit", e=>{
    e.preventDefault();
    let targetName = document.getElementById("renameForm").getElementsByTagName("input")[0].value;
    let preserveExtention = document.getElementById("renameForm").getElementsByTagName("input")[1].checked;
    RenameFile(targetName, preserveExtention);
});

document.getElementById("upDirectoryButton").addEventListener("click", e=>{
    fsParameters.currentDir.pop();
    GetFiles();
});

document.getElementById("copyButton").addEventListener("click", e=>{
    PrepareClipboard("COPY");
});
document.getElementById("cutButton").addEventListener("click", e=>{
    PrepareClipboard("CUT");
});
document.getElementById("pasteButton").addEventListener("click", e=>{
    if(fsParameters.clipBoard.fileList.length==0)alert("Clipboard is empty!!!");
    else{
        RelocateSelectedFiles();
    }
});
document.getElementById("deleteButton").addEventListener("click", e=>{
    PrepareClipboard("DELETE");
    if(fsParameters.clipBoard.fileList.length==0)alert("Nothing Selected!!!");
    else DeleteSelectedFiles();
});
document.getElementById("downloadButton").addEventListener("click", e=>{
    PrepareClipboard("DOWNLOAD");
    DownloadSelectedFiles();
});
document.getElementById("addFolderButton").addEventListener("click", e=>{
    AddFolder();
});