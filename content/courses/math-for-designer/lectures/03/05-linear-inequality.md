---
week: 3
order: 5
slug: "linear-inequality"
title: "Linear Inequality"
source: "tex/lecture03.tex"
---

## Addition Property


:::theorem

For any real numbers $a,b$, if
\[a<b,\]
then for any real number $c$ we have
\[a + **c** < b + **c**.\]
Moreover, these properties also apply to $a \leq b, a > b$ and $a \geq b$.

:::







:::tikz TikZ diagram
\begin{tikzpicture}
\foreach \y in {0,2}
{
	\draw[<->] (-4,\y) -- (4,\y);
	\foreach \x in {-3,-2,...,3} 
	{
		\draw (\x, \y+0.1) -- (\x, \y-0.1); 
	}
}
\filldraw (-3,2) circle (1mm) node[above] {$a$};
\node[above] at (-2,2) {$<$};
\filldraw (-1,2) circle (1mm) node[above] {$b$};
\filldraw (1,0) circle (1mm) node[below] {$a+c$};
\node[below] at (2,0) {$<$};
\filldraw (3,0) circle (1mm) node[below] {$b+c$};
\draw[dashed] (-3,2) -- (1,0);
\draw[dashed] (-1,2) -- (3,0);
\draw[blue, |-|, thick] (-3,-0.5) -- (1,-0.5) node[below, pos=0.5] {$c$};
\draw[blue, |-|, thick] (-1,-1) -- (3,-1) node[below, pos=0.5] {$c$};
\end{tikzpicture}
:::
*The addition property*






:::example

Find the solutions of the following inequalities.


- $x-5 \leq 10$

- $x+1 > -4$


:::


:::solution



- \begin{eq*}
x - 5 &\leq& 10 

x-5 + 5 &\leq& 10+5

x &\leq& 15 

x &\in& (-\infty, 15]
\end{eq*}

- \begin{eq*}
x +1 &>& -4 

x+1-1 &>& -4-1

x &>& -5 

x &\in& (-5,\infty)
\end{eq*}


:::





## Multiplication Property


:::theorem



- For any real number $a$ and positive real number $b$,
\[\text{ if } \quad x<a, \text{ then} \quad bx < ba.\]

- For any real number $a$ and **negative** real number $b$,
\[\text{ if } \quad x<a, \text{ then} \quad bx\, ** > **\, ba.\]

Moreover, these properties also apply to $a \leq b, a > b$ and $a \geq b$.

:::







:::tikz TikZ diagram
\begin{tikzpicture}
\foreach \y in {0,2}
{
	\draw[<->] (-1,\y) -- (9,\y);
	\foreach \x in {0,1,...,8} 
	{
		\draw (\x, \y+0.1) -- (\x, \y-0.1); 
	}
}
\node[above] at (0,2) {$0$};
\node[above] at (1,2) {$1$};
\filldraw (2,2) circle (1mm) node[above] {$a$};
\node[above] at (3,2) {$<$};
\filldraw (4,2) circle (1mm) node[above] {$b$};
\node[above] at (0,0) {$0$};
\node[below] at (2,0) {$c$};
\filldraw (4,0) circle (1mm) node[below] {$ca$};
\node[below] at (6,0) {$<$};
\filldraw (8,0) circle (1mm) node[below] {$cb$};
\draw[dashed] (0,4) -- (0,0);
\draw[dashed] (0,4) -- (2,0);
\draw[dashed] (0,4) -- (4,0);
\draw[dashed] (0,4) -- (8,0);
\draw[blue, |-|, thick] (0,-0.5) -- (2,-0.5) node[below, pos=0.5] {$c$};
\end{tikzpicture}
:::
*The multiplication property when $c$ is positive*


If $a < b$ and $c$ is positve, then $ca < cb$.








:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
\foreach \y in {0,2}
{
	\draw[<->] (-9,\y) -- (5,\y);
	\foreach \x in {-8, -7,...,4} 
	{
		\draw (\x, \y+0.1) -- (\x, \y-0.1); 
	}
}
\node[above] at (0,2) {$0$};
\node[above] at (1,2) {$1$};
\filldraw (2,2) circle (1mm) node[above] {$a$};
\node[above] at (3,2) {$<$};
\filldraw (4,2) circle (1mm) node[above] {$b$};
\node[above] at (0,0) {$0$};
\node[below] at (-2,0) {$c$};
\filldraw (-4,0) circle (1mm) node[below] {$ca$};
\node[below] at (-6,0) {$<$};
\filldraw (-8,0) circle (1mm) node[below] {$cb$};
\draw[dashed] (1,2) -- (-2,0);
\draw[dashed] (2,2) -- (-4,0);
\draw[dashed] (4,2) -- (-8,0);
\draw[blue, |-|, thick] (0,-0.5) -- (-2,-0.5) node[below, pos=0.5] {$-c$};
\end{tikzpicture}
:::
*The multiplication property when $c$ is negative*


If $a < b$ and $c$ is negative, then $ca > cb$.






:::example

Find the solutions of the following inequalities.


- $2x \leq 10$

- $4x+1 > 5$


:::


:::solution



- \begin{eq*}
2x &\leq& 10 

\frac{1}{2} (2x) &\leq& \frac{1}{2}(10)

x &\leq& 5 

x &\in& (-\infty, 5]
\end{eq*}

- \begin{eq*}
4x +1 &>& 5 

4x+1-1 &>& 5-1

4x &>& 4 

\frac{1}{4} x &>& \frac{1}{4} (4) 

x &>& 1 

x &\in& (1,\infty)
\end{eq*}


:::







:::example

Find the solutions of the following inequalities.


- $-2x+2 \leq 10$

- $-3x > 4$


:::


:::solution



- \begin{eq*}
-2x+2 &\leq& 10 

-2x &\leq& 8

x &**\geq**& -4 

x &\in& (-4, \infty)
\end{eq*}

- \begin{eq*}
-3x &>& 4 

x &**<**& -\frac{4}{3}

x &\in& \left(-\infty, \frac{4}{3}\right)
\end{eq*}


:::





:::exercise

Find the set of solutions for each of the following inequalities.


- $x + 3 < 5$

- $3x + 4 \geq -1$

- $-x + 4 > 2$

- $-4x - 6 \leq 10$


:::







:::example

Let Mario be at position $x$, and let Koopa occupy the closed interval $[1,4]$ at the same height as Mario. Suppose Mario's hitbox is a closed interval from one unit to the left and one unit to right of his position.


- Draw Koopa's and Mario's hitboxes on the real line when Mario's position is at $x=6$.

- Describe the inequalities where Mario's hitbox **does not** overlap with Koopa.

- Find the solutions.


:::


:::figure ineq_abs_mario_ex.png
:::





:::solution



- Here.



:::tikz TikZ diagram
\begin{tikzpicture}
\foreach \x in {0,1,...,7} 
{
	\draw (\x, 0.1) -- (\x, -0.1) node[anchor = north] {\x};
}
\draw[<->] (-1,0) -- (8,0);
\draw[green, thick] (1,0.3) -- (4,0.3);
\draw[red, thick] (5,0.3) -- (7,0.3);
\fill[red] (6,0.3) circle (1mm);
\end{tikzpicture}
:::
*Positions of Koopa and Mario*


- There are two possible scenario.


- The edge on the left of Mario's hitbox is to the right of Koopa's interval. This means that we have
\[x-1 > 4,\]

- On the other hand, it's also possible that the edge on the right of Mario's hitbox is to the left of Koopa's interval. This means we have
\[x+1 < 1.\]



:::





:::solution



- Combining both inequalities, we obtain
\[x < 0 \quad \text{or} \quad x > 5.\]
In interval notation, we have $x \in (-\infty, 0) \cup (5, \infty)$.




:::tikz TikZ diagram
\begin{tikzpicture}
\foreach \x in {-2,-1,...,7} 
{
	\draw (\x, 0.1) -- (\x, -0.1) node[anchor = north] {\x};
}
\draw[<->] (-3,0) -- (8,0);
\draw[dashed, green, thick] (1,0.3) -- (4,0.3);
\draw[->, red, thick] (5,0.3) -- (8,0.3);
\draw[->, red, thick] (0,0.3) -- (-3,0.3);
\filldraw[fill = white, draw = red] (0,0.3) circle (1.5mm);
\filldraw[fill = white, draw = red] (5,0.3) circle (1.5mm);
\end{tikzpicture}
:::
*The intervals of positions where Mario is safe.*


:::
