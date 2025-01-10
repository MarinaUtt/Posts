const BASE_URL = 'https://cadfbca8bd9c0cffeabf.free.beeceptor.com/api/posts/';
const responsePromise = fetch(BASE_URL);

const editForm = document.forms.editForm;
const titleInput = document.querySelector('.title-input');
const descriptionInput = document.querySelector('.description-input');
const postContainer = document.querySelector('.posts');
let postId= '';

editForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if(!!postId){
    editPost(postId,titleInput.value, descriptionInput.value).then(() => renderPosts());
    postId = '';
  } else{
  createPost(titleInput.value, descriptionInput.value).then(() => renderPosts());
  }
  titleInput.value = '';
  descriptionInput.value = '';
})

renderPosts();

async function createPost (title, description) {
  const post = {
    title,
    description
  }

  return fetch(BASE_URL, {
    method:"POST",
    body: JSON.stringify(post) 
  })
}

async function renderPosts() {
  postContainer.textContent = '';
  const response = await fetch(BASE_URL);
  const posts = await response.json();
 
  posts.forEach(post => {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title
    postCard.append(postTitle);

    const postDescription = document.createElement('p');
    postDescription.textContent = post.description;
    postCard.append(postDescription);

    const buttonDelete = document.createElement('button');
    buttonDelete.textContent = 'Удалить';
    postCard.append(buttonDelete);

    buttonDelete.addEventListener('click', () =>{
      deletePost(post.id).then(() => renderPosts());
    })

    postCard.addEventListener('click', (e) => {
      if(e.target.tagName !== 'BUTTON'){
      postId = post.id;
      titleInput.value = post.title;
      descriptionInput.value = post.description;
      }
    })
  
    postContainer.append(postCard);
  });
}

async function editPost(id, title, description) {
  const post = {
    title,
    description
  }
  return fetch(`${BASE_URL}${id}`,{
    method: 'Put',
    body: JSON.stringify(post)
  })
}

async function deletePost(id) {
  const post = {
    title,
    description
  }
  return fetch(`${BASE_URL}${id}`,{
    method: 'DELETE',
  })
}