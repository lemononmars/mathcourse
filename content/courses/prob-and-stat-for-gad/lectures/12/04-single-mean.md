---
week: 12
order: 4
slug: "single-mean"
title: "Hypothesis Testing for a Single Mean"
source: "tex/lecture12.tex"
---

:::example

Jeffrey established a mean time of 16.43 seconds for swimming the 25-yard freestyle, with a standard deviation of 0.8 seconds. His dad, Frank, thought that Jeffrey could swim the 25-yard freestyle faster using goggles. Frank bought Jeffrey a new pair of expensive goggles and timed Jeffrey for 15 25-yard freestyle swims.


For the 15 swims, Jeffrey's mean time was 16 seconds. Conduct a hypothesis test using a preset $\alpha = 0.05$. Assume that the swim times for the 25-yard freestyle are normal.

:::


:::figure hypo_onemean_ex1
:::





:::solution



- **Set up two contradictory hypotheses**
\begin{eq*}
H_0:&& \mu \geq 16.43 

H_1:&& \mu < 16.43

\end{eq*}
The significance level is given as $\alpha = 0.05$.

- **Collect sample data** We obtain $\overline{x} = 16, n = 15, \sigma = 0.8$.

- **Determine the correct distribution** We already assume that the swim times are normal.


:::





:::solution
(continued)


- [4.] **Analyze sample data** The test statistics is
\begin{eq*}
z = \frac{\overline{x} - \mu_0}{\sigma / \sqrt{n}} &=& \frac{16-16.43}{0.8 / \sqrt{15}}

&\approx& -2.0817
\end{eq*}
Then, we use the test statistic to compute the p-value
\[p = P(Z < z) = P(Z < -2.0817) \approx 0.0187.\]

- [5.] **Make a decision** Because the p-value is smaller than the significance level $\alpha$, we **reject** the null hypothesis. The sample data show sufficient evidence that the goggle **didn't help** Jeffrey to swim faster.


:::






:::example

Statistics students believe that the mean score on the first statistics test is 65. A statistics instructor thinks the mean score is higher than 65, so he decides to perform a hypothesis test using a 5\% level of significance.


He samples ten statistics students and obtains the scores 65; 65; 70; 67; 66; 63; 63; 68; 72; 71. The data are assumed to be from a normal distribution. State the result of his hypothesis testing.

:::


:::figure hypo_onemean_ex2
:::





:::solution



- **Set up two contradictory hypotheses** - We set up a null hypothesis **against** instructor's belief, that is
\begin{eq*}
&&H_0: \mu \leq 65

&&H_1: \mu > 65
\end{eq*}
The significance level is given as $\alpha = 0.05$.


- **Collect sample data** - The sample data is already given.

- [3.] **Determine the correct distribution** - Since the problem doesn't give a population standard deviation and the number of samples is small, we need to use **a student's $t$-test** with degree of freedom $df = 10-1=9$. 


:::





:::solution
(continued)



- [4.] **Analyze sample data** - The sample mean and sample standard deviation are $\overline{x} = \tfrac{\sum x}{n} = 67$ and $s = \sqrt{\tfrac{\sum (x - \overline{x})^2}{n-1}} \approx 3.1972.$ The test statistic is
\[t= \frac{\overline{x} - \mu_0}{(s / \sqrt{n})} = \frac{67-65}{3.1972 / \sqrt{10}} \approx 1.9781\]
Then, we use the test statistic to compute the p-value
\[p = P(T > t) = P(T > 1.9781) \approx 0.0396\]
The p-value is smaller than the significance level $\alpha$.

- [5.] **Make a decision** - We **reject** the null hypothesis. In conclusion, the sample data show sufficient evidence that the mean (average) test score is more than 65, just as the math instructor thinks.


:::
