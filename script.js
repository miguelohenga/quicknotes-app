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
    notesList.innerHTML = "";
    const searchTerm = searchInput.value.trim().toLowerCase();
    const visibleNotes = notes.filter(function (note) {
        return note.text.toLowerCase().includes(searchTerm);
    });

    if (visibleNotes.length === 0 && searchTerm !== "") {
        const noMatch = document.createElement("li");
        noMatch.textContent = "No notes match your search.";
        noMatch.classList.add("no-match");
        notesList.appendChild(noMatch);
        updateCount();
        return;
    }

    visibleNotes.forEach(function (note) {
        const li = document.createElement("li");
        li.classList.add("category-" + note.category);

        const textSpan = document.createElement("span");
        textSpan.textContent = note.text;

        const categoryLabel = document.createElement("small");
        categoryLabel.textContent = note.category;

        const dateSpan = document.createElement("small");
        dateSpan.textContent = note.createdAt;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            deleteNote(note.id);
        });

        li.appendChild(textSpan);
        li.appendChild(categoryLabel);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);

        notesList.appendChild(li);
    });

    updateCount();
}

// ===== 4. Delete Note Function =====
function deleteNote(id) {
    notes = notes.filter(function (note) {
        return note.id !== id;
    });
    saveNotes();
    render();
}

// ===== 5. Update Count Function =====
function updateCount() {
    const total = notes.length;
    if (total === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (total === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = "You have " + total + " notes.";
    }
}

// ===== 6. Save and Load Functions =====
function saveNotes() {
    localStorage.setItem("quicknotes-notes", JSON.stringify(notes));
}

function loadNotes() {
    const saved = localStorage.getItem("quicknotes-notes");
    if (saved) {
        notes = JSON.parse(saved);
    } else {
        notes = [];
    }
}

// ===== 7. Form Submit Handler =====
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = noteInput.value.trim();
    const category = noteCategory.value;
    errorMessage.textContent = "";

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);
    saveNotes();
    noteInput.value = "";
    errorMessage.textContent = "";
    render();
});

// ===== 8. Search and Page Load =====
searchInput.addEventListener("input", function () {
    render();
});

loadNotes();
render();



