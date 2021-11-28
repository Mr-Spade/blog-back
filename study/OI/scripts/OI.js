let oi_postdata=
[
    ["四边形不等式","本文介绍了四边形不等式及其应用，证明部分尚未完成。","2018-09-12"],
];

function writepost(postdata)
{
    // let my_post=document.createElement("div");
    // my_post.className="post";
    let my_post=add_child(document.querySelector(".main-box"),"div","post","");
    let my_post_title=add_child(my_post,"h1","post-title f-bu",postdata[0]);
    let str;
    if(location.pathname.length>=2&&location.pathname.substr(1,2)==="F:")
        str=location.pathname.split("index.html")[0]+"posts/index.html";
    else
        str=location.pathname+"/posts";
    my_post_title.onclick=function()
    {
        location.search='?postname='+encodeURI(postdata[0]);
        location.pathname=str;
    };
    add_child(my_post,"div","post-ab","摘要："+postdata[1]);
    add_child(my_post,"div","post-date",postdata[2]);
    // let my_post_title=document.createElement("h1");
    // my_post_title.className="post-title f-bu";
    // my_post_title.textContent=postdata[0];
    // my_post.appendChild(my_post_title);
    // let my_post_ab=document.createElement("div");
    // my_post_ab.className="post-ab";
    // my_post_ab.textContent="摘要："+postdata[1];
    // my_post.appendChild(my_post_ab);
    // let my_post_date=document.createElement("div");
    // my_post_date.className="post-date";
    // my_post_date.textContent=postdata[2];
    // my_post.appendChild(my_post_date);
    // document.querySelector(".main-box").appendChild(my_post);
}

for(let i=oi_postdata.length-1;i>=0;i--)
{
    writepost(oi_postdata[i]);
}