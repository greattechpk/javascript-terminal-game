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

const source = document.querySelector("#source")

console.log(source)



const folderTreeKeyArr = []

function buildTreeKeyArr(obj){
    const objFolderArr = Object.keys(obj)
    console.log(objFolderArr)
    objFolderArr.forEach(item => {
        //creating folder with attributes
        let folderViz = document.createElement("DIV")
        folderViz.classList.add('folder')
        //creating adding Icon
        let folderIcon = document.createElement("img")
        folderIcon.src = ""

        
        folderViz.appendChild(folderIcon)
        console.log(folderViz)  
        
    })

}

buildTreeKeyArr(objFolderTree)