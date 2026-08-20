---
week: 6
order: 3
slug: "the-unit-circle"
title: "The Unit Circle"
source: "tex/lecture06.tex"
---

## Revelation


:::youtube yBw67Fb31Cs | You have been tricked!
:::





## 

If we fix the length of the hypotenuse to be be 1, then we reduce the functions to be

:::property

\[\sin \theta = a, \qquad \cos \theta = b, \qquad \tan \theta = \frac{a}{b} \]

:::





:::tikz TikZ diagram
\begin{tikzpicture}
\draw[->] (-0.5,0) -- (3.5,0) node[at end, right] {$x$};
\draw[->] (0,-0.5) -- (0,3.5) node[at end, above] {$y$};
\draw (-20:3) arc  [start angle=-20, end angle=110, radius=30mm];
\draw[green] (3,0) arc  [start angle=0, end angle=37.1, radius=30mm];
\draw[red] (0,0) -- (2.4,0) node[below, pos=0.5] {$\cos \theta$};
\draw[blue] (2.4,0) -- (2.4,1.8) node[left, pos=0.5] {$\sin \theta$};
\draw (2.4,1.8) -- (0,0) node[above left, pos=0.5] {$1$};
\filldraw[fill=green!20!white, draw=green!50!black] (0,0) -- (1,0)
    arc [start angle=0, end angle=37.1, radius=10mm] -- cycle;
\node[black] at (0.6, 0.2) {$\theta$};
\filldraw[red] (2.4,1.8) circle (1mm) node[above right] {$(x,y) = (\red{\cos \theta}, \blue{\sin \theta})$};
\end{tikzpicture}
:::







## Extension

Moreover, we can think of the hypotenuse as a radius of a circle. As we move the radius around, the angle changes.


Now, instead of thinking of $\sin \theta$ as the ratio between two sides, we can instead think of $\sin \theta$ as the **height** of the dot from the ground ($x$ axis). 


Likewise, $\cos \theta$ now becomes the **distance** of the dot from the start ($y$ axis). 


This lets us extend $\theta$ to be any real number!




## Obtuse angles


:::figure trig_angle_obtuse — An obtuse angle $\theta$
:::





## Reflex angles


:::figure trig_angle_reflex — A reflex angle $\theta$
:::





## Negative angles


:::figure trig_angle_minus — A negative angle $\theta$
:::





## Summary of Signs of Trigonometry Functions


:::figure trig_sign_summary — A summary
:::





## Computing Sine and Cosine

If the angle $\theta$ is between 0 and 90, you can immediately draw a triangle to find sine and cosine of that angle. 


If not, you need to first look at the point and draw an appropriate triangle first. For instance, suppose you want to find.
\[ \sin (390) \]
First, you rotate by 390 degrees. Then, you notice that $390 = 360+30$, so the first 360 degrees rotation loops around and takes you back to the origin. Then, you rotate another 30 degrees. Hence, you have
\[ \sin (390) = \sin (360+30) = \sin (30) = \frac{1}{2}\]
We can summarize as follows.




:::property

\[\sin (360+\theta) = \sin \theta\]
\[\cos (360+\theta) = \cos \theta\]

:::



:::proof

$360 + \theta$ means going around the circle exactly once and returning to the same point, so the result stays unchanged.

:::figure trig_prop_360plus
:::


:::





:::property

\[\sin (180 + \theta) = - \sin \theta\]
\[\cos (180 + \theta) = - \cos \theta \]

:::



:::proof

$180 + \theta$ means going around half the circle, so $\sin \theta$ changes sign (from up to down) and so does $\cos \theta$ (from left to right).

:::figure trig_prop_180plus
:::


:::





:::example

Find $\sin (180 - \theta)$ and $\cos (180 - \theta)$ in terms of $\sin \theta$ and $\cos \theta$.

:::



:::solution

Looking at the graph, we see that $180 - \theta$ degrees is the reflection of the angle $\theta$ across the y-axis. Thus, the height is the same, so $\sin (180 - \theta) = \theta$ and and width becomes negative so $\cos(180 - \theta) = -\cos(\theta)$.

:::figure trig_prop_180minus
:::


:::





:::example

Find $\sin (90 - \theta)$ and $\cos (90 - \theta)$ in terms of $\sin \theta$ and $\cos \theta$.

:::


:::solution

If you draw a triangle with angle $90 - \theta$ degrees, you will notice that the other angle in the triangle, labeled $\alpha$ is exactly $\theta$. This is because we know that the sum of all three angles are 180, so $90 + (90 - \theta) + \alpha = 180$, giving us $\alpha = \theta$.

:::figure trig_prop_90minus1
:::


:::





:::solution
(Continued)
Then, if we focus on the other triangle, we get the following figure.

:::figure trig_prop_90minus2
:::

Notice that the sine and cosine switch place. This is because we rotate the triangle by 90 degrees, so height becomes width and vice versa. Thus, if we compare this new triangle to the original triangle, we get

\[\sin (90 - \theta) = \cos \theta\]
\[\cos (90 - \theta) = \sin \theta \]

:::





:::exercise

Find the following expressions in terms of $\sin \theta$ and $\cos \theta$.


- $\sin (90 + \theta)$ and $\cos (90 + \theta)$

- $\sin (- \theta)$ and $\cos (- \theta)$

- $\sin (270 + \theta)$ and $\cos (270 + \theta)$

- $\tan (90 - \theta)$ and $\tan (90 + \theta)$


:::
