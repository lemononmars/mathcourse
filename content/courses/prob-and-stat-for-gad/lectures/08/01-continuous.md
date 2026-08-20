---
week: 8
order: 1
slug: "continuous"
title: "Continuous"
source: "tex/lecture08.tex"
---

## Recall

A **discrete probability distribution** is a distribution where the sample space can be listed explicitly (possibly of infinite size).


:::figure l11i06
:::


What if it can't be listed? 




## Measurement


:::figure l05i02 — Examples of measurement
:::





## Test Your Statistical Intuition




:::figure l12dart — phew phew
:::




:::tikz TikZ diagram
\begin{tikzpicture}[scale = 2]
\filldraw[draw = black, fill = red] (0,-1) arc[start angle = -90, end angle = 90, radius = 1] -- cycle;
\filldraw[draw = black, fill = green] (0,0) -- (0,1) arc[start angle = 90, end angle = 210, radius = 1] -- cycle;
\filldraw[draw = black, fill = blue] (0,0) -- (210:1) arc[start angle = 210, end angle = 270, radius = 1] -- cycle;
\node[] at (0:0.5) {$180^\circ$};
\node[] at (150:0.5) {$120^\circ$};
\node[white] at (240:0.5) {$60^\circ$};
\end{tikzpicture}
:::




Give an estimate for the following quantities


- the probability that the dart lands on the **red** segment.

- the probability that the dart lands on the **green** segment.

- the probability that the dart lands on the **blue** segment.





## Continuous Probability Distribution


:::slide

The answers are $\red{\frac{1}{2}}, \green{\frac{1}{3}}$ and $\blue{\frac{1}{6}}$. Intuitively, the larger the area is, the more likely that the dart will land on it.

:::


:::definition

A **continuous probability distribution** is a curve of a continuous function $f(x)$, where probability is represented by **area** under the curve.

:::





:::figure l12continuousexamples — Examples of continuous probability distribution
:::





## Characteristics


\setlength
- sep{40pt}

- The outcomes are measured, not counted.

- The entire area under the curve is equal to one.

- Probability is found for intervals, rather than for individual values.





## Representation of Probability


:::figure l12uniformexample
:::





## Representation of Probability


:::figure l12expoexample
:::





## Representation of Probability


:::figure l12normalexample
:::





## Notations


:::slide



- Since the random variable $X$ is a number on the $x$-axis, we will use $x$ instead.

- The probability that the random variable $x$ is in the interval between the values $c$ and $d$ is defined as

:::note

\[P(c<x<d)\]

:::


- $P(x=c) = 0$. The probability that $x$ takes on any single individual value is zero, as the single line $x=c$ has no area.

- For that reason, we have $P(c<x<d) = P(c \leq x \leq d)$ since it is impossible that $x = c$ or $x=d$. (By impossible, I mean $P(x = c \text{ or } x = d) = 0$.)


:::
