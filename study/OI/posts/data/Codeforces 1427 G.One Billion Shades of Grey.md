[题目链接](https://codeforces.com/contest/1427/problem/G)

老年人一看到这么妙的题目就有点激动啊。

题意：给定一个$n\times n$的矩阵，矩阵的边界的每一个位置已经填了一个数，而矩阵中部尚未填数。某些矩阵的中部位置是损坏的不可填数。你要在剩下的矩阵中部位置都填一个数字，对于一种填的方案，其不和谐度是所有四连通的两个都填数的位置所填数字的差的绝对值之和。求最小不和谐度。$n\leq 200$，已经有的边权$\in[1,10^9]$

题解：一道看似简单的题目，却有这么精妙的题解，真好啊。

针对题意，我们构造图$G=(V,E)$，$G$中每一个节点对应矩阵的一个位置，如果两个位置$u,v$都可以填数（包括边界）而且相邻，那么$E$中有边$(u,v)$和$(v,u)$，边权为$1$。

考虑一个恒等式：

$$|a-b|=\bigg(\sum_{k>0}[a\leq k\land b>k]\bigg)+\bigg(\sum_{k>0}[b\leq k\land a>k]\bigg)$$

那么我们令$a_u$代表某一种方案中$u$所填的数字，就有：

$$ans=\sum_{(u,v)\in E}\bigg(\sum_{k>0}[a_u\leq k\land a_v>k]\bigg)$$

$$=\sum_{k>0}\bigg(\sum_{(u,v)\in E}[a_u\leq k\land a_v>k]\bigg)$$

可以发现，和式中的最后一项可以用最小割表示。现在我们令$B$表示所有已经有数字的位置的集合，$A^c=V\setminus A$，$mc(S,T)$表示对于所有$S\subseteq S',T\subseteq T',S'\cap T'=\emptyset,S'\cup T'=V$，图$G$的$S'-T'$割的最小值。也就是源点集至少包含$S$，汇点集至少包含$T$的最小割。那么进一步令$MC(S,T)$表示所有满足$S\subseteq U,T\subseteq U^c$且$mc(U,U^c)=mc(S,T)$的$U$的集合，也就是$mc(S,T)$取到最优值时真实划分情况的解集。

那么上述式子可以表示为：

$$ans=\sum_{k>0}mc(\{u\in V|a_u\leq k\},\{u\in V|a_u>k\})$$

$$\geq \sum_{k>0}mc(\{u\in B|a_u\leq k\},\{u\in B|a_u>k\})\tag{*}$$

$(*)$式是答案的一个下界，现在我们来证明这个下界是可以取到的，也就是答案。

可以取到的条件是，对于$k=1,2,\dots$，存在$W_1\subseteq W_2\subseteq \dots$，使得$W_i\in MC(\{u\in B|a_u\leq i\},\{u\in B|a_u>i\})$（这是因为随着$k$增加，$\{u\in V|a_u\leq k\}$会扩张而$\{u\in V|a_u>k\}$会收缩）。

下面的引理则让上一条件从可能成为现实：

>对于$\tilde S\supseteq S,\tilde T\subseteq T$，如果$W\in MC(S,T)$且$\tilde W\in MC(\tilde S,\tilde T)$，那么$W\cup \tilde W\in MC(\tilde S,\tilde T)$。

>证明：先证明一个式子：

>$$mc(W,W^c)+mc(\tilde W,\tilde W^c)\geq mc(W\cup \tilde W,(W\cup\tilde W)^c)+mc(W\cap \tilde W,(W\cap\tilde W)^c)$$

>左边比右边多了$W\setminus\tilde W$与$\tilde W\setminus W$之间的边的贡献，因此成立。

>考虑$W\cap \tilde W$是一种对于$(S,T)$合法的真实分割情况，而$W$是最优的情况，因此$mc(W\cap \tilde W,(W\cap\tilde W)^c)\geq mc(W,W^c)$。
>同样$W\cup \tilde W$是一种对于$(\tilde S,\tilde T)$合法的真实分割情况，而$\tilde W$是最优的情况，因此$mc(W\cup \tilde W,(W\cup\tilde W)^c)\geq mc(\tilde W,\tilde W^c)$。

>三个不等式结合，必定都是取到等号。因此$mc(W\cup \tilde W,(W\cup\tilde W)^c)=mc(\tilde W,\tilde W^c)$，引理成立。

也就是说，只要我们找到每一个$MC(\{u\in B|a_u\leq i\},\{u\in B|a_u>i\})$中的一个解，就一定可以构造一种合法的$W_1\subseteq W_2\subseteq \dots$。因此我们现在只需要关注如何快速计算这些最小割。

由于$|B|=O(n)$，因此集合划分情况最多变动$O(n)$次，只需要算$O(n)$次最小割。但图的规模是$O(n^2)$的，不能每次重来一遍。

现在我们来考虑实现最大流时的真实情况。每一次将一个点$v$从汇点集移动到源点集，也就是将$(v,t)$这条容量为$\infty$的边删除，加上$(s,v)$这条容量为$\infty$的边。考虑保留上一次的残量网络，由于$v$的入度不超过$3$，只要反向反复深度搜索每一条经过$v$的流退流后即可删除边$(v,t)$，且最多退流$O(1)$次。添加边$(s,v)$后，由于$v$出度不超过$3$，在残量网络上暴力增广，增广次数也是$O(1)$的。每一次增广或退流的复杂度为$O(n^2)$，总复杂度为$O(n^3)$。

代码：
```cpp
#include<cstdio>
#include<cstring>
#include<algorithm>
#include<vector>
using std::min;
using std::sort;
using std::vector;
const int inf=0x3f3f3f3f;
namespace mf
{
	const int N=1e5+5;
	int n,s,t,ans;
	struct edge
	{
		int v,w,inv;
		bool ex;
	};
	vector<edge> e[N];
	bool bk[N];
	inline edge &inv(edge ed)
	{
		return e[ed.v][ed.inv];
	}
	inline void add_edge(int u,int v,int w)
	{
		e[u].push_back(edge{v,w,(int)e[v].size(),1});
		e[v].push_back(edge{u,0,(int)e[u].size()-1,1});
		return;
	}
	int dfs(int x,int f)
	{
		if(x==t)
			return f;
		int tot=0,d;
		bk[x]=1;
		for(edge &ed:e[x])
			if(ed.ex&&ed.w&&!bk[ed.v]&&(d=dfs(ed.v,min(f-tot,ed.w))))
			{
				ed.w-=d;inv(ed).w+=d;
				if((tot+=d)==f)
					break;
			}
		return tot;
	}
	int idfs(int x,int f,int y)
	{
		if(x==s)
			return f;
		int tot=0,d;
		bk[x]=1;
		for(edge &ed:e[x])
			if(ed.ex&&ed.w&&!bk[ed.v]&&(x!=t||ed.v==y)&&(d=idfs(ed.v,min(f-tot,ed.w),y)))
			{
				ed.w-=d;inv(ed).w+=d;
				if((tot+=d)==f)
					break;
			}
		return tot;
	}
	inline void shrink(int x)
	{
		int f;
		while(memset(bk+1,0,sizeof(bool)*n),f=idfs(t,inf,x))
			ans-=f;
		for(edge &ed:e[x])
			if(ed.v==t)
				ed.ex=0,inv(ed).ex=0;
		add_edge(s,x,inf);
		while(memset(bk+1,0,sizeof(bool)*n),f=dfs(s,inf))
			ans+=f;
		return;
	}
}
const int N=205;
int n,cur;
long long ans;
int a[N][N],b[N*N];
vector<int> V;
inline int id(int x,int y)
{
	return (x-1)*n+y;
}
inline bool cmp(int x,int y)
{
	return b[x]<b[y];
}
signed main()
{
	register int i,j;
	scanf("%d",&n);
	for(i=1;i<=n;i++)
		for(j=1;j<=n;j++)
			scanf("%d",&a[i][j]),b[id(i,j)]=a[i][j];
	mf::n=n*n+2;mf::s=n*n+1;mf::t=n*n+2;
	for(i=1;i<=n;i++)
		for(j=1;j<=n;j++)
			if(a[i][j]>0)
				V.push_back(id(i,j));
	sort(V.begin(),V.end(),cmp);
	for(i=1;i<=n;i++)
		for(j=1;j<=n;j++)
			if(a[i][j]>0)
				mf::add_edge(id(i,j),mf::t,inf);
	for(i=1;i<=n;i++)
		for(j=1;j<n;j++)
			if((~a[i][j])&&(~a[i][j+1]))
			{
				mf::add_edge(id(i,j),id(i,j+1),1);
				mf::add_edge(id(i,j+1),id(i,j),1);
			}
	for(i=1;i<n;i++)
		for(j=1;j<=n;j++)
			if((~a[i][j])&&(~a[i+1][j]))
			{
				mf::add_edge(id(i,j),id(i+1,j),1);
				mf::add_edge(id(i+1,j),id(i,j),1);
			}
	for(int x:V)
	{
		ans+=(long long)(b[x]-cur)*mf::ans;
		mf::shrink(x);cur=b[x];
	}
	printf("%lld\n",ans);
	return 0;
}
```