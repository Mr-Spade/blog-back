[题目链接][1]

神题。

题意：给定一个长度为$10^5$的幂级数$a$，将卷积的下标运算定义为十进制下的不进位加法，求$a^k$模$2^{58}$的结果。$k\leq 10^9$。

题解：

考虑在复数域下的做法，那么根据卷积的复合只要将$a$看作是$5$维的、每一维长度为$10$的幂级数，对每一维做长度为$10$的循环卷积即可。然而现在是取模甚至不是对质数取模。那么我们需要关心两个问题：

$1$、如何解决求逆元的问题。

$2$、如何在模意义下找到$10$次单位根，即$\omega_{10}$。

第一个问题比较好解决，考虑在计算过程中，唯一需要做除法的时候就是在$\rm IDFT$之后将所有数字除以$10^5$，那么考虑到$5$的逆元是存在的，直接计算即可。现在我们的问题是要除以$2^5$。那么我们显然可以通过$\text{unsigned long long}$求得$x*2^5\bmod 2^{64}$的结果，考虑如何求出$x\bmod 2^{58}$。我们知道这样一个事实：

如果$x*2^5\bmod 2^{64}$为$y$，那么$x*2^4\bmod 2^{64}$只可能为$\frac{y}{2}$或者$\frac{y}{2}+2^{63}$，发现两者在模$2^{63}$意义下显然是等价的，于是$\frac{y}{2}$就是$x*2^4\bmod 2^{63}$，以此类推，$\frac{y}{32}$就是$x\bmod x^{59}$，虽然不知道为什么出题人要开$2^{58}$，但是我们只要再取模一下就可以得到我们想要的结果了。

现在的问题是在模意义下找到$\omega_{10}$。这个问题有些困难，但是我们可以发现$\omega_{10}^5$在模$2^{64}$意义下是存在的，即$-1$。于是我们只要知道$\omega_{10}^2=\omega_{5}$，就可以计算出$\omega_{10}$。

一个比较简单的解决办法是，我们设$x=\omega_5$，将普通的数字转化为形式幂级数。这样做虽然可以，但是在相乘的过程中显然次数会非常爆炸。但是我们同时可以注意到一个简单的事实：$\omega_5^5=1$，即$x^5-1=0$，也就是说我们的形式幂级数中$x^5-1$的倍数值为$0$，因此其实都是不必要的。于是我们可以将形式幂级数放在模$x^5-1$的多项式环下，这样我们的次数界可以保持在$5$并且依然保证这么做的正确性。

同时我们可以发现，$x=1$时$x^5-1$的值也为$0$，这其实是不必要的。于是我们还可以将模多项式改为$\frac{x^5-1}{x-1}=1+x+x^2+x^3+x^4$，可以发现这个多项式的根只有$\omega_5,\omega_5^2,\omega_5^3,\omega_5^4$这$4$个无理数，我们接下来的解法会用到这一点。

于是我们将模$1+x+x^2+x^3+x^4$的多项式环作为一种数据类型，直接进行$\rm DFT$后计算每一项的快速幂，再进行$\rm IDFT$即可。现在我们还有最后一个疑问是得到的每一个答案中$x$、$x^2$或者$x^3$的系数会不会非$0$，如果出现这种情况似乎比较棘手。但是接下来我们可以证明这三项的系数一定是$0$。

由$\rm DFT$的正确性可知，我们计算得到的答案和$n^2$暴力的答案应该是一样的。而$n^2$暴力的答案都是整数，因此我们得到的答案实际上也必定是整数。也就是说，假如某个答案$x$、$x^2$或者$x^3$的系数有至少一个非$0$，那我们设它们分别为$a_1,a_2,a_3$，于是我们可以得知$a_1*x+a_2*x^2+a_3*x^3$一定是一个整数，设其为$y$，那么也就是说我们可以满足方程$-y+a_1*x+a_2*x^2+a_3*x^3=0$，将其因式分解为$k*\prod_i(x-r_i)$的形式，其中$k$是一个非$0$整数，$r_i$是这个方程的某个根，可以得知其次高项的系数为$-k*(\sum_i r_i)$，同时由前面的结论可知根中至少包含$\omega_5,\omega_5^2,\omega_5^3,\omega_5^4$中的$1$个，同时受次数的限制最多包含$3$个。可以发现无论怎样选取，它们相加的结果也必然是无理数，于是可证明该方程不存在。于是$a_1,a_2,a_3$都为$0$。

