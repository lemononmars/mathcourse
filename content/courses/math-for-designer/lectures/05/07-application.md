---
week: 5
order: 7
slug: "application"
title: "Application of Logarithm"
source: "tex/lecture05.tex"
---

## Logarithm in Science




:::figure l08i12.png
:::

*Decibel*





## Logarithm in Science



:::figure l08i13.png
:::

*pH*





## Logarithm in Science

Earthquake (Richter magnitude)



:::figure l08i11.png
:::






## Number of Digits

\begin{question}{}
How many digits does $2^{100}$ have?
\end{question} 

:::slide

It may seem intimidating for such a large number, so we first find some pattern for smaller numbers.


- Integers between 0 and 9 have 1 digit.

- Integers between 10 and 99 have 2 digits.

- Integers between 100 and 999 have 3 digits.

- Integers between 1000 and 9999 have 4 digits.

- $\vdots$

- Integers between $10^k$ and $10^{k+1} - 1$ have $k+1$ digits.


:::





## Pattern

Then, how can we simply such numbers? We use the fact that logarithm function is increasing and apply to the inequalities. If $x$ has $k$ digits, then we have

:::slide

\begin{eq*}
10^{k-1} &\leq& x \quad < 10^{k} 

\log_{10} 10^{k-1} &\leq& \log_{10} x < \log_{10} (10^{k}) 

k-1 &\leq& \log_{10} x < k
\end{eq*}
We can summarize this observation (which is almost a proof) as follows.

:::





## Logarithm in Math


:::theorem

Let $N$ be a real number. Then, the number of digits of $N$ in base 10 is
\[ \lfloor \log_{10} N \rfloor + 1,\]
where $\lfloor x \rfloor$ (called the floor function) is rounding $x$ down to the closest integer.



In general, the number of digits $N$ in base $k$ is
\[ \lfloor \log_{k} N \rfloor + 1.\]

:::






:::example

How many digits does $2^{100}$ have in base 10? Use the approximation $\log_{10} 2 \approx 0.3010.$

:::


:::solution

The number of digits is
\begin{eq*}
\lfloor \log_{10} 2^{100} \rfloor + 1 &=& \lfloor 100 \times \log_{10} 2 \rfloor + 1 

&\approx& \lfloor 100 \times (0.3010) \rfloor + 1 

&=& \lfloor 30.10 \rfloor + 1 

&=& 30 + 1 = 31
\end{eq*}
Thus, $2^{100}$ has 31 digits. A calculator would give you $1.267 \times 10^{30}$, which means it has the leading digit of 1 followed by 30 digits, for the total of 31 digits.

:::






:::example

How many digits does $10^{100}$ have in base 2? Use the approximation $\log_{10} 2 \approx 0.3010.$

:::


:::solution

First of all, we can use the property of logarithm function to find 
$\log_{2} 10 = \frac{1}{\log_{10} 2} \approx \frac{1}{0.3010} \approx 3.3226.$ 
Now we can compute the number of digits in base 2 to be
\begin{eq*}
\lfloor \log_{2} 10^{100} \rfloor + 1 &=& \lfloor 100 \times \log_{2} 10 \rfloor + 1 

&\approx& \lfloor 332.226 \rfloor + 1 

&=& \lfloor 332.226 \rfloor + 1 

&=& 332 + 1 = 333
\end{eq*}
Thus, $10^{100}$ has 333 digits in base 2.

:::






:::example

A standard deck of cards consists of 52 cards. It is known that it is unlikely that two well-shuffled deck of cards would have the same arrangements. 
\medskip

It is know that the number of different arrangements is $52!$, where $!$ is the factorial. How many digits does $52!$ have in base 10?

:::


:::solution

First, we simplify $\log_{10} 52!$ using the multiplication property:
\begin{eq*}
\log_{10} 52! &=& \log_{10} (52 \times 51 \times 50 \times \cdots \times 3 \times 2 \times 1) 

&=& \log_{10} 52 + \log_{10} 51 + \cdots + \log_{10} 3 + \log_{10} 2 + \log_{10} 1 

&\approx& 1.716 + 1.707 + \cdots + 0.477 + 0.301 + 0 

&\approx& 67.906
\end{eq*}
Thus, the number of digits is
\[\lfloor \log_{10} 52! \rfloor + 1 = \lfloor 67.906 \rfloor + 1 = 68.\]

:::





:::exercise

For the following problems, use these approximations
\[\log_{10} 2 \approx 0.301, \quad \log_{10} 3 \approx 0.477, \quad \log_5 10 \approx 1.4306\]


- How many digits does $3^{100}$ have in base 10?

- How many digits does $10^{100}$ have in base 5?

- Which number is larger: $2^{100}$ or $3^{60}$? Prove by counting the number of digits for each number.


:::
