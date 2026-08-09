---
week: 3
order: 6
slug: "absolute-ineq"
title: "Absolute Value Inequality"
source: "tex/lecture03.tex"
---

## Absolute Value Function


:::definition

Define the absolute value function 
\[|x| = \begin{cases} x \quad &\text{ if } x \geq 0 
-x \quad &\text{ if } x < 0 \end{cases}\]

:::


:::example

\[|3| = 3, \quad |-4| = 4, \quad |0| = 0\]

:::





## Alternate Definition: Distance Between Points

Simple absolute value inequality can be solved directly from the definition.

:::definition

Let $a$ be a real number. The function
\[f(x) = |x - a|\]
is equals to the distance between the points $x$ and $a$ on the real line.

:::






:::example

Solve the following absolute value inequality
\[|x-4| < 2.\]

:::


:::solution

The inequality is the set of real numbers $x$ such that the distance between $x$ and 4 is less than 2. 



:::tikz TikZ diagram
\begin{tikzpicture}
\foreach \x in {2,3,...,6} 
{
	\draw (\x, 0.1) -- (\x, -0.1) node[anchor = north] {\x};
}
\draw[<->] (1,0) -- (7,0);
\draw[<-|, green, thick] (2,0.6) -- (3.9,0.6) node[above, pos=0.5] {2};
\draw[|->, green, thick] (4.1,0.6) -- (6,0.6) node[above, pos=0.5] {2};
\draw[red, thick] (2,0.3) -- (6,0.3);
\filldraw[fill = white, draw = red] (2,0.3) circle (1.5mm);
\filldraw[fill = white, draw = red] (6,0.3) circle (1.5mm);
\end{tikzpicture}
:::
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


Thus, the solutions are $x \in (-\infty,6) \cup (0, \infty)$.

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
\iffalse

- $|x-1| > |x|$ (Hint: transforming the absolute value one at a time. You should have 4 different inequalities.)

- (Challenge:) Solve $|x-1| > |x+1|$ using the alternate definition of absolute value function.
\fi


:::
