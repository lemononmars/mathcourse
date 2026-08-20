---
week: 4
order: 1
slug: "restriction"
title: "Restriction"
source: "tex/lecture04.tex"
---

## Counting with restriction

We have the rule of sum, rule of product, permutation, and combination as the building blocks of counting principles. Nevertheless, they are too *simple* for real world problems with some extra restrictions and requirements. For instance, you might ask:

:::remark



- How many lottery tickets are there that has no 8?

- How many ways can we form a team of 5 adventures such that no two members have the same class?

- How many ways can we schedule 6 courses in a week such that Math and History class are on the same date?


:::

There is no definite answer on how to approach the problems. Here, we provide some commonly used techniques.





:::example

How many permutations are there of 5 people such that Tom and Jerry are adjacent to each other?

:::


:::solution

One way to count is to list all $P(5,5) = 120$ permutations and count how many of them have the restriction. 


Another way is to count in a clever way. Since Tom and Jerry are together, we can bundle them together. The number of permutations of three people, plus the pair, is now $P(4,4) = 4! = 24$. Then, there are 2 ways to arrange the pair - as either Tom+Jerry or Jerry+Tom. 
\[ A \quad C \quad \text{[Tom Jerry]} \quad B\]


Thus, the number of permutations, with the restriction that Tom and Jerry must be adjacent, is $24 \times 2 = 48$.

:::






:::example

How many permutations are there of 5 people such that Tom and Jerry are **not** adjacent to each other?

:::


:::solution

If Tom and Jerry are not adjacent, as there must be 1,2 or 3 people between them. We can use the rule of sum and consider each case separately.


Nevertheless, there is a better way to count. Since we know that there are $P(5,5) = 5! = 120$ permutations in total, and from the previous example $48$ of them have Tom and Jerry adjacent to each other, then all other permutations must have the property that Tom and Jerry are **not** adjacent. Hence, we can conclude that the number of such permutations is $120 - 48 = 72$.

:::






:::example

How many ways to choose 10 people to form a group of 5 people so that Jack and Rose are in the same group?

:::


:::solution

Since we need both of them, we first add them to the group. Out of 8 remaining people, we need to choose 3 to include in the group. Thus, the number of combinations is $C(8,3) = \frac{8!}{3!(8-3)!} = 56$

:::
