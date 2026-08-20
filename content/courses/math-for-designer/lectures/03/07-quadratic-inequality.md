---
week: 3
order: 7
slug: "quadratic-inequality"
title: "Quadratic Inequality"
source: "tex/lecture03.tex"
---

## Observation

Consider the inequality

:::note

\[x^2 - x - 6 > 0\]

:::

We can try plugging in values of $x$ to see what the solutions would look like.

:::slide




| x | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| x^2-x-6 | 14 | 6 | 0 | -4 | -6 | -6 | -4 | 0 | 6 |


We can guess that the solutions are $x < -2$ and $x > 3$. Likewise, the solution to $x^2-x-6 < 0$ is $-2 < x < 3$. 


We will prove that this is the case.

:::





## Motivation

Suppose we have two real numbers $a$ and $b$ where their product is positive. In other words,
\[ab > 0.\]

:::slide

Then we know that either 


- They are both positive, or 

- They are both negative.

On the other hand, when the product is negative, or
\[ab < 0,\]
then we know that **exactly one** of them is positive and the other is negative.

:::




If we factor $f(x) = a(x-m_1)(x-m_2)$ where $a > 0$, then notice that


- If $x > m_1$ and $x>m_2$, then both terms are positive. In other words, 
\[x-m_1 > 0 \text{ and } x-m_2 > 0,\]
and thus the product is also positive. Therefore, we have $f(x) > 0$.




:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
\draw[<->] (-4,0) -- (4,0);
\node at (-2,-0.5) {$m_1$};
\node at (2,-0.5) {$m_2$};
\draw (-2,0.1) -- (-2,-0.1);
\draw (2,0.1) -- (2,-0.1);
\draw[->, blue, thick] (2,3) -- (4,3);
\draw[->, blue, thick] (2,2) -- (4,2);
\draw[->, blue, thick] (2,1) -- (4,1);
\filldraw[fill = white, draw = blue] (2,3) circle (1mm);
\filldraw[fill = white, draw = blue] (2,2) circle (1mm);
\filldraw[fill = white, draw = blue] (2,1) circle (1mm);
\node at (3,3.2) {$+$};
\node at (3,2.2) {$+$};
\node[above] at (3,1) {$+ \times +$};
\node[below] at (3,1) {$=+$};
\node at (-7,3) {$(x-m_1)$};
\node at (-7,2) {$(x-m_2)$};
\node at (-7,1) {$(x-m_1)\times (x-m_2)$};
\end{tikzpicture}
:::


*A sign of a product when $x > m_2$*






- If $m_1 < x < m_2$, then 
\[x-m_1 > 0 \text{ but } x-m_2 < 0.\] 
Hence, the product is negative. Therefore, we have $f(x) < 0$




:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
\draw[<->] (-4,0) -- (4,0);
\node at (-2,-0.5) {$m_1$};
\node at (2,-0.5) {$m_2$};
\draw (-2,0.1) -- (-2,-0.1);
\draw (2,0.1) -- (2,-0.1);
\draw[blue, thick] (-2,3) -- (2,3);
\draw[red, thick] (-2,2) -- (2,2);
\draw[red, thick] (-2,1) -- (2,1);
\filldraw[fill = white, draw = blue] (2,3) circle (1mm);
\filldraw[fill = white, draw = blue] (-2,3) circle (1mm);
\filldraw[fill = white, draw = red] (2,2) circle (1mm);
\filldraw[fill = white, draw = red] (-2,2) circle (1mm);
\filldraw[fill = white, draw = red] (2,1) circle (1mm);
\filldraw[fill = white, draw = red] (-2,1) circle (1mm);
\node at (0,3.2) {$+$};
\node at (0,2.2) {$-$};
\node[above] at (0,1) {$+ \times -$};
\node[below] at (0,1) {$=-$};
\node at (-7,3) {$(x-m_1)$};
\node at (-7,2) {$(x-m_2)$};
\node at (-7,1) {$(x-m_1)\times (x-m_2)$};
\end{tikzpicture}
:::


