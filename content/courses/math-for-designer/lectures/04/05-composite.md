---
week: 4
order: 5
slug: "composite"
title: "Composite Function"
source: "tex/lecture04.tex"
---

## Example of a composite system


:::figure function_intro_factori — A chain of factories [](https://www.youtube.com/watch?v=v-tFGm9nCV0&ab_channel=StarGardenGames
:::
)




## composite function

We can combite two (or more) functions by chaining them.

:::definition

Let $f(x)$ and $g(x)$ be functions. A composite function, denoted $f \circ g$, is defined as
\[ (f \circ g)(x)= f(g(x))\]
In other words, we replace $x$ in $f(x)$ by another function $g(x)$.

:::







:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.5]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[teal] at (1,-1) {$A$};
\filldraw[fill = red!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[red] at (5,-1) {$B$};
\filldraw[fill = blue!20!white] (9,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[blue] at (9,-1) {$C$};
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (5,4) (b1) {p};
\node at (5,3) (b2) {q};
\node at (5,2) (b3) {r};
\node at (5,1) (b4) {s};
\node at (9,4) (c1) {w};
\node at (9,3) (c2) {x};
\node at (9,2) (c3) {y};
\node at (9,1) (c4) {z};
\draw[->, red] (a1) -- (b1);
\draw[->, purple] (a2) -- (b3);
\draw[->, red] (a3) -- (b1);
\draw[->, green] (a4) -- (b2);
\draw[->, red] (b1) -- (c2);
\draw[->, green] (b2) -- (c3);
\draw[->, purple] (b3) -- (c1);
\draw[->] (b4) -- (c2);
\node at (3, 5) {$f: A \rightarrow B$};
\node at (7, 5) {$g: B \rightarrow C$};
\begin{scope}[yshift = -7cm]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[teal] at (1,-1) {$A$};
\filldraw[fill = blue!20!white] (9,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[blue] at (9,-1) {$C$};
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (9,4) (c1) {w};
\node at (9,3) (c2) {x};
\node at (9,2) (c3) {y};
\node at (9,1) (c4) {z};
\draw[->, red] (a1) -- (c2);
\draw[->, purple] (a2) -- (c1);
\draw[->, red] (a3) -- (c2);
\draw[->, green] (a4) -- (c3);
\node at (5, 5) {$g\circ f: A \rightarrow C$};
\end{scope}
\end{tikzpicture}
:::
*Creating the composite function $g \circ f$ using set diagram*







:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.6]
\filldraw[blue!40] (0,0) rectangle (3,2);
\foreach \x in {-0.8,0.8}
{
	\foreach \y in {-0.8,0.8}
	{
		\draw[->] ({1.5+\x}, {1+\y}) -- ({1.5+(0.2*\x)},{1+(0.2*\y)});
	}
}
\filldraw[red!40] (6,0) rectangle (9,2);
\filldraw[ball color = teal] (-2.5,1) circle [radius = 1cm];
\filldraw[ball color = teal] (4.5,1) circle [radius = 0.5cm];
\filldraw[ball color = red] (10.5,1) circle [radius = 0.5cm];
\foreach \x in {-1, 3.25, 5.25, 9.25}
{
	\draw[->] (\x,1) -- ({\x+0.5},1);
}
\node[scale = 2] at (1.5, 2.5) {$f$};
\node[scale = 2] at (7.5, 2.5) {$g$};
\begin{scope}[yshift = -4cm]
\filldraw[purple!40] (0,0) rectangle (9,2);
\foreach \x in {-1,1}
\foreach \x in {-0.8,0.8}
{
	\foreach \y in {-0.8,0.8}
	{
		\draw[->, red] ({4.5+\x}, {1+\y}) -- ({4.5+(0.2*\x)},{1+(0.2*\y)});
	}
}
\filldraw[ball color = teal] (-2.5,1) circle [radius = 1cm];
\filldraw[ball color = red] (10.5,1) circle [radius = 0.5cm];
\foreach \x in {-1, 9.25}
{
	\draw[->] (\x,1) -- ({\x+0.5},1);
}
\node[scale = 2] at (4.5, 2.5) {$g \circ f$};
\end{scope}
\end{tikzpicture}
:::
*Creating a composite function as a chain of machines*





:::figure function_composite_meme1 — The difference between $f \circ g$ and $g \circ f$
:::






:::example

Let $f(x) = x+1$ and $g(x) = x^2$. Find the followings.


- $(f \circ g)(x)$

- $(g \circ f)(x)$

- $(f \circ f)(x)$

- $(g \circ g)(x)$


:::


:::solution

\begin{eqnarray*}
(f \circ g)(x) \pa &=& f(**g(x)**) \pa= **g(x)** + 1 = x^2 + 1 
\pa
(g \circ f)(x) \pa &=& g(**f(x)**) \pa = **f(x)**^2 \pa = **(x+1)**^2
\end{eqnarray*}
Notice that $(f \circ g)(x) \neq (g \circ f)(x)$, so the order matters.
\begin{eqnarray*}
(f \circ f)(x) \pa &=& f(**f(x)**) \pa = **f(x)** + 1 \pa = **x+1** + 1 \pa = x+2 
\pa
(g \circ g)(x) \pa &=& g(**g(x)**) \pa = (**g(x)**)^2 \pa = (**x^2**)^2 \pa = x^4
\end{eqnarray*}

:::






:::example

Let $f(x) = \sqrt{x} $ and $g(x) = 2x+1$. Find the followings.


- $(f \circ g)(x)$

- $(f \circ g)(4)$

- $(g \circ f)(x)$

- $(g \circ f)(4)$


:::


:::solution

\begin{eqnarray*}
(f \circ g)(x) \pa &=& f(**g(x)**) \pa= \sqrt{**g(x)**} \pa = \sqrt{2x+1} 
\pa
(f \circ g)(4) \pa &=& \sqrt{2(4) + 1 } \pa = \sqrt{9} \pa = 3 
\pa
(g \circ f)(x) \pa &=& g(**f(x)**) \pa = 2**f(x)**+1 \pa = 2\green{\sqrt{x}} + 1 
\pa
(g \circ f)(4) \pa &=& 2\sqrt{4} + 1 \pa = 2(2) + 1 \pa = 5
\end{eqnarray*}

:::



