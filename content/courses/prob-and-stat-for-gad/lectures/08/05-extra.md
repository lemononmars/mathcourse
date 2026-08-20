---
week: 8
order: 5
slug: "extra"
title: "Extra"
source: "tex/lecture08.tex"
---

## For the full version...

What happens if we can't find the area easily? We need calculus!

:::definition

A function $f(x)$ is a **continuous probability distribution function** if it satisfies the following properties


- $0 \leq f(x) \leq 1$ for all $x$

- The total area under the curve $f(x)$ is exactly 1. In calculus jargon,
\[ \int_{-\infty}^{+\infty} f(x) \, dx = 1\]

We can then define
\[P(c < X < d) = \int_c^d f(x) \, dx\]

:::






## For the deluxe version...

We can also define $E(X)$ and $V(X)$, but this only works if you know calculus. The formulas are similar to discrete probability distribution functions, but you take an integral $\int$ instead of a summation $\sum$.

:::definition

Let $f(x)$ be a continuous probability distribution function. Then we have


- $E(X) = \int_{-\infty}^{+\infty} x f(x) \, dx$

- $V(X) = \int_{-\infty}^{+\infty} (x - E(X))^2 f(x) \, dx = \int_{-\infty}^{+\infty} x^2 f(x) \, dx - (E(X))^2$


:::



\fi
