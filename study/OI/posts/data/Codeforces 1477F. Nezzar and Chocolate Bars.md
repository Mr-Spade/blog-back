[好题！][1]

题意：你有一条长为$L$的线段，初始时线段上已经有$n-1$个分割点将其划分为$n$段，其中第$i$段长为$l_i$。每次在$[0,L]$中随机一个实数$r$，在线段上加入坐标为$r$的分割点，直到所有分割点将线段分割为每段长度不超过$K$的若干段。求新加入的分割点个数的期望。模$998244353$。

$n\leq 50,L,K\leq 2000$

题解：

令生成函数$f$对应的指数生成函数为$\tilde f$。

首先考虑$n=1$的情况。假设第$i$步及以内能够结束的概率为$p_i$，那么答案为$\sum_{i\geq 0}(1-p_i)$。考虑如何计算$p_i$。

显然，第$n$步及以内可以结束等价于无论是否达到要求强行做到第$n$步，此时符合要求。考虑每一步的随机都是独立的，那么随机生成的坐标点列$(z_1,z_2,\dots,z_n)$是均匀分布在$\Omega_L=\{(z_1,z_2,\dots,z_n)|0\leq z_i\leq L,i=1,2,\dots,n\}$中的，每一个特定的坐标点列$(z_1,z_2,\dots,z_n)$被生成的概率元为：

$$
\frac{\mathrm{d}z}{\idotsint_{\Omega_L}\mathrm{d}z}=\frac{\mathrm{d}z}{L^n}
$$

但从$(z_1,z_2,\dots,z_n)$中无法很好地分析是否满足$\leq K$的要求，考虑对该空间进行转化。在$\Omega_L$中的点坐标几乎都是两两不同的，将其排序，转化为$(\hat z_1,\hat z_2,\dots,\hat z_n)$，其中$0\leq \hat z_1\leq \hat z_2\leq  \cdots\leq  \hat z_n\leq L$，令$\hat \Omega_L=\{(\hat z_1,\hat z_2,\dots,\hat z_n)|0\leq \hat z_1\leq \hat z_2\leq  \cdots\leq  \hat z_n\leq L\}$，则$\hat \Omega_L$中的每个点几乎都对应$n!$个$\Omega_L$中的点，于是每个$\hat\Omega_L$中的点的概率元为$\frac{n!\mathrm{d}z}{L^n}$。

为了判断是否满足要求，进一步将$(\hat z_1,\hat z_2,\dots,\hat z_n)$唯一对应到其差分数组$(\hat z_1,\hat z_2-\hat z_1,\dots,\hat z_n-\hat z_{n-1})$，均匀分布在空间$\tilde \Omega_L=\{(\tilde z_1,\tilde z_2,\dots,\tilde z_n)|\tilde z_i\geq 0,\sum_{i=1}^n\tilde z_i\leq L\}$中，每个点的概率元仍然为$\frac{n!\mathrm{d}z}{L^n}$。顺便说明，这证明了$\idotsint_{\tilde \Omega_L}\mathrm{d}z=\frac{L^n}{n!}$。

于是在$\tilde \Omega_L$中，$(\tilde z_1,\tilde z_2,\dots,\tilde z_n)$符合要求等价于$0\leq \tilde z_i\leq K,i=1,2,\dots,n$且$0\leq L-\sum_{i=1}^nz_i\leq K$，于是我们有符合要求的概率等于$\Omega_K\cap(\tilde \Omega_L\setminus\tilde \Omega_{L-K})$中的点的概率元的和，即：

$$
p_n=\idotsint_{\Omega_K\cap(\tilde \Omega_L\setminus\tilde \Omega_{L-K})}\frac{n!\mathrm{d}z}{L^n}=\frac{n!}{L^n}\Bigg(\idotsint_{\Omega_K\cap\tilde \Omega_L}\mathrm{d}z-\idotsint_{\Omega_K\cap\tilde \Omega_{L-K}}\mathrm{d}z\Bigg)
$$

现在关注如何求出$\idotsint_{\Omega_A\cap\tilde \Omega_B}\mathrm{d}z$，定义**可重集**$\Phi_{A,S}=\{(z_1,z_2,\dots,z_n)|z_i\geq A,i\in S,z_i\geq 0,i\not\in S\}$。

容斥$\Omega_A$中$z_t\leq A$的限制，就可以将$\Omega_A$几乎完全地用若干个$\Phi_{A,S}$表示出来（除若干边界上的点以外）：

$$
\Omega_A=\sum_{S\subseteq\{1,2,\dots,n\}}(-1)^{|S|}\Phi_{A,S}
$$

于是：

