---
week: 10
order: 1
slug: "estimation"
title: "Estimation"
source: "tex/lecture10.tex"
---

## Recall: inferential statistics



:::figure l01i01
:::





## Rigorous process



:::figure l13flowchart
:::





## Reality...



:::figure l13badflowchart
:::





## Shortcut?



:::figure l13driftmeme
:::





## Sampling



:::figure l01i03
:::





## Definition


:::definition

A numerical measure of a population is called a **population parameter**. A numerical measure of the sample is called a **sample parameter**.


| | Sample | | Population |
| --- | --- | --- | --- |
| | parameter | (estimates) | parameter |
| Mean | $\bar{x}$ | $\rightarrow$ | $\mu$ |
| Proportion | $\hat{p}$ | $\rightarrow$ | $p$ |
| Variance | $S$ | $\rightarrow$ | $\sigma$ |


:::

Note: While population parameters are constant, sample parameters may change from one experiment to another.





:::example

You have a bag containing 30 Master balls and 70 normal balls. You take a sample of 10 balls without replacement and get 4 Master balls. Determine the population parameter for proportion $p$ and the sample parameter for proportion $\hat{p}$.

:::




:::figure l13pokeballs
:::



:::solution

The population parameter is $p = \frac{30}{30+70} = 0.3.$ The sample parameter is $\hat{p} = \frac{4}{10} = 0.4.$

:::





## Reverse Engineer




:::figure l13pokeballsbag.png
:::


In practice, we don't know the population parameter $p$. How can we use the sample parameter $\hat{p}$ to **estimates** $p$?




## Motivation

Suppose you know that a bag contains 10 Pokeballs, but you don't know how many of them are Master balls.

:::slide



- If you pull out all the balls, you'll know the distribution for sure.

- If you pull out 9 balls and see $3$ Master balls, you can say that the bag contains either 3 or 4 Master balls (i.e. in the range $[3,4]$.)




:::figure l13pokeballsex1
:::



:::





## How Many?


:::slide



- If you pull out 5 balls and see $1$ Master balls, you can say that the bag contains 1,2,3,4,5, or 6 Master balls (i.e. in the range $[1,6]$), each with varying probability. 


:::




:::figure l13pokeballsex2
:::



:::slide

Since the cases of 1 and 6 Master balls are less likely, you can somewhat confidently say that it's between 2 and 5 balls, inclusive.

:::





## Practicality

So, why can't we just pull everything out of the bag?

:::slide



- Cost

- Time

- Too many samples

- There will be errors anyway




:::figure l13lotsofpokeballs
:::



:::




\iffalse


## Properties of estimators



- An estimator is **unbiased** if its expected value is equal to the population parameter it estimates. 

- An estimator is **efficient** if it has a relatively small variance (and standard deviation). 

- An estimator is **consistent** if its probability of being close to the parameter it estimates increases as the sample size increases. 

- An estimator is **sufficient** if it contains all the information in the data about the parameter it estimates. 






:::figure l06i12.png
:::


\fi
