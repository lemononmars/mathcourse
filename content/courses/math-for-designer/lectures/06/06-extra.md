---
week: 6
order: 6
slug: "extra"
title: "Extra"
source: "tex/lecture06.tex"
---

## The Whole Family

Note: We also define the following functions

::: note 
\begin{align*}
\sec \theta &= \frac{1}{\sin \theta} \\
\csc \theta &= \frac{1}{\cos \theta} \\ 
\cot \theta &= \frac{1}{\tan \theta}
\end{align*}
::: 

These notations are handy when dealing with some types of problems, but we do not need them for now.




## Sine, Sine Everywhere


:::figure wait_its_all_sine — Mind=Blown
:::





## \pi

In mathematics, we use a different unit of angle, called **radian**. Instead of defining $\sin$ to be the ratio between sides of the triangle, we define it to be the length of the arc of the unit circle.


:::note

\[ \pi = 180^{\circ}\]

:::


For instance, 
\begin{eqnarray*}
\cos \pi &=& \cos 180^{\circ} = -1 

\sin 2\pi &=& \sin 360^{\circ} = 0

\sin \frac{\pi}{2} &=& \sin 90^{\circ} = 1
\end{eqnarray*}




## Inverse Trigonometry Functions

There are associated inverse functions, namely
\[ \arcsin A, \arccos A, \arctan A\]
If $\sin \theta = A$, then we simply have $\arcsin A = \theta$. Since $\sin \theta$ expresses the ratio between two sides of the triangles, $\arcsin A$ expresses the angle such that such ratio is $A$.

\begin{exampleblock}{Example}


- We know that $\sin 30^{\circ} = \frac{1}{2}$, so we have $\arcsin \frac{1}{2} = 30^{\circ}$

- We know that $\cos 60^{\circ} = \frac{1}{2}$, so we have $\arccos \frac{1}{2} = 60^{\circ}$

- We know that $\tan 45^{\circ} = 1$, so we have $\arctan 1 = 45^{\circ}$

\end{exampleblock}




## Fun Fact

Then, you may wonder why we used 360 in the first place? The number itself seems arbitrary.
\bigskip

Answer: Because it has lots of divisors, namely
\[1,2,3,4,5,6,8,10,12,15,18,20,24, 30, 36, 40, 60, 72, 90, 120, 180, 360\]




## Extending the Unit Circle

There are geometrical explanations for other trigonometric functions.



:::tikz TikZ diagram
\begin{tikzpicture}
\draw[<->] (-3.5,0) -- (4,0) node[at end, right] {$x$};
\draw[<->] (0,-0.5) -- (0,5.5) node[at end, above] {$y$};
\draw (3,0) arc [start angle = 0, end angle = 180, radius = 30mm];
\draw[red, dashed] (0,0) -- (2.4,0);
\draw[green] (2.4,0) -- (2.4,1.8) node[left, pos=0.5] {$\sin \theta$};
\draw (2.4,1.8) -- (0,0) node[above left, pos=0.5] {$1$};
\filldraw[fill=green!20!white, draw=green!50!black] (0,0) -- (1,0)
    arc [start angle=0, end angle=37.1, radius=10mm] -- cycle;
\node[black] at (0.6, 0.2) {$\theta$};
\draw (2.2,0) rectangle (2.4,0.2);
\draw[red] (0,1.8) -- (2.4,1.8) node[above, pos=0.5] {$\cos \theta$};
\draw[magenta] (0,0) -- (3.75,0) node[below, pos=0.5] {$\text{sec } \theta$};
\draw[cyan] (0,0) -- (0,5) node[left, pos=0.5] {$\text{csc } \theta$};
\draw[purple] (0,5) -- (2.4,1.8) node[above, right, pos=0.5] {$\text{cot } \theta$};
\draw[orange] (2.4,1.8) -- (3.75,0) node[above, right, pos=0.5] {$\tan \theta$};
\draw[rotate = 217.1, xshift=24mm, yshift=18mm] (0,0) rectangle (0.2, 0.2);
\end{tikzpicture}
:::
*Geometrical interpretations of all six trigonometry functions.*
