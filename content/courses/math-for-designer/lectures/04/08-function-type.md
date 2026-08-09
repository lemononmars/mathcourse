---
week: 4
order: 8
slug: "function-type"
title: "Function Type"
source: "tex/lecture04.tex"
---

## Basic Functions

We will learn some basic functions.


- Constant function

- Linear function

- Quadratic function

- Polynomial function

- Rational function

- Absolute value function





## 1. Constant Function

A constant function is of the form

:::note
\[f(x) = c\]
:::

when $c$ is a constant. The graph is a horizontal line parallel to the x-axis. 
**Ex.** $f(x) = -2, f(x) = 5$ 





:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.5, smooth, domain = -2:2]
\axes{-2}{2}{-2}{2};
\draw[blue] plot (\x, 1.8);
\node[blue] at (0, -3) {$f(x) =4$};
\begin{scope}[xshift = 6cm]
\axes{-2}{2}{-2}{2};
\draw[red] plot (\x, 0.25);
\node[red] at (0,-3) {$f(x) = 0.5$};
\end{scope}
\begin{scope}[xshift = 12cm]
\axes{-2}{2}{-2}{2};
\draw[teal] plot (\x, -1);
\node[teal] at (0,-3) {$f(x) = -2$};
\end{scope}
\end{tikzpicture}
:::
*Constant functions $f(x) = c$*





## 2. Linear Function

A linear function is of the form 

:::note
\[f(x) = ax+b\]
:::

where $a,b$ are constants and $a \neq 0$. 
**Ex.** $f(x) = 2x, f(x) = -3x + 1$ 




:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.5, smooth, domain = -2:2]
\axes{-2}{2}{-2}{2};
\draw[blue] plot (\x, {\x});
\node[blue] at (0,-3) {$f(x) =x$};
\begin{scope}[xshift = 6cm]
\axes{-2}{2}{-2}{2};
\draw[red] plot (\x, {1-\x});
\node[red] at (0,-3) {$f(x) = 1-x$};
\end{scope}
\begin{scope}[xshift = 12cm]
\axes{-2}{2}{-2}{2};
\draw[teal] plot[domain = -1:2] (\x, {2*\x-1});
\node[teal] at (0,-3) {$f(x) = 2x-1$};
\end{scope}
\end{tikzpicture}
:::
*Linear functions $f(x) = ax+b$*





## 3. Quadratic Function

A quadratic function is of the form

:::note
\[f(x) = ax^2+bx+c\]
:::

when $a,b,c$ are constants and $a \neq 0$. The graph is called a **parabola**.

**Ex.** $f(x) = x^2+2x+3, f(x) = 5x^2 - 4$ 





:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.45, smooth, domain = -2:2]
\axes{-2}{2}{-2}{2};
\draw[blue] plot[domain = -1.5:1.5] (\x, {\x*\x});
\node[blue] at (0,-3) {$f(x) =x^2$};
\begin{scope}[xshift = 6cm]
\axes{-2}{2}{-2}{2};
\draw[red] plot[domain = -1.5:1.5] (\x, {3-2*(\x*\x)});
\node[red] at (0,-3) {$f(x) = 3-2x^2$};
\end{scope}
\begin{scope}[xshift = 12cm]
\axes{-2}{2}{-2}{2};
\draw[teal] plot[domain = -1.5:2] (\x, {(\x*\x)-\x-2});
\node[teal] at (0,-3) {$f(x) = x^2-x-2$};
\end{scope}
\end{tikzpicture}
:::
*Quadratic functions $f(x) = ax^2+bx+c$*





## 4. Polynomial Function

A polynomial function (also called a polynomial) is of the form 

:::note
\[f(x) = a_n x^n + a_{n-1}x^{n-1} + \ldots + a_2 x^2 + a_1 x + a_0\] 
:::

where $a_n, a_{n-1}, \ldots, a_2, a_1, a_0$ are all constants and $n \geq 0$ is an integer. 





:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.5, smooth, domain = -2:2]
\axes{-2}{2}{-2}{2};
\draw[blue] plot[domain = -1.2:1.2] (\x, {\x^3});
\node[blue, scale = 0.6] at (0,-3) {$f(x) =x^3$};
\begin{scope}[xshift = 6cm]
\axes{-2}{2}{-2}{2};
\draw[red] plot[domain = -2:2] (\x, {((\x*\x*\x*\x)-(5*(\x*\x))+4)/2});
\node[red, scale = 0.6] at (0,-3) {$f(x) = x^4-5x^2+4$};
\end{scope}
\begin{scope}[xshift = 12cm]
\axes{-2}{2}{-2}{2};
\draw[teal] plot[domain = -1.2:1.2] (\x, {(\x^6)+(\x^5)-(\x^4)-(\x^3)});
\node[teal, scale = 0.6] at (0,-3) {$f(x) = x^6+x^5-x^4-x^3$};
\end{scope}
\end{tikzpicture}
:::
*Polynomials $f(x) = a_nx^n + a_{n-1*x^{n-1} + \cdots + a_1x + a_0$}





## 5. Rational Function

A rational function is of the form

