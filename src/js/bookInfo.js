
$(document).ready(function () {
    var val = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );
    title = decodeURI(decodeURIComponent(val));
    console.log("title: ", title);
    document.getElementById("book-title").innerText = title;
});

