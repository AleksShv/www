let startPage = 'content/introduction.html';
let links = document.getElementById('navigation').getElementsByTagName('a');
let contentBlock = document.getElementsByTagName('article')[0];
let currentPage = startPage;

load(startPage);

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

function load(link) {
    let request = new XMLHttpRequest();
        request.open('get', link);
        request.onload = () => contentBlock.innerHTML = request.response;
        request.send();
}