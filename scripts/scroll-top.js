let toTopButton = document.getElementById("to-top");
let article = document.querySelector("article");

article.onscroll = function(e) {
    let scrolled = article.scrollTop;
    var coords =  article.offsetHeight;

    if (scrolled > coords)
    {
        toTopButton.parentElement.classList.add("to-top-show");
    }
    else
    {
        toTopButton.parentElement.classList.remove("to-top-show");
    }
}

toTopButton.onclick = function() {
    if (article.offsetWidth > 0)
    {
        article.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

