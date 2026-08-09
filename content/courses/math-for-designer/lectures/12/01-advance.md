---
week: 12
order: 1
slug: "advance"
title: "Advance"
source: "tex/lecture12.tex"
---

## Infinite Sum

The formula for expected value still works if there are infinitely many outcomes. The following formula for geometric sum might be useful.

:::note Geometric sum

If $-1 \leq r < 1$, then
\[ \sum_{n=0}^{\infty} r^n = 1 + r + r^2 + r^3 + \ldots = \frac{1}{1-r}\]

:::






:::example

Suppose you flip a coin until you see a tail. What is the expected number of flips?

:::


:::solution

Let $X$ be the number of coin flips until we get a tail. For $X = k$, there must be $k-1$ consecutive heads, and then 1 last tail. Since each flip is independent, the probability is $\frac{1}{2^k}$. Hence,
\begin{eq*}
**E(X)** &=& \sum_{x = 1}^{\infty} x E(x) = \sum_{x=1}^{\infty} \frac{x}{2^x} =\frac{1}{2} + \frac{2}{4} + \frac{3}{8} + \frac{4}{16} + \ldots 

**2E(X)** &=& 1 + \frac{2}{2} + \frac{3}{4} + \frac{4}{8} + \frac{5}{16} + \ldots 

**2E(X)** -**E(X)** &=& 1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{16} + \ldots 

E(X) &=& 2
\end{eq*}
Thus, on average, we need to flip 2 times to see the first tail.

:::





## Recursive Formula

It is possible that a formula of $E(X)$ contains the term $E(X)$ itself! This happens when there is a case when the experiment must be repeated.





:::example

Suppose you flip a coin until you see a tail. What is the expected number of flips?

:::


:::solution

Let $X$ be the number of coin flips until we get a tail. 


- On a tail, the experiment ends and the number of flips is 1. 

- On a head, the experiment is repeated, and the number of flips is $E(X) + 1$.

Thus, we have
\begin{eq*}
E(X) &=& (1) \frac{1}{2} + (E(X) + 1) \frac{1}{2} 

E(X) &=& 1 + \frac{E(X)}{2} 

E(X) &=& 2
\end{eq*}
This gives the same result as before.

:::






:::example

Suppose you roll a die. If the result less than 6, you get that much coins. If the result is 6, you must pay a penalty of 5 coins before rerolling again. What is the expected number of coins you would gain?

:::


:::solution

Let $X$ be the amount of coins you gain. There is $\tfrac{1}{6}$ chance to roll a 1 and get 1 coin. There is $\tfrac{1}{6}$ chance to roll a 2 and get 2 coins, and so on. Finally, there is $\tfrac{1}{6}$ chance to roll a 6 and get $E(X) - 5$ coins. Thus, we have
\begin{eq*}
E(X) &=& (1) \frac{1}{6} + (2) \frac{1}{6} + (3) \frac{1}{6} + (4) \frac{1}{6} + (5) \frac{1}{6} + (E(X)-5) \frac{1}{6} 

E(X) &=& \frac{10}{6} + \frac{E(X)}{6} 

E(X) &=& 2
\end{eq*}
Thus, despite the heavy penalty, on average you still gain 2 coins!

:::
