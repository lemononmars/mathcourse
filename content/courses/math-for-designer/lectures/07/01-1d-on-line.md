---
week: 7
order: 1
slug: "1d-on-line"
title: "1D Transformation on the Real Line"
source: "tex/lecture07.tex"
---

## Let's start simple

Suppose you have a line segment on a real line. There are only two simple transformations.


- Move the line (translation)

- Scale the line (dilation)

Denote a transformation by a function $T(x)$ where $x$ is the starting point and $T(x)$ is the point where it gets transformed to.




## Translation

A **translation** by $a$ is a function 
\[ T(x) = x + a\]

:::figure 2dtransform_1d_translation — Translating by $3$
:::





## Dilation

A **dilation** by $k$ is a function 
\[ T(x) = kx\]

:::figure 2dtransform_1d_dilation — Dilating by a factor of $3$
:::


:::figure 2dtransform_1d_dilation_negative — Dilating by a factor of $-\frac{1
:::
$}{}




## Composition of Transformations


:::definition

Let $T_1$ and $T_2$ be two transformations. We define a composition $T_1 \circ T_2$ as
\begin{equation} (T_1 \circ T_2) (x) = T_1 ( T_2 (x)) \end{equation}
The operations are performed from right to left.

:::






:::example

Define the following transformations
\[T_1(x) = 3x, T_2(x) = x+3, T_3(x) = -2x.\]
Describe the composition $T_1(T_2(T_3(x)))$ (a) by visual (b) by computation.

:::


:::solution


(a) Here.

(b) We compute the composition from right to left.
\begin{eq*}
T_3(x) &=& -2x 

T_2(T_3(x)) &=& T_2(**-2x**) = (**-2x**) + 3 = -2x+3 

T_1(T_2(T_3(x))) &=& T_1(**-2x+3**) = 3(**-2x+3**) =-6x+9 
\end{eq*}

:::





:::exercise

Describe each composition $T_1 \circ T_2$ (a) by visual, and (b) by computation.


- $T_1(x) = 2x, \quad T_2(x) = x+1$

- $T_1(x) = 2x-2, \quad T_2(x) = 1-x$


:::