$$
\idotsint_{\Omega_A\cap\tilde \Omega_B}\mathrm{d}z=\sum_{S\subseteq\{1,2,\dots,n\}}(-1)^{|S|}\idotsint_{\Phi_{A,S}\cap\tilde \Omega_B}\mathrm{d}z
$$

而对于$\Phi_{A,S}\cap\tilde \Omega_B$中的点$(z_1,z_2,\dots,z_n)$，可以将满足$i\in S$的$z_i$减去$A$，从而与$\tilde \Omega_{B-|S|A}$中的点一一对应，于是$\Phi_{A,S}\cap\tilde \Omega_B$与$\tilde \Omega_{B-|S|A}$的积分相等，由前文证明的结论可以得到：

$$
\idotsint_{\Omega_A\cap\tilde \Omega_B}\mathrm{d}z=\sum_{S\subseteq\{1,2,\dots,n\}}(-1)^{|S|}\idotsint_{\tilde \Omega_{B-|S|A}}\mathrm{d}z
$$

$$
=\sum_{i=0}^n(-1)^{i}{n\choose i}\idotsint_{\tilde \Omega_{B-iA}}\mathrm{d}z=\sum_{i=0}^{\lfloor\frac{B}{A}\rfloor}(-1)^i{n\choose i}\frac{(B-iA)^n}{n!}
$$

回代到$p_n$的表达式中，可以得到：

$$
p_n=\frac{n!}{L^n}\Bigg(\sum_{i=0}^{\lfloor\frac{L}{K}\rfloor}(-1)^i{n\choose i}\frac{(L-iK)^n}{n!}-\sum_{i=0}^{\lfloor\frac{L}{K}\rfloor-1}(-1)^i{n\choose i}\frac{(L-(i+1)K)^n}{n!}\Bigg)
$$

$$
=\sum_{i=0}^{\lfloor\frac{L}{K}\rfloor}(-1)^i{n\choose i}\Big(1-i\frac{K}{L}\Big)^n+\sum_{i=1}^{\lfloor\frac{L}{K}\rfloor}(-1)^i{n\choose i-1}\Big(1-i\frac{K}{L}\Big)^n
$$

$$
=1+\sum_{i=1}^{\lfloor\frac{L}{K}\rfloor}(-1)^i{n+1\choose i}\Big(1-i\frac{K}{L}\Big)^n
$$

于是没有初始分割点的答案就为$\sum_{i\geq 0}\sum_{j=1}^{\lfloor\frac{L}{K}\rfloor}(-1)^{j+1}{i+1\choose j}\Big(1-j\frac{K}{L}\Big)^i$，下面考虑存在初始分割点的情况。

定义$q_{i,j}=1+\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}(-1)^k{j+1\choose k}\Big(1-k\frac{K}{l_i}\Big)^j$，$Q_i=\sum_{k\geq 0}q_{i,k}\Big(\frac{l_i}{L}\Big)^kx^k$，$p_i$仍然如上定义，$P=\sum_{k\geq 0}p_kx^k$，则此时$p_i$的值为：

$$
p_i=\sum_{k_1+k_2+\dots+k_n=i}{i\choose k_1,k_2,\dots,k_n}\prod_{j=1}^n\Big(\frac{l_j}{L}\Big)^{k_j}q_{j,k_j}
$$

$$
\frac{p_i}{i!}=\sum_{k_1+k_2+\dots+k_n=i}\prod_{j=1}^n\frac{\Big(\frac{l_j}{L}\Big)^{k_j}q_{j,k_j}}{k_j!}
$$

即：

$$
\tilde P=\prod_{i=1}^n\tilde Q_i
$$

我们要求的答案是$\sum_{k\geq 0}(1-k![x^k]\tilde P)=\sum_{k\geq 0}k![x^k](e^x-\tilde P)$，那么首先考虑$\tilde Q_i$的表达式：

$$
\tilde Q_i=\sum_{j\geq 0}\frac{1}{j!}\Bigg(1+\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}(-1)^k{j+1\choose k}\Big(1-k\frac{K}{l_i}\Big)^j\Bigg)\Big(\frac{l_i}{L}\Big)^jx^j
$$

$$
=\sum_{j\geq 0}\frac{1}{j!}\Big(\frac{l_i}{L}\Big)^jx^j+\sum_{j\geq 0}\frac{1}{j!}\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}(-1)^k{j+1\choose k}\Big(\frac{l_i-kK}{L}\Big)^jx^j
$$

$$
=e^{\frac{l_i}{L}x}+\sum_{j\geq 0}\sum_{k=1}^{\min\{j+1,\lfloor\frac{l_i}{K}\rfloor\}}(-1)^k\frac{j+1}{k!(j+1-k)!}\Big(\frac{l_i-kK}{L}\Big)^jx^j
$$

