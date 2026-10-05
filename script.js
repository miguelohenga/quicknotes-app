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
        deleteBtn.addEventListener("click", function () {
            deleteNote(note.id);
        });
        function deleteNote(id) {
            notes = notes.filter(function (note) {
                return note.id !== id;
            });
            render();
        }

        function updateCount() {
            const count = notes.length;

            if(total === 0) {
                noteCount.textContent = "You have no notes yet.";
            } else if(count === 1) {
                noteCount.textContent = "You have 1 note.";
            } else {
                noteCount.textContent = "You have " + total + " notes.";
            }
        }
        
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

    const text = noteInput.value.trim();
    const category = noteCategory.value;
console.log("Text length:", text.length);
    // clear any previos error
    errorMessage.textContent = "";

    // Validate empty or only spaces
    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }
    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    //Creat the note object

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

    //Clear the error(in case there was one)

    // Re-render
    render();
});