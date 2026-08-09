---
week: 11
order: 3
slug: "expected"
title: "Expected Value"
source: "tex/lecture11.tex"
---

## Motivation



- This is where probability meets statistics! \pa

- $P(X=k)$ only tells you the probability of a single event. \pa

- What if we want to know what would happen in **long-term**? \pa

- Or when we repeat the experiments gazillions number of times?


:::figure expected_value — Average?
:::






## Expected value E(X)


:::definition

The **expected value** (or **expectation**) \pa of a discrete random variable $X$ is **the "long-term" average** or **mean** of the probability distribution. Formally,
\[ \mu = E(X) = \sum_{x \in S} x P(x)\] \pa

:::

This means that over the long term of doing an experiment over and over, you would expect this average.





:::example

Find the expected value of a single die roll. In other words, find $E(X)$ where $X$ is the value of a die roll.

:::


:::solution

It is helpful to make a table for $P(x)$ and then $x P(x)$.
\begin{table}[h!]
\begin{tblr}{colspec={|Q||Q|Q|Q|Q|Q|Q}, cells={$,c}}
x & 1 & 2 & 3 & 4 & 5 & 6 

P(x) & \frac{1}{6} & \frac{1}{6} & \frac{1}{6} & \frac{1}{6} & \frac{1}{6} & \frac{1}{6} 

x P(x) & \frac{1}{6} & \frac{2}{6} & \frac{3}{6} & \frac{4}{6} & \frac{5}{6} & \frac{6}{6} 
\end{tblr}
\end{table}

Then, the expected value of $X$ is 
\[E(X) \pa= \frac{1}{6} + \frac{2}{6} + \frac{3}{6} + \frac{4}{6} + \frac{5}{6} + \frac{6}{6} \pa = \frac{21}{6} \pa = 3.5\]
This means *on average*, the result of a die roll is 3.5 (even though the number is not on the die!). \pa

:::






:::example

Find the expected value of a single roll of an 10-sided dice.

:::


:::solution

It is helpful to make a table for $P(x)$ and then $x P(x)$.
\begin{table}[]
\begin{tblr}{colspec={|Q||Q|Q|Q|Q|Q|Q|Q|Q|Q|Q|}, hlines, cells = {$, c}}
x &1&2&3&4&5&6&7&8&9&10 

P(x) & \frac{1}{10} & \frac{1}{10} & \frac{1}{10} & \frac{1}{10} & \frac{1}{10} & \frac{1}{10} & \frac{1}{10}& \frac{1}{10}& \frac{1}{10}& \frac{1}{10} 

x P(x) & \frac{1}{10} & \frac{2}{10} & \frac{3}{10} & \frac{4}{10} & \frac{5}{10} & \frac{6}{10} & \frac{7}{10}& \frac{8}{10}& \frac{9}{10}& \frac{10}{10}

\end{tblr}
\end{table}

Then, the expected value of $X$ is 
\[E(X) \pa= \frac{1}{10} + \frac{2}{10} + \frac{3}{10} + \cdots + \frac{10}{10} \pa = \frac{55}{10} \pa = 5.5\]
This means *on average*, the result of a 10-sided die roll is 5.5.

:::






:::example

Find the expected value of the sum of values of **two** dice rolls. In other words, find $E(X)$ where $X$ is the sum of values of two dice rolls.

:::


:::solution

Make a table for $P(x)$ and then $xP(x)$.
\begin{table}[h!]
\begin{tblr}{colspec={|Q||Q|Q|Q|Q|Q|Q|Q|Q|Q|Q|Q|}, hlines, cells={$,c}}
x&2&3&4&5& 6 & 7 & 8 & 9 & 10 & 11 & 12 

P(x) & \tfrac{1}{36} & \tfrac{2}{36} & \tfrac{3}{36} & \tfrac{4}{36} & \tfrac{5}{36} & \tfrac{6}{36} & \tfrac{5}{36} & \tfrac{4}{36} & \tfrac{3}{36} & \tfrac{2}{36} & \tfrac{1}{36} 

x P(x) & \tfrac{2}{36} & \tfrac{6}{36} & \tfrac{12}{36} & \tfrac{20}{36} & \tfrac{30}{36} & \tfrac{42}{36} & \tfrac{40}{36} & \tfrac{36}{36} & \tfrac{30}{36} & \tfrac{22}{36} & \tfrac{12}{36}
\end{tblr}
\end{table}
Then, the expected value of $X$ is 
\[E(X) = (2)\frac{1}{36} + (3)\frac{2}{36} + (4)\frac{3}{36} + \ldots + (12)\frac{1}{36} = 7.\]

This means *on average*, the sum of two dice rolls is 7. This agrees with the distribution function that $7$ is the most likely outcome with probability $\frac{6}{36}$.

:::






:::example

Suppose a box contains **3 red balls** and **5 green balls**. Find the expected number of red balls if you take 3 balls without replacement.

:::


:::solution

Let $X$ be the number of red balls when taking three balls without replacement. We need to find $P(X = x)$ for $x = 0,1,2$ and $3$. 


- To get $0$ **red balls**, you need to take 3 **green balls**. The number of ways to take 3 green balls out of 5 green balls is $\ch{5}{3} = 10$.

- To get $1$ **red ball**, you need to also take 2 **green balls**. The number of such ways is $\ch{3}{1} \times \ch{5}{2} = 30$

- To get $2$ **red balls**, you need to also take 1 **green ball**. The number of such ways is $\ch{3}{2} \times \ch{5}{1} = 15$.

- To get all $3$ **red balls**, there is only 1 way to do so.


:::





:::solution
(continued)
We can verify that we cover all possible outcomes because $10+30+15+1 = 56$, which is equal to the number of ways to take $3$ balls from $8$ balls, or $\ch{8}{3}$.

We now have the following table for $P(x)$ and $xP(x)$
\begin{table}[h!]
\begin{tblr}{colspec={|Q||Q|Q|Q|Q|}, hlines, cells={$,c}}
x & 0 & 1 & 2 & 3 

P(x) & \frac{10}{56} & \frac{30}{56} & \frac{15}{56} & \frac{1}{56} 

xP(x) & 0 & \frac{30}{56} & \frac{30}{56} & \frac{3}{56}
\end{tblr}
\end{table}
Therefore, the expected number of red balls is 
\[ E(X) = 0 + \frac{30}{56} + \frac{30}{56} + \frac{3}{56} = \frac{66}{56} \approx 1.18\]

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



- The expected value of rolling one **d6** and one **d10** is \pa
\[E(X_6 +X_{10}) \pa = E(X_6) + E(X_{10}) \pa = 3.5 + 5.5 = 9\]

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



These formula are very useful in answering these types of questions: \pa


- What gives you a higher sum: rolling 4 **d6** or 1 **d6** and 2 **d10**? \pa

- Should I place my settlement around 11,5,9 combinations or 2,6,8 combinations? \pa

- In a game of Black Jack, I have a 15 hand now. Should I stay or get another card? \pa

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



\iffalse


:::exercise

Find the expected number of the following random variables.


- $X=$ the face value of a playing card. We consider J, Q and K to have value of zero.

- $X=$ the number of red marbles drawn from a bag with 8 white marbles and 2 red marbles.

- $X=$ the sum of rolling a d6, d8, and d10.

- $X=$ the higher dice when you roll two six-sided dice.


:::


\fi
