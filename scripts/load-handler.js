let links = getPages();
let startPageLinkLink = links[0];
let currentPageLinkLink = startPageLink;

let contentBlock = document.getElementById("content");

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

let activeStyle = "border border-dark rounded-pill bg-white";

openPage(startPageLink);

for (let index = 0; index < links.length; index++) {
    links[index].onclick = function(e) {
        e.preventDefault();
        openPage(links[index].href);

    };
}

nextButton.onclick = function() {
    flipPage(1);
}
prevButton.onclick = function() {
    flipPage(-1);
}

function openPage(link) {
    let HTMLpage = load(link);
    contentBlock.innerHTML = HTMLpage;
    currentPageLink = link;
}

function load(link) {
    let request = new XMLHttpRequest();
        request.open('get', link);
        request.onload = () => request.response;
        request.send();
}

function flipPage(direction)
{
    let index = links.indexOf(currentPageLink);
    let newPageLink = links[index + direction];

    openPage(newPageLink);
}

function getPagesLinks() {
    let allLinks = document.getElementById('navigation').getElementsByTagName('a');
    let pagesLinks = [];

    for (let i = 0; i < allLinks.length; i++)
        if (allLinks[i].href.includes('content/'))
            pages.push(allLinks[i].href);

    return pagesLinks;
}

contentBlock.onload = () => alert("aaaa");