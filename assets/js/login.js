const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginMessage = document.getElementById('loginMessage');

// Helper function to get users from localStorage
function getUsers() {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}

// Helper function to save users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Helper function to save logged-in user data to localStorage
function saveLoggedInUser(user) {
  localStorage.setItem('loggedInUser', JSON.stringify(user));
}

// Handle login
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const users = getUsers();

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    saveLoggedInUser(user); // Save logged-in user
    window.location.href = 'travel.html'; // Redirect to welcome page
  } else {
    loginMessage.textContent = 'User not found. Please register.';
    loginMessage.style.color = 'red';
  }
});

// Handle registration
registerForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const newEmail = document.getElementById('newEmail').value;
  const newPassword = document.getElementById('newPassword').value;
  const users = getUsers();

  const userExists = users.some(user => user.email === newEmail);

  if (userExists) {
    loginMessage.textContent = 'User already exists. Please log in.';
    loginMessage.style.color = 'orange';
  } else {
    const newUser = { name: name, email: newEmail, password: newPassword };
    users.push(newUser);
    saveUsers(users);

    saveLoggedInUser(newUser);
    window.location.href = 'index.html'; // Redirect to welcome page after registration
  }
});
