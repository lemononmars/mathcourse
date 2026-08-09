---
week: 10
order: 3
slug: "conditional"
title: "Conditional Probability"
source: "tex/lecture10.tex"
---

## Conditional Probability



:::note



- The **conditional probability** of A given B is the probability that event A will occur given that the event B has already occurred


- A conditional **reduces** the sample space. For $P(A|B)$, we look at the sample space $B$, and see all outcomes that are also in $A$.


:::

Note: $A|B$ itself has no meaning as a set or a probability. We always see it as $P(A|B)$.


## Formula for Conditional Probability


:::definition

If $B$ is not an empty set, then we define
\begin{equation}
P(A|B) = \frac{P(A \cap B)}{P(B)}
\end{equation}

:::







## 




:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
\filldraw[fill=blue, fill opacity = 0.3, line width = 1mm, color = blue] (0,0) rectangle (6,4);
\filldraw[fill=red, fill opacity = 0.3]  (2,2)    circle (15mm);
\node at (2,3.8) {$A$};
\node at (3,4.5) {$S$};
\node at (3,-1) {$P(A) = \frac{|\red{A}|}{|\blue{S}|}$};
\begin{scope}[xshift=7cm]
\draw[thick] (0,0) rectangle (6,4);
\draw (2,2) circle (15mm);
\node at (3,4.5) {$S$};
\node at (2,3.8) {$A$};
\node at (4,3.8) {$B$};
\node at (3,-1) {$P(A|B) = \frac{|\red{A \cap B}|}{|\blue{B}|}$};
\filldraw[fill=blue, color = blue, line width = 1mm, fill opacity = 0.3] (4,2)  circle (15mm);
\clip (4,2) circle (15mm);
\filldraw[fill=red, fill opacity = 0.3]  (2,2) circle (15mm);
\end{scope}
\end{tikzpicture}
:::
*Comparing $P(A)$ to $P(A|B)$*






:::example

Suppose we roll one fair die. 


- Find the probability of getting an even number, **given** that it is higher than 2.

- Find the probability of getting a number higher than 2, **given** that it is even.


:::


:::figure dice_devil_head — Fair, sure....
:::





:::solution

Let $A$ = get an even number, and $B$ = get a number higher than 2. We can express them as sets
\[A = \{2,4,6\} \qquad B = \{3, 4,5,6\}\]
This gives us
\[ A \cap B = \{4,6\}\]


- This is equivalent to $P(A| B) = \frac{P(A \cap B)}{P(B)} = \frac{2/6}{4/6} = \frac{1}{2}$

- This is equivalent to $P(B|A) = \frac{P(B \cap A)}{P(A)} = \frac{2/6}{3/6} = \frac{2}{3}$

Notice that these two probabilities are different, so the order matters.

:::





## 




:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
\begin{scope}
\draw[thick] (0,0) rectangle (6,4);
\node at (3,4.5) {$S$};
\node at (2,3.8) {$A$};
\node at (4,3.8) {$B$};
\node at (3,0.5) {1};
\node at (2,2) {2};
\node at (3,2.5) {4};
\node at (3,1.5) {6};
\node at (4,2.5) {3};
\node at (4,1.5) {5};
\node at (3,-1) {$P(A|B) = \frac{|\red{A \cap B}|}{|\blue{B}|}$};
\draw (2,2) circle (15mm);
\filldraw[fill=blue, fill opacity = 0.3, line width = 1mm, color = blue] (4,2)  circle (15mm);
\clip (4,2) circle (15mm);
\filldraw[fill=red, fill opacity = 0.3]  (2,2) circle (15mm);
\end{scope}
\begin{scope}[xshift=7cm]
\draw[thick] (0,0) rectangle (6,4);
\node at (3,4.5) {$S$};
\node at (2,3.8) {$A$};
\node at (4,3.8) {$B$};
\node at (3,0.5) {1};
\node at (2,2) {2};
\node at (3,2.5) {4};
\node at (3,1.5) {6};
\node at (4,2.5) {3};
\node at (4,1.5) {5};
\node at (3,-1) {$P(B|A) = \frac{|\red{B \cap A}|}{|\blue{A}|}$};
\filldraw[fill=blue, fill opacity = 0.3, line width = 1mm, color = blue] (2,2)  circle (15mm);
\draw (4,2) circle (15mm);
\clip (2,2) circle (15mm);
\filldraw[fill=red, fill opacity = 0.3]  (4,2) circle (15mm);
\end{scope}
\end{tikzpicture}
:::
*Venn diagrams to compute $P(A|B)$ and $P(B|A)$*






:::example

A family has two kids, each is equally likely to be male or female. Suppose we know that one of them is male. Find the probability of the following events.


- $A_1$ = they are both female.

- $A_2$ = they are both male.


:::


:::figure two_children_paradox — Happy Family
:::






:::solution

Denote $F$ as female and $M$ as male. Then, we can express all possibilities as $S = \{MM, MF, FM, FF\}$. We also have 
\[A_1 = \{FF\} \quad \text{ and } \quad A_2 = \{MM\}.\]

\medskip
Let $B$ = one of the kids is male. Then, we can see that 
\[B = \{FM, MF, MM\}.\]


- It is clear from the sentence that they cannot both be female, as one of them is known to be male. Thus, we immediately conclude that $P(A_1|B) = 0$.

- Using the formula, we get $P(A_2 |B) = \frac{P(A_2 \cap B)}{P(B)} = \frac{1/4}{3/4} = \frac{1}{3}$


:::



\iffalse


:::exercise

Suppose we roll two fair dice, one after another.


- Find the probability that the sum is greater than 7, given that the first die is less than 3.

- Find the probability that the first die is less than 3, given that the sum is greater than 7.

- Find the probability that the sum is odd, given that the dice have the same value.


:::


\fi
