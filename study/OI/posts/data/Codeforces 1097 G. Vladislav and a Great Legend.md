[题目链接][1]

一道好题。

题意：给定一棵$n$个点的树，求：

$$
\sum_{S\subseteq \{1,2,\dots,n\}}f(S)^k
$$

其中$f(S)$代表用树边将点集$S$连通需要的最少边数。$n\leq10^5$，$k\leq 200$，对$10^9+7$取模。

吐槽：比赛的时候看到这道题想到的是组合数做法，然而是$O(nk^2)$的，但可以用任意模数$\text{NTT}$优化到$O(nk\log k)$，当然由于常数巨大结果可想而知。~~可以说是第一次感受到被1e9+7支配的恐惧。~~我觉得出题人模数不出$998244353$就是为了卡这种做法...当然正解的做法还是让人心服口服并且受益良多的。

题解：首先有一种套路叫做幂转下降幂，即这个等式：

$$
x^k=\sum_{i=0}^k \begin{Bmatrix} k \\ i \end{Bmatrix}x^{\underline i}
$$

考虑它的一个等价形式：

$$
x^k=\sum_{i=0}^k \begin{Bmatrix} k \\ i \end{Bmatrix}i!{x\choose i}
$$

应用到这道题的式子中，我们要求的就是：

$$
\sum_{S\subseteq \{1,2,\dots,n\}}\sum_{i=0}^k \begin{Bmatrix} k \\ i \end{Bmatrix}i!{f(S)\choose i}
$$

考虑交换求和的顺序：

$$
\sum_{i=0}^k \begin{Bmatrix} k \\ i \end{Bmatrix}i!\Bigg(\sum_{S\subseteq \{1,2,\dots,n\}}{f(S)\choose i}\Bigg)
$$

为了方便起见，我们在下文不严谨的称连通一个点集$S$的最小边集叫做点集$S$的虚树。

从组合意义上来讲，后面的式子等价于枚举所有大小为$i$的边集，计算虚树包含这个边集的点集数目并相加得到的结果。根据这一点，我们可以进行dp。我们设答案数组$g_i=\sum_{S\subseteq \{1,2,\dots,n\}}{f(S)\choose i}$，那么只要知道$g$就很容易知道答案。

先考虑如何简化判断虚树的边的过程。首先，假如点集中所有点的$lca$就是根，那么存在一种非常简单的方法：对于每一个非根节点，假如点集至少包含一个它的子树中的点，那么它向父亲的边就会被包含。于是我们可以考虑枚举点集中所有点的$lca$，设为$x$，对于是$x$的子树的子集的所有非空点集，用上述方法来判断边数，我们不妨称这样得到的虚树为关于$x$的伪虚树。当然会有一部分不合法的，即所有点都在以$x$的某个儿子$y$的子树内，我们将关于$x$的伪虚树的贡献去掉即可。

我们设$f_{x,i}$表示所有大小为$i$的边集被多少个关于$x$的伪虚树包含。

为了方便，我们不妨在开始时将空集也计算在内，最后在去掉空集的影响，容易得知去掉空集只要在最后将$f_{x,0}$减$1$即可。

那么初始时只有$x$本身，考虑是否选择$x$，两种情况都只有$0$条边，因此可以设$f_{x,0}=2$。

接下来考虑在原来的基础上如何添加一棵以$y$为根的子树。我们先考虑如何将关于$y$的伪虚树改造成关于$x$的伪虚树。我们设辅助数组$tmp$，$tmp_i$表示所有大小为$i$的边集被多少个关于$x$的伪虚树中只含以$y$为根的子树中的点的伪虚树包含。如果是非空的子集，那么实际上就是多包含了$y$和$x$之间的边。于是我们根据边集是否包含新的这条边，得出转移$tmp_i+=f_{y,i}+f_{y,i-1}$。最后考虑空集的情况，那么$tmp_0++$。可以发现这里计算的伪虚树除空集以外都是不合法的，于是令$g_i-=tmp_i$，最后加上额外减去的空集，即$g_0++$。

