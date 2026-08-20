---
week: 4
order: 7
slug: "coordinate"
title: "Coordinate System and Graph"
source: "tex/lecture04.tex"
---

:::note Why do we plot graphs?



- Visualize 

- Prediction, tendency, asymptotic 

- Comparison 

- Discover correlation 

- Recreational purpose 


:::



:::definition

In geometry, a **coordinate system** is a system that uses one or more numbers, or coordinates, to uniquely determine the position of the points.

:::






:::tikz TikZ diagram
\begin{tikzpicture}[domain=0:4, scale = 1.2]
\draw[very thin,color=gray] (-0.1,-0.1) grid (3.9,2.9);
\draw[->, thick] (-0.2,0) -- (4.2,0) node[right] {$x$};
\draw[->, thick] (0,-0.2) -- (0,3.2) node[above] {$y$};
\draw[-, red, thick] (3,2) -- (3,0) node[below] {$3$};
\draw[-, blue, thick] (3,2) -- (0,2) node[left] {$2$};
\filldraw[fill = black, draw = white] (3,2) circle (3pt)
node [above right] {$(\red{3},\blue{2})$};
\end{tikzpicture}
:::


*A coordinate of $(x,y) = (3,2)$*





:::definition

The **Cartesian coordinate system** is an coordinate system that specifies each point uniquely in a plane by a set of numerical coordinates. 

:::



:::note

A graph of a function $f(x)$ shows a collection of points $(x, f(x))$ on the Cartesian plane.

:::







:::figure l07i20.png
:::

*[Online graphing utility](desmos.com/calculator)*







:::example

Plot the points $(x,f(x))$ for the function $f(x) = x^2$ with $x=-2,-1,0,1,2$.

:::


:::solution


:::figure graph_plot_ex1.png — The plot of the function $f(x) = x^2$
:::


:::






:::example

Plot the points $(x,f(x))$ for the function $f(x) = \frac{1}{x^2+1}$ with $x=-2,-1,0,1,2$.

:::


:::solution


:::figure graph_plot_ex2.png — The plot of the function $f(x) = \frac{1
:::
$}{}

:::






:::example

Plot the points $(x,f(x))$ for the function $f(x) = | |x+1| - 1 |$ with $x=-2,-1,0,1,2$.

:::


:::solution


:::figure graph_plot_ex3.png — The plot of the function $f(x) = \frac{1
:::
$}{}

:::






:::exercise

Plot the points $(x,f(x))$ for the following functions with $x=-2,-1,0,1,2$ and connect the points to predict its shape.


- $f(x) = \frac{x+1}{x+3}$

- $f(x) = |2x+2|$

- $f(x) = ||x|-1|$


:::
