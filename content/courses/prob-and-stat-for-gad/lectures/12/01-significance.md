---
week: 12
order: 1
slug: "significance"
title: "Significance Level"
source: "tex/lecture12.tex"
---

## The Significance Level

The most common policy in statistical hypothesis testing is to establish a **significance level**, denoted $\alpha$, and to reject $H_0$ when the $p$-value falls below it.

:::remark Policy

When the $p$-value is less than $\alpha$, reject $H_0$.

:::


:::slide

Notes:


- The standard values for $\alpha$ are $10\%, 5\%,$ and $1\%$.

- When this policy is followed, one can be sure that the maximum probability of type I error is $\alpha$.


:::





## Decision Branches

When you make a decision to reject or not reject $H_0$, do as follows:

:::slide


:::note


If $\alpha \leq p$-value, **reject** $H_0$ 

:::


The results of the sample data are significant. There is sufficient evidence to conclude that $H_0$ is an incorrect belief and that the alternative hypothesis, $H_1$, may be correct.


:::note


If $\alpha > p$-value, **do not reject** $H_0$.

:::


The results of the sample data are not significant. There is **not** sufficient evidence to
conclude that the alternative hypothesis, $H_1$, may be correct.

:::





:::figure l08i02.png — Decision on different intervals.
:::






:::example

Suppose we establish a null hypothesis 
\[ H_0: \mu \geq 1,000,\]
with significance level $\alpha = 0.05$. If a sample yields the $p$-value of $0.028$, state the decision.

:::


:::solution

Since the $p$-value is below the significance level ($0.028 \leq \alpha$), the sample evidence is against the null hypothesis. 


We decide to **reject** the null hypothesis. In other words, there is sufficient evidence that the true population mean is **smaller** than $1,000$.


Note that because our significance level is $\alpha = 0.05$, there is still a $5\%$ chance that we reject the true statement (i.e. committing a Type I error).

:::






:::example

Suppose we establish a null hypothesis 
\[ H_0: \mu \geq 20,\]
with significance level $\alpha = 0.1$. If a sample yields the $p$-value of $0.12$, state the decision.

:::


:::solution

Since the $p$-value is above the significance level ($0.12 > \alpha$), the sample evidence agrees with the null hypothesis. 


We **decline to reject** the null hypothesis. In other words, we still believe that the population mean $\mu$ is at least $20$.

:::
