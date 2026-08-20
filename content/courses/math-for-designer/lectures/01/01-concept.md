---
week: 1
order: 1
slug: "concept"
title: "Concept"
source: "tex/lecture01.tex"
---

## Rough definition


:::note

A **set** is a box that contains things.

:::



- collection, group, gathering, category, container, box, circle, area, boundary 

- outside, different 

- add, combine, subtract, take away, remove, exclude 

- differentiate, distinct, distinguish, outstanding, outlier 




## Formal set notation (1/2)


:::definition Definition of Set

A **set** is a collection of distinct objects (called **elements** or **members**). 


- Sets are usually denoted by capital letters ($A, B, C$).

- Enclosed in curly braces: e.g., $A = \{1, 2, 3, 5, \text{apple}\}$.


**Membership Notation:**


- If $x$ is an element of $A$, we write $x \in A$ ($x$ is in $A$). 

- If not, we write $x \notin A$ ($x$ is not in $A$). 

- Example: For $A = \{1, 2, 3\}$, we have $1 \in A$ and $4 \notin A$.


:::




## Formal set notation (2/2)


:::note Key Properties of Sets



- **Order doesn't matter:**
\[ \{1, 2, 3\} = \{2, 1, 3\} \]
*Why?* A set is defined strictly by **membership** (what belongs to it). Testing whether $x \in A$ gives the exact same result regardless of element order. 


- **Duplicate items don't matter:**
\[ \{1, 2, 3, 3, 2, 1\} = \{1, 2, 3\} \]
*Why?* A set tracks **existence** (presence or absence), not quantity/count. An object either belongs to the set ($x \in A$) or does not ($x \notin A$); repeating it does not alter membership status.


:::




## Reading Set Diagrams




:::note How to Read a Diagram



- **Inside circle:** Elements in set ($x \in A$).

- **Outside circle:** Non-elements ($y \notin A$).

- From figure: $A = \{-2, 0, 1, 3\}$ and $4 \notin A$.


:::






:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.7, every node/.style={scale = 1.1}]
\filldraw[fill = teal!20, draw = black, thick] (0,0) circle (2cm);
\node at (0.8,0.8) {$1$};
\node at (1.2,-0.5) {$3$};
\node at (-0.8,0.5) {$-2$};
\node at (-1.2,-0.5) {$0$};
\node at (-2.6,0) {$4$};
\node[teal] at (45: 2.4)  {\textbf{$A$}};
\end{tikzpicture}
:::


*Diagram representation of $A$*






## Venn Diagram vs. Euler Diagram




:::note Euler Diagram

Shows only relationships/overlaps that **actually exist** (non-empty). Disjoint sets do not overlap visually.

:::


:::note Venn Diagram

Shows **all theoretically possible** overlaps, regardless of whether a region contains elements or is empty ($\emptyset$).

:::




**Euler Diagram** (No overlap if disjoint)


:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.5]
\filldraw[fill=red!20, draw=black] (-1.6,0) circle (1.1cm) node {$A$};
\filldraw[fill=blue!20, draw=black] (1.6,0) circle (1.1cm) node {$B$};
\end{tikzpicture}
:::




**Venn Diagram** (Standard overlap template)


:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.5]
\filldraw[fill=red!20, draw=black, fill opacity=0.5] (-0.7,0) circle (1.1cm);
\filldraw[fill=blue!20, draw=black, fill opacity=0.5] (0.7,0) circle (1.1cm);
\node at (-1.2,0) {$A$};
\node at (1.2,0) {$B$};
\node at (0,0) {\tiny $\emptyset$};
\end{tikzpicture}
:::








:::figure set_venn — Can you guess what each set is?
:::




## Empty set and size


:::definition



- $\emptyset = \{\}$ is called the **empty set**, meaning it has no element. 

- $|A|$ (the **size** of $A$) is the cardinality (or the number of elements) of $A$. This can either be 

- zero (if $A$ is empty)

- a positive integer ($1,2,3,\ldots$)

- an infinity ($\infty$)



:::





:::example

Express the following sets in set notation, and also find its size.


- The set of letters in English alphabet.

- The set of planets in the solar system.

- The set of odd positive integers less than 10

- The set of integers whose square ends with digit 3.


:::


:::solution



- $A = \{a,b,c,\ldots,z\}$ and $|A| = 26$

- $B = \{$Earth, Jupiter, Neptune, Mars, Uranus, Saturn, Venus, Mercury$\}$ and $|B| = 8$ (Bye, Pluto)

- $C = \{1,3,5,7,9\}$ and $|C| = 5$

- $D = \{\}$ and $|D| = 0$


:::





## Set Comparison


:::definition



- $A \subseteq B$ ($A$ is a subset of $B$) if every element of $A$ is also an element of $B$. 

- $A = B$ ($A$ is equal to $B$) if all elements in $A$ and $B$ match. 

- $A$ and $B$ are **disjoint** if they share no elements ($A \cap B = \emptyset$).


:::


:::remark

Some textbooks use the notation $A \subset B$ to imply that $A \subseteq B$ but $A \neq B$. 

:::




## Venn Diagrams: Subset vs. Disjoint




**Subset ($A \subseteq B$)**



:::tikz TikZ diagram
\begin{tikzpicture}[thick, scale=0.7]
\filldraw[fill = green!30!white] (0,0) circle (20mm);
\filldraw[fill = red!30!white] (0.5,0) circle (10mm);
\node at (-0.8,1.2) {$B$}; 
\node at (0.5,0) {$A$};
\end{tikzpicture}
:::





**Disjoint Sets ($A \cap B = \emptyset$)**



:::tikz TikZ diagram
\begin{tikzpicture}[thick, scale=0.7]
\filldraw[fill = red!30!white] (-1.3,0) circle (11mm) node {$A$};
\filldraw[fill = blue!30!white] (1.3,0) circle (11mm) node {$B$};
\end{tikzpicture}
:::








:::example

For each pair of sets, determine whether they have subset ($\subseteq$), equality ($=$), disjoint ($\cap = \emptyset$), or neither relationship.


- $F$ = a set of fruits, $P$ = a set of plants

- $A = \{1,2,3\}, B = \{4,3,2,1\}$

- $W$ = Warrior skills, $M$ = Mage skills


:::


:::solution



- $F \subseteq P$ because all fruits are plants.

- $A \subseteq B$ because each element in $A$ - namely 1,2, and 3 - are in $B$.

- $W \cap M = \emptyset$ if warrior and mage have completely disjoint skill sets.


:::
