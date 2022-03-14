// let te=document.createElement("div");
// te.className="gallery-award";
// let tee=document.createElement("div");
// tee.className="small-div";
// tee.textContent="啊啊啊";
// te.appendChild(tee);
// tee=document.createElement("div");
// tee.className="small-div";
// tee.textContent="啊啊啊";
// te.appendChild(tee);
// document.querySelector(".main-box").appendChild(te);

let gallery_data=[
    [3,"NOIP普及奖章·Ⅱ","noip2016","您在信息学竞赛中获得的第一个奖项。\n这个奖项虽没有那么耀眼，却代表了一种开始，也预示着一种结束。","在NOIP2016中，获得普及组二等奖。","","2016-12-08"],
    [2,"NOIP提高奖章·Ⅰ","noip2017","作为初学者，您在高一赛季的联赛中发挥稳定。\n这代表您走出了初来乍到时面对巨大实力差距的恐惧。从此，您开始意识到他们并非不可超越的，并开始了自己的逆袭之路。","在NOIP2017中，获得提高组一等奖。","","2017-11-30"],
    [2,"“点燃”","noip2018","经过反思和不懈的努力，您在高二赛季的联赛中表现优异。\n这是属于您的第一份耀眼的荣誉。从此，您开启了自己精彩无比的高二赛季。","在NOIP2018中，获得提高组一等奖。","获得全国第57名。","2018-12-04"],
    [1,"“涅槃”","cts2019","您收获了一段由梦幻开局和绝境翻盘组成的精彩刺激的旅程。\n这虽然不是您最耀眼的成绩，但这段冲破省选遗恨的阴影成功大逆转的时光，必将成为您毕生难忘的回忆。","在CTS2019中，获得金牌。","在绝境下翻盘杀入全国第50名。","2019-05-16"],
    [1,"“踌躇”","wc2019","看尽长安花后，您志得意满地又下一城。\n这是对您的坚守的又一份辉煌的馈赠。此刻，请尽情庆贺吧，因为在不远的将来，一场沉重而悲壮的旅程正在等待着您。","在WC2019中，获得金牌。","获得全国第38名。","2019-02-01"],
];

gallery_data.sort(function(a,b)
{
    if(parseInt(a[6].substr(0,4))!==parseInt(b[6].substr(0,4)))
        return parseInt(a[6].substr(0,4))-parseInt(b[6].substr(0,4));
    if(parseInt(a[6].substr(5,2))!==parseInt(b[6].substr(5,2)))
        return parseInt(a[6].substr(5,2))-parseInt(b[6].substr(5,2));
    return parseInt(a[6].substr(8,2))-parseInt(b[6].substr(8,2));
});

function get_gallary_type(id)
{
    if(gallery_data[id][0]==0)
        return "gallery-zero-icon";
    if(gallery_data[id][0]==1)
        return "gallery-first-icon";
    if(gallery_data[id][0]==2)
        return "gallery-second-icon";
    if(gallery_data[id][0]==3)
        return "gallery-third-icon";
}
//返回荣誉等级对应的img种类

function write_gallery(id)
{
    let a,b;
    let box=add_child(document.querySelector(".main-box"),"div","gallery","");
    a=add_child(box,"div","gallery-icon-box");
    b=add_child(a,"img",get_gallary_type(id),"");
    b.src="images/"+gallery_data[id][2]+".png";
    a=add_child(box,"div","gallery-right","");
    add_child(a,"h1","gallery-title",gallery_data[id][1]);
    add_child(a,"div","gallery-date","获得于"+gallery_data[id][6]);
    b=add_child(a,"div","gallery-award","");
    let lst=gallery_data[id][3].split('\n');
    for(let i=0;i<lst.length;i++)
        add_child(b,"div","small-div",lst[i]);
    b=add_child(a,"div","gallery-way","");
    add_child(b,"div","small-div","获得方式："+gallery_data[id][4]);
    if(gallery_data[id][5].length>0)
        add_child(b,"div","small-div","冠名方式："+gallery_data[id][5]);
}
//写一个荣誉框

function write_small_gallery(id)
{
    let a,b;
    let box=add_child(document.querySelector(".main-box"),"div","toggle f-bu small-gallery","");
    a=add_child(box,"div","small-gallery-icon-box");
    b=add_child(a,"img","small-gallery-icon","");
    b.src="images/"+gallery_data[id][2]+".png";
    a=add_child(box,"div","small-gallery-right","");
    add_child(a,"h1","small-gallery-title",gallery_data[id][1]);
    add_child(a,"div","small-gallery-date","获得于"+gallery_data[id][6]);
    b=add_child(a,"div","small-gallery-award",gallery_data[id][3].split('\n')[0]);
}

for(let i=0;i<gallery_data.length;i++)
{
    write_small_gallery(i);
    let a,b;
    // let box=add_child(document.querySelector(".main-box"),"div","small-gallery","aa");
    // a=add_child(box,"div","small-gallery-icon-box");
    // b=add_child(a,"img","small-gallery-icon","");
    write_gallery(i);
    //add_child(document.querySelector(".main-box"),"div","small-div","aaa");
}

let bgm=add_child(document.querySelector(".main-box"),"audio","bgm","");
// if(is_local())
//     bgm.controls="controls";
bgm.src="audio/sys_ccs7_intro.wav";
bgm.onended=function(){
    bgm.src="audio/sys_ccs7_loop.wav";
    bgm.autoplay="true";
    bgm.loop="true";
};

document.querySelector(".music-button").style.display="block";
//本页面启动音乐播放按钮