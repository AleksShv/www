let chapters = document.getElementsByClassName('chapter');
let states = {false: 'bi-plus-square', true: 'bi-dash-square'}

for (let i = 0; i < chapters.length; i++) {
    let links = chapters[i].getElementsByClassName("bi");

    for (let j = 0; j < links.length; j++)
    {
        links[j].onclick = function() {
            let state = links[j].getAttribute("aria-expanded");
            let prevState = state === "true" ? "false" : "true";
            links[j].classList.replace(states[prevState], states[state]);

            if (prevState == "true" && checkAction(chapters[i]))
                chapters[i].classList.add(activeStyle);
            else
                chapters[i].classList.remove(activeStyle);
        }
    }
}

function checkAction(chapter) {
    return chapter.getElementsByClassName(activeStyle).length > 0
}
