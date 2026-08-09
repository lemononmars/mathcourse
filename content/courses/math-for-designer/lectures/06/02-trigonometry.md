---
week: 6
order: 2
slug: "trigonometry"
title: "Trigonometry"
source: "tex/lecture06.tex"
---

## Still In Your Dream




:::figure l09meme2
:::






## Problem 1: Estimate the Height




:::figure l09i04
:::






## Problem 2: Force




:::figure l09i05
:::






## Problem 3: 2D and 3D Rotation




:::figure l09i06
:::


\[(x,y) \then (x\cos \theta - y\sin\theta, x \sin\theta + y\cos\theta)\]




## Constants




:::figure l09i02
:::

\pa
\[ \frac{AB}{DE} = \frac{AC}{DF} = s_1\] \pa 
\[ \frac{AB}{BC} = \frac{DE}{EF} = s_2\] \pa
\[ \frac{AC}{BC} = \frac{DF}{EF} = s_3\]




## Definition




:::figure l09i07
:::







## Tan(gerine)




:::figure l09meme3
:::






## Definition




:::figure l09shorthand
:::






## Definition




:::figure l09i08
:::







:::example

Let $\theta$ be the angel indicated in the figure below. Find $\sin\theta, \cos\theta$ and $\tan\theta$.

:::






:::tikz TikZ diagram
\begin{tikzpicture}
\draw (0,0) -- (4,0) node[pos=0.5, below] {4};
\draw (4,0) -- (4,3) node[pos=0.5, right] {3};
\draw (4,3) -- (0,0) node[pos=0.5, above] {5};
 \filldraw[fill=green!20!white, draw=green!50!black] (0,0) -- (10mm,0mm)
    arc [start angle=0, end angle=37, radius=10mm] -- cycle;
\draw (3.8,0) rectangle (4,0.2);
\node[black] at (0.6,0.2) {$\theta$};
\end{tikzpicture}
:::
*A triangle for example \theexample*{}




:::solution

\begin{eq*}
\sin \theta &=& \frac{3}{5}

\cos \theta &=& \frac{4}{5}

\tan \theta &=& \frac{3}{4}
\end{eq*}

:::








:::example

Let $\theta$ be the angel indicated in the figure below. Find $\sin\theta, \cos\theta$ and $\tan\theta$.

:::






:::tikz TikZ diagram
\begin{tikzpicture}
\draw (0,0) -- (2,0) node[pos=0.5, below] {2};
\draw (2,0) -- (2,2) node[pos=0.5, right] {2};
\draw (2,2) -- (0,0) node[pos=0.5, above left] {$2\sqrt{2}$};
 \filldraw[fill=green!20!white, draw=green!50!black] (0,0) -- (10mm,0mm)
    arc [start angle=0, end angle=45, radius=10mm] -- cycle;
\draw (1.8,0) rectangle (2,0.2);
\node[black] at (0.6,0.2) {$\theta$};
\end{tikzpicture}
:::
*A triangle for example \theexample*{}




:::solution

\begin{eq*}
\sin \theta &=& \frac{2}{2\sqrt{2}} = \frac{1}{\sqrt{2}}

\cos \theta &=& \frac{2}{2\sqrt{2}} = \frac{1}{\sqrt{2}}

\tan \theta &=& \frac{2\sqrt{2}}{2\sqrt{2}} = 1 
\end{eq*}

:::









:::example

Let $\Omega$ be the angel indicated in the figure below. Find $\sin\theta, \cos\theta$ and $\tan\theta$.

:::






:::tikz TikZ diagram
\begin{tikzpicture}
\draw (0,0) -- (2,0) node[pos=0.5, below] {2};
\draw (2,0) -- (2,3) node[pos=0.5, right] {3};
\draw (2,3) -- (0,0);
 \filldraw[fill=green!20!white, draw=green!50!black] (0,0) -- (10mm,0mm)
    arc [start angle=0, end angle=56.3, radius=10mm] -- cycle;
\draw (1.8,0) rectangle (2,0.2);
\node[black] at (0.6,0.2) {$\theta$};
\end{tikzpicture}
:::
*A triangle for example \theexample*{}




:::solution

First we need to find the hypotenuse.
\begin{eqnarray*}
c^2 &=& a^2 + b^2 

c &=& \sqrt{a^2 + b^2} = \sqrt{2^2 + 3^2} = \sqrt{13}
\end{eqnarray*}
Thus
\begin{eq*}
\sin \theta &=& \frac{2}{\sqrt{13}}