:::note
\[f(x) = \frac{g(x)}{h(x)}\]
:::

where $g(x)$ and $h(x)$ are polynomials and $h(x)$ is not the constant function $h(x) = 0$. 

**Ex.** $\displaystyle f(x) = \frac{x+1}{x^2-1}, f(x) = \frac{4x^4 + 2x^2 + 1}{2x^2+1}, f(x) = \frac{1}{x^2+1}$ 




:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.4, smooth, domain = -2:2]
\axes{-2}{2}{-2}{2};
\draw[blue] plot[domain = -2:-0.5] (\x, {1/\x});
\draw[blue] plot[domain = 0.5:2] (\x, {1/\x});
\node[blue, scale = 0.8] at (0,-3) {$f(x) = \frac{1}{x}$};
\begin{scope}[xshift = 6cm]
\axes{-2}{2}{-2}{2};
\draw[red] plot[domain = -2:2] (\x, {1/(\x*\x+1)});
\node[red, scale = 0.8] at (0,-3) {$f(x) = \frac{1}{x^2+1}$};
\end{scope}
\begin{scope}[xshift = 12cm]
\axes{-2}{2}{-2}{2};
\draw[teal] plot[domain = -2:-1.3] (\x, {(\x)/(\x*\x-1)});
\draw[teal] plot[domain = -0.8:0.8] (\x, {(\x)/(\x*\x-1)});
\draw[teal] plot[domain = 1.2:2] (\x, {(\x)/(\x*\x-1)});
\node[teal, scale = 0.8] at (0,-3) {$f(x) = \frac{x}{x^2-1}$};
\end{scope}
\end{tikzpicture}
:::
*Rational functions $f(x) = \tfrac{f(x)*{g(x)}$}






## 6. Absolute Value Function

Recall that an absolute value is defined as

:::note
\[ |x| = \begin{cases} x &, \text{ if } x \geq 0 
-x &, \text{ if } x < 0\end{cases}\]
:::

Then, an absolute value function is any function that has an absolute value.

**Ex.** $f(x) = | x | , f(x) = | x^3 | + 2 , f(x) = | x - 1|$





:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.6, smooth, domain = -2:2]
\axes{-2}{2}{-2}{2};
\draw[blue] plot[domain = -2:2] (\x, {abs(\x)});
\node[blue, scale = 0.8] at (0,-3) {$f(x) = |x|$};
\begin{scope}[xshift = 6cm]
\axes{-2}{2}{-2}{2};
\draw[red] plot[domain = -2:2] (\x, {abs(2*\x-1)-2});
\node[red, scale = 0.8] at (0,-3) {$f(x) = |2x-1|-2$};
\end{scope}
\begin{scope}[xshift = 12cm]
\axes{-2}{2}{-2}{2};
\draw[teal] plot[domain = -2:2] (\x, {abs(1-\x*\x)});
\node[teal, scale = 0.8] at (0,-3) {$f(x) = |1-x^2|$};
\end{scope}
\end{tikzpicture}
:::
*Absolute value functions*





## Step function

7. Step function - defined differently on intervals, so it looks like a staircase.




:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.6]
\axes{-2}{2}{-2}{2};
\draw[blue] (-2,-1) -- (0,-1) (0,1) -- (2,1) (0,-1) circle [radius = 0.1cm];
\filldraw (0,1) circle [radius = 0.1cm];
\node[blue, scale = 0.8] at (0,-3) {$f(x) = \begin{cases} -1; & x < 0 \\ 1;&x \geq 0\end{cases}$};
\begin{scope}[xshift = 6cm]
\axes{-2}{2}{-2}{2};
\draw[red] (-2,2) -- (-1,2) (-1,-1) -- (1,-1) (1,0) -- (2,0) (-1,2) circle [radius = 0.1cm] (1,0) circle [radius = 0.1cm];
\filldraw (-1,-1) circle [radius = 0.1cm] (1,-1) circle [radius = 0.1cm];
\node[red, scale = 0.8] at (0,-3) {$f(x) = \begin{cases} 2; & x < -1 \\ -1;&-1 \leq x \leq 1 \\ 0; & x > 1\end{cases}$};
\end{scope}
\begin{scope}[xshift = 12cm]
\axes{-2}{2}{-2}{2};
\foreach \x in {-2,-1,0,1}
{
	\draw[teal] (\x, \x) -- ({\x+1}, \x) circle [radius = 0.1cm];
	\filldraw[teal] (\x, \x) circle [radius = 0.1cm];
}
\node[teal, scale = 0.8] at (0,-3) {$f(x) = \lfloor x \rfloor$};
\end{scope}
\end{tikzpicture}
:::
*Step functions*





:::exercise

Graph the following functions for $x$ in $[0,2]$.


- $f(x) = \lfloor x \rfloor$ where $\lfloor x \rfloor$ is the largest integer that is smaller than or equals to $x$. 

For instance $f(1.1) = 1, f(2.9) = 2, f(-1.5)=-2, f(5)=5$

- $f(x) =$ the fractional part of $x$. 

For instance, $f(1.2) = 0.2, f(-2.01) = 0.01, f(4) = 0$


:::
