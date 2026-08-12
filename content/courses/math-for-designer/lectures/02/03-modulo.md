---
week: 2
order: 3
slug: "modulo"
title: "Modulo"
source: "tex/lecture02.tex"
---

:::example
It is 10:00 now. What time it will be in 111 hours?
:::

:::solution
We have $111 = 4 \times 24 + 15$. Thus 111 hours later is 4 days and 15 hours later. The time will be $10+15 = 25$ o'clock. Since $25 = 1 \times 24 + 1$, it will be 1:00 on the next day.
:::

:::example
If New Year day in 2025 is on Wednesday. Then, what day will New Year day in 2026 be?
:::

:::solution
We have $365 = 52 \times 7 + 1$. Thus the day of week will shift by 1. So, New Year day in 2026 will be on Thursday.
:::

## Clock Arithmetic (Modulo 6)

:::tikzsvg /generated/tikz/mod6_pos_spiral.svg | Clock Arithmetic (Modulo 6)
:::
*Numbers 0-17 on a six-segment spiral.*

## Clock Arithmetic (Modulo 6 - Negative Numbers)

:::tikzsvg /generated/tikz/mod6_neg_spiral.svg | Clock Arithmetic (Modulo 6 - Negative Numbers)
:::
*Numbers 0 to -17 on a six-segment spiral.*

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
- Power: $a^k \equiv b^k \pmod n$.
:::

:::example
Compute the following:
- $22 + 12 \mod 7$ 
- $22 \times 12 \mod 7$ 
:::

:::solution
- We can either:
  - Find the sum directly: $22+12 \equiv 34 \equiv 6 \mod 7$.
  - Reduce each term in mod 7: Since $22 \equiv 1 \mod 7$ and $12 \equiv 5 \mod 7$, we have $22 + 12 \equiv 1 + 5 \equiv 6 \mod 7$.
- We can either:
  - Find the product directly: $22 \times 12 \equiv 264 \equiv 5 \mod 7$.
  - Reduce each term in mod 7: Since $22 \equiv 1 \mod 7$ and $12 \equiv 5 \mod 7$, we have $22 \times 12 \equiv 1 \times 5 \equiv 5 \mod 7$.
:::

:::example
Compute $1233 \times 3434 \mod 10$.
:::

:::solution
Finding the product directly takes time, so we apply modular multiplication property:
Since $1233 \equiv 3 \mod 10$ and $3434 \equiv 4 \mod 10$, we have:
\[ 1233 \times 3434 \equiv 3 \times 4 \equiv 12 \equiv 2 \mod 10. \]
:::

:::exercise
- Find three pairs of numbers from $-5,0,2,7,14,24$ such that for each pair $a,b$, we have $a \equiv b \mod 12$.
- Use properties of modulo to compute the following:
  - $100 + 200 \mod 9$
  - $100 \times 200 \mod 11$
  - $2022 \times 2564 \mod 10$
:::
