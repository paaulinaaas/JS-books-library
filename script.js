// books array
var books = null;

function InitializeBooks() {

    if (localStorage.getItem("books") == null) {
        localStorage.setItem("books", JSON.stringify(
        [
        {
            "cover": {
            "large": "https://covers.oreillystatic.com/images/9780596517748/lrg.jpg",
            "small": "https://covers.oreillystatic.com/images/9780596517748/cat.gif"
            },
            "title": "JavaScript: The Good Parts",
            "author": "Douglas Crockford",
            "releaseDate": "01/12/2008",
            "pages": 172,
            "link": "http://shop.oreilly.com/product/9780596517748.do"
        },
        {
            "cover": {
            "large": "https://covers.oreillystatic.com/images/9780596000486/lrg.jpg",
            "small": "https://covers.oreillystatic.com/images/9780596000486/cat.gif"
            },
            "title": "JavaScript: The Definitive Guide",
            "author": "David Flanagan",
            "releaseDate": "01/11/2001",
            "pages": 936,
            "link": "http://shop.oreilly.com/product/9780596000486.do"
        },
        {
            "cover": {
            "large": "https://covers.oreillystatic.com/images/0636920025832/lrg.jpg",
            "small": "https://covers.oreillystatic.com/images/0636920025832/cat.gif"
            },
            "title": "Learning JavaScript Design Patterns",
            "author": "Addy Osmani",
            "releaseDate": "01/08/2012",
            "pages": 254,
            "link": "http://shop.oreilly.com/product/0636920025832.do"
        },
        {
            "cover": {
            "large": "https://covers.oreillystatic.com/images/0636920027713/lrg.jpg",
            "small": "https://covers.oreillystatic.com/images/0636920027713/cat.gif"
            },
            "title": "JavaScript Enlightenment",
            "author": "Cody Lindley",
            "releaseDate": "01/12/2012",
            "pages": 166,
            "link": "http://shop.oreilly.com/product/0636920027713.do"
        },
        {
            "cover": {
            "large": "https://covers.oreillystatic.com/images/0636920033141/lrg.jpg",
            "small": "https://covers.oreillystatic.com/images/0636920033141/cat.gif"
            },
            "title": "Programming JavaScript Applications",
            "author": "Eric Elliott",
            "releaseDate": "01/07/2014",
            "pages": 254,
            "link": "http://shop.oreilly.com/product/0636920033141.do"
        },
        {
            "cover": {
            "large": "https://covers.oreillystatic.com/images/0636920047124/lrg.jpg",
            "small": "https://covers.oreillystatic.com/images/0636920047124/cat.gif"
            },
            "title": "Practical Modern JavaScript",
            "author": "Nicolas Bevacqua",
            "releaseDate": "01/07/2017",
            "pages": 334,
            "link": "http://shop.oreilly.com/product/0636920047124.do"
        }
        ]));
    }
    
    // parse books from localStorage to books array
    books = JSON.parse(localStorage.getItem("books"));
}

// wyświetl książki z tablicy z zadanym kryterium ilości stron oraz posortowane na 1 z 3 sposobów
function RenderBooks() {
    var olElement = document.getElementById("book-section");
    var inputElement = document.getElementById("page-count");
    // text on number conversion
    var pageCount = Number(inputElement.value);
    // checkboxes
    var inputByPages = document.getElementById("by-pages");
    var inputByReleaseDate = document.getElementById("by-release-date");
    var inputByAuthor = document.getElementById("by-author");

    // sort by number of pages
    if (inputByPages.checked) {
        books.sort((a, b) => {
            if (a.pages < b.pages) return -1;
            if (a.pages > b.pages) return 1;
            return 0;
        });
    }
    // sort by date
    else if (inputByReleaseDate.checked) {
        books.sort((a, b) => {
            var da = new Date(a.releaseDate);
            var db = new Date(b.releaseDate);

            if (da < db) return -1;
            if (da > db) return 1;
            return 0;
        });
    }
    // ssort by author
    else if (inputByAuthor.checked) {
        books.sort((a, b) => {
            if (a.author < b.author) return -1;
            if (a.author > b.author) return 1;
            return 0;
        });
    }


    olElement.innerHTML = "";

    // loop by all books
    for (var i = 0; i < books.length; i++) {
        // skip if book has less pages than a limit
        if (books[i].pages < pageCount) {
            continue;
        }

        //create elements
        var liElement = document.createElement("li");
        var articleElement = document.createElement("article");
        var divPicture = document.createElement("div");
        var divBookInfo = document.createElement("div");
        var aLargeCover = document.createElement("a");
        var imgSmallCover = document.createElement("img");
        var titleHeader = document.createElement("h3");
        var authorHeader = document.createElement("h3");
        var dateParapgraph = document.createElement("p");
        var pageCountParagraph = document.createElement("p");
        var divLink = document.createElement("div");
        var linkParagraph = document.createElement("p");
        var aLink = document.createElement("a");

        // set properties to the elements
        divPicture.className = "picture";
        divBookInfo.className = "book_info";
        aLargeCover.href = books[i].cover.large;
        imgSmallCover.id = "my_image";
        imgSmallCover.src = books[i].cover.small;
        titleHeader.innerHTML = books[i].title;
        authorHeader.innerHTML = books[i].author; 
        dateParapgraph.innerHTML = "Release Date: " + books[i].releaseDate;
        pageCountParagraph.innerHTML = "Pages: " + books[i].pages;
        divLink.className = "link";
        linkParagraph.innerHTML = "Link: ";
        aLink.href = books[i].link;
        aLink.innerHTML = "shop";

        // append elements
        divLink.appendChild(linkParagraph);
        divLink.appendChild(aLink);
        divBookInfo.appendChild(titleHeader);
        divBookInfo.appendChild(document.createElement("hr"));
        divBookInfo.appendChild(authorHeader);
        divBookInfo.appendChild(dateParapgraph);
        divBookInfo.appendChild(pageCountParagraph);
        divBookInfo.appendChild(divLink);
        aLargeCover.appendChild(imgSmallCover);
        divPicture.appendChild(aLargeCover);
        articleElement.appendChild(divPicture);
        articleElement.appendChild(divBookInfo);
        liElement.appendChild(articleElement);
        olElement.appendChild(liElement);
    }
}

// clear
function ClearUi()
{
    var inputElement = document.getElementById("page-count");
    var inputByPages = document.getElementById("by-pages");
    var inputByReleaseDate = document.getElementById("by-release-date");
    var inputByAuthor = document.getElementById("by-author");

    // clear pages number
    inputElement.value = "";
    // "unhook" sorting criteria
    inputByPages.checked = false;
    inputByReleaseDate.checked = false;
    inputByAuthor.checked = false;

    RenderBooks();
}

window.onload = function popup() {
	document.getElementById("my_image").onclick = function() {
		var myImg = this.setAttribute(src);
	}
}
