const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector('.search input');

//function to add todos
const newTemplate = todo => {
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="text-light">${todo}</span>
            <i class="fa-regular fa-trash-can delete"></i>
        </li>
    `;

    list.innerHTML += html;
};

//adding todos to the list
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim().toLowerCase();

    if(todo.length){
        newTemplate(todo);
        addForm.reset();
    }

    localStorage.setItem('todo', todo);
})

//removing todos from the list using event delegation
list.addEventListener('click', e => {

    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
})

//function for filtering through the todo list
const filterTodos = words => {
    Array.from(list.children)
        .filter((todo) => {
            return !todo.textContent.includes(words);
        })
        .forEach((todo) => {
            todo.classList.add('filtered');
        })
    Array.from(list.children)
        .filter((todo) => {
            return todo.textContent.includes(words);
        })
        .forEach((todo) => {
            todo.classList.remove('filtered');
        })
}
//filtering out todos
search.addEventListener('keyup', () => {
    const words = search.value.trim().toLowerCase();
    filterTodos(words)
})

//saving todos to local storage
if (localStorage.getItem('todo')) {
    newTemplate(localStorage.getItem('todo'));
    addForm.reset();
}
