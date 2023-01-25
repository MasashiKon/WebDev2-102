//Adding a note

const form = document.querySelector("#add")
const addInputField = document.querySelector("#add-input")
const list = document.querySelector("#list")

form.addEventListener("submit", function(evt){
    evt.preventDefault()
    //prevent from, submitting if input is empty
    const inputValue = evt.target[0].value
    if(!inputValue) return;

    //Solution 1
    // const newEl = document.createElement('li')
    // newEl.innerHTML = `<p>${inputValue}</p>
    // <p><i class="fa fa-pencil-square-o"></i><i class="fa fa-times"></i></p>
    // <input type="text" class="edit-note" />`;
    // list.appendChild(newEl)

    //Solution 2
    // const li = document.createElement('li')
    // const firstP = document.createElement('p')
    // const secondP = document.createElement('p')
    // const firstIcon = document.createElement('i')
    // const secondIcon = document.createElement('i')
    // const input = document.createElement('input')

    // firstIcon.className = "fa fa-pencil-square-o"
    // secondIcon.className = "fa fa-times"
    // input.className = "edit-note"
    // input.setAttribute("type", "text")

    // firstP.textContent = inputValue

    // secondP.appendChild(firstIcon)
    // secondP.insertAdjacentText("beforeend", "\n")
    // secondP.appendChild(secondIcon)
    // li.appendChild(firstP)
    // li.appendChild(secondP)
    // li.appendChild(input)
    // list.appendChild(li)

    //Solution 3
    const clonedLi = document.querySelector("#list li").cloneNode(true)
    clonedLi.firstElementChild.textContent = inputValue
    list.appendChild(clonedLi)

    evt.target[0].value = ''
})

// Editing and Deleting
list.addEventListener('click', function(e){
    // console.dir(this)
    // console.log(e.target.classList);

    //Clicked edit
    if(e.target.classList[1] === 'fa-pencil-square-o'){
        let parentP = e.target.parentNode
        console.dir(parentP);
        parentP.style.display = "none" //hide second p

        let note = parentP.previousElementSibling
        let editInput = parentP.nextElementSibling

        editInput.style.display = "block"
        editInput.value = note.textContent

        editInput.addEventListener("keypress", function(e){

            if(e.keyCode === 13){ // 13 ----> decimal for carriage return

                if(editInput.value !== ''){
                    note.textContent = editInput.value
                }
                parentP.style.display = 'block'
                editInput.style.display = 'none'

            }
        })
    }

    //Clicked delete
    if(e.target.classList[1] === 'fa-times'){
        const listToDelete = e.target.parentNode.parentNode
        list.removeChild(listToDelete)
    }
})

//Hide list
const hideItem = document.querySelector('#hide')
hideItem.addEventListener('click', function(e){

    const label = document.querySelector('label')

    if(this.checked){
        label.textContent = 'Unhide Notes'
        list.style.display = "none"
    }else{
        label.textContent = 'Hide Notes'
        list.style.display = "block"
    }
})

// Search Filter
const searchInput = document.querySelector("#search-note input")
searchInput.addEventListener('keyup', function(e){

    const searchTerm = e.target.value.toLowerCase()
    const noteList = list.getElementsByTagName('li')

    Array.from(noteList).forEach(function(note){

        const paraText = note.firstElementChild.textContent

        if(paraText.toLowerCase().indexOf(searchTerm) !== -1){
            note.style.display = "block"
        }else{
            note.style.display = "none"
        }
    })
})