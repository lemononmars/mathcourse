---
week: 11
order: 7
slug: "extra"
title: "Extra"
source: "tex/lecture11.tex"
---

## Motivation


:::note
If I know that a bundle of 100 packs has exactly 5 packs with a **legendary** card, how many **legendary** cards would I get if I take 20 packs?
:::



:::figure l11i08
:::







## Hypergeometric Distribution


:::definition

A **hypergeometric experiment** has five characteristics


- You take samples from **two** groups.

- You are concerned with a group of interest, called the first group.

- You sample **without replacement** from the combined groups.

- Each pick is **not** independent.

- You are **not** dealing with Bernoulli Trials (due to dependency).


:::






:::note

Let $X$ be the number of items from the first group. Then, $P(X)$ is called a **a hypergeometric probability distribution**.

We denote $X \sim H(r,b,n)$ where $r$ is the size of the first group (the group of interest), $b$ is the size of the second group, and $n$ is the size of the chosen sample.

:::


:::example



- The number of boys when you select 10 random people from the class.

- The number of good apples when buying 5 from a pile of apples.

- The number of unplayed games on your Steam account when you take 10 random games.


:::





## Example of hypergeometric distributions



:::figure l11hypergeo
:::

*[Click here to try it!](https://homepage.divms.uiowa.edu/~mbognar/applets/hg.html)*





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

- The Poisson distribution may be used to approximate the binomial if the probability of success is ``small" (such as $p=0.01$) and the number of trials is ``large" (such as $n=1,000$). 



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