代码：
```cpp
#include<cstdio>
#include<cstring>
typedef unsigned long long ull;
const ull mod=1ll<<58;
const ull inv5=14757395258967641293ull;
struct complex
{
	ull a[4];
	complex(ull x=0)
	{
		a[0]=x;a[1]=a[2]=a[3]=0;
		return;
	}
	inline complex operator+(const complex &th)
	{
		complex res;
		res.a[0]=a[0]+th.a[0];
		res.a[1]=a[1]+th.a[1];
		res.a[2]=a[2]+th.a[2];
		res.a[3]=a[3]+th.a[3];
		return res;
	}
	inline complex operator-(const complex &th)
	{
		complex res;
		res.a[0]=a[0]-th.a[0];
		res.a[1]=a[1]-th.a[1];
		res.a[2]=a[2]-th.a[2];
		res.a[3]=a[3]-th.a[3];
		return res;
	}
	inline complex operator*(const complex &th)
	{
		ull b[7];
		b[0]=a[0]*th.a[0];
		b[1]=a[0]*th.a[1]+a[1]*th.a[0];
		b[2]=a[0]*th.a[2]+a[1]*th.a[1]+a[2]*th.a[0];
		b[3]=a[0]*th.a[3]+a[1]*th.a[2]+a[2]*th.a[1]+a[3]*th.a[0];
		b[4]=a[1]*th.a[3]+a[2]*th.a[2]+a[3]*th.a[1];
		b[5]=a[2]*th.a[3]+a[3]*th.a[2];
		b[6]=a[3]*th.a[3];
		b[5]-=b[6];b[4]-=b[6];b[3]-=b[6];b[2]-=b[6];b[6]=0;
		b[4]-=b[5];b[3]-=b[5];b[2]-=b[5];b[1]-=b[5];b[5]=0;
		b[3]-=b[4];b[2]-=b[4];b[1]-=b[4];b[0]-=b[4];b[4]=0;
		complex res;
		res.a[0]=b[0];res.a[1]=b[1];res.a[2]=b[2];res.a[3]=b[3];
		return res;
	}
}w10[10];
inline complex qpow(complex a,int b)
{
	complex res=w10[0];
	for(;b;a=a*a,b>>=1)
		if(b&1)
			res=res*a;
	return res;
}
inline void init()
{
	register int i;
	w10[0].a[0]=1;w10[1].a[3]=-1;
	for(i=2;i<10;i++)
		w10[i]=w10[i-1]*w10[1];
	return;
}
const int N=1e5+5;
const int pow10[]={1,10,100,1000,10000,100000,1000000};
int n;
complex a[N],b[10];
inline void hddft()
{
	register int d,i,j,k;
	for(d=0;d<5;d++)
	{
		for(i=0;i<100000;i++)
			if((i/pow10[d])%10==0)
			{
				memset(b,0,sizeof(b));
				for(j=0;j<10;j++)
					for(k=0;k<10;k++)
						b[j]=b[j]+a[i+k*pow10[d]]*w10[j*k%10];
				for(j=0;j<10;j++)
					a[i+j*pow10[d]]=b[j];
			}
	}
	return;
}
inline void hdidft()
{
	register int d,i,j,k;
	for(d=0;d<5;d++)
	{
		for(i=0;i<100000;i++)
			if((i/pow10[d])%10==0)
			{
				memset(b,0,sizeof(b));
				for(j=0;j<10;j++)
					for(k=0;k<10;k++)
						b[j]=b[j]+a[i+k*pow10[d]]*w10[(10-j*k%10)%10];
				for(j=0;j<10;j++)
					a[i+j*pow10[d]]=b[j];
			}
	}
	ull w=inv5*inv5*inv5*inv5*inv5;
	for(i=0;i<100000;i++)
		a[i]=a[i]*w;
	return;
}
signed main()
{
	int x;
	register int i;
	init();
	scanf("%d",&n);
	for(i=1;i<=n;i++)
		scanf("%d",&x),a[x].a[0]++;
	hddft();
	for(i=0;i<100000;i++)
		a[i]=qpow(a[i],n);
	hdidft();
	for(i=0;i<n;i++)
		printf("%llu\n",(a[i].a[0]/32)%mod);
	return 0;
}
```

[1]: https://codeforces.com/contest/1103/problem/E