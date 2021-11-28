#include<bits/stdc++.h>
using namespace std;
char s[100],ss[100];
int ch[100005];
int cnt;
string so;
signed main()
{
	register int i;
	scanf("%s",s);
	sprintf(ss,"%s.md",s);
	freopen(ss,"r",stdin);
	freopen("test.md","w",stdout);
	for(i=0;(ch[i]=getchar())!=EOF;i++)
	{
		if(i>0&&ch[i-1]=='$'&&ch[i]=='$')
		{
			if(cnt&1)
				so.pop_back(),so.push_back('\n'),so.push_back('$'),so.push_back('$');
			else
				so.push_back('$'),so.push_back('\n');
			cnt++;
		}
		else
			so.push_back(ch[i]);
	}
	for(i=0;i<(int)so.size();i++)
		printf("%c",so[i]);
	return 0;
}
