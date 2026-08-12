---
week: 2
order: 4
slug: "number-bases"
title: "Number Bases"
source: "tex/lecture02.tex"
---

## Motivation

What do you mean when you write the number 
\[99?\]


:::youtube 2SUvWfNJSsM | Binary, Hanoi and Sierpinski, part 1
:::


## Definition of Base-m Number


:::definition

A base $m$ number is written in the form 
\[(a_k a_{k-1} a_{k-2} \cdots a_0)_m\]
where $k$ is the number of digits and each $a_k, a_{k-1}, \cdots, a_0$ is an integer from 0 to $m-1$ and $a_k$ is non-zero.

:::


:::example

$(11)_4$ is a base 4 number and $(2021)_5$ is a base 5 number.
\medskip

$(023)_4$ is not a valid number because the leading digit is zero. $(150)_5$ is not a valid number because a base 5 number needs all digits to be less than 5.

:::


## Converting base-m numbers to base 10


:::definition

Let $n = (a_k a_{k-1} a_{k-2} \cdots a_0)_m$ where $n$ is the number written in base 10. Then, we have the formula
\begin{equation}
n = a_k \times (m^k) + a_{k-1} \times (m^{k-1}) + \cdots + a_1 \times m + a_0.
\end{equation}

:::

:::tikz Positional weights and digit values of a base-m number
\begin{tikzpicture}[scale=0.85, every node/.style={transform shape}]
  % Position labels
  \node[text=gray, font=\small\bfseries] at (-2.2, 1.1) {Position};
  \node[text=blue!80!black, font=\small\bfseries] at (0, 1.1) {$k$};
  \node[text=blue!80!black, font=\small\bfseries] at (1.5, 1.1) {$k-1$};
  \node[text=gray, font=\small] at (2.8, 1.1) {$\cdots$};
  \node[text=blue!80!black, font=\small\bfseries] at (4, 1.1) {$1$};
  \node[text=blue!80!black, font=\small\bfseries] at (5.5, 1.1) {$0$};

  % Digits / Values
  \node[text=gray, font=\small\bfseries] at (-2.2, 0) {Digit Value};
  \node[draw=blue!60, fill=blue!10, rounded corners, minimum width=0.8cm, minimum height=0.7cm, font=\bfseries] at (0, 0) {$a_k$};
  \node[draw=blue!60, fill=blue!10, rounded corners, minimum width=0.8cm, minimum height=0.7cm, font=\bfseries] at (1.5, 0) {$a_{k-1}$};
  \node[font=\large] at (2.8, 0) {$\cdots$};
  \node[draw=blue!60, fill=blue!10, rounded corners, minimum width=0.8cm, minimum height=0.7cm, font=\bfseries] at (4, 0) {$a_1$};
  \node[draw=blue!60, fill=blue!10, rounded corners, minimum width=0.8cm, minimum height=0.7cm, font=\bfseries] at (5.5, 0) {$a_0$};
  \node[font=\bfseries, text=blue!80!black] at (6.3, -0.2) {${}_m$};

  % Weights
  \node[text=gray, font=\small\bfseries] at (-2.2, -1.1) {Weight};
  \node[text=teal!80!black, font=\small\bfseries] at (0, -1.1) {$m^k$};
  \node[text=teal!80!black, font=\small\bfseries] at (1.5, -1.1) {$m^{k-1}$};
  \node[text=gray, font=\small] at (2.8, -1.1) {$\cdots$};
  \node[text=teal!80!black, font=\small\bfseries] at (4, -1.1) {$m^1$};
  \node[text=teal!80!black, font=\small\bfseries] at (5.5, -1.1) {$m^0$};

  % Connecting arrows
  \draw[->, >=stealth, thick, teal] (0, -0.4) -- (0, -0.85);
  \draw[->, >=stealth, thick, teal] (1.5, -0.4) -- (1.5, -0.85);
  \draw[->, >=stealth, thick, teal] (4, -0.4) -- (4, -0.85);
  \draw[->, >=stealth, thick, teal] (5.5, -0.4) -- (5.5, -0.85);
\end{tikzpicture}
:::


:::example

Write the following numbers in base 10


- $(1010)_2$

- $(210)_3$

- $(103)_5$


:::


:::solution



- $(1010)_2 = 1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 0 = 8 + 0 + 2 + 0 = 10$

- $(210)_3 = 2 \times 3^2 + 1 \times 3^1 + 0 = 18 + 3 = 21$

- $(103)_5 = 1 \times 5^2 + 0 \times 5^1 + 3 = 25 + 0 + 3 = 28$


:::


## Digits in base higher than 10

We know that each digit is between $0$ and the base itself. What do we do if we work in base 16?


:::definition

If the base is higher than 10, we use English letters. 
\[ A = 10, B = 11, C = 12, D = 13, E = 14, F = 15 \]

:::


Popular bases are base 12 with digits $0,1,2,\ldots, 9,A,B$ and base 16 with digits $0,1,2,\ldots,9,A,B,C,D,E,F$.


:::example

Write the following numbers in base 10


- $(1A)_{12}$

- $(B3)_{16}$

- $(A0E)_{16}$


:::


:::solution



- $(1A)_{12} = 1 \times (12) + 10 = 22$

- $(B3)_{16} = 11 \times (16) + 3 = 179$

