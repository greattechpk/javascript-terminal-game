
let objTree = {
    home: {
        pictures: {

        },
        documents: {

        },
        videos: {

        },
        downloads: {

        },
        workspace: {
            git: {
                project1: {
                    banana: {}
                },
                project2: {

                },
                project3: {

                }
            }
        },
        desktop: {

        }
    },
    etc: {}
}


const destinationHTML = document.querySelector("#destination")
let loadedObject = objTree
let currentDirectory = objTree
let folderHistory = []
let currentFolder
let tempHist = []
let directoryToTransfer = {}

///////////////////////////////Gameify functions
let timeCount = 25

let timeHtml = document.getElementById("time")
timeHtml.textContent  = timeCount
let countdown = setInterval(() => {
    timeCount--
    (timeCount == 0) ? (timeHtml.textContent = "0"): (timeHtml.textContent  = timeCount);
    if(timeCount <= 0){
        alert("you lose refresh and try again")
        clearInterval(countdown)};
},1000)

function stopTime(){
    clearInterval(countdown)
    countdown = 0;
}

///challenge array and vars
let challengeArr = [["cd into the git folder",  loadedObject.home.workspace.git],["cd into project 1",loadedObject.home.workspace.git.project1],["cd into etc",loadedObject.etc]]
let challengesHtml = document.getElementById("challenges")
let checkStep = 0
let checkIndex = challengeArr[checkStep]
let count = 0
let challengeCount = 0
let challengeTryCount = 0
let score = 0


challengeArr.forEach((array)=>{    
    let challengeLine = document.createElement("p")
    challengeLine.id = `challenge${count + 1}`
    challengeLine.innerHTML = `${count + 1}. <span class="challenge">${array[0]}</span>`
    challengesHtml.appendChild(challengeLine)
    count++
})

function challengeCheck(array){
    let check1 = array[1]
    challengeTryCount ++
    if (check1 == currentDirectory){
        checkStep++
        checkIndex = challengeArr[checkStep]
        document.getElementById(`challenge${checkStep}`).classList = ["strike-through"]
        challengeCount++
        challengeScoreCalc(challengeTryCount)
        if (challengeCount >= challengeArr.length){
            stopTime()
            alert("You've won.")
        }
        timeCount += 5
    }
}

function challengeScoreCalc(count){
    let challengeScore = 0
    switch (count){
        case 1: challengeScore += 1000;
        case 2: challengeScore += 650;
        case 3: challengeScore += 400;
        case 4: challengeScore += 250;
        default: challengeScore += 100
    }

    score += challengeScore
    challengeTryCount = 0
    document.getElementById("score").innerText = score
}


////////////////////////////operation functions


function changeDirectoryHistory(path) {//changes directory form array
    const rememberedDirectory = currentDirectory //stores current

    targetDirectory(path, tempHist)

    if (currentDirectory === undefined) { ///////// invalid op line
        currentDirectory = rememberedDirectory
        invLineCheck = true
    } else {
        folderHistory = []
        folderHistory.push(...tempHist) ////////////////////// if directory works out change directory ---- populate folder history ---- and render new directory to viewport
        currentFolder = folderHistory[folderHistory.length - 1]
        renderItems(destinationHTML, currentDirectory)
        
    }
    let folderHTML =folderHistory[folderHistory.length-1]
    if(folderHistory.length === 0){
        folderHTML = "/"
    }
    document.getElementById("folder2").innerText = folderHTML
    document.getElementById("current-destination").innerText =folderHTML 

    console.log(folderHistory[folderHistory.length-1])
    console.log(folderHistory)
}

function targetDirectory(path, histArr) {
    path = path.split("/")
    for (let i = 0; i < path.length; i++) {
        let checkStr = ".."
        console.log("Checking path vs checkstr" + (path[i] == checkStr))
        if (path[i] == checkStr) {
            currentDirectory = { ...loadedObject }
            console.log(histArr)
            for (let j = 0; j < histArr.length - 1; j++) {
                currentDirectory = currentDirectory[histArr[j]]
                console.log(Object.keys(currentDirectory))
            }
            histArr.pop()
            console.log("This is histArr", histArr)
            if (histArr.length === 0) {
                currentDirectory = loadedObject
                console.log(currentDirectory)
            }
        } else {
            currentDirectory = currentDirectory[path[i]]//changes current directory per item in typed path
            histArr.push(path[i])
            console.log(tempHist) //creates a temp array of history for typed path ------------------ SHOULD BE USED TO STORE ..'S FOR CD  
        }
    }
}

