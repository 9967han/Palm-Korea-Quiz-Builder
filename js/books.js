function createBookEle(title) {
    var bookEle = document.createElement('div')
    var imgEle = document.createElement('img')
    var titleEle = document.createElement('h5')

    bookEle.classList.add("column")

    imgEle.classList.add('thumbnail')
    imgEle.src = "https://placehold.it/550x550"

    titleEle.innerText = title

    bookEle.appendChild(imgEle)
    bookEle.appendChild(titleEle)
    return bookEle
}

function createBook() {
    var title = prompt("책 제목");
    if (!title) return;
    var container = document.getElementById('book-container');

    container.insertBefore(createBookEle(title), container.childNodes[2]);
}