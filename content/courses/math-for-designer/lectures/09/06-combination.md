---
week: 9
order: 6
slug: "combination"
title: "Combination"
source: "tex/lecture09.tex"
---

## 3. Combination


:::definition

**Combinations** are the possible selections of $r$ items from a group of $n$ items *regardless of the order* of selection. To put it in another way, they are the possible sets of $n$ items. 

:::



:::tikz TikZ diagram
\begin{tikzpicture}[scale =0.8]
 \shade[ball color=red] (-0.7,0) circle (0.4cm) node [white] {1};
 \shade[ball color=blue] (0,0.7) circle (0.4cm) node [white] {2};
 \shade[ball color=green] (0.7,0) circle (0.4cm) node [white] {3};
 \draw [thick, ->] (0,-0.5) -- (-3,-1.5);
 \shade[ball color=red] (-3.5,-1.8) circle (0.4cm) node [white] {1};
 \shade[ball color=blue] (-2.5,-2) circle (0.4cm) node [white] {2};
  \draw [thick, ->] (0,-0.5) -- (0,-1.5);
 \shade[ball color=red] (-0.5,-2) circle (0.4cm) node [white] {1};
 \shade[ball color=green] (0.5,-1.8) circle (0.4cm) node [white] {3};
   \draw [thick, ->] (0,-0.5) -- (3,-1.5);
    \shade[ball color=blue] (2.5,-2) circle (0.4cm) node [white] {2};
 \shade[ball color=green] (3.5,-1.8) circle (0.4cm) node [white] {3};
\end{tikzpicture}
:::


*A combination of 2 objects from 3 distinct objects.*






:::example

How many combinations of 2 letters are there of letters $ABC$?

:::


:::solution

The combinations are 
\[\{\text{A,B}\} \qquad \{\text{B, C}\} \qquad \{\text{A, C}\}.\]
Hence, there are 3 combinations of 2 letters.

:::






:::example

How many combinations are there of 3 letters from ABCDE?

:::


:::solution

The combinations are



| \{\text{A,B,C}\} | \{\text{A,B,D}\} | \{\text{A,B,E}\} | \{ \text{A,C,D} \} | \{ \text{A,C,E} \} |
| --- | --- | --- | --- | --- |
| \{\text{A,D,E}\} | \{\text{B,C,D}\} | \{\text{B,C,E}\} | \{\text{B,D,E}\} | \{\text{C,D,E}\} |


Hence, there are 10 combinations.

:::





:::theorem

The number of combinations is denoted by
\[ C(n,r) = \frac{n!}{r! (n-r)!}.\]
As this notation is very frequently used, we slightly abbreviate $C(n,r) = { n \choose r}$.

:::






:::example

How many different flush hands are there in the standard 5-card poker?

:::


:::solution

We first choose which suit $\clubsuit, \vardiamondsuit, \spadesuit, \varheartsuit$ to form, in which there are 4 ways. Then, we choose 5 out of 13 possible values, in which there are $\binom{13}{5} = \frac{13 \times 12 \times 11 \times 10 \times 9}{5 \times 4 \times 3 \times 2 \times 1} = 1287$ ways. Since choosing a suit and choosing card values are two arrangements, we use the rule of product to get
\[ \binom{13}{5} \times 4 = 5148\]

:::





## Properties


:::property



- $\binom{n}{0} = \binom{n}{n} = 1$. 
:::slide
This explains that there is only one way to choose nothing. There is also only one way to choose everything.
:::


- $\binom{n}{1} = n$. 
:::slide
A combination of 1 object is the same as selecting 1 object.
:::



:::







## Properties


:::property



- $\binom{n}{k} = \binom{n}{n-k}$. 
:::slide
This can be proved numerically 
\[ \binom{n}{k} = \frac{n!}{k! (n-k)!} = \frac{n!}{(n-k)! (n- (n-k))!} = \binom{n}{n-k}.\]
or, better yet, combinatorially. If there are $n$ distinct objects, then the number of ways to choose $k$ objects is the same as the number of ways to discard $n-k$ objects.
:::



:::





:::property

\setcounter{enumi}{2}

- $P(n,r) = C(n,r) \times r!$. 
:::slide
This says that you can get a permutation by first getting a combination, and then order those $r$ objects. This proves the formula
\[ C(n,r) = \frac{P(n,r)}{r!} = \frac{n!/(n-r)!}{r!} = \frac{n!}{(n-r)!r!}. \] 
:::



:::
