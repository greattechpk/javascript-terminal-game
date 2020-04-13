
let objTree = {
    home:{
        pictures:{

        },
        documents:{

        },
        videos:{

        },
        downloads:{

        },
        workspace:{
            git:{
                project1: {
                    banana: {}
                },
                project2: {
                    
                },
                project3: {
                    
                }
            }
        },
        desktop:{

        }
    },
    etc:{}
}


const sourceHTML = document.querySelector("#source")
const destinationHTML = document.querySelector("#destination")
let loadedObject = objTree
let currentDirectory = objTree
let folderHistory = []
let currentFolder
const tempHist = []


////////////////////////////////////////////////////////////////////////////////////////////////////////////////current and history functions(not done)


function changeDirectoryHistory(path){//changes directory form array
    const rememberedDirectory = currentDirectory //stores current
    
    targetDirectory(path,tempHist)

    if (currentDirectory === undefined){ ///////// invalid op line
        currentDirectory = rememberedDirectory
        invLine()
    }else{
        folderHistory = []
        folderHistory.push(...tempHist) ////////////////////// if directory works out change directory ---- populate folder history ---- and render new directory to viewport
        currentFolder = folderHistory[folderHistory.length-1]
        renderItems(destinationHTML,currentDirectory)
    }    
    console.log(folderHistory)
}

function targetDirectory(path,histArr){
    path = path.split("/")
    for(let i =0; i<path.length;i++){
        let checkStr = ".."
        console.log("Checking path vs checkstr" + (path[i] == checkStr))
        if(path[i] == checkStr){
            currentDirectory = {...loadedObject}
            console.log(histArr)
            for(let j =0; j < histArr.length-1;j++){
                currentDirectory=currentDirectory[histArr[j]]
                console.log(Object.keys(currentDirectory))
            }
            histArr.pop()
            console.log("This is histArr", histArr)
            if(histArr.length === 0){
                currentDirectory = loadedObject
                console.log(currentDirectory)
            }
        }else{
        currentDirectory = currentDirectory[path[i]]//changes current directory per item in typed path
        histArr.push(path[i])
        console.log(tempHist) //creates a temp array of history for typed path ------------------ SHOULD BE USED TO STORE ..'S FOR CD  
    }
    }
}



function populateHistory(history){
    
}

// /////////////////////////////////////////////////// Terminal
const terminal = document.querySelector("#terminal")
const terminalHistory = document.querySelector("#terminal-history")

terminal.addEventListener('keyup',()=>{
    if(event.keyCode === 13){
        let typed = terminal.value
        let typedArr = typed.split(" ")
        let typedOperation = typedArr[0]
        let typedPath=typedArr[1]

        if(currentDirectory === loadedObject){
            currentFolder = '/'
        }///needs functionalitys
        ////////////////////////////////////////////////////////////Run/Check operations ---- build line for terminal
        const checkingArray = ['mkdir','ls','cd','mv','rm','cp','pwd','clear']
        chooseOperation(checkingArray,typedOperation,typedPath,currentFolder)
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////build line for terminal
        terminal.value=''
    }
})


/////////////////////////////////////////////////// terminal line generation
function createLine(operation,path,folder){
    if (path === undefined){
        path = ""
    }
    let enteredLine = document.createElement("p")
        enteredLine.classList = ["entry"]
        enteredLine.innerHTML='<span>[user@daTerminal <span id="folder"> '+ currentFolder+' </span>]</span><span class="operation"> '+operation+'</span><span class="path"> '+path+'</span>'
        terminalHistory.appendChild(enteredLine)

}

function invLine(){
    let inv = document.createElement("p")
    inv.classList = ["invalid"]
    inv.innerText = "Invalid Operation"
    terminalHistory.appendChild(inv)
}

function lsLine(path){
    let lsLineP = document.createElement("p")
    let lsCrawler = currentDirectory
    if(path === '/'){
        path = Object.keys(loadedObject)
        
    }else if(path === undefined){
        path = Object.keys(currentDirectory)
    }else{
        path = path.split("/")
        for(let i = 0; i < path.length;i++){
            lsCrawler = lsCrawler[path[i]]
        }
        path = Object.keys(lsCrawler)
    }
    //may need else statement for anything other than root
    console.log(path)
    lsLineP.innerText = (path.join(" "))
    terminalHistory.appendChild(lsLineP)
}


function chooseOperation(check,operation,path,folder){
    let find= check.indexOf(operation)
    const command = check[find]
    console.log(path)
    switch(command){
        case "ls":
            ls(operation,path,folder)
            break;
        case "cd":
            cd(operation,path,folder)
            break;
        case "mv":
            mv()
            break;
        case "cp":
            cp()
            break;
        case "pwd":
            pwd()
            break;
        case "clear":
            clear()
            break;
        case "mkdir":
            mkdir(path)
            break;
        case "rm":
            rm(path)
            break;
        default:
            invalidOperation()
    }
}

///////////////////////////////////////////////////////Operation Functions

function ls(operation,path,folder){
    console.log("ls was here")
    console.log(path)
    createLine(operation,path)
    console.log("After create Line ls", path)
    lsLine(path)
}
function cd(operation,path,folder){
    console.log(path)
    console.log("cd was here")
    changeDirectoryHistory(path,folder)
    createLine(operation,path,folder)
}
function mv(){
    console.log("mv was here")
}
function cp(){
    console.log("cp was here")
}
function pwd(path){
    console.log("pwd was here")
}
function clear(){
    terminalHistory.innerHTML = ''
    console.log("clear was here")
}
function mkdir(path) {
    currentDirectory[path] = {}
    console.log(currentDirectory)
    console.log(path)
    console.log(folder)
    renderItems(destinationHTML,currentDirectory)
    createLine("mkdir",path)
}
function rm(path) {
    delete currentDirectory[path]
    renderItems(destinationHTML,currentDirectory)
}
function invalidOperation(){
    invLine()
    console.log("invalid operation")
}



////////////////////////////////////////////////////////////Render Functions

function renderItems(view,obj){
    const objArr = Object.keys(obj)//needs to change to current directory
    //resets folders before adding new
    view.innerHTML = ''
    // console.log(objFolderArr)
    objArr.forEach(item => {
        //creating folder with attributes
        let folderViz = document.createElement("DIV")
        folderViz.classList.add('folder')
        //creating adding Icon
        let folderIcon = document.createElement("img")
        folderIcon.src = "/img/folder_BW.png"
        folderIcon.height = "96"
        folderViz.appendChild(folderIcon)
        //adding text
        let text = document.createTextNode(item)
        folderViz.appendChild(text)
        view.appendChild(folderViz)
    })
}

renderItems(destinationHTML,currentDirectory)

renderItems(sourceHTML,objTree)