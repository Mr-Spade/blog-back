let oi_postdata=
[
    ["四边形不等式","本文介绍了四边形不等式及其应用，证明部分尚未完成。","2018-09-12"],
    ["一般图最大匹配——带花树","本文介绍了带花树的原理，并证明了带花树的复杂度，但是因为神秘的原因没有给出代码。","2018-09-12"],
    ["网络最大流——最高标号预流推进","本文介绍了最高标号预流推进算法的过程，优化，并给出了代码。但是代码中似乎存在神秘的bug，请小心食用。","2018-09-12"],
    ["min-max容斥-最值反演及其推广","介绍了min-max容斥，并给出了其证明。随后，文章还给出了min-max容斥的推广形式。","2018-09-12"],
    ["二项式反演","介绍并证明了二项式反演，给出了一些初步应用。","2018-09-13"],
    ["斯特林数与斯特林反演","介绍了第一类和第二类斯特林数，并给出了它们的平方递推公式，以及可以利用FFT加速的快速求解一行的技巧。此外，本文还介绍了斯特林反演。最后，本文附上了重构之前的历史版本。","2019-02-26"],
    ["从分治乘法到快速沃尔什变换及其反演","本文介绍了一种从分治乘法的视角来推导集合幂级数卷积计算的视角，从而得到FWT是分治乘法的直接推论的结论。最后，本文还结合卷积定理给出了看待FWT的另一种方式。","2019-01-01"],
    ["伸展树（Splay）复杂度证明","本文用势能分析法证明了Splay的复杂度。","2018-09-27"]
];

oi_postdata.sort(function(a,b)
{
    if(parseInt(a[2].substr(0,4))!==parseInt(b[2].substr(0,4)))
        return parseInt(a[2].substr(0,4))-parseInt(b[2].substr(0,4));
    if(parseInt(a[2].substr(5,2))!==parseInt(b[2].substr(5,2)))
        return parseInt(a[2].substr(5,2))-parseInt(b[2].substr(5,2));
    return parseInt(a[2].substr(8,2))-parseInt(b[2].substr(8,2));
});//使博文按照最后修改日期排序（后续修改博文，只要改对应日期即可刷新顺序）（排序似乎是稳定的）