

setupsUI();
let baseUrl = "https://tarmeezacademy.com/api/v1/";
function setupsUI() {
  let loginDiv = document.getElementById("login-div");
  let logoutDiv = document.getElementById("logout-div");
  let addBut = document.getElementById("add");
  if (localStorage.getItem("token") == null) {
    if (addBut != null) {
      addBut.style.display = "none";
    }
    logoutDiv.style.setProperty("display", "none", "important");
    loginDiv.style.setProperty("display", "flex", "important");
  } else {
    if (addBut != null) {
      addBut.style.display = "block";
    }
    logoutDiv.style.setProperty("display", "flex", "important");
    loginDiv.style.setProperty("display", "none", "important");
    let user = getCurrentUser();
    document.getElementById("user-name").innerHTML = `@${user.username}`;
    document.getElementById("user-img").src = user.profile_image;
  }
}
function getCurrentUser() {
  let user = null;
  if (localStorage.getItem("username") != null) {
    user = JSON.parse(localStorage.getItem("username"));
  }
  return user;
}

function closeModel(modelHedin) {
  let model = document.getElementById(modelHedin);
  let myModal = bootstrap.Modal.getInstance(model);
  myModal.hide();
}

// ==========================Autonation=======//
// Login
document.getElementById("login").addEventListener("click", login);

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
      localStorage.setItem("username", JSON.stringify(response.data.user));
      console.log(response.data.user.username);
      
      showAlert("😍تم تسجيل الدخول بنجاح", "success");
      closeModel("login-model");
      setupsUI();

    })
    .catch(function (error) {
      let message = 'error.response.data.message;'
      // Handle network errors and Axios errors
      if (error.response && error.response.status === 401) {
        // Handle network errors and Axios errors
        showAlert(error.response.data.message, "danger");
      } else if (
        error.response.data.message === "The username field is required."
      ) {
        showAlert("حقل اسم المستخدم مطلوب", "danger");
      } else if (
        error.response.data.message === "The password field is required."
      ) {
        showAlert("حقل كلمة السر مطلوب", "danger");
      } else {
        message == "The provided credentials are incorrect."
          ? (message = "كلمة المرور او أسم المستخدم خطا")
          : message;
        message == "The username field is required. (and 1 more error)"
          ? (message = "ادخل اسم المستخدم وكلمة المرور")
          : message;
        message == "The password must be at least 6 characters."
          ? (message = "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
          : message;
        showAlert(message, "danger");
      }
    });
}
// END LOGIN
function validateUsernameAndPassword(username, password) {
  // Implement username and password validation logic here
  return true; // or false if validation fails
}

function validateToken(token) {
  // Implement token validation logic here
  return true; // or false if validation fails
}
//END LOGIN///

// Logout
document.getElementById("logout").addEventListener("click", logout);

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  setupsUI();
  showAlert("😊تم تسجيل الخروج بنجاح", "danger");
}

//= Logout End =//

// اظهار|اخفاء تسجيل الدخول|الخروج

const alertPlaceholder = document.getElementById("alert");
const showAlert = (message, type = "success") => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `<div id=alertS class="alert alert-${type} alert-dismissible" role="alert">
      <div>${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  alertPlaceholder.append(wrapper);
  setTimeout(() => {
    document.getElementById("alertS").remove();
  window.location=window.location

  }, 2000);
};

// register
document.getElementById("register").addEventListener("click", register);
function register() {
  let username = document.getElementById("register-username").value;
  let password = document.getElementById("register-password").value;
  let name = document.getElementById("register-name").value;
  let confirmPassword = document.getElementById(
    "register-confirm-password"
  ).value;
  let image = document.getElementById("register-image").files[0];
  if (password != confirmPassword) {
    showAlert("كلمة المرور غير متطابقة", "danger");
    return;
  }
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("name", name);
  formData.append("image", image);
  let headers = {
    "Content-Type": "multipart/form-data",
  };

  axios
    .post(`${baseUrl}register`, formData, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data.user.profile_image);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", JSON.stringify(response.data.user));
      // closeModel("register-model");
      setupsUI();

      showAlert("تم تسجيل المستخدم بنجاح");
    })
    .catch((error) => {
      showAlert(error.response.data.message, "danger");
      return
    });
}
//===========END REGISTER=====//
