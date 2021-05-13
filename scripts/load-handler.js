let links = getPagesLinks();
let startPageLink = links[0].href;
let currentPageLink = startPageLink;

let contentBlock = document.getElementById("content");

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

openPage(startPageLink);

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
    console.log(page);
    contentBlock.innerHTML = page;
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
    let link = links.forEach(link => {
        if (link.href == currentPageLink)
            return link;
    })

    let index = links.indexOf(link);
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