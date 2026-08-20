---
week: 4
order: 7
slug: "using-graph"
title: "Using Graph"
source: "tex/lecture04.tex"
---

## Graph Intersection

You can use graph to **find** solutions to some problems. Suppose that we have graphs for $y = f(x)$ and $y = g(x)$. Let $(a,b)$ be an intersection of the graphs. Then we know that
\[ b = f(a) \text{ and } b = g(a) \]
Thus, we have $f(a) = g(a)$. This implies that $x=a$ is the solution to

:::note

\[f(x) = g(x)\]

:::

This works if the solutions are simple decimals, or if you only want an approximation. You still need to solve the equation algebraically if you want an exact answer that is irrational, like $x = \sqrt{3}-1$.






:::example

Use graphs to find the solutions of
\[ x+1 = 2x-4\]

:::


:::solution

We plot the graphs of the function $f(x) = x+1$ and $g(x) = 2x-4$ and see that the intersection is at the point $(5,6)$. Thus, the solution is $x = 5$.

:::figure graph_intersection_ex1 — The intersection of $f(x) = x+1$ and $g(x) = 2x-4$.
:::


:::






:::example

Use graphs to find the solutions of
\[ x^2 = x\]

:::



:::solution

We plot the graphs of the function $f(x) = x^2$ and $g(x) = x$ and see that the intersections are at the points $(0,0)$ and $(1,1)$. Thus, the solutions are $x = 0$ and $x=1$.

:::figure graph_intersection_ex2 — The intersections of $f(x) = x^2$ and $g(x) = x$.
:::


:::





## Graph Comparison

Similarly, we can compare the graph of $y = f(x)$ and $y = g(x)$ to solve an inequality of the form
\[ f(x) \geq g(x)\]
The solutions will be intervals with intersections as the left end or the right end of the intervals.





:::example

Use graphs to find the solutions of
\[ x \geq x^2\]

:::


:::solution

We plot the graphs of the function $f(x) = x$ and $g(x) = x^2$ and see that the part where $f(x) \geq g(x)$ is when $0 \leq x \leq 1$. Thus, the solutions are in the closed interval $[0, 1]$.

:::figure graph_ineq_ex1 — The region where of $f(x) \geq g(x)$.
:::


:::






:::example

Use graphs to find the solutions of
\[ x^2-3x+3 \geq 1\]

:::


:::solution

We plot the graphs of the function $f(x) = x^2-3x+3$ and $g(x) = 1$ (which is a constant function) and see that the region where $f(x) \geq g(x)$ is when $x \leq 1$ or $x \geq 2$. Thus, the solutions are in the union of intervals $(-\infty, 1) \cup (2, \infty)$.

:::figure graph_ineq_ex2 — The region where of $f(x) \geq g(x)$.
:::


:::





:::exercise

Use desmos.com (or your favorite graphing tool) to find the solutions of the following equations or inequalities.


- $3x+1 = 2x+4$

- $x^2 = x+2$

- $x^2-3x+2=0$

- $x = \frac{1}{x}$

- $x^2-3x+2 \leq 0$


:::
