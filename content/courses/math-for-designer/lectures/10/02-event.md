---
week: 10
order: 2
slug: "event"
title: "Terminology for Events"
source: "tex/lecture10.tex"
---

## Or


:::note



- An outcome is in the event ``$A$ or $B$'' if the outcome is in the set $A \cup B$. In other words, it is in A or is in B or is in both A and B.


:::




:::tikz TikZ diagram
\begin{tikzpicture}[thick]
\draw (0,0) circle (15mm);
\draw (2,0) circle (15mm);
\node at (0,2) {$A$}; 
\node at (2,2) {$B$};
\node at (1,0) {$A \cup B$};
\fill[green, fill opacity = 0.3] (2,0)  circle (15mm) (0,0)  circle (15mm);
\end{tikzpicture}
:::


*Venn diagram for $A$ or $B$*





## And


:::note



- An outcome is in the event ``$A$ and $B$'' if the outcome is in the set $A \cap B$. In other words, it is in A or is in B or is in both A and B.


:::




:::tikz TikZ diagram
\begin{tikzpicture}[thick]
\draw (0,0) circle (15mm);
\draw (2,0) circle (15mm);
\node at (0,2) {$A$}; 
\node at (2,2) {$B$};
\node at (1,0) {$A \cap B$};
  \clip (0, 0)  circle (15mm);
  \fill[green, fill opacity = 0.3] (2,0)  circle (15mm);
\end{tikzpicture}
:::


*Venn diagram for $A$ and $B$*






:::example

Suppose we roll one fair dice. 


- Find the probability of getting an odd number **or** a number higher than 3.

- Find the probability of getting an odd number **and** a number higher than 3.


:::


:::figure dice_monster — Cute...?
:::






:::solution

Let $A$ = get an odd number, and $B$ = get a number higher than 3. We can express them as sets
\[A = \{1,3,5\} \qquad B = \{4,5,6\}.\]
This gives us the following Venn diagram.



:::tikz TikZ diagram
\begin{tikzpicture}[thick, scale=0.5]
\node at (-2.5,3.5) {$U$};
\filldraw[fill = blue, fill opacity = 0.1] (-3,-3) rectangle (5.5,3);
\node at (0,2.5) {$A$};
\node at (2.5,2.5) {$B$};
  \filldraw[fill=red, fill opacity = 0.3]  (0,0)    circle (20mm);
  \filldraw[fill=green, fill opacity = 0.3] (2.5,0)  circle (20mm);
  \node at (1.25,0) {5};
  \node at (-0.5, 0.75) {1};
  \node at (-0.5, -0.75) {3};
  \node at (3, 0.75) {4};
  \node at (3, -0.75) {6};
  \node at (1.25, -2.5) {2};
\end{tikzpicture}
:::


*Venn diagram for $A$ and $B$*


:::





:::solution

In terms of sets, we have
\[A \cup B = \{1,3,4,5,6\} \text{ and } A \cap B = \{5\}\]


- This is equivalent to $P(A \text{or} B)$, so we have $P(A \cup B) = \frac{|A \cup B|}{|S|} = \frac{5}{6}$.

- This is equivalent to $P(A \text{ and }B)$, so we have $P(A \cap B) = \frac{|A \cap B|}{|S|} = \frac{1}{6}$. Likewise, we can deduce that the only outcome that is odd and higher than 3 is 5, so we immediately get the probability of $\frac{1}{6}$.


:::





## Mutually Exclusive


:::note



- If $A \cap B = \{\}$, we say that $A$ and $B$ are **mutually exclusive**.


:::




:::tikz TikZ diagram
\begin{tikzpicture}[thick, scale=0.5]
\node at (-2.5,3.5) {$U$};
\filldraw[fill = blue, fill opacity = 0.1] (-3,-3) rectangle (7,3);
\node at (0,2.5) {$A$};
\node at (4.5,2.5) {$B$};
  \filldraw[fill=red, fill opacity = 0.3]  (0,0)    circle (20mm);
  \filldraw[fill=green, fill opacity = 0.3] (4.5,0)  circle (20mm);
  \end{tikzpicture}
:::


*$A$ are $B$ mutually exclusive.*






:::example

Suppose we roll two fair dice. Find all pairs of events below that are mutually exclusive.


- $A$ = the sum of both dice is 8

- $B$ = both dice have the same value

- $C$ = first dice is 1

- $D$ = the difference of both dice is 3


:::


:::figure two_dice — Two Dice
:::





:::solution

We see that


- $A$ and $D$ are mutually exclusive. You can tell without listing all the elements because if both dice have the same value, then the different must be 0, not 3. 

- On the other hand, $A \cap B = \{11\}$ and $A \cap C = \{44\}$, so neither pair $A$ and $B$, or $A$ and $C$ are mutually exclusive.

- $B$ and $C$ are mutually exclusive. If the first dice is 1 and the sum is 8, then the other dice would need to be 7.

- $C$ and $D$ are mutually exclusive. Again, we can see algebraically that if the sum is 8, then both numbers are even or odd, so the difference will always be even.



:::




Alternatively, we can express the events as sets and use Venn diagram.
\begin{eq*}
A &=& \{26, 35, 44, 53, 62\} 

B &=& \{11, 22, 33, 44, 55, 66\} 

C &=& \{11, 12, 13, 14, 15 ,16\} 

D &=& \{14, 25, 36, 41, 52, 63\}
\end{eq*}



:::tikz TikZ diagram
\begin{tikzpicture}[thick, scale=0.5]
\node at (3.5,3.5) {$U$};
\filldraw[fill = blue, fill opacity = 0.1] (-3,-3) rectangle (10,3);
\node at (0,2.5) {$A$};
\node at (2.5,2.5) {$B$};
\node at (5,2.5) {$C$};
\node at (7.5,2.5) {$D$};
  \filldraw[fill=red, fill opacity = 0.3]  (0,0)    circle (20mm);
  \filldraw[fill=green, fill opacity = 0.3] (2.5,0)  circle (20mm);
  \filldraw[fill=orange, fill opacity = 0.3] (5,0)  circle (20mm);
  \filldraw[fill=purple, fill opacity = 0.3] (7.5,0)  circle (20mm);
\node at (1.25,0) {44};
\node at (3.75,0) {11};
\node at (6.25,0) {14};
\node at (-0.6,1.5) {26};
\node at (-0.6,0.5) {35};
\node at (-0.6,-0.5) {53};
\node at (-0.6,-1.5) {62};
\node at (2.5,1.5) {22};
\node at (2.5,0) {33};
\node at (2.5,-1.5) {55};
\node at (5,1.5) {12};
\node at (5,0.5) {13};
\node at (5,-0.5) {15};
\node at (5,-1.5) {16};
\node at (8,1.6) {25};
\node at (8,0.8) {36};
\node at (8,0) {41};
\node at (8,-0.8) {52};
\node at (8,-1.6) {63};
\node at (3.5, -2.5) {$21, 23, 24, \ldots, 65$};
\end{tikzpicture}
:::


*Venn diagram for $A,B,C$ and $D$*
