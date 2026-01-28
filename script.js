let editTableRow = null;
document.addEventListener("DOMContentLoaded", function (e) {
  let nameErrorSelector = document.getElementById("namerror");

  function validatename() {
    let Name = document.getElementById("name").value;
    if (Name === " ") {
      nameErrorSelector.textContent = "name cannot be empty";
      return false;
    } else if (Name.trim().length < 3) {
      nameErrorSelector.textContent = " name mustbe at least 3 characters";
      return false;
    } else {
      nameErrorSelector.textContent = " ";
      return true;
    }
  }
  document.getElementById("name").addEventListener("input", validatename);

  let markErrorSelector = document.getElementById("markerror");

  function validatemark() {
    let Mark = document.getElementById("mark").value;
    if (Mark === " ") {
      markErrorSelector.textContent = " mark cannot be empty";
      return false;
    } else if (Mark > 100) {
      markErrorSelector.textContent = "please enter valid mark";
      return false;
    } else {
      markErrorSelector.textContent = " ";
      return true;
    }
  }
  document.getElementById("mark").addEventListener("input", validatemark);

  function addOrUpdateRow(formData) {
    const table = document.getElementById("dataTable").querySelector("tbody");
    let row;

    if (editTableRow) {
      //update existing row
      row = editTableRow;

      Object.values(formData).forEach((value, index) => {
        row.cells[index].innerText = value;
      });
    } else {
      //add new row
      row = table.insertRow();
      Object.values(formData).forEach((value) => {
        const cell = row.insertCell();
        cell.innerText = value;
      });
      const actionCell = row.insertCell();

      const editBtn = document.createElement("button");
      editBtn.textContent = "edit";
      editBtn.addEventListener("click", function () {
        editTableRow = row;

        const keys = Object.keys(formData);
        keys.forEach((key, index) => {
          document.getElementById(key).value = row.cells[index].innerText;
        });
        document.getElementById("registerBtn").textContent = "update";
      });
      actionCell.appendChild(editBtn);

      actionCell.appendChild(document.createElement("br"));

      const delBtn = document.createElement("button");
      delBtn.textContent = "delete";
      delBtn.addEventListener("click", function () {
        if (confirm("Do you want to delete it?")) {
          table.removeChild(row);
          if (editTableRow === row) {
            editTableRow = null;
            document.getElementById("registerBtn").textContent = "register";
            document.getElementById("form").reset();
          }
          alert("file deleted");
        } else {
          alert("deletion cancelled");
        }
      });
      actionCell.appendChild(delBtn);
    }

    document.getElementById("form").reset();
    document.getElementById("registerBtn").textContent = "register";
    editTableRow = null;
  }
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    let Name = document.getElementById("name").value.trim();
    let Mark = document.getElementById("mark").value;

    let formData = {
      name: Name,
      mark: Mark,
    };
    addOrUpdateRow(formData);
  });
});
