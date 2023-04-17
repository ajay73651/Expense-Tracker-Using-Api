var selectedRow = null;
const api_url = "https://crudcrud.com/api/0b367c81838e4431a75991cdbc3c2c01/appointmentData";
function readFormData() {
  var formData = {};
  formData["fullname"] = document.getElementById("fullname").value;
  formData["email"] = document.getElementById("email").value;
  formData["phone"] = document.getElementById("phone").value;
  return formData;
}

function onFormSubmit() {
  var formData = readFormData();
    // Create new record
    axios.post(api_url, formData)
      .then((response) => {
        insertNewRecord(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  resetForm();
}

function insertNewRecord(data) {
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullname;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.email;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.phone;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = `<a data-id="${data._id}" onClick="onEdit(this)">Edit</a> 
                      <a data-id="${data._id}" onClick="onDelete(this)">Delete</a>`;
}


function resetForm() {
  document.getElementById("fullname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  selectedRow = null;
}

axios.get(api_url)
  .then((response) => {
    for (var i = 0; i < response.data.length; i++) {
      insertNewRecord(response.data[i]);
    }
  })
  .catch((err) => {
    console.log(err);
  })

  function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  const id = td.dataset.id;
  document.getElementById("fullname").value = selectedRow.cells[0].innerHTML;
  document.getElementById("email").value = selectedRow.cells[1].innerHTML;
  document.getElementById("phone").value = selectedRow.cells[2].innerHTML;
  document.getElementById("submitBtn").value = "Update"; // add this line to change the submit button text to "Update"
  document.getElementById("submitBtn").setAttribute("onClick", `updateRecord("${id}")`); // add this line to set the onclick function to "updateRecord" with the selected record id
}

function updateRecord(id) {
  var formData = readFormData();
  axios.put(`${api_url}/${id}`, formData)
    .then((response) => {
      selectedRow.cells[0].innerHTML = formData.fullname;
      selectedRow.cells[1].innerHTML = formData.email;
      selectedRow.cells[2].innerHTML = formData.phone;
      document.getElementById("submitBtn").value = "Submit"; // change the submit button text back to "Submit"
      document.getElementById("submitBtn").setAttribute("onClick", "onFormSubmit()"); // set the onclick function back to "onFormSubmit"
      resetForm();
    })
    .catch((error) => {
      console.log(error);
    });
}





function onDelete(td) {
  var row = td.parentElement.parentElement;
  var id = td.getAttribute("data-id");

  axios.delete(`${api_url}/${id}`)
    .then((response) => {
      console.log(response);
      document.getElementById("employeeList").deleteRow(row.rowIndex);
      resetForm();
    })
    .catch((error) => {
      console.log(error);
    });
}

