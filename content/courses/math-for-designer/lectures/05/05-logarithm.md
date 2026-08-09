---
week: 5
order: 5
slug: "logarithm"
title: "Logarithm"
source: "tex/lecture05.tex"
---

## Inverse Problem

Recall the Wheat and Chessboard problem. 

:::slide

We know that on $k$-th space, there will be $2^k$ grains of wheat. At some point, we will run out of grains of wheat to put on the board. Suppose you have one million grains. You will be interested in asking the following question:

\begin{question}{}
What is the first space does the number of grains of wheat exceeds one million?
\end{question}
To find the solution, we want to solve for
\[2^k \geq 1000000\]
and want a solution in the form
\[k \geq ?\]

:::






## Definition

We can't achieve this via addition nor multiplication, so we will need to define a new function.

:::definition

Let $x > 0$ and $b > 0$ with $b \neq 1$. Then, if we have
\[x = b^y\]
then, we define the logarithm as
\[ \log_b x = y.\]
In other words, $\log_b x$ is asking: $b$ to the what equals $x$?

We read this logarithmic expression as ``The logarithm with base $b$ of $x$ equals $y$.

:::
\pa






:::tikz TikZ diagram
\begin{tikzpicture}[every node/.style={scale = 2}]
\node at (0,0) {log};
\node at (2,0) (X) {$(x)$};
\node at (3,0) {$=$};
\node at (4,0) (Y) {$y$};
\node at (1,-0.2) (B) {$b$};
\draw[->, blue] (B) to[bend right] (Y);
\draw[opacity = 0] (B) -- (Y) node [pos=0.5, below = 4pt, blue, opacity = 1] {to};
\draw[->, blue ] (Y) to[bend right] (X);
\draw[opacity = 0 ] (Y) -- (X) node [pos =0.5, above = 4pt, blue, opacity = 1] {$=$};
\node at (8,0) [scale = 0.5, blue] {think $b$ to the $y = x$};

\begin{scope}[yshift = -3cm]
\node at (0,0) {log};
\node at (2,0) (X) {$(x)$};
\node at (3,0) {$=$};
\node at (4,0) (Y) {$y$};
\node at (1,-0.2) (B) {$b$};
\draw[->, red] (B) to[bend right] (Y);
\draw[opacity = 0] (B) -- (Y) node [pos=0.5, below = 4pt, red, opacity = 1] {to};
\draw[->, red] (Y) to[bend right] (X);
\draw[opacity = 0 ] (Y) -- (X) node [pos =0.5, above = 4pt, red, opacity = 1] {$=$};
\node at (8,0) [scale = 0.5, red] {means $b^y=x$};
\end{scope}
\end{tikzpicture}
:::
*Illustration for the notation of logarithm.*





:::example

Convert each exponential equation into a logarithm equation.


- $2^{6} = 64$

- $3^{4} = 81$

- $4^{-2} = \frac{1}{16}$


:::


:::solution



- $\log_2 64 = 6$

- $\log_3 81 = 4$

- $\log_4 \frac{1}{16} = -2$


:::






:::example

Use definition of logarithm function to find the following.


- $\log_3 9$ 

- $\log_4 64$ 

- $\log_2 \frac{1}{32}$


:::


:::solution



- $\log_3 9$ is the number $x$ such that $3^x = 9$, so $\log_3 9 = x = 2.$ \pa

- $\log_4 64$ is the number $x$ such that $4^x = 64$ so $\log_4 64 = x = 3.$ \pa

- $\log_2 \frac{1}{32}$ is the number $x$ such that $2^x = \frac{1}{32} = 2^{-5}$ so $\log_2 \frac{1}{32} = x = -5$.


:::





## Graph Comparison




:::figure l08i10.png
:::






## Note on definition

\begin{question}{}
Is it necessary that $b > 0$? Why can't we have $b=1$?
\tcbsubtitle{Answer}
Yes. Because $f(x) = \log_{-2} x$ is not a function. There is no solution for some value of $x$. For instance, $(-2)^y = 8$ has no solution. 
\medskip

To avoid the issue, we require the base $b$ to be positive. Then, the function would be defined for all positive real numbers $x$.

Similarly, if $b=1$, then the equation becomes $1^y = x$, but $1^y = 1$ for all real numbers $y$, so we don't get a function either.
\end{question}




## Note on definition

\begin{question}{}
Is it necessary that $x > 0$?
\tcbsubtitle{Answer}
Yes. Once we require the base $b$ to be positive, an expression like $\log_b (-5)$ has no solution. It is impossible to find a real number $y$ such that $b^y = -5$.
\end{question}
