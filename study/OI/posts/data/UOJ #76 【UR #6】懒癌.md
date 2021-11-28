确实是一道很不错的题啊。

[题目链接][1]

### 题意

感觉也没什么特别简洁的版本，大家直接看题面吧。

### 题解

我第一次看到这个类似问题的背景是疯狗，因此下面的题解不自觉的代入了...大家明白意思就好。

我们考虑对于疯狗，我们将其染为黑点，否则是白点。这样我们就可以用一张每个点有两种颜色的有向图来表示当前的状态。来想一想状态之间是如何转移的。

首先我们可以对每一个疯狗的主人分开考虑，计算他什么时候会发现自己的狗是疯狗，对所有的答案取$\min$即可。对于一个疯狗的主人，他自己能观察到的点的状态已经被确定了。于是他可以在自己的狗不疯的假设下，枚举所有他看不见的狗的状态，取其中最大的时间。可以发现状态向下的转移和这个人不能观察的人更加有关系，于是我们考虑将原图取反，在原图的补图上解决问题。此时$i$到$j$有边的意思是$i$不能观察$j$。当当前的时间等于最大时间$+1$时，他就会发现自己的狗是疯狗了。

那么首先要考虑的问题是怎么判断一个状态是否会永远发现不了疯狗。那么比较显然应该是转移出现了环的时候。那么什么样的图的转移会成环呢？我们假设图中有一个黑点，它可以到达图中的一个环，那么我们在转移的时候显然有一种转移是不断的把接近这个环的后继染黑，直到走到环上，接下来沿着环染黑，那么转移就会无休无止了。更准确的说，当存在一个黑点能够到达一个点数大于$1$的强连通分量时，就永远发现不了疯狗了。

于是我们可以发现所有能到达点数大于$1$的强连通分量的点都是不可以是疯狗的！那么我们就不用管这些点了。剩下的点组成了一张$DAG$！

于是我们只需要考虑一张每个点有两种颜色的$DAG$的答案就好了。这里给出一个结论：一个状态的枪响时间是所有黑点能到达的点的数目。

证明我们采用归纳法：假设对于一个状态，它能转移到的所有状态都符合这个结论了。那么我们依次考虑每个黑点，它可以将它的后继中的任意个染黑然后自己变白（当然要满足图中至少一个黑点），这样之后转移得到的答案是新的点集能到达的点数。那么由于它想要的是最大值，不难发现将所有后继染黑一定是最优的。此时除了它本身以外，它所能到达的点依然可以到达。也就是说，假如当前的其它黑点中有能够到达它的点，那么这个点的答案就是当前点集能到达的点数$+1$，这里的加一是因为之前所说的需要多一天时间发现，否则就不加一，因为它本身已经无法到达了。

而我们需要的是所有点的答案的最小值，不难发现点集中一定有一个黑点是其它黑点无法到达的（比如拓扑序最大的点），因此“当前点集能到达的点数”这个下界总是可以取到。于是结论就成立了。

那么考虑怎么求第一问的答案。可以每个点分开算贡献。我们先用$O(\frac{n^3}{w})$的时间用$\rm bitset$求出对于每一个点能到达它的点的数目。那么对于一个点集，它会记录这个点的情况只有点集中有能到它的点。我们用所有方案减去不存在能到它的点的方案即可。

至于第二问，不难发现是求每个状态有多少点可以取到最小值。根据之前的分析，应该是不能被点集中除自己外的点到达的那些点。分开算到每个点中，就是仅包含自己和不能到自己的点的那些点集。

代码：
```cpp
#include<cstdio>
#include<bitset>
#include<stack>
using std::bitset;
using std::stack;
const int mod=998244353;
inline int add(int a,int b)
{
	return (a+=b)>=mod?a-mod:a;
}
inline int sub(int a,int b)
{
	return (a-=b)<0?a+mod:a;
}
inline int mul(int a,int b)
{
	return (long long)a*b%mod;
}
inline int qpow(int a,int b)
{
	int res=1;
	for(;b;a=mul(a,a),b>>=1)
		if(b&1)
			res=mul(res,a);
	return res;
}
const int N=3005;
int n,ans,idx,cnt;
char s[N];
int g[N][N];
int dfn[N],low[N],com[N];
int size[N];
int g2[N][N];
stack<int> st;
bool inst[N];
bitset<N> from[N];
void dfs(int x)
{
	register int i;
	dfn[x]=low[x]=++idx;
	st.push(x);inst[x]=1;
	for(i=1;i<=n;i++)
		if(g[x][i])
		{
			if(!dfn[i])
			{
				dfs(i);
				if(low[i]<low[x])
					low[x]=low[i];
			}
			else if(inst[i]&&dfn[i]<low[x])
				low[x]=i;
		}
	if(dfn[x]==low[x])
	{
		com[x]=++cnt;size[cnt]=1;
		while(st.top()!=x)
			com[st.top()]=cnt,size[cnt]++,inst[st.top()]=0,st.pop();
		inst[x]=0;st.pop();
	}
	return;
}
signed main()
{
	register int i,j;
	scanf("%d",&n);
	for(i=1;i<=n;i++)
	{
		scanf("%s",s+1);
		for(j=1;j<=n;j++)
			if(i!=j&&s[j]=='0')
				g[i][j]=1;
	}
	for(i=1;i<=n;i++)
		if(!dfn[i])
			dfs(i);
	for(i=1;i<=n;i++)
		for(j=1;j<=n;j++)
			if(g[i][j]&&com[i]!=com[j])
				g2[com[i]][com[j]]=1;
	for(i=1;i<=cnt;i++)
		for(j=1;j<i;j++)
			if(g2[i][j]&&size[j]>size[i])
				size[i]=size[j];
	int cc=0;
	for(i=1;i<=cnt;i++)
		if(size[i]==1)
			cc++;
//	for(i=1;i<=cnt;i++)
//		if(size[i]==1)
//		{
//			to[i].set(i);
//			for(j=1;j<i;j++)
//				if(size[j]==1&&g2[i][j])
//					to[i]|=to[j];
//		}
	for(i=cnt;i>=1;i--)
		if(size[i]==1)
		{
			from[i].set(i);
			for(j=cnt;j>i;j--)
				if(size[j]==1&&g2[j][i])
					from[i]|=from[j];
		}
	for(i=1;i<=cnt;i++)
		if(size[i]==1)
			ans=add(ans,mul(sub(qpow(2,from[i].count()),1),qpow(2,cc-from[i].count())));
	printf("%d ",ans);
	ans=0;
	for(i=1;i<=cnt;i++)
		if(size[i]==1)
			ans=add(ans,qpow(2,cc-from[i].count()));
	printf("%d\n",ans);
	return 0;
}
```

[1]: http://uoj.ac/problem/76