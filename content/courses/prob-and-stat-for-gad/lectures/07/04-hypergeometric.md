---
week: 7
order: 4
slug: "hypergeometric"
title: "Hypergeometric"
source: "tex/lecture07.tex"
---

## Motivation


:::note
If I know that a bundle of 100 packs has exactly 5 packs with a **legendary** card, how many **legendary** cards would I get if I take 20 packs?
:::



:::figure l11i08
:::







:::example

Suppose a box contains 2 **red** ball and 3 **green** balls. Let $X$ = the number of red balls you get from taking 2 distinct balls from the box. Draw a bar chart of the probability distribution function.

:::





## Hypergeometric Distribution


:::definition

A **hypergeometric experiment** has five characteristics


- You take samples from **two** groups.

- You are concerned with a group of interest, called the first group.

- You sample **without replacement** from the combined groups.

- Each pick is **not** independent.

- You are **not** dealing with Bernoulli Trials (due to dependency).


:::





## Definition of hypergeometric distribution


:::definition Hypergeometric Distribution

Let $N$ be the total number of objects, $M$ be the number of successes (the group of interest), and $n$ be the size of the chosen sample. Define $X$ as the number of successes. Then, $H(n,N,M)$ is called a **hypergeometric distribution**.

:::




:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 0.5]
		\filldraw[fill = green!20] (0,0) rectangle (2,4);
		\node at (1,4.5) {Success};
		\node at (1,3.5) {$M$};
		\filldraw[fill = red!20] (2,0) rectangle (5,4);
		\node at (3.5, 4.5) {Failure};
		\node at (3.5, 3.5) {$N-M$};
		
		\filldraw[fill = blue!20] (1,1) rectangle (4,2);
		\node at (2.5, 2.5) {Chosen sample};
		\node at (2.5, 1.5) {$n$};
	\end{tikzpicture}
:::


*Hypergeometric Distribution*






:::remark Examples of hypergeometric distribution



- The number of boys when you select 10 random people from the class.

- The number of good apples when buying 5 from a pile of apples.

- The number of unplayed games on your Steam account when you take 10 random games.


:::





## Hypergeometric distribution function



:::figure l11hypergeo
:::

*[Click here to try it!](http://homepage.divms.uiowa.edu/~mbognar/applets/hg.html)*




## Probability of hypergeometric distribution


:::theorem

Let $H(n,N,M)$ be the hypergeometric distribution where $n$ is the size of the chosen sample, $N$ is the total number of objects, and $M$ is the number of successes (the group of interest), and $X$ is the number of successes. Then, the probability of $k$ successes is given by
\begin{equation}
P(X=k) = \frac{\binom{M}{k} \binom{N-M}{n-k}}{\binom{N}{n}}.
\end{equation}

:::


:::slide

*Sketch of proof:* We simply use the standard definition of probability.

:::




## Expected value of hypergeometric distribution


:::theorem

Let $H(n,N,M)$ be the hypergeometric distribution where $n$ is the size of the chosen sample, $N$ is the total number of objects, and $M$ is the number of successes (the group of interest), and $X$ is the number of successes. Then, the expected value is
\begin{equation}
E(X) = n\frac{M}{N}
\end{equation}

:::


:::slide

*Sketch of proof:* This would be the intuitive answer: each pick has $\frac{M}{N}$ chance of success, and we pick $n$ times. However, these picks are not independent, so we need to use the definition of expected value, which coincidentally works out to the same answer.

:::




## Variance and standard deviation of hypergeometric distribution


:::theorem

Let $H(n,N,M)$ be the hypergeometric distribution where $n$ is the size of the chosen sample, $N$ is the total number of objects, and $M$ is the number of successes (the group of interest), and $X$ is the number of successes. Then, the variance is
\begin{equation}
Var(X) = n\frac{M}{N}\frac{N-M}{N}\frac{N-n}{N-1}
\end{equation}
and the standard deviation is
\begin{equation}
\sigma = \sqrt{Var(X)}
\end{equation}

:::





:::example

A bag contains letter tiles. 44 of the tiles are vowels, and 56 are consonants. 7 tiles are picked at random.


- Determine the variables $n, N$ and $M$.

- What is the probability of picking 4 vowels? 


:::


:::solution



- The size of the chosen sample is $n=7$.The total number of tiles is $N=44+56=100$. The group of interest is the vowels, so $M=44$.

- The probability of picking 4 vowels is $P(X=4) = \frac{\binom{44}{4} \binom{56}{3}}{\binom{100}{7}} \approx 0.22$.


:::





:::exercise

Suppose a box contains 3 **red** balls and 3 **green** balls. Let $X$ = the number of red balls you get from taking 3 distinct balls from the box. Draw a bar chart of the probability distribution function. 

(Note: this is almost identical to the example in the slide, except the number of red balls is increased from 2 to 3, and the number of taken balls is also increased from 2 to 3.)

:::