*A sign of a product when $m_1 < x < m_2$*






- If $x < m_1$ and $x<m_2$, then both terms are negative. In other words,
\[x-m_1 < 0 \text{ and } x-m_2 < 0,\] 
and thus the product is still positive. Therefore, we have $f(x) > 0$.




:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
\draw[<->] (-4,0) -- (4,0);
\node at (-2,-0.5) {$m_1$};
\node at (2,-0.5) {$m_2$};
\draw (-2,0.1) -- (-2,-0.1);
\draw (2,0.1) -- (2,-0.1);
\draw[<-|, red, thick] (-4,3) -- (-2,3);
\draw[<-|, red, thick] (-4,2) -- (-2,2);
\draw[<-|, blue, thick] (-4,1) -- (-2,1);
\filldraw[fill = white, draw = red] (-2,3) circle (1mm);
\filldraw[fill = white, draw = red] (-2,2) circle (1mm);
\filldraw[fill = white, draw = blue] (-2,1) circle (1mm);
\node at (-3,3.2) {$-$};
\node at (-3,2.2) {$-$};
\node[above] at (-3,1) {$-\times -$};
\node[below] at (-3,1) {$=+$};
\node at (-7,3) {$(x-m_1)$};
\node at (-7,2) {$(x-m_2)$};
\node at (-7,1) {$(x-m_1)\times (x-m_2)$};
\end{tikzpicture}
:::


*A sign of a product when $x < m_1$*




Putting them all together, we have the following complete picture.



:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
\draw[<->] (-4,0) -- (4,0);
\node at (-2,-0.5) {$m_1$};
\node at (2,-0.5) {$m_2$};
\draw (-2,0.1) -- (-2,-0.1);
\draw (2,0.1) -- (2,-0.1);

\draw[->, blue, thick] (-2,3) -- (4,3);
\draw[->, blue, thick] (2,2) -- (4,2);
\draw[->, blue, thick] (2,1) -- (4,1);
\node at (3,3.2) {$+$};
\node at (3,2.2) {$+$};
\node[above] at (3,1) {$+ \times +$};
\node[below] at (3,1) {$=+$};

\draw[<-, red, thick] (-4,3) -- (-2,3);
\draw[<-, red, thick] (-4,2) -- (2,2);
\draw[-, red, thick] (-2,1) -- (2,1);
\node at (0,3.2) {$+$};
\node at (0,2.2) {$-$};
\node[above] at (0,1) {$+ \times -$};
\node[below] at (0,1) {$=-$};

\draw[<-, blue, thick] (-4,1) -- (-2,1);
\node at (-3,3.2) {$-$};
\node at (-3,2.2) {$-$};
\node[above] at (-3,1) {$-\times -$};
\node[below] at (-3,1) {$=+$};

\node at (-7,3) {$(x-m_1)$};
\node at (-7,2) {$(x-m_2)$};
\node at (-7,1) {$(x-m_1)\times (x-m_2)$};
\end{tikzpicture}
:::


*A sign of a product for any real number $x$*





## Solutions of Quadratic Inequality


:::theorem

Let $f(x) = ax^2 + bx + c$ be a quadratic function. If $a>0$ and 
\[f(x) = a(x-m_1)(x-m_2)\]
where $m_1, m_2$ are the roots of $f(x)$ with $m_1 \leq m_2$, then 


- The solutions to $f(x) > 0$ are
\[x < m_1 \text{ or } x > m_2.\] 

- The solutions to $f(x) < 0$ are
\[m_1 < x < m_2.\] 


:::






:::example

Solve the quadratic inequality
\[x^2 - 3x + 2 < 0.\]

:::


:::solution

First, we find the roots of the function $f(x) = x^2-3x+2$ and get $x = 1$ and $x=2$. So, we can rewrite the inequality as
\[(x-1)(x-2) < 0\]

:::





:::solution




