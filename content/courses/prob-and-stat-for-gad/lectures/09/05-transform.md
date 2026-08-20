---
week: 9
order: 5
slug: "transform"
title: "Transformation of Normal Distributions"
source: "tex/lecture09.tex"
---

## Transformation to z-scores

We can apply the Z table for the standard normal distribution $Z \sim N(0, 1)$ to any normal distribution $X \sim N(\mu, \sigma)$ by linear transformation.

:::slide

\begin{eqnarray*}
X &<& x 

X - \mu &<& x - \mu 

\frac{X - \mu}{\sigma} &<& \frac{x - \mu}{\sigma} 

Z &<& \frac{x - \mu}{\sigma} 
\end{eqnarray*}

:::note Transformation

\[P(X < x) = P\left(Z < \frac{x - \mu}{\sigma}\right)\]

:::


:::





## Or actually... use an app!




:::figure l12normalapp
:::

*[Try it!](https://homepage.divms.uiowa.edu/~mbognar/applets/normal.html)*





:::example

Consider a random variable $X$ with mean 50 and standard deviation 10. Find the probability that $X$ is greater than 60.

:::


:::solution

We are given that $X \sim N(50, 10)$ and want to find $P(X > 60)$. We can use the linear transformation. 
\begin{eqnarray*}
P(X > 60) &=& P\left(\frac{X - \mu}{\sigma} > \frac{60 - \mu}{\sigma}\right) 

&=& P\left(Z > \frac{60 - 50}{10}\right) 

&=& P(Z > 1) 

&\approx& 0.1587
\end{eqnarray*}
Thus, the probability that $X$ is greater than $60$ is about 0.1587 (or $15.857\%$)

:::





:::solution
(Alt.)
Plug in $\mu = 50, \sigma = 10$ and $x = 60$ into the app and choose $P(X > x)$.

:::figure normal_transform_ex1 — A graph for example \theex
:::


:::





:::example

Cans of soda produced from a certain factory has an average volume of 250 mL with standard deviation 2. Find the probability a random can of soda contains less than 245 mL.

:::


:::solution

We are given that $X \sim N(245, 2)$ and want to find $P(X < 240)$. We can use the linear transformation. 
\begin{eqnarray*}
P(X < 245) &=& P\left(\frac{X - \mu}{\sigma} > \frac{245 - \mu}{\sigma}\right) 

&=& P\left(Z < \frac{245 - 250}{2}\right) 

&=& P(Z < -2.5) 

&\approx& 0.00621
\end{eqnarray*}
Thus, the probability that a random can of soda contains less than 245 mL is about 0.00621 (or $0.621\%$)

:::





:::solution
(Alt.)
Plug in $\mu = 250, \sigma = 2$ and $x = 245$ into the app and choose $P(X < x)$.

:::figure normal_transform_ex2 — A graph for example \theex
:::


:::





## Summarize


:::remark Transformation formulas

Transformation formulas of $X$ to $Z$ where $a,b$ are real numbers:
\begin{eqnarray*}
P(X < a) &=& P\left(Z < \frac{a -\mu}{\sigma}\right) 

P(X > b) &=& P\left(Z > \frac{b -\mu}{\sigma}\right) 

P(b < X < a) &=& P\left(\frac{b - \mu}{\sigma} < Z < \frac{a -\mu}{\sigma}\right)
\end{eqnarray*}

:::
