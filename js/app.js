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
console.log(source)



const folderTreeKeyArr = []


//add folders and change keys

function renderItems(view,current,obj){
    const objFolderArr = Object.keys(obj)//needs to change to current directory
    //resets folders before adding new
    view.innerHTML = ''
    console.log(objFolderArr)
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

renderItems(destinationHTML,destinationKeys,objFolderTree)


console.log(sourceKeys)
console.log(destinationKeys)
