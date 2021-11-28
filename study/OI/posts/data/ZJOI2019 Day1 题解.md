想要继续向前，就从克服内心的恐惧开始。

### 麻将

##### 题意

在麻将中，我们称点数连续的三张牌或三张点数一样的成为面子，称两张点数一样的牌为对子。一副十四张麻将牌的胡牌条件是可以分成四个面子和一个对子或者分成七个互不相同的对子。现在规定麻将牌的点数为$1\sim n$，每种点数都有四张牌。现在给出你初始的十三张手牌，假设剩余的牌以随机的顺序发到你的手上，求期望发多少张牌以后你的手牌中存在一组牌可以胡牌。注意点数相同的牌两两之间也视为不同的。$5\leq n\leq 100$。答案对$998244353$取模。

##### 题解

首先对题目要求的期望进行转化。假设$p_i$表示发了$i$张牌以后依然没有能够胡的一组牌的概率，那么答案等价于$\sum_{i=0}^{4n-13}p_i$，这是通过将贡献分步计算得出的。

那么考虑将概率转化为更好算的方案数，最后只要令$p_i$除以${4n-13\choose i}i!$，即放牌的方案数即可。

那么如何在给定一副牌的情况下，判段它是否存在一个子集是否可以胡牌呢？

我们可以用一个简单的$dp$来表示这个过程。对于七个对子的情况，只需记$cnt_i$表示点数$\leq i$的牌中牌数$\geq 2$的点数数量即可。对于四个面子加一个对子的情况，我们记$f_{i,0/1,j,k}$表示只考虑点数$\leq i$的牌，在是否加了对子，准备组成$j$副形如$i-1,i,i+1$的面子和$k$副形如$i,i+1,i+2$的面子的情况下，剩下的牌最多能够组成多少面子。（如果当前已经没有足够的牌满足这个要求，那么设为$-1$即可）。

考虑组成了$3$副点数连续的面子的情况，这可以拆成三副点数相同的面子，因此上面的$f$数组中的$j,k$的上界设为$2$就够了。又可以发现因为只需要$4$个面子，因此所有$f_{i,0/1,j,k}$的值都可以对$4$取$\min$，同理$cnt_i$可以对$7$取$\min$。同时可以发现判断一个状态是否可以胡牌也是很简单的，只需要看是否有$f_{i,0/1,j,k}=4$或者$cnt_i=7$即可。

考虑这个状态的转移，可以枚举点数为$i+1$的牌数,设为$c$，则$f_{i+1,0,j,k}$可以通过合法的$f_{i,0,l,j}+l+\lfloor\frac{c-l-j-k}{3}\rfloor$转移过来，$f_{i+1,1,j,k}$可以通过合法的$f_{i,1,l,j}+l+\lfloor\frac{c-l-j-k}{3}\rfloor$转移过来，如果将点数为$i+1$的取出两张做对子，$f_{i+1,1,j,k}$也可以通过合法的$f_{i,0,l,j}+l+\lfloor\frac{c-2-l-j-k}{3}\rfloor$转移过来。$cnt$的转移则更简单,只要令$cnt_{i+1}=cnt_i+[c\geq 2]$就可以了。

我们可以发现，状态的转移和$i$没有任何关系，只要知道了$f_i$的共$2\times 3\times 3=18$个数、$cnt_i$以及下一种点数的牌数，我们就可以得到$f_{i+1}$以及$cnt_{i+1}$。于是我们不妨将某种确定的$f_i$和$cnt_i$打包为一个结构体$cell$。在发现$cell$的状态十分简洁，并且每个数的取值都是有上下界的以后，我们不禁想到：合法的$cell$的数量会不会非常有限呢？为了验证这一点，我们可以从空状态开始，每次枚举下一种点数的牌数，就可以得到它的所有后继状态。我们可以进行一次$bfs$（可以用$set$判重）以找出所有空状态可以到达的状态。

最终我们可以发现，合法的状态一共有$3956$个。你可以用这个数字来检验程序的正确性。

既然状态数这么少，那么我们不妨预处理好所有的状态对应的转移。为了减小常数，我们不妨对每个不同的状态标一下号。于是我们就可以预处理数组$trans$，其中$trans_{x,i}$表示在标号为$x$的状态下，如果下一种点数的牌数为$i$，将会转移到标号为多少的状态。同时预处理数组$book$，其中$book_x$表示状态$x$是否可以胡牌。

