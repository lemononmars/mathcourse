---
week: 8
order: 1
slug: "intro-to-matrix"
title: "Introduction to Matrix"
source: "tex/lecture08.tex"
---

## Matrix Definition


:::definition

A matrix is an ordered collection of numbers. A 2 by 2 matrix is of the form
\[ \begin{pmatrix} a & b 
c & d \end{pmatrix}\]
where $a,b,c,d$ are real numbers.

:::

In general, we can define $m$ by $n$ matrix in the same way, but we only need to focus on a 2 by 2 matrix for today's topic.





## Matrix Operation

Given two matrices $A = \begin{pmatrix} a & b 
c & d \end{pmatrix}$ and $A' = \begin{pmatrix} a' & b' 
c' & d' \end{pmatrix}$, a vector $\vec{v} = \cvec{v_1}{v_2}$, and a real number $k$. We can define the following operations.


- Scalar multiplication: $kA$

- Matrix addition: $A + A'$

- Matrix-vector multiplication: $A\vec{v}$

- Matrix multiplication: $AA'$






## Scalar Multiplication


:::definition Scalar multiplication

\begin{equation}
**k**\begin{pmatrix} a & b 
c & d \end{pmatrix}= \begin{pmatrix} **k**a & **k**b 
**k**c & **k**d \end{pmatrix}
\end{equation}

:::






:::example

Compute the followings.


- $4\begin{pmatrix} 1 & 0 
-2 & 3 \end{pmatrix}$

- $-2\begin{pmatrix} 3 & -1 
0 & 3 \end{pmatrix}$


:::


:::solution



- $**4**\begin{pmatrix} 1 & 0 
-2 & 3 \end{pmatrix} = \begin{pmatrix} **4** \times 1 & **4** \times 0 
**4** \times -2 & **4** \times 3 \end{pmatrix} = \begin{pmatrix} 4 & 0 
-8 & 12 \end{pmatrix}$

- $**-2**\begin{pmatrix} 3 & -1 
0 & 3 \end{pmatrix} = \begin{pmatrix} **(-2)** \times 3 & **(-2)** \times (-1) 
**(-2)** \times 0 & **(-2)** \times 3 \end{pmatrix} = \begin{pmatrix} -6 & 2 
0 & -6 \end{pmatrix}$


:::





## Matrix Addition

Matrix addition is done entry by entry.

:::definition Matrix addition

\begin{equation}
\begin{pmatrix} a & b 
c & d \end{pmatrix} + \begin{pmatrix} a' & b' 
c' & d' \end{pmatrix} = \begin{pmatrix} a+a' & b + b' 
c+ c' & d + d' \end{pmatrix}
\end{equation}

:::






:::example

Compute the followings.


- $\begin{pmatrix} 0 & 1 
2 & 3 \end{pmatrix} + \begin{pmatrix} 7 & -6 
-5 & 4 \end{pmatrix}$

- $\begin{pmatrix} 0 & 1 
2 & 3 \end{pmatrix} + \begin{pmatrix} 7 & -6 
-5 & 4 \end{pmatrix}$


:::


:::solution



- $\begin{pmatrix} 0 & 1 
2 & 3 \end{pmatrix} + \begin{pmatrix} 7 & -6 
-5 & 4 \end{pmatrix} = \begin{pmatrix} 0+7 & 1+(-6) 
2+(-5) & 3+4 \end{pmatrix} = \begin{pmatrix} 7 & -5 
-3 & 7 \end{pmatrix}$

- $\begin{pmatrix} 0 & 1 
2 & 3 \end{pmatrix} + \begin{pmatrix} 7 & -6 
-5 & 4 \end{pmatrix} = \begin{pmatrix} 0+7 & 1+(-6) 
2+(-5) & 3+4 \end{pmatrix} = \begin{pmatrix} 7 & -5 
-3 & 7 \end{pmatrix}$


:::






## Matrix-Vector Multiplication


:::definition Matrix-Vector Multiplication

\begin{equation}
\begin{pmatrix} **a** & **b** 
**c** & **d** \end{pmatrix}\cvec{v_1}{v_2} = v_1 \cvec{**a**}{**c**} + v_2 \cvec{**b**}{**d**} = \cvec{**a**v_1 + **b**v_2}{**c**v_1 +**b**v_2}
\end{equation}

