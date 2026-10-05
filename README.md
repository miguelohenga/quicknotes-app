# QuickNotes

A simple note-taking web app that lets you add, delete, and search personal, work, and study notes. Notes are saved in your browser, so they stay even after you close or refresh the page.

## Features

- Add notes with a text input and a category (Personal, Work, or Study)
- Each note shows the text, category, and date created
- Delete individual notes with a Delete button
- Live note count ("You have no notes yet.", "You have 1 note.", "You have N notes.")
- Search box filters notes in real time (case-insensitive)
- Validation: empty notes and notes over 200 characters are rejected
- Notes and categories are colour-coded (teal = personal, dark red = work, blue = study)
- Notes are saved to localStorage and restored on page load

## How to Run Locally

1. Clone the repository:
git clone https://github.com/miguelohenga/quicknotes-app.git
2. Navigate into the folder:
3. Open `index.html` in your browser (double-click the file, or right-click and choose "Open with" your browser).

No build tools or installation required — it's plain HTML, CSS, and JavaScript.

## What I Learned

1. **DOM manipulation with `querySelector`, `createElement`, and `textContent`** — I learned how to build and update the page dynamically without using `innerHTML` for user-generated content (which is safer).

2. **Persisting data with `localStorage`** — I learned how to use `JSON.stringify` and `JSON.parse` to save an array of note objects in the browser so the notes survive a page refresh.

3. **Event listeners and validation** — I learned how to handle form submission with `event.preventDefault()`, validate inputs, and show clear error messages to the user.

4. **Real-time search with `.filter()` and `.includes()`** — I learned how to filter an array of objects based on user input as they type.