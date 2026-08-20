---
week: 3
order: 5
slug: "permutation"
title: "Permutation"
source: "tex/lecture03.tex"
---

## Permutation


:::definition

**Permutations** are the possible **ordered** selections of $r$ objects out of a total of $n$ objects. 

:::



:::tikz TikZ diagram
\begin{tikzpicture}[scale=0.8]
\foreach \x / \y / \n in {red/1.2/1, blue/0/2, green/-1.2/3}
 \shade[ball color=\x] (-1.2,\y) circle (0.5cm) node [white] {\n};
 \draw [thick, ->, line width = 0.2cm] (-0.5,0) -- (2.2,0);
\foreach \x / \y / \n in {red/3/1, blue/4/2, green/5/3}
 \shade[ball color=\x] (\y,1.5) circle (0.5cm) node [white] {\n};
   \shade[ball color=red] (3,0) circle (0.5cm) node [white] {1};
 \shade[ball color=green] (4, 0) circle (0.5cm) node [white] {2};
  \shade[ball color=blue] (5, 0) circle (0.5cm) node [white] {3};
   \shade[ball color=blue] (3,-1.5) circle (0.5cm) node [white] {1};
 \shade[ball color=red] (4, -1.5) circle (0.5cm) node [white] {2};
  \shade[ball color=green] (5, -1.5) circle (0.5cm) node [white] {3};
   \shade[ball color=blue] (7,1.5) circle (0.5cm) node [white] {1};
 \shade[ball color=green] (8, 1.5) circle (0.5cm) node [white] {2};
  \shade[ball color=red] (9, 1.5) circle (0.5cm) node [white] {3};
   \shade[ball color=green] (7,0) circle (0.5cm) node [white] {1};
 \shade[ball color=red] (8, 0) circle (0.5cm) node [white] {2};
  \shade[ball color=blue] (9, 0) circle (0.5cm) node [white] {3};
   \shade[ball color=green] (7,-1.5) circle (0.5cm) node [white] {1};
 \shade[ball color=blue] (8, -1.5) circle (0.5cm) node [white] {2};
  \shade[ball color=red] (9, -1.5) circle (0.5cm) node [white] {3};
\end{tikzpicture}
:::


*A permutation of 3 distinct objects.*






:::example

How many permutations are there of numbers $123$?

:::


:::solution

The permutations are 
\[\text{123}, \qquad \text{132}, \qquad, \text{213}, \qquad \text{231}, \qquad \text{312}, \qquad \text{321},\]
which we can search exhaustively using the tree diagram below. Hence, there are 6 permutations. 



:::tikz TikZ diagram
\begin{tikzpicture}[
level distance = 10mm,
level 1/.style={sibling distance=14mm},
]
  \node[rectangle, draw] {1}
    child {node[rectangle, draw] {2}
    	child {node[rectangle, draw] {3}
    		child {node {123}  edge from parent[->]}
    	}
    }
    child {node[rectangle, draw] {3}
    	child {node[rectangle, draw] {2}
    		child {node {132} edge from parent[->]}
    	}
    }
;
  \node[rectangle, draw] at (3,0) {2}
    child {node[rectangle, draw] {1}
    	child {node[rectangle, draw] {3}
    		child {node {213}  edge from parent[->]}
    	}
    }
    child {node[rectangle, draw] {3}
    	child {node[rectangle, draw] {1}
    		child {node {231} edge from parent[->]}
    	}
    }
;
  \node[rectangle, draw] at (6,0) {3}
    child {node[rectangle, draw] {1}
    	child {node[rectangle, draw] {2}
    		child {node {312}  edge from parent[->]}
    	}
    }
    child {node[rectangle, draw] {2}
    	child {node[rectangle, draw] {1}
    		child {node {321} edge from parent[->]}
    	}
    }
;
\node at (-2,0) {First digit};
\node at (-2,-1) {Second digit};
\node at (-2,-2) {Third digit};
\node at (-2,-3) {Result};
\end{tikzpicture}
:::




:::






:::example

How many permutations are there of 2 letters from ABCD?

:::


:::solution

The permutations are 



| AB | AC | AD | BA | BC | BD |
| --- | --- | --- | --- | --- | --- |
| CA | CB | CD | DA | DB | DC |


Hence, there are 12 permutations, as illustrated in the tree diagram below.



:::tikz TikZ diagram
\begin{tikzpicture}[
level distance = 10mm,
sibling distance = 8mm
]
  \node[rectangle, draw] {A}
    	child {node[rectangle, draw] {B}
    		child {node {AB}  edge from parent[->]}
    	}
        	child {node[rectangle, draw] {C}
    		child {node {AC}  edge from parent[->]}
    	}
        	child {node[rectangle, draw] {D}
    		child {node {AD}  edge from parent[->]}
    	}
