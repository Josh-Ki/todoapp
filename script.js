
var array = [];
var key = "a1fd35-e5beef-3926ef-2138b5-62742e";
var taskList = document.getElementById("taskList");
var allText = [];
var allObjects;
var texts = [];
var ids = [];
var currentName;
var currentID;
var editB = document.getElementsByClassName("editB")[0];
var cancelB = document.getElementsByClassName("cancelB")[0];
var completeB = document.getElementsByClassName("completeB")[0];
var doneB = document.getElementById("done");
var editor = document.getElementById("editor");
var clickedTask = document.getElementById("placeholder");

var currTask = document.getElementById("placeholder");
allData();
function allData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var allObjects = JSON.parse(this.responseText);
            for (const objects in allObjects) {
                texts.push(allObjects[objects].text)
                ids.push(allObjects[objects].id)   
            }

            forHelper(allObjects);
        }
    }
    
    

    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", key);
    xhttp.send();
}


function forHelper(allObjects) {

    for (var x = allObjects.length-1; x > -1; x--) {
        var temp = document.createElement("div");
        var tempText = document.createTextNode(allObjects[x].text);
        temp.appendChild(tempText);
        temp.id = allObjects[x].id;
        temp.className = "taskObject";
        temp.addEventListener("click", (event) =>{
            currentID = event.target.id;
            clickedTask.backgroundColor = 'lavender';
            event.target.style.backgroundColor = 'pink';
            currentName = event.target.innerHTML;
            clickedTask = event.target;
            event.target.appendChild(editB);
            event.target.appendChild(cancelB);
            event.target.appendChild(completeB);


        });
        taskList.appendChild(temp);
        taskList.insertBefore(temp, currTask);
    }
}

function add() {

    var dataRaw = document.getElementById("input").value;
    var data = {
        text: dataRaw
    }

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var todo = JSON.parse(this.responseText);
            newTask.id = todo.id;

        }
    }

    xhttp.open("POST", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", key);
    xhttp.send(JSON.stringify(data));
    var newTask = document.createElement("div");
    var text = document.createTextNode(dataRaw);
    newTask.appendChild(text);

    newTask.className = "taskObject";

    
    newTask.addEventListener("click", (event) => {
        currentID = event.target.id;
        clickedTask.backgroundColor = 'lavender';
        event.target.style.backgroundColor = 'pink';
        currentName = event.target.innerHTML;
        clickedTask = event.target;
        event.target.appendChild(editB);
        event.target.appendChild(cancelB);
        event.target.appendChild(completeB);


    });

    taskList.appendChild(newTask);
    taskList.insertBefore(newTask, currTask);
    document.getElementById("input").value = "";
}



function deleteB() {
    xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://cse204.work/todos/" + currentID, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", key);
    xhttp.send();
    if(clickedTask != document.getElementById("placeholder")){
        currTask.appendChild(editB);
        currTask.appendChild(cancelB);
        currTask.appendChild(completeB);
        currTask.appendChild(doneB);
        currTask.appendChild(editor);


        clickedTask.remove();
    }

}

function edit() {   
    editor.value = clickedTask.text;

    currTask.appendChild(editB);
    currTask.appendChild(cancelB);
    currTask.appendChild(completeB);
    clickedTask.removeChild(editB);
    clickedTask.removeChild(cancelB);
    clickedTask.removeChild(completeB);


    clickedTask.appendChild(doneB);
    clickedTask.appendChild(editor);
    currTask.removeChild(doneB);
    currTask.removeChild(editor);

}

function done(){

    clickedTask.appendChild(editB);
    clickedTask.appendChild(cancelB);
    clickedTask.appendChild(completeB);
    currTask.appendChild(doneB);
    currTask.appendChild(editor);
    
    clickedTask.text = editor.value;

    var newText = editor;

    var data = {
        text: newText
    }

    xhttp = new XMLHttpRequest();

    currentID = clickedTask.id;
    xhttp.open("PUT", "https://cse204.work/todos/" + currentID, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", key);
    xhttp.send(JSON.stringify(data));

}

function complete() {
    var data = {
        "completed": true
    }
    xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://cse204.work/todos/" + currentID, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", key);
    xhttp.send(JSON.stringify(data));
}