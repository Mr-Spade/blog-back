//调用该脚本之前，务请记得加载postdata！
postdata.sort(function(a,b)
{
    if(parseInt(a[2].substr(0,4))!==parseInt(b[2].substr(0,4)))
        return parseInt(a[2].substr(0,4))-parseInt(b[2].substr(0,4));
    if(parseInt(a[2].substr(5,2))!==parseInt(b[2].substr(5,2)))
        return parseInt(a[2].substr(5,2))-parseInt(b[2].substr(5,2));
    return parseInt(a[2].substr(8,2))-parseInt(b[2].substr(8,2));
});//使博文按照最后修改日期排序（后续修改博文，只要改对应日期即可刷新顺序）（排序似乎是稳定的）

function write_post_li(postid)//写推送陈列框
{
    // let my_post=document.createElement("div");
    // my_post.className="post";
    let my_post=add_child(document.querySelector(".main-box"),"div","post-li","");
    let my_a=add_child(my_post,"a","","");
    my_a.setAttribute("href","posts/"+(is_local()?"index.html":"")+"?postid="+postid);
    add_child(my_a,"h1","post-title",postdata[postid][0]);
    // let str;
    // if(location.pathname.length>=2&&location.pathname.substr(1,2)==="F:")
    //     str=location.pathname.split("index.html")[0]+"posts/index.html";
    // else
    //     str=location.pathname+"/posts";
    // my_post_title.onclick=function()
    // {
    //     location.search='?postname='+encodeURI(postdata[0]);
    //     location.pathname=str;
    // };
    if(postdata[postid][1]!=="")
        add_child(my_post,"div","post-ab","摘要："+postdata[postid][1]);
    add_child(my_post,"div","post-date",postdata[postid][2]);
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

for(let i=postdata.length-1;i>=0;i--)
    write_post_li(i);