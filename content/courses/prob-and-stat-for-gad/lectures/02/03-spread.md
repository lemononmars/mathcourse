---
week: 2
order: 3
slug: "spread"
title: "Spread"
source: "tex/lecture02.tex"
---

## Spread of a distribution


:::figure spread
:::





## This one actually


:::figure data_spread_comparison — Comparison of different sets of data. Which color spreads the most? the least?
:::





## Formal Definition



- An important characteristic of any set of data is the variation in the data. 

- In some data sets, the data values are concentrated closely near the mean.

- In other data sets, the data values are more widely spread out from the mean.


:::slide

Some common spreads are:


- Range

- Inter-quartile range

- Mean absolute deviation

- Mean squared deviation

- Variance and standard deviation


:::





## Spread - 1. Range

Given a set of ordered data points
\[ X = 8, 9, 10, 12, 16,\]
we want to measure how spread they are (i.e. are they apart from each other? are they clustered?) 


:::note Definition

Range = largest - smallest observation

:::


:::slide

From the given data, the range is $16-8=8$.

**Issue**: ``outliers''

:::





## Spread - 2. The inter-quartile range (IRQ)


:::note Definition

Let $Q_1$ be the 25th percentile (called the *lower* quartile), and $Q_3$ be the 75th percentile (called the *upper* quartile). Then,

IQR = $Q_3 - Q_1$

:::

\[ X = 8, 9, 10, 12, 16\]

:::slide

The 25th percentile is $\frac{(5+1)(25)}{100} = 1.5$, so it's half way between $8$ and $9$, thus $8.5$. 

The 75th percentile is $\frac{(5+1)(75)}{100} = 4.5$, so it's half way between $10$ and $16$, thus $13$. 

Therefore, the inter-quartile range is $15-8.5 = 4.5$.

**Issue**: still ``outliers''

:::





## Spread - 3. Mean absolute deviation (MAD)


:::note Definition

Mean Absolute Deviation (MAD) $\equiv \frac{1}{n} \sum |X - \bar{X}|$

:::

\[ X = 8, 9, 10, 12, 16\]

:::slide

The mean is $\frac{1}{5}(8+9+12+10+16) = 11$. Thus, the mean absolute deviations equals 
\begin{eqnarray*}
&&\frac{1}{5}\left(|8-11| + |9-11| + |10-11| + |12-11| + |16-11|\right)

&=& \frac{1}{5}(3+2+1+1+5) = 2.4.
\end{eqnarray*}

:::





## Spread - 4. Mean squared deviation (MSD)


:::note Definition

Mean squared deviation (MSD) $\displaystyle \equiv \frac{1}{n} \sum (X - \bar{X})^2$

:::

\[ X = 8, 9, 10, 12, 16\]

:::slide

The mean is $\frac{1}{5}(8+9+12+10+16) = 11$. Thus, the mean squared deviations equals 
\begin{eqnarray*}
&& \frac{1}{5}\left((8-11)^2 + (9-11)^2 + (10-11)^2 + (12-11)^2 + (16-11)^2\right) 

&=& \frac{1}{5}(9+4+1+1+25) = 8.
\end{eqnarray*}

:::





## Spread - 5. Variance and standard deviation (SD)

The most ``popular spread''

:::note Definition

Standard deviation
\[s \equiv \sqrt{\frac{\sum (X - \bar{X})^2}{n}}\]

Variance 
\[s^2 \equiv \frac{\sum (X - \bar{X})^2}{n} \]

:::




\[ X = 8, 9, 10, 12, 16\]

:::slide

The variance equals 
\begin{eqnarray*}
&&\frac{1}{5}\left((8-11)^2 + (9-11)^2 + (10-11)^2 + (12-11)^2 + (16-11)^2\right) 

&=& \frac{1}{5}(9+4+1+1+25) 

&=& 8. 
\end{eqnarray*}
Then, the standard deviation is $s = \sqrt{8} \sim 2.828$

:::





:::exercise

Given the following set of data points:
\[2,2,3,5,8\]
For each of the following spreads, write the formula and compute it.



- Range

- Inter-quartile range (IRQ)

- Mean Average Difference (MAD)

- Mean Squared Difference (MSD)

- Standard Deviation (SD)


:::
