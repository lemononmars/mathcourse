---
week: 8
order: 3
slug: "composition"
title: "Composition of Transformations"
source: "tex/lecture08.tex"
---

## Motivation

Recall that a composition of dilations in one dimension can be expressed as a single dilation. For example, we have
\[ (2)(3) x = 6x\]
Likewise, a composition of any number of linear transformations can be expressed as a single transformation. [Click to see animation.](https://youtu.be/XkY2DOUCWMU?t=269)




:::figure 2dtransform_composition_intro1 — A transformation by matrix $M_1$...
:::





:::figure 2dtransform_composition_intro2 — ... followed by a transformation by matrix $M_2$
:::





:::figure 2dtransform_composition_intro3 — Is that the same as a single transformation of some matrix?
:::





## Matrix Multiplication


:::definition Matrix Multiplication

\begin{equation}
\begin{pmatrix} **a** & **b** 
**c** & **d** \end{pmatrix} \begin{pmatrix} **a'** & \orange{b'} 
**c'** & \orange{d' }\end{pmatrix}= \begin{pmatrix} **a****a'** + **b****c'** & **a**\orange{b'} +**b**\orange{d'} 
**c****a'** + **d****c'** & **c**\orange{b'} + **d**\orange{d' }\end{pmatrix}
\end{equation}
Another way to look at the computation is that the first (left) column is the product $\begin{pmatrix} **a** & **b** 
**c** & **d** \end{pmatrix} \begin{pmatrix} **a'** 
**c'**\end{pmatrix}$ and the second (right) column is $\begin{pmatrix} **a** & **b** 
**c** & **d** \end{pmatrix} \begin{pmatrix} \orange{b'} 
\orange{d' }\end{pmatrix}$.

:::






:::example

Compute $\begin{pmatrix} 1 & 2 
3 & 4 \end{pmatrix} \begin{pmatrix} 0 & 1 
-2 & 3\end{pmatrix}$

:::


:::solution

\begin{eq*}
\begin{pmatrix} **1** & **2** 
**3** & **4** \end{pmatrix} 
\begin{pmatrix} **0** & \orange{1} 
**-2** & \orange{3}\end{pmatrix}
&=& \begin{pmatrix} **1**\times **0** + **2** \times **-2** & **1**\times \orange{1} +**2** \times \orange{3} 
**3** \times **0** + **4** \times **-2** & **3** \times \orange{1} + **4** \times \orange{3 }\end{pmatrix} 

&=& \begin{pmatrix} -4 & -3 
7 & 15 \end{pmatrix}
\end{eq*}

:::




Let $A$ and $B$ be matrices. Imagine transforming a vector $\vec{v}$ by the matrix $B$ to get $B \vec{v}$, then transforming the result by the matrix $A$ to get $A (B \vec{v})$. Instead of performing two transformations, we can use the identity
\[A(B \vec{v}) = (AB) \vec{v}\]


## Composition


:::figure 2dtransform_composition — Composition of Transformations
:::






:::example

Describe the result of the following composition, both verbally in terms of transformations, and both mathematically as a matrix.


Dilation $\begin{pmatrix} 3 & 0 
0 & 3 \end{pmatrix}$ and dilation $\begin{pmatrix} 2 & 0 
0 & 2 \end{pmatrix}$.


:::


:::solution

In terms of transformation, dilating (or scaling) twice is the same as dilating once by the product of each scaling factor. In other word, the result should be a dilation by a factor of $3 \times 2 = 6$.

As a matrix, we have
\[\begin{pmatrix} 3 & 0 
0 & 3 \end{pmatrix}\begin{pmatrix} 2 & 0 
0 & 2 \end{pmatrix} = \begin{pmatrix} 6 & 0 
0 & 6 \end{pmatrix},\]
which is exactly a dilation by a factor of 6.

:::






:::example

Describe the result of the following composition, both verbally in terms of transformations, and both mathematically as a matrix.


Counterclockwise rotation by $45^{\circ} \begin{pmatrix} \tfrac{\sqrt{2}}{2} & -\tfrac{\sqrt{2}}{2} 
\tfrac{\sqrt{2}}{2} & \tfrac{\sqrt{2}}{2} \end{pmatrix}$ twice.


:::


:::solution

In terms of transformation, a sequence of ratotations is identical to a single rotation by the sum of angles. Thus, we expect the result to be a counterclockwise rotation by $45^{\circ} + 45^{\circ} = 90^{\circ}$

As a matrix, we have
\[\begin{pmatrix} \tfrac{\sqrt{2}}{2} & -\tfrac{\sqrt{2}}{2} 
\tfrac{\sqrt{2}}{2} & \tfrac{\sqrt{2}}{2} \end{pmatrix}\begin{pmatrix} \tfrac{\sqrt{2}}{2} & -\tfrac{\sqrt{2}}{2} 
\tfrac{\sqrt{2}}{2} & \tfrac{\sqrt{2}}{2} \end{pmatrix}= \begin{pmatrix} 0 & -1 
1 & 0 \end{pmatrix},\]
which is exactly a counterclockwise rotation by $90^{\circ}$.

:::





:::exercise

Describe the result of the following composition, both verbally in terms of transformations, and both mathematically as a matrix.


- Dilation $\begin{pmatrix} 4 & 0 
0 & 4 \end{pmatrix}$ and rotation by $90^{\circ} \quad \begin{pmatrix} 0 & -1
1& 0 \end{pmatrix}$

- Dilation $\begin{pmatrix} 2 & 0 
0 & 2 \end{pmatrix}$ and rotation by $45^{\circ} \quad \begin{pmatrix} \frac{\sqrt{2}}{2} & -\frac{\sqrt{2}}{2} 
\frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} \end{pmatrix}$

- Rotation by $90^{\circ} \quad \begin{pmatrix} 0 & -1 
1 & 0 \end{pmatrix}$ and rotation by $90^{\circ} \quad \begin{pmatrix} 0 & -1
1& 0 \end{pmatrix}$


:::
