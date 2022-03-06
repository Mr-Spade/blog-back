let postdata=new Array(0);

let xmlhttp;
function loadXMLDoc(url)
{
    xmlhttp=null;
    if(window.XMLHttpRequest)
        xmlhttp=new XMLHttpRequest();
    else if(window.ActiveXObject)
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    if(xmlhttp!=null)
    {
        xmlhttp.onreadystatechange=state_change;
        xmlhttp.open("GET",url,true);
        xmlhttp.send(null);
    }
    else
        alert("Your browser does not support XMLHTTP.");
}
function state_change()
{
    if(xmlhttp.readyState==4)
    {// 4 = "loaded"
        if (xmlhttp.status==200)
        {// 200 = "OK"
            let art_list=document.documentElement.childNodes;
            for(let i=0;i<art_list.length;i++)
                postdata.push([art_list[i].getAttribute("title"),art_list[i].getAttribute("abstract"),art_list[i].getAttribute("date")]);
        }
        else
            alert("Problem retrieving XML data:" + xmlhttp.statusText);
    }
}

loadXMLDoc("../data/data.xml");