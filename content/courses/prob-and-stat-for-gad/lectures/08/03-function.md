---
week: 8
order: 3
slug: "function"
title: "Cumulative Distribution Function"
source: "tex/lecture08.tex"
---

## Cumulative distribution function

Given a continuous random variable, we often ask these types of questions:


- What is the chance that it will rain before 1pm?

- How likely is it that a person is shorter than 140 centimeters?

- What is the fraction of players that are in the bottom 10\% of the server?

The questions can be formulated as $P(x < k)$ for a given value $k$.

:::definition

The **cumulative distribution function** $F(x)$ of a discrete random variable $X$ is 
\[ F(x) = P(X \leq x)\]

:::






:::example

Consider the function $f(x) = \frac{1}{10}$ for $3 \leq x \leq 13$ where $x$ is a real number. Plot the cumulative distribution of $f(x)$. 

:::


:::solution




:::figure cont_dist_cumulative_ex1a — $f(x)$
:::




:::figure cont_dist_cumulative_ex1b — $F(x)$
:::




:::






## Properties of cumulative distribution function


:::property

If $X$ is a random variable that takes on real numbers, then for any real number $x, x_1, x_2$ we have the followings.


- $F(X)$ is an non-decreasing function from 0 to 1.

- $P(X > x) = 1 - P(X \leq x) = 1 - F(X)$. 

- $P(x_1 < X <x_2) = F(x_2) - F(x_1)$.


:::
