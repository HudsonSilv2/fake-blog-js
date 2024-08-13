//https://jsonplaceholder.typicode.com/posts

async function readPosts() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'carregando...';

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if (json.length > 0) {
        postArea.innerHTML = '';

        for(let i in json) {
            let postHtml = `<div>
            <h1 class="titlePost">${json[i].title}</h1>
            <p>${json[i].body}</p>
            <hr>
            <br>
            </div>`;

            postArea.innerHTML += postHtml;
            console.log(json[i]);
        }
    }else {
        postArea.innerHTML = 'Nenhum post para exibir';
    }
}

async function addNewPost(title, body) {
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        }
    );

    document.querySelector('#titlefield').value = '';
    document.querySelector('#bodyfield').value = '';

    readPosts();
}


document.querySelector('#inserirButton').addEventListener('click', () => {
    let title = document.querySelector('#titlefield').value;
    let body = document.querySelector('#bodyfield').value;

    if(title && body) {
        addNewPost(title, body);
    }else {
        alert("Preencha todos os campos.");
    }
});

readPosts();