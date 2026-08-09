---
week: 1
order: 2
slug: "set-operation"
title: "Set Operation"
source: "tex/lecture01.tex"
---

## Set Operations: Intersection


:::definition

$A \cap B$ ($A$ intersects $B$) is the set of elements that are in both $A$ and $B$. 

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
*Venn diagram for $A$ intersects $B$*





:::figure venn_diagram_cecilia — \href{https://www.youtube.com/watch?v=p0quM2txQwg
:::
}




## Set Operations: Union


:::definition

$A \cup B$ ($A$ unions $B$) is the set of elements that are in either $A$ or $B$ (or both). 

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
*Venn diagram for $A$ unions $B$*






:::example

Let $A = \{1,2,4\}$ and $B = \{2,3,5\}$. Find
\[A \cap B, \quad A \cup B, \quad A \setminus B, \quad B \setminus A\]

:::


:::solution



- $A \cap B = \{2\}$ because $2$ is the only element in both $A$ and $B$. 

- $A \cup B = \{1,2,3,4,5\}$. Note that we do not include the extra 2 as we only care about the existence, not quantity. 

- $A \setminus B = \{1,4\}$.

- $B \setminus A = \{3,5\}$.





:::tikz TikZ diagram
\begin{tikzpicture}[thick, scale=0.5]
\node at (0,2.5) {$A$};
\node at (2.5,2.5) {$B$};
  \filldraw[fill=red, fill opacity = 0.3]  (0,0)    circle (20mm);
  \filldraw[fill=green, fill opacity = 0.3] (2.5,0)  circle (20mm);
  \node at (1.25,0) {2};
  \node at (-0.5, 0.75) {1};
  \node at (-0.5, -0.75) {4};
  \node at (3, 0.75) {3};
  \node at (3, -0.75) {5};
\end{tikzpicture}
:::
*Venn diagram for example \theexample*


:::






:::example

Consider all single-digits $0,1,2,3,4,5,6,7,8,9$. Let $A$ be the set of single-digits with at least one hole, and $B$ be single-digits that have reflection symmetry (look the same in the mirror). Find
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
\filldraw[fill = blue, fill opacity = 0.1] (0,0) rectangle (4,3);
\filldraw[fill = green, fill opacity = 0.3] (2,1.5) circle (13mm);
\node at (2,1.5) {$A$}; 
\node at (3.5,2.5) {$A^{c}$};
\node at (0.2, 3.2) {$U$};
\end{tikzpicture}
:::
*Venn diagram for set complement $A^{c*$}






:::example

Let $A = \{1,2,3\}$. 


- If we define $U = \{1,2,3,4,5\}$ , then find $A^\mathsf{c}$. 

- If we define $U = \{1,2,3,8,9,10\}$ , then find $A^\mathsf{c}$.


:::


:::solution



- If we define $U = \{1,2,3,4,5\}$ , then $A^\mathsf{c} = \{4,5\}$. 

- If we define $U = \{1,2,3,8,9,10\}$ , then $A^\mathsf{c} = \{8,9,10\}$.


:::




## Game Design Application: MDA Framework




:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8, every node/.style={scale=0.9}]
\filldraw[opacity=0.4, fill=red!40] (-0.8,0.5) circle (1.5cm);
\filldraw[opacity=0.4, fill=blue!40] (0.8,0.5) circle (1.5cm);
\filldraw[opacity=0.4, fill=green!40] (0,-0.8) circle (1.5cm);
\node at (-1.5,1.2) {\textbf{Mechanics}};
\node at (1.5,1.2) {\textbf{Dynamics}};
\node at (0,-1.8) {\textbf{Aesthetics}};
\node at (0,0) {\textbf{Game}};
\end{tikzpicture}
:::
*The MDA Framework: Mechanics $\cap$ Dynamics $\cap$ Aesthetics form the core player experience.*
