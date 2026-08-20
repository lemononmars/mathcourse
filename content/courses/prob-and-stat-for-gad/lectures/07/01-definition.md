---
week: 7
order: 1
slug: "definition"
title: "Definition"
source: "tex/lecture07.tex"
---

## Recap


:::definition

A random variable, often denoted $X$, is a function of the sample space.

:::


Let $Y$ be the sum of two dice rolls. The sample space is $S = \{2,3,4,5,6,7,8,9,10,11,12\}$.


| $x$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $ P(Y=x)$ | $\frac{1}{36}$ | $\frac{2}{36}$ | $\frac{3}{36}$ | $\frac{4}{36}$ | $\frac{5}{36}$ | $\frac{6}{36}$ | $\frac{5}{36}$ | $\frac{4}{36}$ | $\frac{3}{36}$ | $\frac{2}{36}$ | $\frac{1}{36}$ |






## An Example

Suppose you want to open a pack of collectible card games. 



- For simplification, each pack contains a single card (what a ripoff, but anyway....). 

- Each card is either **common** or **legendary**. 

- The odds of getting a **legendary** card is $5\%$ and the odds of getting a **common** card is $95\%$ .



:::figure l11i01
:::






## Questions

These are several questions you want to ask:


- How many **legendary** cards would I get on average if I open 10 packs?

- If I want to keep buying packs until I get a **legendary** card, how many packs would I need to buy on average? (i.e. how screwed am I?)

- If I know that a carton of 100 packs has exactly 5 packs with a **legendary** card, how many **legendary** cards would I get if I take 20 packs? 

- If I know that each carton of 100 packs has various numbers of legendary cards, with the average of 6 cards, how many **legendary** cards would I get if I buy 10 cartons?

We will find out in this lecture!




## But Why?



- If you recognize that your experiment is one of these basic experiments, then you can get all the formulas without having to derive one.

- If not, then you can first try to simulate your experiment and see if the outcome looks similar to one of these basic experiments.

- If not, then you will be able to compare your experiments to these basic experiments and see if their tricks can be applied to yours.





## Probability Distribution Function


:::definition

A discrete **probability distribution function** (or PDF) is a function $P$ of random variable $X$ such that:


- Each probability is between zero and one, inclusive. In other words, $0 \leq P(x) \leq 1$ for all $x$ in the sample space.

- The sum of probabilities of all possible values is one. Mathematically writing, $\sum\limits_{x \in S} P(x) = 1$, where $S$ is the sample space (i.e. the set of all possible outcomes).


:::





:::example

Which function is a probability distribution function?

:::



| x | 1 | 2 | 3 |
| --- | --- | --- | --- |
| P(x) | 0.1 | 0.3 | 1.2 |





| x | 1 | 2 | 3 |
| --- | --- | --- | --- |
| P(x) | 0.1 | 0.3 | 0.5 |





| x | 1 | 2 | 3 |
| --- | --- | --- | --- |
| P(x) | 0.2 | 0.5 | 0.3 |






## Exercise

Solution


| x | 1 | 2 | 3 |
| --- | --- | --- | --- |
| P(x) | 0.1 | 0.3 | **1.2** |





| x | 1 | 2 | 3 |
| --- | --- | --- | --- |
| P(x) | 0.1 | 0.3 | 0.5 |


\[0.1 + 0.3 + 0.5 = 0.9 **\neq 1**\]



| x | 1 | 2 | 3 |
| --- | --- | --- | --- |
| P(x) | 0.2 | 0.5 | 0.3 |


\[0.2 + 0.5 + 0.3 = 1\]




## Representation of PDF as a bar chart

It is useful to represent a probability distribution function as a bar chart where


- The x-axis represents all outcomes.

- The y-axis represents the probability of that outcome.






| x | 0 | 1 | 2 |
| --- | --- | --- | --- |
| P(x) | \frac{1}{4} | \frac{2}{4} | \frac{1}{4} |







:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 4]
\draw[->] (0,0) -- (4,0) node [right] {$x$};
\draw[->] (0,0) -- (0,0.6) node [above] {$P(x)$};
\foreach \x / \y in {0/0.25,1/0.5,2/0.25} 
{
	\draw (\x+1, 0) -- (\x+1,-0.1) node [below] {$\x$};
	\filldraw[fill=blue!20] (\x+0.8, 0) rectangle (\x+1.2, \y);
}
\foreach \x in {0,0.25,0.5}
{
	\draw (-0.1, \x) -- (0, \x) node [left] {$\x$};
}
\node at (2,-1) {Number of heads};
\node[rotate = 90] at (-1, 0.25) {Probability};
\end{tikzpicture}
:::









## Uniform Distribution

The most basic distribution is a uniform distribution function.

:::definition

A **uniform distribution** is a probability distribution function $P$ such that 


- The number of possible outcomes (the sample space $S$) is finite.

- All outcomes are equally likely. In particular, for any outcome $k \in S$, we have $P(X=k) = \frac{1}{n}$ where $n$ is the number of outcomes.


:::







:::tikz TikZ diagram
\begin{tikzpicture}
	\draw[->] (0,0) -- (6,0) node [right] {$x$};
	\draw[->] (0,0) -- (0,2.5) node [above] {$P(x)$};
	\foreach \x in {1,2,3,4,5}
	{
		\draw (\x+1, 0) -- (\x+1,-0.1) node [below] {$\x$};
		\filldraw[fill=blue!20] (\x+0.8, 0) rectangle (\x+1.2, 1);
	}
	\draw (0.1, 2) --++ (-0.2, 0) node [left] {$\frac{1}{5}$};
	\node at (2.5,-1) {Outcomes};
	\node[rotate = 90] at (-1, 1) {Probability};
	\end{tikzpicture}
:::


*{The bar graph of a uniform distribution function*}





:::exercise

Let $Y$ be the sum of two dice rolls. Draw the bar chart for the probability distribution function $P(Y)$.



| $k$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $ P(k)$ | $\frac{1}{36}$ | $\frac{2}{36}$ | $\frac{3}{36}$ | $\frac{4}{36}$ | $\frac{5}{36}$ | $\frac{6}{36}$ | $\frac{5}{36}$ | $\frac{4}{36}$ | $\frac{3}{36}$ | $\frac{2}{36}$ | $\frac{1}{36}$ |



:::
