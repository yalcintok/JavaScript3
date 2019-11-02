'use strict';
{
let xhr = new XMLHttpRequest ();
xhr.open('GET', 'https://www.randomuser.me/api');
xhr.onload = function () {
    if (this.status >= 200 && this.status < 300) {
        console.log(JSON.parse(this.responseText));
    } else {
        console.log('The server sends a : ', this.status);
    };
};

xhr.onerror = function () {
    console.log('There was a connection error!!');
}

xhr.send();


axios.get('https://www.randomuser.me/api')
.then (function (response) {
    console.log(response.data);
})
.catch (function(error) {
    console.log(error);
})
}