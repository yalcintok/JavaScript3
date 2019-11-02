'use strict';
{
let xhr = new XMLHttpRequest ();
xhr.open('GET', 'https://picsum.photos/400');
xhr.onload = function () {
    if (this.status >= 200 && this.status < 300) {
        document.getElementById('xhr').setAttribute('src', this.responseURL);
    } else {
        console.log('The server sends a : ', this.status);
    };
};

xhr.onerror = function () {
    console.log('There was a connection error!!');
}

xhr.send();


axios.get('https://picsum.photos/400')
.then (function (response) {
    document.getElementById('axios').setAttribute('src', response.request.responseURL);
})
.catch (function(error) {
    console.log(error);
})
}

