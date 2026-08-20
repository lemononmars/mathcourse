---
week: 2
order: 5
slug: "set-definition"
title: "Set definition"
source: "tex/lecture02.tex"
---

Formal set notation:
\[ \{ 1,2,3,A,B\}\] 


:::example



- $A = \{1,2,3\}$

- $B = \{a,b,c\}$

- $C = \{1,2,3,a,b,c\}$

- $D = \{1,2,\{a,b\}\}$


:::



- The things inside the set is called a *member* or an *element*. \

- For example, $1$ is a member of $A$. We denote this as $1 \in A$.

- However, $a$ is not a member of $A$. We denote this as $a \notin A$.





## Diagram

A set can be visualized as a diagram with a circle containing elements.



:::tikz TikZ diagram
\begin{tikzpicture}[every node/.style={scale = 2}]
\filldraw[fill = teal!20, draw = black] (0,0) circle (2cm);
\node at (1,1) {$1$};
\node at (1.5,-0.5) {$3$};
\node at (-1,0.5) {$-2$};
\node at (-1.5,-0.5) {$0$};
\node at (-3,0) {$4$};
\node[teal] at (45: 2.5)  {$A$};
\end{tikzpicture}
:::


*A diagram of a set $A = \{-2,0,1,3\*$. We see that $4 \not\in A$.}






:::definition



- $\emptyset = \{\}$ is called the **empty set**, meaning it has no element. 

- $|A|$ (the size of $A$) is the cardinality (or the number of elements) of $A$. This can either be zero, a positive integer, an infinity ($\infty$), or uncountable. 


:::






:::example

Express the following sets in set notation, and also find its size.


- The set of letters in English alphabet.

- The set of planets in the solar system.

- The set of odd positive integers less than 10

- The set of integers whose square ends with 3.


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

- $A = B$ (A is equal to B) if all elements in $A$ and $B$ match. 


:::




:::tikz TikZ diagram
\begin{tikzpicture}[thick]
\filldraw[fill=green, fill opacity = 0.3] (0,0) circle (15mm);
\filldraw[fill=blue, fill opacity = 0.3] (0.3,0) circle (10mm);
\node at (-0.5,1) {$B$}; 
\node at (0.3,0.5) {$A$};
\end{tikzpicture}
:::


*Venn diagram for $A \subseteq B$*






:::example

For each pair of sets, determine whether they have subset ($\subseteq$) or equality ($=$) relationship or neither.


- $F$ = a set of fruits, $P$ = a set of plants

- $A = \{1,2,3\}, B = \{4,3,2,1\}$

- $C = \{1,2,3\}, D = \{2,3,4\}$


:::


:::solution



- $F \subseteq P$ because all fruits are plants.

- $A \subseteq B$ because each element in $A$ - namely 1,2, and 3 - are in $B$.

- $C$ is not a subset of $D$ because $1$ is in $C$ but not in $D$. Likewise, $D$ is not a subset of $C$ because $4$ is in $D$ but not in $C$.


:::





:::exercise

Consider numbers from 1 to 10, inclusive. Let


- $A$ be the set of odd numbers.

- $B$ be the set of numbers divisible by 3.

- $C$ be the set of numbers whose spelling includes a letter E. 

- $D$ be the set of numbers whose spelling includes a repeating letter. 



- Express $A,B,C$ and $D$ in set notation.

- Explain whether 9 is in $A$ or not. Repeat this for $B,C$ and $D$.

- Is it true that $B \subseteq D$? Explain why.

- Use $\subseteq$ and $=$ to compare some of the sets $A,B,C$ and $D$.


:::
