---
week: 7
order: 4
slug: "operation"
title: "Vector Operations"
source: "tex/lecture07.tex"
---

## Vector Operations

Here are some basic vector operations using the new notation.

:::definition



- Scalar multiplication: $k\begin{pmatrix}v_1
v_2\end{pmatrix} = \begin{pmatrix}kv_1
kv_2\end{pmatrix}$

- Addition: $\begin{pmatrix}v_1
v_2\end{pmatrix} + \begin{pmatrix}u_1
u_2\end{pmatrix} = \begin{pmatrix}v_1 + u_1
v_2 + u_2\end{pmatrix}$

- Subtraction: $\begin{pmatrix}v_1
v_2\end{pmatrix} - \begin{pmatrix}u_1
u_2\end{pmatrix} = \begin{pmatrix}v_1
v_2\end{pmatrix} + \begin{pmatrix}-u_1
-u_2\end{pmatrix} = \begin{pmatrix}v_1 - u_1
v_2 - u_2\end{pmatrix}$


:::








:::tikz TikZ diagram
\begin{tikzpicture}
\draw[gray, very thin] (-1.5,-1.5) grid (4.5,3.5);
\draw[<->] (-2,0) -- (5,0) node [pos=1, right] {$x$};
\draw[<->] (0,-2) -- (0,4) node [pos=1, above] {$y$};
\draw[->, very thick, red] (0,0) -- (3,1) node [fill = white, fill opacity = 0.8, pos=0.5, below, scale = 2] {$\vec{u}$};
\draw[->, very thick, blue] (0,0) -- (1,2) node [fill = white, fill opacity = 0.8, pos=0.5, left, scale = 2] {$\vec{v}$};
\draw[->, dashed, blue] (3,1) -- (4,3) node [fill = white, fill opacity = 0.8, pos=0.5, right, scale = 2] {$\vec{v}$};
\draw[->, very thick, teal] (0,0) -- (4,3) node [fill = white, fill opacity = 0.8, pos=0.5, above, scale = 2] {$\vec{u} + \vec{v}$};
\end{tikzpicture}
:::


*Vector addition $\vec{u* + \vec{v}$}







:::tikz TikZ diagram
\begin{tikzpicture}
\draw[gray, very thin] (-1.5,-1.5) grid (4.5,3.5);
\draw[<->] (-2,0) -- (5,0) node [pos=1, right] {$x$};
\draw[<->] (0,-2) -- (0,4) node [pos=1, above] {$y$};
\draw[->, very thick, red] (0,0) -- (3,1) node [fill = white, fill opacity = 0.8, pos=0.5, above, scale = 2] {$\vec{u}$};
\draw[->, very thick, blue] (0,0) -- (1,2) node [fill = white, fill opacity = 0.8, pos=0.5, left, scale = 2] {$\vec{v}$};
\draw[->, dashed, blue] (3,1) -- (2,-1) node [fill = white, fill opacity = 0.8, pos=0.5, right, scale = 2] {$\vec{-v}$};
\draw[->, very thick, teal] (0,0) -- (2,-1) node [fill = white, fill opacity = 0.8, pos=0.5, below left, scale = 2] {$\vec{u} - \vec{v}$};
\end{tikzpicture}
:::


*Vector subtraction $\vec{u* - \vec{v}$}







:::tikz TikZ diagram
\begin{tikzpicture}[scale =0.7]
\draw[gray, very thin] (-6.5,-3.5) grid (6.5,3.5);
\draw[<->] (-7,0) -- (7,0) node [pos=1, right] {$x$};
\draw[<->] (0,-4) -- (0,4) node [pos=1, above] {$y$};
\draw[->, very thick, red!30!black] (0,0) -- (2,1) node [fill = white, fill opacity = 0.8, pos=0.5, below, scale = 2] {$\vec{u}$};
\draw[->, very thick, red!60!black] (0,0.1) -- (4,2.1) node [fill = white, fill opacity = 0.8, pos=0.75, below, scale = 2] {$2\vec{u}$};
\draw[->, very thick, red] (0,0.2) -- (6,3.2) node [fill = white, fill opacity = 0.8, pos=0.83, below, scale = 2] {$3\vec{u}$};
\draw[->, very thick, orange!30!black] (0,0) -- (-2,-1) node [fill = white, fill opacity = 0.8, pos=0.5, below, scale = 2] {$-\vec{u}$};
\draw[->, very thick, orange!60!black] (0,-0.1) -- (-4,-2.1) node [fill = white, fill opacity = 0.8, pos=0.75, below, scale = 2] {$-2\vec{u}$};
\draw[->, very thick, orange] (0,-0.2) -- (-6,-3.2) node [fill = white, fill opacity = 0.8, pos=0.83, below, scale = 2] {$-3\vec{u}$};
\end{tikzpicture}
:::


*Scalar multiplication $k\vec{u*$ when $k$ is $-3,-2,-1,1,2$ and $3$}





## Basic Properties


:::property



- Distribution: $a (\vec{v} + \vec{w}) = a\vec{v} + a\vec{w}$

- Distribution: $(a+b)\vec{v} = a\vec{v} + b\vec{v}$

- Identity: $1\vec{v} = \vec{v}$

- Define $\vec{0} = \begin{pmatrix}0
0\end{pmatrix}$. Then, we have 
\[\vec{v} + \vec{0} = \vec{0} + \vec{v} = \vec{v}\]

