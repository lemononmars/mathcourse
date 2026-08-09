---
week: 5
order: 3
slug: "properties"
title: "Properties of Exponential Function"
source: "tex/lecture05.tex"
---

## How to Do Math

Now that we have just defined a new operation, let's see if we can derive some basic properties based on the definition.

:::note

\[ M^{a+b}\]

:::


:::slide

\begin{eqnarray*}
M^{a+b} &=& \underbrace{M \times M \times \cdots \times M}_{a+b \text{ times}} 
\pa
&=& \underbrace{M \times M \times \cdots \times M}_{a \text{ times}} \times \underbrace{M \times M \times \cdots \times M}_{b \text{ times}} 
\pa
&=& M^a \times M^b
\end{eqnarray*}
Thus, we conclude that
\[M^{a+b} = M^a \times M^b.\]

:::







:::note

\[(M \times N)^a\]

:::


:::slide

We treat $M \times N$ as a single number and apply the definition.
\begin{eqnarray*}
(M \times N)^a &=& \underbrace{(M \times N) \times (M \times N) \times \cdots \times (M \times N)}_{a \text{ times}} 
\pa
&=& \underbrace{M \times M \times \cdots \times M}_{a \text{ times}} \times \underbrace{N \times N \times \cdots \times N}_{a \text{ times}} 
\pa
&=& M^a \times N^a
\end{eqnarray*}
Thus, we conclude that
\[(M \times N)^a = M^a \times N^a.\]

:::






:::note

\[(M^a)^b\]

:::


:::slide

We treat $M^a$ as a single number and apply the definition.
\begin{eqnarray*}
(M^a)^b &=& \underbrace{M^a \times M^a \times \cdots \times M^a}_{b \text{ times}} 
\pa
&=& M^{(\overbrace{a+a+\cdots+a}^{b \text{ times}})} 
\pa
&=& M^{a\times b}
\end{eqnarray*}
Thus, we conclude that
\[(M^a)^b = M^{a \times b}.\]

:::






:::note

\[M^0\]

:::


:::slide

If we apply the first property with $b=0$ we have
\begin{eq*}
M^{a+0} &=& M^a \times M^0 

M^a &=& M^a \times M^0 
\end{eq*}
For the equation to hold, we need
\[M^0 = 1.\]
\medskip

Alternately, we notice that if going up (say from $M^3$ to $M^4$) means we multiply by $M$, then going down (say from $M^2$ to $M^1$) means dividing by $M$. This means
\[\frac{M^3}{M^2} = M, \quad \frac{M^2}{M^1} = M, \quad \frac{M^1}{M^0} = M, \quad \then M^0 = 1\]

:::





:::note

\[M^{-a}\]

:::


:::slide

We know that 
\[M^a \times M^{-a} = M^{a + (-a)} = M^0 = 1.\] \pa
And also, 
\[M^a \times \frac{1}{M^a} = \frac{M^a}{M^a} = 1.\] \pa
Thus, we conclude that
\[M^{-a} = \frac{1}{M^a}.\]
Since we can multiply $M^a$ by $M^{-a}$ to get 1, we call $M^{-a}$ the **multiplicative inverse** of $M^a$.

:::





## Properties

We summarize the properties as follows.

:::property

Let $M,N$ be positive real numbers, and $a,b$ be real numbers. \pa


- $M^{a+b} = M^a \times M^b$ \pa

- $(M\times N)^a = M^a \times N^a$ \pa

- $(M^a)^b = M^{a \times b}$ \pa

- $M^0 = 1$ \pa

- $\displaystyle M^{-a} = \frac{1}{M^a}$ \pa


:::





## Caution


:::slide

Note:


- If $M \neq N$ and $a \neq b$, then $M^a \times N^b$ cannot be combined (for instance, $2^5 \times 3^{0.7}$ should be left as is). \pa

- A common mistake is to use exponent property with addition
\begin{alertblock}{}
\[ (a+b)^2 \neq a^2 + b^2 \]
\end{alertblock}
The correct approach is to transform the exponent into simple multiplication.
\begin{eq*}
(a+b)^2 &=& (a+b) \times (a+b) 

&=& a \times (a+b) + b \times (a+b) \mathnote{distributive} 

&=& (a \times a) + (a \times b) + (b \times a) + (b \times b) 

&=& a^2 + 2ab + b^2
\end{eq*}


:::






:::example

Simplify the following terms using properties.


- $3^4 \times 3^5$

- $2^{-2} \times 2^{3}$

- $2^7 \times 3^7$

- $9^3 \times 2^6$


:::


:::solution



- $3^4 \times 3^5 = (3 \times 3 \times 3 \times 3) \times (3 \times 3 \times 3 \times 3 \times 3) = 3^9$

- $2^{-2} \times 2^{3} = \frac{1}{2 \times 2} \times (2 \times 2 \times 2) = 2$

- $2^7 \times 3^7 = \underbrace{(2 \times 2 \times \cdots \times 2)}_{7 \text{ times}} \times \underbrace{(3 \times 3 \times \times \cdots 3)}_{7 \text{ times}} = (2 \times 3) \times (2 \times 3) \times \cdots \times (2 \times 3) = (2 \times 3)^7 = 6^7$

- Neither the bases of the exponents are the same. Nevertheless, we can convert the exponents to match. $9^3 \times 5^6 = (3^2)^3 \times 5^6 = 3^{(2 \times 3)} \times 5^6 = 3^6 \times 5^6 = (15)^6$


:::





:::exercise

Use the properties to simplify the following terms. **Do not** blindly apply the formulas.


- $2^3 \times 2^4$

- $3^5 \times 3^{-7}$

- $2^8 \times 3^8$

- $4^{-3} \times 5^{-3}$

- $5^{10} \times 4^{5}$

- $(2^4)^5$


:::
