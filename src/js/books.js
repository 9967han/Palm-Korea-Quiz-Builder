import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

export function createBookEle(title, imgSrc) {
    var bookEle = document.createElement('div')
    var imgEle = document.createElement('img')
    var titleEle = document.createElement('h5')

    bookEle.classList.add("column")

    titleEle.innerText = title

    imgEle.classList.add('thumbnail')
    imgEle.src=imgSrc;
    //이미지 크기 수정코드 필요
    imgEle.addEventListener('click', function(e) {
        var title = encodeURI(encodeURIComponent(titleEle.innerText));
        console.log(title);
        window.location.href="http://localhost:1234/bookInfo.html?title="+title;
    })

    bookEle.appendChild(imgEle)
    bookEle.appendChild(titleEle)
    return bookEle
} 

export function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader(); 
        reader.onload = function (e) { 
            createBook(e.target.result);
            } 
        reader.readAsDataURL(input.files[0]);
    } 
}
export function createBook(imgSrc) {
    var title = prompt("책 제목");
    if (!title) return;

    var container = document.getElementById('book-container');

    container.insertBefore(createBookEle(title, imgSrc), container.childNodes[3]);
}
