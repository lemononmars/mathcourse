---
week: 4
order: 1
slug: "function"
title: "Function"
source: "tex/lecture04.tex"
---

:::definition

If a variable $y$ depends on a variable $x$ in such a way that each value of $x$ determines exactly one value of $y$, we say that $y$ is a function of $x$.

:::


Five common methods for representing functions are:


- Numerically by tables

- Abstractly by sets

- Algebraically by formulas

- Geometrically by graphs

- Verbally





## 1. Numerically by tables

\begin{table}[h!]

\begin{tabular}{|C||C|C|C|C|C|C|}
\hline
x & - 1.1&-1.01 & -1.001 & -0.999 & -0.99 & -0.9 

\hline
y & \pa 0.9 & \pa 0.99 & \pa 0.999 & \pa 1.001 & \pa 1.01 & \pa 1.1

\hline
\end{tabular}
\end{table}





## 2. Abstractly by sets

As a relationship from one set to another.



:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.8]
\filldraw[fill = teal!50!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\filldraw[fill = blue!50!white] (5,2.5) ellipse [x radius = 1, y radius = 2];
\node at (1,4) (a1) {1};
\node at (1,3) (a2) {2};
\node at (1,2) (a3) {3};
\node at (1,1) (a4) {4};
\node at (5,3.5) (b1) {2};
\node at (5,2.5) (b2) {4};
\node at (5,1.5) (b3) {6};
\draw[->] (a1) -- (b1);
\draw[->] (a2) -- (b2);
\draw[->] (a3) -- (b1);
\draw[->] (a4) -- (b2);
\draw[->, bend angle = 45] (2,5) -- (4,4.5) node [pos = 0.5, above] {$f$};
\end{tikzpicture}
:::
*A function as a relationship between objects*





## 3. Algebraically by formulas

As a machine that takes an input $x$ and gives a consistent output $y$.



:::tikz TikZ diagram
\begin{tikzpicture}
\draw[->, line width = 3] (-1,1) -- (0,1) node [left, pos=0] {Input $x$};
\filldraw[fill = blue!40!white, draw=blue!50!black] (0,0) rectangle (5,2);
\node at (2.5,1) [scale = 2] {Function $f$};
\draw[->, line width = 3] (5,1) -- (6,1) node [right] {Output $f(x)$};
\end{tikzpicture}
:::
*A function as a machine*





## Fourth concept

As points on a plane.

:::figure covid_graph — COVID cases (October 10th)
:::







:::tikz TikZ diagram
\begin{tikzpicture}[domain=-3:3, scale = 0.4]
\draw[help lines] (0,-6) grid (10,6);
\draw[<->, thick] (-1,0) -- (10.5,0) node[right] {$x$};
\draw[<->, thick] (0,-6.5) -- (0,6.5) node[above] {$y$};
\draw[color=teal, variable = \t, very thick] plot ({\t*\t},{\t*2});
\draw (4,4) circle [radius = 0.1cm] node[above] {$(x,y)$};
\end{tikzpicture}
:::
*A function as points $(x,y)$ on the plane.*





## Fifth Concept

Sometimes functions are described in words.

:::remark Newton's Law of Universal Gravitation

The gravitational force of attraction between two bodies in the Universe is directly proportional to the product of their masses and inversely proportional to the square of the distance between them.

:::

This is the verbal description of the formula
\[F = G \frac{m_1 m_2}{r^2}\]
where $F$ is defined as a function of $r$.





## Formal definition


:::definition

A function needs to give only one output for any input.
\medskip

We write 
\[ f: A \rightarrow B\] 
to represent a function $f$ from the set $A$, called **Domain**, to the set $B$, called **Range**.

:::





## How to Test If It's a Function (1)

If expressed as a mapping, then every element in the domain must have only one arrow going outward.




:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.5]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\filldraw[fill = blue!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2];
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (5,3.5) (b1) {x};
\node at (5,2.5) (b2) {y};
\node at (5,1.5) (b3) {z};
\draw[->] (a1) -- (b1);
\draw[->] (a2) -- (b2);
\draw[->] (a3) -- (b1);
\draw[->] (a4) -- (b2);
\node at (3,5) {$R_1$};
\begin{scope}[xshift = 8cm]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\filldraw[fill = blue!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2];
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (5,3.5) (b1) {x};
\node at (5,2.5) (b2) {y};
\node at (5,1.5) (b3) {z};
\draw[->] (a1) -- (b1);
\draw[->] (a1) -- (b3);
\draw[->] (a2) -- (b2);
\draw[->] (a3) -- (b3);
\draw[->] (a4) -- (b3);
\node at (3,5) {$R_2$};
\end{scope}
\begin{scope}[xshift = 16cm]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\filldraw[fill = blue!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2];
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (5,3.5) (b1) {x};
\node at (5,2.5) (b2) {y};
\node at (5,1.5) (b3) {z};
\draw[->] (a1) -- (b1);
\draw[->] (a2) -- (b2);
\draw[->] (a4) -- (b2);
\node at (3,5) {$R_3$};
\end{scope}
\end{tikzpicture}
:::
*Which ones are functions?*






