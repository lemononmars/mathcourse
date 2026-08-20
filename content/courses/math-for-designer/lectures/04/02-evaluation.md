---
week: 4
order: 2
slug: "evaluation"
title: "Function Evaluation"
source: "tex/lecture04.tex"
---

## Function evaluation

Given a function $f$ and a real number $a$ in the domain, we can define $f(a)$ to be the value when we substitute $x=a$ in the function. In other words, we replace all occurences of $x$ by $a$ 


:::example

Let $f(x) = 2x+1$. Compute the followings.


- $f(0)$

- $f(1)$

- $f(0.5)$ 

- $f(100)$


:::


:::solution

\begin{eqnarray*} 
\mbox{When } x=0 &\mbox{ we have }& f(0) = 2(0) + 1 = 1 

\mbox{When } x=1 &\mbox{ we have }& f(1) = 2(1) + 1 = 2+1 = 3

\mbox{When } x=0.5 &\mbox{ we have }& f(0.5) = 2(0.5) + 1 = 1 + 1 = 2

\mbox{When } x=100 &\mbox{ we have }& f(100) = 2(100) + 1 = 200 + 1 = 201
\end{eqnarray*}

:::






:::example

Let $f(x) = x^2+x$. Compute the followings.


- $f(0)$

- $f(2)$

- $f(-3)$ 

- $f\left(\frac{1}{3}\right)$


:::


:::solution



- $f(0) = 0^2 + 0 = 0$ 

- $f(2) = 2^2 + 2 = 4+2 = 6$ 

- $f(-3) = (-3)^2 + (-3) = 9 - 3 = 6$ 

- $f\left(\frac{1}{3}\right) = \left(\frac{1}{3}\right)^2 + \frac{1}{3} = \frac{1}{9} + \frac{1}{3} = \frac{4}{9}$


:::





## Remarks


:::remark

We don't need to let $x$ be a number. It can be **anything**. For instance, let $f(x) = x^2+3x$. Then, we can write the followings.

:::slide

\begin{eqnarray*}
f(y) &=& y^2+3y 

f(\Xi) &=& \Xi^2 + 3\Xi 

f(x+5) &=& (x+5)^2 + 3(x+5) 

f(x+h) &=& (x+h)^2 + 3(x+h) 

f\left(\frac{1}{x}\right) &=& \left(\frac{1}{x}\right)^2 + 3\left(\frac{1}{x}\right) 
\end{eqnarray*}

:::


:::





:::exercise

1. Google for your favorite/cool looking/bizarre/cute/funny graph.



:::figure l07i20.png
:::

*[Desmos.com](desmos.com/calculator)*


:::
