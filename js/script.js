// Array to hold all blog posts
let posts = []

// Variable to track if we're editing by storing post ID
let editingPostId = null

// +++++++++++++++++++++
// DOM ELEMENT SELECTION
// +++++++++++++++++++++

// Form elements
const postForm = document.getElementById('post-form')
const postTitleInput = document.getElementById('post-title')
const postContentInput = document.getElementById('post-content')
const submitBtn = document.getElementById('submit-btn')
const cancelBtn = document.getElementById('cancel-btn')
const formTitle = document.getElementById('form-title')

// Error message elements
const titleError = document.getElementById('title-error')
const contentError = document.getElementById('content-error')

// Posts display elements
const postsContainer = document.getElementById('posts-container')
const noPostsMessage = document.getElementById('no-posts-message')


/**
 * Generate a unique ID for each post
 * Uses timestamp + random number for uniqueness
 */
function generateUniqueId() {
    return Date.now() + '-' + Math.random().toString(36).substring(2, 9)
}

/**
 * Get current timestamp in a readable format
 */
function getCurrentTimestamp() {
    const now = new Date()
    return now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

/**
 * Save posts to localStorage
 */
function saveToLocalStorage() {
    localStorage.setItem('blogPosts', JSON.stringify(posts))
}

/**
 * Load posts from localStorage
 */
function loadFromLocalStorage() {
    const storedPosts = localStorage.getItem('blogPosts')
    if (storedPosts) {
        posts = JSON.parse(storedPosts)
    }
}

/**
 * Validate form inputs
 * Returns true if valid, false if invalid
 */
function validateForm() {
    let isValid = true

    // Clear previous error messages
    titleError.textContent = ''
    contentError.textContent = ''

    // Validate title
    const title = postTitleInput.value.trim()
    if (title === '') {
        titleError.textContent = '⚠️ Title is required'
        isValid = false
    }

    // Validate content
    const content = postContentInput.value.trim()
    if (content === '') {
        contentError.textContent = '⚠️ Content is required'
        isValid = false
    }

    return isValid
}

function clearForm() {
    postTitleInput.value = ''
    postContentInput.value = ''
    titleError.textContent = ''
    contentError.textContent = ''
}

function resetFormToCreateMode() {
    editingPostId = null
    formTitle.textContent = 'Create New Post'
    submitBtn.textContent = 'Add Post'
    cancelBtn.style.display = 'none'
    clearForm()
}

function renderPosts() {
    // Clear the container
    postsContainer.innerHTML = ''

    // Show/hide "no posts" message
    if (posts.length === 0) {
        noPostsMessage.style.display = 'block'
        return
    } else {
        noPostsMessage.style.display = 'none'
    }

    // Create HTML for each post
    posts.forEach(post => {
        const postCard = createPostCard(post)
        postsContainer.appendChild(postCard)
    })
}

/**
 * Create a single post card element
 */
function createPostCard(post) {
    // Create main post card div
    const postCard = document.createElement('div')
    postCard.className = 'post-card'
    postCard.setAttribute('data-id', post.id)

    // Build the HTML structure
    postCard.innerHTML = `
        <div class="post-header">
            <h3 class="post-title">${escapeHtml(post.title)}</h3>
            <span class="post-timestamp">${post.timestamp}</span>
        </div>
        <p class="post-content">${escapeHtml(post.content)}</p>
        <div class="post-actions">
            <button class="edit-btn" data-id="${post.id}">✏️ Edit</button>
            <button class="delete-btn" data-id="${post.id}">🗑️ Delete</button>
        </div>
    `

    return postCard
}