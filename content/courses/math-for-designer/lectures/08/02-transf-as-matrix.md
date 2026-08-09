---
week: 8
order: 2
slug: "transf-as-matrix"
title: "Transformation using matrix"
source: "tex/lecture08.tex"
---

## Dilation (Scaling)

Previously, if we only use vector notations, we have
\[ \cvec{x}{y} \to k \cvec{x}{y} = \cvec{kx}{ky},\]
which scales both coordinates by the same factor. Now, with matrix, we can scale each coordinate separately.
\[ \cvec{x}{y} \to \begin{pmatrix} **k** & 0 
0 & **l** \end{pmatrix} \cvec{x}{y} = \cvec{**k**x}{**l**y}\]
$**k**$ and $**l**$ are real numbers.




## Reflection over the x-axis and y-axis

A reflection over the x-axis is
\[ \cvec{x}{y} \to \begin{pmatrix} 1 & 0 
0 & -1 \end{pmatrix} \cvec{x}{y} = \cvec{x}{-y}\]
A reflection over the y-axis is
\[ \cvec{x}{y} \to \begin{pmatrix} -1 & 0 
0 & 1 \end{pmatrix} \cvec{x}{y} = \cvec{-x}{y}\]




:::figure 2dtransform_reflection — Reflection over the x-axis (left) and over the y-axis (right)
:::





## Rotation


:::figure 2dtransform_rotation.png — The rotation around the point $O$ by angle $\alpha$
:::





## Rotation

A counterclockwise rotation around the origin by $\theta$ degree can be computed by
\[ \cvec{x}{y} \to \begin{pmatrix} \cos\theta & -\sin\theta 
\sin\theta & \cos\theta \end{pmatrix} \cvec{x}{y}.\]
A clockwise rotation around the origin by $\theta$ degree can be computed by
\[ \cvec{x}{y} \to \begin{pmatrix} \cos(-\theta) & -\sin(-\theta) 
\sin(-\theta) & \cos(-\theta) \end{pmatrix} \cvec{x}{y}.\]





:::example

Rotate the following vectors counterclockwise around the origin by $60^{\circ}$


- $\cvec{2}{0}$ 

- $\cvec{2\sqrt{3}}{2}$


:::


:::solution

Let $\theta = 60^{\circ}$. Then we have $\cos 60^{\circ} = \frac{1}{2}$ and $\sin 60^{\circ} = \frac{\sqrt{3}}{2}$. Hence, the transformation matrix is
\[\begin{pmatrix} \cos 60^{\circ}& -\sin 60^{\circ} 
\sin 60^{\circ} & \cos 60^{\circ} \end{pmatrix} = \begin{pmatrix} \frac{1}{2} & -\frac{\sqrt{3}}{2} 
\frac{\sqrt{3}}{2}& \frac{1}{2} \end{pmatrix}\]
Hence, the result of rotation is the same as the matrix-vector multiplication.

:::








:::figure 2dtransform_rotation_ex1 — Rotating $\cvec{2
:::
$ by $60^{\circ}$}{}



:::figure 2dtransform_rotation_ex2 — Rotating $\cvec{2\sqrt{3
:::
}{2}$ by $60^{\circ}$}{}






:::solution
(continued)
\begin{eq*} 
\begin{pmatrix} \red{\frac{1}{2}} & \green{-\frac{\sqrt{3}}{2}} 
\red{\frac{\sqrt{3}}{2}}& \green{\frac{1}{2}} \end{pmatrix} \cvec{2}{0} &=&2 \cvec{\red{\frac{1}{2}} }{\red{\frac{\sqrt{3}}{2}}} + 0 \cvec{\green{-\frac{\sqrt{3}}{2}}}{\green{\frac{1}{2}}} 

&=& \cvec{2 \times \frac{1}{2}}{2 \times \frac{\sqrt{3}}{2}} + \cvec{0 \times -\frac{\sqrt{3}}{2}}{0 \times \frac{1}{2}} 

&=& \cvec{1}{\sqrt{3}}
\end{eq*}

:::





:::solution
(continued)
\begin{eq*} 
\begin{pmatrix} \red{\frac{1}{2}} & \green{\frac{\sqrt{3}}{2}} 
\red{-\frac{\sqrt{3}}{2}}& \green{\frac{1}{2}} \end{pmatrix} \cvec{2\sqrt{3}}{2} &=&2\sqrt{3} \cvec{\red{\frac{1}{2}} }{\red{\frac{\sqrt{3}}{2}}} + 2 \cvec{\green{-\frac{\sqrt{3}}{2}}}{\green{\frac{1}{2}}} 

&=& \cvec{2\sqrt{3} \times \frac{1}{2}}{2\sqrt{3} \times \frac{\sqrt{3}}{2} } + \cvec{2\times -\frac{\sqrt{3}}{2}}{2 \times \frac{1}{2}} 

&=& \cvec{\sqrt{3}}{3} + \cvec{-\sqrt{3}}{1} 

&=& \cvec{\sqrt{3}-\sqrt{3}}{3+1} = \cvec{0}{4}
\end{eq*}

:::






## Shearing


:::figure 2dtransform_shear — Shearing from the blue figure to green figure.
:::





## Shearing



\[ \cvec{x}{y} \to \begin{pmatrix} 1 & **k** 
0 & 1 \end{pmatrix} \cvec{x}{y} = \cvec{x+**k**y}{y},\]

:::figure 2dtransform_shear_xaxis — Shearing parallel to the x-axis 
:::



\[ \cvec{x}{y} \to \begin{pmatrix} 1 & 0 
**k** & 1 \end{pmatrix} \cvec{x}{y} = \cvec{x}{**k**x+y}\]

:::figure 2dtransform_shear_yaxis — Shearing parallel to the y-axis
:::







## General Cases

In general, given a matrix $\begin{pmatrix} a & b 
c & d \end{pmatrix}$, the transformation
\[ \cvec{x}{y} \to \begin{pmatrix} a & b 
c & d \end{pmatrix} \cvec{x}{y} \]
is a linear transformation. Some of them are not common, and thus do not have a name.




:::exercise

Rotate the following vectors.


- $\begin{pmatrix} 2 
0 \end{pmatrix}$ counter-clockwise by $45^\circ$.

- $\begin{pmatrix} 3 
3 \end{pmatrix}$ counter-clockwise by $45^\circ$.

- $\begin{pmatrix} 2 
-1 \end{pmatrix}$ clockwise by $180^\circ$.

- $\begin{pmatrix} 4 
-5 \end{pmatrix}$ clockwise by $90^\circ$.


:::
