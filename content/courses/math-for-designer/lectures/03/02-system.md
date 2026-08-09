---
week: 3
order: 2
slug: "system"
title: "System of Equations"
source: "tex/lecture03.tex"
---

## System of Equations

Let $a,b,c$ be real numbers and $x,y$ be variables. Consider a linear equation in two variables
\[ax + by = c.\] 
Since both $x$ and $y$ are unknown, there could be several solutions. For example, consider
\[ x+y=5.\]
We can see that $x=1$ and $y=4$ satisfies the equation, as well as $x=2$ and $y=3$, $x=10$ and $y=-5$, and so on and so forth.



Suppose that we have two linear equations in two variables
\begin{eqnarray*}
a_1x+b_1y &=& c_1 

a_2x+b_2y &=& c_2.

\end{eqnarray*}
We can now attempt to solve it. We call this **a system of equations**. Depending on the values $a_1,b_1,c_1,a_2,b_2$ and $c_2$, there are three scenarios

:::remark Scenarios for a system of equations



- There is no solution.

- There is exactly one solution.

- There are infinitely many solutions.


:::





We solve a system of equations by **eliminating** a variable. Suppose that we have

:::example

\begin{eqnarray}
x+y &=& 4

x-y &=& 2
\end{eqnarray}

:::


:::solution

Then, we can eliminate $y$ by adding equation (2) to equation (1) to get
\begin{eqnarray*}
(x+y) + (x-y) &=& 4 + 2

2x &=& 6 

x &=& 3
\end{eqnarray*}
Since we have solved for $x$, we can use $x=3$ to solve for $y$ by using equation (1)
\[x +y=4 \rightarrow \quad 3+y = 4 \rightarrow \quad y = 1\]

:::





Usually, we need to multiply either equation by a real number so that the coefficients match. For example, 

:::example

\begin{eqnarray}
x+2y &=& 2

2x-y &=& 4
\end{eqnarray}

:::


:::solution

Let's say we need to eliminate $y$. Then, we need to multiply equation (4) by $2$ to get
\begin{equation}
4x - 2y = 8
\end{equation} 
Now, we can add equation (3) to equation (5) to get
\begin{eqnarray*}
(x+2y) + (4x-2y) &=& 2 + 8

5x &=& 10 \rightarrow x = 2
\end{eqnarray*}
We can plug in $x=2$ into equation (3) to get $2 + 2y = 2$ and thus $y = 0$.

:::






:::example

\begin{eqnarray}
2x+3y &=& 4

5x+4y &=& 3
\end{eqnarray}

:::


:::solution

Let's say we need to eliminate $y$. Then, we need a real number $m$ such that
\[ 3y + 4my = 0\]
Solving for $m$ yields 
\[ m = -\frac{3}{4}\]
Thus, we need to multiply equation (7) by $-\frac{3}{4}$ to get
\begin{equation}
-\frac{15}{4}x - 3y = -\frac{9}{4}
\end{equation} 

:::





:::solution

Adding equation (6) to equation (8) yields
\begin{eqnarray*}
(2x+3y) + \left(-\frac{15}{4}x - 3y \right) &=& 4 + \left(-\frac{9}{4}\right)

\frac{8x}{4} - \frac{15}{4} &=& \frac{16}{4} - \frac{9}{4} 

8x-15x &=& 7 

x &=& \frac{7}{-7} = -1
\end{eqnarray*}
We can plug in $x= 1$ into equation (6) to get 
\[ 2(-1) + 3y = 4 \rightarrow \quad 3y = 4 - (2)(-1) \rightarrow \quad y = 3\]

:::





:::exercise

Solve the following systems of equations.


- 
\begin{eqnarray*}
x + y &=& 6

2x - y &=& 3
\end{eqnarray*}

- 
\begin{eqnarray*}
2x + 3y &=& 7 

4x - 3y &=& 5
\end{eqnarray*}

- 
\begin{eqnarray*}
3x + 4y &=& 6 

2x - 5y &=& -1
\end{eqnarray*}


:::
