// Selecting ELMENT FROM DOM
const bookForm = document.querySelector('#book-form');
const title = document.querySelector('#booktiltle');
const author = document.querySelector('#author');
const year = document.querySelector('#year');
const bookList = document.querySelector('#book-list');
const removeBtn = document.querySelector('#removebtn');
const alertBox = document.querySelector('#alertbox');



document.addEventListener('DOMContentLoaded', function () {
    let booklist;
    if (localStorage.getItem('booknames')) {
        booklist = JSON.parse(localStorage.getItem('booknames'));
    } else {
        booklist = [];
    }
    let getingStoreData = '';
    booklist.forEach(element => {
        getingStoreData += makingElemnt(element);
    });
    bookList.innerHTML = getingStoreData;
})

bookForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (title.value == '' || author.value == '' || year.value == '') {
        let alertDanger = document.createElement('h2');
        alertDanger.innerHTML = 'Please Enter All Data'
        alertBox.appendChild(alertDanger)
        setTimeout(function () {
            alertBox.removeChild(alertDanger)
        }, 3000)
    } else {
        const bookData = {
            bookTitle: title.value,
            bookAuthor: author.value,
            bookYear: year.value,
        }
        const gettingElemnt = makingElemnt(bookData)
        saveDataTOStorage(bookData)
        bookList.innerHTML += gettingElemnt;
        title.value = '';
        author.value = '';
        year.value = '';

        let alertSuccess = document.createElement('h2');
        alertSuccess.innerHTML = 'Data Added To list'
        alertSuccess.setAttribute('class', 'alertsuccess')
        alertBox.appendChild(alertSuccess)
        setTimeout(function () {
            alertBox.removeChild(alertSuccess)
        }, 3000)
    }


})

function makingElemnt({ bookTitle, bookAuthor, bookYear }) {
    const content = `
    <tr>
        <td>${bookTitle}</td>
        <td>${bookAuthor}</td>
        <td>${bookYear}</td>
    </tr>`;

    return content;
}


//Save data to storage

function saveDataTOStorage(booksData) {
    let booklist;
    if (localStorage.getItem('booknames')) {
        booklist = JSON.parse(localStorage.getItem('booknames'));
    } else {
        booklist = [];
    }
    booklist.push(booksData);
    localStorage.setItem('booknames', JSON.stringify(booklist));
}

// Remove all data

removeBtn.addEventListener('click', function () {
    localStorage.clear();
    bookList.innerHTML = '';
})

