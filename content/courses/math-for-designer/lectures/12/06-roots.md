---
week: 12
order: 6
slug: "roots"
title: "Roots of Complex Numbers"
source: "tex/lecture12.tex"
---

## Roots of unity

Consider the polynomial
\[x^n = 1\]
where $n$ is a natural number. We know that
\begin{eq*}
x^2=1 &\rightarrow& x = -1,1

x^3 = 1 & \rightarrow& x = 1 

x^4 = 1 & \rightarrow& x = -1, 1
\end{eq*}
and so on. Note that $x^3=1$ has one real root $x=1$, but the degree of 3 suggests there should be 3 roots in total. Using complex numbers, we can find the other two roots.



We rewrite the equation as 
\[x^3 = 1\]
If $x = re^{i\theta}$, then
\[x^3= r^3e^{i(3\theta)}\]

We see that $r=1$ since the modulus (or length) of the right-handed side is 1. However, $\theta$ requires attention because note that
\[1 = e^{i \, 0}\]
and setting $3\theta = 0$ gives us $\theta = 0$as one solution. But actually, using trigonometry we have
\[1 = e^{i \, (360 k)} \]
where $k$ is an integer. This means that we can rotate the complex number $360$ degree and get the same number as the origin. Thus, the correct equation would be
\[3 \theta = 360 k \]



Finally, we have
\begin{eq*}
(k=0) \quad 3\theta = 0 &\rightarrow& \theta = 0 

(k=1) \quad 3\theta = 360 & \rightarrow& \theta = 120 

(k=2) \quad 3\theta = 720 & \rightarrow& \theta = 240 

(k=3) \quad 3\theta = 1080 & \rightarrow& \theta = 360
\end{eq*}
But $\theta = 0$ and $\theta = 360$ are the same angle and thus yields the same solution. Thus, the roots of the polynomial $x^3=1$ are
\[x = 1, e^{i \,120}, e^{i \, 240},\]
or, in the form $z=a+bi$, we have
We can repeat the same argument for any power $x^n$



## Roots of Unity


:::theorem

The roots of $x^n=1$ where $n$ is a natural number are
\begin{equation}
x = e^{i \,\frac{360 k}{n}}, k=0,1,2,\ldots,n-1
\end{equation}
These are called ``roots of unity'' of degree $n$. Geometrically, these are unit vectors equally spaced around the origin.

:::







:::tikz TikZ diagram
\begin{tikzpicture}
\foreach \n / \x / \y in {2/1/1,3/2/1,4/3/1,5/1/2,6/2/2,7/3/2} {
	\begin{scope}[xshift = {4*\x cm}, yshift={-4*\y cm}] 
		\draw[<->] (-1.5,0)--(1.5,0);
		\draw[<->] (0,-1.5)--(0,1.5);
		\foreach \k in {0,1,...,\n} {
			\draw[line width = 0.1cm, red] (0,0) -- ({\k*360/\n}:1cm);
		}
		\node at (0, -2) {$x^{\n} = 1$};
	\end{scope}
}
\end{tikzpicture}
:::
**






:::example

Find the roots of unity of degree 4.

:::


:::solution

Applying the theorem, the roots are
\[x = e^{i \,\frac{360k}{4}}, k=0,1,2,3\]
These are $e^{i0}, e^{i \, 90}, e^{i \, 180}, e^{i \, 270}$, which can also be expressed as $1, i, -1, -i$.

:::





## N-th roots

For any complex number $z = re^{i\theta}$, recall that we can find an n-root using De Moivre's rule.
\[ z^{\frac{1}{n}} = r^{\frac{1}{n}} e^{i \left(\frac{\theta}{n}\right)}\]
Now, we can indeed find \text{all} roots using roots of unity.

:::theorem

Let $z=re^{i\theta}$ be a complex number and $n$ be a natural number. The n-th roots of $z$ are
\begin{equation}
z_k = r^{\frac{1}{n}} e^{i \,\frac{\theta + 360k}{n}}, k=0,1,2,\ldots,n-1
\end{equation}
We have $z_k^n = z$.

:::





:::example

Find all cube roots of 8.

:::


:::solution

Write $8 = 8 e^{i \,0}$. Cube roots are:
\[ 8^{1/3} e^{i \, \frac{0 + 360k}{3}} = 2 e^{i \, (120 k)},\quad k=0,1,2. \]
These are: $2,\; 2e^{i \, 120}$ and $\; 2e^{i \, 240}.$

:::





:::example

Find all fourth roots of -81.

:::


:::solution

Write $-81 = 81 e^{i \,180}$. Cube roots are:
\[ 81^{1/4} e^{i \, \frac{180 + 360k}{4}} = 3 e^{i \, (45 + 90k)},\quad k=0,1,2,3. \]
These are: $3 e^{i \, 45}, 3e^{i \, 135}, 3e^{i\, 225}$ and $3e^{i \, 315}.$

:::
