---
week: 12
order: 3
slug: "complex-number"
title: "Complex Number"
source: "tex/lecture12.tex"
---

## Intuition



- Complex numbers appear in physics, engineering, and computer graphics.

- They let us solve equations that have no real solutions (e.g., $x^2+1=0$).

- Learning them builds algebra and geometric intuition.




## Integers



- First we have the set of natural numbers 
\[\mathbb{N} =\{1,2,3,\ldots\}.\]

- Adding two natural numbers (says $3+9$) results in another natural number. This property is called closed: the set of natural numbers is closed under addition (and also multiplication).

- But subtracting one natural numbers from another does not always give you another natural number (says $5-8$).

- Fix: define negative numbers. Now we have the set of integers 
\[\mathbb{Z} = \{\ldots, -2,-1,0,1,2\}.\]




## Fractions



- Great! Now adding, multiplying or subtracting two integers give you another integer.

- But now division doesn't work!

- Fix: define fractions. Now we have the set of rational numbers 
\[\mathbb{Q} = \left\{\frac{a}{b} \Big| a,b \in \mathbb{Z}, b \neq 0 \right\}.\]




## Fractions



- Great! Now adding or subtracting two integers give you another integer.

- But the system is still flawed! There are numbers that can't be represented as a fraction of two integers, like the length of the hypotheuse of the right triangle with side lengths 1, or the circumference of a circle with radius 1.



:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.6]
  \begin{scope}[xshift =2cm]
  \draw (0,0) -- (2,0) node[pos=0.5, below] {$1$};
  \draw (2,0) -- (2,2) node[pos=0.5, right] {$1$};
  \draw (2,2) -- (0,0) node[pos=0.5, above left] {$?$};
  \end{scope}
  \draw[->] (0,1.1) arc[start angle = 0, end angle = 355, radius = 0.6] node[pos=0.5, left] {$?$};
  \end{tikzpicture}
:::
- Fix: define ``decimal numbers''. Now we have the set of rational numbers 
\[\mathbb{R} = \left\{ x \, \Big| x \text{ can be written as an infinite decimal number.}\right\} \]
$\sqrt{2}$ and $\pi$ are real numbers because we can write $\sqrt{2} = 1.41421356\ldots$ and $\pi = 3.14159265\ldots$




## Here comes the complex



- Great! Now have all these fancy numbers!

- But the system is still flawed! Polynomials like
\[x^2+1 = 0.\]
do not have solutions as real numbers.

- Fix: assume they have solutions, which we defined as ``complex numbers''. Now we have the set of complex numbers $\mathbb{C} = \left\{ x \, | x \text{ is a solution of a polynomial with real coefficients.}\right\}$.





## The imaginary unit i


:::theorem

Let $i$ be a root of the polynomial
\[x^2+1=0\]

:::



- We see that \(i^2 = -1.\)

- This seems strange because no real number squared gives $-1$.

- But we can treat $i$ as a new number that expands our number system.




## Notation: Complex numbers


:::definition

A **complex number** has the form 
\begin{equation}
z = a + bi,
\end{equation}
where $a$ and $b$ are real numbers.


$a$ is called the **real part** (\(\Re(z)=a\)), and $b$ is the **imaginary part** (\(\Im(z)=b\)).

:::





## Addition and subtraction


:::theorem

Let $a+bi$ and $c+di$ be complex numbers. 
\begin{eq}
(a+bi) + (c+di) &=& (a + c) + (b + d)i 

(a+bi) - (c+di) &=& (a - c) + (b - d)i
\end{eq}

:::





:::example

Compute the following additions.


- $(3+2i) + (4-5i)$

- $(4i) + (-2+3i)$

- $(-1-i) + 5$


:::


:::solution



- $(3+2i) + (4-5i) = (3+4) + (2-5)i = 7-3i$

- $(4i) + (-2+3i) = (0+(-2)) + (4+3)i = -2+7i$

- $(-1-i) + 5 = (-1+5) + (-1+0)i = 4-i$


:::





:::example

Compute the following subtractions.


- $(3+2i) - (4-5i)$

- $(4i) - (-2+3i)$

- $(-1-i) - 5$


:::


:::solution



- $(3+2i) - (4-5i) = (3-4) + (2-(-5))i = -1+7i$

- $(4i) - (-2+3i) = (0-(-2)) + (4-3)i = 2+i$

- $(-1-i) - 5 = (-1-5) + (-1-0)i = -6-i$


:::




## Multiplication

Multiply like polynomials and use $i^2=-1$:
\begin{eq*}
(a+bi)(c+di) &=& ac + a(di) + (bi)c + (bi)(di) 

&=& ac + (ad)i + (bc)i + bd(i^2) 

&=& ac + (ad)i + (bc)i - bd 

&=& (ac-bd) + (ad+bc)i
\end{eq*}

:::theorem

\begin{equation} 
(a+bi)(c+di) = (ac - bd) + (ad+bc)i
\end{equation}

:::

Note: do not remember the formula! You should multiply complex numbers like polynomials.





:::example

Compute the following products.


- $(3+2i)(4-5i)$

- $(4i)(-2+3i)$

- $(5)(-1-i)$


:::


:::solution

\begin{eq*}
(3+2i)(4-5i) &=& (3)(4) + (3)(-5i) + (2i)(4) + (2i)(5i) 

&=& 12 - 15i + 8i - 10 

&=& 22 - 7i 

(4i)(-2+3i) &=& (4i)(-2) + (4i)(3i)

&=& -8i - 12 

&=& -12 - 8i 

(5)(-1-i) &=& (5)(-1) + (5)(-i) 

&=& -5-5i
\end{eq*}

:::




## Conjugate


:::definition

Complex conjugation is denoted with a bar and defined by
\begin{equation}
\overline{a+bi} = a-bi
\end{equation}
If $z=a+bi$, then its conjugate is $\overline{z} = a-bi$ and we read this as ``z-bar'' 

:::


The complex conjugation has a useful property: if $z = a+bi$, then
\[z\overline{z} = (a+bi)(a-bi) = a^2 - (bi)^2 = a^2+b^2,\]
which has no imaginary part.




:::example

Find the complex conjugations of the following complex numbers.


- $2+6i$

- $-4-3i$

- $8i$

- $-7$


:::


:::solution



- $\overline{2+6i}=2-6i$

- $\overline{-4-3i} = -4+3i$

- $\overline{8i} = -8i$

- $\overline{-7} = -7$


:::




## Division

To divide, multiply numerator and denominator by the **conjugate** of the denominator.

:::theorem

\begin{equation}
\frac{a+bi}{c+di} = \frac{(a+bi)(c-di)}{(c+di)(c-di)} = \frac{(ac+bd) + (bc-ad)i}{c^2+d^2}
\end{equation}

:::

Again, do not remember this formula.
