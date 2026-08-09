---
week: 1
order: 5
slug: "types-of-sets"
title: "Types of Sets"
source: "tex/lecture01.tex"
---

## Types of Sets (1/3)

Expressing the elements 

:::slide




- Explicit: listing all elements. 

\[A = \{1,2,4\} , B = \{1,3,5,7,\ldots\}\] 

- Implicit: stating conditions. 

\[A = \{ \text{ animals } | \text{ has four legs } \} , B = \{x \, | \, x \text{ is an even number} \}\]


:::





## Types of Sets (2/3)

Size 

:::slide



- Finite set: the number of elements is an integer. 

\[ A = \{ \text{atoms in the universe} \} , B = \{ \text{money you have} \}\]

- Infinite set: 

\[ A = \{ \text{integers} \} , B = \{ \text{twin primes} \} \]


:::





## Types of Sets (3/3)

Continuum

:::slide



- Discrete: elements are ``apart'' from each other. 

\[ A = \{ 1,3,4,5\} \] 

- Continuous: elements are in a range. 

\[ A = \{ \text{real numbers} \} , B = \{ x\, | \, 0 < x \leq 10 \} \]


:::





## Intervals

There is a commonly used notation of sets called **interval**. This express the sets expressed by inequality signs.

:::definition

\begin{eqnarray*}
[a,b] &=& \{ x \, | \, a \leq x \leq b \} 

(a,b) &=& \{ x \, | \, a < x < b \} 

(a,b] &=& \{ x \, | \, a < x \leq b \} 

\text{[} a,b \text{)} &=& \{ x \, | \, a \leq x < b \}
\end{eqnarray*}

:::



- ``$($'' and ``$)$'' means non-inclusive or open. This corresponds to $<$ or $>$ signs.

- ``$[$'' and ``$]$'' means inclusive or closed. This corresponds to $\leq$ or $\geq$ signs.






:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.8]
\draw[<->] (-2,0) -- (6,0);
\foreach \x in {-1,0,...,5}
{
	\draw (\x, 0.1) -- (\x, -0.1) node [below] {$\x$};
}
\draw[red, very thick] (0,0) -- (4,0) node [pos=0.5, above, scale = 2] {$(0,4)$};
\filldraw[fill = white] (0,0) circle (1mm);
\filldraw[fill = white] (4,0) circle (1mm);

\begin{scope}[yshift = -2cm]
	\draw[<->] (-2,0) -- (6,0);
	\foreach \x in {-1,0,...,5}
	{
		\draw (\x, 0.1) -- (\x, -0.1) node [below] {$\x$};
	}
	\draw[red, very thick] (0,0) -- (4,0) node [pos=0.5, above, scale =  2] {$[0,4]$};
	\filldraw[fill = red] (0,0) circle (1mm);
	\filldraw[fill = red] (4,0) circle (1mm);
\end{scope}

\begin{scope}[yshift = -4cm]
	\draw[<->] (-2,0) -- (6,0);
	\foreach \x in {-1,0,...,5}
	{
		\draw (\x, 0.1) -- (\x, -0.1) node [below] {$\x$};
	}
	\draw[red, very thick] (0,0) -- (4,0) node [pos=0.5, above, scale = 2] {$[0,4)$};
	\filldraw[fill = red] (0,0) circle (1mm);
	\filldraw[fill = white] (4,0) circle (1mm);
\end{scope}

\begin{scope}[yshift = -6cm]
	\draw[<->] (-2,0) -- (6,0);
	\foreach \x in {-1,0,...,5}
	{
		\draw (\x, 0.1) -- (\x, -0.1) node [below] {$\x$};
	}
	\draw[red, very thick] (0,0) -- (4,0)node [pos=0.5, above, scale = 2] {$(0,4]$};
	\filldraw[fill = white] (0,0) circle (1mm);
	\filldraw[fill = red] (4,0) circle (1mm);
\end{scope}
\end{tikzpicture}
:::
*Example of interval notations. An open dot (hollow) denotes an open interval, and an opaque dot denotes a closed interval.*






:::example

Given $A = [1,4], \quad B = (2, 5), \quad C = (3,6], \quad D = [0,7]$. Express the following set operations in terms of intervals.
\[ A \cap B, \quad B \cup C, \quad A \setminus C, \quad D \setminus C \]

:::


:::solution



- $A \cap B = (2, 4]$

- $B \cup C = (2,6]$

- $A \setminus C = [1,3]$

- $D \setminus C = [0,3] \cup (6,7]$


:::
