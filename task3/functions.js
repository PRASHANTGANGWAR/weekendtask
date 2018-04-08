$(function () {
  var operation = "C"; 
  var selected_index = -1; 
  var tblPersons = localStorage.getItem("tblPersons"); 
  tblPersons = JSON.parse(tblPersons); 
  if (tblPersons === null) 
      tblPersons = [];

  function Create() {
  
    var person = JSON.stringify({
      task: $("#task").val(),
      datePicker: $("#datePicker").val(),
      assignedto: $("#assignedto").val(),
      status: $("#status").val()
    }); 

    tblPersons.push(person);
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    return true;
  }

  function Edit() {
    tblPersons[selected_index] = JSON.stringify({
          task: $("#task").val(),
      datePicker: $("#datePicker").val(),
      assignedto: $("#assignedto").val(),
      status: $("#status").val()
    });
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Los datos han sido editados"); 
    return true;
  }

  function Delete() {
    tblPersons.splice(selected_index, 1); 
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Persona Eliminada"); 
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>TASK</th>" +
            "<th>DATE</th>" +
            "<th>ASSIGNED TO</th>" +
            "<th>STATUS</th>" +
            "<th>ACTION</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); 
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.task + "</td>" +
                "<td>" + per.datePicker + "</td>" +
                "<td>" + per.assignedto + "</td>" +
                "<td>" + per.status + "</td>" +                    
                "<td><img src='edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } 
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  }); 
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; 
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#task").val(per.task);
    $("#datePicker").val(per.datePicker);
    $("#assignedto").val(per.assignedto);
    $("#status").val(per.status);
  });

  $(".btnDelete").bind("click", function () {
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete();
    List(); 
  });
});

