var seletedRow = null;

function onFormSubmit() {
  var formData = readFormData();
  axios.post("https://crudcrud.com/api/bed8b37a92984eb2b286033137f7a4c7/appointmentData", formData)
  .then((response)=>{
    console.log(response.data);
    insertNewRecord(response.data);
  }).catch((err)=>{
    console.log(err);
  })
  resetForm();
}

function readFormData() {
  var formData = {};
  formData["fullname"] = document.getElementById("fullname").value;
  formData["email"] = document.getElementById("email").value;
  formData["phone"] = document.getElementById("phone").value;
  return formData;
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
  cell5 = newRow.insertCell(3);
  cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                    <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
  document.getElementById("fullname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  seletedRow = null;
}

axios.get("https://crudcrud.com/api/bed8b37a92984eb2b286033137f7a4c7/appointmentData")
  .then((response)=>{
    console.log(response.data);
    for (var i = 0; i < response.data.length; i++) {
      insertNewRecord(response.data[i]);
    }
  }).catch((err)=>{
    console.log(err);
  })

function onEdit(td) {
  onDelete(td);
  seletedRow = td.parentElement.parentElement;
  document.getElementById("fullname").value = seletedRow.cells[0].innerHTML;
  document.getElementById("email").value = seletedRow.cells[1].innerHTML;
  document.getElementById("phone").value = seletedRow.cells[2].innerHTML;
  // let formData2 = readFormData();
  // console.log(formData2);
  // localStorage.removeItem(formData2.email, formData2);
}

function onDelete(td) {
  row = td.parentElement.parentElement;
  // localStorage.removeItem(row.cells[1].innerHTML);
  document.getElementById("employeeList").deleteRow(row.rowIndex);
  resetForm();
}
