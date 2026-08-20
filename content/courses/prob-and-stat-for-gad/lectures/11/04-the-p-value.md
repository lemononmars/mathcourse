---
week: 11
order: 4
slug: "the-p-value"
title: "The p-value"
source: "tex/lecture11.tex"
---

## Concept of the p-value


:::example

Suppose the null and alternative hypotheses are
\begin{eqnarray*}
&& H_0: \mu \geq 1,000 

&& H_1: \mu < 1,000
\end{eqnarray*}
A random sample of size 30 yields a sample mean of only 999. This evidence goes against the null hypothesis. Can we immediately reject $H_0$ based on this evidence?

:::


:::solution

No, because there is some chance we might be committing a type I error. Therefore, we settle for a question that comes very close.

:::





## p-value


:::remark Alternative question

Suppose the population mean is $\mu = 1,000$. What is the probability that a sample for size 30 gives a sample mean $\bar{x} \leq 999$?

:::

This alternative question can be answered objectively and mathematically.

:::definition

Given a null hypothesis and sample evidence with sample size $n$, the $\mathbf{p}$-**value** is the probability of getting a sample evidence with the same $n$ that is equally or more unfavorable to the null hypothesis while the null hypothesis is actually true.

:::

We will define the $p$-value and explain how to compute it later.




## Test Statistics


:::definition

A **test statistics** is a random variable calculated from the sample evidence, which follows a well-known distribution.

:::




| Name | Formula |
| --- | --- |
| One-sample $z$-test | $z = \frac{\bar{x} - \mu_0}{(\sigma / \sqrt{n})}$ |
| One-sample $t$-test | $t = \frac{\bar{x} - \mu_0}{(s / \sqrt{n})}$ |
| One-proportion $z$-test | $z = \frac{\hat{p} - p_0}{\sqrt{p_0(1-p_0)}} \sqrt{n}$ |
| Chi-squared test for variance | $\chi^2 = (n-1)\frac{s^2}{\sigma_0^2}$ |






## Test Statistics for One-sample Mean

For now, we will focus only on one-sample $z$-test for population mean. For instance, consider the case

:::note

\begin{eqnarray*}
&& H_0: \mu \geq 1,000 

&& H_1: \mu < 1,000
\end{eqnarray*}

:::

with known standard deviation $\sigma = 5$ and a random sample of size $n = 100$. We know that by The Law of Large Number, $\mu$ follows a normal distribution, hence a **test statistics** is the random variable
\[ Z = \frac{\bar{X} - \mu}{\sigma/\sqrt{n}} = 2(\bar{X} - 1000) .\]




## Computing the p-Value


\resizebox{!}{0.8\textheight}
{

:::definition

Suppose we have a null hypothesis 
\[ H_0: \mu \geq \mu_0.\]
Suppose that the population standard deviation $\sigma$ is known and a random sample of size $n \geq 30$ is taken, giving a sample mean $\overline{X}$. Then, the **$p$-value** is
\begin{equation}
p = P(X < \overline{X}).
\end{equation}
Alternative, you can apply the transformation formula to obtain
\begin{equation}
p = P\left( Z < \frac{\overline{X} - \mu_0}{\sigma/\sqrt{n}}\right). 
\end{equation}

:::

}




:::figure pvalue_definition — Assuming that the population mean is $\mu = \mu_0$, then the p-value of the sample with sample mean $\overline{X
:::
$ is the area of the region to the left of $\overline{X}$.}{}





:::example

Suppose we have a null hypothesis 
\[ H_0: \mu \geq 1,000.\]
Suppose we have the known population standard deviation $\sigma = 5$. We take a random sample of size $n = 100$ and get a sample mean $\overline{X} = 999$. Compute the $p$-value.

:::


:::solution

We use the test statistic to get:
\begin{eqnarray*}
p = P\left( Z < \frac{\overline{X} - \mu_0}{\sigma/\sqrt{n}}\right) = P\left(Z < \frac{999 - 1,000}{5/\sqrt{100}} \right) &=& P(Z < -2) 

&=& 0.0228
\end{eqnarray*}
This implies that if the population mean is indeed 1,000, then there is a $2.28\%$ chance that a sample mean is less than or equal to 999.

:::





:::figure pvalue_ex1 — The p-value is $p = P(X < 999).$
:::






:::example

Suppose a baker claims that his bread height is more than 15 cm, on average. Several of his customers do not
believe him. To persuade his customers that he is right, the baker decides to do a hypothesis test. 


He bakes 40 loaves of bread. The mean height of the sample loaves is 14 cm. The baker knows from baking hundreds of loaves
of bread that the standard deviation for the height is 2 cm. and the distribution of heights is normal. Compute the $p$-value.

:::


:::figure l14baker
:::





:::solution

Let's suppose the the baker is **right**. The null hypothesis could be
\[H_0: \mu \geq 15.\]
We know that
\[ \mu_0 = 14, \quad \sigma = 2\]
Hence, we can use the test statistics for population mean to get
\begin{eqnarray*}
p = P\left( Z < \frac{\overline{X} - \mu_0}{\sigma/\sqrt{n}}\right) &=& P\left(Z < \frac{14 - 15}{2/\sqrt{40}} \right) 

&\approx& P(Z < -3.16) 

&\approx& 0.00078
\end{eqnarray*}
This implies that if the population mean is indeed $15$, then there is almost **no chance** that a sample mean is less than or equal to 14.

:::





:::figure pvalue_ex2 — The p-value is $p = P(X < 14).$
:::
