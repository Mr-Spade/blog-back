let sig=[
  "从一缕微光开始",
  "我心中那团青色的怒火，终将燃烧这片大地",
  "世人苦被明日累，秋天漠漠向昏黑"
];

document.querySelector('.signature').textContent=sig[Math.floor(Math.random()*sig.length)];
//随机一条签名

//$(document).ready(function(){$(".title-img").click(function(){$(".signature").slideToggle();});});
