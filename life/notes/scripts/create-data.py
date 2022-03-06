import os
import re
import sys

pwd=os.path.split(os.path.abspath(__file__))[0]
os.chdir(pwd)

path=r"..\\posts\\data"
outputFile=r"data.js"

f=open(outputFile,"wb")

def create_data(title,abstract,date):
    f.write(("[\""+title+"\",\""+abstract+"\",\""+date+"\"],\n").encode("utf-8"))

f.write("let postdata=[\n".encode("utf-8"))

filelist=os.listdir(path)
for i in range(0,len(filelist)):
    if(filelist[i][-3:len(filelist[i])]!=".md"):
        continue
    create_data(filelist[i][0:-3],"","2022-03-16")

f.write("];\n".encode("utf-8"))

f.close()