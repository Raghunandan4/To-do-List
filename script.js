// Turning our JS module into IIFE (Immediately Invoked Function Expression) module :-

(function() {
    let tasks = [];

    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    // function fetchTodos() {
    //     // Get request:-
    //     fetch('https://jsonplaceholder.typicode.com/todos') // returns Promise
    //         .then(function(response) { // so we can use ".then"
    //             return response.json();
    //         }).then(function(data) {
    //             tasks = data.slice(0, 10);
    //             renderList();
    //         })
    //         .catch(function(error) {
    //             console.log('error', error);
    //         })
    // }

    // Using Async Await:-
    /*
    async function fetchTodos() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0, 10);
            renderList();
        } catch (error) {
            console.log(error);
        }
    } */

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB2CAMAAAAqeZcjAAAAYFBMVEX///8AAACPj49hYWHj4+MUFBTe3t50dHT5+fmhoaHJyclUVFT8/PzT09OxsbFISEgvLy+Hh4cfHx81NTVZWVnr6+ubm5u+vr48PDx+fn5nZ2fy8vJubm4nJyeVlZUICAhhjHHPAAACmklEQVRoge2b65KjIBCFxYi39Ro1msnF93/LHUdwUFGaAFVbW31+AvKJIkJz8DwNdUlJiVS0TDqdmnR0kyO5bm6o/jmVEN8FNVVRCUkdYEs1trRP7dRUQux3qx6C7a1jC1419dON/OWrKpxhq2CfF1TOsdLemrrGVg9Z5qNyjC1jWWZcIlZHcZhL9Z4rHlJZZjrMuW/5taH0XgV19wYyLOiquZ+OX/3B79Rc9GQAy11BJ+VH1OzqEnvNDrCF+loTHXXz1i22PcC6pRKiwt662Jq6GxRreUqUwrBfdqme9wXCWh/PCxA2sY1NQNjBNnaAdam7Xeod+gENfmJN/kAUWKdD8vegrHoabnT07gCLKxMdjkIXl9TLEdV7DOqrP9UgnWAzbuSKGp1QvxXWLZvhX/8Yi30aVVuHp9AfsWDBxcsMxfsKLLiwYI2FWMQiFrGI/Z+wQb/9d8Vpuo2EhP06MmiKzZ5kGxv6ibiuAhLZFCV6imt2U+w8pxTXxeFcSHwE86pcnB8aYrvXnNTtCgk1sjj3SyhkiA3orm1s0hX9prD2U+H1IhaxiEUsYhGLWMQiFrGIRSxiEYtYxCIWsYhF7D+E5aZNYeuXGQHfQqE5RbR9msaT39umecE4pYxitDza3oh50L6mZFwFxr3J2jiszAXZcyS0FlM+wa49ZF2+2yvI891eQb62M7Y6WGbnOrMOwMSNDTDnP7d7S/zPegpYRTBrOC9dq4ueq9a6/5htSBz7MGHiHtGXyjjLxI9LXI0ec8ANSdDDFcsRAmpgiysWFy74sMGvg6mqi62dH6KirpYq4F6zmFgU8M1Osuic0vJqWjPvavaOYrQBHbX7ZAg4iKNSCfAr7Rts6H5vPj0vExZR85EJnjZRcdrSvxMHO0Je5oGhAAAAAElFTkSuQmCC"
        class="delete" data-id="${task.id}">`;

        tasksList.append(li);
    }

    function renderList() {
        tasksList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            addTaskToDOM(tasks[i]);
        }

        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask(taskId) {
        const task = tasks.filter(function(task) {
            return task.id == Number(taskId)
        });

        if (task.length > 0) {
            const currentTask = task[0];
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification('Task toggled successfully');
            return;
        }
        showNotification('Could not toggle the task');
    }

    function deleteTask(taskId) {
        const newTasks = tasks.filter(function(task) {
            return task.id !== Number(taskId)
        });
        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully');
    }

    function addTask(task) {
        if (task) {
            // fetch('https://jsonplaceholder.typicode.com/todos', {
            //         method: 'POST', // Posting API 
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(task),
            //     })
            //     .then(function(response) {
            //         return response.json();
            //     }).then(function(data) {
            //         console.log(data);
            //         tasks.push(task);
            //         renderList();
            //         showNotification('Task added successfully');
            //     })
            //     .catch(function(error) {
            //         console.log('error', error);
            //     })
            tasks.push(task);
            renderList();
            showNotification('Task added successfully');
            return;
        }
        showNotification('Task can not be added');
    }

    function showNotification(text) {
        alert(text);
    }

    function handleInputKeypress(e) {
        if (e.key == 'Enter') {
            const text = e.target.value;

            if (!text) {
                showNotification('Task text cannot be empty');
            }

            const task = {
                title: text,
                id: Date.now(),
                completed: false
            }

            e.target.value = '';
            addTask(task);
        }
    }

    function handleClickListener(e) {
        const target = e.target

        if (target.className == 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        } else if (target.className == 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }

    function initializeApp() {
        // fetchTodos();
        addTaskInput.addEventListener('keyup', handleInputKeypress);
        document.addEventListener('click', handleClickListener);
    }

    initializeApp();
})()