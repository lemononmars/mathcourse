---
week: 3
order: 4
slug: "inequality"
title: "Inequality"
source: "tex/lecture03.tex"
---

## Motivation


:::figure ineq_hitbox — Hitboxes in Mario
:::






## Keywords

Comparison (greater, smaller), superlative (greatest, smallest) 
\bigskip

\[ <, \quad >, \quad \leq, \quad \geq\]


:::remark



- ``$a$ is greater than $b$'' means $a > b$.

- ``$a$ is greater than or equal to $b$'' means $a \geq b$.

- ``$a$ is at least $b$'' means $a \geq b$.


:::





## Inequality and Set

We can use interval notation to represent the set of solutions of an inequality.

:::definition

Let $a$ and $b$ be real numbers.
\begin{eqnarray*}
x < a &\longrightarrow& x \in (-\infty, a) 

x \leq a &\longrightarrow& x \in (-\infty, a] 

x > a &\longrightarrow& x \in (a, \infty) 

x \geq a &\longrightarrow& x \in [a, \infty) 

\bigskip 

a < x < b &\longrightarrow& x \in (a,b) 

x < a \text{ or } x > b &\longrightarrow& x \in (-\infty, a) \cup (b, \infty)
\end{eqnarray*}

:::







:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
\foreach \y in {0,2,4,6}
{
	\draw[red, thick] (-2,\y+0.3) -- (1,\y+0.3);
	\foreach \x in {-3, -2, -1,..., 3} {
		\draw[<->] (-4,\y) -- (4,\y);
		\draw (\x,\y+0.1) -- (\x,\y-0.1) node[anchor = north] {\x};
	}
}
\begin{scope}[xshift = -60mm]
\node at (0,6) {(-2,1)};
\node at (0,6.5) {$-2<x<1$};
\node at (0,4) {[-2,1]};
\node at (0,4.5) {$-2 \leq x \leq 1$};
\node at (0,2) {[-2,1)};
\node at (0,2.5) {$-2 \leq x<1$};
\node at (0,0) {(-2,1]};
\node at (0,0.5) {$-2 < x\leq 1$};
\end{scope}
\foreach \x / \y in {-2/6, 1/6, 1/2, -2/0}
	\filldraw[draw = red, fill = white] (\x,\y+0.3) circle (1.5mm);
\foreach \x / \y in {-2/4, 1/4, -2/2, 1/0}
	\fill[red] (\x,\y+0.3) circle (1.5mm);
\end{tikzpicture}
:::
*Types of intervals*







:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
\foreach \y in {0,2,4,6}
{
	\foreach \x in {-3, -2, -1,..., 3} {
		\draw[<->] (-4,\y) -- (4,\y);
		\draw (\x,\y+0.1) -- (\x,\y-0.1) node[anchor = north] {\x};
	}
}
\draw[->, red, thick] (1,6.3) -- (4,6.3);
\draw[->, red, thick] (1,4.3) -- (4,4.3);
\draw[->, red, thick] (0,2.3) -- (-4,2.3);
\draw[->, red, thick] (0,0.3) -- (-4,0.3);
\begin{scope}[xshift = -60mm]
\node at (0,6) {$(1, \infty)$};
\node at (0,6.5) {$x > 1$};
\node at (0,4) {$[1, \infty)$};
\node at (0,4.5) {$x \geq 1$};
\node at (0,2) {$(-\infty, 0)$};
\node at (0,2.5) {$x < 0$};
\node at (0,0) {$(-\infty,0]$};
\node at (0,0.5) {$x \leq 0$};
\end{scope}
\foreach \x / \y in {1/6, 0/2}
	\filldraw[draw = red, fill = white] (\x,\y+0.3) circle (1.5mm);
\foreach \x / \y in {1/4, 0/0}
	\fill[red] (\x,\y+0.3) circle (1.5mm);
\end{tikzpicture}
:::
*Types of intervals*






## Compound Inequality

One statement may include more than one inequality. For instance,
\[0 < x \leq 2\]
means
\[0 < x \quad \text{ and } x \leq 2.\]
Even though usually you can solve both equations altogether, it is recommended to solve each of them separately and find the common solution using set intersection.




:::exercise

Express the solutions to the following inequalities using interval notation.


- $x \leq 3$

- $x > 2$

Write down an inequality whose solutions are the following intervals.


- $(2, \infty)$

- $(-\infty, -3]$

- $[0.5, 1.5)$

- $(-\infty, 1) \cup (2, \infty)$



:::
