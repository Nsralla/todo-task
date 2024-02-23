let arrayOfTodos = [{'make dinner':0},{'prey':0},{'sleep':0}];
let newTodo;
let todos_delete_list_indexes = []; // to collect all checked boxes
const remove_checked_button = document.querySelector('.sBtn-div'); // the blue button
const checkButton = document.querySelector('.js-check');

// display all todos in the array
displayAll();
function displayAll(){
    document.getElementById("todos-list").innerHTML = '';
    arrayOfTodos.forEach(displayTodoOnScreen);
    deleteTodo();
    addLineToTodo();
    editTodo();
}

checkButton.addEventListener("click",()=>{
    console.log(`# of todos = ${arrayOfTodos.length}`);
    console.log(`# of done todos  = ${todos_delete_list_indexes.length}`);
});

// display new todo when add button is clicked
document.getElementById("add-Button").onclick = function(){
    newTodo = document.getElementById("todo-text").value;// read todo
    arrayOfTodos.push(newTodo);
    displayAll();

}

// add todo when enter is pushed
document.querySelector('.todo-input').addEventListener('keydown',(event)=>{
    if (event.key === 'Enter') {
        newTodo = document.getElementById("todo-text").value;
        arrayOfTodos.push(newTodo);
        displayAll();   
    }
});

// display one todo
 function displayTodoOnScreen(newTodo,index){
    if(newTodo.trim() !== ''){
        let newTodoDiv = document.createElement('div');// create a new div for the todo
           newTodoDiv.classList.add("todo-list-div");
        
           // create a check box
           let checkbox = document.createElement('input');
           checkbox.type = 'checkbox';
           checkbox.id = index;
           checkbox.classList.add('todo-checkbox');

           // create a div for the text
           let textDiv = document.createElement('div');
           let paragraph = document.createElement('p');
           paragraph.textContent = newTodo;
           paragraph.id = 'p' +index;
           textDiv.id ='div'+index;
           textDiv.appendChild(paragraph);
           textDiv.classList.add('p-div');
        
        
           // create the buttons div
           let buttonsDiv = document.createElement('div');
           // add the class to the div
           buttonsDiv.classList.add('buttons-div');
           
        
           // create the pen button and the image inside it
           let penButton = document.createElement('button');
           penButton.classList.add('pen-button');
           penButton.id =index;
        
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
           deleteButton.id = index;

    
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
    }
    else{
        alert(`Todo can't be empty`);
    }
 }


// function to add a line through to the checked element
function addLineToTodo(){
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.onclick = function(){
            const index = parseInt(this.getAttribute('id'));
            todos_delete_list_indexes.push(index);
            


            
            // add a line thorugh,get the para, add a class to it

            let targetDiv = document.getElementById('div' + index);
            // Assuming there is only one <p> element inside the div
            let targetP = targetDiv.querySelector('p');
            //check if the element has a class named line-through, then remove it, else add it
            if (targetP.classList.contains('line-through')){
                targetP.classList.remove('line-through')
            }
            else{
                 // Add a class to it
                 targetP.classList.add('line-through');
            }
        }
    });
}

// when the blue button is clicked, remove all checked todos
remove_checked_button.addEventListener('click', () => {
    todos_delete_list_indexes.sort((a, b) => b - a);
    todos_delete_list_indexes.forEach((id) => {
        arrayOfTodos.splice(id, 1); // remove from todo list
    });
    displayAll(); // Render the page after all deletions
    todos_delete_list_indexes = []; // Empty the array AFTER the loop
});


// when x button is clicked,delete the todo
function deleteTodo() {
    const deleteButtons = document.querySelectorAll('.del-button');
    deleteButtons.forEach((delete_button) => {
        delete_button.onclick = function() {
            const index = parseInt(this.getAttribute('id'));
            // document.getElementById('p' + index).classList.add('lineThrough');
            document.getElementById('div' + index).classList.add('lineThrough');
            arrayOfTodos.splice(index, 1);
            todos_delete_list_indexes = []; // empty the array
            displayAll(); //rendering
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
                // get the text of 
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
                        // take the input text 
                        let input_text = inputElement.value;
                        if(input_text.trim() === ''){
                            input_text = p_text;
                        }
                        // put it in the p elemnt
                        p_element.textContent = input_text;
                       

                        // replace p with the input element
                        inputElement.parentNode.replaceChild(p_element, inputElement);
                }
            });
        }
    });
}


/*
what is the next step?
I need to fogure out how to compute the # of tasks done
 */

