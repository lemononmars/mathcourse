---
week: 2
order: 2
slug: "center"
title: "Center"
source: "tex/lecture02.tex"
---

## Introduction to descriptive statistics


\quad ``The average statistician is married to 1.75 wives who try their level best to drag him out the house 2 1/4 nights a week with only 50 percent success. 

\quad He has a a sloping forehead with a 2 percent grade(denoting mental strength), 5/8 of a bank account, and a 3.06 children who drive him 1/2 crazy; 1.65 of the children are male. 

\quad Only .07 of all statisticians are 1/4 awake at the breakfast table where they consume 1.68 cups of coffee - the remaining .32 dribbling down their shirt fronts...''


- W.F. Miksch (1950)






## Center of distribution

Suppose we have the following data.

\[X = 6, 8, 6, 9, 11, 5, 60 \] 



- What can we do with it? 

- What does it tell us? 


:::slide

Commonly used centers are


- Mode

- Median

- Mean


:::





## Center of distribution - Mode

\[X = 6, 8, 6, 9, 11, 5, 60 \] 

:::note Mode

The mode is the value that appears most frequently. It is possible to have more than one mode.

:::


:::slide

Here, we see that the mode is 6 as it appears twice, which other values appear only once.

:::





## Center of distribution - Median

\[X = 6, 8, 6, 9, 11, 5, 60 \] 


:::note Median

The median $(\tilde{X})$ is the middle observation, which is equal to the second quartile $(Q_2)$ and the 50th percentile $(P_{50})$.

:::


:::slide

Sorting the data from lowest to highest results in 
\[5, 6, 6, **8**, 9, 11, 60\]
So, we see that the middle value is $\tilde{X} = 8$.

If the number of values is even, there is no data in the middle. In this case, we use the middle of the two values sandwiching the middle.

:::





## Center of distribution - Mean

\[X = 6, 8, 6, 9, 11, 5, 60 \] 

:::note Mean

The mean is the average of all numbers.
\begin{eqnarray*}
\bar{X} &=& \frac{1}{n}\left( X_1 + X_2 + \ldots + X_n \right) 

&=& \frac{1}{n} \sum_{i=1}^{n} X_i
\end{eqnarray*}

:::


:::slide

The mean is $\bar{X} = \frac{1}{7}(6 + 8 + 6 + 9 + 11+ 5 + 60) = \frac{1}{7}(105) = 15$.

:::




## The Sigma Notation


:::note Sigma Notation

Let $m,n$ be integers with $m \leq n$ and $f(x)$ be a function. Define the notation
\begin{equation}
\sum_{i=m}^{n} f(i) = f(m) + f(m+1) + \ldots + f(n),
\end{equation}
which is, we take the sum of the function $f$ evaluated at each integer from $m$ to $n$.

:::





:::example

Expand the following expressions.


- $\sum_{i=1}^{5} i$

- $\sum_{i=0}^{6} i^2$

- $\sum_{i=4}^{7} X_i$


:::


:::solution



- $\sum_{i=1}^{5} i = 1 + 2 + 3 + 4 + 5 = 15$

- $\sum_{i=0}^{6} i^2 = 0^2 + 1^2 + 2^2 + 3^2 + 4^2 + 5^2 + 6^2 = 0 + 1 + 4 + 9 + 16 + 25 + 36 = 91$

- $\sum_{i=4}^{7} X_i = X_4 + X_5 + X_6 + X_7$


:::





## Relative positions of the mode, median, and mean


:::slide



- Ideally, the mode, median and mean are all equals. 

- What if the distribution is skewed? 

- Relative to the mode, the median lies out in the direction of the long tail. And the mean lies even farther out.


:::figure center_skew — When centers are off center
:::


:::





## Which center is appropriate?



- The mode is the easiest, but the most inadequate. 

- The median represents a more typical value. 

- The mean is the only central measure that takes into account the total of all the observations. 




\begin{alertblock}{Challenge}
Find examples of data where


- Mean $\geq$ Mode $\geq$ Median

- Mean $\geq$ Median $\geq$ Mode

- Mode $\geq$ Mean $\geq$ Median

- Mode $\geq$ Median $\geq$ Mean

- Median $\geq$ Mode $\geq$ Mean

- Median $\geq$ Mean $\geq$ Mode

\end{alertblock}


\iffalse


## Do You Actually Know The Centers?


{\Huge [Let's Play!](https://www.menti.com/ep2xt171mw)}

\fi



:::exercise

The following data show the lengths of boats moored in a marina. The data are ordered from smallest to largest: 

16; 17; 19; 20; 20; 21; 23; 24; 25; 25; 25; 26; 26; 27; 27; 27; 28; 29; 30; 32; 33; 33; 34; 35; 37; 39; 40




- Calculate the mean.

- Identify the median.

- Identify the mode(s).


:::





:::exercise

Given the following set of data points:
\[1,X, 5,3,1\]
where $X$ is an unknown number. 



- If we know that the mean is 3, what are the possible values of $X$?

- If we know that the median is 3, what are the possible values of $X$?

- If we know that one of the modes is 1, what are the possible values of $X$?


:::
