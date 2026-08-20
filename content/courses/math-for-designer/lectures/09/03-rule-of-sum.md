---
week: 9
order: 3
slug: "rule-of-sum"
title: "Rule of Sum"
source: "tex/lecture09.tex"
---

## Rule of sum for two arrangements


:::theorem

If there are $m$ ways to arrange something, and there are $n$ ways to arrange something else, and these arrangements cannot both happen, then the number of ways to arrange **either** of those things is $m + n$.

:::





## Rule of sum for any number of arrangements

If there are more than 2 arrangements, then we extend the rule as follows.

:::theorem

If there are $k$ different arrangements in which they cannot happen at the same time, and for each arrangement there are $N_k$ ways to do so, then the number of ways to arrange either of these things is
\begin{equation} 
N_1 + N_2 + N_3 \ldots + N_n
\end{equation}

:::






:::example

A student is shopping for a new computer. He is deciding among 3 desktop computers and 4 laptop computers. What is the total number of computer options?

:::


:::solution

Since the student only needs on computer, we can add the number of desktop computers and laptop computers to find the total number of options. Hence, the number of computer options is 7.

:::







:::example

If you flip 6 coins and count the number of heads, then how many possible outcomes are there?

:::


:::solution

Since we only consider the number of heads, we do not care which coin lands on heads. The possible outcomes are: 0 heads, 1 head, 2 heads, 3 heads, 4 heads, 5 heads, and 6 heads. 


Thus, there are 7 possible outcomes.

:::






:::example

How many integers between 1 and 100 are divisible by 11 or 13?

:::


:::solution

The number of integers between 1 and 100 that are divisible by 11 is 9 (namely, $11, 22, 33, \ldots, 99$.)


The number of integers between 1 and 100 that are divisible by 13 is 7 (namely, $13, 26, 39, \ldots, 91$.)


Since integers between 1 and 100 cannot both be divisible by 11 and 13 at the same time, these two conditions cannot both happen. Thus, the number of integers satisfying **either** condition is $9 + 7 = 16$.

:::
