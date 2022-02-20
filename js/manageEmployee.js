var data = [{
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

var nextId = 10006;


function updateEmployees() {
    var rows = "";

    var css_class = "dim-background";
    var css_class2 = "dim-background2";
    var cls = "";
    var counter = 0;

    $.each(data, function(key, value) {
        if (counter % 2 == 0) {
            cls = css_class;
        } else {
            cls = css_class2;
        }
        counter++;
        rows += "<tr class='" + cls + "'>";
        rows += "<td>" + value.id + "</td>";
        rows += "<td>" + value.firstName + "</td>";
        rows += "<td>" + value.lastName + "</td>";
        rows += "<td>" + "<button class='delete-button' onclick='removeEmployee(" + value.id + "); updateEmployees();'>Cancella</button>" + "</td>";
        rows += "</tr>";
        cls = "";
    });
    $("#to-fill").html(rows);
}

function removeEmployee(id) {
    let i = 0;
    $.each(data, function(key, value) {
        if (value.id == id) {
            data.splice(i, 1);
        }
        i++;
    })
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

$(window).on("load", function() {
    updateEmployees();
})

function emptyModalInputs() {
    $("#name").val("");
    $("#lastname").val("");
    $("#birthday").val("");
    $("#hiring-date").val("");
}