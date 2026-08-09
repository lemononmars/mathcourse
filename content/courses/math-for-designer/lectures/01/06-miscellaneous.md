---
week: 1
order: 6
slug: "miscellaneous"
title: "Miscellaneous"
source: "tex/lecture01.tex"
---

## Other area of mathematics



- Conditions 

- Programming 

- Combinatorics 

- Statistics 

- Pretty much everything





## Setception


:::figure nested_sets — Set in a set in a set in a set in a $\ldots$
:::

\[A = \{ \, \{ \, \{ \, \{ 1 \} \, \} \, \} \, \}\]




## Counting it Right

A set that is nested inside another set is considered a single element. 

:::note

Let $A = \{1, \{2\}, \{a,b,c\}\}$. Then


- There are 3 elements in $A$, namely the number $1$, the set $\{2\}$, and the set $\{a,b,c\}$.

- $1 \in A$

- $2 \not\in A$ but $\{2\} \in A$

- $\{\{2\}\} \subseteq A$ since all elements in the set $\{\{2\}\}$ (namely $\{2\}$) are in the set $A$.


:::





## Power Set


:::definition

A power set of a set $A$, denotes $P(A)$, is the set of all subsets of $A$.

:::


:::figure power_set — A power set of a set with 3 elements.
:::



\newcommand{\bt}{\bigtriangleup}
\newcommand{\bc}{\bigcirc}



## Example of Power Sets


:::example

Find a power set of the following sets.
\[A = \{1\}, \quad B = \{\alpha, \beta\}, \quad C = \{\star, \bt, \bc\}, D = \{\}\]

:::


:::solution



- $P(A) = \{ \emptyset, \{1\}\}$

- $P(B) = \{ \emptyset, \{\alpha\}, \{\beta\}, \{\alpha, \beta\}\}$

- $P(C) = \{ \emptyset, \{\star\}, \{\bt\}, \{\bc\}, \{\star, \bt\}, \{\star, \bc\}, \{\bt, \bc\}, \{\star, \bt, \bc\}\}$

- $P(D) = \{ \emptyset\}$


:::




## Game Application: Crafting \& Power Sets


:::note Item Crafting Combinations

Let available crafting ingredients $I = \{\text{Herb}, \text{Mushroom}, \text{Crystal}\}$.

:::

The power set $P(I)$ yields all $2^3 = 8$ possible ingredient combinations:
\begin{align*}
P(I) = \{ & \emptyset \text{ (No item)}, \{\text{Herb}\}, \{\text{Mushroom}\}, \{\text{Crystal}\}, 

& \{\text{Herb}, \text{Mushroom}\}, \{\text{Herb}, \text{Crystal}\}, \{\text{Mushroom}, \text{Crystal}\}, 

& \{\text{Herb}, \text{Mushroom}, \text{Crystal}\} \}
\end{align*}

**Game Design Takeaway:** Each subset in $P(I)$ maps to a unique crafted item (e.g., Potion, Elixir, Bomb, or Failed Sludge for $\emptyset$).




## Board Games!


:::figure card_game_set — \href{https://setwithfriends.com/
:::
}




## Game Mechanic: Set Collection


:::figure board_game_set_pizza_master — An example of a set collection game: Pizza Master
:::
