---
week: 10
order: 2
slug: "confidence-interval"
title: "Confidence Interval"
source: "tex/lecture10.tex"
---

## Confidence Interval for Population Mean \mu


:::definition

A $95\%$ confidence interval is an **interval** in which we are 95\% **confident** that it contains the parameter. 

A $95\%$ confidence interval for the population mean $\mu$ when $\sigma$ is known and sampling is done from a normal population, or a large sample is used, is the interval
\begin{equation}
\left[ \bar{x} - 1.96\frac{\sigma}{\sqrt{n}}, \bar{x} + 1.96\frac{\sigma}{\sqrt{n}}\right].
\end{equation} 
Sometimes, we will use the shorthand
\[\overline{x} \pm 1.96\frac{\sigma}{\sqrt{n}}.\]

:::







:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 10,xscale = 1.5]
\filldraw[draw = black, fill = green!20, domain = -1.96:1.96] (-1.96,0) --  plot (\x,{gauss(\x,0,1)}) -- (1.96,0) -- cycle;
\draw[domain = -3.5:3.5, smooth] plot (\x,{gauss(\x,0,1)});
\draw[<->] (-3.5,0) -- (3.5,0);
\node at (2, 0.2) {$N\left(\bar{x}, \frac{\sigma}{\sqrt{n}}\right)$};
\draw (-1.96, 0.02) --+ (0,-0.04) node [below] {$\bar{x} - 1.96 \frac{\sigma}{\sqrt{n}}$};
\draw (0, 0.02) --+ (0,-0.04) node [below] {$\bar{x}$};
\draw (1.96, 0.02) --+ (0,-0.04) node [below] {$\bar{x} + 1.96 \frac{\sigma}{\sqrt{n}}$};
\draw[<->] (-1.96, 0.03) --+ (3.92,0) node[above, pos = 0.5] {95\%};
\end{tikzpicture}
:::


*The region under a normal distribution $N\left(\bar{x*, \frac{\sigma}{n}\right)$ between z-scores of -1.96 and 1.96 is approximately 0.95}






:::example

Suppose we use a sample size $n = 100$ and we get a sample mean $\overline{x} = 122$. If the population standard deviation is known to be $\sigma = 20$, find the $95\%$ confidence interval.

:::


:::solution

Simply use the given formula:
\[ \overline{x} \pm 1.96\frac{\sigma}{\sqrt{n}} = 122 \pm 1.96\left( \frac{20}{\sqrt{100}}\right) = 122 \pm 3.92\]
Thus, we may be $95\%$ confident that the unknown population mean $\mu$ lies in the interval $[118.08, 125.92]$ (i.e. anywhere between the values $118.08$ and $125.92$.)

:::







:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 10,xscale = 1.5]
\filldraw[draw = black, fill = green!20, domain = -1.96:1.96] (-1.96,0) --  plot (\x,{gauss(\x,0,1)}) -- (1.96,0) -- cycle;
\draw[domain = -3.5:3.5, smooth] plot (\x,{gauss(\x,0,1)});
\draw[<->] (-3.5,0) -- (3.5,0);
\node at (2, 0.2) {$N\left(100, 2\right)$};
\draw (-1.96, 0.02) --+ (0,-0.04) node [below] {$118.09$};
\draw (0, 0.02) --+ (0,-0.04) node [below] {$122$};
\draw (1.96, 0.02) --+ (0,-0.04) node [below] {$125.92$};
\draw[<->] (-1.96, 0.03) --+ (3.92,0) node[above, pos = 0.5] {95\%};
\end{tikzpicture}
:::


*A graph for example \theex*




## Deriving the Formula

We can turn the confidence interval problem into a math equation as follows: 
:::slide
find the margin of error $E$ such that
\[ P(|\bar{x} - \mu| < E) = 0.95.\]
Since the Central Limit Theorem tells us that $\bar{x}$ is normally distributed, we can use the formula from previous lecture
\[ z = \frac{\bar{x} - \mu}{S}.\]
where $S = \frac{\sigma}{\sqrt{n}}$. The reason why we can use the sample standard deviation $S$ to estimate the population standard deviation $\sigma$ using this formula is beyond the scope of this class. Eventually, this turns the equation into
\[ P(-E < z < E) = 0.95\]

:::





## General definition


:::definition

We define $z_{\alpha/2}$ as the $z$ value that cuts off a right-tail area of $\alpha/2$ under the standard normal curve. Formally, we have
\begin{equation}
P(Z > z_{\alpha/2}) = \frac{\alpha}{2}
\end{equation}

:::




:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 5,xscale = 1.5]
\filldraw[draw = black, fill = green!20, domain = -1.96:1.96] (-1.96,0) --  plot (\x,{gauss(\x,0,1)}) -- (1.96,0) -- cycle;
\filldraw[draw = black, fill = blue!20, domain = -3.5:-1.96] (-3.5,0) --  plot (\x,{gauss(\x,0,1)}) -- (-1.96,0) -- cycle;
\filldraw[draw = black, fill = blue!20, domain = 1.96:3.5] (1.96,0) --  plot (\x,{gauss(\x,0,1)}) -- (3.5,0) -- cycle;
\draw[domain = -3.5:3.5, smooth] plot (\x,{gauss(\x,0,1)});
\draw[<->] (-3.5,0) -- (3.5,0);
\node at (3,0.5) {$N(0,1)$};
\draw (-1.96, 0.02) --+ (0,-0.04) node [below] {$-z_{\alpha/2}$};
\draw (1.96, 0.02) --+ (0,-0.04) node [below] {$z_{\alpha/2}$};
\draw[<->] (-1.96, 0.03) --+ (3.92,0) node[above, pos = 0.5] {$1-\alpha$};
\node at (-2.5, 0.1) {$\frac{\alpha}{2}$};
\node at (2.5,0.1) {$\frac{\alpha}{2}$};
\end{tikzpicture}
:::


*Definition of $z_{\alpha/2*$}





## Confidence interval for Population Mean \mu with Known Population S.D. \sigma


:::definition

A $(1-\alpha)$ confidence interval for $\mu$ when $\sigma$ is known and sampling is done from a normal population, or a large sample is used, is
\begin{equation}
\bar{X} \pm Z_{\alpha/2}\frac{\sigma}{\sqrt{n}}.
\end{equation}

:::


:::figure l07i04.png
:::





## Calculating the Confidence Interval

To construct a confidence interval estimate for an unknown population mean, we need data from a random sample. The steps to construct and interpret the confidence interval are:

:::slide


:::remark



- Calculate the sample mean $\bar{x}$ from the sample data. Remember, in this section we already know the population standard deviation $\sigma$.

- Find the z-score that corresponds to the confidence level.

- Calculate the error bound.

- Construct the confidence interval.

- Write a sentence that interprets the estimate in the context of the situation in the problem. (Explain what the confidence interval means, in the words of the problem.)


:::


:::






:::example

Suppose we have a sample size $n = 20$ with a sample mean $\bar{x} = 175$ and known standard deviation $\sigma = 20$. Find the $90\%$ confidence interval.

:::



:::solution

First we set 
\[1-\alpha = 0.90 \rightarrow \alpha = 0.1.\]
Then we find $z$ such that $P(Z > z) = \frac{\alpha}{2} = 0.05$ or equivalently $P(0 < Z < z) = 0.5 - 0.05 = 0.45$. Looking up the z-table, we get $z = **1.64**$. Thus, we have
\[ \bar{X} \pm Z_{\alpha/2}\frac{\sigma}{\sqrt{n}} = 175 \pm **1.64** \frac{20}{\sqrt{20}} \approx 175 \pm 6.2 = [168.8, 181.2]\] 
Therefore, we can say that with $90\%$ confidence, the population mean is in the interval $[168.9, 181.2]$

:::






:::example

Suppose we have a sample size $n = 20$ with a sample mean $\bar{x} = 175$ and known standard deviation $\sigma = 20$. Find the $95\%$ confidence interval.

:::



:::solution

We set 
\[1 - \alpha = 0.95 \rightarrow \alpha = 0.05.\]
Then we find $z$ such that $P(Z > z) = \frac{\alpha}{2} = 0.025$ or equivalently $P(0 < Z < z) = 0.5 - 0.025 = 0.475$. The z table gives the value $z = **1.96**$. Thus, 
\[ \bar{X} \pm Z_{\alpha/2}\frac{\sigma}{\sqrt{n}} = 175 \pm **1.96** \frac{20}{\sqrt{20}} \approx 175 \pm 8.76 = [166.24, 183.76]\] 
Therefore, we can say that with $95\%$ confidence, the population mean is in the interval $ [166.24, 183.76]$

:::







:::example

Suppose we have a sample size $n = 20$ with a sample mean $\bar{x} = 175$ and known standard deviation $\sigma = 20$. Find the $99\%$ confidence interval.

:::



:::solution

We set 
\[1 - \alpha = 0.99 \rightarrow \alpha = 0.01.\] 
Then we find $z$ such that $P(Z > z) = \frac{\alpha}{2} = 0.005$ or equivalently $P(0 < Z < z) = 0.5 - 0.005 = 0.495$. The z table gives the value $z = **2.57** $. Thus, 
\[ \bar{X} \pm Z_{\alpha/2}\frac{\sigma}{\sqrt{n}} = 175 \pm **2.57** \frac{20}{\sqrt{20}} = 175 \pm 11.49 = [163.51, 186.49]\] 
Therefore, we can say that with $99\%$ confidence, the population mean is in the interval $[163.51, 186.49]$

:::





## Notes



- The higher the confidence level is, the larger the interval becomes. 

- Since the normal distribution curve extends to infinity without touching zero, $P(Z > z) = 0$ has no solution for $z$. This means we can never say that ``We are 100\% confidence that...'' 

- $95\%$ is the most common confidence level because it gives both decent confidence level and not-too-wide interval.


:::figure l13memeworkeverytime — Works. Every. Time.
:::
