~~这道题告诉我们推式子的时候头要够铁。~~

### 题意

问一个$n\times m$的棋盘，摆上$n\times 2$个中国象棋的炮使其两两不能攻击的方案数，对$998244353$取模。

$(n\leq m\leq 2000)或(n\leq m\leq 100000且m-n\leq 10)$。

### 题解

~~怎么两个数据范围搞搞。~~

显然合法方案等价于每行每列炮的数量不超过$2$，那么每一行就必定放$2$个炮了。

我们记$f(n,m)$为答案，考虑如何归约到规模更小的问题。

那么我们枚举最后一行炮的个数，分三类情况：

$1$、个数为$0$，归约到$f(n,m-1)$。

$2$、个数为$2$（个数为$1$比较麻烦后面再说），那么先枚举放在这一列的是哪两行（$\times \frac{n(n-1)}{2}$），接着分类讨论这两行的另一个是否相同：

如果相同，则枚举这是哪一个$(\times (m-1))$，归约到$f(n-2,m-2)$。

如果不同，则这两行可以合并（同一行的唯一要求就是两个列不同），只要根据有序性$\times 2$即可，于是归约到$f(n-1,m-1)$。

$3$、个数为$1$，那么先枚举占了最后一列的是哪一行$(\times n)$，再枚举这一行的另一个在哪一列$(\times (m-1))$，问题就转化为$n-1$行$m-1$列，其中有一列炮的个数$\leq 1$的方案数。

那么考虑容斥，用总方案数减去这一列放了两个的方案数。前者就是$f(n-1,m-1)$，对于后者，进行与情况$2$相似的讨论，也可以进行计算。

可以发现$n>m$时$f(n,m)=0$，于是复杂度就是$O((m-n)n)$。

代码里为了方便我将$m$减去了$n$。

```cpp
#include<cstdio>
#include<cstring>
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
int n,m;
namespace solver1
{
    const int N=2005;
    int memo[N][N];
    inline void init()
    {
        memset(memo,-1,sizeof(memo));
        memo[1][0]=0;
        memo[2][0]=1;
        memo[3][0]=6;
        return;
    }
    int f(int n,int m)
    {
        if(m<0)
            return 0;
        if(n==0)
            return 1;
        if(~memo[n][m])
            return memo[n][m];
        int res=0;
        //0
        res=add(res,f(n,m-1));
        //1
        res=add(res,mul(mul(n,n+m-1),f(n-1,m)));
        if(n>=3)
            res=sub(res,mul(mul(n,n+m-1),mul(mul(mul(n-1,n-2),inv2),add(mul(n+m-2,f(n-3,m)),mul(2,f(n-2,m))))));
        //2
        if(n>=2)
            res=add(res,mul(mul(mul(n,n-1),inv2),add(mul(n+m-1,f(n-2,m)),mul(2,f(n-1,m)))));
        return memo[n][m]=res;
    }
    inline void main()
    {
        init();
        printf("%d\n",f(n,m-n));
        return;
    }
}
namespace solver2
{
    const int N=1e5+5;
    int memo[N][15];
    inline void init()
    {
        memset(memo,-1,sizeof(memo));
        memo[1][0]=0;
        memo[2][0]=1;
        memo[3][0]=6;
        return;
    }
    int f(int n,int m)
    {
        if(m<0)
            return 0;
        if(n==0)
            return 1;
        if(~memo[n][m])
            return memo[n][m];
        int res=0;
        //0
        res=add(res,f(n,m-1));
        //1
        res=add(res,mul(mul(n,n+m-1),f(n-1,m)));
        if(n>=3)
            res=sub(res,mul(mul(n,n+m-1),mul(mul(mul(n-1,n-2),inv2),add(mul(n+m-2,f(n-3,m)),mul(2,f(n-2,m))))));
        //2
        if(n>=2)
            res=add(res,mul(mul(mul(n,n-1),inv2),add(mul(n+m-1,f(n-2,m)),mul(2,f(n-1,m)))));
        return memo[n][m]=res;
    }
    inline void main()
    {
        init();
        printf("%d\n",f(n,m-n));
        return;
    }
}
signed main()
{
    scanf("%d%d",&n,&m);
    if(n<=2000&&m<=2000)
        solver1::main();
    else
        solver2::main();
    return 0;
}
```