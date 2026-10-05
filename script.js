// ===== 1. Select Elements =====
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

// ===== 2. Notes Array =====
let notes = [];

// ===== 3. Render Function =====
function render() {
    // Clear the list
    notesList.innerHTML = "";

    // Loop through notes and create a card for each
    notes.forEach(function (note) {
        const li = document.createElement("li");
        li.classList.add("category-" + note.category);

        // Note text
        const textSpan = document.createElement("span");
        textSpan.textContent = note.text;

        // Category label
        const categoryLabel = document.createElement("small");
        categoryLabel.textContent = note.category;

        // Date
        const dateSpan = document.createElement("small");
        dateSpan.textContent = note.createdAt;

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        // Add all elements to the list item
        li.appendChild(textSpan);
        li.appendChild(categoryLabel);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);

        // Add the list item to the list
        notesList.appendChild(li);
    });
}

// ===== 4. Handle Form Submit =====
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value;
    const category = noteCategory.value;

    // Create the note object
    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    // Add to the notes array
    notes.push(note);

    // Clear the input
    noteInput.value = "";

    // Re-render
    render();
});