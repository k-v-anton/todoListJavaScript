let listTextElements = []
let countComplitedPost = 0

const myFormElement = document.forms.myPost
const addButtonElement = $('#addPost')
const deleteLastElement = $('#deleteLastPost')
const deleteAllButtonElement = $('#deleteAllPosts')
const boxPostsElement = $('#posts')
const allPostInfoElement = $('#all-posts-info')
const complitedPostInfoElement = $('#complited-posts-info')
const showAllPostsElement = $('#showAllPosts')
const showComplitePostsElement = $('#showComplitedPosts')
const serchPostsElement = $('#serchPosts')

// -----------------------------------------------------------------------------------

function $(event) {
    return document.querySelector(event)
}

function toogleActiveState(element) {
    element && element.classList && element.classList.toggle('active')
}

function allPosts() {
    allPostInfoElement.textContent = `All: ${listTextElements.length}`
}

function complitedPost() {
    complitedPostInfoElement.textContent = `Complited: ${countComplitedPost}`
}

// Дата на посты
function dateNow() {
    const dateNow = new Date()
    const year = dateNow.getFullYear()
    const month = dateNow.getMonth() < 10 ? `0${dateNow.getMonth()}` : dateNow.getMonth()
    const date = dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : dateNow.getDate()
    const hours = dateNow.getHours() < 10 ? `0${dateNow.getHours()}` : dateNow.getHours()
    const minuts = dateNow.getMinutes() < 10 ? `0${dateNow.getMinutes()}` : dateNow.getMinutes()
    const seconds = dateNow.getSeconds() < 10 ? `0${dateNow.getSeconds()}` : dateNow.getSeconds()

    return `${date}.${month}.${year} <br> ${hours}:${minuts}:${seconds}`
}

// конструктор объекта поста
function PostInfo(postId, text, checkboxId, btnDelId) {
    this.postId = postId
    this.text = text
    this.checkboxId = checkboxId
    this.deletePostId = btnDelId
}

// Создание описания поста
function postInformation(event) {
    event.preventDefault()
    if ($('#textNewPost').value) {
        const text = $('#textNewPost').value
        const postId = `postId${listTextElements.length + 1}`
        const checkboxId = `postCheckboxId${listTextElements.length + 1}`
        const deletePostId = `deletePostId${listTextElements.length + 1}`
    
        listTextElements.push(
            new PostInfo(postId, text, checkboxId, deletePostId)
        )
        renderPost(listTextElements)

        allPosts()
    
        $('#textNewPost').value = ''
    }
}

// рендер поста
function renderPost(list) {
    let element = list.at(list.length - 1)
    boxPostsElement.innerHTML += ` 
    <div class="post" id=${element.postId}>
        <input type="checkbox" id=${element.checkboxId}>
        <label for=${element.checkboxId} class="post-state"></label>
        <p class="text-post">${element.text}</p>
        <div class="container-post-btn">
            <button class="delete-post" id=${element.deletePostId}>
                ✖
            </button>
            <p class="date-create-post">
                ${dateNow()}
            </p>
        </div>
    </div>
    `
}

// удалить все посты
function deleteAllPosts(event) {
    event.preventDefault()
    listTextElements = []
    allPostInfoElement.textContent = `All: 0`
    boxPostsElement.innerHTML = ''
    countComplitedPost = 0
    complitedPost()
}

function deletePost(event) {
    event.preventDefault()
    const post = event.target.closest('.post')
    if (event.target.tagName.toUpperCase() === 'BUTTON' 
        && event.target.classList.contains('delete-post')) {
        post.remove()

        const deletePostIndex = listTextElements.findIndex(x => x.postId === post.id)
        listTextElements.splice(deletePostIndex, 1)
    } else if (event.target.tagName.toUpperCase() === 'LABEL' 
        && event.target.classList.contains('post-state')) {
            toogleActiveState(event.target)
            toogleActiveState(post)

        if(event.target.classList.contains('active')) {
            countComplitedPost++
            complitedPost()
        } else {
            countComplitedPost--
            complitedPost()
        }            
    }
}

// Удалить последний элемент
function deleteLastPost(event) {
    event.preventDefault()
    if (listTextElements.length > 0) {
        const lastEl = listTextElements.pop()
        const lastPost = document.querySelector(`#${lastEl.postId}`)
        lastPost.remove()
        allPosts()
        if (lastPost.classList.contains('active')) {
            countComplitedPost--
            complitedPost()
        }
    }
    
}

function showComplitePosts(event) {
    event.preventDefault()
    for (const key of listTextElements) {
        let a = document.querySelector(`#${key.postId}`)
        if (!a.classList.contains('active')) {
            a.classList.toggle('show')
        }
    }
}

function showAllPosts(event) {
    event.preventDefault()
    for (const key of listTextElements) {
        let a = document.querySelector(`#${key.postId}`)
        a.classList.toggle('show')
    }
}

function serchElements(){
    let val = this.value.trim()
    let elastickItems = document.querySelectorAll('.text-post')
    elastickItems.forEach(el => {
        if (!el.textContent.includes(val)) {
            el.parentElement.classList.add('serchEl')
        } else {
            el.parentElement.classList.remove('serchEl')
        }
    })
    
    
}


// -----------------------------------------------------------------------------------

complitedPostInfoElement.textContent = `Complited: 0`
allPostInfoElement.textContent = `All: 0`

addButtonElement.addEventListener('click', postInformation)
deleteAllButtonElement.addEventListener('click', deleteAllPosts)
boxPostsElement.addEventListener('click', deletePost)
deleteLastElement.addEventListener('click', deleteLastPost)
showAllPostsElement.addEventListener('click', showAllPosts)
showComplitePostsElement.addEventListener('click', showComplitePosts)
serchPostsElement.addEventListener('input', serchElements)