:::tikz TikZ diagram
\begin{tikzpicture}
\draw[<->] (0,0) -- (3,0);
\draw (1,0.1) -- (1,-0.1);
\draw (2,0.1) -- (2,-0.1);
\node at (1,-0.5) {1};
\node at (2,-0.5) {2};
\draw[<-, red, thick] (0,3) -- (1,3);
\draw[->, blue, thick] (1,3) -- (3,3);
\draw[<-, red, thick] (0,2) -- (2,2);
\draw[->, blue, thick] (2,2) -- (3,2);
\draw[<-, blue, thick] (0,1) -- (1,1);
\draw[red, thick] (1,1) -- (2,1);
\draw[->, blue, thick] (2,1) -- (3,1);
\node at (0.5,3.2) {$-$};
\node at (1.5,3.2) {$+$};
\node at (2.5,3.2) {$+$};
\node at (0.5,2.2) {$-$};
\node at (1.5,2.2) {$-$};
\node at (2.5,2.2) {$+$};
\node[above] at (0.5,1) {$+$};
\node[above] at (1.5,1) {$-$};
\node[above] at (2.5,1) {$+$};
\node at (-2,3) {$(x-1)$};
\node at (-2,2) {$(x-2)$};
\node at (-2,1) {$(x-1)\times (x-2)$};
\end{tikzpicture}
:::


*The signs of values of $f(x)=x^2-3x+2$ in each interval.*

Since we want $f(x) < 0$, the solutions are $x \in (1,2)$.

:::






:::example

Solve the quadratic inequality
\[x^2 > x.\]

:::


:::solution

It's tempting to *divide $x$ on both sides*, but please resist it. First, we need to rewrite it as
\[x^2 - x > 0.\]
Then, we can find the roots of the function $f(x) = x^2-x$ to be $x=0$ and $x=1$. Thus, we have
\[x(x-1) > 0.\]

:::





:::solution




:::tikz TikZ diagram
\begin{tikzpicture}
\draw[<->] (-1,0) -- (2,0);
\draw (1,0.1) -- (1,-0.1);
\draw (0,0.1) -- (0,-0.1);
\node at (0,-0.5) {0};
\node at (1,-0.5) {1};
\draw[<-, red, thick] (-1,3) -- (0,3);
\draw[->, blue, thick] (0,3) -- (2,3);
\draw[<-, red, thick] (-1,2) -- (1,2);
\draw[->, blue, thick] (1,2) -- (2,2);
\draw[<-, blue, thick] (-1,1) -- (0,1);
\draw[red, thick] (0,1) -- (1,1);
\draw[->, blue, thick] (1,1) -- (2,1);
\node at (-0.5,3.2) {$-$};
\node at (0.5,3.2) {$+$};
\node at (1.5,3.2) {$+$};
\node at (-0.5,2.2) {$-$};
\node at (0.5,2.2) {$-$};
\node at (1.5,2.2) {$+$};
\node[above] at (-0.5,1) {$+$};
\node[above] at (0.5,1) {$-$};
\node[above] at (1.5,1) {$+$};
\node at (-3,3) {$x$};
\node at (-3,2) {$(x-1)$};
\node at (-3,1) {$x\times (x-1)$};
\end{tikzpicture}
:::


*The signs of values of $f(x)=x^2-x$ in each interval.*

Since we want $f(x) > 0$, the solutions are $x<0$ or $x>1$.

:::





## Duplicate roots

If the roots are the same, then everything we have still holds, with $m_1 = m_2$. For instance
\[(x-m)(x-m) >0\] 
when $x<m$ or $x>m$. In other words, when $x \neq m$.

On the other hand,
\[(x-m)(x-m) < 0\]
when $m < x < m$, which implies that there are no solutions!




:::exercise

Find the set of solutions for each of the following inequalities.


- $x^2 - 9 \geq 0$

- $x^2+3x+3 < 1$

- $x^2 > x+2$

- $2x-x^2 \leq 4-3x$


:::
