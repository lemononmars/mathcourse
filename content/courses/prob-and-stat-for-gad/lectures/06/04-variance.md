---
week: 6
order: 4
slug: "variance"
title: "Variance"
source: "tex/lecture06.tex"
---

## Variance

Recall that the variance tells you how widespread the samples is. The larger they spread, the higher the variance is. 

:::definition

The **variance**, denoted $\sigma^2$, of a discrete random variable $X$ is given by 
\begin{eq*}
\sigma^2 = V(X) &=& E[(x - \mu)^2] 

&=& \sum_{x \in S} (x - \mu)^2P(x),
\end{eq*}
where $S$ is the set of all possible values of $X$. The **standard deviation** is $\sigma = \sqrt{V(X)}$

:::

You can think of $(x-\mu)^2$ as the **weigh**. This value grows as the value $x$ moves away from the center $\mu$.





:::example

Let $X$ be the result of a die roll. Find $V(X)$.

:::


:::solution

Since we know that $\mu = E(X) = 3.5$, then the variance is 
\begin{eqnarray*}
\sigma^2 &=& \sum_{x \in S} (x - \mu)^2P(x) 

&=& \sum_{x \in S} (x - 3.5)^2P(X) 

&=& (1-3.5)^2 \frac{1}{6} + (2-3.5)^2 \frac{1}{6} + (3-3.5)^2 \frac{1}{6} + \ldots + (6-3.5)^2 \frac{1}{6} 

&=& \frac{1}{6}(6.25 + 2.25 + 0.25 + 0.25 + 2.25 + 6.25) 

&=& \frac{17.5}{6}
\end{eqnarray*} 

:::






## Computational formula


:::theorem

Computational formula for the variance of a random variable is 
\[ V(X) = E(X^2) - [E(X)]^2 \]

:::


:::solution
Proof:
\begin{eq*}
V(X) = \sum (x - \mu)^2P(x) &=& \sum (x^2 - 2 \mu x + \mu^2)P(x) 

&=& \sum x^2P(x) - 2\mu \sum x P(x) + \mu^2 \sum P(x) 

&=& E(X^2) - 2 \mu E(X) + \mu^2 

&=& E(X^2) - 2 E(X) E(X) + E(X)^2 

&=& E(X^2) - E(X)^2
\end{eq*}

:::






:::example

Let $X$ be the result of a die roll. Find $V(X)$ using the formula.

:::


:::solution

\begin{eq*} 
E(X^2) &=& \frac{1}{6}(1^2 + 2^2 + 3^2 + 4^2 + 5^2 + 6^2) = \frac{91}{6} 

(E(X))^2 &=& (3.5)^2 = 12.25 = \frac{73.5}{6} 

V(X) &=& E(X^2) - [E(X)]^2 

&=& \frac{91}{6} - \frac{73.5}{6} = \frac{17.5}{6}
\end{eq*}

:::





:::exercise

Find the variance of the following random variables by using both the definition and the formula.


- $X=$ the number of heads when flipping two coins.

- $X=$ the number of even digits in a two-digit lottery ticket (leading zeros are allowed).


:::
