---
week: 9
order: 1
slug: "standard"
title: "The Standard Normal Distribution"
source: "tex/lecture09.tex"
---

## The Standard Normal Distribution

Since $\mu$ and $\sigma$ can take any values, we will focus on the simplest case first.

:::definition

**The standard normal random variable** $Z$ is the normal random variable with mean $\mu = 0$ and standard deviation $\sigma = 1$. We express $Z$ using the above notation as
\[ Z \sim N(0, 1) \]

:::

Once we have the distribution, we can compute the usual probabilities $P( Z < 0), P(Z > 2) ,P(-1<Z<4)$ etc. by finding the corresponding areas using integration.






:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 10, xscale = 2]
\draw[<->] (-2.5,0) -- (2.5,0);
\draw[domain = -2.5:2.5] plot (\x,{gauss(\x,0,1)});
\node at (2,0.3) {$N(0,1)$};
\foreach \x in {-2,-1,0,1,2}
{
\draw (\x, 0.02) --+ (0, -0.04) node[below] {\x};
}
\end{tikzpicture}
:::


*The standard normal distribution $Z \sim N(0, 1)$*





## Properties of normal distribution

Besides the convenience that $\mu$ is the average and $\sigma$ is the standard variation, a normal distribution has the following properties.


- It is symmetric around the point $x=\mu$ which is at the same time the mode, the median and the mean of the distribution.

- It is unimodal: its first derivative is positive for $x < \mu$, negative for $x > \mu$, and zero only at $x = \mu$.

- The area under the curve and over the $x$-axis is equal to one. In other words, $\displaystyle \int_{-\infty}^{-\infty} f(x) dx = 1$





## The Notorious Z-Table



:::figure l12ztable
:::





## The Notorious Z-Table



:::figure l12ztablememe
:::





## There's An App For That




:::figure l12normalapp
:::

*[Try it!](https://homepage.divms.uiowa.edu/~mbognar/applets/normal.html)*





## Types of problems

The Z-Table only shows the value of $P(0 < Z < a)$. Nevertheless, you might be interested in computing the followings. 


- $P(Z < b)$

- $P(Z > b)$

- $P(a < Z < b)$


To compute these values, look at the normal curve and using the properties:

:::slide


:::note



- Symmetry: $P(Z > b) = P(Z < -b)$

- Probability: $P(Z < b) + P(Z \geq b) = 1$

- $P(Z > 0) = P(Z < 0) = 0.5$


:::

(Alternatively, use tools such as app, calculator, excel, friend, etc.)

:::






:::example

Given that $P(0 < Z < 1) = 0.341$, find 
\[a) P(Z \geq 1) \qquad b) P(Z < 1) \qquad c) P(-1 < Z < 1)\]

:::


:::solution

First, plot the area for $P(0 < Z < 1)$.

:::figure area_normal_ex1
:::


:::





:::solution
We can then find areas for other regions as follows.

:::figure area_normal_ex1sol
:::



- $P(Z \geq 1) = 0.5 - P(0 < Z < 1) = 0.5 - 0.341 = 0.159$

- $P(Z < 1) = P(Z < 0) + P(0 < Z < 1) = 0.5 + 0.341 = 0.841$

- $P(-1 < Z < 1) = P(-1 < Z < 0) + P(0 < Z < 1) = 2P(0 < Z < 1) = 0.682)$


:::






:::example

Given that $P(Z < 0.45) = 0.673$, find 
\[a) P(0 < Z < 0.45) \qquad b) P(Z > 0.45) \qquad c) P(-0.45 < Z < 0.45)\]

:::


:::solution

First, plot the area for $P(Z < 0.45)$.

:::figure area_normal_ex2
:::


:::





:::solution
We can then find areas for other regions as follows.

:::figure area_normal_ex2sol
:::



- $P(0 < Z < 0.45) = P(Z < 0.45) - 0.5 = 0.673 - 0.5 = 0.173$

- $P(Z > 0.45) = 1 - P(Z < 0.45) = 1 - 0.673 = 0.327$

- $P(-0.45 < Z < 0.45) = 2P(0 < Z < 0.45) = 0.346$


:::