最终我们就可以计算数组$p$了，这可以通过一个“更大”的$dp$来实现。我们设$g_{i,j,k}$表示只考虑点数$\leq i$的牌，当前的状态标号为$j$，点数$\leq i$的牌中除了初始给定的牌以外还选了$k$张牌的方案数。不难发现$p_k=\sum_{book_j=0}g_{n,j,k}$。

我们设$cnt_i$（注意这和之前的$cnt$完全没关系）表示初始时刻你的手牌中点数为$i$的牌的数量，来考虑大$dp$的转移。可以发现我们有：

$$g_{i,j,k}{4-cnt_{i+1}\choose c}c!{k+c\choose c}\to g_{i+1,trans_{j,cnt_{i+1}+c},k+c}$$

这样的关系，左边的系数的组合意义为，确定哪些牌作为拿到的牌，并决定这些牌的相对顺序，最后用隔板法插入到已有的牌中。

最终我们就得到了答案。复杂度是$O(3956*n^2)$，可以通过本题。实现的时候为了节省空间大$dp$可以使用滚动数组。

代码：

```cpp
/*
There is no end though there is a start in space. ---Infinity.
It has own power, it ruins, and it goes though there is a start also in the star. ---Finite.
Only the person who was wisdom can read the most foolish one from the history.
The fish that lives in the sea doesn't know the world in the land. 
It also ruins and goes if they have wisdom.
It is funnier that man exceeds the speed of light than fish start living in the land.
It can be said that this is an final ultimatum from the god to the people who can fight.
*/ 
#include<cstdio>
#include<cstring>
#include<algorithm>
#include<map>
#include<queue>
using std::max;
using std::min;
using std::map;
using std::queue;
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
struct epc
{
	int a[2][3][3];
	int cnt;
	epc()
	{
		memset(a,-1,sizeof(a));
		a[0][0][0]=0;
		cnt=0;
		return;
	}
	inline bool operator<(const epc &th) const
	{
		register int i,j,k;
		for(i=0;i<2;i++)
			for(j=0;j<3;j++)
				for(k=0;k<3;k++)
					if(a[i][j][k]!=th.a[i][j][k])
						return a[i][j][k]<th.a[i][j][k];
		return cnt<th.cnt;
	}
	inline epc trans(int c)
	{
		register int i,j,k;
		epc res;
		memset(res.a,-1,sizeof(res.a));
		res.cnt=cnt+(c>=2);
		res.cnt=min(res.cnt,7);
		for(i=0;i<3;i++)
			for(j=0;j<3;j++)
				for(k=0;k<3;k++)
					if(k+i+j<=c)
					{
						if(a[0][k][i]!=-1)
							res.a[0][i][j]=max(res.a[0][i][j],a[0][k][i]+k+(c-(k+i+j))/3);
						if(a[1][k][i]!=-1)
							res.a[1][i][j]=max(res.a[1][i][j],a[1][k][i]+k+(c-(k+i+j))/3);
					}
		if(c>=2)
			for(i=0;i<3;i++)
				for(j=0;j<3;j++)
					for(k=0;k<3;k++)
						if(k+i+j<=c-2&&a[0][k][i]!=-1)
							res.a[1][i][j]=max(res.a[1][i][j],a[0][k][i]+k+(c-2-(k+i+j))/3);
		for(i=0;i<2;i++)
			for(j=0;j<3;j++)
				for(k=0;k<3;k++)
					res.a[i][j][k]=min(res.a[i][j][k],4);
		return res;
	}
	inline bool win()
	{
		bool f=0;
		register int i,j;
		for(i=0;i<3;i++)
			for(j=0;j<3;j++)
				f|=a[1][i][j]==4;
		f|=cnt==7;
		return f;
	}
};
const int M=4005;
map<epc,int> id;
int tot;
int trans[M][5];
bool book[M];
queue<epc> Q;
inline void bfs()
{
	epc x,y;
	register int i;
	id[epc()]=++tot;book[tot]=epc().win();Q.push(epc());
	while(!Q.empty())
	{
		x=Q.front();Q.pop();
		for(i=0;i<5;i++)
		{
			y=x.trans(i);
			if(id.find(y)==id.end())
				id[y]=++tot,book[tot]=y.win(),Q.push(y);
			trans[id[x]][i]=id[y];
		}
	}
	return;
}
const int N=105;
int n,tans;
int cnt[N];
int dp[2][M][N*4];
int fact[N*4],ifact[N*4];
int ans[N*4];
inline int choose(int n,int m)
{
	return mul(fact[n],mul(ifact[m],ifact[n-m]));
}
signed main()
{
	bfs();
	int x;
	register int i,j,k,c;
	scanf("%d",&n);
	for(i=0;i<13;i++)
		scanf("%d%*d",&x),cnt[x]++;
	fact[0]=1;
	for(i=1;i<=4*n;i++)
		fact[i]=mul(fact[i-1],i);
	ifact[4*n]=qpow(fact[4*n],mod-2);
	for(i=4*n-1;i>=0;i--)
		ifact[i]=mul(ifact[i+1],i+1);
	dp[0][1][0]=1;
	for(i=0;i<n;i++)
	{
		for(j=1;j<=tot;j++)
			for(k=0;k<=4*(i+1);k++)
				dp[(i+1)&1][j][k]=0;
		for(j=1;j<=tot;j++)
			for(k=0;k<=4*i;k++)
				if(dp[i&1][j][k])
					for(c=0;c<=4-cnt[i+1];c++)
						dp[(i+1)&1][trans[j][cnt[i+1]+c]][k+c]=add(dp[(i+1)&1][trans[j][cnt[i+1]+c]][k+c],mul(dp[i&1][j][k],mul(mul(choose(4-cnt[i+1],c),fact[c]),choose(k+c,c))));
	}
	for(j=1;j<=tot;j++)
		if(!book[j])
			for(k=0;k<=4*n-13;k++)
				ans[k]=add(ans[k],dp[n&1][j][k]);
	for(k=0;k<=4*n-13;k++)
		ans[k]=mul(ans[k],qpow(mul(choose(4*n-13,k),fact[k]),mod-2));
	for(k=0;k<=4*n-13;k++)
		tans=add(tans,ans[k]);
	printf("%d\n",tans);
	return 0;
}
```

