---
week: 6
order: 3
slug: "expected-value"
title: "Expected Value"
source: "tex/lecture06.tex"
---

## Motivation



- This is where probability meets statistics! 

- $P(X=k)$ only tells you the probability of a single event. 

- What if we want to know what would happen in **long-term**? 

- Or when we repeat the experiments gazillions number of times?


:::figure expected_value — Average?
:::






## Expected value E(X)


:::definition

The **expected value** (or **expectation**) of a discrete random variable $X$ is **the "long-term" average** or **mean** of the probability distribution. Formally,
\[ \mu = E(X) = \sum_{x \in S} x P(x)\] 

:::

This means that over the long term of doing
an experiment over and over, you would expect this average.





:::example

Find the expected value of a single die roll. In other words, find $E(X)$ where $X$ is the value of a die roll.

:::


:::solution

It is helpful to make a table for $P(x)$ and then $x P(x)$.

\renewcommand{\arraystretch}{1.8}

| x | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- |
| P(x) | \frac{1}{6} | \frac{1}{6} | \frac{1}{6} | \frac{1}{6} | \frac{1}{6} | \frac{1}{6} |
| x P(x) | \frac{1}{6} | \frac{2}{6} | \frac{3}{6} | \frac{4}{6} | \frac{5}{6} | \frac{6}{6} |



Then, the expected value of $X$ is 
\[E(X) = \frac{1}{6} + \frac{2}{6} + \frac{3}{6} + \frac{4}{6} + \frac{5}{6} + \frac{6}{6} = \frac{21}{6} = 3.5\]
This means *on average*, the result of a die roll is 3.5 (even though the number is not on the die!). 

:::






:::example

Find the expected value of the sum of values of **two** dice rolls. In other words, find $E(X)$ where $X$ is the sum of values of two dice rolls.

:::


:::solution

Make a table for $P(x)$ and then $xP(x)$.


| $x$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $ P(X =x)$ | $\frac{1}{36}$ | $\frac{2}{36}$ | $\frac{3}{36}$ | $\frac{4}{36}$ | $\frac{5}{36}$ | $\frac{6}{36}$ | $\frac{5}{36}$ | $\frac{4}{36}$ | $\frac{3}{36}$ | $\frac{2}{36}$ | $\frac{1}{36}$ |
| $x P(x)$ | $\frac{2}{36}$ | $\frac{6}{36}$ | $\frac{12}{36}$ | $\frac{20}{36}$ | $\frac{30}{36}$ | $\frac{42}{36}$ | $\frac{40}{36}$ | $\frac{36}{36}$ | $\frac{30}{36}$ | $\frac{22}{36}$ | $\frac{12}{36}$ |


Then, the expected value of $X$ is 
\[E(X) = (2)\frac{1}{36} + (3)\frac{2}{36} + (4)\frac{3}{36} + \ldots + (12)\frac{1}{36} = 7.\]

This means *on average*, the sum of two dice rolls is 7.

This agrees with the distribution function that $7$ is the most likely outcome with probability $\frac{6}{36}$.

:::






:::example

Suppose a box contains **3 red balls** and **5 green balls**. Find the expected number of red balls if you take 3 balls without replacement.

:::


:::solution

Let $X$ be the number of red balls when taking three balls without replacement. We need to find $P(X = x)$ for $x = 0,1,2$ and $3$. 


- To get $0$ **red balls**, you need to take 3 **green balls**. The number of ways to take 3 green balls out of 5 green balls is $\binom{5}{3} = 10$.

- To get $1$ **red ball**, you need to also take 2 **green balls**. The number of such ways is $\binom{3}{1} \times \binom{5}{2} = 30$

- To get $2$ **red balls**, you need to also take 1 **green ball**. The number of such ways is $\binom{3}{2} \times \binom{5}{1} = 15$.

- To get all $3$ **red balls**, there is only 1 way to do so.


:::





:::solution
(continued)
We can verify that we cover all possible outcomes because $10+30+15+1 = 56$, which is equal to the number of ways to take $3$ balls from $8$ balls, or $\binom{8}{3}$.

We now have the following table for $P(x)$ and $xP(x)$


| x | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| P(x) | \frac{10}{56} | \frac{30}{56} | \frac{15}{56} | \frac{1}{56} |
| xP(x) | 0 | \frac{30}{56} | \frac{30}{56} | \frac{3}{56} |


Therefore, the expected number of red balls is 
\[ E(X) = 0 + \frac{30}{56} + \frac{30}{56} + \frac{3}{56} = \frac{63}{56} \approx 1.125\]

:::






## Properties of Expected Value

Notice that rolling two dice gives a total of 7 on average, which is equal twice the average of rolling one die. This is by no mean a coincident!

:::theorem Linearity by sum

Given a random variable $X$ and $Y$. Define $X + Y$ to be a new random variable defined by adding outcomes of $X$ and $Y$. Then, we have
\[E(X+Y) = E(X) + E(Y)\]

:::






:::example

Let $X_6$ be the outcome of a single six-sided die roll (abbreviated as **d6**), $X_{10}$ be the outcome of a single ten-sided die roll (abbreviated as **d10**).


- Find the expected value of totals of one **d6** and one **d10**

- Find the expected value of totals of three **d10**.


:::


:::solution



- The expected value of rolling one **d6** and one **d10** is 
\[E(X_6 +X_{10}) = E(X_6) + E_{10} = 3.5 + 5.5 = 9\]

- The expected value of rolling three **d10** is
\[E(X_{10} + X_{10} + X_{10}) = E(X_{10}) + E(X_{10}) + E(X_{10}) = 5.5 + 5.5 + 5.5 = 16.5\]


:::





## Properties of Expected Value

Similarly, we have the following property.

:::theorem Linearity by scalar multiplication

Given a random variable $X$ and a constant $a$. Define $aX$ to be a new random variable defined by multiplying $a$ to all outcomes of $X$. Then, we have
\[E(aX) = aE(X)\]

:::

Note: **$2X \neq X+X$** !!! For example, $X$ is the result of a die roll, then possible values of $2X$ are $2,4,6,8,10$ and $12$, which is different from $X+X$ where values range from $2$ up to $12$.



These formula are very useful in answering these types of questions: 


- What gives you a higher sum: rolling 4 **d6** or 1 **d6** and 2 **d10**? 

- Should I place my settlement around 11,5,9 combinations or 2,6,8 combinations? 

- In a game of Black Jack, I have a 15 hand now. Should I stay or get another card? 

Informally, you want a **better payoff**.





:::example

Suppose you roll 2 dice and gain coins equal to the difference. What is the expected number of coins you would gain?

:::


:::solution

Let $X$ be the number of coins.


- $X=0$ when both dice have the same value, which has probability $\frac{6}{36}$

- $X=1$ when the dice are $(1,2), (2,3), (3,4), (4,5), (5,6), (2,1), (3,2) , (4,3), (5,4), (6,5)$, thus the probability is $\frac{10}{36}$

After carefully counting all cases, we have
\[E(X) = (0) \frac{6}{36} + (1) \frac{10}{36} + (2) \frac{8}{36} + (3) \frac{6}{36} + (4) \frac{4}{36} + (5) \frac{2}{36} = \frac{70}{36}\]

:::





:::exercise

Find the expected number of the following random variables.


- $X=$ the face value of a playing card. We consider J, Q and K to have value of zero.

- $X=$ the number of red marbles drawn from a bag with 8 white marbles and 2 red marbles.

- $X=$ the sum of rolling a d6, d8, and d10.

- $X=$ the higher dice when you roll two six-sided dice.


:::
