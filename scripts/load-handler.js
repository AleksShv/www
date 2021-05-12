let pages = getPages();
let startPage = pages[0];
let currentPage = startPage;

let links = document.getElementById('navigation').getElementsByTagName('a');
let contentBlock = document.getElementsByTagName('article')[0];

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

load(startPage);
checkPagesBorder();

for (let index = 0; index < links.length; index++) {
    links[index].onclick = function(e) {
        e.preventDefault();
        
        let href = links[index].href;
        if (href == document.baseURI || href.includes('#section'))
            return;
        load (href);
        currentPage = href;
    };
}

nextButton.onclick = function() {
    flipPage(1);
    checkPagesBorder();
}
prevButton.onclick = function() {
    flipPage(-1);
    checkPagesBorder();
}

function flipPage(direction)
{
    let currentPageIndex = pages.indexOf(currentPage);
    let newPage = pages[currentPageIndex + direction];

    currentPage = newPage;
    load(currentPage);
}

function checkPagesBorder()
{
    if (currentPage == pages[0])
        prevButton.disabled = true;
    else
        prevButton.disabled = false;

    if (currentPage == pages[pages.length - 1])
        nextButton.disabled = true;
    else
        nextButton.disabled = false;
}

function load(link) {
    let request = new XMLHttpRequest();
        request.open('get', link);
        request.onload = () => contentBlock.innerHTML = request.response;
        request.send();
}

function getPages() {
    let links = document.getElementById('navigation').getElementsByTagName('a');
    let pages = [];

    for (let i = 0; i < links.length; i++)
        if (links[i].href.includes('content/'))
            pages.push(links[i].href);

    return pages;
}