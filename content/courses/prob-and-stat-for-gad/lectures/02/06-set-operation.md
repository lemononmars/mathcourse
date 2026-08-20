---
week: 2
order: 6
slug: "set-operation"
title: "Set Operation"
source: "tex/lecture02.tex"
---

## Set Operations: Union


:::definition

$A \cup B$ ($A$ unions $B$) is the set of elements that are in either $A$ or $B$ (or both). ($\cup$ is the symbol for **U**nion.)

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


*Venn diagram for the union of $A$ and $B$*





## Set Operations: Intersection


:::definition

$A \cap B$ ($A$ intersects $B$) is the set of elements that are in both $A$ and $B$. ($\cap$ implies the opposite of $\cup$.)

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


*Venn diagram for the intersection of $A$ and $B$*





:::figure venn_diagram_cecilia — \href{https://www.youtube.com/watch?v=p0quM2txQwg
:::
}





## Set Operations: Minus


:::definition

$A \setminus B$ or $A-B$ ($A$ minus $B$) is the set of elements that are in $A$ but not in $B$.

:::




:::tikz TikZ diagram
\begin{tikzpicture}[thick]
\draw (0,0) circle (15mm);
\draw (2,0) circle (15mm);
\node at (0,2) {$A$}; 
\node at (2,2) {$B$};
\node at (-0.5,0) {$A \setminus B$};
\fill[green, opacity = 0.3] (0,0) circle (15mm);
\fill[white, opacity = 1] (2,0)  circle (15mm);
\draw (0,0)  circle (15mm);
\end{tikzpicture}
:::


*Venn diagram for $A \setminus B$*






:::example

Let $A = \{1,2,4\}$ and $B = \{2,3,5\}$. Find


- $A \cap B$

- $A \cup B$

- $A \setminus B$

- $B \setminus A$


:::


:::solution



- $A \cap B = \{2\}$ because $2$ is the only element in both $A$ and $B$. 

- $A \cup B = \{1,2,3,4,5\}$. Note that we do not include the extra 2 as we only care about the existence, not quantity. 

- $A \setminus B = \{1,4\}$.

- $B \setminus A = \{3,5\}$.




:::tikz TikZ diagram
\begin{tikzpicture}[thick, scale=0.5]
\node at (0,2.8) {$A$};
\node at (2.5,2.8) {$B$};
  \filldraw[fill=red, fill opacity = 0.3]  (0,0)    circle (20mm);
  \filldraw[fill=green, fill opacity = 0.3] (2.5,0)  circle (20mm);
  \node at (1.25,0) {2};
  \node at (-0.5, 0.75) {1};
  \node at (-0.5, -0.75) {4};
  \node at (2.5, 0.75) {3};
  \node at (2.5, -0.75) {5};
\end{tikzpicture}
:::




:::







:::example

Consider all single-digits $0,1,2,3,4,5,6,7,8,9$. Let $A$ be the set of single-digits with a hole, and $B$ be single-digits that have reflection symmetry (look the same in the mirror). Find
\[A \cap B, \quad A \cup B, \quad A \setminus B, \quad B \setminus A\]

:::


:::solution

First we need to write out the elements of $A$ and $B$
\[ A = \{0,4,6,8,9\}, \quad B = \{0,3,8\} \]


- $A \cap B = \{0,8\}$ 

- $A \cup B = \{0,3,4,6,8,9\}$ 

- $A \setminus B = \{4,6,9\}$.

- $B \setminus A = \{3\}$.


:::





## Universe and Complement


:::definition



- A **universe** is the set $U$ that we consider to be ``everything''. 

- $A^\mathsf{c}$ or $A'$ (a complement of $A$) is everything else that is not in $A$ but is in $U$. In other words, $A^\mathsf{c} = U \setminus A$.


:::





:::tikz TikZ diagram
\begin{tikzpicture}[thick, scale=0.8]
\filldraw[fill = blue, fill opacity = 0.3] (0,0) rectangle (4,3);
\filldraw[fill = green, fill opacity = 0.3] (2,1.5) circle (13mm);
\node at (2,1.5) {$A$}; 
\node at (3.5,2.5) {$A^{c}$};
\node at (0.2, 3.2) {$U$};
\end{tikzpicture}
:::


*Venn diagram for $A$ and $A^{c*$}







:::example

Let $A = \{1,2,3\}$. Find $A^\mathsf{c}$ for each given universes.


- $U = \{1,2,3,4,5\}$

- $U = \{1,2,3,8,9,10\}$

- $U = \{1,2,3\}$


:::


:::solution



- if we set $U = \{1,2,3,4,5\}$, then we have $A^\mathsf{c} = \{4,5\}$. 

- if we set $U = \{1,2,3,8,9, 10\}$, then we have $A^\mathsf{c} = \{8,9,10\}$. 

- if we set $U = \{1,2,3\}$, then we have $A^\mathsf{c} = \{\}$. This tells us that there is nothing else outside the set $A$.


:::





:::exercise

Let the universe be $U = \{1,2,3,\ldots,12\}$. Let 


- $A_2$ be the set of numbers divisible by 2.

- $A_3$ be the set of numbers divisible by 3.

- $A_6$ be the set of numbers divisible by 6.



- Find $A_2 \cup A_3$. Explain what it means for an element to be in $A_2 \cup A_3$ using their definitions.

- Find $A_2 \setminus A_3$. Explain what it means for an element to be in $A_2 \setminus A_3$ using their definitions.

- Find $(A_2)^{\mathsf{c}}$. Explain what the set is in words.

- Show that $A_2 \cap A_3 = A_6$. Explain why this is true.


:::
