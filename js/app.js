let objFolderTree = {
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

            }
        },
        desktop:{

        }
    },
    etc:{}
}


const sourceHTML = document.querySelector("#source")
const destinationHTML = document.querySelector("#destination")

let sourceKeys = []
let destinationKeys = []

let currentDirectory = objFolderTree
let foldeHistory = []

////current and history functions(not done)

function populateHistory(){
    
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
        let currentFolder = "home"///needs functionalitys
        //let typedPathArr= typedPath.split("/")
        ////////////////////////////////////////////////////////////Run/Check operations ---- build line for terminal
        const checkingArray = ['ls','cd','mv','cp','pwd','clear']
        chooseOperation(checkingArray,typedOperation,typedPath,currentFolder)
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////build line for terminal
        terminal.value=''
    }
})


/////////////////////////////////////////////////// terminal line generation
function createLine(operation,path,folder){
    let enteredLine = document.createElement("p")
        enteredLine.classList = ["entry"]
        enteredLine.innerHTML='<span>[user@daTerminal <span id="folder">'+ folder +'</span>]</span><span class="operation"> '+operation+'</span><span class="path"> '+path+'</span>'
        terminalHistory.appendChild(enteredLine)

}

function invLine(){
    let inv = document.createElement("p")
    inv.classList = ["invalid"]
    inv.innerText = "Invalid Operation"
    terminalHistory.appendChild(inv)
}

function lsLine(){
    let lsLineP = document.createElement("p")
    lsLineP.innerText = (Object.keys(objFolderTree).join(" "))
    terminalHistory.appendChild(lsLineP)
}


function chooseOperation(check,operation,path,folder){
    let find= check.indexOf(operation)
    console.log(folder)
    switch(find){
        case 0:
            ls(operation,path,folder)
            break;
        case 1:
            cd(operation,path,folder)
            break;
        case 2:
            mv()
            break;
        case 3:
            cp()
            break;
        case 4:
            pwd()
            break;
        case 5:
            clear()
            break;
        default:
            invalidOperation()
    }
}

///////////////////////////////////////////////////////Operation Functions

function ls(operation,path,folder){
    console.log("ls was here")
    console.log(folder)
    createLine(operation,path,folder)
    lsLine(path)
}
function cd(operation,path,folder){
    console.log("cd was here")
    createLine(operation,path,folder)
}
function mv(){
    console.log("mv was here")
}
function cp(){
    console.log("cp was here")
}
function pwd(){
    console.log("pwd was here")
}
function clear(){
    terminalHistory.innerHTML = ''
    console.log("clear was here")
}
function invalidOperation(){
    invLine()
    console.log("invalid operation")
}





function renderItems(view,current,obj){
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


 renderItems(sourceHTML,sourceKeys,objFolderTree)

//  console.log(Object.keys(objFolderTree)[0])
 console.log(objFolderTree[Object.keys(objFolderTree)[0]])
    
    let testHome = objFolderTree[Object.keys(objFolderTree)[0]]
//  console.log(testHome["workspace"])

renderItems(destinationHTML,destinationKeys,currentDirectory["home"])



// console.log(sourceKeys)
// console.log(destinationKeys)
