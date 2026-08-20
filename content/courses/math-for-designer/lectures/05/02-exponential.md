---
week: 5
order: 2
slug: "exponential"
title: "Exponential Function"
source: "tex/lecture05.tex"
---

## Choose one

You are offered two boxes, $A$ and $B$, each with a label that has a function. You have to choose one box, in which on day $x$, you will receive that amount of money. Which box would you choose? 


:::remark

\begin{eqnarray*}
A &\text{vs.}& B 

10 \times x & \text{vs.}& x^2 

10,000 \times x & \text{vs.}& x^2 

10,000 \times x^2 & \text{vs.}& x^3 

x^2 & \text{vs.}& 2^x 

x^{1,000,000} & \text{vs.}& 2^x 

\end{eqnarray*}

:::





## Graph Comparison




:::figure l08i06.png
:::






## Basic definition

Let $a$ be a positive integer and $M$ be a real number. Recall that we define the multiplication $a \times M$ to be
\[ a \times M = \underbrace{M + M + M + \cdots + M}_{a \text{ times}}\] 

:::definition

Let $a$ be a positive integer and $M$ be a real number. We define the exponent $M^a$ (read $M$ to the power of $a$) to be
\[ M^a = \underbrace{M \times M \times M \times \cdots \times M}_{a \text{ times}}.\] 

:::






:::example

Use the definition to compute the following numbers.


- $3^2$

- $5^3$

- $2^{10}$

- $7^1$


:::


:::solution



- $3^2 = 3 \times 3 = 9$

- $5^3 = 5 \times 5 \times 5 = 125$

- $2^{10} = 2 \times 2 \times 2 \times \cdots \times 2 = 1024$

- $7^1 = 7$


:::






## Definition


:::definition

An **exponential function** is a function of the form 
\[ f(x) = a \times b^x\]
when $a$ is a positive real number.

:::



:::example

\[ 2^x, \quad 3 \times 10^x, \quad - 0.01^x, \quad \left( \frac{2}{25} \right)^x\]

:::





## Graph Comparison




:::figure l08i08.png
:::






## Fraction Power

What if $a$ is a rational number? Consider
\[M^{1/2}\]

:::slide

Suppose that we have no idea how to define it yet. For this expression to make sense, it needs to agree with the definition. If we try to compute
\[M^{1/2} \times M^{1/2}\]
this would be as if we ``combine'' two halves to get a whole. Thus, we would expect
\[M^{1/2} \times M^{1/2} = M^1 = M\]
Actually, we already know that $\sqrt{M} \times \sqrt{M} = M$. Thus, it is natural to define
\[\sqrt{M} = M^{1/2}\]

:::





## Fractional Power


:::definition

For any integer $n$, define the $n$-th root of $M$ as
\[\sqrt[n]{M} = M^{1/n}\]


For any rational numberr $k= \frac{a}{b}$ be a rational number where $a,b$ are both integers and $b \neq 0$, define
\[ M^k = M^{a/b} = \sqrt[b]{M^a}\]

:::
