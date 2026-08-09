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



- Scalar multiplication: $k\cvec{v_1}{v_2} = \cvec{kv_1}{kv_2}$

- Addition: $\cvec{v_1}{v_2} + \cvec{u_1}{u_2} = \cvec{v_1 + u_1}{v_2 + u_2}$

- Subtraction: $\cvec{v_1}{v_2} - \cvec{u_1}{u_2} = \cvec{v_1}{v_2} + \cvec{-u_1}{-u_2} = \cvec{v_1 - u_1}{v_2 - u_2}$


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

- Define $\vec{0} = \cvec{0}{0}$. Then, we have 
\[\vec{v} + \vec{0} = \vec{0} + \vec{v} = \vec{v}\]

- $(-1)\vec{v} = -\vec{v}$

- If $\vec{v} = a \vec{w}$ then we say that $\vec{v}$ and $\vec{w}$ are parallel.


:::




\section[Norm and Unit] {Norm and Unit Vectors}





## Vector Norm

Since a vector, drawn as an arrow, has length, then we can compute it using Pythagoras' Theorem.

:::definition

The **norm** (or length) of a vector $\vec{v} = \cvec{a}{b}$ is 
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
\[ **i** = \cvec{1}{0}, \qquad **j** = \cvec{0}{1}.\]


Given a vector $\vec{v} = \cvec{v_1}{v_2}$, we can rewrite $\vec{v}$ as 
\[ \vec{v} = v_1 **i** + v_2 **j**\]

:::






:::tikz TikZ diagram
\begin{tikzpicture}
\draw[very thin,color=gray] (-0.5,-0.5) grid (2.5,2.5);
\draw[<->, thick] (-0.5,0) -- (3,0) node[right] {$x$};
\draw[<->, thick] (0,-0.5) -- (0,3) node[above] {$y$};
\draw[->, blue, very thick] (0,0) -- (1,0) node[below right, scale = 1.5, fill = white, fill opacity = 0.8] {$\vec{i} = \bv{1,0}$};
\draw[->, red, very thick] (0,0) -- (0,1) node[right, scale = 1.5, fill = white, fill opacity = 0.8] {$\vec{j} = \bv{0,1}$};
\end{tikzpicture}
:::
*The unit vectors $\vec{i*$ and $\vec{j}$}

We can express $\vec{v}$ as a linear combination of $\vec{i}$ and $\vec{j}$ as
\[ \vec{v} = \bv{v_1, v_2} \pa = \vv{v_1}{+ v_2}\]





:::example

Express the following vectors as a linear combination of $\vec{i}$ and $\vec{j}$ 


- $\bv{3,4} $

- $\bv{-2,2}$

- $\bv{0,-2}$

- $\bv{5,0}$


:::


:::solution



- $\bv{3,4} \pa = \vv{3}{+4}$ \pa

- $\bv{-2,2} \pa= \vv{-2}{+2}$ \pa

- $\bv{0,-2} \pa= -2 \bvec{j}$ \pa

- $\bv{5,0} \pa = 5\bvec{i}$


:::






:::example

Express the following vectors as $\langle , \rangle$


- $\vv{2}{-5} $

- $\vv{-1}{2}$

- $3\bvec{i}$

- $-4\bvec{j}$


:::


:::solution



- $\vv{2}{-5} \pa = \bv{2,-5}$ \pa

- $\vv{-1}{2} \pa = \bv{-1,2}$ \pa

- $3\bvec{i} \pa = 3\bvec{i} + 0\bvec{j} \pa = \bv{3,0}$ \pa

- $-4\bvec{j} = 0\bvec{i} - 4\bvec{j} = \bv{0,-4}$


:::
