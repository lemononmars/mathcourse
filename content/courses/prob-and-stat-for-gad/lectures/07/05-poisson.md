---
week: 7
order: 5
slug: "poisson"
title: "Poisson"
source: "tex/lecture07.tex"
---

## Motivation


:::note
If I know that each bundle of packs (exact amount doesn't matter) has various numbers of legendary cards, with the average of 5 cards per bundle, how many **legendary** cards would I get if I buy 10 bundles?
:::



:::figure l11i09
:::






## Poisson Distribution


:::definition

A **Poisson experiment** has two characteristics


- The **Poisson probability distribution** gives the probability of a number of events occurring in a fixed interval of
time or space if these events happen with a known average rate and independently of the time since the last event.

- The Poisson distribution may be used to approximate the binomial if the probability of success is ``small`` (such as $p=0.01$) and the number of trials is ``large'' (such as $n=1,000$). 



:::






:::note

We denote $X \sim P(\mu)$, read as $X$ is a random variable with a Poisson distribution. The parameter is $\mu$ which is the mean for the interval of interest.

:::


:::example



- The number of pieces of mail received in a day.

- The number of phone calls received by a call center per hour.

- The number of fake COVID-19 news on your facebook feed in an hour.


:::





## Example of Poisson Distribution



:::figure l11poisson
:::

*[Click here to try it!](https://homepage.divms.uiowa.edu/~mbognar/applets/bin-like.html)*





## Formulas



- The probability of having exactly $k$ successes is $$P(X=k) = e^{-\mu} \frac{\mu^k}{k!}.$$

- The expected number is already given, so $$\mu = E(X) = \mu.$$

- The variance is $\sigma^2 = V(X) = \mu.$

- The standard variation is $\sigma = \sqrt{\mu}.$




\resizebox{!}{0.9\textheight}{

:::exercise

You will generate a sample of Poisson distribution. Imagine 20 cups sitting on a table in a row. You will choose 5 consecutive cups and gain the coins inside those cups.


- Roll d20 fifteen times. This represents the fifteen coins randomly placed into the cups. You can use two recommended links below, or use any other method you like.

- Fill in the table below


| selected cups | 1-5 | 2-6 | $\cdots$ | 16-20 |
| --- | --- | --- | --- | --- |
| number of coins | | | $\cdots$ | |



- Create a bar chart using the values in the second row of the table above, where the horizontal axis is the number of coins and the vertical axis is the frequency.

- Which number comes up most often? Why is it so?


:::

}