:::






:::example

Compute the followings.


- $\begin{pmatrix} **2** & **3** 
**-1** & **0** \end{pmatrix}\cvec{4}{5}$

- $\begin{pmatrix} **-3** & **1** 
**5** & **-2** \end{pmatrix}\cvec{1}{0}$


:::


:::solution



- $\begin{pmatrix} **2** & **3** 
**-1** & **0** \end{pmatrix}\cvec{4}{5} = 4 \cvec{**2**}{**-1**} + 5 \cvec{**3**}{**0**}
= \cvec{8}{-4} + \cvec{15}{0} = \cvec{23}{-4}$

- $\begin{pmatrix} **-3** & **1** 
**5** & **-2** \end{pmatrix}\cvec{1}{0} = 1 \cvec{**-3**}{**1**} + 0 \cvec{**5**}{**2**}
= \cvec{-3}{1} + \cvec{0}{0} = \cvec{-3}{1}$


:::





## Motivation for Matrix-Vector Multiplication

Every single math student is perplexed by the formula
\[ \begin{pmatrix} **a** & **b** 
**c** & **d** \end{pmatrix}\cvec{**v_1**}{\orange{v_2}} = \cvec{**a****v_1** + **b**\orange{v_2}}{**c****v_1** +**b**\orange{v_2}}.\]
Why is it defined this way? Won't it be much simpler if we define it naturally as
\[ \begin{pmatrix} a & b 
c & d \end{pmatrix}\cvec{v_1}{v_2} = \begin{pmatrix} av_1 & bv_1 
cv_2 & dv_2 \end{pmatrix}\]
or 
\[ \begin{pmatrix} a & b 
c & d \end{pmatrix}\cvec{v_1}{v_2} = \begin{pmatrix} av_1 + bv_1 
cv_2 + dv_2 \end{pmatrix}?\]



The answer is: this is the *natural* way to define the multiplication. 

Notice what happens when we multiply the matrix by the unit vector $\vec{i} = \cvec{1}{0}$.
\[ \begin{pmatrix} **a** & **b** 
**c** & **d** \end{pmatrix}\cvec{1}{0} = \cvec{**a**\times 1 + **b** \times 0}{**c** \times 1 +**b** \times 0} = \cvec{**a**}{**c**}.\]
So the matrix transform $\vec{i}$ to the vector $\cvec{**a**}{**c**}$, which is the first column of the matrix. 



Likewise, for the unit vector $\vec{j} = \cvec{0}{1}$, we have
\[ \begin{pmatrix} **a** & **b** 
**c** & **d** \end{pmatrix}\cvec{0}{1} = \cvec{**a**\times 0 + **b** \times 1}{**c** \times 0 +**b** \times 1} = \cvec{**b**}{**d**}.\]
So the matrix transform $\vec{j}$ to the vector $\cvec{**b**}{**d**}$, which is the second column of the matrix.



Combining the equations together and using the fact that the matrix multiplication is linear, we can visually define.
\begin{eq*} 
\begin{pmatrix} **a** & **b** 
**c** & **d** \end{pmatrix}\cvec{**v_1**}{\orange{v_2}} &=& \begin{pmatrix} **a** & **b** 
**c** & **d** \end{pmatrix} \left( \cvec{**v_1**}{0} + \cvec{0}{\orange{v_2}} \right) 

&=& \cvec{**a****v_1** + **b**\orange{v_2}}{**c****v_1** +**b**\orange{v_2}}
\end{eq*}




:::figure 2dtransform_multiplication_explained — The grid transformed by the matrix. [](https://www.desmos.com/calculator/wt7lapyxi4
:::
)




:::exercise

Compute the following matrix operations.


- $3 \begin{pmatrix} 1 & 2 
-1 & 0 \end{pmatrix}$

- $\begin{pmatrix} 1 & 2 
4 & 5 \end{pmatrix} + \begin{pmatrix} 0 & -1 
-3 & 1 \end{pmatrix}$

- $\begin{pmatrix} 1 & 0 
2 & 3 \end{pmatrix} \begin{pmatrix} -1 
4 \end{pmatrix}$

- $\begin{pmatrix} 5 & -2 
1 & 3 \end{pmatrix} \begin{pmatrix} 0 
2 \end{pmatrix}$


:::
