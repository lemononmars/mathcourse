---
week: 9
order: 2
slug: "rule-of-product"
title: "Rule of Product"
source: "tex/lecture09.tex"
---

## Rule of product for two arrangements


:::theorem

If there are $m$ ways to arrange something, and then $n$ ways to arrange something else after that, then the number of ways to arrange **both** of those things is $m \times n$.

:::





## Rule of product for any number of arrangements

If there are more than 2 arrangements, then we extend the rule as follows.

:::theorem

If there are $k$ different arrangements, and for each arrangement there are $N_k$ ways to do so, then the number of ways to arrange all of those things is
\begin{equation} 
N_1 \times N_2 \times N_3 \times \ldots \times N_k
\end{equation}

:::





:::figure rule_of_product — Rule of Product
:::






:::example

How many ways you can finish an exam with ten true-or-false questions.

:::


:::solution



- For the first question, you have two options (true or false). 

- For the second question, you have two options (true or false). 

- For the third question, you have two options (true or false). 

- $\vdots$

- For the tenth (and final) question, you have two options (true or false).

Thus, there are $2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 = 2^{10} = 1024$ possible ways.

:::





:::example

Suppose a student ID is a string which consists of a letter followed by a three-digit number (e.g. S408). How many distinct IDs are there?

:::


:::solution

Since the first event (choosing a letter) can occur in 26 possible ways and each of the other events (choosing a number) can occur in 10 possible ways, then the number of student IDs is $26 \times 10 \times 10 \times 10 = 26,000$.

:::






:::example

How many different four-of-a-kind hands are there in the standard 5-card poker?

:::


:::solution

We first choose which value would be the the four-of-a-kind, in which there are 13 different ways. Then, after taking all 4 cards of that value, we can pick any card as the fifth, so there are 52-4 = 48 ways. Since we do not care about order, the number of four-of-a-kind hands is
\[ 13 \times 48 = 624\]

:::






:::example

How many three-digit numbers are there where all digits are odd?

:::


:::solution

We can construct such three-digit number in three steps. 


- Choose the left most (hundreds) digit: there are 5 options (1,3,5,7 or 9) 

- Choose the middle most (tens) digit: there are 5 options (1,3,5,7 or 9) 

- Choose the right most (ones) digit: there are 5 options (1,3,5,7 or 9) 

Thus, the number of three-digit numbers where all digits are odd is $5 \times 5 \times 5 = 125$.

:::
