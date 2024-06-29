let baseUrl = "https://tarmeezacademy.com/api/v1/";
setupsUI();

function refresh() {
  axios
    .get(`${baseUrl}posts?limit=50`)
    .then(function (response) {
      let posts = response.data.data;
      console.log(posts);
      document.getElementById("posts").innerHTML = "";
      for (let post of posts) {
        let content = `
    <div class="card shadow my-5">
      <div class="card-header">
        <img width="40px" class="rounded-circle border border-2" src=${
          post.author.profile_image
        } alt="">
        <b>@${post.author.name}</b>
      </div>
      <div class="card-body">
        <img src=${
          post.image
            ? post.image
            : "https://images.tarmeezacademy.com/posts/Gm0PlKAlhZYLwD4.jpg"
        } class="w-100 " height="400px" alt="">
        <h6 style="color: #9d9ca0;">${post.created_at}</h6>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <hr>
        <div>
        <i class="bi bi-pencil"></i> 
        <span>${post.comments_count}</span> 
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
}
refresh();

/**
 * The function `closeModel` listens for a click event on an element and hides a Bootstrap modal when
 * triggered.
 * @param el - The `el` parameter in the `closeModel` function is the ID of the element that triggers
 * the closing of the modal when clicked.
 * @param moHide - The `moHide` parameter in the `closeModel` function is the ID of the modal element
 * that you want to hide when the element with ID `el` is clicked.
 */

function closeModel(modelHedin) {
  let model = document.getElementById(modelHedin);
  let myModal = bootstrap.Modal.getInstance(model);
  myModal.hide();
}
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
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", JSON.stringify(response.data.user));
      closeModel("register-model");
      setupsUI();
      showAlert("تم تسجيل المستخدم بنجاح");
    })
    .catch((error) => {
      showAlert(error.response.data.message, "danger");
    });
}
//===========END REGISTER=====//

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
      setupsUI();
      closeModel("login-model");
      refresh();
    })
    .catch(function (error) {
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
        showAlert(error.response.data.message, "danger");
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
document.getElementById("logout").addEventListener("click", logout);

// Logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  setupsUI();
  showAlert("😊تم تسجيل الخروج بنجاح", "danger");
}

//= Logout End =//

// اظهار|اخفاء تسجيل الدخول|الخروج

function setupsUI() {
  let loginDiv = document.getElementById("login-div");
  let logoutDiv = document.getElementById("logout-div");
  if (localStorage.getItem("token") == null) {
    logoutDiv.style.setProperty("display", "none", "important");
    loginDiv.style.setProperty("display", "flex", "important");
    document.getElementById("add").style.display = "none";
  } else {
    document.getElementById("add").style.display = "block";
    logoutDiv.style.setProperty("display", "flex", "important");
    loginDiv.style.setProperty("display", "none", "important");
  }
}

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
  }, 2000);
};
// Create New Post
document.getElementById("add-post").addEventListener("click", createNewPost);
async function createNewPost() {
  let title = document.getElementById("title-post").value;
  let body = document.getElementById("text-post").value;
  let image = document.getElementById("image-post").files[0];

  let formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("image", image);

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  axios
    .post(`${baseUrl}posts`, formData, {
      headers: headers,
    })
    .then((response) => {
      showAlert("تمت اضافة المنشور بنجاح");
      closeModel("add-model");
      refresh();
    })
    .catch((error) => {
      showAlert(error.response.data.message, "danger");
      refresh();
    });
}
// END CREATE NEW POST//
