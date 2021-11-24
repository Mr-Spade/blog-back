let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/kx.jpg') {
      myImage.setAttribute('src', 'images/mess.png');
    } else {
      myImage.setAttribute('src', 'images/kx.jpg');
    }
}

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
    let myName = prompt('请输入你的名字。');
    localStorage.setItem('name', myName);
    myHeading.textContent = '空弦酷毙了，' + myName;
  }
  if(!localStorage.getItem('name')) {
    setUserName();
  } else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = '空弦酷毙了，' + storedName;
  }

  myButton.onclick = function() {
    setUserName();
 }