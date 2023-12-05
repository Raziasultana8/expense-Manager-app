

function SignUp() {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;

  if (username === '') {
    document.getElementById("nameerror").innerHTML = "Username cannot be blank"
    return false;
  }
  localStorage.setItem("name", username);
  if (email === '') {
    document.getElementById("mailerror").innerHTML = "Enter Emial Address"
    return false;
  }
  localStorage.setItem("email", email);
  if (password.length < 8) {
    document.getElementById("passerror").innerHTML = "Password must be at least 8 characters";
    return false;
  }
  localStorage.setItem("password", password);
  if (password !== password2) {
    document.getElementById("passerror2").innerHTML = "Passwords do not match";
    return false;
  }
  localStorage.setItem("password2", password)

  window.alert("The Form has been Submitted.");
  window.location.href = "login.html";
  return true;
}
function clearErrorname() {
  document.getElementById("nameerror").innerHTML = "";
}
function clearErrormail() {
  document.getElementById("mailerror").innerHTML = "";
}
function clearErrorpass() {
  document.getElementById("passerror").innerHTML = "";
}
function clearErrorpass2() {
  document.getElementById("passerror2").innerHTML = "";
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  const localEmail = localStorage.getItem("email")
  const localPass = localStorage.getItem("password")
  if (email == localEmail && password == localPass) {
    window.location.href = "dashb.html";
  }
  else {
    alert("Incorrect Email or Password")
  }
}

//expense manager//

let arrData = []
function expenseform() {
  let expense = document.getElementById("expense").value;
  let amount = document.getElementById("amount").value;
  let date = document.getElementById("date").value;
  let description = document.getElementById("description").value;
  arrData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  if (expense !== "" && amount !== "" && !date == "") {
    arrData.push({
      "expense": expense,
      "amount": amount,
      "date": date,
      "description": description,
    });

    localStorage.setItem("data", JSON.stringify(arrData));
    document.getElementById("expense").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
  } else {
    alert("please enter values")
  }
  calculateTotal();
}

//show data in table
function display() {
  let recorddisplay = document.getElementById("exp-table")
  recorddisplay.innerHTML = "";
  const Values = JSON.parse(localStorage.getItem("data"));
  recorddisplay.innerHTML = `<tr>
<th>S.no</th>
<th>Expense</th>
<th>Amount</th>
<th>Date</th>
<th>Description</th>
<th>Action</th>
</tr>`
  for (i = 0; i < Values.length; i++)
    recorddisplay.innerHTML += `<tr>
<td>${i + 1}</td>
<td>${Values[i].expense}</td>
<td>${Values[i].amount}</td>
<td>${Values[i].date}</td>
<td>${Values[i].description}</td>
<td><button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#expenseModal" style="margin-bottom:2px;"onclick="editData(${i})">Update</button>
<button type="button" class="btn btn-danger btn-sm" onclick="deleteRow(${i})">Remove</button>
</td>
</tr>`
  calculateTotal();
}


//edit values in table
function editData(i) {
  const Values = JSON.parse(localStorage.getItem("data"));
  document.getElementById("exp-table").value = i
  document.getElementById("expense").value = Values[i].expense
  document.getElementById("amount").value = Values[i].amount
  document.getElementById("date").value = Values[i].date
  document.getElementById("description").value = Values[i].description
  document.getElementById("add-expense").style.display = "none"
  document.getElementById("edit").style.display = "block"
}

//update values on va;lue
function updateData() {
  let index = document.getElementById("exp-table").value;
  let expense = document.getElementById("expense").value;
  let amount = document.getElementById("amount").value;
  let date = document.getElementById("date").value;
  let description = document.getElementById("description").value;
  let obj = {
    "expense": expense,
    "amount": amount,
    "date": date,
    "description": description,
  }
  let Values = JSON.parse(localStorage.getItem("data"));
  Values[index] = obj;
  localStorage.setItem("data", JSON.stringify(Values))

  display();
  calculateTotal();
}
//serch event
function searchEvent() {
  let event = document.getElementById("search").value
  console.log(event)
  let Values = JSON.parse(localStorage.getItem("data"));
  console.log("table", value)
  let tr = document.getElementsByTagName("tr")
  console.log(tr)
}

//del row from table
function deleteRow(i) {
  let names = JSON.parse(localStorage.getItem("data"));
  names.splice(i, 1);
  localStorage.setItem("data", JSON.stringify(names))
  display();
}
//del file//
function deleteFile(i) {
  let names = JSON.parse(localStorage.setItem("files", JSON.stringify(names)))
  showFiles();
}

function calculateTotal() {
  let totalAmount = 0;
  const values = JSON.parse(localStorage.getItem("data"));

  if (values) {
    for (let i = 0; i < values.length; i++) {
      totalAmount += parseFloat(values[i].amount);
    }
  }
  document.getElementById("total-amount").textContent = totalAmount;
}




