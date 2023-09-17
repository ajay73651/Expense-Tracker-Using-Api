var selectedRowId = null; // Store the ID of the selected row

function readFormData() {
  var formData = {};
  formData["fullname"] = document.getElementById("fullname").value;
  formData["email"] = document.getElementById("email").value;
  formData["phone"] = document.getElementById("phone").value;
  return formData;
}

function resetForm() {
  document.getElementById("fullname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("submitBtn").value = "Submit";
  document.getElementById("submitBtn").setAttribute("onClick", "onFormSubmit()");
  selectedRowId = null; // Clear the selectedRowId
}

async function onFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  var formData = readFormData();

  try {
    if (selectedRowId) {
      await updateRecord(selectedRowId, formData);
    } else {
      const response = await axios.post('/api/add-expense', formData);
      insertNewRecord(response.data);
    }
    resetForm();
  } catch (err) {
    console.error(err);
  }
}


async function insertNewRecord(data) {
  var table = document.getElementById("employeeList").getElementsByTagName("tbody")[0];
  
  var existingRow = table.querySelector(`[data-id="${data.id}"]`);
  
  if (existingRow) {
    // Update the existing row
    existingRow.cells[0].innerHTML = data.fullname;
    existingRow.cells[1].innerHTML = data.email;
    existingRow.cells[2].innerHTML = data.phone;
  } else {
    // Insert a new row
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.phone;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a data-id="${data.id}" onClick="onEdit(this)">Edit</a> 
                    <a data-id="${data.id}" onClick="onDelete(this)">Delete</a>`;
  }
}


async function onEdit(td) {
  selectedRowId = td.dataset.id; // Store the ID of the selected row
  selectedRow = td.parentElement.parentElement;
  document.getElementById("fullname").value = selectedRow.cells[0].innerHTML;
  document.getElementById("email").value = selectedRow.cells[1].innerHTML;
  document.getElementById("phone").value = selectedRow.cells[2].innerHTML;
  document.getElementById("submitBtn").value = "Update";
  document.getElementById("submitBtn").setAttribute("onClick", "onFormSubmit()");
}

async function updateRecord(id, formData) {
  try {
    const response = await axios.put(`/api/update-expense/${id}`, formData);
    selectedRow.cells[0].innerHTML = formData.fullname;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.phone;
    document.getElementById("submitBtn").value = "Submit";
    resetForm();
  } catch (error) {
    console.error(error);
  }
}

async function onDelete(td) {
  var row = td.parentElement.parentElement;
  var id = td.dataset.id;
  try {
    const response = await axios.delete(`/api/delete-expense/${id}`);
    console.log(response);
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetForm();
  } catch (error) {
    console.error(error);
  }
}

async function loadData() {
  try {
    const response = await axios.get("/api/get-expenses");
    for (var i = 0; i < response.data.length; i++) {
      await insertNewRecord(response.data[i]);
    }
  } catch (err) {
    console.error(err);
  }
}

loadData(); // Load data when the page loads
