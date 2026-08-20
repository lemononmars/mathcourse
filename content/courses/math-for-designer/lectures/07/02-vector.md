---
week: 7
order: 2
slug: "vector"
title: "Vector"
source: "tex/lecture07.tex"
---

## Motivation

Given a line segment, we want to transform it to another line segment. Have we learned this before?

:::figure 2dtransform_vector_transform — How to transform the blue line to the green line?
:::





:::figure meme_get_vectored
:::





## Rough Definition


:::definition

A **vector** is a specific quantity drawn as a line segment with an arrowhead at one end. It has an **initial point**, where it begins, and a **terminal point**, where it ends.

:::



:::definition

A vector $\vec{v}$, denoted by $\vec{v} = \langle v_1, v_2 \rangle$, can be expressed as a **column vector**
\begin{equation} \vec{v} = \begin{pmatrix}v_1
v_2\end{pmatrix} \end{equation}

:::





## Formal Definition


:::definition

Given initial point $P$ and terminal point $Q$, a vector can be represented as $\overrightarrow{PQ}$. The arrowhead on top is what indicates that it is not just a line, but a directed line segment.


Given an initial point of $ (0,0)$ and terminal point $ (a,b)$, a vector may be represented as $\begin{pmatrix}a
b\end{pmatrix}$.

:::






:::figure vector_def.png
:::






:::example

Find the position vector of the following vectors.


- The vector whose initial point is $P(2,3)$ and terminal point is $Q(6,4)$. 

- The vector whose initial point is $P(-1,2)$ and terminal point is $Q(3,-4)$. 


:::


:::solution



- $\vec{v} = \begin{pmatrix}6-2
4-3\end{pmatrix} = \begin{pmatrix}4
1\end{pmatrix}$

- $\vec{v} = \begin{pmatrix}-1-3
2-(-4)\end{pmatrix} = \begin{pmatrix}-4
6\end{pmatrix}$


:::







:::tikz TikZ diagram
\begin{tikzpicture}
\draw[gray, very thin] (-1.5,-1.5) grid (4.5,3.5);
\draw[<->] (-2,0) -- (5,0) node [pos=1, right] {$x$};
\draw[<->] (0,-2) -- (0,4) node [pos=1, above] {$y$};
\draw[->, very thick, teal] (0,0) -- (3,2) node [fill = white, fill opacity = 0.8, pos=1, above, scale = 2] {$\bv{\red{3},\blue{2}}$};
\draw[<->, dashed] (0,-0.2) -- (3,-0.2) node [pos = 0.5, below] {$\red{3}$};
\draw[<->, dashed] (3.2,0) -- (3.2,2) node [pos = 0.5, right] {$\blue{2}$};
\end{tikzpicture}
:::


*Vector $\left\langle 3,2 \right\rangle$*








:::tikz TikZ diagram
\begin{tikzpicture}
\draw[gray, very thin] (-1.5,-1.5) grid (4.5,3.5);
\draw[<->] (-2,0) -- (5,0) node [pos=1, right] {$x$};
\draw[<->] (0,-2) -- (0,4) node [pos=1, above] {$y$};
\draw[->, very thick, teal] (-1,1) -- (0,3) node [fill = white, fill opacity = 0.8, pos=1, above, scale = 2] {$\vec{u}$};
\draw[->, very thick, teal] (0,0) -- (1,2) node [fill = white, fill opacity = 0.8, pos=1, above, scale = 2] {$\vec{u}$};
\draw[->, very thick, teal] (3,-1) -- (4,1) node [fill = white, fill opacity = 0.8, pos=1, above, scale = 2] {$\vec{u}$};
\draw[->, very thick, teal] (2,1) -- (3,3) node [fill = white, fill opacity = 0.8, pos=1, above, scale = 2] {$\vec{u}$};
\end{tikzpicture}
:::


*A vector $\vec{u*$ may start at any point.}







:::tikz TikZ diagram
\begin{tikzpicture}
\draw[<->] (0,0) -- (5,0) node [right] {$x$};
\draw[<->] (0,0) -- (-2,-2) node [below left] {$y$};
\draw[<->] (0,0) -- (0,3) node [below left] {$z$};
\draw[->, very thick] (0,0) -- (2.59,1.59) node [above, scale = 2] {$\bv{\red{4},\blue{2},\color{teal}{3}}$};
\draw[->, dashed, red] (0,0) -- (4,0) node [pos = 0.3, below] {4};
\draw[->, dashed, blue] (4,0) -- (2.59,-1.41) node [pos = 0.5, below right] {2};
\draw[->, dashed, teal] (2.59,-1.41) -- (2.59, 1.59) node [pos = 0.8, right] {3};
\end{tikzpicture}
:::


*A 3-dimentional vector $\left\langle 4,2,3 \right\rangle$*
