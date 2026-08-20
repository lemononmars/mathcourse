---
week: 3
order: 4
slug: "quadratic"
title: "Quadratic Equation"
source: "tex/lecture03.tex"
---

## How to solve a quadratic equation?


:::definition

A **quadratic function** is of the form
\[ f(x) = ax^2+bx +c\]

:::


There are three ways to find the roots of a quadratic equation.



- Using the formula

- Factoring

- Completing a square





## 1 - Using the Formula


:::theorem

A quadratic function $f(x) = ax^2 + bx + c$ has two roots
\[ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.\]

In particular, the roots are
\begin{eqnarray*}
m_1 &=& \frac{-b + \sqrt{b^2 - 4ac}}{2a} \text{ and } 

m_2 &=& \frac{-b - \sqrt{b^2 - 4ac}}{2a} 
\end{eqnarray*}

:::






:::example

Find the roots of $x^2 - 2x - 3=0$.

:::


:::solution

By comparing to the form $ax^2 + bx + c$, we get $a = 1, b = -2, c = -3$. Thus, we can plug these values into the formula
\begin{eqnarray*}
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} &=& \frac{-(-2) \pm \sqrt{(-2)^2 - 4(1)(-3)}}{2(1)} 

&=& \frac{2 \pm \sqrt{16}}{2} = \frac{2 \pm 4}{2}
\end{eqnarray*}
So the roots are
\[ m_1 = \frac{2+4}{2} = 3, \qquad m_2 = \frac{2-4}{2} = -1\]

:::






:::example

Find the roots of $2x^2 - 3x -2=0$.

:::


:::solution

By comparing to the form $ax^2 + bx + c$, we get $a = 2, b = -3, c = -2$. Thus, we can plug these values into the formula
\begin{eqnarray*}
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} &=& \frac{-(-3) \pm \sqrt{(-3)^2 - 4(2)(-2)}}{2(2)} 

&=& \frac{3 \pm \sqrt{25}}{4} = \frac{3 \pm 5}{4}
\end{eqnarray*}
So the roots are
\[ m_1 = \frac{3+5}{4} = 2, \qquad m_2 = \frac{3-5}{4} = -\frac{1}{2}\]

:::





:::exercise

Find the roots following quadratic functions using the formula
\[ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.\]


- $f(x) = x^2 +5x+6$

- $f(x) = x^2 - x - 12$

- $f(x) = 3x^2 +5x - 2$


:::






## 2 - Factoring

Suppose we have $f(x) = x^2 +bx+c$ where the coefficient of $x^2$ is 1. Also, suppose that $f(x)$ can be written as $f(x) = (x-m_1)(x-m_2)$. Then, it is immediate that $x=m_1$ and $x=m_2$ are the roots of $f(x)$ since
\[ f(m_1) = (m_1-m_1)(m_1-m_2) = 0\]
\[ f(m_2) = (m_2-m_1)(m_2-m_2) = 0\]
We can now work backward. By expanding the product, we get
\[ f(x) = (x-m_1)(x-m_2) = x^2 -m_1x - m_2x + m_1m_2 = x^2 - (m_1+m_2)x + m_1m_2\]
By comparing the coefficients to the original $x^2 + bx + c$, we know that
\begin{eqnarray*}
m_1+m_2 &=& -b

m_1m_2 &=& c
\end{eqnarray*}



Hence, if we can find $m_1$ and $m_2$ that satisfy 

:::note

\begin{eqnarray*}
m_1+m_2 &=& -b

m_1m_2 &=& c
\end{eqnarray*}

:::

Then $m_1$ and $m_2$ are the roots of $f(x)$. Nevertheless, this method works if $b,c$ are small and if $m_1,m_2$ are integers.


Note: If the function is of the form $f(x) = ax^2 + bx + c$ when $a \neq 1$, then we can use a slightly modified method, which we won't cover here.






:::example

Find the roots of $x^2+4x+3=0$.

:::


:::solution

Let $f(x) = x^2 +4x+3$. We want to find $m_1,m_2$ such that
\begin{eqnarray*}
m_1 + m_2 &=& -b = -4 

m_1m_2 &=& c = 3.
\end{eqnarray*}
Since 3 is a prime number, our guesses would be 


- $m_1 = 1$ and $m_2 = 3$. In this case, $m_1 + m_2 = 1+3=4 \neq -4$ so this guess fails.

- or $m_1 = -1$ and $m_2 = -3$. In this case, $m_1 + m+2 = -1+-3 = -4$

Thus, $m_1 = -1$ and $m_2 = -3$ are roots of $f(x) = x^2 + 4x + 3$.

:::







## 3 - Completing a square

This method is the most intuitive as it works similarly to solving a linear equation. Moreover, this method generates the formula shown in the first method.

Let $f(x) = ax^2 + bx + c$ be a quadratic equation. By using the identity that $(x+m)^2 = x^2 + 2mx + m^2$, we have
\begin{eqnarray*}
ax^2 + bx + c &=& a\left(x^2 + \frac{b}{a}x + \frac{c}{a} \right) 

&=& a \left(x^2 + 2\left(\frac{b}{2a}\right)x + \left(\frac{b}{2a}\right)^2 - \left(\frac{b}{2a}\right)^2 + \frac{c}{a} \right) 

&=& a\left( \left(x + \frac{b}{2a}\right)^2- \left( \frac{b^2}{4a^2} - \frac{c}{a}\right) \right)
\end{eqnarray*}



We can rewrite $ \frac{b^2}{4a^2} - \frac{c}{a}$ as a square.
\begin{eqnarray*}
a\left( \left(x + \frac{b}{2a}\right)^2- \left( \frac{b^2}{4a^2} - \frac{c}{a}\right) \right) &=& a\left( \left(x + \frac{b}{2a}\right)^2- \left( \frac{b^2-4ac}{4a^2}\right) \right) 

&=& a\left( \left(x + \frac{b}{2a}\right)^2- \left( \frac{\sqrt{b^2-4ac}}{2a}\right)^2 \right)
\end{eqnarray*}
To simplify, let $\frac{\sqrt{b^2-4ac}}{2a} = D$. Then, we use the identity $x^2 - m^2 = (x-m)(x+m)$ to rewrite it as
\begin{eqnarray*}
a\left( \left(x + \frac{b}{2a}\right)^2- \left( \frac{\sqrt{b^2-4ac}}{2a}\right)^2 \right) & = & a\left( \left(x + \frac{b}{2a}\right)^2- D^2 \right) 

&=& a\left( x + \frac{b}{2a} - D\right) \left(x + \frac{b}{2a} + D \right)
\end{eqnarray*}



Therefore, we now find two roots of the function $f(x)$, namely

:::note

\[ x = -\frac{b}{2a} + D, \quad -\frac{b}{2a} - D\]

:::


In practice, all these variables $a,b,c$ will be combined into a single real number, so it won't look as messy as this.





:::example

Find the roots of $ x^2 +6x+8=0$.

:::


:::solution

Let $f(x) = x^2 +6x+8$. We can complete a square and solve for the roots as follows.
\begin{eqnarray*}
x^2 + 6x + 8 &=& x^2 + 2(3x) + 3^2 - 3^2 + 8 

&=& (x+3)^2 - 1 

&=& ((x+3)-1)((x+3)+1) 

&=& (x+2)(x+4)
\end{eqnarray*}
Hence, the roots are $x = -2$ and $x=-4$.

:::
