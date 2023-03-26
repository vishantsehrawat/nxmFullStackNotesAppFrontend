const url = "http://dark-puce-dalmatian-sock.cyclic.app/note/notes";
// const url = "http://localhost:8080/note/notes";
const addnoteurl = "http://dark-puce-dalmatian-sock.cyclic.app/note/addnote";
// const addnoteurl = "http://localhost:8080//note/addnote";

let token = sessionStorage.getItem("token");
console.log("TCL: token", token);

//catching form 
let myContainer = document.getElementById("noteContainer");



fetch(url, {
    method: "GET", // or 'PUT'
    headers: {
        "Content-Type": "application/json",
        'Authorization': token,
    },
})
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
        setTimeout(() => {
            
            displayData(data.data);
        }, 500);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

function displayData(data) {
   const allCards = `
    ${data.map((note) => {
        return noteCard(note);
    }).join(" ")}
    `
    // console.log(allCards);
    myContainer.innerHTML = allCards;
}

function noteCard(note) {
    const mynote =
     `
    <div class="note">
        <p class= "title">Title:${note.title}</p>
        <p class="content">Content:${note.note}</p>
        <p class="category">Category:${note.category}</p>
        <p class="author">Author:${note.author}</p>
        <button id="deleteNote" style=" border: 1px solid red; cursor:pointer;">DELETE</button>
    </div>
    `
    return mynote;
}
//adding a note 
document.getElementById('form').addEventListener('submit', addNote);

		function addNote(event) {
			event.preventDefault();
			const title = document.getElementById('title').value;
			const note = document.getElementById('note').value;
			const category = document.getElementById('category').value;
			const author = document.getElementById('author').value;

			fetch(addnoteurl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
                    'Authorization': token,
				},
				body: JSON.stringify({ title, note, category, author })
			})
			.then(response => response.json())
			.then((data) => {
                console.log(data);
                // displayData(data);
                window.locaation.reload();
            })
			.catch(error => console.error(error));
}

// // deleting a note

setTimeout(() => {
    const deleteButton = document.getElementById("deleteNote");
    deleteButton.addEventListener('click', deleteNote);

function deleteNote(event) {
    console.log("abcd",event);
    // const noteId = event.target.dataset.noteId;
    fetch(`/note/${noteId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })

}

}, 2000);

