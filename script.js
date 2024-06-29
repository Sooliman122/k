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
    <div class="card shadow my-5 ">
      <div class="card-header d-flex justify-content-between">
      <div>
          <img width="40px" class="rounded-circle border border-2" src=${
            post.author.profile_image
          } alt="">
          <b>@${post.author.username}</b>
      </div >
${
  post.author.id === JSON.parse(localStorage.getItem("username")).id
    ? `        <div >
        <button id="${post.id}" name="delete-post" class="float-end  shadow my-3 border text-center align-items-center rounded-circle "><i class="bi bi-trash"></i></button></div>`
    : ""
}

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
// document.getElementById("")
// function deletePost() {

// }
/**
 * The function `closeModel` listens for a click event on an element and hides a Bootstrap modal when
 * triggered.
 * @param el - The `el` parameter in the `closeModel` function is the ID of the element that triggers
 * the closing of the modal when clicked.
 * @param moHide - The `moHide` parameter in the `closeModel` function is the ID of the modal element
 * that you want to hide when the element with ID `el` is clicked.
 */

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
// setups
// function setupsUI() {
//   let loginDiv = document.getElementById("login-div");
//   let logoutDiv = document.getElementById("logout-div");
//   if (localStorage.getItem("token") == null) {
//     logoutDiv.style.setProperty("display", "none", "important");
//     loginDiv.style.setProperty("display", "flex", "important");
//     document.getElementById("add").style.display = "none";
//   } else {
//     document.getElementById("add").style.display = "block";
//     logoutDiv.style.setProperty("display", "flex", "important");
//     loginDiv.style.setProperty("display", "none", "important");
//     let user = getCurrentUser();
//     document.getElementById("user-name").innerHTML = `@${user.username}`;
//     document.getElementById("user-img").src = user.profile_image;
//   }
// }
// function getCurrentUser() {
//   let user = null;
//   if (localStorage.getItem("username") != null) {
//     user = JSON.parse(localStorage.getItem("username"));
//   }
//   return user;
// }
let buttonDelete = document.getElementsByName("delete-post");

buttonDelete.forEach((element) => {
  console.log(element);
  element.addEventListener("click", function (e) {
    console.log(this.className); // logs the className of my_element
    console.log(e.currentTarget === this); // logs `true`
  });
});
