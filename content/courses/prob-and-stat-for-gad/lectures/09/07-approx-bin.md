---
week: 9
order: 7
slug: "approx-bin"
title: "Extra: Normal Approximation to Binomial"
source: "tex/lecture09.tex"
---

## Normal Approximation to Binomial


:::theorem

Let $X\sim B(n,p)$ is a binomial random variable (recall that $n$ is the number of trials and $p$ is the probability of a success in a single trial.)


If $np$ and $n(1-p)$ are both large enough, then $X$ can be approximated as a normal distribution $X \sim N(\mu, \sigma)$ with $\mu = np$ and $\sigma = \sqrt{np(1-p)}$. Formally, we have
\begin{equation}
B(n,p) \sim N(np, \sqrt{np(1-p)}).
\end{equation}

:::

Note: In practice, ``large enough'' is some chosen value like 5 or 10.





:::example

Suppose we toss a fair coin 20 times. Use normal approximation to approximate the probability of getting between 9 and 11 heads.

:::


:::solution

Let X be the random variable representing the number of heads thrown (i.e. $X \sim B\left(20, \frac{1}{2}\right)$. Since $np = 10$, we can use the normal approximation to the binomial. So, we have
\[X \sim N(np, \sqrt{np(1-p)}) = N\left(20\cdot \frac{1}{2}, \sqrt{20\cdot \frac{1}{2} \cdot \frac{1}{2}}\right) = N(10, \sqrt{5}).\]
Since we want $P(9 \leq X \leq 11)$, we can use the z-score to compute it.
\begin{eq*}
P(9 \leq X \leq 11) &=& P\left(\frac{9-10}{\sqrt{5}} \leq \frac{X-10}{\sqrt{5}} \leq \frac{11-10}{\sqrt{5}}\right) 

&\approx& P (-0.447 < Z < 0.447) 

&=& 0.34
\end{eq*}

:::
