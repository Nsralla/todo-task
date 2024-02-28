let arrayOfTodos = JSON.parse(localStorage.getItem('todosArray101')) || [];
let checkboxesArray = JSON.parse(localStorage.getItem('checkBoxesArray101')) || [];
let newTodo;
const remove_checked_button = document.querySelector('.sBtn-div'); // the blue button
const  processureBtn = document.querySelector('.fBtn');

displayAll();
checkPercentege();

function displayAll(){
    arrayOfTodos.forEach(displayTodoOnScreen);
    deleteTodo();
    addLineToTodo();
    editTodo();
}



function checkPercentege(){
    if(arrayOfTodos.length === 0){
        processureBtn.innerHTML = 'No taks to show';
        processureBtn.style.background = 'white';
        return;
    }
     // Calculate the percentage
     const percentage = (checkboxesArray.length/ arrayOfTodos.length) * 100;

     if(checkboxesArray.length === 0){
        processureBtn.style.background = `white`;
     }
     else{

        // Set the background gradient dynamically
        processureBtn.style.background = `linear-gradient(to right, rgb(151,228,74) ${percentage}%, white ${100 - percentage}%)`;
     }
     processureBtn.innerHTML = `${checkboxesArray.length} of ${arrayOfTodos.length} taks done`;
    //  processureBtn.innerHTML = '';
}
// display new todo when add button is clicked
document.getElementById("add-Button").onclick = function(){
    newTodo = document.getElementById("todo-text").value; // read todo
    if(newTodo !== ''){
        let obj = {todo:newTodo, isDone:0,id:0};
        obj.id = generateUUID(); 
        arrayOfTodos.push(obj);
        displayTodoOnScreen(obj);
        checkPercentege();
        updateLocalStorage();
    }
    deleteTodo();
    addLineToTodo();
    editTodo();
}

// add todo when enter is pushed
document.querySelector('.todo-input').addEventListener('keydown',(event)=>{
    if (event.key === 'Enter') {
        newTodo = document.getElementById("todo-text").value;
        if(newTodo !== ''){
            let obj = {todo:newTodo, isDone:0,id:0};
            obj.id = generateUUID();
            arrayOfTodos.push(obj);
            displayTodoOnScreen(obj);
            checkPercentege();
            updateLocalStorage();
            deleteTodo();
            addLineToTodo();
            editTodo();
        }
      
    }
});

// display one todo
 function displayTodoOnScreen(newTodoObject){
    if(newTodoObject.todo.trim() !== ''){
           let newTodoDiv = document.createElement('div');// create a new div for the todo
           newTodoDiv.classList.add("todo-list-div");

           newTodoDiv.id ='fulldiv' + newTodoObject.id;
        
           // create a check box
           let checkbox = document.createElement('input');
           checkbox.type = 'checkbox';
           if(newTodoObject.isDone === 1){
            checkbox.checked = true;
           }
           checkbox.id = newTodoObject.id;
           checkbox.classList.add('todo-checkbox');

           // create a div for the text
           let textDiv = document.createElement('div');
           let paragraph = document.createElement('p');

        if(newTodoObject.isDone === 1){
            paragraph.classList.add('line-through');
        }


           paragraph.textContent = newTodoObject.todo;
           paragraph.id = 'p' + newTodoObject.id;
           textDiv.id ='div'+ newTodoObject.id;
           textDiv.appendChild(paragraph);
           textDiv.classList.add('p-div');
        
        
           // create the buttons div
           let buttonsDiv = document.createElement('div');
           // add the class to the div
           buttonsDiv.classList.add('buttons-div');
           
        
           // create the pen button and the image inside it
           let penButton = document.createElement('button');
           penButton.classList.add('pen-button');
           penButton.id =newTodoObject.id;
        
           let penImage = document.createElement('img');
           penImage.src = "/TASKS/images/pen-blue.svg";
           penImage.alt = 'pen image';
           penImage.classList.add('pen-img');
           
        
           // add the penImage to the penButton
           penButton.appendChild(penImage) ;
        
        
           // add the button to the buttons div
           buttonsDiv.appendChild(penButton);
        
           // create the delete button
           let deleteButton = document.createElement('button');
           deleteButton.classList.add('del-button');
           deleteButton.id = newTodoObject.id;

    
           // create the deleteImage
           let delImage = document.createElement('img');
           delImage.src = '/TASKS/images/close-light-blue.svg';
           delImage.alt = 'delete img';
           delImage.classList.add('del-img');
        
           // put the image inside the button
           deleteButton.appendChild(delImage);
        
           // add the del button to the buttons div
           buttonsDiv.appendChild(deleteButton);
        
        
            // append the text and the checkbox to the newtododiv and the buttons div
            newTodoDiv.appendChild(checkbox);
            newTodoDiv.appendChild(textDiv);
            newTodoDiv.appendChild(buttonsDiv);
        
           // apend the new todo to the main div
           document.getElementById("todos-list").appendChild(newTodoDiv);
           document.getElementById("todo-text").value = '';
           return 1;
    }
    else{
        alert(`Todo can't be empty`);
    }
    return 0;
 }


