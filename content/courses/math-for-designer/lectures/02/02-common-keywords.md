---
week: 2
order: 2
slug: "common-keywords"
title: "Common Keywords"
source: "tex/lecture02.tex"
---

## Divisibility

:::definition
Let $m$ and $k$ be integers. We say that **$m$ is divisible by $k$** if we can write $m$ as a product of $k$ and another integer. In other words, 
\[m = k \times n\]
for some integer $n$. We denote $k \mid m$.

Alternately, we say that $k$ divides $m$, or $k$ is a factor of $m$.
:::

:::example
Determine each statement whether it is true of false.
- 3 divides 18
- 16 is divisible by 3
- 4 is a factor of 16
- 4 is a factor of 18
:::

:::solution
- True ($18 = 3 \times 6$)
- False
- True ($16 = 4 \times 4$)
- False
:::

## Remainder

:::definition
For any integers $m$ and $n$ (with $n > 0$), we can find unique integers $q$ and $r$ such that
\[m = q \times n + r\]
where $r$ is an integer from 0 to $n-1$. We call $q$ the **quotient** and $r$ the **remainder**.
:::

*Note that when the remainder $r$ is zero, we have $m = q \times n$ and therefore $m$ is divisible by $n$.*

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

## Prime & Composite Numbers

Notice two things: for any natural number $n$,
- $n$ is divisible by 1, because we can write $n = n \times 1$.
- $n$ is divisible by itself, because we can write $n = 1 \times n$.

The numbers that **only** have these two divisors are interesting enough that we give them a name.

:::definition
A natural number $n > 1$ which has only two distinct positive divisors (namely, 1 and itself) is called a **prime number**.

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

:::tikz Fundamental Theorem of Arithmetic (Factor Chart)
\begin{tikzpicture}[scale=0.45,
    number/.style={circle, fill = white, thick, draw, minimum size=4mm, scale = 1.2}
]

\definecolor{prime2}{RGB}{66,135,245}
\definecolor{prime3}{RGB}{245,66,66}
\definecolor{prime5}{RGB}{66,245,135}
\definecolor{prime7}{RGB}{200,66,245}
\definecolor{prime11}{RGB}{255,165,0}
\definecolor{prime13}{RGB}{128,0,0}
\definecolor{prime17}{RGB}{0,128,128}
\definecolor{prime19}{RGB}{128,128,0}

\newcommand{\factorcircle}[4]{%
\begin{scope}[shift=(#2)]
  \foreach \p [count=\i] in {#3} {
  \filldraw[draw = black, fill = prime\p] (0,0) --+ ({\i*(360/#4)}:1.9) arc [start angle = {\i*(360/#4)}, end angle =  {(\i+1)*(360/#4)}, radius = 1.9] -- cycle;
  \node[white, font = \small] at ({(\i+0.5)*(360/#4)}: 1.3) {\p};
  }
   \node[number] (n#1) at (0,0) {#1};
\end{scope}
}

\foreach \row in {0,...,3} {
  \foreach \col in {0,...,4} {
    \coordinate (pos\row\col) at (4*\col,-4*\row);
  }
}

\factorcircle{1}{pos00}{}{}
\factorcircle{2}{pos01}{2}{1}
\factorcircle{3}{pos02}{3}{1}
\factorcircle{4}{pos03}{2,2}{2}
\factorcircle{5}{pos04}{5}{1}

\factorcircle{6}{pos10}{2,3}{2}
\factorcircle{7}{pos11}{7}{1}
\factorcircle{8}{pos12}{2,2,2}{3}
\factorcircle{9}{pos13}{3,3}{2}
\factorcircle{10}{pos14}{2,5}{2}

\factorcircle{11}{pos20}{11}{1}
\factorcircle{12}{pos21}{2,2,3}{3}
\factorcircle{13}{pos22}{13}{1}
\factorcircle{14}{pos23}{2,7}{2}
\factorcircle{15}{pos24}{3,5}{2}

\factorcircle{16}{pos30}{2,2,2,2}{4}
\factorcircle{17}{pos31}{17}{1}
\factorcircle{18}{pos32}{2,3,3}{3}
\factorcircle{19}{pos33}{19}{1}
\factorcircle{20}{pos34}{2,2,5}{3}

\end{tikzpicture}
:::
*A factor visualization of numbers from 1 to 20.*

:::example
Express the following numbers as a product of prime numbers. 
- 12
- 40
- 210
- 256
:::

:::solution
- We can write 12 as $12 = 4 \times 3$, but $4$ is not a prime number. So, we need to use smaller factors and write $12 = 2 \times 2 \times 3 = 2^2 \times 3$.
- $40 = 2 \times 2 \times 2 \times 5 = 2^3 \times 5$
- $210 = 2 \times 3 \times 5 \times 7$
- $256 = 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 = 2^8$
:::

:::exercise
1. Given $m= 19, n =5$, find quotient $q$ and remainder $r$ such that $m = q \times n + r$ and $0 \leq r \leq n-1$.
2. Express 100 as a product of prime powers.
3. By trial and error, express 52 as a sum of a square and a cube.
4. By trial and error, express 25 as a sum of a power of 2 and a power of 3.
:::