### 线段树

###### 题意

你有一棵按照常规方法建立的$[1,n]$的线段树，每个节点上有一个$0/1$变量$tag$。每次可以对区间$[l,r]$进行修改，修改的方法为：设定位到的节点集合为$S$，则将$S$的所有祖先的$tag$按深度顺序下传。下传规则为：如果$tag$为$1$，则将儿子的$tag$设为$1$，并将自己的$tag$设为$0$。最后将所有$S$中点的$tag$设为$1$。现在$m$个操作，分为两种：

$1$、将当前的每棵线段树复制一份，并对所有复制品执行对给定区间$[l,r]$的修改。

$2$、询问所有线段树$tag$为$1$的节点数目。

$n,m\leq 10^5$。答案对$998244353$取模。

##### 题解

不妨将操作一看作是每次有$\frac{1}{2}$的概率对这棵线段树进行操作。这对我们接下来的考虑会方便一些。

于是我们对于线段树的每个节点，维护两个值$p$，$q$，表示这个节点$tag$为$1$的概率以及这个点到根的路径上有至少一个点$tag$为$1$的概率。那么我们只需要维护变量$sum$表示所有节点的$p$的和即可。假设已经做了$cnt$次$1$操作，那么询问的答案就是$sum*2^{cnt}$。

考虑每一次修改对每个节点的影响。我们可以将节点分为$5$类：

$1$、是$S$的祖先。

$2$、是$S$中的节点。

$3、$不是$S$中的节点，但它的父亲是$S$的祖先。

$4$、$2$类点的后代。

$5$、$3$类点的后代。

我们分别考虑影响：

$1$、比较显然，由于标记一定都被下传了，因此$p\to \frac{p}{2}$，$q\to\frac{q}{2}$即可。

$2$、也比较简单，由于一定被打了标记，因此$p\to\frac{p+1}{2}$，$q\to\frac{q+1}{2}$即可。

