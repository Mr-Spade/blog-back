(function write_post()//写推送
{
    let my_post=add_child(document.querySelector(".main-box"),"div","post","");
    add_child(my_post,"h1","post-title",oi_postdata[get_value("postid")][0]);
    let my_post_box=add_child(my_post,"iframe","post-box","");
    my_post_box.src="data/"+to_url_code(oi_postdata[get_value("postid")][0])+".html";
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
    add_child(my_post,"div","post-date","最后编辑于："+oi_postdata[get_value("postid")][2]);
})();