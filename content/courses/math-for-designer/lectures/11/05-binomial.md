---
week: 11
order: 5
slug: "binomial"
title: "Binomial"
source: "tex/lecture11.tex"
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
	\draw (\x+0.8, 0) rectangle (\x+1.2, 4*\y);
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


:::youtube WR0nMTr6uOo | Electrifying
:::





## Example of binomial distributions



:::figure l11i06
:::

*[Click here to try it!](https://homepage.divms.uiowa.edu/~mbognar/applets/bin.html)*





## Formulas (1/2)



- The probability of exactly $k$ successes in $n$ trials is $$P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}.$$

- The expected number is $$\mu = E(X) = np.$$





## Formulas (2/2)

These are irrelevent to our course, but for the sake of completeness here are other variables.


- The variance is $$\sigma^2 = V(X) = np(1-p).$$

- The standard variation is $$\sigma = \sqrt{np(1-p)}.$$





## Notes



- A binomial experiment (or a ``coin flip'') with only one trial $(n=1)$ is called a **Bernoulli Trial**.

- We denote $X \sim B(n,p)$, read as $X$ is a random variable with a binomial distribution.
