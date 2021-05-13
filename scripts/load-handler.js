let links = getPagesLinks();
let startPageLink = links[0].href;
let currentPageLink = startPageLink;

let contentBlock = document.getElementById("content");

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

let activeStyle = "list-group-item-dark";

loadPage(startPageLink);

for (let i = 0; i < links.length; i++) {
    links[i].onclick = function(e) {
        e.preventDefault();
        loadPage(links[i].href);
    };
}

nextButton.onclick = () => flipPage(1);
prevButton.onclick = () => flipPage(-1);

function loadPage(link) {
    let request = new XMLHttpRequest();
        request.open('get', link);
        request.onload = function() { 
            contentBlock.innerHTML = request.response;
            removeActionMark(currentPageLink);
            let chapter = getLinkTag(currentPageLink).parentElement.parentElement.parentElement;
            currentPageLink = link;
            setActionMark(currentPageLink);
            makeAction("true", chapter);
            changeButtonState();


        }
        request.send();
}

function flipPage(direction)
{
    let link = getLinkTag(currentPageLink);
    let index = links.indexOf(link);
    let newPageLink = links[index + direction];

    loadPage(newPageLink.href);
}

function getPagesLinks() {
    let allLinks = document.getElementById('navigation').getElementsByTagName('a');
    let pagesLinks = [];

    for (let i = 0; i < allLinks.length; i++)
        if (allLinks[i].href.includes('content/'))
            pagesLinks.push(allLinks[i]);

    return pagesLinks;
}

function changeButtonState() {
    if (currentPageLink == links[0].href)
        prevButton.disabled = true;
    else
        prevButton.disabled = false;

    if (currentPageLink == links[links.length - 1].href)
        nextButton.disabled = true;
    else
        nextButton.disabled = false;
}

function setActionMark(link) {
    let tag = getLinkTag(link);
    tag.parentElement.classList.add(activeStyle);
}

function removeActionMark(link) {
    let tag = getLinkTag(link);
    tag.parentElement.classList.remove(activeStyle);
}

function getLinkTag(link) {
    for (let i = 0; i < links.length; i++) {
        if (links[i].href == link)
            return links[i];
    }
}