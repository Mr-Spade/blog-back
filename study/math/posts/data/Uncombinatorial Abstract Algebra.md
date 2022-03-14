### semigroup

$$
\mathscr{SG}:=\{G=\langle\hat G,\cdot\rangle|\cdot \in {\hat G}^{\hat G\times \hat G}\land(\forall a,b,c\in \hat G)((a\cdot b)\cdot c)=(a\cdot(b\cdot c))\}
$$

$a\cdot b\leadsto ab$

$g\in\hat G\leadsto g\in G$

### monoid

$$
\mathscr{MN}:=\{G\in \mathscr{SG}|(\exists e\in G)(\forall g\in G)(eg=ge=g)\}
$$

$\vdash w.d.(\mathfrak{E}:G\mapsto e)$

$\blacktriangleleft (\exists e,e'\in G)(\forall g\in G)(eg=ge=g\land e'g=ge'=g)\Rightarrow e=ee'=e'\blacktriangleright$

$\mathfrak{E}(G)\leadsto e$

## group

$$
\mathscr{G}:=\{G\in \mathscr{MN}|(\forall g\in G)(\exists g'\in G)(g'g=gg'=e)\}
$$

$\vdash w.d.(\mathfrak{INV}:g\mapsto g')$

$\blacktriangleleft (\exists g_1,g_2\in G)(g_1g=gg_1=e\land g_2g=gg_2=e)\Rightarrow g_1=g_1(gg_2)=(g_1g)g_2=g_2\blacktriangleright$

$\mathfrak{INV}(g)\leadsto g^{-1}$

$\vdash (g^{-1})^{-1}=g$

$\vdash (ab)^{-1}=b^{-1}a^{-1}$

$\vdash w.d.(a^k|k\in \mathbb{Z})$

$\vdash G\in \mathscr{SG}\land (\exists e\in G)(\forall g\in G)(eg=g)\land (\forall g\in G)(\exists g'\in G)(g'g=e)\rightarrow G\in \mathscr{G}$

$\blacktriangleleft gg'=egg'=(g''g')gg'=g''(g'g)g'=g''eg'=g''g=e,ge=g(g'g)=(gg')g=eg=g\blacktriangleright$

### subgroup

$G\in\mathscr{G}\land H\in \mathscr{G}\land\hat H\subseteq \hat G\leadsto H\leq G$

$\vdash G\in \mathscr{G}\land \hat H\subseteq \hat G\land (\forall a,b\in \hat H)(ab\in \hat H\land a^{-1}\in \hat H)\rightarrow H\in \mathscr{G}$

$\vdash G\in \mathscr{G}\land \hat H\subseteq \hat G\land (\forall a,b\in \hat H)(ab^{-1}\in \hat H)\rightarrow H\in \mathscr{G}$

$\vdash G\in \mathscr{G}\land \hat H\subseteq \hat G\land|\hat H|<\infty\land (\forall a,b\in \hat H)(ab\in \hat H)\rightarrow H\in \mathscr{G}$

#### center
$C:G\mapsto \{c\in G|(\forall g\in G)(cg=gc)\}$

$\vdash C(G)\leq G$

..

$\vdash \emptyset\subsetneq \mathbf{H}\subseteq \{H|H\leq G\}\rightarrow \bigcap\mathbf{H}\leq G$

$\vdash w.d.(\langle S\rangle:=H|H\leq G\land S\subseteq \hat H\land (\forall H'\leq G)(S\subseteq \hat {H'}\rightarrow H\leq H'))$

$\vdash \widehat {\langle S\rangle}=\{\prod_{i=1}^na_i^{\varepsilon_i}|n\in \mathbb{N}^*\land a_i\in S\land \varepsilon_i\in\{\pm 1\}\}$

$\langle\{a\}\rangle\leadsto \langle a\rangle$

#### period
$o(a):=\inf\{n\in \mathbb{N}^*|a^n=e\}$

..

### coset

$\{ah|h\in H\}\leadsto aH$

$\vdash H\leq G\land g\in G\rightarrow(g\in H\leftrightarrow gH=H)$

$\vdash |aH|=|H|$

$\vdash aH\neq bH\rightarrow aH\cap bH=\emptyset$

$\blacktriangleleft aH\neq bH\land ah_1=bh_2\in aH\cap bH\\\Rightarrow b^{-1}aH\neq H\land b^{-1}a=h_2h_1^{-1}\in H\\\Rightarrow b^{-1}a\not \in H\land b^{-1}a\in H\Rightarrow !\blacktriangleright$

$G/_LH:=\{aH|a\in G\}$

$[G:H]:=|G/_LH|$

#### Lagrange theorem
$$
\fbox{$\vdash H\leq G\rightarrow |G|=|H|[G:H]$}
$$