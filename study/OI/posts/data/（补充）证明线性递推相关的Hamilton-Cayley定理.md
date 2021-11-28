我很久以前曾经写过[一篇关于线性递推的矩阵分析的文章](https://www.cnblogs.com/Mr-Spade/p/9832418.html)，不过在特征多项式有重根的情况下的证明却没有具体描述，只是推锅给极小扰动。~~其实是我当时自己也一知半解。~~在大学系统接触线性代数后，我学到了完整的证明$p_A(A)=0$的方法，其中$p_A(\lambda)$表示$A$的特征多项式，放在这里供大家参考。

~~手机写公式太麻烦了，等网线寄到了在电脑上补。~~

来补了。

首先规定一个常用的矩阵表示方法。可以将一个矩阵纵横切割分为若干方块。例如$A=\left[\begin{matrix}A_{11}& A_{12}\\A_{21}&A_{22}\end{matrix}\right]$，矩阵内的四部分也是矩阵，相当于拼合在了一起。当然，同一列的矩阵必须等宽，同一行的矩阵必须等高。运算时，可以将每个小矩阵视作独立元素，按照矩阵乘法规则运算，可以验证这一算法的正确性。不过要使用这种方式，左矩阵的列分割情况和右矩阵行分割情况要相同。

令$p_A(\lambda)$表示$A$的特征多项式，$\lambda_1,\lambda_2,\dots,\lambda_n$表示该多项式的根。

命题$1$：对于$n\times n$的方阵$A$，则存在可逆矩阵$X$和上三角矩阵$U$，使得$A=X^{-1}UX$。

证明：利用数学归纳法，$n=1$时，令$X=I$即得。假设$n=k-1$时，命题成立。

考虑对$k$阶方阵$A$，先取其中一个特征值$\lambda_1$和对应的特征向量$x_1$，从$x_1$扩张出一组基$x_1,x_2,\dots,x_n$，令$X_1=\left[\begin{matrix}x_1&x_2&\dots&x_n\end{matrix}\right]=\left[\begin{matrix}x_1&X_{2}\end{matrix}\right]$，由于$X_1$可逆，存在$M=X_1^{-1}AX_1$，即$AX_1=X_1M$。那么：

$$AX_1=\left[\begin{matrix}Ax_1&AX_{2}\end{matrix}\right]=\left[\begin{matrix}\lambda_1x_1&AX_{2}\end{matrix}\right]=\left[\begin{matrix}x_1&X_{2}\end{matrix}\right]\left[\begin{matrix}\lambda_1&v^T\\ \boldsymbol 0&\tilde A\end{matrix}\right]$$

因此$M=\left[\begin{matrix}\lambda_1&v^T\\ \boldsymbol 0&\tilde A\end{matrix}\right]$，由归纳假设，存在可逆矩阵$\tilde X$，上三角矩阵$\tilde U$，使得$\tilde A=\tilde X^{-1}\tilde U\tilde X$，则：

$$M=\left[\begin{matrix}\lambda_1&v^T\\ \boldsymbol 0&\tilde X^{-1}\tilde U\tilde X\end{matrix}\right]=\left[\begin{matrix}1&\boldsymbol 0^T\\\boldsymbol 0 &\tilde X^{-1}\end{matrix}\right]\left[\begin{matrix}\lambda_1&v^T\tilde X^{-1}\\ \boldsymbol 0 &\tilde U\end{matrix}\right]\left[\begin{matrix}1&\boldsymbol 0^T \\ \boldsymbol 0 & \tilde X\end{matrix}\right]$$

注意到$\left[\begin{matrix}1&\boldsymbol 0^T\\\boldsymbol 0 &\tilde X\end{matrix}\right]^{-1}=\left[\begin{matrix}1&\boldsymbol 0^T\\\boldsymbol 0 &\tilde X^{-1}\end{matrix}\right]$，于是可以有：

$$A=X_1^{-1}\left[\begin{matrix}1&\boldsymbol 0^T\\\boldsymbol 0 &\tilde X\end{matrix}\right]^{-1}\left[\begin{matrix}\lambda_1&v^T\tilde X^{-1}\\ \boldsymbol 0 &\tilde U\end{matrix}\right]\left[\begin{matrix}1&\boldsymbol 0^T \\ \boldsymbol 0 & \tilde X\end{matrix}\right]X_1$$

令$X=\left[\begin{matrix}1&\boldsymbol 0^T \\ \boldsymbol 0 & \tilde X\end{matrix}\right]X_1$，$U=\left[\begin{matrix}\lambda_1&v^T\tilde X^{-1}\\ \boldsymbol 0 &\tilde U\end{matrix}\right]$，显然符合条件。

证毕。

命题$2$：对于上三角矩阵$U$，其对角元素恰是其特征多项式的$n$个根。

证明：只需利用行列式的展开式即可，对于$\det(\lambda I-U)$，其严格下三角元素都为$0$，因此贡献非$0$的排列只有$1,2,\dots,n$,贡献为$\prod_{i=1}^n (\lambda-U_{ii})$。证毕。

命题$3$：若$A=X^{-1}UX$如命题$1$所述，则$p_A(\lambda)=p_U(\lambda)$。

证明：$$p_U(\lambda)=\det(\lambda I-XAX^{-1})=\det( X\lambda IX^{-1}-XAX^{-1})$$$$=\det(X)\det(\lambda I-A)\det(X^{-1})=\det(\lambda I-A)=p_A(\lambda)$$

证毕。

命题$4$：若$A=X^{-1}UX$如命题$1$所述，则$p_A(A)=X^{-1}p_A(U)X$。

证明：$A^k=(X^{-1}UX)^k=X^{-1}(UXX^{-1})^{k-1}UX=X^{-1}U^kX$

对于$p_A(A)$的每一项都是如此，即得。证毕。

命题$5$：若$U$为上三角矩阵，则$p_U(U)=0$。

证明：考虑$p_U(\lambda)=\prod_{i=1}^n(\lambda-\lambda_i)$，由命题$2$，可以调换相乘顺序使$\lambda_i=U_{ii}$，则$p_U(U)=\prod_{i=1}^n(U-\lambda_i I)$。其中，第$i$个矩阵的$(i,i)$号元素为$0$。

记$B_i=U-\lambda_i I$。考虑矩阵乘法的定义，对于矩阵$\prod_{i=1}^nB_i$，其$(k_0,k_n)$号元素是若干$B_{1(k_0k_1)}*B_{2(k_1k_2)}*\dots*B_{n(k_{n-1}k_n)}$的贡献总和，可以将其中一条路径抽象为$k_0\to k_1\to\dots \to k_n$，只要证明每一条路径贡献为$0$即可。

考虑$B_i$都是上三角矩阵，因此若$i>j$，$i\to j$的贡献就是$0$，因此$k_0\to k_1\to\dots \to k_n$若想有贡献，其必须是非减的，即$k_0\leq k_1\leq \dots\leq k_n$，而$k_n-k_1\leq n-1$，不等号有$n$个，因此不可能全取小于，必有至少一个不等号取等。

假设其中一个为$k_{i-1}=k_{i}$，分三种情况：

1.$k_{i-1}=i$，则$k_{i-1}\to k_i$的转移在第$i$个矩阵$B_i$上，而$B_i$的$(i,i)$号元素为$0$。则路径的贡献是$0$。

2.$k_{i-1}\leq i-1$，此时$n>1$。考虑序列$k_0\to k_1\to \dots \to k_{i-1}$，有$k_{i-1}-k_0\leq i-2$，却有$i-1$个转移，和总体的情况类似，必有等号，可以递归考虑。

3.$k_{i-1}\geq i+1$，与情况$2$类似。

$2,3$发生时$n>1$，必不可能一直发生下去，一定会出现情况$1$。因此任意路径贡献为$0$，也就证明了命题。证毕。

命题$6$：$p_A(A)=0$

证明：若$A=X^{-1}UX$如命题$1$所述，则$p_A(A)=X^{-1}p_A(U)X=X^{-1}p_U(U)X=0$。

证毕。