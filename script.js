

setupsUI();
function refresh() {
  axios
    .get(`${baseUrl}posts?page=931`)
    .then(function (response) {
      let posts = response.data.data;
      console.log(posts);
      document.getElementById("posts").innerHTML = "";
      for (let post of posts) {
        let content = `
    <div  class="card shadow my-5 ">
      <div class="card-header d-flex justify-content-between">
        <div>
          <img width="40px" class=" m-4 rounded-circle border border-2" src=${
            post.author.profile_image
          } alt="">
          <b>@${post.author.username}</b>
        </div >
        ${
          post.author.id === JSON.parse(localStorage.getItem("username")).id
            ? `        <div >
        <button id="${post.id}" onclick="btnDelete(${post.id})"  name="delete-post" class="float-end  shadow my-3 border text-center align-items-center rounded-circle "><i class="bi bi-trash"></i></button></div>`
            : ""
        }

      </div>
      <div class="card-body" onclick="postClicked(${post.id})">
        <img src=${
          post.image
            ? post.image
            : "https://images.tarmeezacademy.com/posts/Gm0PlKAlhZYLwD4.jpg"
        } class="w-100 " height="400px" alt="">
        <h6 style="color: #9d9ca0;">${post.created_at}</h6>
        <h2>${post.title != null ? post.title : ""}</h2>
        <p>${post.body}</p>
        <hr>
        <div>
        <i class="bi bi-pencil"></i> 
        <span>${post.comments_count}</span> 
        command
      </div>
    </div >


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


function postClicked(postId) {
  window.location = `postDetails.html?postId=${postId}`

}
// function btnDelete(postId) {
//   let token = localStorage.getItem("token")
//   let headers = {
    
//   }

  
//    axios.delete(`${baseUrl}posts/${postId}`).then((response) => {
//      console.log(response.data);
//    });
// }
function btnDelete(postId) {
  let token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  axios
    .delete(`${baseUrl}posts/${postId}`, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data);
      refresh()
    })
    .catch((error) => {
      showAlert("hhhhhhhhhh")
    });
}
