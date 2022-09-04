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
  const packageClasses = ["row", "px-2", "grid", "gap-3"];
  pckage.setAttribute("id", "dataBody");
  packageClasses.forEach((e) => {
    pckage.classList.add(e);
  });

  // creating package element
  users.forEach((user) => {
    const pack = document.createElement("div");
    const packClasses = ["card", "g-col-4", "bg-dark", "text-white"];
    pack.style.width = "18rem";
    packClasses.forEach((e) => {
      pack.classList.add(e);
    });

    // pass data into dom
    const { id, first_name, last_name, username } = user;
    pack.innerHTML = `
    <div class="card-body">
        <h5 class="card-title fName">${first_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted lName">${last_name}</h6>
        <p class="card-text uName">${username}</p>
        <a href="#" onclick="editData(${id})"  class="card-link text-warning ed-btn">Edit</a>
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

// edit item
const editData = (_id) => {
  console.log(_id);

  /* 
find in db by ID and send to the form
pass ID to store data function

in the store data function, check if the ID is passed and if it is, find the item by id, edit properties and save to db
*/
};

// button click
document.getElementById("submit").addEventListener("click", storeData);