let sig=
[
  "从一缕微光开始",
  "我心中那团青色的怒火，终将燃烧这片大地",
  "世人苦被明日累，秋天漠漠向昏黑"
];

function add_child(father,tname,tclass,ttext)
{
  let res=document.createElement(tname);
  res.className=tclass;
  if(res.textContent!==null)
    res.textContent=ttext;
  father.appendChild(res);
  return res;
}

(function write_navigation()
{
  //let my_navigation=document.createElement("div");
  //my_navigation.className="navigation";
  let my_navigation=add_child(document.querySelector("body"),"div","navigation","");
  //let my_title_img=document.createElement("img");
  //my_title_img.className="title-img f-bu";
  let my_title_img=add_child(my_navigation,"img","title-img f-bu","");
  if(location.pathname.length>=2&&location.pathname.substr(1,2)==="F:")
  {
    let str="";
    let cnt=location.pathname.split('/').length-4;
    for(let i=0;i<cnt;i++)
    {
      str+="../";
    }
    str+="images/title.png";
    my_title_img.src=str;
  }
  else
  {
    let str="";
    let cnt=location.pathname.split('/').length-2;
    for(let i=0;i<cnt;i++)
    {
      str+="../";
    }
    str+="images/title.png";
    my_title_img.src=str;
  }
  // let my_signature=document.createElement("div");
  // my_signature.className="signature";
  // my_signature.textContent=sig[Math.floor(Math.random()*sig.length)];
  let my_signature=add_child(my_navigation,"div","signature",sig[Math.floor(Math.random()*sig.length)]);
  //随机一条签名
  // my_navigation.appendChild(my_signature);
  // let my_first_list=document.createElement("ul");
  // my_first_list.className="first-list";
  let my_first_list=add_child(my_navigation,"ul","first-list","");
  // let my_li=document.createElement("li");
  let my_first_li=add_child(my_first_list,"li","","");
  // let my_span=document.createElement("span");
  // my_span.className="toggle f-bu";
  // my_span.textContent="学习";
  add_child(my_first_li,"span","toggle f-bu","学习");
  // my_li.appendChild(my_span);
  let my_second_list=add_child(my_first_li,"ul","second-list","");
  add_child(my_second_list,"li","b-OI f-bu","OI");
  add_child(my_second_list,"li","","数学");
  my_first_li=add_child(my_first_list,"li","","");
  add_child(my_first_li,"span","toggle f-bu","生活");
  my_second_list=add_child(my_first_li,"ul","second-list","");
  add_child(my_second_list,"li","","杂记");
  add_child(my_second_list,"li","","板绘");
  add_child(my_second_list,"li","","食堂测评");
  add_child(my_second_list,"li","","美图收藏");
  my_first_li=add_child(my_first_list,"li","","荣誉陈列架");
  my_first_li=add_child(my_first_list,"li","","客观履历");
  my_first_li=add_child(my_first_list,"li","","友情链接");
}
)();
//绘制导航栏
$(document).ready(function(){$(".toggle").next().hide();});
//侧边列表默认收缩
$(document).ready(function(){$(".toggle").click(function(){$(this).next().slideToggle();});});
//侧边列表点击可以展开/收缩子项

add_child(document.querySelector("body"),"div","main-box","");

document.querySelector(".title-img").onclick=function()
{
  if(location.pathname.length>=2&&location.pathname.substr(1,2)==="F:")//本地测试
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
  if(location.pathname.length>=2&&location.pathname.substr(1,2)==="F:")//本地测试
  {
    location.pathname="/F:/Mr-Spade.github.io/study/OI/index.html";
  }
  else//网页
  {
    location.pathname="/study/OI";
  }
};