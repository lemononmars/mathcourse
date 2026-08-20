---
week: 8
order: 2
slug: "continuous-probability-distribution"
title: "Continuous Probability Distribution"
source: "tex/lecture08.tex"
---

## Continuous Probability Density Function


:::definition

A function $f(x)$ is a **continuous probability density function** if it satisfies the following properties


- $0 \leq f(x)$ for all $x$. There is no upper bound for $f(x)$.

- The total area under the curve $f(x)$ is exactly 1.


:::







:::example

Consider the probability density function $f(x) = \frac{1}{20}$ for $0 \leq x \leq 20$ where $x$ is a real number. Find 


- $P(1<x<10)$ 

- $P(x \leq 15)$ 

- $P(x > 12)$


:::


:::slide


:::figure cont_dist_ex1graph — The graph of the function $f(x) = \frac{1
:::
$ for $0 \leq x \leq 20$}{}

:::






:::figure cont_dist_ex1a — The area for $P(1 < x < 10)$
:::


:::solution



- [(a)] The area of the rectangle is $\frac{1}{20} \times (10 - 1) = \frac{9}{20}$, so we have $P(1 < x < 10) = \frac{9}{20}$.


:::





:::figure cont_dist_ex1b — The area for $P(x \leq 15)$
:::


:::solution



- [b)] Since the function is defined up to $x = 20$, the area of the rectangle is $\frac{1}{20} \times (20 - 12) = \frac{8}{20} = \frac{2}{5}$, so we have $P(x > 12) = \frac{2}{5}$.


:::





:::figure cont_dist_ex1c — The area for $P(x > 12)$
:::


:::solution



- [c)] Since the function is defined up to $x = 20$, the area of the rectangle is $\frac{1}{20} \times (20 - 12) = \frac{8}{20} = \frac{2}{5}$, so we have $P(x > 12) = \frac{2}{5}$.


:::






:::example

Consider the probability density function $g(x) = \frac{1}{7}$ for $4 \leq x \leq 11$ where $x$ is a real number. Find 


- $P(5<x<8)$ 

- $P(x \leq 9)$ 

- $P(x > 10)$


:::


:::solution



- The area of the rectangle is $\frac{1}{7} \times (8 - 5) = \frac{3}{7}$, so we have $P(5 < x < 8) = \frac{3}{7}$.

- Since the function is defined from $x=4$, the area of the rectangle is $\frac{1}{7} \times (9 - 4) = \frac{5}{7}$. So, we have $P(X \leq 9) = \frac{5}{7}$.

- Since the function is defined up to $x = 11$, the area of the rectangle is $\frac{1}{7} \times (11 - 10) = \frac{1}{7}$, so we have $P(X > 10) = \frac{1}{7}$.


:::






:::example

Consider the probability density function $h(x) = \frac{x}{4}$ for $1 \leq x \leq 3$ where $x$ is a real number. Find 


- $P(1<x<2)$ 

- $P(x \leq 3)$ 

- $P(x > 2)$


:::


:::figure cont_dist_ex3graph — The graph of $h(x) = \frac{x
:::
$ for $1 \leq x \leq 3$}{}




:::figure cont_dist_ex3a — The area for $P(1 < x < 2)$
:::


:::solution



- This shape is a trapezoid. The length of the left side is $h(1) = \tfrac{1}{4}$ and the length of the right side is $h(2) = \tfrac{2}{4} = \tfrac{1}{2}$. Therefore, the area of the trapezoid is
\[ \tfrac{1}{2} \times \text{height} \times \text{sum of parallel sides} = \tfrac{1}{2} (2-1) \left( \tfrac{1}{4} + \tfrac{1}{2} \right) = \tfrac{3}{8}.\]
Hence, $P(1 < x < 2) = \tfrac{3}{8}$.


:::





:::figure cont_dist_ex3b — The area for $P(x < 3)$
:::


:::solution



- [b)] Notice that the function $h(x)$ is defined for $1 \leq x \leq 3$, so the area for $P(x<3)$ indeed includes the whole shape. Hence, $P(x < 3) = 1$.


:::





:::figure cont_dist_ex3c — The area for $P(x > 2)$
:::


:::solution



- [c)] This shape is a trapezoid. The length of the left side is $h(2) = \tfrac{2}{4} = \tfrac{1}{2}$ and the length of the right side is $h(3) = \tfrac{3}{4}$. Therefore, the area of the trapezoid is
\[ \tfrac{1}{2} \times \text{height} \times \text{sum of parallel sides} = \tfrac{1}{2} (3-2) \left( \tfrac{1}{2} + \tfrac{3}{4} \right) = \tfrac{5}{8}.\]
Hence, $P(x > 2) = \tfrac{5}{8}$.


:::





## Properties of Continuous Probability Distribution Function


:::property

Let $f(x)$ be a continuous probability density function.


- $P(X \leq x) + P(X > x) = 1$.

- If $a >b$, then $P(X \leq a) \geq P(X \leq b)$.

- If $a > b$, then $P(X \leq a) - P(X \leq b) = P(b \leq X \leq a)$


:::





## The Uniform Distribution

For frequently used functions, we can find formulas on the internet anyway, so let's just use it.

:::definition

A **uniform distribution** is a function
\[f(x) = \frac{1}{b-a}\]
for $a \leq x \leq b$. It is noted by $X \sim U(a,b)$.

We know that


- The mean is $\mu = E(X) = \frac{a+b}{2}$. 


- The standard deviation is $\sigma = \sqrt{\frac{(b-a)^2}{12}}$.


:::





:::figure l12uniformexample — An example for a uniform distribution function. Try it [](https://www.desmos.com/calculator/6cnuc1856o
:::
)


\iffalse


## Comparison Between Discrete and Continuous

asas

\fi