// /////////////////////////////////////////////////// Terminal
const terminal = document.querySelector("#terminal")
const terminalHistory = document.querySelector("#terminal-history")

terminal.addEventListener('keyup', () => {
    countdown 
    if (event.keyCode === 13) {
        let typed = terminal.value
        let typedArr = typed.split(" ")
        let typedOperation = typedArr[0]
        let typedToMVCP
        let typedPath = typedArr[1]


        if (currentDirectory === loadedObject) {
            currentFolder = '/'
        }///needs functionalitys
        ////////////////////////////////////////////////////////////Run/Check operations ---- build line for terminal
        const checkingArray = ['mkdir', 'ls', 'cd', 'mv', 'rm', 'cp', 'pwd', 'clear']
        chooseOperation(checkingArray, typedOperation, typedPath, currentFolder, typedToMVCP)
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////build line for terminal
        terminal.value = ''
        terminalHistory.scrollTop = terminalHistory.scrollHeight

        challengeCheck(checkIndex)
    }
})


/////////////////////////////////////////////////// terminal line generation
function createLine(operation, path) {
    if (path === undefined) {
        path = ""
    }
    let enteredLine = document.createElement("p")
    let folderHTML =currentFolder
    if(folderHTML === undefined){
        folderHTML = "/"
    }
    
    enteredLine.classList = ["entry"]
    enteredLine.innerHTML = '<span>[user@daTerminal <span id="folder"> ' + folderHTML + ' </span>]</span><span class="operation"> ' + operation + '</span><span class="path"> ' + path + '</span>'
    terminalHistory.appendChild(enteredLine)

}
let invLineCheck = false
function invLine() {
    let inv = document.createElement("p")
    inv.classList = ["invalid"]
    inv.innerText = "Invalid Operation"
    terminalHistory.appendChild(inv)
}

function lsLine(path) {
    let lsLineP = document.createElement("p")
    let lsCrawler = currentDirectory
    if (path === '/') {
        path = Object.keys(loadedObject)

    } else if (path === undefined) {
        path = Object.keys(currentDirectory)
    } else {
        path = path.split("/")
        for (let i = 0; i < path.length; i++) {
            lsCrawler = lsCrawler[path[i]]
        }
        path = Object.keys(lsCrawler)
    }
    //may need else statement for anything other than root
    console.log(path)
    lsLineP.innerText = (path.join(" "))
    terminalHistory.appendChild(lsLineP)
}

function pwdLine() {
    console.log(tempHist)
    let pwdLine = tempHist.join("/")
    let pwdLineP = document.createElement("p")
    pwdLineP.innerHTML = pwdLine
    terminalHistory.appendChild(pwdLineP)

}


function chooseOperation(check, operation, path, folder, item) {
    let find = check.indexOf(operation)
    const command = check[find]
    switch (command) {
        case "ls":
            ls(operation, path, folder)
            break;
        case "cd":
            cd(operation, path, folder)
            break;
        case "mv":
            mv(operation, path, folder, item)
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


function ls(operation, path, folder) {
    console.log("ls was here")
    console.log(path)
    createLine(operation, path)
    console.log("After create Line ls", path)
    lsLine(path)
}
function cd(operation, path, folder) {
    console.log(path)
    console.log("cd was here")
    changeDirectoryHistory(path, folder)
    createLine(operation, path, folder)
    if (invLineCheck === true){
        invLine()
        invLineCheck = false
    }
}
function mv(operation, path, folder, item) {
    console.log("mv was here")
    // let currentItem = currentDirectory[item]
    // pasteCurrent(path,currentItem)
    // delete currentDirectory[path]
    // createLine(operation,path,folder,item)
}
function cp(operation, path, folder, item) {
    console.log("cp was here")
}
function pwd() {
    createLine("pwd")
    pwdLine()
}
function clear() {
    terminalHistory.innerHTML = ''
    console.log("clear was here")
}
function mkdir(path) {
    currentDirectory[path] = {}
    renderItems(destinationHTML, currentDirectory)
    createLine("mkdir", path)
}
function rm(path) {
    delete currentDirectory[path]
    renderItems(destinationHTML, currentDirectory)
}
function invalidOperation() {
    invLine()
    console.log("invalid operation")
}



////////////////////////////////////////////////////////////Render Functions

function renderItems(view, obj) {
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

renderItems(destinationHTML, currentDirectory)



