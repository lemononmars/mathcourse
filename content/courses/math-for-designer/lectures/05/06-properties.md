---
week: 5
order: 6
slug: "properties"
title: "Properties of Logarithm Function"
source: "tex/lecture05.tex"
---

## Deriving Properties

All properties of logarithm function can be derived from exponential function. For instance, we have

:::note

\[M^0 = 1,\]

:::


:::slide

so we then have
\[\log_M 1 = 0.\]

Likewise, from

:::note

\[M^{-a} = \frac{1}{M^a}\]

:::

we can derive
\[\log_M \frac{1}{M^a} = -a\]

:::





## 

Another example is

:::note

\[M^a \times M^b = M^{a+b}\]

:::


:::slide

If we take logarithm on both sides, we get
\[\log_M (M^a \times M^b) = \log_M (M^{a+b}) = a+b.\]
Then, if we let 
\[A = M^a \text{ and } B = M^b,\]
then by definition we have
\[\log_M A = a \text{ and } \log_M B = b.\]
When we replace $M^a$ and $M^b$ on the left-handed side, and $a+b$ on the right-handed side by the logarithms we just derived, we have
\[\log_M (A \times B) = \log_M A + \log_M B\]

:::





## 

Division works similarly. If we replace $b$ by $-b$, we get

:::note

\[M^a \times M^{-b} = M^{a-b}\]

:::


:::slide

We can rewrite $M^{-b} = \frac{1}{M^b}$ to get
\[\frac{M^a}{M^b} = M^{a-b}.\]
Thus, we have
\[\log_M \left( \frac{A}{B} \right) = \log_M A - \log_M B\]

:::





## 

If we apply the property
\[\log_M (A \times B) = \log_M A + \log_M B\]
where $A=B$, we have

:::slide

\[\log_M (A^2) = \log_M A + \log_M A = 2 \log_M A\]
We can continue multiplying by the same value to get
\[\log_M (A^3) = \log_M A + \log_M A + \log_M A = 3 \log_M A.\]
In general, if $n$ is a natural number, we have
\begin{eq*}
\log_M (A^n) &=& \underbrace{\log_M A + \log_M A + \cdots + \log_M A}_{n \text{ times}} 

&=&n \log_M A
\end{eq*}
Furthermore, we can expand this definition to work not only for integers, but also for all real numbers!

:::





## 

The remaining property is

:::note

\[(M^a)^b = M^{ab}\]

:::


:::slide

We then have
\[\log_M (M^a)^b = \log_M M^{ab} = ab\]
If we let $A = M^a$ and $B = (M^a)^b = A^b$, we then have $\log_M A = a$ and $\log_A B = b$ and so
\[\log_M B = \log_M A \log_A B\]
This form is a chain property. We can rewrite so that logarithms base $M$ are on the same side.
\[\frac{\log_M B}{\log_M A} = \log_A B\]
This is useful when you want to change from one base to another.

:::





:::property

Let $M,N, a$ be positive real numbers. \pa


- $\log_a 1 = 0$

- $\log_a (M \times N) = \log_a M + \log_a N$ \pa

- $\log_a \left( \frac{M}{N}\right) = \log_a M - \log_a N$ \pa

- $\log_a (M^b) = b \times \log_a M$, for any real number $b$ \pa

- $ \log_a M = \frac{\log_b M}{\log_b a}$, for any positive real number $b$ \pa


:::






:::example

Use the properties to simplify the following terms


- $\log_2 8 + \log_2 32$

- $\log_3 36 - \log_3 4$

- $\frac{\log_5 81}{\log_5 3}$

- $\log_5 \left(\frac{1}{2^4} \right)$ 


:::


:::solution



- $\log_2 8 + \log_2 32 = \log_2 (8 \times 32) = \log_2 (256) = 7$

- $\log_3 36 - \log_3 4 = \log_3 \left( \frac{36}{4} \right) = \log_3 (9) = 2$

- $\frac{\log_5 81}{\log_5 3} = \log_{3} (81) = 4$

- $\log_5 \left(\frac{1}{2^4} \right) = \log_5 \left( \frac{1}{2} \right)^4 = \log_5 (2^{-4}) = -4 \log_5 2$ 


:::





## Conventions


:::definition

If $\log$ is written without the base, we assume that it is in base 10*. In other words,
\[\log x = \log_{10} x\]

:::



:::definition

As $\log$ base $e, \quad (e \approx 2.718)$ is frequently used, we define it as
\[\ln x = \log_e x \]
It reads ``the natural log of $x$'' or ``lon''.

:::

{ *unless you are a computer scientist who uses base 2}




:::exercise

Use the properties to simplify the following terms


- $\log_6 4 + \log_6 9$

- $\log_2 20 - \log_2 5$

- $\frac{\log_3 16}{\log_3 2}$

- $\log_2 (5^{-8})$ 


:::
