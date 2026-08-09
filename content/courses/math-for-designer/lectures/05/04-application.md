---
week: 5
order: 4
slug: "application"
title: "Application of Exponential"
source: "tex/lecture05.tex"
---

## Population Growth


:::theorem

A growth (or decay) can be modeled by the function
\[ f(t) = a (1+b)^t, \]
where $t$ represents time, and $a$ and $b$ are some constant with $b>0$.


- If $b>0$, we call $f$ a growth function.

- If $-1<b,0$, we call $f$ a decay function.


:::





:::example

Suppose that the population of India was about 1.25 billion in the year 2013, with an annual growth rate of about 1.2\%. What will the population of India be in 2031?

:::


:::solution

This situation can be represented by the growth function
\[ f(t) = 1.25 (1 + 12\%)^t = 1.25(1.012)^t, \]
where $t$ is a number of years (since 2013). Notice that at the start when $t=0$, we have $f(t) = 1.25 (1.012)^0 = 1.25$ as intended.

Now, from 2013 to 2031, it'll take $2031-2013 = 18$ years, and so we can plug in $t=18$ into the function to get 
\[ f(18) = 1.25 (1.012)^{18} \approx 1.549.\]

Thus, the population of India in 2031 would be about 1.549 billion.

:::





:::example

A scientist begins with 100 milligrams of a radioactive substance that decays exponentially. After 35 hours, 50mg of the substance remains. How many milligrams will remain after 54 hours?

:::


:::solution

This situation can be represented by a decay function
\[ f(t) = a (1 + b)^t =100(1+b)^t,\]
where $b$ is some constant. We know that 
\begin{eq*}
f(35) &=& 50 = 100(1+b)^{35} 

(1+b)^{35} &=& \tfrac{1}{2} 

1+b &=& \left(\tfrac{1}{2}\right)^{1/35}
\end{eq*}
Hence, we can compute the amount of substance when $t=54$ to be
\[ f(54) = 100\left( \tfrac{1}{2^{1/35}}\right)^{54} \approx 34.321\]

:::





## Compound Interest


:::theorem

Let 


- $P$ be the principal,

- $r$ be the annual percentage rate (APR),

- $n$ be the number of compouding periods in a year,

- $t$ be the time.

Then the account value by the end of time $t$ is
\[ A(t) = P\left(1+ \frac{r}{n}\right)^{nt}.\]

:::





:::example

If we invest \$3,000 in an investment account paying 3\% interest compounded quarterly, how much will the account be worth in 10 years?

:::


:::solution

We are starting with $P=3000$. Our interest rate is 3\%, so $r=0.03$. Because we are compounding quarterly, we are compounding 4 times per year, so $n=4$. We want to know the value of the account in 10 years, so we are looking for $A(10)$. Thus, we have
\begin{eq*}
A(t) &=& P\left(1+\frac{r}{n}\right)^{nt} 

A(10) &=& 3000 \left(1+\frac{0.03}{4}\right)^{4 \times 10} 

&\approx& 4045.05
\end{eq*}

:::





:::exercise



- The fox population in a certain region has an annual growth rate of 9\% per year. In the year 2012, there were 23,900 fox counted in the area. What is the fox population predicted to be in the year 2020?

- A car was valued at \$38,000 in the year 2007. By 2013, the value had depreciated to \$11,000. If the car’s value continues to drop by the same percentage, what will it be worth by 2017?

- If we opended an investment account with an initial deposit of \$4,000 and with an annual interest rate of 7\%, compounding quarterly, how much will the account be worth in 9 years? 


:::
