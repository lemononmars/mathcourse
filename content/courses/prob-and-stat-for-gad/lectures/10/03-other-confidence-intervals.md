---
week: 10
order: 3
slug: "other-confidence-intervals"
title: "Other Confidence Intervals"
source: "tex/lecture10.tex"
---

## Confidence Interval for Population Mean \mu with Unknown \sigma


:::slide

Usually, the population standard deviation is not known, so we can't use $\sigma$ in our calculation. Instead, we may use the sample standard deviation $S =\sqrt{\tfrac{\sum (X - \bar{X})^2}{n-1}}$ in its place. 

:::


:::definition

A $(1-\alpha)$ confidence interval for $\mu$ when $\sigma$ is **not** known, assuming a normally distributed population, is
\[ \bar{X} \pm t_{\alpha/2}\frac{S}{\sqrt{n}},\]
where $t_{\alpha/2}$ has a t-distribution which can be looked up from the t table.

:::






:::example

Suppose we have a sample size $n = 20$ with a sample mean $\bar{x} = 175$ and a sample standard deviation $S = 10$. Find a 95\% confidence interval.

:::



:::solution

First we set 
\[1-\alpha = 0.90 \rightarrow \alpha = 0.1.\] 
Then we find $t_0$ such that $P(t > t_0) = \frac{\alpha}{2} = 0.05$ from the **t table** with sample size of 40 and get $**t = 1.684**$
\[ \bar{X} \pm t_{\alpha/2}\frac{S}{\sqrt{n}} = 175 \pm **1.684** \frac{10}{\sqrt{20}} \approx 175 \pm 3.76\] 
Therefore, we can say that with $90\%$ confidence, the population mean is in the interval $ [171.24, 178.76]$

:::





## Confidence Interval for Population Proportion p

We know that the binomial distribution $B(n,p)$ has large enough number of trials $n$ with probability of success $p$ not too close to 0 or 1, then 
\[B(n,p) \sim N\left(p, \tfrac{\sqrt{np(1-p)}}{n}\right)\]

:::definition

A $(1-\alpha)\%$ confidence interval for the population proportion $p$ with ``large sample'' is
\[ \hat{p} \pm Z_{\alpha/2}\sqrt{\tfrac{\hat{p}(1-\hat{p})}{n}},\]
where the sample proportion $\hat{p}$ is equal to the number of successes in the sample $x$, divided by the number of trials (the sample size) $n$.

:::






:::example

Suppose a sample of size $150$ balls yields a sample proportion $\hat{p} = 0.4$. Find a 95\% confidence interval for the population proportion.

:::



:::solution

First we set 
\[1-\alpha = 0.95 \rightarrow \alpha = 0.05.\] 
Then we find $z$ such that $P(Z > z) = \frac{\alpha}{2} = 0.025$ or equivalently $P(0 < Z < z) = 0.5 - 0.025 = 0.475$. The z table gives the value $z = **1.96**$. Thus,
\[ \bar{p} \pm Z_{\alpha/2}\sqrt{\frac{\hat{p}(1-\hat{p})}{n}} = 0.4 \pm **1.96** \sqrt{\frac{(0.4)(1-0.4)}{150}} \approx 0.4 \pm 0.078\] 
Therefore, we can say that with $95\%$ confidence, the population proportion is in the interval $ [0.322, 0.478]$

:::





## Confidence Interval for Population Variance \sigma

Note: Confidence intervals for the population variance can also be compute, although it is out of scope of this class. The formula is
\[ \left[\frac{(n-1)s^2}{\chi^2_{\alpha/2}}, \frac{(n-1)s^2}{\chi^2_{1-\alpha/2}}\right]\]
where $\chi^2_{\alpha/2}$ is the value of the chi-square distribution.




## Confidence Intervals for Two Population Means

It is much more common for a researcher to be interested in the difference between means than in the specific values of the means themselves. 


- Male vs. female

- Before experiment vs. after experiment


:::definition

A $(1-\alpha)$ confidence interval for the difference between two population means $\mu_1 - \mu_2$ using independent random samples when $\sigma_1, \sigma_2$ are known is
\[ \bar{x_1} - \bar{x_2} \pm z_{\alpha/2}\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}.\]

:::