接下来只要根据乘法原理将$f_x$与$tmp$合并就可以得到新的$f'_x$，转移方程为：

$$
f'_{x,i}=\sum_{j=0}^if_{x,j}*tmp_{i-j}
$$

在算完所有子树以后就得到了所有关于$x$的伪虚树的贡献，我们先去掉空集，即$f_{x,0}--$，再将贡献加入到答案数组中，即$g_i+=f_{x,i}$。

这样做的复杂度看上去是$O(nk^2)$的，但是考虑到合并$x$和$y$时，设$size_x$表示当前处理好的$x$的子树的点数，那么合并的代价实际上是$\min(k,size_x)*\min(k,size_y)$。

首先考虑若干个$<k$的子树进行合并直到合并为一个$\geq k$的子树，代价是$O(k^2)$的，最多合并成$\frac{n}{k}$个这样的，于是复杂度是$O(nk)$。

再考虑$<k$的与$\geq k$的合并，复杂度是$O(size*k)$的，那么由于每一点最多经历一次这个过程，复杂度也是$O(nk)$。

最后是两个$\geq k$的子树合并，由于只有最多$\frac{n}{k}$个这样的子树因此操作次数不超过$\frac{n}{k}$，因此复杂度是$O(nk)$。

于是最终的复杂度是$O(nk)$，降低复杂度的关键是合并的代价可以和子树大小取$\min$。

代码：
```cpp
#include<cstdio>
#include<cstring>
#include<algorithm>
#include<vector>
using std::min;
using std::vector;
const int mod=1e9+7;
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
const int N=1e5+5,K=205;
int n,k,ans;
int S[K][K],fact[K];
int size[N];
vector<int> e[N];
int f[N][K];
int tmp[K],tmp2[K];
int g[K];
void dfs(int x,int father)
{
	int kx,ky;
	register int i,j;
	f[x][0]=2;size[x]=1;
	for(auto y:e[x])
		if(y!=father)
		{
			dfs(y,x);kx=min(k,size[x]);ky=min(k,size[y]);
			memcpy(tmp,f[y],sizeof(int)*(ky+1));
			for(i=ky;i>0;i--)
				tmp[i]=add(tmp[i],tmp[i-1]);
			for(i=0;i<=ky;i++)
				g[i]=sub(g[i],tmp[i]);
			tmp[0]=add(tmp[0],1);
			memset(tmp2,0,sizeof(int)*(k+1));
			for(i=0;i<=kx;i++)
				for(j=0;j<=ky&&i+j<=k;j++)
					tmp2[i+j]=add(tmp2[i+j],mul(f[x][i],tmp[j]));
			memcpy(f[x],tmp2,sizeof(int)*(k+1));
			size[x]+=size[y];
		}
	f[x][0]=sub(f[x][0],1);
	kx=min(k,size[x]);
	for(i=0;i<=kx;i++)
		g[i]=add(g[i],f[x][i]);
	return;
}
signed main()
{
	int x,y;
	register int i,j;
	scanf("%d%d",&n,&k);
	fact[0]=1;
	for(i=1;i<=k;i++)
		fact[i]=mul(fact[i-1],i);
	S[0][0]=1;
	for(i=1;i<=k;i++)
	{
		S[i][0]=0;S[i][i]=1;
		for(j=1;j<i;j++)
			S[i][j]=add(S[i-1][j-1],mul(j,S[i-1][j]));
	}
	for(i=1;i<=n-1;i++)
	{
		scanf("%d%d",&x,&y);
		e[x].push_back(y);
		e[y].push_back(x);
	}
	dfs(1,0);
	for(i=1;i<=k;i++)
		ans=add(ans,mul(mul(S[k][i],fact[i]),g[i]));
	printf("%d\n",ans);
	return 0;
}
```

[1]: https://codeforces.com/contest/1097/problem/G