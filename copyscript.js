// // Define base URL for API
// const baseUrl = "https://tarmeezacademy.com/api/v1/";

// // Initialize UI
// setupsUI();

// // Fetch posts from API
//   axios
//     .get(`${baseUrl}posts?limit=50`)
//     .then(function (response) {
//       let posts = response.data.data;
//       console.log(posts);
//       for (let post of posts) {
//         let content = `
//     <div class="card shadow my-5">
//       <div class="card-header">
//         <img width="40px" class="rounded-circle border border-2" src=${post.author.profile_image} alt="">
//         <b>@${post.author.name}</b>
//       </div>
//       <div class="card-body">
//         <img src=${post.image} class="w-100 " height="400px" alt="">
//         <h6 style="color: #9d9ca0;">${post.created_at}</h6>
//         <h2>${post.title}</h2>
//         <p>${post.body}</p>
//         <hr>
//         <div>
//         <i class="bi bi-pencil"></i>
//         <span>(3)</span>
//         command
//       </div>
//     </div>

//     `;
//         document.getElementById("posts").innerHTML += content;
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

// // Close Model Login

// // Close Model Register
// closeModel("register", "register-modal");

// // Add event listener for login button
// document.getElementById("login").addEventListener("click", login);

// // Add event listener for logout button
// document.getElementById("logout").addEventListener("click", logout);

// // Login function
// function login() {
//   let userName = document.getElementById("username").value;
//   let pass = document.getElementById("pass-login").value;

//   // Validate username and password input
//   if (!validateUsernameAndPassword(userName, pass)) {
//     alert("Invalid username or password");
//     return;
//   }

//   const param = {
//     username: userName,
//     password: pass,
//   };

//   axios
//     .post(`${baseUrl}login`, param)
//     .then(function (response) {
//       // Validate token returned by API
//       if (!validateToken(response.data.token)) {
//         alert("Invalid token");
//         return;
//       }

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("username", response.data.user.username);
//       console.log(response.data.user.username);
//       setupsUI();
//       closeModel("login", "login-modal");
//       showAlert("😍تم تسجيل الدخول بنجاح", "success");
//     })
//     .catch(function (error) {
//       // Handle network errors and Axios errors
//       if (error.response && error.response.status === 401) {
//         alert("Invalid username or password");
//       } else {
//         alert("Error logging in. Please try again later.");
//       }
//     });
// }

// // Validate username and password function
// function validateUsernameAndPassword(username, password) {
//   // Implement username and password validation logic here
//   return true; // or false if validation fails
// }

// // Validate token function
// function validateToken(token) {
//   // Implement token validation logic here
//   return true; // or false if validation fails
// }
// // Logout function
// function logout() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("username");
//   showAlert("😊تم تسجيل الخروج بنجاح", "danger");
//   setupsUI();
// }

// // Setup UI function

// function setupsUI() {
//   let loginDiv = document.getElementById("login-div");
//   let logoutDiv = document.getElementById("logout-div");
//   if (localStorage.getItem("token") == null) {
//     logoutDiv.style.setProperty("display", "none", "important");
//     loginDiv.style.setProperty("display", "flex", "important");
//   } else {
//     logoutDiv.style.setProperty("display", "flex", "important");
//     loginDiv.style.setProperty("display", "none", "important");
//   }
// }

let baseUrl = "https://tarmeezacademy.com/api/v1/";
setupsUI();
axios
  .get(`${baseUrl}posts?limit=50`)
  .then(function (response) {
    let posts = response.data.data;
    console.log(posts);
    for (let post of posts) {
      let content = `
    <div class="card shadow my-5">
      <div class="card-header">
        <img width="40px" class="rounded-circle border border-2" src=${post.author.profile_image} alt="">
        <b>@${post.author.name}</b>
      </div>
      <div class="card-body">
        <img src=${post.image} class="w-100 " height="400px" alt="">
        <h6 style="color: #9d9ca0;">${post.created_at}</h6>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <hr>
        <div>
        <i class="bi bi-pencil"></i> 
        <span>(3)</span> 
        command
      </div>
    </div>


    `;
      document.getElementById("posts").innerHTML += content;
    }
  })
  .catch(function (error) {
    console.log(error);
  });

// Close Model Login

// Close Model Register
// closeModel("register", "register-modal");

/**
 * The function `closeModel` listens for a click event on an element and hides a Bootstrap modal when
 * triggered.
 * @param el - The `el` parameter in the `closeModel` function is the ID of the element that triggers
 * the closing of the modal when clicked.
 * @param moHide - The `moHide` parameter in the `closeModel` function is the ID of the modal element
 * that you want to hide when the element with ID `el` is clicked.
 */

const alertPlaceholder = document.getElementById("alert");
const showAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `<div id=alertS class="alert alert-${type} alert-dismissible" role="alert">
      <div>${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  alertPlaceholder.append(wrapper);
  setTimeout(() => {
    document.getElementById("alertS").remove();
  }, 2000);
};
// Login
document.getElementById("login").addEventListener("click", login);
document.getElementById("logout").addEventListener("click", logout);
// Close Model Login

function login() {
  let userName = document.getElementById("username").value;
  let pass = document.getElementById("pass-login").value;

  // Validate username and password input
  if (!validateUsernameAndPassword(userName, pass)) {
    alert("Invalid username or password");
    return;
  }

  const param = {
    username: userName,
    password: pass,
  };

  axios
    .post(`${baseUrl}login`, param)
    .then(function (response) {
      // Validate token returned by API
      if (!validateToken(response.data.token)) {
        alert("Invalid token");
        return;
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.username);
      closeModel("login", "login-modal");
      setupsUI();
      showAlert("😍تم تسجيل الدخول بنجاح", "success");
    })

    .catch(function (error) {
      // Handle network errors and Axios errors
      if (error.response === 401) {
        alert("Invalid username or password");
      } else {
        alert("Error logging in. Please try again later.");
      }
    });
}

function validateUsernameAndPassword(username, password) {
  // Implement username and password validation logic here
  return true; // or false if validation fails
}

function validateToken(token) {
  // Implement token validation logic here
  return true; // or false if validation fails
}
function closeModel(el, moHide) {
  let loginClick = document.getElementById(el);
  loginClick.addEventListener("click", () => {
    let model = document.getElementById(moHide);
    let myModal = bootstrap.Modal.getInstance(model);
    myModal.hide();
  });
}
// = Login End =//

// Logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  setupsUI();
  // showAlert("😊تم تسجيل الخروج بنجاح", "danger");
}

//= Logout End =//

// اظهار|اخفاء تسجيل الدخول|الخروج

function setupsUI() {
  let loginDiv = document.getElementById("login-div");
  let logoutDiv = document.getElementById("logout-div");
  if (localStorage.getItem("token") == null) {
    logoutDiv.style.setProperty("display", "none", "important");
    loginDiv.style.setProperty("display", "flex", "important");
  } else {
    logoutDiv.style.setProperty("display", "flex", "important");
    loginDiv.style.setProperty("display", "none", "important");
  }
}
