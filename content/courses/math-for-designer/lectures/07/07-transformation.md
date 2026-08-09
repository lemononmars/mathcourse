---
week: 7
order: 7
slug: "transformation"
title: "Types of Linear Transformations"
source: "tex/lecture07.tex"
---

Notice how each of the transformations in the previous example has the form $\cvec{x}{y} \to \cvec{ax+by}{cx+dy}$. This is called a **linear transformation**.

:::remark Note

Informally, a linear transformation $T$ has two properties


- $T(x+y) = T(x) + T(y)$.

- $T(cx) = cT(x)$.

Given these properties, we can prove all the useful formulas. But we are not going into details here.

:::






## Translation


:::definition

A translation by a vector $\vec{a}$ is defined as
\[ T(\vec{v}) = \vec{v} + \vec{a}.\]
In two dimensions, we have
\[ \cvec{v_1}{v_2} \to \cvec{v_1+a_1}{v_2+a_2}.\]

:::





## Dilation (Scaling)


:::definition

A dilation by a factor $\vec{k}$ is defined as
\[ T(\vec{v}) = k \cdot \vec{v}.\]
In two dimensions, we have
\[ \cvec{v_1}{v_2} \to \cvec{kv_1}{kv_2}\]

:::

Note that dilation is the same as scaling up or down, plus reversing if $k$ is negative.




## Reflection over a point


:::definition

A reflection around a vector $\vec{a} = \cvec{a_1}{a_2}$ (or a point $(a_1, a_2)$) is defined as
\[ T(\vec{v}) = 2\vec{a} - \vec{v}.\]
In two dimensions, we have
\[ \cvec{v_1}{v_2} \to \cvec{2a_1-v_1}{2a_2-v_2}\]

:::





## Rotation

We can use trigonometry functions and some analysis to compute the formula for rotation, which is.
\[ \cvec{v_1}{v_2} \to \cvec{v_1\cos\theta - v_2\sin\theta}{v_1\sin\theta + v_2\cos\theta}\]
However, it seems impossible to express the result as a linear combination of vectors...
\[ \vec{v} \to ???\]



We can't define rotation using only vector notations. This means that we need to extent the definitions. Notice that
\begin{eq*} 
\cvec{x\cos\theta - y\sin\theta}{ x\sin\theta + y\cos\theta} &=& \cvec{x\cos\theta}{x\cos\theta} + \cvec{-y\sin\theta}{y\cos\theta} 

&=& x\cvec{\cos\theta}{\sin\theta} + y\cvec{-\sin\theta}{\cos\theta}
\end{eq*}
We'll see how to express the result neatly next week! Stay tuned!




:::exercise

Without computing or graphing, identify the following transformations.


- $\cvec{x}{y} \to \cvec{2x}{2y}$

- $\cvec{x}{y} \to \cvec{x+3}{y-2}$

- $\cvec{x}{y} \to \cvec{1-x}{1-y}$


:::
