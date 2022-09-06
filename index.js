// get values from form fields
const getValues = function () {
  return {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    userName: document.getElementById("username").value,
  };
};

// get values from form fields
const emptyFields = function () {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("username").value = "";
};

// push values to form fields
const toFormFields = function (fn, ln, un) {
  document.getElementById("firstName").value = fn;
  document.getElementById("lastName").value = ln;
  document.getElementById("username").value = un;
};

let indexTrack; // tracking index of items in db
let idTrack;  // tracking ID of items in db

// switch button
const switchButton = function () {
  const submit = document.getElementById("submit");

  if (submit) {

    const edit = document.createElement("button");
    edit.classList.add("btn", "btn-warning");
    edit.innerHTML = "Update";
    edit.setAttribute("id", "update");

    submit.parentNode.append(edit);
    submit.remove();
  } else {
    const edit = document.getElementById("update");

    const submitBtn = document.createElement("button");
    submitBtn.classList.add("btn", "btn-primary");
    submitBtn.innerHTML = "Submit";
    submitBtn.setAttribute("id", "submit");

    edit.parentNode.append(submitBtn);
    edit.remove();
  }
};

// store data in db
const storeData = () => {
  const { firstName, lastName, userName } = getValues();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({
    id: Math.floor(Math.random() * Date.now()),
    first_name: firstName,
    last_name: lastName,
    username: userName,
  });

  localStorage.setItem("users", JSON.stringify(users));

  displayData();
  emptyFields();
};

// display data
const displayData = () => {
  //   get data from DB
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users == []) return;

  // get dom elements
  const mainContainer = document.getElementById("mainContainer");
  mainContainer.innerHTML = "";

  // creating package element
  const pckage = document.createElement("div");
  pckage.classList.add(
    "row",
    "px-2",
    "grid",
    "gap-3",
    "animate__animated",
    "animate__pulse"
  );

  pckage.setAttribute("id", "dataBody");

  // creating package element
  users.forEach((user) => {
    const pack = document.createElement("div");
    pack.classList.add("card", "g-col-4", "bg-dark", "text-white");
    pack.style.width = "18rem";

    // pass data into dom
    const { id, first_name, last_name, username } = user;
    pack.innerHTML = `
    <div class="card-body">
        <h5 class="card-title fName">${first_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted lName">${last_name}</h6>
        <p class="card-text uName">${username}</p>
        <a href="#" data-id="${id}" onClick="editData(this)" class="card-link text-warning ed-btn">Edit</a>
        <a href="#" onclick="deleteData(${id})" class="card-link text-danger del-btn">Delete</a>
    </div>
    `;
    // append the pack to the package
    pckage.append(pack);
  });

  // append the package to the dom
  mainContainer.append(pckage);
};

// delete item
const deleteData = (_id) => {
  // get data from DB
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users == []) return;

  // search for matching user
  users.forEach((user, index) => {
    const { id } = user;

    if (id === _id) {
      users.splice(index, 1);
    }
  });

  // save back to db
  localStorage.setItem("users", JSON.stringify(users));

  displayData();
};

// edit button on DOM
const editData = (element) => {
  // extract ID
  const _id = parseInt(element.getAttribute("data-id"));

  // pull out database info
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users == []) return;

  // Check for matching data
  users.forEach((user, index) => {
    const { id, first_name, last_name, username } = user;

    if (id === _id) {
      // switch card color
      element.parentNode.parentNode.classList.remove("bg-dark", "text-white");
      element.parentNode.parentNode.classList.add("bg-edit", "text-dark");
      // send data to form fields
      toFormFields(first_name, last_name, username);
      switchButton();
      indexTrack = index;
      idTrack = id
      document.getElementById("update").addEventListener("click", updateData);
    }
  });

  /* 
find in db by ID and send to the form
pass ID to store data function

in the store data function, check if the ID is passed and if it is, find the item by id, edit properties and save to db
*/
};

// update button on DOM
const updateData = () => {
  const { firstName, lastName, userName } = getValues();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  
  // replace item with update
  users.splice(indexTrack, 1, {
    id: idTrack,
    first_name: firstName,
    last_name: lastName,
    username: userName,
  });
  
  localStorage.setItem("users", JSON.stringify(users));

  switchButton();
  displayData();
  emptyFields();
};

// button click
document.getElementById("submit").addEventListener("click", storeData);
