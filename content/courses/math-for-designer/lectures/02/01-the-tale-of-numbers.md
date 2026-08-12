---
week: 2
order: 1
slug: "the-tale-of-numbers"
title: "The Tale of Numbers"
source: "tex/lecture02.tex"
---

## Sets of Numbers

Sets of numbers 

:::note The set of natural numbers

$\mathbb{N} = \{1,2,3,4,5,\ldots\} $ (aka. counting numbers)

:::


:::note The set of integers

$\mathbb{Z} = \{\ldots, -3,-2,-1,0,1,2,3,\ldots \}$ (includes negative numbers and zero)

:::


:::note The set of rational numbers

$\mathbb{Q} = \left\{ \frac{a}{b} \, | \, a,b \in \mathbb{Z} \text{ and } b \neq 0 \right\}$

:::

\[ \mathbb{N} \subseteq \mathbb{Z} \subseteq \mathbb{Q}\]

:::tikz A diagram for natural numbers, integers, and rational numbers
\begin{tikzpicture}[scale = 0.8, every node/.style = {scale = 2}]
\filldraw[fill = teal!20, draw = black] (0,0) circle (4cm);
\filldraw[fill = blue!20, draw = black] (-1,0) circle (2.5cm);
\filldraw[fill = red!20, draw = black] (-1.5,0) circle (1.5cm);
\node[teal] at (4.5,0) {$\mathbb{Q}$};
\node[blue] at (2,0) {$\mathbb{Z}$};
\node[red] at (0.5,0) {$\mathbb{N}$};
\node at (-1.5,0) {$3$};
\node at (0.5,1) {$-5$};
\node at (0,-1.5) {$0$};
\node at (2,2) {$\frac{1}{3}$};
\node at (2.5,-1.5) {$-1.2$};
\end{tikzpicture}
:::

## What is out there?


:::note The set of irrational numbers

$\tilde{\mathbb{Q}}$ (not expressible as a fraction / non-repeating decimals) 

:::


:::note The set of real numbers

$\mathbb{R} = \mathbb{Q} \cup \tilde{\mathbb{Q}}$ 
(Numbers that can be represented as decimals) 

:::

\[ \mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}\]




## What is in $\tilde{\mathbb{Q}}$?
Short answer: pretty much everything. 

Long answer: 

:::note

Algebraic numbers (roots of polynomials) 

\[ \sqrt{2}, \sqrt[3]{1.34}, \frac{1 - \sqrt{5}}{2} \]

Computable numbers 

$$e, \pi$$

:::


:::figureimg /graphics/non_computer_number_simba_meme.jpg | Shadowy dark place, indeed
:::



## The Set of Complex Numbers


:::note The set of complex numbers

\[\mathbb{C} = \{ a+bi\, |\, a,b \in \mathbb{R} \}\]
where $i = \sqrt{-1}$.

:::

More? 

No! That's all the numbers! 




## ALL THE NUMBERS


:::youtube 5TkIe60y2GI | All the Numbers — Numberphile
:::




## Famous Numbers



- Fibonacci number $F_n = F_{n-1} + F_{n-2}$ 



:::figureimg /graphics/l03i01.png | Fibonacci numbers
:::



- Triangular numbers $T_n = 1 + 2 + \cdots + n = \frac{n(n+1)}{2}$ 



:::figureimg /graphics/l03i02.png | Triangular numbers
:::


:::figureimg /graphics/l03i03.png | Triangular numbers
:::


:::exercise

Draw the Venn diagram for $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$ and put the following numbers in the appropriate section.
\[ -1, \sqrt{2}, 42, \pi, 0.8, \frac{1}{\pi}, 0.9999\ldots, \sqrt{0.25}\]

:::