:::solution



- $R_1$ is a function, because each element on the left has exactly one out arrow.

- $R_2$ is not a function, because there are two arrows going out from $a$.

- $R_3$ is not a function, because there are no arrows going out from $c$.





:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.6]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\filldraw[fill = blue!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2];
\node[draw, circle, fill = red!40] at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (5,3.5) (b1) {x};
\node at (5,2.5) (b2) {y};
\node at (5,1.5) (b3) {z};
\draw[->, red] (a1) -- (b1);
\draw[->, red] (a1) -- (b3);
\draw[->] (a2) -- (b2);
\draw[->] (a3) -- (b3);
\draw[->] (a4) -- (b3);
\node at (3,5) {$R_2$};
\begin{scope}[xshift = 8cm]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\filldraw[fill = blue!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2];
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node[draw, circle, fill = red!40] at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (5,3.5) (b1) {x};
\node at (5,2.5) (b2) {y};
\node at (5,1.5) (b3) {z};
\draw[->] (a1) -- (b1);
\draw[->] (a2) -- (b2);
\draw[->] (a4) -- (b2);
\node at (3,5) {$R_3$};
\end{scope}
\end{tikzpicture}
:::
*Solutions*


:::





## How to Test If It's a Function (2)

If expressed as a graph, every vertical line must intersect the graph once.




:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.6, smooth]
\axes{-2}{2}{-2}{2};
\draw[blue, very thick, domain = -2:2] plot (\x, {cos(\x*3 r)});
\node at (0,-3) {$R_1$};
\begin{scope}[xshift = 6cm]
\axes{-2}{2}{-2}{2};
\draw[blue, variable = \t, very thick, domain = {-pi/2}:{pi/2}] plot ({cos(\t r)},{sin(\t r)});
\node at (0,-3) {$R_2$};
\end{scope}
\begin{scope}[xshift = 12cm]
\axes{-2}{2}{-2}{2};
\draw[blue, variable = \t, very thick, domain = -1.5:1.5] plot ({\t^3-\t},{\t});
\node at (0,-3) {$R_3$};
\end{scope}
\end{tikzpicture}
:::
*Which ones are functions?*






:::solution



- $R_1$ is a function, because any vertical line intersects the function at most once.

- $R_2$ is not a function, because there is a vertical line that intersects the graph twice.

- $R_3$ is not a function, because there is a vertical line that intersects the graph twice.





:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.6, smooth]
\axes{-2}{2}{-2}{2};
\draw[color=blue, very thick, domain = -2:2] plot (\x, {cos(\x*3 r)});
\node at (0,-3) {$R_1$};
\draw[teal] (1,-2) --+ (0,4);
\filldraw[teal] (1,-1) circle [radius = 0.1cm];
\begin{scope}[xshift = 5cm]
\axes{-2}{2}{-2}{2};
\draw[color=blue, variable = \t, very thick, domain = {-pi/2}:{pi/2}] plot ({cos(\t r)},{sin(\t r)});
\node at (0,-3) {$R_2$};
\draw[red] (0.5,-2) --+ (0,4) ;
\filldraw[red] (0.5,{sqrt(3)/2}) circle [radius = 0.1cm];
\filldraw[red] (0.5,{-sqrt(3)/2}) circle [radius = 0.1cm];
\end{scope}
\begin{scope}[xshift = 10cm]
\axes{-2}{2}{-2}{2};
\draw[color=blue, variable = \t, very thick, domain = -1.5:1.5] plot ({\t^3-\t},{\t});
\node at (0,-3) {$R_3$};
\draw[red] (0,-2) --+ (0,4) ;
\filldraw[red] (0,-1) circle [radius = 0.1cm];
\filldraw[red] (0,0) circle [radius = 0.1cm];
\filldraw[red] (0,1) circle [radius = 0.1cm];
\end{scope}
\end{tikzpicture}
:::
*Graph for example \theexample*


:::



\iffalse


:::exercise

Convert the following sentence in to functions in all 5 ways.


- $f(x) = x+2$

- $f(x) = x^2$


:::


\fi

\iffalse
