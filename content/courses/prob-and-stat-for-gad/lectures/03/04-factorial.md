---
week: 3
order: 4
slug: "factorial"
title: "Factorial"
source: "tex/lecture03.tex"
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


:::solution



- $2! = 2 \times 1 = 2$ 

- $3! = 3 \times 2 \times 1 = 6$

- $4! = 4 \times 3 \times 2 \times 1 = 24$ 

- $1! = 1$ (There is only one integer from 1 to 1, which is 1, so there is nothing else in the product but 1.)


:::




\begin{cor}{}{}
Alternately, we can define $n! = n \times (n-1)!$ 
\end{cor} 
For instance,
\[ 4! = 4 \times (3!), \quad 5! = 5 \times (4!) \] 
This definition is useful when solving math problems, or when computing a factorial when we already know smaller factorials. 
\begin{cor}{}{}
We have $0! = 1$
\end{cor} 
This holds because if we let $n=1$ in the above alternate definition, we get $1! = 1 \times (0!)$. This implies that $0! = 1$. There is also another good reason of why we should have $0! = 1$, but we'll find that out next week!





:::example

Simplify the following expressions. Do not compute them!


- $\frac{10!}{9!}$

- $\frac{6!}{8!}$

- $5! + 4!$

- $7! - 6!$


:::


:::solution



- $\frac{10!}{9!} = \frac{(10)(9!)}{9!} = 10$ 

- $\frac{6!}{8!} = \frac{6!}{(8)(7!)} = \frac{6!}{(8)(7)(6!)} = \frac{1}{(8)(7)}$ 

- $5! + 4! = (5)(4!) + 4! = (5+1)(4!) = (6)(4!)$ 

- $7! - 6! = (7)(6!) - 6! = (7-1)(6!) = (6)(6!)$


:::







:::example

Convert the following expressions as factorials (sum, difference, product, ratio.)


- $20 \times 19 \times 18$

- $6 \times 5 \times 4 \times 3$

- $\frac{1}{8 \times 7}$


:::


:::solution



- $20 \times 19 \times 18 =\frac{20!}{17!}$

- $6 \times 5 \times 4 \times 3 = \frac{6!}{2!}$

- $\frac{1}{8 \times 7} = \frac{6!}{8!}$


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
