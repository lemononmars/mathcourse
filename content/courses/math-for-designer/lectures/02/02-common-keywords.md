---
week: 2
order: 2
slug: "common-keywords"
title: "Common Keywords"
source: "tex/lecture02.tex"
---

## Recaps

There are several commonly used keywords you should know (because, well, they are common.)

:::remark



- Divisible, remainder

- Prime vs. Composite 

- Factor

- Square, Cube, Fourth power, $\ldots$ 

- Power or $n$ ($2^n, 3^n,$ etc.)


:::





## Divisibility


:::definition

Let $m$ and $k$ be integers. We say that **$m$ is divisible by $k$** if we can write $m$ as a product of $k$ and another integer. In other words, 
\[m = k \times n\]
for some integer $n$. We denote $k \mid m$.

Alternately, we say that $k$ divides $m$, or $k$ is a factor of $m$.

:::





## Remainder


:::definition

For any integers $m$ and $n$ (with $n > 0$), we can find unique integers $q$ and $r$ such that
\[m = q \times n + r\]
where $r$ is an integer from 0 to $n-1$. We call $q$ the **q**uotient and $r$ the **r**emainder.

:::


Note that when the remainder $r$ is zero, we have $m = q \times n$ and therefore $m$ is divisible by $n$.






:::tikz TikZ diagram
\begin{tikzpicture}[every node/.style={scale = 2}, scale = 0.8]
\filldraw[fill = teal!20, draw = black] (0,0) rectangle (13, 1);
\node at (6.5,1.5) {$m$};
\foreach \x in {0,3,6,9}
	\filldraw[fill = red!20, draw = black] (\x,-2) rectangle ({\x+3}, -1) node[pos = 0.5] {$n$};
\filldraw[fill = blue!20, draw = black] (12,-2) rectangle (13, -1) node[pos=0.5] {$r$};
\draw[<->] (0, -3) --+ (12,0) node[pos = 0.5, below] {$q$ blocks};
\end{tikzpicture}
:::
*A diagram for $m = q \times n + r$*





:::example

For each pair of $m$ and $n$, find quotient $q$ and remainder $r$ such that $m = q \times n + r$ ($0 \le r < n$).


- $m=10, n = 4$

- $m=19, n = 3$

- $m = 15, n = 3$

- $m = 0, n = 5$


:::


:::solution



- $10 = 2 \times 4 + 2 \implies q = 2$ and $r = 2$.

- $19 = 6 \times 3 + 1 \implies q = 6$ and $r = 1$.

- $15 = 5 \times 3 + 0 \implies q = 5$ and $r = 0$.

- $0 = 0 \times 5 + 0 \implies q = 0$ and $r = 0$.


:::





## Prime

Notice two things: for any natural number $n$,


- $n$ is divisible by 1, because we can write $n = n \times 1$.

- $n$ is divisible by itself, because we can write $n = 1 \times n$.

The numbers that **only** have these two divisors are interesting enough that we give them a name.

:::definition

A natural number $n > 1$ which has only two distinct positive divisors (namely, 1 and itself) is called a **prime number**.

\medskip
If $n > 1$ is not a prime number, we call $n$ a **composite number**.

:::



:::remark

1 is not a prime number! Because 1 has only one positive divisor.

:::






:::example

For each number, determine whether it is a prime number or a composite number.


- $20$

- $39$

- $29$


:::


:::solution



- We can write $20 = 4 \times 5$. Thus, $20$ is divisible by another number besides 1 and itself, so it is a composite number.

- We can write $39 = 13 \times 3$. Thus, $39$ is divisible by another number besides 1 and itself, so it is a composite number.

- Testing divisibility by prime numbers up to $\sqrt{29} \approx 5.39$ (namely 2, 3, and 5), $29$ is not divisible by any of them. Thus, 29 is a prime number.


:::






## The Fundamental Theorem of Arithmetic


:::theorem

Every integer $n > 1$ can be written as a product of prime powers in a unique way (up to the order of factors). In other words,
\[n = p_1^{k_1} p_2 ^{k_2} \cdots p_m^{k_m}\]
where $p_1, p_2, \ldots, p_m$ are distinct prime numbers, and $k_1, k_2, \ldots, k_m$ are positive integers.

:::







:::example

Express the following numbers as a product of prime numbers. 


- 12

- 40

- 210

- 256


:::


:::solution



- We can write 12 as $12 = 4 \times 3$, but $4$ is not a prime number. So, we need to use smaller factors and write 
\[12 = 2 \times 2 \times 3 = 2^2 \times 3.\]

- $40 = 2 \times 2 \times 2 \times 5 = 2^3 \times 5$

- $210 = 2 \times 3 \times 5 \times 7$

- $256 = 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 = 2^8$


:::




## Let's Play!


:::figure prime_stone — [](https://boardgamegeek.com/boardgame/359327/prime-stone
:::
)



## How to play



- First to get 4 points win! (7 for full game)

- Two 2-coins, two 3-coins, two 5-coins, and a stone

- Reveal 4 target cards

- Choose one of the three options


- Draw 2 coins and place them in front of you

- Choose 2 coins in front of you. Take the coin of value equal to their product. Return all three coins to your bag.

- Choose 1 target card. Choose coins in front of you whose product equals to the value on the target card. Take the card and return those coins to your bag. Gain rewards (if any).






## Square and Cube


:::definition

A natural number $n$ is a square if we can write $n$ as a square of another natural number. In other words, we can find a natural number $k$ such that $n = k^2$.
\medskip

A natural number $n$ is a cube if we can write $n$ as a cube of another natural number.

:::

These definitions are rarely used, but it's a handy keyword for the introductory course.





## Power of k


:::definition

A natural number $n$ is a power of $k$ if we can write $n$ as $k$ to the power of a natural number. In other words, we can find a natural number $m$ such that $n = k^m$.

:::


:::example



- $16$ is a power of 2 because $16 = 2^4$.

- $16$ is also a power of 4 because $16 = 4^2$.

- $243$ is a power of 3 because $243 = 3^5$.

- $-64$ is a power of $-4$ because $-64 = (-4)^3$.


:::





:::exercise



- Given $m= 19, n =5$, find quotient $q$ and remainder $r$ such that $m = q \times n + r$ and $0 \leq r \leq n-1$.

- Express 100 as a product of prime powers.

- By trial and error, express 52 as a sum of a square and a cube.

- By trial and error, express 25 as a sum of a power of 2 and a power of 3.


:::
