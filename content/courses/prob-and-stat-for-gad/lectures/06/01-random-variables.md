---
week: 6
order: 1
slug: "random-variables"
title: "Random Variables"
source: "tex/lecture06.tex"
---

## Warm up

Recall the formula
\[ P(A) = \frac{n(A)}{n(S)}.\]
This works if all outcomes are *equally likely*. What if they are not?




## Two coins


:::figure two_coins — Tossing two coins
:::





## Catan


:::figure l09i04 — [](https://boardgamegeek.com/boardgame/13/catan
:::
)




## Variable

Here are the familiar **variables**: 
\begin{eq*}
3x -4 &=& 5 

x^2 + y^2 &=& z^2 

x^n + y^n &=& z^n 

A \cup B &=& \{1,2,4,5\}
\end{eq*}





## Random variable


:::definition

A **random variable**, often denoted $X$, describes the outcomes of a statistical experiment in words.

:::



:::example



- Let $X$ = the number of heads you get when you toss 3 fair coins. 

- Let $X$ = the sum of dice values when you roll 4 dice. 

- Let $X$ = the temperature in Munich, Germany tomorrow. 

- Let $X$ = the number of points you get in this class at the end of the semester.


:::



\iffalse


## Collaborative Exercise: 1/2



- Every one tosses a coin 10 times and record the number of heads.

- After all members of the class have completed the experiment, announce the result to fill in the table.

- Let $X$ = the number of heads in ten tosses of the coin.





## Collaborative Exercise: 2/2

Answer the questions:


- Which value(s) of $x$ occurred most frequently?

- If you tossed the coin 1,000 times, what values could $x$ take one? Which value(s) of $x$ do you think would occur most frequently?

- What does the relative frequency column sum to?


\fi



## Notes


:::remark



- It is not always true that $X$ is in the sample space. For example, the sample space of two coin flips is $\{HH, HT, TH, TT\}$, but if $X$ is the number of heads, then $X=0,1$ or $2$.

- The random variable $X$ itself doesn't describe an event. Thus, the notation
\[P(X)\]
is meaningless. 

- We can consider the probability that an outcome takes on certain values. For example, $P(X=1)$ reads ``the probability that $X$ is equal to 1''.


:::






## Types of random variables

There are two different types of random variables: 

:::definition



- **Discrete random variable**: you can list all outcomes separately (e.g. dice, coin, card.) 

- **Continuous random variable**: you can only list outcomes as an interval (e.g. temperature, height, area. Usually those with decimals.) 


:::

In this lecture, we are going to focus on *discrete random variables* 




:::exercise

For each random variable, list all possible values of $X$.


- $X = $ the number of heads when you toss 10 fair coins.

- $X = $ the difference of two dice.

- $X = $ the number of pairs of cards (cards with the same value) when you draw 5 cards from a single standard deck.

- $X = $ the temperature of water in Celcius.


:::
