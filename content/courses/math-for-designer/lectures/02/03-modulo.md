---
week: 2
order: 3
slug: "modulo"
title: "Modulo"
source: "tex/lecture02.tex"
---

## Clock Arithmetic (Modulo 5)




:::tikz TikZ diagram
\begin{tikzpicture}[scale=1.1, >=Stealth]

\draw[thick, teal!70!black] (0,0) circle (2cm);


\foreach \i/\label in {0/0, 1/1, 2/2, 3/3, 4/4} {
  \pgfmathsetmacro{\angle}{90 - \i * 72}
  
  \filldraw[fill=teal!15, draw=teal!80!black, thick] (\angle:2cm) circle (0.38cm);
  \node[font=\bfseries\Large, teal!90!black] at (\angle:2cm) {\label};
  
  
  \draw[->, very thick, purple!80!black, shorten >=0.48cm, shorten <=0.48cm] 
    (\angle:2cm) arc[start angle=\angle, end angle=\angle-72, radius=2cm];
}


\node at (0,0) [align=center] {\textbf{\Large Modulo 5}\\[3pt]\small Equivalence Classes:\\[1pt]\textcolor{teal!80!black}{\textbf{$\{0, 1, 2, 3, 4\}$}}};
\end{tikzpicture}
:::


*Modular arithmetic (mod 5) represented as positions on a circle*





## Modulo


:::definition

Given integers $a,b$ and a positive integer $n$. If $n$ divides $a-b$, written as
\[ n \mid a-b, \]
then we write
\begin{equation} 
a \equiv b \pmod n
\end{equation}
This is read ``$a$ is congruent to $b$ modulo $n$''. We also say that $a$ and $b$ are in the same **equivalence class**.

:::






:::example

Given an integer $a$ and a modulo $n$, find 3 other integers that are congruent to $a \pmod n$.


- $2 \pmod 5$

- $20 \pmod 9$

- $-11 \pmod 3$


:::


:::solution



- $7,12,17$ are all congruent to $2 \pmod 5$ because $7-2, 12-2, 17-2$ are all divisible by 5.

- $2, 11, 29$ are all congruent to $20 \pmod 9$ because $2-20, 11-20, 29-20$ are all divisible by 9.

- $-8, -5, -2$ are all congruent to $-11 \pmod 3$ because $(-11)-(-8), (-11)-(-5), (-11)-(-2)$ are all divisible by 3.


:::





## Properties of Modulo


:::property

Let $a,b,c,d,k$ be integers and $n$ be a positive integer. Suppose that $a \equiv b \pmod n$ and $c \equiv d \pmod n$. Then, the following operations preserve congruence modulo $n$:


- Addition by a constant: $a + k \equiv b + k \pmod n$.

- Multiplication by a constant: $a \times k \equiv b \times k \pmod n$.

- Addition: $a + c \equiv b+d \pmod n$.

- Multiplication: $a \times c \equiv b \times d \pmod n$.


:::






:::example

Compute the following


- $22 + 12 \mod 7$ 

- $22 \times 12 \mod 7$ 


:::


:::solution



- We can either 


- Find the sum directly, which is $22+12 \equiv 34 \equiv 6 \mod 7$.

- Reduce each term in mod 7 so that the sum is smaller. Since $22 \equiv 1 \mod 7$ and $12 \equiv 5 \mod 7$, we have $22 + 12 \equiv 1 + 5 \equiv 6 \mod 7$



- We can either


- Find the product directly, which is $22 \times 12 \equiv 264 \equiv 5 \mod 7$.

- Reduce each term in mod 7 so that product is smaller. Since $22 \equiv 1 \mod 7$ and $12 \equiv 5 \mod 7$, we have $22 \times 12 \equiv 1 \times 5 \equiv 5 \mod 7$



:::






:::example

Compute the following


- $1233 \times 3434 \mod 10$

- $3^{100} \mod 8$


:::


:::solution



- Finding the product directly might take more time, so here we use the property. Since $1233 \equiv 3 \mod 10$ and $3434 \equiv 4 \mod 10$, then we have $1233 \times 3434 \equiv 3 \times 4 \equiv 12 \equiv 2 \mod 10$.


- This is an example where it is not advisable to compute the number first. We notice that $3^2 \equiv 9 \equiv 1 \mod 8$, so
\[ 3^{100} \equiv 3^2 \times 3^2 \times \cdots \times 3^2 \equiv 1 \times 1 \times \cdots \times 1 \equiv 1 \mod 8\]
Hence, $3^{100} \equiv 1 \mod 8$.


:::





:::exercise



- Find three pairs of numbers from $-5,0,2,7,14,24$ such that for each pair $a,b$, we have $a \equiv b \mod 12$.

- Use properties of modulo to compute the following 


- $100 + 200 \mod 9$

- $100 \times 200 \mod 11$

- $2022 \times 2564 \mod 10$

- $4^{100} \mod 15$



:::
