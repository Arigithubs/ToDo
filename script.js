document.addEventListener('DOMContentLoaded', (event) => {
    // Your JavaScript code here
    // You can use local storage with localStorage.setItem and localStorage.getItem
});

// Save to local storage
localStorage.setItem('myItem', 'itemValue');

// Retrieve from local storage
const itemValue = localStorage.getItem('myItem');

// Remove from local storage
localStorage.removeItem('myItem');
