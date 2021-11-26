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


// function reset_height(e)
// {
  //if(e.contentDocument.body.clientHeight)
  //  e.height=1000;
  //e.src="article/art2.html";
  let e=document.querySelector('.article');
  e.height = e.contentDocument.body.scrollHeight;
  // let res=document.querySelector('.result');
  // res.textContent=location.pathname;
// }

// let my_article=document.querySelectorAll('.article');
// for(let i=0;i<my_article.length;i++)
// {
//   reset_height(my_article[i]);
// }