$3$、考虑在操作后，这类点会有标记当且仅当其祖先或者自己有标记。操作后这个点以及它的祖先至少有一个有标记的概率是不变的，因此$p\to\frac{p+q}{2}$，$q\to q$。

$4$、这个操作对于$p$是没有影响的，但是由于它的祖先一定被打了标记，因此$p\to p$，$q\to \frac{q+1}{2}$。

$5$、嗯，似乎没有任何影响呢。$p\to p$，$q\to q$。

可以发现，前$3$类点的数目都不超过$O(\log n)$个，因此可以暴力修改，记得需要维护$sum$。唯一比较麻烦的是$4$类点。但由于修改比较单一，可以用懒标记实现。只需对每个点维护懒标记$k$、$b$，表示其所有后代的$q$实际上都为$kq+b$即可。并且这类操作对$sum$的值也没有影响。

于是直接实现这些操作就可以了。复杂度$O(n\log n)$。

代码：

```cpp
/*
There is no end though there is a start in space. ---Infinity.
It has own power, it ruins, and it goes though there is a start also in the star. ---Finite.
Only the person who was wisdom can read the most foolish one from the history.
The fish that lives in the sea doesn't know the world in the land. 
It also ruins and goes if they have wisdom.
It is funnier that man exceeds the speed of light than fish start living in the land.
It can be said that this is an final ultimatum from the god to the people who can fight.
*/ 
#include<cstdio>
const int mod=998244353,inv2=(mod+1)/2;
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
const int N=1e5+5;
int sum;
int p[N<<2],q[N<<2],k[N<<2],b[N<<2];
inline void push_down(int x)
{
	q[x<<1]=add(mul(k[x],q[x<<1]),b[x]);
	b[x<<1]=add(mul(k[x],b[x<<1]),b[x]);
	k[x<<1]=mul(k[x],k[x<<1]);
	q[x<<1|1]=add(mul(k[x],q[x<<1|1]),b[x]);
	b[x<<1|1]=add(mul(k[x],b[x<<1|1]),b[x]);
	k[x<<1|1]=mul(k[x],k[x<<1|1]);
	k[x]=1;b[x]=0;
	return;
}
void modify(int x,int lp,int rp,int l,int r)
{
	if(lp==l&&rp==r)
	{
		sum=sub(sum,p[x]);
		p[x]=add(mul(inv2,p[x]),inv2);
		q[x]=add(mul(inv2,q[x]),inv2);
		b[x]=add(mul(inv2,b[x]),inv2);
		k[x]=mul(inv2,k[x]);
		sum=add(sum,p[x]);
		return;
	}
	push_down(x);
	int mid=(lp+rp)>>1;
	sum=sub(sum,p[x]);
	p[x]=mul(inv2,p[x]);
	q[x]=mul(inv2,q[x]);
	sum=add(sum,p[x]);
	if(r<=mid)
	{
		modify(x<<1,lp,mid,l,r);
		sum=sub(sum,p[x<<1|1]);
		p[x<<1|1]=mul(inv2,add(p[x<<1|1],q[x<<1|1]));
		sum=add(sum,p[x<<1|1]);
	}
	else if(l>=mid+1)
	{
		sum=sub(sum,p[x<<1]);
		p[x<<1]=mul(inv2,add(p[x<<1],q[x<<1]));
		sum=add(sum,p[x<<1]);
		modify(x<<1|1,mid+1,rp,l,r);
	}
	else
		modify(x<<1,lp,mid,l,mid),modify(x<<1|1,mid+1,rp,mid+1,r);
	return;
}
void build(int x,int lp,int rp)
{
	k[x]=1;
	if(lp==rp)
		return;
	int mid=(lp+rp)>>1;
	build(x<<1,lp,mid);
	build(x<<1|1,mid+1,rp);
	return;
}
int n,m;
signed main()
{
	int opt,l,r,w=1;
	scanf("%d%d",&n,&m);
	build(1,1,n);
	while(m--)
		if(scanf("%d",&opt),opt==1)
			scanf("%d%d",&l,&r),modify(1,1,n,l,r),w=mul(w,2);
		else
			printf("%d\n",mul(w,sum));
	return 0;
}
```

### Minimax搜索

##### 题意

