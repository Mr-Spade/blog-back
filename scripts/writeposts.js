//调用该脚本之前，务请记得加载postdata！
postdata.sort(function(a,b)
{
    if(parseInt(a[2].substr(0,4))!==parseInt(b[2].substr(0,4)))
        return parseInt(a[2].substr(0,4))-parseInt(b[2].substr(0,4));
    if(parseInt(a[2].substr(5,2))!==parseInt(b[2].substr(5,2)))
        return parseInt(a[2].substr(5,2))-parseInt(b[2].substr(5,2));
    return parseInt(a[2].substr(8,2))-parseInt(b[2].substr(8,2));
});//使博文按照最后修改日期排序（后续修改博文，只要改对应日期即可刷新顺序）（排序似乎是稳定的）

(function write_post()//写推送
{
    let my_post=add_child(document.querySelector(".main-box"),"div","post","");
    add_child(my_post,"h1","post-title",postdata[get_value("postid")][0]);
    let my_post_box=add_child(my_post,"iframe","post-box","");
    my_post_box.src="data/"+to_url_code(postdata[get_value("postid")][0])+".html";
    my_post_box.setAttribute("scrolling","no");
    my_post_box.onload=function()
    {
        adjust_height(this);
    }
    // my_post_box.onresize=function()
    // {
    //     if(this.contentDocument!==null)
    //         this.height=this.contentDocument.body.scrollHeight;
    // };
    add_child(my_post,"div","post-date","最后编辑于："+postdata[get_value("postid")][2]);
})();