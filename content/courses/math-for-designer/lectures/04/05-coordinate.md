---
week: 4
order: 5
slug: "coordinate"
title: "Coordinate System and Graph"
source: "tex/lecture04.tex"
---

:::note Why do we plot graphs?



- Visualize use 

- Prediction, tendency, asymptotic use

- Comparison use

- Discover correlation use

- Recreational purpose use


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

The **Cartesian coordinate system** is a coordinate system that specifies each point uniquely in a plane by a pair of numerical coordinates $(x, y)$.

:::



:::note

A graph of a function $f(x)$ shows a collection of points $(x, f(x))$ on the Cartesian plane.

:::





:::example

Find the coordinates $(x, y)$ of points $A, B, C$, and $D$ on the grid below.



:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.55]
\draw[help lines, color=gray!40] (-4,-4) grid (4,4);
\draw[->, thick] (-4.3,0) -- (4.3,0) node[right] {$x$};
\draw[->, thick] (0,-4.3) -- (0,4.3) node[above] {$y$};
\foreach \x in {-4,-3,-2,-1,1,2,3,4}
  \draw (\x,0.1) -- (\x,-0.1) node[below, scale=0.6] {\x};
\foreach \y in {-4,-3,-2,-1,1,2,3,4}
  \draw (0.1,\y) -- (-0.1,\y) node[left, scale=0.6] {\y};

\filldraw[blue] (3,2) circle (3pt) node[above right] {$A$};
\filldraw[red] (-3,1) circle (3pt) node[above left] {$B$};
\filldraw[teal] (-2,-3) circle (3pt) node[below left] {$C$};
\filldraw[orange] (2,-2) circle (3pt) node[below right] {$D$};
\end{tikzpicture}
:::



:::


:::solution

\[A = (3, 2), \quad B = (-3, 1), \quad C = (-2, -3), \quad D = (2, -2)\]

:::





:::example

Use the graph of $y = f(x)$ below to find the coordinates and evaluate:


- $f(2)$

- $f(0)$

- $f(-2)$

- Find $x$ where $f(x) = 0$




:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.55]
\draw[help lines, color=gray!40] (-3,-2) grid (3,4);
\draw[->, thick] (-3.3,0) -- (3.3,0) node[right] {$x$};
\draw[->, thick] (0,-2.3) -- (0,4.3) node[above] {$y$};
\foreach \x in {-3,-2,-1,1,2,3}
  \draw (\x,0.1) -- (\x,-0.1) node[below, scale=0.6] {\x};
\foreach \y in {-2,-1,1,2,3,4}
  \draw (0.1,\y) -- (-0.1,\y) node[left, scale=0.6] {\y};

\draw[thick, blue, domain=-2.2:2.2, samples=50] plot (\x, {-\x*\x + 3});
\filldraw[red] (2,-1) circle (2.5pt);
\filldraw[red] (-2,-1) circle (2.5pt);
\filldraw[red] (0,3) circle (2.5pt);
\end{tikzpicture}
:::




:::solution



- Point $(2, -1) \rightarrow f(2) = -1$ 

- Point $(0, 3) \rightarrow f(0) = 3$

- Point $(-2, -1) \rightarrow f(-2) = -1$

- Crosses x-axis: $x \approx \pm 1.73$


:::


:::







:::figure l07i20.png
:::

*[Online graphing utility (Desmos)](https://www.desmos.com/calculator)*







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


:::figure graph_plot_ex3.png — The plot of the function $f(x) = ||x+1|-1|$
:::


:::






:::exercise

Plot the points $(x,f(x))$ for the following functions with $x=-2,-1,0,1,2$ and connect the points to predict its shape.


- $f(x) = \frac{x+1}{x+3}$

- $f(x) = |2x+2|$

- $f(x) = ||x|-1|$


:::