- $(A0E)_{16} = 10 \times (16^2) + 0 \times (16) + 14 = 2560 + 0 + 14 = 2574$


:::


## Converting base-10 numbers to any base


:::definition Division Algorithm

Let $n$ and $m$ be positive integers ($m > 1$). We can write $n$ in base $m$ using the following division algorithm:


- Divide $n$ by $m$ and write $n = m \times q_1 + r_1$, where $q_1$ is the quotient and $r_1$ is the remainder ($0 \leq r_1 \leq m-1$).

- Repeat for $q_1$: Write $q_1 = m \times q_2 + r_2$ where $q_2$ is the quotient and $r_2$ is the remainder ($0 \le r_2 \le m-1$).

- Stop when $q_k = 0$ (i.e. we cannot divide further).

- The base $m$ representation is $n = (r_k r_{k-1} \ldots r_2 r_1)_m$.


:::


:::example

Write 13 in base 2

:::


:::solution



- Divide 13 by 2 and write $13 = 2 \times 6 + 1$. We have $q_1 = 6$ and $r_1 = 1$.

- Divide 6 by 2 and write $6 = 2 \times 3 + 0$. We have $q_2 = 3$ and $r_2 = 0$.

- Divide 3 by 2 and write $3 = 2 \times 1 + 1$. We have $q_3 = 1$ and $r_3 = 1$.

- Divide 1 by 2 and write $1 = 2 \times 0 + 1$. We have $q_4 = 0$ and $r_4 = 1$.

Now that $q_4 = 0$, we stop and conclude that $13 = (1101)_2$.

:::


:::tikz Division algorithm for finding $13$ in base $2$
\begin{tikzpicture}
\node at (0,1) {$m$};
\node at (1, 1) {$q$};
\node at (2.5,1) {$r$};
\foreach \y / \q / \r in {0/13/1, -1/6/0, -2/3/1, -3/1/1}
{
	\node at (0, \y) {$2$};
	\node at (1, \y) {$\q$};
	\node at (2.5,{\y-1}) {$\r$};
	\draw (0.5,{\y+0.4}) --++ (0, -0.8) --+ (1.5,0);
}
\node at (1,-4) {0};
\draw[double] (0.5, -4.4) --+ (1.5,0);
\draw[->] (3, -4) -- (3,-1) node[right] {$(1101)_2$};
\end{tikzpicture}
:::


:::example

Write 78 in base 4

:::


:::solution



- Divide 78 by 4 and write $78 = 4 \times 19 + 2$. We have $q_1 = 19$ and $r_1 = 2$.

- Divide 19 by 4 and write $19 = 4 \times 4 + 3$. We have $q_2 = 4$ and $r_2 = 3$.

- Divide 4 by 4 and write $4 = 4 \times 1 + 0$. We have $q_3 = 1$ and $r_3 = 0$.

- Divide 1 by 4 and write $1 = 4 \times 0 + 1$. We have $q_4 = 0$ and $r_4 = 1$.

Now that $q_4 = 0$, we stop and conclude that $78 = (1032)_4$.

:::


:::tikz Division algorithm for finding $78$ in base $4$
\begin{tikzpicture}
\node at (0,1) {$m$};
\node at (1, 1) {$q$};
\node at (2.5,1) {$r$};
\foreach \y / \q / \r in {0/78/2, -1/19/3, -2/4/0, -3/1/1}
{
	\node at (0, \y) {$4$};
	\node at (1, \y) {$\q$};
	\node at (2.5,{\y-1}) {$\r$};
	\draw (0.5,{\y+0.4}) --++ (0, -0.8) --+ (1.5,0);
}
\node at (1,-4) {0};
\draw[double] (0.5, -4.4) --+ (1.5,0);
\draw[->] (3, -4) -- (3,-1) node[right] {$(1032)_4$};
\end{tikzpicture}
:::


:::example

Write 175 in base 16

:::


:::solution



- Divide 175 by 16 and write $175 = 16 \times 10 + 15$. We have $q_1 = 10$ and $r_1 = 15$. In base 16, $r_1$ corresponds to F.

- Divide 10 by 16 and write $10 = 16 \times 0 + 10$. We have $q_2 = 0$ and $r_2 = 10$. In base 16, $r_2$ corresponds to A.

Now that $q_2 = 0$, we stop and conclude that $175 = (\text{AF})_{16}$.

:::


:::tikz Division algorithm for finding $175$ in base $16$
\begin{tikzpicture}
\node at (0,1) {$m$};
\node at (1, 1) {$q$};
\node at (2.5,1) {$r$};
\foreach \y / \q / \r in {0/175/15, -1/10/10}
{
	\node at (0, \y) {$16$};
	\node at (1, \y) {$\q$};
	\node at (2.5,{\y-1}) {$\r$};
	\draw (0.5,{\y+0.4}) --++ (0, -0.8) --+ (1.5,0);
}
\node at (1,-2) {0};
\draw[double] (0.5, -2.4) --+ (1.5,0);
\draw[->] (3, -2) -- (3,-1) node[right] {$(\text{AF})_{16}$};
\end{tikzpicture}
:::


:::exercise



- Compute the following numbers (i.e. convert them to base 10).


- $(10101)_2$

- $(3412)_6$

- $(EA)_{16}$


- Write the following numbers in the given base.


- 20 in base 3

- 100 in base 2

- 50 in base 16



:::
