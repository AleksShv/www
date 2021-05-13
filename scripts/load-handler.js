let links = getPagesLinks();
let startPageLink = links[0];
let currentPageLink = document.createElement("a");

let contentBlock = document.getElementById("content");

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

let activeStyle = "border border-dark rounded-pill bg-white";

currentPageLink.href = startPageLink.href;
openPage(startPageLink.href);

for (let i = 0; i < links.length; i++) {
    links[i].onclick = function(e) {
        e.preventDefault();
        openPage(links[i].href);
    };
}

nextButton.onclick = function() {
    flipPage(1);
}

prevButton.onclick = function() {
    flipPage(-1);
}

function openPage(link) {
    let page = load(link);
    contentBlock.innerHTML = page;
    currentPageLink.href = link;
}

function load(link) {
    let request = new XMLHttpRequest();
        request.open('get', link);
        request.onload = () => {console.log("hui"); return request.response };
        request.send();
}

function flipPage(direction)
{
    let index = links.indexOf(currentPageLink);
    let newPageLink = links[index + direction];

    openPage(newPageLink.href);
}

function getPagesLinks() {
    let allLinks = document.getElementById('navigation').getElementsByTagName('a');
    let pagesLinks = [];

    for (let i = 0; i < allLinks.length; i++)
        if (allLinks[i].href.includes('content/'))
            pagesLinks.push(allLinks[i]);

    return pagesLinks;
}