import os
import re
import sys

pwd=os.path.split(os.path.abspath(__file__))[0]#把工作区设置为py脚本所在位置（为什么不呢？）
os.chdir(pwd)

def md_to_html():
    # f=open('log.txt','w')

    md_path=r"..\\study\\OI\\posts\\data"
    filelist=os.listdir(md_path)
    for i in range(0,len(filelist)):
        if(filelist[i][-3:len(filelist[i])]!=".md"):
            continue
        str=md_path+r"\\"+filelist[i].split('.md')[0].replace(" ","\" \"")# cmd文件名的空格两边需要打双引号
        os.popen(r"..\\tools\\pandoc\\pandoc -s "+str+r".md ..\\tools\\pandoc\\metadata.yaml -o "+str+".html --katex")

md_to_html()