;  
	\node[rectangle, draw] at (2.5,0) {B}
    	child {node[rectangle, draw] {A}
    		child {node {BA}  edge from parent[->]}
    	}
        	child {node[rectangle, draw] {C}
    		child {node {BC}  edge from parent[->]}
    	}
        	child {node[rectangle, draw] {D}
    		child {node {BD}  edge from parent[->]}
    	}
;
  \node[rectangle, draw] at (5,0) {C}
    	child {node[rectangle, draw] {A}
    		child {node {CA}  edge from parent[->]}
    	}
        	child {node[rectangle, draw] {B}
    		child {node {CB}  edge from parent[->]}
    	}
        	child {node[rectangle, draw] {D}
    		child {node {CD}  edge from parent[->]}
    	}
;
 \node[rectangle, draw] at (7.5,0) {D}
    	child {node[rectangle, draw] {A}
    		child {node {DA}  edge from parent[->]}
    	}
        	child {node[rectangle, draw] {B}
    		child {node {DB}  edge from parent[->]}
    	}
        	child {node[rectangle, draw] {D}
    		child {node {DC}  edge from parent[->]}
    	}
;
\node at (-2.5,0) {First letter};
\node at (-2.5,-1) {Second letter};
\node at (-2.5,-2) {Result};
\end{tikzpicture}
:::




:::






:::example

How many permutations are there of 3 letters in the English alphabet?

:::


:::solution

Listing all permutations is possible, but would be a waste of paper. Instead, we use a rule of product to help counting. There are three arrangements to make.


- Choosing the first letter: there are 26 ways.

- Choosing the second letter: there are 25 ways left, as one of the letters has already been chosen.

- Choosing the third letter: there are 24 ways left, as two of them have already been chosen.

Since we have to make all three arrangements, then by the rule of product there are $26 \times 25 \times 24 = 15,600$ permutations.

:::





## Generalization


:::slide

We can generalize the procedure in the previous example as follows. If there are $n$ objects and we order $r$ of them, then there are $r$ arrangements to make.


- Choosing the first object: there are $n$ ways.

- Choosing the second object: there are $n-1$ ways, as you cannot choose the first object again.

- Choosing the third object: there are $n-2$ ways, as you cannot choose the first two object.

- $\vdots$

- Choosing the $r$-th object: there are $n-(r-1) = n-r+1$ ways, as you cannot choose the first $r-1$ objects.

Hence, by the rule of product, we can multiply all the numbers from each arrangement to get the following theorem.

:::






:::tikz TikZ diagram
\begin{tikzpicture}[
level distance = 10mm,
level 1/.style={sibling distance=14mm},
]
  \node[rectangle, draw] {Position 1}
    child {node {$n$ ways} edge from parent [<-]};
  \node[rectangle, draw] at (3,0) {Position 2}
    child {node {$n-1$ ways} edge from parent [<-]};    
  \node at (5,0) {$\cdots$}
    child {node {$\ldots$} edge from parent [draw = none]};
   \node[rectangle, draw] at (7,0) {Position $r$}
    child {node {$n-r+1$ ways} edge from parent [<-]};
\end{tikzpicture}
:::


*Counting the number of permutations of $r$ objects from $n$ distinct objects.*





## The Formula for Permutation


:::theorem

The number of permutations of $n$ objects taken $r$ at a time is denoted 
\[ P(n,r) = n \times (n-1) \times (n-2) \times \ldots \times (n-r+1) \]

:::






:::example

Suppose that 4 people are are to be randomly chosen out of 10 people who agreed to be interviewed in a market survey. How many permutations are there?

:::


:::solution

The four people are to be assigned to four interviewers, so the order matters. Thus, the number of permutations is 
\[P(10,4) = 10\cdot 9 \cdot 8 \cdot 7 = 5040.\]

:::




## Properties of Permutation (1/2)


:::property



- $P(n, 0) = 1$: 
:::slide
There is exactly 1 permutation with 0 objects.
:::


- $P(n,1) = n$: 
:::slide
A permutation of 1 object is simply picking one object.
:::


- $P(n,n) = n!$: 
:::slide
The number of permutation of all $n$ objects is simply the definition of factorial.
:::



:::




## Properties of Permutation (2/2)


:::property



- $P(n,r) = \frac{n!}{(n-r)!}$: 
:::slide
We can use the factorial to rewrite as
\begin{eq*}
&&P(n,r) 

&=& n \times (n-1) \times \ldots \times (n-r+1) 

&=& \frac{n \times (n-1) \times \ldots \times (n-r+1) \times ** (n-r) \times \ldots \times 2 \times 1**}{**(n-r) \times (n-r-1) \times \ldots \times 2 \times 1**} 

&=& \frac{n!}{(n-r)!}
\end{eq*}

:::



:::
