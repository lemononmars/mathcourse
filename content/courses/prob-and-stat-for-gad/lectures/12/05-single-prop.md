---
week: 12
order: 5
slug: "single-prop"
title: "Hypothesis Testing for a Single Proportion"
source: "tex/lecture12.tex"
---

## Test Statistic for Proportion

Let $p$ be the population proportion, and $\hat{P}$ be the random variable for a sample proportion. Recall that for a large sample, $\hat{P}$ can be approximated by a normal distribution with sample mean $\mu_p = p$ and sample standard deviation $\sigma_p = \sqrt{\tfrac{p(1-p)}{n}}$. That is, we have

:::note

\[\hat{P} \sim N(\mu_p, \sigma_p) = N\left(p, \sqrt{\frac{p(1-p)}{n}}\right).\]

:::

Therefore, the test statistics is similar to a single mean, which is
\[Z = \frac{\hat{P}-p}{\sigma_p} = \frac{\hat{P}-p}{\sqrt{\frac{p(1-p)}{n}}}.\]
Be careful not to mistake the population proportion $p$ as the p-value.





:::example

Joon believes that 50\% of first-time brides in the United States are younger than their grooms. She performs a hypothesis test to determine if the percentage is the same or different from 50\%. 


Joon samples 100 first-time brides and 53 reply that they are younger than their grooms. For the hypothesis test, she uses a 1\% level of significance. 

:::


:::figure hypo_prop_ex1
:::






:::solution



- **Set up two contradictory hypotheses** - The parameter is the percentage, so this is a test of a single population **proportion**. Joon believes that it is 50 \%, so we set up the following null hypothesis and alternative hypothesis.
\begin{eq*}
&&H_0: p = 0.5

&&H_1: p \neq 0.5
\end{eq*}
The significance level is given as $\alpha = 0.01$.


- **Collect sample data** - The sample data is already given.

- [3.] **Determine the correct distribution** - Since the sample size is large enough, we can use a normal distribution to approximate the sample proportion.


:::





:::solution
(continued)



- [4.] **Analyze sample data** - The sample size is $n = 100$ and the sample proportion is $\hat{p} = 0.53$. The sample standard deviation is
\[ \sigma_p = \sqrt{\frac{p(1-p)}{n}} = \sqrt{\frac{(0.5)(0.5)}{100}} = 0.05.\]
The test statistic is
\[z = \frac{\hat{p} - p}{\sigma_p} = \frac{0.53 - 0.5}{0.05} = 0.6\]
The null hypothesis is an equality, so this is a two-tailed test. We can compute p-value as follows:
\[p = **2**P(Z > |z|) = 2P(Z > 0.6) \approx 2(0.2743) = 0.5486.\]
The p-value is apparently larger than the significance level $\alpha$.


:::





:::solution
(continued)

:::figure hypo_prop_ex1_dist.jpg — The distribution and the regions for p-value.
:::



- [5.] **Make a decision** - We **decline to reject** the null hypothesis. In conclusion, the sample data do not show sufficient evidence that the percentage of first-time brides who are younger than their grooms is different from 50\%.


:::







:::example

Suppose a consumer group suspects that the proportion of households that have three cell phones is 30\%. A cell phone company has reason to believe that the proportion is not 30\%.


Before they start a big advertising campaign, they conduct a survey. Their marketing people survey 150 households with the result that 43 of the households have three cell phones. Conduct a hypothesis test with significance level $\alpha = 0.05$.

:::


:::figure hypo_prop_ex2
:::






:::solution



- **Set up two contradictory hypotheses** - The parameter is the percentage, so this is a test of a single population **proportion**. A consumer group believes that it is 30 \%, so we set up the following null hypothesis and alternative hypothesis.
\begin{eq*}
&&H_0: p = 0.3

&&H_1: p \neq 0.3
\end{eq*}
The significance level is given as $\alpha = 0.05$.


- **Collect sample data** - The sample data is already given.

- [3.] **Determine the correct distribution** - Since the sample size is large enough, we can use a normal distribution to approximate the sample proportion.


:::





:::solution
(continued)



- [4.] **Analyze sample data** - The sample size is $n = 150$ and the sample proportion is $\hat{p} = \frac{43}{150} \approx 0.287 $. The sample standard deviation is
\[ \sigma_p = \sqrt{\frac{p(1-p)}{n}} = \sqrt{\frac{(0.3)(0.7)}{150}} \approx 0.0374.\]
The test statistic is
\[z = \frac{\hat{p} - p}{\sigma_p} = \frac{0.287 - 0.3}{0.0374} = -0.347\]
The null hypothesis is an equality, so this is a two-tailed test. We can compute p-value as follows:
\[p = **2**P(Z > |z|) = 2P(Z > 0.347) \approx 2(0.3608) = 0.7216.\]
The p-value is apparently larger than the significance level $\alpha$.


:::





:::solution
(continued)

:::figure hypo_prop_ex2_dist.jpg — The distribution and the regions for p-value.
:::



- [5.] **Make a decision** - We **decline to reject** the null hypothesis. In conclusion, there is not sufficient evidence to conclude that the proportion of households that have three cell phones is not 30\%.


:::
