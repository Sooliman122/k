const urlParam = new URLSearchParams(window.location.search);
const postId = urlParam.get("postId");
function getPost() {
  axios.get(`${baseUrl}posts/${postId}`).then((response, data) => {
    response = response.data.data;

    let commentContent = "";
    let boolDelete = false;
    let boolCommit = false;
    // ...
    let deleteBtu = `
            <div>
              <button
                id="${response.id}"
                onclick="btnDelete(${response.id})"
                name="delete-post"
                class="float-end  shadow  border text-center align-items-center rounded-circle ">
              <i class="bi bi-trash"></i>
              </button>
            </div>`;
    let deleteCommit = `
            <div>
              <button
                id="${response.id}"
                name="delete-commit"
                class="float-end  shadow  border text-center align-items-center rounded-circle ">
              <i class="bi bi-trash"></i>
              </button>
            </div>`;
    // إنشاء HTML للتعليقات
    for (let comment of response.comments ? response.comments : []) {
      if (localStorage.getItem("token") != null) {
        if (
          comment.author.id === JSON.parse(localStorage.getItem("username")).id
        ) {
          commentContent += `  <div class="mt-2 card-header bg-body-tertiary shadow rounded  border rounded-3" style="display:flex; flex-direction: column;align-items: flex-start">
             <div class=" mx-2  d-flex ">
               <img width="40px" height="40px" class=" rounded-circle border border-2" src="${comment.author.profile_image}" alt="">
               <b>@${comment.author.username}</b>
               ${comment.id}
               <div id="div-delete">${deleteCommit}</div>
             </div>
             <div class=" shadow rounded  border rounded-3 py-3 bg-transparent  border border-secondary-subtle w-100 text-start ">
               <h6 class="mx-5">${comment.body}</h6>
             </div>
           </div>`;
        } else {
          commentContent += `  <div class="mt-2 card-header bg-body-tertiary shadow rounded  border rounded-3" style="display:flex; flex-direction: column;align-items: flex-start">
             <div class=" mx-2  d-flex ">
               <img width="40px" height="40px" class=" rounded-circle border border-2" src="${comment.author.profile_image}" alt="">
               <b>@${comment.author.username}</b>
               <div id="div-delete"></div>
             </div>
             <div class=" shadow rounded  border rounded-3 py-3 bg-transparent  border border-secondary-subtle w-100 text-start ">
               <h6 class="mx-5">${comment.body}</h6>
             </div>
           </div>`;
        }
      } else {
        commentContent += `  <div class="mt-2 card-header bg-body-tertiary shadow rounded  border rounded-3" style="display:flex; flex-direction: column;align-items: flex-start">
             <div class=" mx-2  d-flex ">
               <img width="40px" height="40px" class=" rounded-circle border border-2" src="${comment.author.profile_image}" alt="">
               <b>@${comment.author.username}</b>
               <div id="div-delete"></div>
             </div>
             <div class=" shadow rounded  border rounded-3 py-3 bg-transparent  border border-secondary-subtle w-100 text-start ">
               <h6 class="mx-5">${comment.body}</h6>
             </div>
           </div>`;
      }
    }
    // إنشاء HTML للتعليقات//
    if (localStorage.getItem("token") != null) {
      boolCommit = true;
      if (
        response.author.id === JSON.parse(localStorage.getItem("username")).id
      ) {
        boolDelete = true;
      }
    }
    // ...

    let content = ` 
  <div class="card-header bg-body-tertiary d-flex  justify-content-between">
        <div class=" mx-2  py-3 ">
          <img width="40px"  class=" rounded-circle border border-2" src=${
            response.author.profile_image
          } alt="" >
          <b>@${response.author.username}</b>
        </div >
  ${boolDelete ? deleteBtu : ""}
  </div>
    <div class="p-2 card-body text-start">
      <img src=${response.image} class=" w-100 " height="400px" alt="">
      <div class="mx-1 mt-2">
        <h6 style="color: #9d9ca0;">${response.created_at}</h6>
        <h2>${response.title != null ? response.title : ""}</h2>
        <p>${response.body}</p>
        <hr>
      </div>
      <div class=" text-center  d-flex justify-content-between">
          ${
            boolCommit
              ? `
          <div style="line-height:3;"   class="d-flex  w-25 flex-row px-2 align-content-center">


          <span class="mx-2 ">(${response.comments_count})</span>
command 

          </div>

             <div class="d-flex p-2 w-100  ">

                  <input onclick="commitBtn(${response.id})" type="submit" class="mx-2 flex-shrink-1 btn btn-light" value="تعليق">

                   <input dir="rtl" type="text" class="w-100 form-control " id="commit" placeholder="انقر للكتابة...   " value="" required="true">
                  
             </div>
`
              : ` <span>(${response.comments_count})</span> 
            command`
          }
       
      </div>
    </div >


`;
    document.getElementById("one-post").innerHTML = content;
    document.getElementById("comment").innerHTML = commentContent;
    console.log(response.comments);
    document.getElementsByTagName("h1")[0].innerHTML =
      "@" + response.author.username + `\tPost`;
  });
}
getPost();

function btnDelete(postId) {
  let token = localStorage.getItem("token");
  if (token) {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    axios
      .delete(`${baseUrl}posts/${postId}`, {
        headers: headers,
      })
      .then((response) => {
        window.location = `index.html`;
      })
      .catch((error) => {
        showAlert("hhhhhhhhhh");
      });
  } else {
    showAlert("you must login first");
  }
}
//
function commitBtn(postId) {
  let commit = document.getElementById("commit").value;

  let token = localStorage.getItem("token");
  if (token) {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    axios
      .post(
        `${baseUrl}posts/${postId}/comments`,
        { body: commit },
        {
          headers: headers,
        }
      )
      .then((response) => {
        getPost();
      })
      .catch((error) => {
        showAlert("hhhhhhhhhh");
      });
  } else {
    showAlert("you must login first");
  }
}
