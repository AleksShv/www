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
            article.scrollTo({
                top: 0,
                behaviour: "instant"
            });

            removeActionMark(currentPageLink);
            markChapter(currentPageLink);
            let prevLink = findLinkTag(currentPageLink)
            let prevChapter = findChapterForLink(prevLink);

            currentPageLink = link;
            
            setActionMark(currentPageLink);
            markChapter(currentPageLink);
            let currentLink = findLinkTag(currentPageLink)
            let currentChapter = findChapterForLink(currentLink);

            if (!currentChapter.isEqualNode(prevChapter))
            {
                let prevCollapse = prevChapter.getElementsByClassName("bi")[0];
                let currentCollapse = currentChapter.getElementsByClassName("bi")[0];

                toggle(prevCollapse, "true");
                toggle(currentCollapse, "false");
            }

            changeButtonState();
        }
        request.send();
}

function toggle(collapse, state)
{
    if (collapse)
    {
        if (collapse.getAttribute("aria-expanded") == state)
        {
            collapse.click();
        }
    }
}

function flipPage(direction)
{
    let link = findLinkTag(currentPageLink);
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
    let tag = findLinkTag(link);
    tag.parentElement.classList.add(activeStyle);
}

function removeActionMark(link) {
    let tag = findLinkTag(link);
    tag.parentElement.classList.remove(activeStyle);
}

function findLinkTag(link) {
    for (let i = 0; i < links.length; i++) {
        if (links[i].href == link)
            return links[i];
    }
}

function markChapter(link) {
    let linkTag = findLinkTag(link);
    let chapter = findChapterForLink(linkTag);

    if (chapter.childElementCount > 1)
    {
        let state = chapter.getElementsByClassName("bi")[0].getAttribute("aria-expanded");        
        makeAction(state, chapter);
    }
}
