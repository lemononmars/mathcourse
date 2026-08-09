---
week: 9
order: 4
slug: "factorial"
title: "Factorial"
source: "tex/lecture09.tex"
---

## Factorial


:::definition

Let $n$ be a positive integer. Then, define **the factorial of $n$** to be the product of all numbers from $1$ to $n$. In other words, the formula is given by
\begin{equation}
n! = n \times (n-1) \times (n-2) \times 2 \times 1
\end{equation}

:::






:::example

Use the definition of factorial to compute the following expressions.


- $2!$

- $3!$

- $4!$

- $1!$


:::
\pa

:::solution



- $2! \pa = 2 \times 1 \pa = 2$ \pa

- $3! \pa = 3 \times 2 \times 1 \pa = 6$\pa

- $4! \pa = 4 \times 3 \times 2 \times 1 \pa = 24$ \pa

- $1! \pa = 1$ (There is only one integer from 1 to 1, which is 1, so there is nothing else in the product but 1.)


:::




\begin{cor}{}{}
Alternately, we can define $n! = n \times (n-1)!$ \pa
\end{cor} \pa
For instance,
\[ 4! = 4 \times (3!), \quad 5! = 5 \times (4!) \] \pa
This definition is useful when solving math problems, or when computing a factorial when we already know smaller factorials. \pa
\begin{cor}{}{}
We have $0! = 1$
\end{cor} \pa
This holds because if we let $n=1$ in the above alternate definition, we get $1! = 1 \times (0!)$. \pa This implies that $0! = 1$. \pa There is also another good reason of why we should have $0! = 1$, but we'll find that out next week!





:::example

Simplify the following expressions. Do not compute them!


- $\frac{10!}{9!}$

- $\frac{6!}{8!}$

- $5! + 4!$

- $7! - 6!$


:::
\pa

:::solution



- $\frac{10!}{9!} \pa = \frac{(10)(9!)}{9!} \pa = 10$ \pa

- $\frac{6!}{8!} \pa = \frac{6!}{(8)(7!)} \pa = \frac{6!}{(8)(7)(6!)} \pa = \frac{1}{(8)(7)}$ \pa

- $5! + 4! \pa = (5)(4!) + 4! \pa = (5+1)(4!) \pa = (6)(4!)$ \pa

- $7! - 6! \pa = (7)(6!) - 6! \pa = (7-1)(6!) \pa = (6)(6!)$


:::







:::example

Convert the following expressions as factorials (sum, difference, product, ratio.)


- $20 \times 19 \times 18$

- $6 \times 5 \times 4 \times 3$

- $\frac{1}{8 \times 7}$


:::
\pa

:::solution



- $20 \times 19 \times 18 \pa =\frac{20!}{17!}$

- $6 \times 5 \times 4 \times 3 \pa = \frac{6!}{2!}$

- $\frac{1}{8 \times 7} \pa = \frac{6!}{8!}$


:::





:::exercise



- Simplify the following expressions. Do not compute them!


- $\frac{15!}{12!}$

- $\frac{3!}{7!}$

- $6! + 7!$

- $13! - 12!$


- Convert the following expressions as factorials (sum, difference, product, ratio.)


- $11 \times 10 \times 9$

- $20 \times 19 \times 18 \times 17 \times 16 \times 15$

- $\frac{1}{5 \times 6 \times 7 \times 8}$



:::





## More problems


:::figure brillant_problem_solving — \href{https://brilliant.org/wiki/rule-of-sum-and-rule-of-product-problem-solving/
:::
}
