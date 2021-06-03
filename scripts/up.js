
let toTopButton = document.getElementById("to-top");

window.addEventListener("scroll", trackScroll);
toTopButton.addEventListener("click", toTop);

function trackScroll()
{
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords)
    {
        toTopButton.classList.add("to-top-show");
    }
    else
    {
        toTopButton.classList.remove("to-top-show");
    }
}

function toTop()
{
    if (window.pageYOffset > 0)
    {
        window.scrollBy(0, -80);
        setTimeout(toTop, 0);
    }
}