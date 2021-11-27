let oi_postdata=
[
    ["四边形不等式","本文介绍了四边形不等式及其应用，证明部分尚未完成。","2018-09-12"],
];

function writepost(postdata)
{
    let my_post=document.createElement("div");
    my_post.className="post";
    let my_post_title=document.createElement("h1");
    my_post_title.className="post-title f-bu";
    my_post_title.textContent=postdata[0];
    my_post.appendChild(my_post_title);
    let my_post_ab=document.createElement("div");
    my_post_ab.className="post-ab";
    my_post_ab.textContent="摘要："+postdata[1];
    my_post.appendChild(my_post_ab);
    let my_post_date=document.createElement("div");
    my_post_date.className="post-date";
    my_post_date.textContent=postdata[2];
    my_post.appendChild(my_post_date);
    document.querySelector(".main-box").appendChild(my_post);
}

for(let i=oi_postdata.length-1;i>=0;i--)
{
    writepost(oi_postdata[i]);
}