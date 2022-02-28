/*var data = [{
    "id": 10001,
    "birthDate": "1953-09-01",
    "firstName": "Georgi",
    "lastName": "Facello",
    "gender": "M",
    "hireDate": "1986-06-25",
},
{
    "id": 10002,
    "birthDate": "1964-06-01",
    "firstName": "Bezalel",
    "lastName": "Simmel",
    "gender": "F",
    "hireDate": "1985-11-20",
},
{
    "id": 10003,
    "birthDate": "1959-12-02",
    "firstName": "Parto",
    "lastName": "Bamford",
    "gender": "M",
    "hireDate": "1986-08-27T22:00:00.000+0000",
},
{
    "id": 10004,
    "birthDate": "1954-04-30",
    "firstName": "Chirstian",
    "lastName": "Koblick",
    "gender": "M",
    "hireDate": "1986-11-30",

},
{
    "id": 10005,
    "birthDate": "1955-01-20",
    "firstName": "Kyoichi",
    "lastName": "Maliniak",
    "gender": "M",
    "hireDate": "1989-09-11T22:00:00.000+0000",

}
];
var nextId = 10006;*/


$.ajax ({
    method:"GET",
    url:"http://localhost:8080/employees"
})
.done(function(msg){
    console.log(msg['_embedded']['employees']);
    data = msg['_embedded']['employees'];
    updateEmployees();
})




function updateEmployees() {
    var rows = "";

    var css_class = "dim-background";
    var css_class2 = "dim-background2";
    var cls = "";
    var counter = 0;

    $.each(data, function (key, value) {
        if (counter % 2 == 0) {
            cls = css_class;
        } else {
            cls = css_class2;
        }
        counter++;
        rows += "<tr class='" + cls + "' id='row-" + value.id + "'>";
        rows += "<td>" + value.id + "</td>";
        rows += "<td><span id='name-" + value.id + "'>" + value.firstName + "</span><input type='text' class='display-none' id='input-name-" + value.id + "'  placeholder='" + value.firstName + "'></td>";
        rows += "<td><span id='lastname-" + value.id + "'>" + value.lastName + "</span><input type='text' class='display-none' id='input-lastname-" + value.id + "' placeholder='" + value.lastName + "'></td>";
        rows += "<td> <button class='delete-button' id='" + value.id + "' onclick='removeEmployee(" + value.id + ")'>Cancella</button>"
             + "<button class='change-button' id='change-" + value.id + "' onclick='change(" + value.id + ")'>Modifica</button>"
        "</td>"; 
        rows += "</tr>";
        cls = "";
    });
    $("#to-fill").html(rows);
}

function removeEmployee(id){
    $.each(data, function(key, value){
      if(value.id == id){
        data.splice(key, 1);
        $("#" + id).closest("tr").remove(); 
        return;
      }
    });
  }
  


function addEmployee(name, lastname, birth, hiredate, gender) {

        data.push({
            "id": nextId,
            "birthDate": birth,
            "firstName": name,
            "lastName": lastname,
            "gender": gender,
            "hireDate": hiredate,
        })
    nextId++;
}


function saveModalInputs() {
    addEmployee(
        $("#name").val().trim(),
        $("#lastname").val().trim(),
        $("#birthday").val(),
        $("#hiring-date").val(),
        $("#gender").val()
    );
    updateEmployees();
}

var nextPage= "https://localhost:8080/employees";
function loadNextPage(){
    $.get(nextPage, function(values,status){
        console.log(values._links.next.href);
        nextPage=values._links.next.href;
        data=values._embedded.employees;
        updateEmployees();
    });
}
var data;

$(window).on("load", function () {
    updateEmployees();
})

function emptyModalInputs() {
    $("#name").val("");
    $("#lastname").val("");
    $("#birthday").val("");
    $("#hiring-date").val("");
}

function change(id){
    $("#name-"+id).addClass("display-none");
    $("#input-name-"+id).removeClass("display-none");
  
    $("#lastname-"+id).addClass("display-none");
    $("#input-lastname-"+id).removeClass("display-none");
  
    $("#change-"+id).removeClass("change-button");
    $("#change-"+id).addClass("save-button");
    $("#change-"+id).text("Salva");
    $("#change-"+id).attr("onclick", "save("+id+")");
  }
  
  function save(id){
    //visibilità varie
    $("#name-"+id).removeClass("display-none");
    $("#input-name-"+id).addClass("display-none");
  
    $("#lastname-"+id).removeClass("display-none");
    $("#input-lastname-"+id).addClass("display-none");
  
    $("#change-"+id).removeClass("save-button");
    $("#change-"+id).addClass("change-button");
    $("#change-"+id).text("Cambia");
    $("#change-"+id).attr("onclick", "change("+id+")");
  
    let newName = $("#input-name-"+id).val();
    let newLastname = $("#input-lastname-"+id).val();
    if(newName == ""){
      newName = $("#name-"+id).text();
    }
  
    if(newLastname == ""){
      newLastname = $("#lastname-"+id).text();
    }
  
    $("#name-"+id).text(newName);
    $("#lastname-"+id).text(newLastname);
    changeNames(newName, newLastname, id);
  
    $("#input-name-"+id).attr("placeholder", newName);
    $("#input-lastname-"+id).attr("placeholder", newLastname);
  
    $("#input-name-"+id).val("");
    $("#input-lastname-"+id).val("");
  }
  
  function changeNames(name, lastname, id){
    $.each(data, function(key,value){
      if(value.id == id){
        value.firstName = name;
        value.lastName = lastname;
      }
    });
  }