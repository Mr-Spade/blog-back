[题目链接][1]

感觉这样的题真的称得上是鬼斧神工啊，$\text{OI}$中能多一些这样的题目就太好了。

题意：

有一个二维的三角坐标系，大概如图所示（图是从atcoder里偷下来的）：

![三角坐标系][2]

坐标系上的每个整点处都有一盏灯，初始时只有一盏灯亮着。每次可以选择三个整点$(x,y)$，$(x,y+1)$，$(x+1,y)$（即一个底边向下的正三角形），将这三盏灯的开关状态反转。现在给出若干次反转操作后所有亮着的$n$盏灯的坐标，求最初亮着的是哪一盏灯。$n\leq 10^4$，$-10^{17}\leq 坐标\leq 10^{17}$。

题解：

我们考虑将从某一盏灯开始，不断通过向下反转将在$y=c$上的灯转移到$y=c-1$上。可以发现如果我们从$(0,0)$开始向下转移$c$次，每一行的亮灯状态就是帕斯卡三角在模$2$意义下的结果，结合卢卡斯定理，可以发现$y=-c$上只有满足$0\leq x\leq c$且$x\subseteq c$的$(x,-c)$是亮的。那么不难发现此时$(0,-c)$和$(c,-c)$一定是亮的，于是我们只要将所有亮着的灯向下转移到同一条足够低的直线上，再计算出这条直线上亮着的灯中最左端和最右端的点，就可以知道原来的点是什么。

说的好听，怎么计算左右端点呢？

我们先来研究一下帕斯卡三角在模$2$意义下有什么性质。如果我们将模$2$余$1$的点看作黑点，否则看作白点，那么帕斯卡三角是长这样的（偷自维基百科）：

![帕斯卡三角][3]

可以发现这是一个类似分形的结构，同时每一个三角形的边长都是$2^k$。那么考虑从这一行的任意一个亮着的$(x,y)$开始向右移动，对于$k=60,59,\dots,0$，如果$(x,y+2^k)$是亮着的，那么移动到$(x,y+2^k)$，这相当于移动至右边的一个同构三角形的等价位置上。可以证明这一定可以移动到右端点。左端点也是类似的。判断一个点是否是亮着的也很简单，只需要$O(n)$扫描每个点即可。

~~于是我们得到了一个优秀的$O(n\log MAX)$的做法，其中$MAX$表示坐标范围。~~假的。

上面这个做法的问题在于我们无法快速找到一行中的一个会亮着的点！那么怎么高效的找到一个呢？

再考虑帕斯卡三角形的一个性质：对于第$n$行，对于$k=0,1,2$，至少存在一个$k$使得$\sum_{x\equiv k(\bmod\ 3)}{n\choose x}\equiv 1(\bmod \ 2)$，由归纳法保留上一行模$3$的和数组向下转移即可证明。假设我们可以在很快的时间里计算对于$l\leq x\leq r$且$x\equiv k(\bmod\ 3)$的$x$，$(x,-c)$是亮着的点数是奇数还是偶数，那么就可以通过二分的方法，每次选择点数是奇数的那一半继续做即可。由于左右两边的总点数是奇数因此这一半是一定存在的。

考虑怎么解决这个问题，显然在模$2$下每个点可以分开计算。那么对每个点考虑数位$dp$，状态只需要记已经确定了几位，是否受数位的限制以及当前数在模$3$意义下余多少即可，结合卢卡斯定理可以设计转移。这么做复杂度是$O(n\log MAX)$的，结合二分，我们可以在$O(n\log^2 MAX)$的时间内找到一个亮着的点。于是我们就在$O(n\log^2 MAX)$的时间内解决了问题。

