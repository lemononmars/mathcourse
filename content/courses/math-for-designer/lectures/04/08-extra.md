---
week: 4
order: 8
slug: "extra"
title: "Extra"
source: "tex/lecture04.tex"
---

## Graph as Recreation




:::figure l07i17.png
:::

*[Amazing Graphs - Numberphile](https://www.youtube.com/watch?v=pAMgUB51XZA)*





## Polar Coordinates (r, \theta)

In a **polar coordinate system**, each point $P$ is determined by:


- $r$: Radial distance from the origin (the **Pole**)

- $\theta$: Angle measured from the positive x-axis (**Polar Axis**)





:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.45]

\foreach \r in {1, 2, 3, 4} {
  \draw[gray!35, thick] (0,0) circle (\r cm);
  \node[gray!70, scale=0.55, below right] at (\r,0) {\r};
}

\foreach \a in {0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330} {
  \draw[gray!25] (0,0) -- (\a:4.3cm);
  \node[gray!80, scale=0.5] at (\a:4.6cm) {$\a^\circ$};
}

\draw[->, very thick] (0,0) -- (4.4,0) node[right, scale=0.7] {Polar Axis};
\draw[->, thick, gray] (0,0) -- (0,4.4);


\draw[thick, red, ->] (0,0) -- (45:3cm) node[midway, above left, scale=0.7] {$r=3$};
\filldraw[red] (45:3cm) circle (2.5pt) node[above right, scale=0.7] {$P(3, 45^\circ) = (3, \frac{\pi}{4})$};
\draw[red, thick, ->] (0.9,0) arc (0:45:0.9cm) node[midway, right, scale=0.6] {$\theta = 45^\circ$};


\filldraw[black] (0,0) circle (2pt) node[below left, scale=0.7] {Pole $(0,0)$};
\end{tikzpicture}
:::


*Polar coordinate system --- used in game radars, circular AoE spells, and minimap tracking.*
