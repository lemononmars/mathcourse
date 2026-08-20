---
week: 7
order: 2
slug: "binomial"
title: "Binomial"
source: "tex/lecture07.tex"
---

## Motivation


:::note
How many **legendary** cards would I get on average if I open 10 packs?
:::



:::figure l11i03
:::







:::example

Let $X$ = the number of heads from 3 coin flips. Draw the bar chart of the probability distribution function.

:::


:::solution

Compute each $P(X=k)$ separately. For $X=0$, the only way to get 0 heads is when all three coins are tails, and the probability is 
\[P(X=0) = \frac{1}{2} \times \frac{1}{2} \times \frac{1}{2} = \frac{1}{8}.\]

For $X=1$, there are 3 such outcomes - namely HTT, THT, and TTH. Hence, 
\[P(X=1) = 3 \times \frac{1}{8} = \frac{3}{8}.\]

Similary, we can compute $P(X=2) = \frac{3}{8}$ and $P(X=3) = \frac{1}{8}$.

:::





:::solution
(Continued) Thus, we have the following table

\def\arraystretch{2}

| k | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| P(X=k) | \frac{1}{8} | \frac{3}{8} | \frac{3}{8} | \frac{1}{8} |



Using the table above, we can make the folowing chart.



:::tikz TikZ diagram
\begin{tikzpicture}
\draw[->] (0,0) -- (5,0) node [right] {$k$};
\draw[->] (0,0) -- (0,2) node [above] {$P(k)$};
\foreach \x / \y in {0/0.125,1/0.375,2/0.375,3/0.125} 
{
	\draw (\x+1, 0) -- (\x+1,-0.1) node [below] {$\x$};
	\filldraw[fill=blue!20] (\x+0.8, 0) rectangle (\x+1.2, 4*\y);
}
\foreach \x in {1,2,3}
{
	\draw (-0.1, \x/2) -- (0, \x/2) node [left] {$\x/8$};
}
\end{tikzpicture}
:::




:::





## Binomial Distribution


:::definition

A **binomial experiment** has three characteristics


- There are a fixed number of $n$ trials.

- There are only two possible outcomes: success or failure. Let $p$ be the probability of a success on a single trial.

- All $n$ trials are independent and are repeated using identical condition.


:::



:::note

Let $X$ be the number of successes obtained in the $n$ independent trails. Then, $P(X)$ is called a **a binomial probability distribution**.

:::






:::example



- The number of 1s from 10 dice rolls.

- The number of times you get a blackjack in 100 games.

- The number of times you win a last-two-digit lottery prize, given that you buy one lottery biweekly 24 times in a row.


:::


:::figure binomial_example — \href{https://www.youtube.com/watch?v=WR0nMTr6uOo
:::
}




## Example of binomial distributions



:::figure l11i06
:::

*[Click here to try it!](https://homepage.divms.uiowa.edu/~mbognar/applets/bin.html)*





## Probability of binomial distribution


:::theorem

Let $X$ be the binomial distribution with parameters $n$ and $p$. The probability of exactly $k$ successes in $n$ trials is 
\begin{equation}
P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}.
\end{equation}

:::


:::slide

*Proof:* There are $\binom{n}{k}$ ways to have exactly $k$ successes in $n$ trials. Each way has probability $p^k$ for success and $(1-p)^{n-k}$ for failures. Using the rule of products, we have derived the formula. 

:::






## Expected value of binomial distribution


:::theorem

Let $X$ be the binomial distribution with parameters $n$ and $p$. The expected number of successes in $n$ trials is 
\begin{equation}
E(X) = np.
\end{equation}

:::


:::slide

*Proof:* Let $X_i$ be the expected value of the $i$-th trial. Then, we have $E(X_i) = p$ for each $i=1, 2, \ldots, n$. Since each trial is independent, we use the property of expectation to get 
\begin{eq*}
E(X) &=& E(X_1 + X_2 + \ldots + X_n) 

&=& E(X_1) + E(X_2) + \ldots + E(X_n) 

&=& p + p + \ldots + p = np.
\end{eq*}

:::





## The variance and standard deviation of binomial distribution

We won't focus on these formulas in this course, but they are useful to know and can be proven using the definitions of variance and standard deviation.

:::theorem

Let $X$ be the binomial distribution with parameters $n$ and $p$. The variance of $X$ is
\begin{equation}
\sigma^2 = V(X) = np(1-p),
\end{equation}
and the standard deviation is
\begin{equation}
\sigma = \sqrt{np(1-p)}.
\end{equation}

:::





:::example

Suppose you play a game that you can only either win or lose. The probability that you win any game is 55\%, and the probability that you lose is 45\%. Each game you play is independent. If you play the game 20 times. Let $X$ be the number of wins.


- List the values that $X$ may take on.

- Verify that $X$ is a binomial distribution.

- Find the probability that you win 15 games.

- Find the probability that you win at most 4 games.

- Find the expected number of wins.


:::





:::solution



- $X$ may take on the values $0, 1, 2, \ldots, 20$.

- $X$ is a binomial distribution because the number of trials are fixed, trials are independent, there are two outcomes, and the probability of success $p=0.55$ is constant.

- $P(X=15) = \binom{20}{15} (0.55)^{15} (0.45)^5 \approx 0.0337$.

- $P(X \le 4) = \sum_{k=0}^4 \binom{20}{k} (0.55)^k (0.45)^{20-k} \approx 0.0017$.

- $E(X) = np = 20 \times 0.55 = 11$.


:::




## Remark on binomial distribution


:::remark Remark



- A binomial experiment (or a ``coin flip'') with only one trial $(n=1)$ is called a **Bernoulli Trial**.

- We denote $X \sim B(n,p)$, read as $X$ is a random variable with a binomial distribution.


:::





:::exercise

Suppose that about 85\% of graduating students attend their graduation. A group of 22 graduating students is randomly chosen.


- In words, define the random variable $X$.

- List the values that $X$ may take on.

- Give the distribution of $X$. $X ~ \ldots$

- How many are expected to attend their graduation?

- Find the probability that 17 or 18 attend.

- Based on numerical values, would you be surprised if all 22 attended graduation? Justify your answer numerically.


:::
