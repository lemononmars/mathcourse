---
week: 9
order: 6
slug: "inverse"
title: "Inverse"
source: "tex/lecture09.tex"
---

## Inverse Problem

Alternatively, we might be interested in asking the question

:::note

Find the value $x$ such that $P(X < x) = 0.8$.

:::

We use a similar transformation as before:

:::slide

\begin{eq*}
Z &=& \frac{X-\mu}{\sigma} 

\sigma Z &=& X - \mu 

X &=& \sigma Z + \mu
\end{eq*}
This implies that we can find the value $z$ such that $P(Z < z) = 0.8$, and then use the transformation to prove that
\begin{eq*}
P(Z < z) &=& P(\sigma Z + \mu < \sigma z + \mu) 

&=& P(X < \sigma z + \mu)
\end{eq*}

:::





## Transformation from Standard Normal Distribution


:::theorem

Let $X$ be a random variable where $X \sim N(\mu, \sigma)$. Let $x$ be the value such that $P(X<x) = k$. Then,
\begin{equation}
x = \sigma z + \mu 
\end{equation}
where $z$ is the value such that $P(Z < z) = k$.

:::

Note that the value $k$ is usually represented as percentile. For instance, the 70-th percentile is the value $x$ where $70\%$ of all the data is below it, so we have $P(X < x) = 0.7$.




:::example

Consider a random variable $X$ with mean 50 and standard deviation 10. Find the value $x$ such that $P(X > x) = 0.2$.

:::


:::solution

First we find the value $z$ such that $P(Z > z) = 0.2$ using the applet, which we get $z \approx 0.842$. Hence, the value $x$ such that $P(X > x) = 0.2$ is
\[x = \sigma z + \mu \approx 10 \times 0.8412 + 50 = 58.412.\]
In other words, we have $P(X > 58.412) \approx 0.2$.

:::





:::solution
(Alt.)
Plug in $\mu = 50, \sigma = 10$ and $P(X > x) = 0.2$ into the app.

:::figure normal_transform_inverse_ex1 — A graph for example \theex
:::


:::






:::example

The patient recovery time from a particular surgical procedure is normally distributed with a mean of 5.3 days and a standard deviation of 2.1 days. Find is the 90-th percentile for recovery times.

:::


:::solution

We have $X \sim N(5.3, 2.1)$. The 90-th percentile is the value $x$ where
\[P(X<x) = 0.9\]
Then, we find the value $z$ such that $P(Z < z) = 0.9$ using the applet, which we get $z \approx 1.282$. Hence, we have
\[x = \sigma z + \mu \approx (2.1) \times (1.282) + 50 = 7.992\]
In other words, we have $P(X < 7.992) \approx 0.9$. Thus, the 90-th percentile for recovery times is 7.992 days.

:::





:::solution
(Alt.)
Plug in $\mu = 5.3, \sigma = 2.1$ and $P(X < x) = 0.9$ into the app.

:::figure normal_transform_inverse_ex1 — A graph for example \theex
:::


:::
