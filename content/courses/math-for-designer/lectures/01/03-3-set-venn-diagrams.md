---
week: 1
order: 3
slug: "3-set-venn-diagrams"
title: "3-Set Venn Diagrams"
source: "tex/lecture01.tex"
---

## 3-Set Venn Diagrams: The 8 Regions



A 3-set Venn diagram divides the Universe $U$ into **8 mutually exclusive regions**:


- Center: $A \cap B \cap C$ (all 3)

- 2-set overlaps only:


- $(A \cap B) \setminus C$

- $(B \cap C) \setminus A$

- $(A \cap C) \setminus B$


- Single set only:


- Only $A$, Only $B$, Only $C$


- Outside all sets: $(A \cup B \cup C)^\mathsf{c}$





:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.65, every node/.style={scale=0.8}]
\draw[thick] (-2.5,-2.5) rectangle (2.5,2.5);
\node at (-2.1,2.1) {$U$};
\draw[thick, red!70!black] (-0.7,0.5) circle (1.3cm) node[above left=0.8cm] {$A$};
\draw[thick, blue!70!black] (0.7,0.5) circle (1.3cm) node[above right=0.8cm] {$B$};
\draw[thick, green!50!black] (0,-0.5) circle (1.3cm) node[below=1.1cm] {$C$};
\node at (0,0.2) {\tiny $A\cap B\cap C$};
\node at (0,1.1) {\tiny $A\cap B$};
\node at (-0.7,-0.3) {\tiny $A\cap C$};
\node at (0.7,-0.3) {\tiny $B\cap C$};
\node at (-1.3,1.0) {\tiny Only $A$};
\node at (1.3,1.0) {\tiny Only $B$};
\node at (0,-1.3) {\tiny Only $C$};
\node at (1.8,-2.0) {\tiny Outside};
\end{tikzpicture}
:::
## Constructing a 3-Set Diagram from Given Sets


:::note Construction Strategy (Inside-Out Method)

To correctly place elements into a 3-set Venn diagram, fill the regions from the **inside out**:


- **Step 1 (Center):** Find $A \cap B \cap C$ (elements in all three sets).

- **Step 2 (2-way overlaps):** Find remaining elements in $(A \cap B)$, $(B \cap C)$, and $(A \cap C)$.

- **Step 3 (1-set regions):** Place remaining elements belonging exclusively to $A$, $B$, or $C$.

- **Step 4 (Outside):** Place elements of $U$ that are not in $A \cup B \cup C$.


:::




## Example: Constructing a 3-Set Venn Diagram


:::example

Given $U = \{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\}$ and sets:
\[ A = \{1, 2, 4, 5, 7\}, \quad B = \{2, 3, 5, 6, 8\}, \quad C = \{4, 5, 6, 7, 9\} \]
Construct the 3-set Venn diagram.

:::


:::solution





- $A \cap B \cap C = \{5\}$

- $A \cap B \text{ (only)} = \{2\}$, $B \cap C \text{ (only)} = \{6\}$, 
$A \cap C \text{ (only)} = \{4, 7\}$

- Only $A = \{1\}$, Only $B = \{3, 8\}$, Only $C = \{9\}$

- Outside $(A \cup B \cup C)^\mathsf{c} = \{10\}$





:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.55, every node/.style={scale=0.75}]
\draw[thick] (-2.6,-2.6) rectangle (2.6,2.6);
\node at (-2.2,2.2) {$U$};
\draw[thick, red!70!black] (-0.7,0.5) circle (1.3cm) node[above left] {$A$};
\draw[thick, blue!70!black] (0.7,0.5) circle (1.3cm) node[above right] {$B$};
\draw[thick, green!50!black] (0,-0.5) circle (1.3cm) node[below] {$C$};
\node at (0,0.2) {$5$};
\node at (0,1.1) {$2$};
\node at (-0.6,-0.2) {$4,7$};
\node at (0.6,-0.2) {$6$};
\node at (-1.3,1.0) {$1$};
\node at (1.3,1.0) {$3,8$};
\node at (0,-1.3) {$9$};
\node at (2.0,-2.1) {$10$};
\end{tikzpicture}
:::
:::




## Evaluating Set Operations visually: $A \cup (B \cap C)$


:::note Evaluating Compound Set Operations

Break down the operation step-by-step:


- Identify the region for the inner expression: $B \cap C$ (intersection of $B$ and $C$).

- Combine (union $\cup$) that region with the entire set $A$.


:::







:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.5, every node/.style={scale=0.7}]
\draw[thick] (-2.2,-2.2) rectangle (2.2,2.2);
\begin{scope}
\clip (0.7,0.5) circle (1.3cm);
\fill[blue!40] (0,-0.5) circle (1.3cm);
\end{scope}
\draw[thick] (-0.7,0.5) circle (1.3cm) node[above left] {$A$};
\draw[thick] (0.7,0.5) circle (1.3cm) node[above right] {$B$};
\draw[thick] (0,-0.5) circle (1.3cm) node[below] {$C$};
\end{tikzpicture}
:::
*Step 1: Region $B \cap C$*





:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.5, every node/.style={scale=0.7}]
\draw[thick] (-2.2,-2.2) rectangle (2.2,2.2);
\fill[teal!40] (-0.7,0.5) circle (1.3cm);
\begin{scope}
\clip (0.7,0.5) circle (1.3cm);
\fill[teal!40] (0,-0.5) circle (1.3cm);
\end{scope}
\draw[thick] (-0.7,0.5) circle (1.3cm) node[above left] {$A$};
\draw[thick] (0.7,0.5) circle (1.3cm) node[above right] {$B$};
\draw[thick] (0,-0.5) circle (1.3cm) node[below] {$C$};
\end{tikzpicture}
:::
*Step 2: $A \cup (B \cap C)$*





## Evaluating Set Operations: More Examples






:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.5, every node/.style={scale=0.7}]
\draw[thick] (-2.2,-2.2) rectangle (2.2,2.2);
\begin{scope}
\clip (-0.7,0.5) circle (1.3cm);
\fill[orange!40] (0.7,0.5) circle (1.3cm);
\end{scope}
\begin{scope}
\clip (0,-0.5) circle (1.3cm);
\fill[white] (-0.7,0.5) circle (1.3cm);
\end{scope}
\draw[thick] (-0.7,0.5) circle (1.3cm) node[above left] {$A$};
\draw[thick] (0.7,0.5) circle (1.3cm) node[above right] {$B$};
\draw[thick] (0,-0.5) circle (1.3cm) node[below] {$C$};
\end{tikzpicture}
:::
*$(A \cap B) \setminus C$*





:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.5, every node/.style={scale=0.7}]
\draw[thick] (-2.2,-2.2) rectangle (2.2,2.2);
\fill[purple!30] (0,-0.5) circle (1.3cm);
\begin{scope}
\fill[white] (-0.7,0.5) circle (1.3cm);
\fill[white] (0.7,0.5) circle (1.3cm);
\end{scope}
\draw[thick] (-0.7,0.5) circle (1.3cm) node[above left] {$A$};
\draw[thick] (0.7,0.5) circle (1.3cm) node[above right] {$B$};
\draw[thick] (0,-0.5) circle (1.3cm) node[below] {$C$};
\end{tikzpicture}
:::
*$(A \cup B)^\mathsf{c} \cap C = C \setminus (A \cup B)$*

*Visualizing region boundaries for set operations*
