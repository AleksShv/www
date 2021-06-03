let chapters = document.getElementsByClassName('chapter');
let states = {false: 'bi-plus-square', true: 'bi-dash-square'}

for (let i = 0; i < chapters.length; i++) {
    let links = chapters[i].getElementsByClassName("bi");

    for (let j = 0; j < links.length; j++) {
        links[j].onclick = function()
        {
            let state = links[j].getAttribute("aria-expanded");
            let prevState = state === "true" ? "false" : "true";
            links[j].classList.replace(states[prevState], states[state]);

            makeAction(state, chapters[i]);
        }
    }
}

function makeAction(state, chapter) {
    if (state != "true" && checkAction(chapter))
        chapter.classList.add(activeStyle);
    else
        chapter.classList.remove(activeStyle);
}

function checkAction(chapter) {
    return chapter.getElementsByClassName(activeStyle).length > 0
}

function findChapterForLink(link)
{
    for (let i = 0; i < chapters.length; i++)
    {
        if (chapters[i].contains(link))
            return chapters[i];
    }
}
