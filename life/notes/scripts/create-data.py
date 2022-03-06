import os
import xml.dom.minidom as xdm

pwd=os.path.split(os.path.abspath(__file__))[0]
os.chdir(pwd)

T=xdm.Document()
rt=T.appendChild(T.createElement("root"))

def create_data(title,abstract,date):
    res=T.createElement("article")
    res.setAttribute("title",title)
    res.setAttribute("abstract",abstract)
    res.setAttribute("date",date)
    return res

path=r"..\\posts\\data"
filelist=os.listdir(path)
for i in range(0,len(filelist)):
    if(filelist[i][-3:len(filelist[i])]!=".md"):
        continue
    rt.appendChild(create_data(filelist[i][0:-3],"","2022-03-16"))

f=open(r"..\\data\\data.xml","wb")
f.write(T.toprettyxml(indent='\t',newl='\n',encoding="utf-8"))
f.close()