$$
=e^{\frac{l_i}{L}x}+\sum_{j\geq 0}\sum_{k=1}^{\min\{j+1,\lfloor\frac{l_i}{K}\rfloor\}}(-1)^k\frac{j+1-k+k}{k!(j+1-k)!}\Big(\frac{l_i-kK}{L}\Big)^jx^j
$$

$$
=e^{\frac{l_i}{L}x}+\sum_{j\geq 0}\sum_{k=1}^{\min\{j,\lfloor\frac{l_i}{K}\rfloor\}}(-1)^k\frac{1}{k!(j-k)!}\Big(\frac{l_i-kK}{L}\Big)^jx^j+\sum_{j\geq 0}\sum_{k=1}^{\min\{j+1,\lfloor\frac{l_i}{K}\rfloor\}}(-1)^k\frac{1}{(k-1)!(j+1-k)!}\Big(\frac{l_i-kK}{L}\Big)^jx^j
$$

$$
=e^{\frac{l_i}{L}x}+\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}\frac{(-1)^k}{k!}\sum_{j\geq k}\frac{\Big(\frac{l_i-kK}{L}\Big)^j}{(j-k)!}x^j+\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}\frac{(-1)^k}{(k-1)!}\sum_{j\geq k-1}\frac{\Big(\frac{l_i-kK}{L}\Big)^j}{(j-(k-1))!}x^j
$$

$$
=e^{\frac{l_i}{L}x}+\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}\frac{(-1)^k\Big(\frac{l_i-kK}{L}\Big)^kx^k}{k!}\sum_{j\geq 0}\frac{\Big(\frac{l_i-kK}{L}\Big)^j}{j!}x^j+\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}\frac{(-1)^k\Big(\frac{l_i-kK}{L}\Big)^{k-1}x^{k-1}}{(k-1)!}\sum_{j\geq 0}\frac{\Big(\frac{l_i-kK}{L}\Big)^j}{j!}x^j
$$

$$
=e^{\frac{l_i}{L}x}+\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}\frac{(-1)^k\Big(\frac{l_i-kK}{L}\Big)^kx^k}{k!}e^{\Big(\frac{l_i-kK}{L}\Big)x}+\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}\frac{(-1)^k\Big(\frac{l_i-kK}{L}\Big)^{k-1}x^{k-1}}{(k-1)!}e^{\Big(\frac{l_i-kK}{L}\Big)x}
$$

$$
=e^{\frac{l_i}{L}x}\Bigg(1+\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}\frac{(-1)^k\Big(\frac{l_i-kK}{L}\Big)^k}{k!}x^ke^{-k\frac{K}{L}x}+\sum_{k=1}^{\lfloor\frac{l_i}{K}\rfloor}\frac{(-1)^k\Big(\frac{l_i-kK}{L}\Big)^{k-1}}{(k-1)!}x^{k-1}e^{-k\frac{K}{L}x}\Bigg)
$$

括号外的部分全部相乘，即为$e^x$，考虑括号内的部分，可以发现相乘之后可以表示为若干项$x^{k-j}e^{-k\frac{K}{L}x}$的线性组合，于是可以利用以$j,k$为下标的二维卷积计算每一项的系数，就得到了$e^x-\tilde P$的一个以若干项$x^ke^{Cx}$的线性组合表示的表达式。

最后，只需要考虑如何计算$\sum_{i\geq 0}i![x^i](x^ke^{Cx})$即可。考虑：

$$
\sum_{i\geq 0}i![x^i](x^ke^{Cx})=\sum_{i\geq 0}(i+k)!\frac{C^i}{i!}=k!\sum_{i\geq 0}{i+k\choose i}C^i
$$

令$F_k=\sum_{i\geq 0}{{i+k}\choose i}C^i$，于是：

$$
F_k=\sum_{i\geq 0}{{i+k}\choose i}C^i=\sum_{i\geq 0}\Bigg({i+k-1\choose i-1}+{i+k-1\choose i}\Bigg)C^i
$$

$$
=\sum_{i\geq 1}{i-1+k\choose i-1}C^i+\sum_{i\geq 0}{i+k-1\choose i}C^i
$$

$$
=C\cdot F_k+F_{k-1}
$$

又$F_0=\frac{1}{1-C}$，于是$F_k=\frac{1}{(1-C)^{k+1}}$，有$\sum_{i\geq 0}i![x^i](x^ke^{Cx})=\frac{k!}{(1-C)^{k+1}}$。

利用前文的分析，用分治$\rm FFT$计算二维卷积，可以在$O(nL\log nL)$的时间内解决问题。最后记得处理边界条件，如$K=l_i$的情况可能要令$0^0=0$。

[1]: https://codeforces.com/contest/1477/problem/F