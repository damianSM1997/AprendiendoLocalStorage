//las variables
const listaTweets = document.getElementById('lista-tweets');

///los event listeners
eventListeners();

function eventListeners() {
    //cuando se envia el formuladio
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    //borrar tweets
    listaTweets.addEventListener('click', borrarTweet);
    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}

//funciones

//añadir tweet del formulario

function agregarTweet(e) {
    e.preventDefault();
    //leer el valor del text area
    const tweet = document.getElementById('tweet').value;
    //crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'x';
    //crear un elemento y añadir el elemento a la lsita
    const li = document.createElement('li');
    li.innerText = tweet;
    //añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);

    //agregar a local
    agregarTweetLocalStorage(tweet);
}
//elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.textContent);

        //alert('Tweet eliminado')
    }

}

//mostrar datos de localStorage en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet) {

        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'x';
        //crear un elemento y añadir el elemento a la lsita
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);

    })
}

// agrega a el local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo tweet que es un areglo
    tweets.push(tweet);
    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// se encarga de comprovar qeu se tengan elementos en localStorage
// y retorna un areglo
function obtenerTweetsLocalStorage() {
    let tweets;
    // Revisamos los valoes de local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//eliminar tweet de local storage

function borrarTweetLocalStorage(tweet) {
    let tweets, tweetsBorrar;
    //parte que se encarga de seleccionar todo a partir de
    //un areglo y posterior mente elimina el ultimo caracter
    // en este caso la x
    tweetsBorrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet, index) {
        if (tweetsBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });
    //esto lo vuelve un string
    localStorage.setItem('tweets', JSON.stringify(tweets))

}