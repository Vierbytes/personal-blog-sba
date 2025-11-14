# 📝 Interactive Personal Blog Platform

A fully functional, client-side blog application built with vanilla JavaScript, HTML5, and CSS3. This project demonstrates modern web development techniques including DOM manipulation, event handling, form validation, and data persistence using localStorage.


## 🎯 Project Overview

This is a personal blog/journal platform that runs entirely in the browser without requiring a backend server or database. Users can create, read, update, and delete blog posts, with all data persisting locally through the browser's localStorage API.

### ✨ Key Features

- **✍️ Create Posts** - Write blog entries with titles and rich content
- **📖 Display Posts** - View all posts in a clean, organized layout
- **✏️ Edit Posts** - Modify existing posts with pre-populated forms
- **🗑️ Delete Posts** - Remove unwanted posts with custom modal confirmation
- **💾 Data Persistence** - All posts automatically saved to localStorage
- **✅ Form Validation** - Client-side validation with custom error messages
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🎨 Modern UI** - Clean interface with smooth animations and transitions

## 🚀 How to Run
### Instructions
- Navigate to `https://vierbytes.github.io/personal-blog-sba/`

**Start Blogging**
   - Fill in the post title and content
   - Click "Add Post" to create your first entry
   - Your data is automatically saved and will persist across browser sessions

---
## 💭 Development Process & Reflection

### Planning Phase
The project began with careful planning of the data structure and user flow. I decided to store posts as an array of objects, with each post containing a unique ID, title, content, and timestamp. This structure made it easy to perform CRUD operations.

### Implementation Approach
I followed a modular development approach, breaking the project into distinct phases:

1. **HTML Structure** - Created the basic layout with semantic elements
2. **CSS Styling** - Applied modern design principles
3. **Core JavaScript** - Implemented basic create and display functionality
4. **Enhanced Features** - Added edit, delete, validation, and persistence
5. **Polish** - Refined animations, error handling, and edge cases

### Challenges Faced & Solutions

#### Challenge 1: Managing Edit State
**Problem:** Initially struggled with tracking which post was being edited and switching between "create" and "edit" modes.

**Solution:** Implemented a global `editingPostId` variable that stores the ID of the post being edited. When null, the form is in "create" mode; when set, it's in "edit" mode. Added a `resetFormToCreateMode()` helper function to centralize the state reset logic.

```javascript
let editingPostId = null;

function resetFormToCreateMode() {
    editingPostId = null;
    formTitle.textContent = 'Create New Post'
    submitBtn.textContent = 'Add Post'
    // ... etc
}
```

#### Challenge 2: Event Delegation for Dynamic Content
**Problem:** Edit and delete buttons were not responding when added dynamically to the DOM.

**Solution:** Used event delegation by attaching listeners to the parent container instead of individual buttons. This ensures that dynamically created elements are automatically covered by the event listener.

```javascript
// Instead of: editBtn.addEventListener('click', ...)
// Use delegation:
postsContainer.addEventListener('click', handleEdit);
postsContainer.addEventListener('click', handleDelete);
```

#### Challenge 5: Custom Delete Confirmation Modal
**Problem:** The browser's default `confirm()` dialog looked outdated and didn't match the application's design.

**Solution:** Built a custom modal component with:
- Backdrop overlay with blur effect
- Smooth fade-in and slide-in animations
- Multiple close methods (button click, cancel, click outside)
- Proper state management to track which post to delete

This improved the user experience and visual consistency.

<p align="center">
Built by Yeroc using
    <img src="img/HTML5.svg" alt="" align="center">
    <img src="img/CSS3-.svg" alt="" align="center">
    <img src="img/JavaScript.svg" alt="" align="center">
</p>