有一颗$n$个点的数，标号为$1\sim n$，根节点为$1$，深度为$1$。每个点有一个权值。叶子的权值是它的标号，否则，假如其深度为奇数，那么其权值为所有儿子权值的$\max$，否则为所有儿子权值的$\min$。一个叶子节点的集合的权值定义为：对于一个$w$，$f_w$表示这个集合内的节点的权值可以修改为任意和原来权值的差的绝对值不超过$w$的整数，是否可以改变根节点的权值。那么这个叶子节点集合的权值为最小的使得$f_w=1$的$w$。特别的，假如不存在这样的$w$，那么这个集合的权值为$n$。现在给定$L$，$R$，问对于所有整数$i\in[L,R]$，权值为$i$的非空叶子集合的数目。

$n\leq 2*10^5,0\leq L\leq R\leq n$。答案对$998244353$取模。

##### 题解

我们首先考虑如何计算对于$i=0,1,2,\dots,n$，权值$\leq i$的集合数目。最后通过差分我们就得到了答案。

那么首先考虑如何对于一个特定的$w$，计算权值$\leq w$的集合数目。

首先我们可以通过一遍$dfs$将根节点的权值计算出来，假设其为$W$。由于叶子节点的权值互不相同，因此权值和根相同的叶子是唯一的。不难发现如果我们修改了这个叶子，根节点的答案一定会变化。因此只要$w>0$，那么所有包含这个叶子的集合的权值都是$\leq w$的，可以直接计入贡献。现在我们只需要考虑不包含这个叶子的集合。

我们可以发现，想要修改根的权值，有让它变大和让它变小两种选择。对于让它变大的情况，与其让它变得非常大，不如让它变成$W+1$，因为这一定不会比变得非常大更困难。于是我们可以发现，修改所有权值$>W$的叶子都是没有作用的，我们只要知道如果让这个集合中能够变成$W+1$的权值$<W$的叶子都变成$W+1$以后，判断一下根节点是否为$W+1$，就可以知道这个集合的权值是否$\leq w$。对于让根节点权值变小的情况也是同理的。那么可以发现，一个叶子集合的权值$\leq w$意味着可以用集合中$<W$的叶子让根变成$W+1$或者可以用集合中$>W$的叶子让根变成$W-1$。为了更方便的计算我们可以用总方案数减去两个要求都不满足的方案。那么我们只需要知道有多少个只包含$<W$的叶子的集合是不合法的，以及有多少个只包含$>W$的叶子的集合是不合法的，将两个答案相乘即可。而这个不合法的方案数又可以用总数减去合法的方案数得出来。

由于两者是相似的，因此我们以计算有多少个只包含$<W$的叶子的集合是合法的为例。

为了在计算中更加方便，我们将方案数转化为概率，令每个$<W$的叶节点有$\frac{1}{2}$的概率出现在集合中。那么只要让最终答案乘以$2^{<W的叶节点数目}$即可。令$f_x$表示$x$的权值能够$>W$的概率，考虑如何转移。

首先是$x$是$<W$的叶节点的情况，那么只要判断：如果$x+w>W$，那么$f_x=\frac{1}{2}$，否则$f_x=0$。

$x$是$>W$的叶节点，那么$f_x=1$。

假如这是一个深度为奇数的点，那么它的权值可以$>W$的概率就是它有任意一个儿子的权值可以$>W$的概率。容斥一下，可以用$1$，减去所有儿子都不可以$>W$的概率。于是有：

$$f_x=1-\Big(\prod_{y\in son_x}1-f_y\Big)$$

否则，这是一个深度为偶数的点，那么它的权值可以$>W$的概率就是它所有儿子的权值都可以$>W$的概率。于是有：

$$f_x=\prod_{y\in son_x}f_y$$

我们发现两个转移的形式比较相似，于是考虑进一步进行简化。我们可以设$f'_x$，当$x$的深度为奇数时，$f'_x=1-f_x$，否则$f'_x=f_x$。不难发现此时我们的转移式就都变成了：

$$f'_x=\prod_{y\in son_x}1-f'_y$$

变得更加简单。于是我们可以轻松的在$O(n)$的时间内求出对于某个特定的$w$的答案。

