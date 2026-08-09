---
week: 11
order: 6
slug: "geometric"
title: "Geometric"
source: "tex/lecture11.tex"
---

## Motivation


:::note
If I want to keep buying packs until I get a **legendary** card, how many packs would I need to buy on average? (i.e. how screwed am I?)
:::



:::figure l11i07
:::







:::example

Let $X$ = the number of flips before you get the first head (i.e. all previous flips are tails). Draw the bar chart of the probability distribution function.

:::


:::solution

Let's consider each possible value of $X$ one by one. If the first flip is head, then we have $X=0$ as there was no prior failure, and we can see that $P(X=0) = \frac{1}{2}$. Then, for $X=1$, the first flip must be tail, and the second flip must be head. Since the two flips are independent, we have $P(X=1) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$. Similarly, we can easily prove that
\[ P(X=k) = \frac{1}{2} \times \left( \frac{1}{2}\right)^k.\]

:::





:::solution
(Continued) 
Thus, we have the following table
\begin{table}[h!]
\def\arraystretch{2}
\begin{tabular}{|C|C|C|C|C|C|C|}
\hline
k & 0 & 1 & 2 & 3 & 4 & \ldots 

\hline
P(X=k) & \frac{1}{2} & \frac{1}{4} & \frac{1}{8} & \frac{1}{16} & \frac{1}{32} & \ldots 

\hline
\end{tabular}
\end{table}

Using the table above, we can make the folowing chart.



:::tikz TikZ diagram
\begin{tikzpicture}
\draw[->] (0,0) -- (6,0) node [right] {$k$};
\draw[->] (0,0) -- (0,2.5) node [above] {$P(k)$};
\foreach \x in {0,1,2,3,4} 
{
	\draw (\x+1, 0) -- (\x+1,-0.1) node [below] {$\x$};
	\draw (\x+0.8, 0) rectangle (\x+1.2, 2*0.5^\x);
}
\foreach \x in {0.1,0.2,0.3,0.4,0.5}
{
	\draw (-0.1, 4*\x) -- (0, 4*\x) node [left] {$\x$};
}
\end{tikzpicture}
:::
:::






## Geometric Distribution


:::definition

A **geometric experiment** has three characteristics


- There are one or more Bernoulli trials with **ALL** failures **EXCEPT** the last one, which is a success.

- There must be at least one trial, but in theory the number of trials could go on forever.

- The probability of a success is the same number $**p**$ for each trial.


:::






:::note

Let $X$ be the number of independent trials **before** the first success. Then, $P(X)$ is called a **a geometric probability distribution**.

We denote $X \sim G(p)$, read as $X$ is a random variable with a geometric distribution.

:::



:::example



- The number of lotteries, if you buy one biweekly until you win a last-two-digit prize.

- The number of friends you have a handshake with until you get a COVID-19.

- The number of partners you go out with until you find the TRUE LOVE.


:::





## Example of geometric distributions



:::figure l11igeometric
:::

*[Click here to try it!](https://homepage.divms.uiowa.edu/~mbognar/applets/geo1.html)*






## Formulas



- The probability of exactly $k$ failures before the first success is $$P(X=k) = p(1-p)^k.$$
Note that this implies there are $k+1$ trials in total.

- The expected number is $$\mu = E(X) = \frac{1-p}{p}.$$





## Formulas

Again, these are irrelevent to our course, but for the sake of completeness here are other variables.


- The variance is $$\sigma^2 = V(X) = \frac{1}{p} \left( \frac{1}{p} - 1\right).$$

- The standard variation is $$\sigma = \sqrt{\frac{1}{p} \left( \frac{1}{p} - 1\right)}.$$






:::example

Suppose that you are performing the probability experiment of rolling one fair six-sided die. Let F be the event of rolling a four or a five. You are interested in how many times you need to roll the die in order to obtain the first four or five as the outcome.


- $p$ = probability of success (event F occurs)

- $q$ = probability of failure (event F does not occur)



- Write the description of the random variable $X$.

- What are the values that $X$ can take on?

- Find the values of $p$ and $q$.

- Find the probability that the first occurrence of event F (rolling a four or five) is on the second trial.


:::





:::solution



- $X =$ the number of dice rolls before the first four or five outcome.

- $X$ can take on $0,1,2,\ldots$. In other words, any natural number (including 0).

- $p = \frac{2}{6} = \frac{1}{3}$ and $q = 1-p = 1 - \frac{1}{3} = \frac{2}{3}$

- We can compute it directly: to get the success on the second trial, the first trial needs to be a failure. Therefore, $P(X=1) = \frac{2}{3} \times \frac{1}{3} = \frac{2}{9}.$

On the other hand, we can apply the formula directly with $k=1$ to get
\[ P(X=1) = p (1-p)^k = \frac{1}{3} \left( \frac{2}{3} \right)^1 = \frac{2}{9}\]


:::
