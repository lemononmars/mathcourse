---
week: 5
order: 8
slug: "equations"
title: "Logarithmic Equations"
source: "tex/lecture05.tex"
---

## Solving Logarithmic Equations

A **logarithmic equation** contains logarithmic expressions with the unknown in the argument.

:::theorem One-to-One Property of Logarithms

For $b > 0, b \neq 1$ and $u, v > 0$:
\[ \log_b u = \log_b v \iff u = v \]

:::


:::slide

**Two Main Strategies:**


- **Convert to exponential form:**
\[ \log_b (f(x)) = c \iff f(x) = b^c \]

- **Use log properties to combine:**
\[ \log_b (f(x)) = \log_b (g(x)) \iff f(x) = g(x) \]

\alert{**Crucial Check:**} Always check for **extraneous solutions**! The argument of every logarithm must be strictly positive: $\text{argument} > 0$.

:::





:::example

Solve the logarithmic equations:


- $\log_2 (x+3) = 5$

- $\log_5 (2x-1) = 2$


:::


:::solution



- Convert to exponential form:
\[ x+3 = 2^5 = 32 \implies x = 29 \]
Check domain: $x+3 = 29+3 = 32 > 0$ \checkmark

- Convert to exponential form:
\[ 2x-1 = 5^2 = 25 \implies 2x = 26 \implies x = 13 \]
Check domain: $2(13)-1 = 25 > 0$ \checkmark


:::





:::example

Solve: $\log(x) + \log(x-3) = 1$

:::


:::solution

Domain requirement: $x > 0$ and $x-3 > 0 \implies x > 3$. 
Combine using the product rule ($\log A + \log B = \log(AB)$):
\begin{eq*}
\log(x(x-3)) &=& 1 

x(x-3) &=& 10^1 = 10 

x^2 - 3x - 10 &=& 0 

(x-5)(x+2) &=& 0 \implies x = 5 \text{ or } x = -2
\end{eq*}
Check domain: $x = -2$ is rejected because $\log(-2)$ is undefined.
Thus, the only valid solution is $x = 5$.

:::





:::example

Solve: $\log_3(x+4) - \log_3(x) = 2$

:::


:::solution

Domain requirement: $x+4 > 0$ and $x > 0 \implies x > 0$. 
Combine using the quotient rule ($\log_3 A - \log_3 B = \log_3(A/B)$):
\begin{eq*}
\log_3 \left(\frac{x+4}{x}\right) &=& 2 

\frac{x+4}{x} &=& 3^2 = 9 

x+4 &=& 9x \implies 8x = 4 \implies x = \frac{1}{2}
\end{eq*}
Check domain: $x = 1/2 > 0$ \checkmark. Thus, $x = 1/2$.

:::





:::exercise

Solve the following logarithmic equations:


- $\log_{2}(x+3) = 5$

- $\log_{5}(2x-1) = 2$

- $\log(x) + \log(x-3) = 1$

- $\ln(x^2-1) = \ln(3x-1)$

- $\log_{3}(x+4) - \log_{3}(x) = 2$

- $2\log(x) = \log(5x-6)$


:::