现在考虑快速求出所有的答案。我们发现只有当叶子节点的答案改变了，最终答案才会改变。而对于每一个叶子节点，在$w$增大的过程中只会发生最多一次改变。因此总的改变次数是$O(n)$级别的。于是我们考虑进行动态$dp$，由于$dp$过程非常简单因此可以比较容易的进行动态$dp$。用树链剖分来实现，复杂度就是$O(n\log^2 n)$。

代码：

```cpp
/*
There is no end though there is a start in space. ---Infinity.
It has own power, it ruins, and it goes though there is a start also in the star. ---Finite.
Only the person who was wisdom can read the most foolish one from the history.
The fish that lives in the sea doesn't know the world in the land.
It also ruins and goes if they have wisdom.
It is funnier that man exceeds the speed of light than fish start living in the land.
It can be said that this is an final ultimatum from the god to the people who can fight.
*/
#include<cstdio>
#include<cstring>
#include<algorithm>
#include<functional>
#include<vector>
using std::max;
using std::min;
using std::sort;
using std::greater;
using std::vector;
const int mod=998244353,inv2=(mod+1)/2;
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
const int N=2e5+5;
struct zint
{
	int v,cnt;
	zint(int x=0)
	{
		if(x)
			v=x,cnt=0;
		else
			v=1,cnt=1;
		return;
	}
	zint(int _v,int _cnt)
	{
		v=_v;cnt=_cnt;
		return;
	}
	inline int to_int()
	{
		if(cnt)
			return 0;
		return v;
	}
	inline zint operator*(const zint &th)
	{
		return zint(mul(v,th.v),cnt+th.cnt);
	}
	inline zint operator/(const zint &th)
	{
		return zint(mul(v,qpow(th.v,mod-2)),cnt-th.cnt);
	}
};
struct epc
{
	int k,b;
	epc(int _k=1,int _b=0)
	{
		k=_k;b=_b;
		return;
	}
	inline epc operator*(const epc &th)
	{
		return epc{mul(th.k,k),add(mul(th.b,k),b)};
	}
}I=epc();
namespace zkw
{
	int M;
	epc sgt[N<<2];
	inline void init(int n)
	{
		for(M=1;M<=n;M<<=1);
		return;
	}
	inline void modify(int x,epc k)
	{
		sgt[M+x]=k;
		for(x=(M+x)>>1;x;x>>=1)
			sgt[x]=sgt[x<<1]*sgt[x<<1|1];
		return;
	}
	inline epc query(int l,int r)
	{
		epc lres=I,rres=I;
		for(l=M+l-1,r=M+r+1;l^r^1;l>>=1,r>>=1)
			lres=(l&1)?lres:lres*sgt[l^1],rres=(r&1)?sgt[r^1]*rres:rres;
		return lres*rres;
	}
}
int n,L,R,idx;
int isl[N],key[N];
int father[N],hson[N],size[N],deep[N];
int id[N],di[N],top[N],bot[N];
zint dp[N];
vector<int> e[N];
vector<int> low,ex,high;
int ansf[N],ansg[N],ans[N];
void dfs(int x,int father,int d)
{
	isl[x]=1;
	if(d&1)
		key[x]=0;
	else
		key[x]=n+1;
	for(int y:e[x])
		if(y!=father)
		{
			isl[x]=0;
			dfs(y,x,d+1);
			if(d&1)
				key[x]=max(key[x],key[y]);
			else
				key[x]=min(key[x],key[y]);
		}
	if(isl[x])
		key[x]=x;
	return;
}
void dfs1(int x)
{
	size[x]=1;
	deep[x]=deep[father[x]]+1;
	for(int y:e[x])
		if(y!=father[x])
			father[y]=x,dfs1(y),size[x]+=size[y],hson[x]=(size[y]>size[hson[x]]?y:hson[x]);
	return;
}
void dfs2(int x,int root)
{
	register int i;
	id[x]=++idx;di[idx]=x;top[x]=root;
	if(hson[x])
		dfs2(hson[x],root);
	else
		for(i=x;i!=father[top[x]];i=father[i])
			bot[i]=x;
	for(int y:e[x])
		if(y!=father[x]&&y!=hson[x])
			dfs2(y,y);
	return;
}
signed main()
{
	int x,y,ptr,cntl=0;
	epc e;
	register int i;
	scanf("%d%d%d",&n,&L,&R);
	for(i=1;i<=n-1;i++)
		scanf("%d%d",&x,&y),::e[x].push_back(y),::e[y].push_back(x);
	dfs(1,0,1);
	for(i=1;i<=n;i++)
		if(isl[i])
		{
			cntl++;
			if(i<key[1])
				low.push_back(i);
			else if(i==key[1])
				ex.push_back(i);
			else
				high.push_back(i);
		}
	dfs1(1);
	dfs2(1,1);
	zkw::init(n);
	for(i=1;i<=n;i++)
		if(isl[i])
			dp[i]=(key[i]>key[1])?((deep[i]&1)?0:1):((deep[i]&1)?1:0);
		else
			dp[i]=1;
	for(i=n;i>=1;i--)
	{
		zkw::modify(i,epc(sub(0,dp[di[i]].to_int()),dp[di[i]].to_int()));
		if(i>1&&top[di[i]]==di[i])
			e=zkw::query(i,id[bot[di[i]]]),dp[father[di[i]]]=dp[father[di[i]]]*sub(1,e.b);
	}
	sort(low.begin(),low.end(),greater<int>());
	ptr=0;
	for(i=0;i<n;i++)
	{
		while(ptr<(int)low.size()&&key[1]+1-low[ptr]<=i)
		{
			x=low[ptr];
			dp[x]=inv2;
			while(x)
			{
				e=zkw::query(id[top[x]],id[bot[x]]);
				if(father[top[x]])
					dp[father[top[x]]]=dp[father[top[x]]]/sub(1,e.b);
				zkw::modify(id[x],epc(sub(0,dp[x].to_int()),dp[x].to_int()));
				e=zkw::query(id[top[x]],id[bot[x]]);
				if(father[top[x]])
					dp[father[top[x]]]=dp[father[top[x]]]*sub(1,e.b);
				x=father[top[x]];
			}
			ptr++;
		}
		e=zkw::query(1,id[bot[1]]);
		ansf[i]=sub(1,e.b);
	}
	ansf[n]=1;
	for(i=1;i<=n;i++)
		if(isl[i])
			dp[i]=(key[i]<key[1])?((deep[i]&1)?1:0):((deep[i]&1)?0:1);
		else
			dp[i]=1;
	for(i=n;i>=1;i--)
	{
		zkw::modify(i,epc(sub(0,dp[di[i]].to_int()),dp[di[i]].to_int()));
		if(i>1&&top[di[i]]==di[i])
			e=zkw::query(i,id[bot[di[i]]]),dp[father[di[i]]]=dp[father[di[i]]]*sub(1,e.b);
	}
	sort(high.begin(),high.end());
	ptr=0;
	for(i=0;i<n;i++)
	{
		while(ptr<(int)high.size()&&high[ptr]-key[1]+1<=i)
		{
			x=high[ptr];
			dp[x]=inv2;
			while(x)
			{
				e=zkw::query(id[top[x]],id[bot[x]]);
				if(father[top[x]])
					dp[father[top[x]]]=dp[father[top[x]]]/sub(1,e.b);
				zkw::modify(id[x],epc(sub(0,dp[x].to_int()),dp[x].to_int()));
				e=zkw::query(id[top[x]],id[bot[x]]);
				if(father[top[x]])
					dp[father[top[x]]]=dp[father[top[x]]]*sub(1,e.b);
				x=father[top[x]];
			}
			ptr++;
		}
		e=zkw::query(1,id[bot[1]]);
		ansg[i]=e.b;
	}
	ansg[n]=1;
	for(i=0;i<=n;i++)
		ans[i]=sub(1,mul(sub(1,ansf[i]),sub(1,ansg[i])));
	x=qpow(2,cntl-1);
	for(i=0;i<=n;i++)
		ans[i]=mul(ans[i],x);
	for(i=1;i<=n;i++)
		ans[i]=add(ans[i],x);
	for(i=n;i>=1;i--)
		ans[i]=sub(ans[i],ans[i-1]);
	ans[n]=sub(ans[n],1);
	for(i=L;i<=R;i++)
		printf("%d ",ans[i]);
	putchar('\n');
	return 0;
}
```