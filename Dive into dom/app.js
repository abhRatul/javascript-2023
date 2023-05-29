const ul = document.querySelector('ul')
let section = document.querySelector('section')

console.log(ul);
console.log(ul.children);
console.log(ul.childNodes) // text node count
console.log(ul.firstChild); // text node count
console.log(ul.firstElementChild); // text node not count 

const ul2 = document.querySelector('li');
console.log(ul2.parentElement);
console.log(ul.previousElementSibling);
console.log(ul.nextElementSibling);
// insertAdjacentHTML('beforeend','<p>Hello</p>')
