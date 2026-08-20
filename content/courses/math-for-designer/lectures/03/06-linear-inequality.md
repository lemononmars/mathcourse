---
week: 3
order: 6
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

x &\in& [-4, \infty)
\end{eq*}

- \begin{eq*}
-3x &>& 4 

x &**<**& -\frac{4}{3}

x &\in& \left(-\infty, -\frac{4}{3}\right)
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





lldraw[fill = white, draw = red] (2,0.3) circle (1.5mm);
\filldraw[fill = white, draw = red] (6,0.3) circle (1.5mm);
\end{tikzpicture}
*The interval solution of $|x-4| < 2$*


We can find the interval on the real line to be $(2,6)$, thus $x \in (2,6)$.

:::






:::example

Solve the following absolute value inequality
\[|x+3| \geq 3.\]

:::


:::solution

First, rewrite the function as $|x+3| = |x - (-3)|$. 

Then, the inequality is the set of real numbers $x$ such that the distance between $x$ and $-3$ is greater than or equals to 3. 




:::tikz TikZ diagram
\begin{tikzpicture}
\foreach \x in {-6,-5,...,0} 
{
	\draw (\x, 0.1) -- (\x, -0.1) node[anchor = north] {\x};
}
\draw[<->] (-7,0) -- (1,0);
\draw[<-|, green, thick] (-6,0.6) -- (-3.1,0.6) node[above, pos=0.5] {3};
\draw[|->, green, thick] (-2.9,0.6) -- (0,0.6) node[above, pos=0.5] {3};
\draw[<-, red, thick] (-7,0.3) -- (-6,0.3);
\draw[->, red, thick] (0,0.3) -- (1,0.3);
\fill[red] (-6,0.3) circle (1.5mm);
\fill[red] (0,0.3) circle (1.5mm);
\end{tikzpicture}
:::


*The interval solution of $|x+3| \geq 3$*


Thus, the solutions are $x \in (-\infty,-6] \cup [0, \infty)$.

:::





## Absolute Value Inequality

In general, you can solve an absolute value inequality first by getting rid of the absolute value as follows.

:::definition

For functions $f(x)$ and $g(x)$, an absolute value inequality is an inequality of the form:


- $| f(x) | < g(x)$. This is equivalent to 
\[-g(x) < f(x) < g(x), \text{ or } -g(x) < f(x) \text{ and } f(x) < g(x).\]

- $|f(x)| > g(x)$. This is equivalent to 
\[f(x) < -g(x) \text{ or } f(x) > g(x).\]

These statements also apply to $|f(x)| \leq k$ and $|f(x)| \geq k$.

:::






:::example

Solve the following absolute value inequality.


- $|x-3| < 4$

- $|2x+1 | \geq 5$


:::


:::solution



- \begin{eq*}
-4 &<& x-3 < 4 

-4+3 &<& x < 4+3 

-1 &<& x < 7 

x &\in& (-1,7)
\end{eq*}

- \begin{eq*}
2x+1 \leq -5 &\text{or}& 2x+1 \geq 5 

2x \leq -6 &\text{or}& 2x \geq 4 

x \leq -3 &\text{or} & x \geq 2 

x \in (-\infty, -3] &\cup& [2 ,\infty)
\end{eq*}


:::






:::example

Solve the following absolute value inequality.
$|x-3| < 2x$

:::


:::solution

\begin{eq*}
-2x < &x-3& < 2x 

-2x < x-3 &\text{ and }& x-3<2x 

3 < 3x &\text{ and }& -3 < x 

1 < x &\text{ and }& -3 < x
\end{eq*}
We see that these two cases overlap, and so the solutions are $x > 1$ or $x \in (1, \infty)$.

Alternatively, we can use the interval notation to get the intersection
\[x \in (1, \infty) \cap (-3, \infty) = (1, \infty).\]

:::






:::example

Let's revisit Mario and Koopa. Instead of representing Koopa as the closed interval $[1,4]$, we let Koopa's position be $2.5$ and let its width be 3. Now, we want to know when Mario hits Koopa.


- Describe what happens when two objects overlap, in terms of their positions and widths. It is helpful to use the real line and indicate all the parameters.

- Express this fact using an absolute value inequality.

- Find the solutions.


:::


:::figure ineq_abs_mario_ex.png
:::





:::solution



- They overlap when the distance between their centers is less than the total of half of their widths.



:::tikz TikZ diagram
\begin{tikzpicture}
\draw[<->] (0,0) -- (6,0);
\draw[green] (1,0.5) -- (4,0.5);
\draw[red] (3.5,0.8) -- (5.5,0.8);
\draw[|-|, blue] (2.5,1.5) -- (4.5,1.5) node[pos=0.5, above] {distance};
\draw[dashed] (2.5,1.5) -- (2.5,0.5);
\draw[dashed] (4.5,1.5) -- (4.5,0.8);
\fill[green] (2.5,0.5) circle (1mm) node[below] {center};
\fill[red] (4.5,0.8) circle (1mm) node[below] {center};
\end{tikzpicture}
:::


*The distance between Mario's and Koopa's center.*


- Since the total of their widths is $1+1.5 = 2.5$, we have the inequality
\[ |x-2.5| < 2.5.\]


:::






:::solution



- The solutions of
\[ |x-2.5| \leq 2.5\]
are
\begin{eq*}
-2.5 \leq &x-2.5& \leq 2.5 

0 \leq &x& \leq 5 

&x \in [0,5] &
\end{eq*}
Thus, their hitboxes overlap when $x \in [0,5]$. In other words, they do not overlap when $x \in (-\infty, 0)$ and $x \in (5, \infty)$. Note that this approach results in a cleaner solution than the previous one.


:::





:::exercise

Find the set of solutions for each of the following inequalities.


- $|4x-3| <5 $

- $|x| \geq 2x$

- $x < |3x-4| < 5x$ (Hint: this implies there are two inequalities. )




:::


\fi
