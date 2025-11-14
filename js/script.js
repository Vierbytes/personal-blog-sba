// Array to hold all blog posts
let posts = []

// Variable to track if we're editing or del;eting by storing post ID
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

    // Build the HTML structure for poost card
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

function escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

/**
 * Handle form submission (for both create and edit)
 */
function handleFormSubmit(e) {
    // Prevent default form submission
    e.preventDefault()

    // Validate the form
    if (!validateForm()) {
        return
    }

    // Get trimmed values
    const title = postTitleInput.value.trim()
    const content = postContentInput.value.trim()

    if (editingPostId) {
        // Edit Mode: Update existing post
        const postIndex = posts.findIndex(post => post.id === editingPostId)
        if (postIndex !== -1) {
            posts[postIndex].title = title
            posts[postIndex].content = content
            posts[postIndex].timestamp = getCurrentTimestamp() + ' (edited)'
        }
    } else {
        // Create Mode: Add new post
        const newPost = {
            id: generateUniqueId(),
            title: title,
            content: content,
            timestamp: getCurrentTimestamp()
        }
        posts.unshift(newPost) // Add to beginning of array
    }

    // Save to localStorage
    saveToLocalStorage()

    // Re-render posts
    renderPosts()

    // Reset form
    resetFormToCreateMode()
}

/**
 * Handle delete button click using event delegation
 */
function handleDelete(e) {
    // Check if delete button was clicked
    if (e.target.classList.contains('delete-btn')) {
        // Get the post ID
        const postId = e.target.getAttribute('data-id')
        // Confirm deletion
        if (confirm('Are you sure you want to delete this post?')) {
            // Remove post from array
            posts = posts.filter(post => post.id !== postId)
            // Save to localStorage
            saveToLocalStorage()
            // Re-render posts
            renderPosts()
            // If we were editing this post, reset form
            if (editingPostId === postId) {
                resetFormToCreateMode()
            }
        }
    }
}

/**
 * Handle edit button click using event delegation
 */
function handleEdit(e) {
    // Check if edit button was clicked
    if (e.target.classList.contains('edit-btn')) {
        // Get the post ID
        const postId = e.target.getAttribute('data-id')

        // Find the post
        const post = posts.find(p => p.id === postId)

        if (post) {
            // Populate form with post data
            postTitleInput.value = post.title
            postContentInput.value = post.content

            // Switch to edit mode
            editingPostId = postId
            formTitle.textContent = 'Edit Post'
            submitBtn.textContent = 'Update Post'
            cancelBtn.style.display = 'inline-block'

            // Scroll to form
            postForm.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }
}

/**
 * Handle cancel button click
 */
function handleCancel() {
    resetFormToCreateMode()
}

/**
 * Initialize the application
 */
function init() {
    // Load posts from localStorage
    loadFromLocalStorage()

    // Renders posts
    renderPosts()

    // Add event listeners
    postForm.addEventListener('submit', handleFormSubmit)
    postsContainer.addEventListener('click', handleDelete)
    postsContainer.addEventListener('click', handleEdit)
    cancelBtn.addEventListener('click', handleCancel)
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init)