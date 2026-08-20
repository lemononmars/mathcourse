---
week: 9
order: 8
slug: "central-limit"
title: "Extra: Central Limit Theorem"
source: "tex/lecture09.tex"
---

## Mean of the Means


:::figure l12meanofmeans — Clip: []( https://vimeo.com/75089338
:::
)




## Increasing Sample Size

The **central limit theorem** for sample means says that if you keep drawing larger and larger samples (such as rolling one, two, five, and finally, then dice) and calculating their means, the sample means form their own normal distribution (the sampling distribution).


:::figure l12ctl1 — Comparing discrete distributions where $n$ varies.
:::





## Arbitrary Distributions



:::figure l12ctl2
:::






## Formal Definition



:::theorem

Let $X$ be a random variable with mean $\mu_X$ and standard deviation $\sigma_X$. Let $\bar{X}$ be the random variable that represents the mean from $n$ random samples of $X$. Then, as the size $n$ of the samples get larger, $\bar{X}$ is a normal distribution with
\[ \bar{X} \sim N\left( \mu_x, \frac{\sigma_x}{\sqrt{n}}\right).\]

:::





## Note

We require that the sample size $n$ is *large enough*. In practice, we want at least $30$ samples. If $n$ is small, other distributions may be applied, such as Student's t-distribution.



:::figure l12ctlmeme
:::