- $(-1)\vec{v} = -\vec{v}$

- If $\vec{v} = a \vec{w}$ then we say that $\vec{v}$ and $\vec{w}$ are parallel.


:::




\section[Norm and Unit] {Norm and Unit Vectors}





## Vector Norm

Since a vector, drawn as an arrow, has length, then we can compute it using Pythagoras' Theorem.

:::definition

The **norm** (or length) of a vector $\vec{v} = \begin{pmatrix}a
b\end{pmatrix}$ is 
\begin{equation}
\| \vec{v} \| = \sqrt{a^2+b^2}
\end{equation}

:::







:::tikz TikZ diagram
\begin{tikzpicture}
\draw[gray, very thin] (-1.5,-1.5) grid (4.5,3.5);
\draw[<->] (-2,0) -- (5,0) node [pos=1, right] {$x$};
\draw[<->] (0,-2) -- (0,4) node [pos=1, above] {$y$};
\draw[->, very thick, teal] (0,0) -- (4,3) node [fill = white, fill opacity = 0.8, pos=0.5, below right, scale = 1.5] {$\vec{u}$};
\draw[<->, dashed, teal] (-0.2,0.2) -- (3.8,3.2) node [fill = white, fill opacity = 0.8, pos=0.5, above left, scale = 1.5] {$\| \vec{u} \| = \sqrt{v_1^2 + v_2^2}$};
\draw[<->, dashed, blue] (0,0) -- (4,0) node [below, pos =0.5] {$v_1$};
\draw[<->, dashed, red] (4,0) -- (4,3) node [right, pos=0.5] {$v_2$};
\end{tikzpicture}
:::


*Norm of vector $\vec{u*$}






## Unit Vector


:::definition

A unit vector $\vec{u}$ is a vector with norm equal to 1 ($\| \vec{u} \| = 1$).

:::




:::tikz TikZ diagram
\begin{tikzpicture}
\draw[gray, very thin] (-1.5,-1.5) grid (1.5,1.5);
\draw[<->] (-1.5,0) -- (1.5,0) node [pos=1, right] {$x$};
\draw[<->] (0,-1.5) -- (0,1.5) node [pos=1, above] {$y$};
\draw[dashed] (0,0) circle [radius = 1cm];
\foreach \r in {0,1,...,11}
{
	\draw[->, red] (0,0) -- (\r*pi/6 r: 1cm);
}
\end{tikzpicture}
:::


*Unit vectors *






## The Standard Unit Vectors


:::definition

The standard unit vectors in two dimension $**i**$ and $**j**$ are defined as
\[ **i** = \begin{pmatrix}1
0\end{pmatrix}, \qquad **j** = \begin{pmatrix}0
1\end{pmatrix}.\]


Given a vector $\vec{v} = \begin{pmatrix}v_1
v_2\end{pmatrix}$, we can rewrite $\vec{v}$ as 
\[ \vec{v} = v_1 **i** + v_2 **j**\]

:::






:::tikz TikZ diagram
\begin{tikzpicture}
\draw[very thin,color=gray] (-0.5,-0.5) grid (2.5,2.5);
\draw[<->, thick] (-0.5,0) -- (3,0) node[right] {$x$};
\draw[<->, thick] (0,-0.5) -- (0,3) node[above] {$y$};
\draw[->, blue, very thick] (0,0) -- (1,0) node[below right, scale = 1.5, fill = white, fill opacity = 0.8] {$\vec{i} = \left\langle 1,0 \right\rangle$};
\draw[->, red, very thick] (0,0) -- (0,1) node[right, scale = 1.5, fill = white, fill opacity = 0.8] {$\vec{j} = \left\langle 0,1 \right\rangle$};
\end{tikzpicture}
:::


*The unit vectors $\vec{i*$ and $\vec{j}$}

We can express $\vec{v}$ as a linear combination of $\vec{i}$ and $\vec{j}$ as
\[ \vec{v} = \left\langle v_1, v_2 \right\rangle = \leftlangle v_1, + v_2 \rightangle\]





:::example

Express the following vectors as a linear combination of $\vec{i}$ and $\vec{j}$ 


- $\left\langle 3,4 \right\rangle $

- $\left\langle -2,2 \right\rangle$

- $\left\langle 0,-2 \right\rangle$

- $\left\langle 5,0 \right\rangle$


:::


:::solution



- $\left\langle 3,4 \right\rangle = \leftlangle 3, +4 \rightangle$ 

- $\left\langle -2,2 \right\rangle = \leftlangle -2, +2 \rightangle$ 

- $\left\langle 0,-2 \right\rangle = -2 \mathbf{j}$ 

- $\left\langle 5,0 \right\rangle = 5\mathbf{i}$


:::






:::example

Express the following vectors as $\langle , \rangle$


- $\leftlangle 2, -5 \rightangle $

- $\leftlangle -1, 2 \rightangle$

- $3\mathbf{i}$

- $-4\mathbf{j}$


:::


:::solution



- $\leftlangle 2, -5 \rightangle = \left\langle 2,-5 \right\rangle$ 

- $\leftlangle -1, 2 \rightangle = \left\langle -1,2 \right\rangle$ 

- $3\mathbf{i} = 3\mathbf{i} + 0\mathbf{j} = \left\langle 3,0 \right\rangle$ 

- $-4\mathbf{j} = 0\mathbf{i} - 4\mathbf{j} = \left\langle 0,-4 \right\rangle$


:::