\cos \theta &=& \frac{3}{\sqrt{13}}

\tan \theta &=& \frac{2}{3}
\end{eq*}

:::







:::exercise

Find $\sin \theta, \cos \theta, \tan \theta$ of the following triangles.


:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.7]
\draw (0,0) -- (6,0) node[pos=0.5, below] {12};
\draw (6,0) -- (6,2.5) node[pos=0.5, right] {5};
\draw (6,2.5) -- (0,0) node[pos=0.5, above] {13};
 \filldraw[fill=green!20!white, draw=green!50!black] (0,0) -- (20mm,0mm)
    arc [start angle=0, end angle=22.6, radius=20mm] -- cycle;
\draw (5.8,0) rectangle (6,0.2);
\node[black] at (1,0.2) {$\theta$};
\end{tikzpicture}
:::
:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.7]
\draw (0,0) -- (6,0) node[pos=0.5, below] {3};
\draw (6,0) -- (6,2) node[pos=0.5, right] {1};
\draw (6,2) -- (0,0);
 \filldraw[fill=green!20!white, draw=green!50!black] (0,0) -- (20mm,0mm)
    arc [start angle=0, end angle=18.4, radius=20mm] -- cycle;
\draw (5.8,0) rectangle (6,0.2);
\node[black] at (1.2,0.2) {$\theta$};
\end{tikzpicture}
:::
:::





## The Basic Triangles




:::tikz TikZ diagram
\begin{tikzpicture}
\draw (0,0) -- (4,0) node[pos=0.5, below] {1};
\draw (4,0) -- (4,4) node[pos=0.5, right] {1};
\draw (4,4) -- (0,0) node[pos=0.5, above=2pt, left=2pt] {$\sqrt{2}$};
\draw[dashed] (0,0) -- (0,4) -- (4,4);
\filldraw[fill=green!20!white, draw=green!50!black] (0,0) -- (1,0)
    arc [start angle=0, end angle=45, radius=10mm] -- cycle;
\filldraw[fill=green!20!white, draw=green!50!black] (4,4) -- (4,3)
    arc [start angle=270, end angle=225, radius=10mm] -- cycle;
\draw (3.5,0) rectangle (4,0.5);
\node[black] at (0.6,0.3) {$45^{\circ}$};
\node[black] at (3.8,3.4) {$45^{\circ}$};
\end{tikzpicture}
:::
*A right triangle with $45^{\circ*$ angles.}{}

\[\sin 45^{\circ} = \cos 45^{\circ} = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}\]




## The Basic Triangles




:::tikz TikZ diagram
\begin{tikzpicture}
\draw (0,0) -- (2,0) node[pos=0.5, below] {1};
\draw (2,0) -- (2,3.464) node[pos=0.5, right] {$\sqrt{3}$};
\draw (2,3.464) -- (0,0) node[pos=0.5, above left] {2};
\draw[dashed] (2,0) -- (4,0) -- (2,3.464);
\filldraw[fill=green!20!white, draw=green!50!black] (0,0) -- (1,0)
    arc [start angle=0, end angle=60, radius=10mm] -- cycle;
\filldraw[fill=green!20!white, draw=green!50!black] (2,3.464) -- (2,1.964)
    arc [start angle=270, end angle=240, radius=15mm] -- cycle;
\draw (1.8,0) rectangle (2,0.2);
\node[black] at (0.6,0.4) {$60^{\circ}$};
\node[black] at (1.8,2.4) {$30^{\circ}$};
\end{tikzpicture}
:::
*A right triangle with $30^{\circ*$ and $60^{\circ}$ angle.}{}

\begin{eq*}
\sin 30^{\circ} &=& \cos 60^{\circ} = \frac{1}{2} 

\sin 60^{\circ} &=& \cos 30^{\circ} = \frac{\sqrt{3}}{2}
\end{eq*}




## Helping Hand

\begin{table}

\begin{tabular}{|C|C|C|C|C|C|}
\hline
\theta & 0 & 30 & 45 & 60 & 90 

\hline
\sin & 0 & \frac{1}{2} & \frac{\sqrt{2}}{2} & \frac{\sqrt{3}}{2} & 1 

\hline
\cos & 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{2}}{2} & \frac{1}{2} & 0 

\hline
\end{tabular}
\end{table}

:::figure l09i10 — [](https://www.youtube.com/watch?v=PF2nmCVSUEs&ab_channel=FuseSchool-GlobalEducation
:::
)
