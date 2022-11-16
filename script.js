


function add(){
    var dataRaw = document.getElementById("input").value
    var data = {
        text: dataRaw
       
    }

    var xhttp = new XMLHttpRequest();
    console.log(data)
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var todo =JSON.parse(this.responseText);
            console.log(todo)
        }
    }

    xhttp.open("POST", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "a1fd35-e5beef-3926ef-2138b5-62742e");
    xhttp.send(JSON.stringify(data));

}