代码：
```cpp
#include<cstdio>
#include<cstring>
#include<algorithm>
#include<utility>
using std::max;
using std::min;
using std::pair;
using std::make_pair;
typedef long long ll;
const int N=1e4+5;
int n;
ll x[N],y[N];
int res[3];
int dp[64][2][3];
inline void calc(ll c,ll x,ll y,ll r)
{
	ll n=x-c;
	register int i,j,k;
	r-=y;
	if(r<0)
		return res[0]=res[1]=res[2]=0,void();
	memset(dp,0,sizeof(dp));
	dp[63][1][0]=1;
	for(i=63;i>0;i--)
		if(!(n>>(i-1)&1))
		{
			for(j=0;j<3;j++)
			{
				if(dp[i][0][j])
					dp[i-1][0][(j*2)%3]^=1;
				if(dp[i][1][j])
				{
					if(r>>(i-1)&1)
						dp[i-1][0][(j*2)%3]^=1;
					else
						dp[i-1][1][(j*2)%3]^=1;
				}
			}
		}
		else
		{
			for(j=0;j<3;j++)
			{
				if(dp[i][0][j])
				{
					dp[i-1][0][(j*2)%3]^=1;
					dp[i-1][0][(j*2+1)%3]^=1;
				}
				if(dp[i][1][j])
				{
					if(r>>(i-1)&1)
						dp[i-1][0][(j*2)%3]^=1,dp[i-1][1][(j*2+1)%3]^=1;
					else
						dp[i-1][1][(j*2)%3]^=1;
				}
			}
		}
	y=(y%3+3)%3;
	res[y]=dp[0][0][0]^dp[0][1][0];
	res[(y+1)%3]=dp[0][0][1]^dp[0][1][1];
	res[(y+2)%3]=dp[0][0][2]^dp[0][1][2];
	return;
}
int lres[3],rres[3],mres[3];
inline ll epc(ll c)
{
	int k;
	ll l=-1000000000000000000ll,r=1000000000000000000ll,mid;
	register int i;
	rres[0]=rres[1]=rres[2]=0;
	for(i=1;i<=n;i++)
	{
		calc(c,x[i],y[i],r);
		rres[0]^=res[0];rres[1]^=res[1];rres[2]^=res[2];
	}
	lres[0]=lres[1]=lres[2]=0;
	for(i=0;i<3;i++)
		if(rres[i])
		{
			k=i;
			break;
		}
	while(l<r)
	{
		mid=(l+r)>>1;
		mres[0]=mres[1]=mres[2]=0;
		for(i=1;i<=n;i++)
		{
			calc(c,x[i],y[i],mid);
			mres[0]^=res[0];mres[1]^=res[1];mres[2]^=res[2];
		}
		if(mres[k]^lres[k])
			r=mid,memcpy(rres,mres,sizeof(int)*3);
		else
			l=mid+1,memcpy(lres,mres,sizeof(int)*3);
	}
	return l;
}
inline bool light(ll x,ll y)
{
	int res=0;
	ll xx,yy,n,m;
	register int i;
	for(i=1;i<=::n;i++)
	{
		xx=::x[i];yy=::y[i];
		n=xx-x;m=y-yy;
		if(m<0||m>n)
			continue;
		res^=((n|m)==n);
	}
	return res;
}
inline void solve(ll c,pair<ll,ll> &a)
{
	ll k=epc(c),lk=k,rk=k;
//	fprintf(stderr,"%lld\n",k);
	register ll i;
	for(i=1ll<<62;i;i>>=1)
		if(light(c,lk-i))
			lk-=i;
	for(i=1ll<<62;i;i>>=1)
		if(light(c,rk+i))
			rk+=i;
	a.first=c+(rk-lk);a.second=lk;
	return;
}
signed main()
{
	pair<ll,ll> a;
	register int i;
	scanf("%d",&n);
	for(i=1;i<=n;i++)
		scanf("%lld%lld",&x[i],&y[i]);
	solve(-100000000000000000,a);
	printf("%lld %lld\n",a.first,a.second);
	return 0;
}

```

[1]: https://atcoder.jp/contests/wtf19-open/tasks/wtf19_c2
[2]: https://s2.ax1x.com/2019/02/25/k5RXOU.png
[3]: https://s2.ax1x.com/2019/02/25/k5hITe.png