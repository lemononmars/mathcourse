---
week: 2
order: 1
slug: "location"
title: "Location"
source: "tex/lecture02.tex"
---

## Quartiles

[Quartiles](https://openstax.org/books/introductory-statistics/pages/2-3-measures-of-the-location-of-the-data) are numbers that separate the data into quarters. Quartiles may or may not be part of the data. 

:::note Definition



- About one-fourth of the data falls on or below the first quartile, $Q_1$.

- About half of the data falls on or below the second quartile, $Q_2$.

- About three-fourths of the data falls on or below the third quartile, $Q_3$.


:::



:::tikz TikZ diagram
\begin{tikzpicture}
\draw[<->] (0,0) -- (12,0);
\draw (0,-0.5) --++ (0,1) node[above] {Min};
\draw (3,-0.5) --++ (0,1) node[above] {$Q_1$};
\draw (6,-0.5) --++ (0,1) node[above] {$Q_2$};
\draw (9,-0.5) --++ (0,1) node[above] {$Q_3$};
\draw (12,-0.5) --++ (0,1) node[above] {Max};
\end{tikzpicture}
:::


*Quartiles divide the data into quarters.*




Find the quartiles of the data set:
\[1, 1, 2, 4, 6, 9, 13\]

:::slide



- The second quartile ($Q_2$) is four. 
\[1, 1, 2, **4**, 6, 9, 13\] 

- The lower half of the data are $1,1,2$. The middle value of the lower half is the first quartile $(Q_1)$, which is one so $Q_1 = 1$. 
\[1, **1**, 2, **4**, 6, 9, 13\] 

- The upper half of the data are $6,9,13$. The middle value of the upper half is the third quartile $(Q_3)$, which is nine. 
\[1, **1**, 2, **4**, 6, **9**, 13\]


:::




## Finding Quartiles


:::definition

Given a data set sorted from lowest to highest, the location of the $i$-th quartile ($i = 1,2,3$) is 
\begin{equation}
\frac{i}{4}(n+1)
\end{equation}
where $n$ is the number of data points.



- If the location is an integer, the $i$-th quartile is the value at that position.

- If the location is not an integer, the $i$-th quartile is the value of the midpoint between the values surrounding the location.


:::





:::example

Find the quartiles of the data set:
\[1, 3, 5, 16, 23, 25, 28, 29, 33\]

:::


:::solution



- The location of the first quartile is $\frac{1}{4}(9+1) = \frac{10}{4} = 2.5$. Since this is not an interger, we find the midpoint between the 2nd and 3rd values. Hence, $Q_1 = \frac{3+5}{2} = 4$

- The location of the second quartile is $\frac{2}{4}(9+1) = \frac{20}{4} = 5$. Since this is an integer, $Q_2$ is the 5th value, which is 23.

- The location of the third quartile is $\frac{3}{4}(9+1) = \frac{30}{4} = 7.5$. Since this is not an interger, we find the midpoint between the 7th and 8th values. Hence, $Q_3 = \frac{28+29}{2} = 28.5$


:::





## Percentile

[Percentiles](https://openstax.org/books/introductory-statistics/pages/2-3-measures-of-the-location-of-the-data) divide ordered data into hundredths.

:::definition

The $P$th **percentile** of a group of numbers is that value below which lie $P\%$ of the numbers in the group.

:::



:::definition

The position of the $k$-th percentile is given by 
\[\frac{(n+1)k}{100}\]
where $n$ is the number of data points.
\tdblower


- If the location is an integer, the $k$-th percentile is the value at that position.

- If the location is not an integer, the $k$-th percentile is the value of the midpoint between the values surrounding the location*.

* Some textbooks round up the location to the nearest integer, or use the weighted average. All methods are valid, but they will give different results.

:::





:::example

Given the following data set:
\[1, 1, 2, 2, 4, 5, 6, 6, 9\]
Find the 20th, 70th, and 86th percentiles.

:::


:::solution



- The position of the 20th percentile is $\frac{(9+1)(20)}{100} = \frac{200}{100} = 2$, so the 20th percentile is the second value, which is 2.

- The position of the 70th percentile is $\frac{(9+1)(70)}{100} = \frac{700}{100} = 7$, so the 70th percentile is the seventh value, which is 6.

- The position of the 86th percentile is $\frac{(9+1)(86)}{100} = \frac{860}{100} = 8.6$. Since it is not an integer, we consider the middle between the 8th and the 9th value, which is $\frac{6+9}{2} = 7.5$. Thus, the 86th percentile is 7.5.


:::






## Remark



- Percentiles are useful for comparing values on two different scales.

- The median is equal to the second quartile $(Q_2)$ and the 50th percentile. 


:::figure fall_guys_percentile — Be the Best Beans! Or at least above the 30th percentile
:::





:::exercise

Listed are 29 ages for Academy Award winning best actors in order from smallest to largest.

18; 21; 22; 25; 26; 27; 29; 30; 31; 33; 36; 37; 41; 42; 47; 52; 55; 57; 58; 62; 64; 67; 69; 71; 72; 73; 74; 76; 77




- Find the first quartile, the second quartile, and the third quartile.

- Find the 40th percentile.

- Find the 78th percentile.


:::
