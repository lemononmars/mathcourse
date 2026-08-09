---
week: 7
order: 3
slug: "non-origin"
title: "A vector starting from any point"
source: "tex/lecture07.tex"
---

## A vector starting from a non-origin point

Sometimes a vector is given as a direction from one point to another. 


:::definition

Let $P_1(x_1, y_1)$ and $P_2(x_2, y_2)$ be points on the plane. \pa A vector starting at $P_1$ and ending at $P_2$ is denoted by $\vec{P_1P_2}$ \pa which can be computed as follows.
\begin{equation}
\overrightarrow{P_1P_2} \pa = \bv{ x_2 - x_1, y_2 - y_1}
\end{equation} \pa

:::








:::tikz TikZ diagram
\begin{tikzpicture}
\draw[gray, very thin] (-1.5,-1.5) grid (4.5,3.5);
\draw[<->] (-2,0) -- (5,0) node [pos=1, right] {$x$};
\draw[<->] (0,-2) -- (0,4) node [pos=1, above] {$y$};
\fill (-1,1) circle [radius = 0.1cm] node [scale = 1.5, below] {$P_1 = (x_1, y_1)$};
\fill (3,3) circle [radius = 0.1cm] node [scale = 1.5, above] {$P_2 = (x_2, y_2)$};
\draw[->, very thick, teal] (-1,1) -- (3,3) node [fill = white, fill opacity = 0.8, pos=0.5, above left, scale = 1.5] {$\overrightarrow{P_1P_2} = \bv{ x_2 - x_1, y_2 - y_1}$};
\draw[dashed, <->, blue] (-1,1) -- (3,1) node [below, pos =0.5] {$x_2-x_1$};
\draw[dashed, <->, red] (3,1) -- (3,3) node [right, pos=0.5] {$y_2-y_1$};
\end{tikzpicture}
:::
*A vector from $P_1$ to $P_2$*






:::example

Find the following vectors


- $From P_1(3,2)$ to $P_2(4,6)$

- $From Q_1(-1,0)$ to $Q_2(3,-2)$


:::


:::solution

Directly apply the formula.


- $\overrightarrow{P_1P_2} \pa = \bv{4-3, 6-2} \pa = \bv{1,4}$ \pa

- $\overrightarrow{Q_1Q_2} \pa = \bv{3-(-1), -2-0} \pa = \bv{4,-2}$


:::
