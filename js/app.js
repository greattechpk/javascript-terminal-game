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
// console.log(source)



const folderTreeKeyArr = []


function buildTreeArray(obj){
    let keyArr = Object.keys(obj)
    let keyArrFinal = []
    keyArr.forEach(key=>{
        console.log(obj[key])
        let currentKeyArr = Object.keys(obj[key])
        let i = 0
        keyArrFinal.push(key)
        console.log(currentKeyArr)
        if(currentKeyArr.length > 0 ){
            keyArrFinal[i] = [keyArrFinal[i]]
            keyArrFinal[i].push(currentKeyArr)
            console.log('If Statement')
            console.log(keyArrFinal)
        }
        i++
        
    })
    console.log(keyArrFinal)

}

function internalTreeArr(current,final){
    

}

buildTreeArray(objFolderTree)

//add folders and change keys

function renderItems(view,current,obj){
    const objFolderArr = Object.keys(obj)//needs to change to current directory
    //resets folders before adding new
    view.innerHTML = ''
    // console.log(objFolderArr)
    objFolderArr.forEach(item => {
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
    
    current = obj
    if (view === sourceHTML){
        sourceKeys = Object.keys(current)
    }
    if (view === destinationHTML){
        destinationKeys = Object.keys(current)
    }
}

function ls(){
    
}

 renderItems(sourceHTML,sourceKeys,objFolderTree)

// renderItems(destinationHTML,destinationKeys,objFolderTree)


// console.log(sourceKeys)
// console.log(destinationKeys)
