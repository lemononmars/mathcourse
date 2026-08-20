---
week: 6
order: 2
slug: "probability-distribution-function"
title: "Probability Distribution Function"
source: "tex/lecture06.tex"
---

## Motivation


:::remark



- Denote the probability that an outcome takes on the value $k$ as $P(X=k)$, or $P(k)$ in short.

- Since we can find $P(X = k)$ for all possible values $k$, then it is helpful to plot a graph of $k$ versus $P(k)$


- Such graph is called a **function**


:::





## Probability Distribution Function (PDF)


:::definition

A discrete **probability distribution function** has two characteristics:


- Each probability is between zero and one, inclusive.

- The sum of the probabilities is 1.


:::






:::example

Let $X$ be the value of a single die roll. 


- For all possible values $k$, find $P(X=k)$

- Find (a) $P(X=1)$ (b) $P(X\geq 5)$ (c) $P(X \text{ is an odd number})$


:::


:::solution



| Outcome | $x$ | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Probability | $ P(X=x)$ | $\frac{1}{6}$ | $\frac{1}{6}$ | $\frac{1}{6}$ | $\frac{1}{6}$ | $\frac{1}{6}$ | $\frac{1}{6}$ |





- $P(X=1) = \frac{1}{6}$ 

- $P(X \geq 5) = P(5) + P(6) = \frac{2}{6}$ 

- $P(X \text{ is an odd number}) = P(1) + P(3) + P(5) = \frac{3}{6}$ 


:::






:::example

Let $Y$ be the sum of values when rolling two dice. 


- For all possible values $k$, find $P(Y=k)$

- Find (a) $P(Y=3)$ (b) $P(Y \leq 4)$ (c) $P(Y \text{ is a square})$


:::


:::solution

First, list out all $6 \times 6 = 36$ possible outcomes.

\renewcommand{\arraystretch}{1.2}

| Y | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 6 | 7 | 8 | 9 | 10 | 11 | 12 |



:::






:::solution

Then, we can find the probabilities of each outcome as follows.


| $x$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $ P(Y=x)$ | $\frac{1}{36}$ | $\frac{2}{36}$ | $\frac{3}{36}$ | $\frac{4}{36}$ | $\frac{5}{36}$ | $\frac{6}{36}$ | $\frac{5}{36}$ | $\frac{4}{36}$ | $\frac{3}{36}$ | $\frac{2}{36}$ | $\frac{1}{36}$ |


Thus, we have. 
\begin{eqnarray*}
P(Y=3) &= &\frac{2}{36} 

P(Y \leq 4) &=& P(2) + P(3) + P(4) = \frac{1}{36} + \frac{2}{36} + \frac{3}{36} = \frac{6}{36}

P(Y \text{ is a square}) &=& P(4) + P(9) = \frac{7}{36}
\end{eqnarray*}

:::






| $k$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $ P(Y=k)$ | $\frac{1}{36}$ | $\frac{2}{36}$ | $\frac{3}{36}$ | $\frac{4}{36}$ | $\frac{5}{36}$ | $\frac{6}{36}$ | $\frac{5}{36}$ | $\frac{4}{36}$ | $\frac{3}{36}$ | $\frac{2}{36}$ | $\frac{1}{36}$ |




:::exercise

Compute the following


- $P(Y = 7)$

- $P(Y \geq 8)$

- $P(Y \mbox{ is even})$

- $P(Y \mbox{ is divisible by 3})$


:::
