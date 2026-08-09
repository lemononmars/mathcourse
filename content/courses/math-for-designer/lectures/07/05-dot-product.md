---
week: 7
order: 5
slug: "dot-product"
title: "Dot Product"
source: "tex/lecture07.tex"
---

So far, we know how to multiply a scalar to a vector, but can we multiply a vector to another vector?

## Dot Product


:::definition

Given vectors $\vec{v} = \cvec{a}{b}$ and $\vec{w} = \cvec{c}{d}$, the **dot product** is 
\begin{equation}
\vec{v} \cdot \vec{w} = ac + bd
\end{equation}

:::

Note that the result is a **scalar**, not a **vector**!





:::example

Compute the dot products.


- $\bv{3,4} \cdot \bv{1,2}$

- $\bv{-2,2} \cdot \bv{-2,1}$

- $\bv{0,3} \cdot \bv{9,0}$

- $\bv{2,-2,1} \cdot \bv{1,1,3}$


:::


:::solution



- $\bv{3,4} \cdot \bv{1,2} \pa = (3 \times 1) \pa + (4 \times 2) \pa = 3 + 8 \pa = 11$ \pa

- $\bv{-2,2} \cdot \bv{-2,1} \pa = ((-2) \times (-2)) \pa + (2 \times 1) \pa = 4 + 2 \pa = 6$ \pa

- $\bv{0,3} \cdot \bv{9,0} \pa = (0 \times 9) + (3 \times 0) \pa = 0 + 0 \pa = 0$ \pa

- $\bv{2,-2,1} \cdot \bv{1,1,3} \pa = (2 \times 1) \pa + ((-2) \times 1) \pa + (1 \times 3) \pa = 2 + (-2) + 3 \pa = 3$


:::




## Dot product application

Why is the dot product defined this way? One reason is that the formula will be useful in other applications. For instance, we have the following theorem.


:::theorem

Given vectors $\vec{v}, \vec{u}$ and let $\theta$ be the angle between both vectors. Then,
\[ \cos \theta = \frac{\vec{v} \cdot \vec{u}}{\| \vec{v} \| \| \vec{u} \|}\]

:::


Then, using this application, we can view the dot product as the product of the length of vectors after one vector is projected onto the other vector.




## Angel between vectors


:::definition

Given vectors $\vec{u}$ and $\vec{v}$, then the angle $\theta$ between vectors is the angle measured when both vectors start at the origin such that $0 \leq \theta \leq \pi$.

:::





:::tikz TikZ diagram
\begin{tikzpicture}
\draw[->, blue] (0,0) -- (10:2) node [right] {$\vec{u}$};
\draw[->, red] (0,0) -- (60:2) node [above] {$\vec{v}$};
\filldraw[fill = teal!50!white, draw = teal] (0,0) -- (10:1) arc [start angle = 10, end angle = 60, radius = 1] -- cycle;
\node at (35:0.5) {$\theta$};
\begin{scope}[xshift = 4cm]
\draw[->, blue] (0,0) -- (10:2) node [right] {$\vec{u}$};
\draw[->, red] (0,0) -- (120:2) node [above] {$\vec{v}$};
\filldraw[fill = teal!50!white, draw = teal] (0,0) -- (10:1) arc [start angle = 10, end angle = 120, radius = 1] -- cycle;
\node at (55:0.5) {$\theta$};
\end{scope}
\begin{scope}[xshift = 8cm, yshift = 2cm]
\draw[->, blue] (0,0) -- (10:2) node [right] {$\vec{u}$};
\draw[->, red] (0,0) -- (240:2) node [above] {$\vec{v}$};
\filldraw[fill = teal!50!white, draw = teal] (0,0) -- (240:1) arc [start angle = 240, end angle = 370, radius = 1] -- cycle;
\node at (305:0.5) {$\theta$};
\end{scope}
\end{tikzpicture}
:::
*Angle $\theta$ between $\vec{u*$ and $\vec{v}$}





:::theorem

Let $\theta$ be the angle between $\vec{u}$ and $\vec {v}$ then 
\begin{equation}
\cos \theta = \frac{\vec{u} \cdot \vec{v} }{\| \vec{u} \|\| \vec{v} \|.}
\end{equation} \pa
Consequently, we have
\begin{equation}
\theta = \arccos \left( \frac{\vec{u} \cdot \vec{v} }{\| \vec{u} \|\| \vec{v} \|} \right), \quad 0 \leq \theta \leq \pi.
\end{equation}

:::






:::example

Find the angle $\theta$ between $\bv{1,4}$ and $\bv{4,1}$

:::


:::solution
Compute the dot product and norms. \pa
\begin{eq*} 
\| \bv{1,4} \| \pa &=& \sqrt{1^2+4^2} = \sqrt{17} \pa 

\| \bv{4,1} \| \pa &=& \sqrt{4^2+1^2} = \sqrt{17} \pa 

\bv{1,4} \cdot \bv{4,1} \pa &=& (1\times 4) + (4 \times 1) = 8
\end{eq*}
Then, \pa

\[\cos \theta = \frac{\vec{u} \cdot \vec{v} }{\| \vec{u} \|\| \vec{v} \|} \pa = \frac{8}{\sqrt{17}\times \sqrt{17}} \pa = \frac{8}{17}\]
Therefore, $\theta = \arccos \left( \frac{8}{17} \right)$

:::




This gives us an application of the dot product.

:::slide


:::theorem

Given vectors $\vec{u}$ and $\vec{v}$ such that $\vec{u} \neq \vec{0}$ and $\vec{v} \neq \vec{0}$ where $\theta$ is the angle between the vectors. \pa


- If $\vec{u} \cdot \vec{v} = 0$ \pa, then $\theta = \tfrac{\pi}{2}$ implying that they are perpendicular to each other. We denote this as $\vec{u} \perp \vec{v}$. \pa

- If $\vec{u} \cdot \vec{v} > 0$ \pa, then $\theta$ is an acute angle ($0 \leq \theta < \tfrac{\pi}{2}$) \pa

- If $\vec{u} \cdot \vec{v} < 0$ \pa, then $\theta$ is an obtuse angle ($\tfrac{\pi}{2} < \theta \leq \pi$) \pa


:::


:::





\iffalse


:::exercise



- Simplify the following expressions.


- $ \cvec{1}{2} + \cvec{3}{4}$

- $ 3\cvec{2}{1}$

- $ (-2)\cvec{1}{-4}$



- Compute the norm of these vectors.


- $ \cvec{0}{2}$

- $\cvec{3}{4}$

- $\cvec{-2}{1}$



- Compute the dot products.


- $ \cvec{1}{2} \cdot \cvec{3}{4}$

- $ \cvec{-2}{1} \cdot \cvec{5}{+6}$



:::


\fi
