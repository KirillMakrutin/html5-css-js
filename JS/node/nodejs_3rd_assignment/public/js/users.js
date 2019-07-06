const addUserBtn = document.querySelector("#addUserBtn");
const nextUserInput = document.querySelector("#nextUser");
const usersContainer = document.querySelector("#usersContainer");

addUserBtn.addEventListener("click", () => {
  const nextUserElement = document.createElement("li");
  nextUserElement.innerText = nextUserInput.value;
  usersContainer.appendChild(nextUserElement);
  nextUserInput.value = "";
});
