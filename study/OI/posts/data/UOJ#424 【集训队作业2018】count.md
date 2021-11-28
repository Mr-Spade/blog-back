### 题意

我们定义长度为$n$，每个数为$1\sim m$之间的整数且$1\sim m$都至少出现一次的序列为合法序列。再定义$pos(l,r)$表示这个序列的区间$[l,r]$之间的最大值出现的位置（如果有多个取最左端），如果两个序列$A$，$B$的所有$pos$值都相同，则$A$和$B$是同构的。问有多少不同构的合法序列。

$n,m\leq 100000$。

### 题解

首先$n<m$显然是无解的。

考虑什么样的序列是同构的，那么我们首先要有一个能方便的表示区间最大值的位置的数据结构，那就是笛卡尔树。显然只要两个序列的笛卡尔树同构，这两个序列就同构。

那么关于$m$的限制应该怎么办呢？

由于有多个相同的算在最左边，因此可以发现在笛卡尔树中，每个点的左儿子的键值都小于这个点的键值，右儿子则是小于等于。那么如果这颗笛卡尔树要是合法的，就有一个必要条件：记$len(x)$代表从根到节点$x$经过的走向左儿子的路径数量（简称为左链长度），那么对于任意的$x$，有$len(x)<m$。

接下来我们证明在$n\geq m$时这是一个充分条件。考虑用满足条件的笛卡尔树构造一个合法序列，只需要先将最长的链中每个点赋值为$m-点的深度$（根的深度为$0$），接下来不断寻找最深的没有赋值的点，将其赋值为没有出现过的数中的最小值即可。剩下的点只需要赋值为$父亲的值-1$。易证这样一定可以得到一个合法序列。

于是我们只需要求$n$个点，左链长度不超过$m-1$的二叉树个数即可。

设$f_{i,j}$表示$j$个点，左链长度不超过$i$的二叉树个数，考虑枚举左子树的大小，于是就有：

$$f_{i,j}=\sum_{k=0}^{j-1}f_{i-1,k}*f_{i,j-1-k}$$

平凡情况有$f_{0,j}=1$。

那么将上式表达为卷积，就有：

$$f_i=f_if_{i-1}x+1$$

等价于：

$$f_i=\frac{1}{1-f_{i-1}x}$$

直接做似乎很不可做，但是通过这个式子我们可以得到$f_i$可以分解为$\frac{a_i}{b_i}$，其中$a_i$，$b_i$是两个次数界为$O(i)$的多项式，那么考虑求$a_i$，$b_i$：

$$\frac{a_i}{b_i}=\frac{1}{1-\frac{a_{i-1}}{b_{i-1}}x}$$

$$\frac{a_i}{b_i}=\frac{b_{i-1}}{b_{i-1}-a_{i-1}x}$$

于是就得到$a_i=b_{i-1}$，$b_i=b_{i-1}-a_{i-1}x$，将转移关系用矩阵来表示就得到：

$$\begin{bmatrix}0 & 1\\-x & 1 \end{bmatrix}\begin{pmatrix}a_{i-1}\\b_{i-1}\end{pmatrix}=\begin{pmatrix}a_i\\b_i\end{pmatrix}$$

那么可以通过矩阵快速幂来求$a_i$，$b_i$。但是直接在矩阵中用多项式进行计算会很麻烦，因此不妨考虑用单位根代入求点值，用$\rm IDFT$插出多项式即可。复杂度$O(n\log n)$。

```cpp
#include<cstdio>
#include<cstring>
#include<algorithm>
using std::swap;
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
const int N=1e6+5;
int rev[N];
inline void ntt(int *f,int n,int p)
{
	int w,wi,u,t;
	register int i,j,k;
	for(i=0;i<n;i++)
		if(i<(rev[i]=i&1?rev[i^1]|n>>1:rev[i>>1]>>1))
			swap(f[i],f[rev[i]]);
	for(i=1;wi=qpow(qpow(3,(mod-1)/(i<<1)),p^1?mod-2:1),i<<1<=n;i<<=1)
		for(j=0;w=1,j<n;j+=i<<1)
			for(k=0;k<i;w=mul(w,wi),k++)
				u=f[j+k],t=mul(w,f[j+k+i]),f[j+k]=add(u,t),f[j+k+i]=sub(u,t);
	if(!~p)
		for(w=qpow(n,mod-2),i=0;i<n;i++)
			f[i]=mul(w,f[i]);
	return;
}
inline void poly_mul(int *f,int *g,int n)
{
	register int i;
	memset(f+n,0,sizeof(int)*n);
	memset(g+n,0,sizeof(int)*n);
	ntt(f,n<<1,1);f==g?void():ntt(g,n<<1,1);
	for(i=0;i<n<<1;i++)
		f[i]=mul(f[i],g[i]);
	ntt(f,n<<1,-1);f==g?void():ntt(g,n<<1,-1);
	return;
}
int F[N],G[N];
int _g[N];
inline void poly_inv(int *f,int n)
{
	register int i,j;
	memset(_g,0,sizeof(int)*n);
	_g[0]=qpow(f[0],mod-2);
	for(i=1;i<<1<=n;i<<=1)
	{
		memcpy(F,f,sizeof(int)*(i<<1));
		memcpy(G,_g,sizeof(int)*i);
		poly_mul(G,G,i);poly_mul(F,G,i<<1);
		for(j=0;j<i<<1;j++)
			_g[j]=sub(add(_g[j],_g[j]),F[j]);
	}
	memcpy(f,_g,sizeof(int)*n);
	return;
}
int a[2][2],b[2][2],res[2][2];
inline void matrix_qpow(int p)
{
	res[0][0]=res[1][1]=1;res[0][1]=res[1][0]=0;
	for(;p;p>>=1)
	{
		if(p&1)
		{
			b[0][0]=add(mul(res[0][0],a[0][0]),mul(res[0][1],a[1][0]));
			b[0][1]=add(mul(res[0][0],a[0][1]),mul(res[0][1],a[1][1]));
			b[1][0]=add(mul(res[1][0],a[0][0]),mul(res[1][1],a[1][0]));
			b[1][1]=add(mul(res[1][0],a[0][1]),mul(res[1][1],a[1][1]));
			memcpy(res,b,sizeof(b));
		}
		b[0][0]=add(mul(a[0][0],a[0][0]),mul(a[0][1],a[1][0]));
		b[0][1]=add(mul(a[0][0],a[0][1]),mul(a[0][1],a[1][1]));
		b[1][0]=add(mul(a[1][0],a[0][0]),mul(a[1][1],a[1][0]));
		b[1][1]=add(mul(a[1][0],a[0][1]),mul(a[1][1],a[1][1]));
		memcpy(a,b,sizeof(b));
	}
	return;
}
int n,m;
int f[N],g[N];
signed main()
{
	int _=1<<17,w=1,wi=qpow(3,(mod-1)/_);
	register int i;
	scanf("%d%d",&n,&m);
	if(n<m)
		return puts("0"),0;
	for(i=0;i<_;i++)
	{
		a[0][0]=0;a[0][1]=1;a[1][0]=sub(0,w);a[1][1]=1;
		matrix_qpow(m);
		f[i]=add(res[0][0],res[0][1]);g[i]=add(res[1][0],res[1][1]);
		w=mul(w,wi);
	}
	ntt(f,_,-1);ntt(g,_,-1);
	poly_inv(g,_);
	poly_mul(f,g,_);
	printf("%d\n",f[n]);
	return 0;
}
```