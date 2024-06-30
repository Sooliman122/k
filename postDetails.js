const urlParam = new URLSearchParams(window.location.search);
const postId = urlParam.get("postId");
axios.get(`${baseUrl}posts/${postId}`).then((response, data) => {
  response = response.data.data;
  console.log(response);
  let commentContent =''
  for (let comment of response.comments) {
    commentContent += `  <div class="mt-2 card-header bg-body-tertiary shadow rounded  border rounded-3" style="display:flex; flex-direction: column;align-items: flex-start">
           <div class=" mx-2   ">
             <img width="40px" height="40px" class=" rounded-circle border border-2" src="${comment.author.profile_image}" alt="">
             <b>@${comment.author.username}</b>
           </div>
           <div class=" shadow rounded  border rounded-3 py-3 bg-transparent  border border-secondary-subtle w-100 text-start ">
             <h6 class="mx-5">${comment.body}</h6>
           </div>
         </div>`;
  }

  let content = ` 
  <div class="card-header bg-body-tertiary d-flex  justify-content-between">
        <div class=" mx-2  py-3 ">
          <img width="40px"  class=" rounded-circle border border-2" src=${
            response.author.profile_image
          } alt="" >
          <b>@${response.author.username}</b>
        </div >
         ${
           response.author.id ===
           JSON.parse(localStorage.getItem("username")).id
             ? `        <div >
        <button onclick="btnDelete(${response.id})"   name="delete-post" class="float-end  shadow mx-4 my-3 border text-center align-items-center rounded-circle "><i class="bi bi-trash"></i></button></div>`
             : ""
         }
  </div>
      <div class="p-2 card-body text-start">
        <img src=${response.image} class=" w-100 " height="400px" alt="">
        <div class="mx-1 mt-2">
        <h6 style="color: #9d9ca0;">${response.created_at}</h6>
         <h2>${response.title != null ? response.title : ""}</h2>
         <p>${response.body}</p>
         <hr>
       </div>
      <div>
        <i class="bi bi-pencil"></i> 
        <span>${response.comments_count}</span> 
        command
      </div>
    </div >


`;
  document.getElementById("one-post").innerHTML = content;
  document.getElementById("comment").innerHTML = commentContent;
  console.log(response.comments);
  document.getElementsByTagName("h1")[0].innerHTML =
    "@" + response.author.username+`\tPost`;
  // document.getElementById("img-post").src = response.author.profile_image;
  // document.getElementById("body-img").src = response.image;
  // document.getElementById("user-post").innerHTML =
  //   "@" + response.author.username;
  // // console.log(document.getElementById("img-post").src);
});
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
      window.location=`index.html`
    })
    .catch((error) => {
      showAlert("hhhhhhhhhh")
    });
}
