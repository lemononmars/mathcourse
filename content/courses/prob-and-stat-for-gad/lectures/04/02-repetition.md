---
week: 4
order: 2
slug: "repetition"
title: "Repetition"
source: "tex/lecture04.tex"
---

## Counting with Repetition is Cumbersome

So far, we have dealt with counting principles where all objects are different. When some object appears more than once, we can no longer blindly apply the formula. For instance
\begin{question}
How many permutations are there of the letters ``KKKKKKKKK''?
\end{question}

:::solution

No, it's not $P(9,9) = 9!$. The answer has to be 1, because no matter how you rearrange the letters, you get the same word.

:::






## การสับเปลี่ยนของที่ซ้ำกัน


:::example

Find the number of permutations of the word ``BEE''

:::


:::solution

The list is

BEE, \quad EBE, \quad EEB

We note that the answer is not $P(3,3) = 6$ because the letter $E$ is repeated. Choosing the first $E$ or the second $E$ is the same.

:::





## 



:::tikz TikZ diagram
\begin{tikzpicture}[
level 1/.style={sibling distance=14mm},
]
  \node[rectangle, draw] {B}
    child {node[rectangle, draw] {E}
    	child {node[rectangle, draw] {E}}
    }
;
   \node[rectangle, draw] at (2,0) {E}
    child {node[rectangle, draw] {B}
    	child {node[rectangle, draw] {E}}
    }
    child {node[rectangle, draw] {E}
    	child {node[rectangle, draw] {B}}
    }
;
\draw[dashed] (-0.5,-1) rectangle (0.5, -2);
\draw[dashed] (0.9,-1) rectangle (3.2, -2);
\node at (0.7, -1.5) {$\red{\neq}$};
\end{tikzpicture}
:::


*The tree diagram of permutations of the word ``BEE''*

We cannot use the rule of product because the number of ways in the second level is not the same.





:::example

How many permutations are there of the letters ``AAABBBB''?

:::


:::solution

The rule of product applies for the first three positions, but not the fourth and beyond. For instance, if the first three letters are ``AAA'', then there is only 1 way to select the letter in the fourth position (as we run out of As), but if they are ``ABB'', there are still two letters to choose from.


Nevertheless, this problem is actually a combination in disguise. Instead of choosing a number in each position, we assign a position to each number! First, we choose 3 positions from 1,2,3,4,5,6 and 7 to fill in three As, with $\binom{7}{3} = 35$ ways. Then, the rest will be automatically filled in with B, so there is only 1 way. Thus, the number of permutations is $35 \times 1 = 35$.

:::





## 3. Rule of Division

We can still use the formula, along with the third rule.

:::remark

*To count the number of cows in your field, first count the number of legs and then divide by four.*

:::


:::theorem The Rule of Division

Let $S$ be the number of arrangements. If there are exactly $k$ different arrangements that correspond to the same configuration, then the number of configurations is
\begin{equation}
\frac{S}{k}
\end{equation}

:::





:::example

How many permutations are there of the word ``MOON''?

:::


:::solution

First, we treat two O's as two distinct objects, says O$_1$ and O$_2$. Then, the number of permutations of the distinct letters M, O$_1$, O$_2$ and N is now $P(4,4) = 4! = 24$.

Because there are 2 ways to permute the O's, then of all those permutations with O$_1$ first and O$2$ second would become the same as those with O$_2$ first and O$_1$ second. For example

\[ \text{MO}_1\text{O}_2N \equiv \text{MO}_2\text{O}_1N \]
This implies that the number of permutations is now halved, giving us $\frac{24}{2} = 12$ permutations with repetition.

:::






## Formula for permutations of objects with repetition


:::theorem

Let $k$ be the number of groups of objects, where the first group has $n_1$ objects, the second group has $n_2$ objects, ..., and the $k$-th group has $n_k$ objects, with a total of $n$ objects (i.e., $n = n_1 + n_2 + \ldots + n_k$). 

Then the number of permutations of these $n$ objects is given by
\begin{equation}
\binom{n}{n_1; n_2; \ldots; n_k} = \frac{n!}{(n_1)!(n_2)!\cdots (n_k)!}
\end{equation}
This notation is called the multinomial coefficient.

:::






:::example

Find the number of permutations of the word ``MAMMAL''

:::


:::solution

We have 3 groups of repeated letters: M (3 times), A (2 times), and L (1 time). Using the formula, we get:
\[ \frac{6!}{3!2!1!} = \frac{720}{(6)(2)} = 60\]

:::






:::example

A canteen wants to rent out 10 food stalls arranged in a row. There will be 5 stalls for main dished, 3 stalls for snacks, and 2 stalls for drinks. If stalls of the same food type are considered identical, how many ways can the canteen arrange the stalls?

:::


:::solution

This problem is equivalent to arranging the letters from the set 

MMMMMSSSDD
where M denotes a stall for main dishes, S denotes a stall for snacks, and D denotes a stall for drinks. Since we are arranging objects with repetition, we can use the formula:
\[ \frac{10!}{5!3!2!} = 2520\]

:::





:::figure circular_permutation — \href{https://www.youtube.com/watch?v=OsJg8CeFUwY
:::
}





:::example

How many ways are there to arrange 4 people around a circle.

:::


:::solution

First, we treat each position as distinct (says, seats 1,2,3 and 4). This gives us the permutation $P(4,4) = 4! = 24$.

Now, we can rotate seat numbers from (1,2,3,4) to (2,3,4,1), (3,4,1,2) and (4,1,2,3). All these 4 different labels would look the same.



| A | - | B | \qquad | D | - | A | \qquad | C | - | D | \qquad | B | - | C |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| \| | | \| | \equiv | \| | | \| | \equiv | \| | | \| | \equiv | \| | | \| |
| D | - | C | \qquad | C | - | B | \qquad | B | - | A | \qquad | A | - | D |



Since each of these 4 arrangements are considered identical, by the rule of division the number of ways becomes $\frac{24}{4}$.

:::





## Circular permutation

We can easily generalize the previous example to the following theorem.

:::theorem

The number of arrangements of $n$ objects around a circle, where two arrangements are considered identical if one can be rotated to match the other, is $(n-1)!$.

:::
