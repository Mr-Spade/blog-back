function get_value(tar_id)//从location.search中提取tar_id的值
{
    let tmp=location.search.split('?');
    let tot=tmp[tmp.length-1].split('&');
    for(let i=0;i<tot.length;i++)
    {
        let id=tot[i].split('=')[0];
        let val=tot[i].split('=')[1];
        if(id===tar_id)
            return val;
    }
    return -1;
}

(function write_post()//写推送
{
    let my_post=add_child(document.querySelector(".main-box"),"div","post","");
    add_child(my_post,"h1","post-title",oi_postdata[get_value("postid")][0]);
    let my_post_box=add_child(my_post,"iframe","post-box","");
    my_post_box.src="data/"+oi_postdata[get_value("postid")][0]+".html";
    my_post_box.onload=function()
    {
        this.height=this.contentDocument.body.scrollHeight+1;
    };
    add_child(my_post,"div","post-date","最后编辑于："+oi_postdata[get_value("postid")][2]);
})();