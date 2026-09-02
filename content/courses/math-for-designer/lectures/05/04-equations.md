---
week: 5
order: 4
slug: "equations"
title: "Exponential Equations"
source: "tex/lecture05.tex"
---

## Exponential Equations: Same Base Strategy

An **exponential equation** is an equation where the unknown variable appears in the exponent.

:::theorem Equivalence of Powers

If $b > 0$ and $b \neq 1$, then:
\[ b^u = b^v \iff u = v \]

:::


:::slide

**Core Strategy:** Express both sides with the *same base*, then equate the exponents!
\begin{eqnarray*}
2^x &=& 16 = 2^4 \implies x = 4 

3^{2x-1} &=& 27 = 3^3 \implies 2x-1 = 3 \implies x = 2
\end{eqnarray*}

:::





:::example

Solve the exponential equations:


- $4^x = \frac{1}{64}$

- $9^{x+1} = 27$


:::


:::solution



- Rewrite both sides with base $4$ (or $2$):
\[ 4^x = \frac{1}{4^3} = 4^{-3} \implies x = -3 \]

- Rewrite both sides with common base $3$:
\begin{eq*}
(3^2)^{x+1} &=& 3^3 

3^{2(x+1)} &=& 3^3 

2(x+1) &=& 3 \implies 2x + 2 = 3 \implies x = \frac{1}{2}
\end{eq*}


:::





:::example

Solve: $2^x + 2^{x+1} = 96$

:::


:::solution

Notice that $2^{x+1} = 2^x \times 2^1 = 2 \cdot 2^x$. We can factor out $2^x$:
\begin{eq*}
2^x + 2 \cdot 2^x &=& 96 

2^x (1 + 2) &=& 96 

3 \cdot 2^x &=& 96 

2^x &=& 32 = 2^5 \implies x = 5
\end{eq*}

:::





## Substitution / Quadratic Form


:::example

Solve: $4^x - 12(2^x) + 32 = 0$

:::


:::solution

Rewrite $4^x = (2^2)^x = (2^x)^2$. Let $u = 2^x > 0$:
\begin{eq*}
u^2 - 12u + 32 &=& 0 

(u-4)(u-8) &=& 0 \implies u = 4 \text{ or } u = 8
\end{eq*}
Substitute back $u = 2^x$:


- $2^x = 4 = 2^2 \implies x = 2$

- $2^x = 8 = 2^3 \implies x = 3$

Thus, the solutions are $x = 2$ and $x = 3$.

:::





:::exercise

Solve the following exponential equations:


- $4^x = \frac{1}{64}$

- $9^{x+1} = 27$

- $5^x = 25^{2x-3}$

- $9^x - 3^{x+1} = 0$

- $2^x + 2^{x+1} = 96$

- $4^x - 12(2^x) + 32 = 0$


:::