// function to add a line through to the checked element
function addLineToTodo(){
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.onclick = function(){
            const index = parseInt(this.getAttribute('id'));
            if(!checkboxesArray.includes(index))
                checkboxesArray.push(index);
            else{
                const indexOfUnchecked2 = checkboxesArray.indexOf(index);
                if (indexOfUnchecked2 !== -1) {
                    checkboxesArray.splice(indexOfUnchecked2, 1);
                }
            }
        
            // add a line thorugh,get the para, add a class to it
            let targetDiv = document.getElementById('div' + index);
            // Assuming there is only one <p> element inside the div
            let targetP = targetDiv.querySelector('p');
            let text = targetP.innerHTML;
            let indexOfTodo = arrayOfTodos.findIndex(todoObj => todoObj.todo === text);

            //check if the element has a class named line-through, then remove it, else add it
            if (targetP.classList.contains('line-through')){
                targetP.classList.remove('line-through');
                const indexOfUnchecked = checkboxesArray.indexOf(index);
                if (indexOfUnchecked !== -1) {
                    checkboxesArray.splice(indexOfUnchecked, 1);
                }
                arrayOfTodos[indexOfTodo].isDone = 0;
                
            }
            else{
                 targetP.classList.add('line-through');
                 arrayOfTodos[indexOfTodo].isDone = 1;
            }
         
            checkPercentege();
            updateLocalStorage();

        }

    });
}

// when the blue button is clicked, remove all checked todos
remove_checked_button.addEventListener('click', () => {
    // Sort the indexes in descending order before removing
    checkboxesArray.sort((a, b) => b - a);
    // Iterate over the indexes in reverse order to avoid issues with array modification
    for (let i = checkboxesArray.length - 1; i >= 0; i--) {
        const id = checkboxesArray[i];
        // Remove the corresponding div from the DOM
        const divIdToDelete = 'fulldiv' + id;
        const divToDelete = document.getElementById(divIdToDelete);
        let textInsideP = document.querySelector(`#${divIdToDelete} #div${id} #p${id}`).textContent;
        // delete the element from arrayOfTodos that contain this string
        // Find the index of textInsideP in arrayOfTodos
        const indexToRemove = arrayOfTodos.findIndex(todoObj => todoObj.todo === textInsideP.trim());;
        // Remove the element at indexToRemove from arrayOfTodos
        if (indexToRemove !== -1) 
            arrayOfTodos.splice(indexToRemove, 1);           
        
        divToDelete.remove();
        // Remove the id from checkboxesArray
        checkboxesArray.splice(i, 1);
        updateLocalStorage();
        checkPercentege();
    }
  
});



// when x button is clicked,delete the todo
function deleteTodo() {
    const deleteButtons = document.querySelectorAll('.del-button');
    deleteButtons.forEach((delete_button) => {
        delete_button.onclick = function() {
            const index = parseInt(this.getAttribute('id'));
            // document.getElementById('div' + index).classList.add('lineThrough');

              // Remove the corresponding div from the DOM
            const divIdToDelete = 'fulldiv' + index;
            let textInsideP = document.querySelector(`#${divIdToDelete} #div${index} #p${index}`).textContent;
            // delete the element from arrayOfTodos that contain this string
            // Find the index of textInsideP in arrayOfTodos
            const indexToRemove = arrayOfTodos.findIndex(todoObj => todoObj.todo === textInsideP.trim());
            // Remove the element at indexToRemove from arrayOfTodos
            if (indexToRemove !== -1) {
                arrayOfTodos.splice(indexToRemove, 1);
            }
            
                const indexOfUnchecked2 = checkboxesArray.indexOf(index);
                if (indexOfUnchecked2 !== -1) {
                    checkboxesArray.splice(indexOfUnchecked2, 1);
                }
                checkPercentege();
                // get the parent div which names is todos-list
                let parent_div = document.getElementById('todos-list');
                // get the div by it's id
                let div_to_delete = document.getElementById('fulldiv'+index);

                parent_div.removeChild(div_to_delete);
                updateLocalStorage();
            }
       
    });
}

// when edit button is clicked, enable editting the text
function editTodo(){
    const editButtons = document.querySelectorAll('.pen-button');
    editButtons.forEach((editButton) =>{
        editButton.onclick = function (){
            // get the id of the elemnt
            const index = parseInt(this.getAttribute('id'));
            // we need to create input element
            const inputElement = document.createElement('input');
            inputElement.classList.add('edited-text');
            inputElement.id = 'input-on-click';
            // put the text of p inside the input elemnt
            const p_element = document.getElementById('p'+index);
            let p_text = document.getElementById('p'+index).textContent;
            inputElement.value = p_text;
              
            // replace the p with the input
            p_element.parentNode.replaceChild( inputElement, p_element);
            // Focus the input and select its text to make editing easier
            inputElement.focus();
            inputElement.select();
            // add event listener to the input element
            inputElement.addEventListener('keydown',(event)=>{
                if(event.key === 'Enter'){
                    // we need to swap between p and input element
                        let input_text = inputElement.value;
                        if(input_text.trim() === ''){
                            input_text = p_text;
                        }
                        let text = p_text;
                        // put the new string on the array of todos
                        let stringIndex = arrayOfTodos.findIndex(todoObj => todoObj.todo === text);
                        arrayOfTodos[stringIndex].todo = `${input_text}`;
                        // put it in the p elemnt
                        p_element.textContent = input_text;
                        // replace p with the input element
                        inputElement.parentNode.replaceChild(p_element, inputElement);
                        updateLocalStorage();
                       
                }
            });
          
        }
       
    });
}



// Function to generate UUID
function generateUUID() {
    let uuid = '';
    for (let i = 0; i < 5; i++) 
        uuid += Math.floor(Math.random() * 10); // Generates random integers from 0 to 9
    return Number(uuid);
}


function updateLocalStorage(){
    localStorage.setItem('todosArray101',JSON.stringify(arrayOfTodos));
    localStorage.setItem('checkBoxesArray101',JSON.stringify(checkboxesArray));
}
