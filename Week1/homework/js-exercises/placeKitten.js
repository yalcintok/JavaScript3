'use strict';
{
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://dog.ceo/api/breeds/image/random");
xhr.onload = function () {
    if (this.status >= 200 && this.status < 300) {
        console.log(JSON.parse(this.response));        
    } else {
        console.error('The server responded with : ', this.status);
    } 
};

xhr.onerror = function () {
    console.error (this.status);
};

xhr.send();


axios.get('https://dog.ceo/api/breeds/image/random')
  .then(function (response) {
    console.log(response.data);
})
  .catch(function (error) {
    console.error ('The server responded with (axios) : ', error);
});
}