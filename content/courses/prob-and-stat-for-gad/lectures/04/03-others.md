---
week: 4
order: 3
slug: "others"
title: "Other Useful Combinatorial Properties"
source: "tex/lecture04.tex"
---

## Inclusion-Exclusion Principle

The rule of sum applies only when all arrangements are exclusive (they can't happen at the same time). If they are not exclusive, we use the following fact in set to deal with **double counting**

:::theorem

Let $A$ and $B$ be finite sets. Then, we have
\begin{equation} 
|A \cup B| = |A| + |B| - |A \cap B|
\end{equation}

:::








:::tikz TikZ diagram
\begin{tikzpicture}[thick, scale = 0.8]
\useasboundingbox (-6,-4) rectangle (6,4);
  \filldraw[fill=red, fill opacity = 0.3]  (-1,2)    circle (15mm);
  \filldraw[fill=green, fill opacity = 0.3] (1,2)  circle (15mm);
   \node[scale=3] at (0,0) {=};
  \filldraw[fill=red, fill opacity = 0.3]  (-4,-2)    circle (15mm);
  \node[scale=3] at (-2,-2) {+};
  \filldraw[fill=green, fill opacity = 0.3] (0,-2)  circle (15mm);
  \node[scale=3] at (2, -2) {-};
  \clip (4,-2)  circle (15mm);
  \filldraw[fill=red, fill opacity = 0.3] (2,-2)  circle (15mm);
  \clip (2,-2)  circle (15mm);
  \filldraw[fill=green, fill opacity = 0.3] (4,-2)  circle (15mm);
\end{tikzpicture}
:::


*Venn diagram for inclusion-exclusion principle*






:::example

How many integers between 1 and 100 are divisible by 5 or 7?

:::


:::solution

Let $A$ be the set of integers between 1 and 100 that are divisible by 5, and $B$ be the set of integers between 1 and 100 that are divisible by 7. We can express the set explicitly as
\[ A = \{5, 10, 15, \ldots, 100\}, \qquad B = \{7, 14, 21, \ldots, 98\}\]
with $|A| = 20$ and $|B| = 14$. If an integer is divisible by both 5 and 7, then it is divisible by 35. So, we have $A \cap B = \{35, 70\}$. Hence, the number of integers between 1 and 100 that are divisible by 5 or 7 is
\[|A \cup B| = |A| + |B| - |A \cap B| = 20 + 14 - 2 = 36\]

:::





:::example

How many ways to select 4 colors from the rainbow colors so that green or red is selected (or both).

:::


:::solution

Since there is no order, it is a combination. Let $G$ be the set of all combinations that includes green, and $R$ be the set of combinations that includes red.

If green is included, we need to choose 3 other colors, so there are $C(6,3) = 20$ combinations. The same formula works for $R$ as well. 

If we choose both green and red, we then have to choose 2 other colors, so there are $C(5,2) = 10$ combinations.

Thus, by inclusion-exclusion principle, the number of combinations with either green or red is 

\[ |G \cup R| = |G| + |R| - |G \cap R| = 20+20-10=30\]

:::





## Proof of Multinomial formula (1/2)

Suppose that there are $n$ objects and two groups with $n_1$ objects in the first group and $n_2$ objects in the second group. We can complete each group in order and use the rule of product.


- The number of ways to form the first group is $\binom{n}{n_1} = \frac{n!}{(n-n_1)!n_1!}$ 

- Since there are $n-n_1$ objects left, the number of ways to form the second group becomes $\binom{n-n_1}{n_2} = \frac{(n-n_1)!}{(n-n_1-n_2)!n_2!} = \frac{(n-n_1)!}{n_2!}$ ($n-n_1-n_2 = 0$)




## Proof of Multinomial formula (2/2)

By rule of product, the number of ways to form both groups is 
\[ \binom{n}{n_1} \times \binom{n-n1}{n_2} = \frac{n!}{(n-n_1)!n_1!}\frac{(n-n_1)!}{n_2!} = \frac{n!}{n_1!n_2!} \]
This can be generalized to any number of groups, hence the formula.




:::example

How many ways are there to split 12 people into three groups of equal size?

:::


:::solution

Since we want to split 12 people into groups of size 4,4 and 4, then the number of ways to do so is
\[ \binom{9}{3;3;3} = \frac{12!}{4! \times 4! \times 4!} = 1680\]

:::





## Stars and Bars

How many ways to buy 12 bagels with 4 different kinds? You can buy any number of bagles of each kind, including none.

:::figure stars_and_bars — \href{https://www.youtube.com/watch?v=UTCScjoPymA
:::
}





:::example

How many ways are there to choose 4 donuts from 3 different flavors?

:::


:::solution

Let $v$ be vanilla, $c$ be chocolate, and $s$ be strawberry. The possible combinations are:

\tikzset{v/.style={ball color = yellow!40}}
\tikzset{c/.style={ball color = brown}}
\tikzset{s/.style={ball color = pink!90}}

:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.8]
\foreach \x/\y/\z [count = \p] in {v/v/v, v/v/c, v/v/s, v/c/c, v/c/s, v/s/s, c/c/c, c/c/s, c/s/s, s/s/s}
{
\shade[\x] ({1.5*\p}, 0) circle (0.5cm) node {\x};
\shade[\y] ({1.5*\p}, -1) circle (0.5cm) node {\y};
\shade[\z] ({1.5*\p}, -2) circle (0.5cm) node {\z};
}
\end{tikzpicture}
:::




:::





## Stars and Bars


:::theorem

The number of ways to choose $k$ objects from $n$ different types, where each type is equal to
\[ \binom{n+k-1}{k} \]

:::




| Plain | Poppy | Sesame | Onion |
| --- | --- | --- | --- |
| 3 | 0 | 5 | 4 |


$\downarrow$

\[ * * * | | * * * * * | * * * *\]






:::example

How many ways are there to choose 4 donuts from 3 different flavors?

:::


:::solution

We can immediately apply the formula to get $\binom{4+3-1}{4} = \binom{6}{4} = 15$. These are all possible selections.


| AAAA | AAAB | AAAC | AABB | AABC |
| --- | --- | --- | --- | --- |
| AACC | ABBB | ABBC | ABCC | ACCC |
| BBBB | BBBC | BBCC | BCCC | CCCC |



:::





## Pigeonhole Principle


:::figure pigeonhole — \href{https://medium.com/cantors-paradise/the-pigeonhole-principle-e4c637940619
:::
}




## Pigeonhole Principle


:::theorem

If more than $n$ objects are placed into $n$ boxes, then at least one box must contain more than one object.

:::



:::theorem General

For any positive integers $n$ and $t$, if $tn+1$ or more objects are placed in $n$ boxes, then at least one box will contain more than $t$ objects.

:::
