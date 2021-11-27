let sig=[
  "从一缕微光开始",
  "我心中那团青色的怒火，终将燃烧这片大地",
  "世人苦被明日累，秋天漠漠向昏黑"
];

document.querySelector(".signature").textContent=sig[Math.floor(Math.random()*sig.length)];
//随机一条签名

$(document).ready(function(){$(".toggle").next().hide();});
//侧边列表默认收缩
$(document).ready(function(){$(".toggle").click(function(){$(this).next().slideToggle();});});
//侧边列表点击可以展开/收缩子项

document.querySelector(".title-img").onclick=function()
{
  if(location.pathname.length>=2&&location.pathname[1]==='F')//本地测试
  {
    location.pathname="/F:/Mr-Spade.github.io/index.html";
  }
  else//网页
  {
    location.pathname="/";
  }
};

document.querySelector(".b-OI").onclick=function()
{
  if(location.pathname.length>=2&&location.pathname[1]==='F')//本地测试
  {
    location.pathname="/F:/Mr-Spade.github.io/study/OI/index.html";
  }
  else//网页
  {
    location.pathname="/study/OI";
  }
};