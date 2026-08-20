---
week: 11
order: 2
slug: "null-hypothesis"
title: "Null hypothesis"
source: "tex/lecture11.tex"
---

## A Crash Course


:::figure l14hypothesisintro
:::

Link: [\textcolor{blue](https://www.youtube.com/watch?v=bf3egy7TQ2Q){How P-Values Help Us Test Hypotheses}}




## Definition


:::definition

The **null hypothesis** is an assertion about the value of a population parameter. It is written as
\[ H_0: P,\]
where $P$ is a statement (equation, inequality, etc.)


The **alternative hypothesis** is the negation of the null hypothesis, written as
\[ H_1: \neg P.\]

:::





## Example

For instance, we may assert the following hypotheses:
\[H_0: \mu \geq 100\]
This means we believe that the mean $\mu$ is at least 100. Then, the alternative hypothesis would be the negation of $H_0$, which is
\[H_1: \mu < 100.\]





:::example

Suppose there is an automatic bottling machine that fills two-liter bottles with cola. The company claims that the average each bottle contains is *at least* 2,000 $cm^3$. 

:::


:::slide



- We have to accept this claim as true *unless* we have sufficient evidence against it: that each soda bottle contains at least 2,000 $cm^3$

- The alternative hypothesis is the suspicion that someone else has about that claim: a consumer advocate suspects that the average amount of cola is less than 2,000 $cm^3$.

- It is important to be clear about exactly what the null hypothesis is, or else the test is meaningless.


:::






:::example

We want to test whether the mean GPA of students in American colleges is different from 2.0 (out of 4.0). State the null and alternative hypotheses.

:::


:::solution

If you have the assumption that the mean GPA is 2.0, then the null and alternative hypotheses are
\begin{eq*}
H_0: \mu &=& 2.0 

H_1: \mu &\neq& 2.0
\end{eq*}
On the other hand, if you have the assumption that the mean GPA is **not** 2.0, then the null and alternative hypotheses are
\begin{eq*}
H_0: \mu &\neq& 2.0 

H_1: \mu &=& 2.0
\end{eq*}

:::
