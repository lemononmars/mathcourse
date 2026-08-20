---
week: 12
order: 5
slug: "polar-form"
title: "Polar Form"
source: "tex/lecture12.tex"
---

## Euler's formula


:::theorem

Recall that $e \approx 2.71828$. For any real number $\theta$, we have
\begin{equation} 
e^{i\theta} = \cos\theta + i\sin\theta
\end{equation}

:::

The proof uses calculus knowledge (such as Taylor series of $e^x, \sin x$ and $\cos x$). Roughly, this implies that the operation $e^i$ represents a rotation.


:::remark

There are two units for the angle $\theta$: degree and radian. In this lecture, we will only use degree, and so we will drop the degree notation $^\circ$. 

:::




## Polar form (r,\theta)


:::definition

A complex number $z =a+bi$ can also be epressed in polar form as 
\begin{eq}
z &=& r(\cos\theta + \sin\theta i) 

&=& r e^{i\theta}
\end{eq} 
where $r=|z|$ is the modulus and $\theta=\arg(z)$ is the argument.

We have
\begin{eq}
a &=& r \cos \theta 

b &=& r \sin \theta
\end{eq}

:::




## Drawing a vector and labeling




:::tikz TikZ diagram
\begin{tikzpicture}[scale=1]
      \draw[->] (-1,0) -- (4,0) node[right]{Re};
      \draw[->] (0,-1) -- (0,3) node[above]{Im};
      \draw[thick,->] (0,0) -- (3,2) node[midway, above left] {$r$}; 
      \node at (3.2,2.5) {$z=a+bi = re^{i\theta}$};
      \draw[dashed] (3,0) -- (3,2);
      \node at (1.8,-0.2) {$a$};
      \node at (3.2,1) {$b$};
      \draw (0.8,0) arc (0:34:0.8) node[midway, below left]{$\theta$};
    \end{tikzpicture}
:::


*Representing a complex number both in rectangular form $(a+bi)$ and polar form ($re^{i\theta*$)}





:::example

Change the following complex numbers in polar form to rectangular form.


- $4e^{i \,30}$

- $-5e^{i \,120}$

- $\frac{1}{2} e^{i \,90}$


:::


:::solution



- $4e^{i \,30} = 4(\cos (30) + \sin (30)i) = 4 \left( \frac{\sqrt{3}}{2} + i \frac{1}{2}\right) = 2 \sqrt{3} + 2i$

- $-5e^{i \,120} = -5(\cos (120) + \sin (120)i) = -5 \left( \frac{-1}{2} + i \frac{\sqrt{3}}{2}\right) = \frac{5}{2} - \frac{5\sqrt{3}}{2}i$

- $\frac{1}{2} e^{i \,90} = \frac{1}{2} (\cos (90) + \sin (90) i) = \frac{1}{2}(i) = \frac{i}{2}$


:::




## Multiplication in polar form

The nice thing about the polar form is that multiplication, division, and powers become easier!

:::theorem

Let $z_1 = r_1 e^{i\theta_1}$ and $z_2 = r_2 e^{i\theta_2}$. Then
\begin{eq}
z_1 z_2 = r_1 r_2 e^{i(\theta_1 + \theta_2)}
\end{eq}

:::

Interpretation: to multiply two complex numbers, you can multiply lengths and add angles.



## Division in polar form


:::theorem

Let $z_1 = r_1 e^{i\theta_1}$ and $z_2 = r_2 e^{i\theta_2}$. Then
\begin{eq}
\frac{z_1}{z_2} = \frac{r_1}{r_2} e^{i(\theta_1 - \theta_2)}
\end{eq}

:::

Interpretation: to divide two complex numbers, you can divide their lengths and subtract angles.




:::example

Find the multiplications in polar form.


- $(3 e^{i \,90})(2 e^{i \,60})$

- $(-e^{i \,180})\left( \frac{1}{2} e^{-i 90} \right)$


:::


:::solution

\begin{eq*}
(3 e^{i \,90})(2 e^{i \,60}) &=& (3)(2) e^{i \,(90+60)} 

&=& 6 e^{i \,(150)} 

(-e^{i \,180})\left( \frac{1}{2} e^{-i 90} \right) &=& (-1)\left(\frac{1}{2}\right) e^{i \,(180+(-90)} 

&=& -\frac{1}{2}e^{i \,90}
\end{eq*}

:::




## Powers: De Moivre's theorem

Notice that if we multiply repeatedly, we have
\begin{eq*}
(r e^{i\theta})^2 &=& (r e^{i\theta}) (re^{i\theta}) = r^2 e^{i \,(2\theta)} 

(r e^{i\theta})^3 &=& (r e^{i \,\theta}) (r e^{i\theta})^2 = r^3 e^{i \,(3\theta)}.
\end{eq*}
Indeed, this observation is true for any positive power!

:::theorem De Moivre

Let $r$ and $\theta$ be real numbers and $n$ be a positive real number. Then, we have
\begin{equation}
(r e^{i\theta})^n = r^n e^{in\theta}
\end{equation}

:::





:::example

Compute the following powers.


- $(2e^{i \,45})^4$

- $\left(\frac{1}{3} e^{i \,30} \right)^3$


:::


:::solution



- $(2e^{i \,45})^4 = 2^4 e^{i \,(4 \times 45)} = 16e^{i \,180}$

- $\left(\frac{1}{3} e^{i \,30} \right)^3 = \left(\frac{1}{3}\right)^3 e^{i \,(3 \times 30)} = \frac{1}{27} e^{i \,90}$


:::






:::example

Find a complex number $z$ such that $z^3 = 125 e^{i \, 60}$.

:::


:::solution

If we write $z = re^{i\theta}$, then $z^3 = r^3 e^{i (3\theta)}$. We can simply compare
\[r^3 e^{i \,(3\theta)} = 125 e^{i \, 60}\]
so that we have $r^3=125$ and $3\theta = 60$. These give use $r=5$ and $\theta = 20$, and thus
\[z = 5 e^{i \, 20}\]
is a complex number such that $z^3 = 125 e^{i \, 60}$.

:::




## An n-th root

In the previous example, we have
\[ z^3 = 125 e^{i \, 60} \]
and then we can write
\[z = (125 e^{i \, 60}) ^{\frac{1}{3}}.\]

In particular, we have the following definition

:::definition

Let $z$ and $w$ be complex numbers and $n$ be a positive integer such that $z^n = w$. Then we have
\[z = w^{\frac{1}{n}}\]
and call $z$ an n-th root of $w$.

:::
