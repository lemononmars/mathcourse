---
week: 12
order: 4
slug: "complex-plane"
title: "Complex plane"
source: "tex/lecture12.tex"
---

## Complex plane and rectangular form


\column{0.4\textwidth}
We can picture complex numbers on a plane: horizontal axis for the real part, vertical axis for the imaginary part.


- Point $(a,b)$ corresponds to $a+bi$.

- Example: $3-2i$ is the point $(3,-2)$.

We will call $a+bi$ a \text{rectangular form}, because $a$ and $b$ represent rectangle's width and height.
\column{0.6\textwidth}


:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
        \draw[<->] (-3.5,0) -- (3.5,0) node[right]{Re};
        \draw[<->] (0,-3.5) -- (0,3.5) node[above]{Im};
        \foreach \x in {-3,-2,-1,1,2,3} \draw (\x,0.05)--(\x,-0.05) node[below=2pt]{\small\x};
        \foreach \y in {-3,-2,-1,1,2,3} \draw (0.05,\y)--(-0.05,\y) node[left=2pt]{\small\y};
        \filldraw[black] (2,1) circle (1.5pt) node[above right]{\small $2+i$};
        \filldraw[black] (3,-2) circle (1.5pt) node[below right]{\small $3-2i$};
      \end{tikzpicture}
:::







## Modulus (length) and argument (angle)

It is very crucial to think of a complex number on the plane as a vector. Then, the addition and subtraction are defined in the same way.
\begin{eq*}
\text{vector addition: \quad } \left\langle a,b \right\rangle + \left\langle c,d \right\rangle &=& \left\langle a+c, b+d \right\rangle 

\text{complex number addition: \quad} (a+bi) + (c+di) &=& (a+c) + (b+d)i
\end{eq*}

Then, we can define the following vector components.

:::definition

For $z=a+bi$:


- Modulus (distance from origin): $|z| = \sqrt{a^2 + b^2}$.

- Argument (angle with positive real axis): $\arg(z)=\theta$ where $\tan\theta = \frac{b}{a}$. (Ignore the quadrant for now....)


:::




## Drawing a vector and labeling




:::tikz TikZ diagram
\begin{tikzpicture}[scale=1]
      \draw[->] (-1,0) -- (4,0) node[right]{Re};
      \draw[->] (0,-1) -- (0,3) node[above]{Im};
      \draw[thick,->] (0,0) -- (3,2) node[above, right]{$z=(3,2)$};
      \draw[dashed] (3,0) -- (3,2);
      \node at (1.8,0.2) {3};
      \node at (3.2,1) {2};
      \draw (0.8,0) arc (0:34:0.8) node[midway, left]{$\theta$};
    \end{tikzpicture}
:::
