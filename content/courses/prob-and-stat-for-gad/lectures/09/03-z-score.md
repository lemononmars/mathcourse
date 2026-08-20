---
week: 9
order: 3
slug: "z-score"
title: "Z-Score"
source: "tex/lecture09.tex"
---

## Normal Distributions

Recall that normal distributions can take various values of $\mu$ and $\sigma$.

:::figure l05i03 — Examples of normal distributions
:::







:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 5]
\begin{scope}[xscale =2, yscale = 0.5]
\draw[<->] (-2.5,0) -- (2.5,0);
\draw[domain = -2.5:2.5] plot (\x,{gauss(\x,0,1)});
\node at (2,0.3) {$N(\mu,\sigma)$};
\foreach \x/\text in {-2/\mu-2\sigma,-1/\mu-\sigma,0/\mu,1/\mu+\sigma,2/\mu+2\sigma}
{
\draw (\x, 0.02) --+ (0, -0.04) node[below, scale = 0.8] {$\text$};
}
\end{scope}
\draw[blue, ->] (0,-0.1) -- (0, -0.15);
\begin{scope}[yshift = -0.6cm]
\draw[<->] (-2.5,0) -- (2.5,0);
\draw[domain = -2.5:2.5] plot (\x,{gauss(\x,0,1)});
\node at (2,0.3) {$N(0,1)$};
\foreach \x in {-2,-1,0,1,2}
{
\draw (\x, 0.02) --+ (0, -0.04) node[below] {\x};
}
\end{scope}
\end{tikzpicture}
:::


*The graph of any normal distributions (above) transformed and compared to the standard normal distribution (below).*





## Definition of Z-Score


:::theorem

If X is a normally distributed random variable and $ X \sim N(\mu, \sigma)$, then the **z-score** of $x$ is defined as

\begin{equation} 
z = \frac{x-\mu}{\sigma} 
\end{equation}

:::

The z-score tells you how many standard deviations the value $x$ is above (to the right of) or below (to the left of) the mean, $\mu$.







:::tikz TikZ diagram
\begin{tikzpicture}[xscale = 1.5]
\draw[<->] (-2.5,0) -- (2.5,0) node [right] {$x$};
\foreach \x/\text in {-2/\mu-2\sigma,-1/\mu-\sigma,0/\mu,1/\mu+\sigma,2/\mu+2\sigma}
{
\draw (\x, 0.2) --+ (0, -0.4) node[below, scale = 0.8] {$\text$};
}
\draw[blue, ->] (0, -1) -- (0, -1.5);
\begin{scope}[yshift = -2cm]
\draw[<->] (-2.5,0) -- (2.5,0) node[right] {$z$};
\foreach \x in {-2,-1,0,1,2}
{
\draw (\x, 0.2) --+ (0, -0.4) node[below] {\x};
}
\end{scope}
\end{tikzpicture}
:::


*Comparing $x$ and its z-score.*


By this definition, we have:


- The z-score for $x=\mu$ is $0$.

- The z-score for $x=\mu+\sigma$ is $1$.

- The z-score for $x=\mu+2\sigma$ is $2$.

- The z-score for $x=\mu-\sigma$ is $-1$.

- The z-score for $x=\mu-2\sigma$ is $-2$.






:::example

Suppose $X \sim N(5,6)$. Find the z-score for $x=17$.

:::


:::solution

This says that X is a normally distributed random variable with mean $**\mu = 5**$ and standard deviation $**\sigma = 6**$. Suppose $x = 17$. Then:

\[z=\frac{x-**\mu**}{**\sigma**}=\frac{17 - **5**}{**6**}=2\]
This means that $x = 17$ is **two standard deviations** $(2\sigma)$ above or to the right of the mean $\mu = 5$.



:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 5, xscale = 2]
\draw[<->] (-2.5,0) -- (2.5,0);
\draw[domain = -2.5:2.5] plot (\x,{gauss(\x,0,1)});
\node at (2,0.3) {$N(5,6)$};
\foreach \x [evaluate = \x as \text using {\x*6+5}] in {-2,-1,0,1,2}
{
\draw (\x, 0.02) --+ (0, -0.04) node[below] {\text};
}
\draw[red, ->] (2,0.1) --(2,0);
\end{tikzpicture}
:::


*The z-score of 17 in normal distribution $N(5, 6)$*


:::






:::example

Suppose $X \sim N(12,3)$. Find the z-score for $x=1$.

:::


:::solution

This says that X is a normally distributed random variable with mean $**\mu = 12**$ and standard deviation $**\sigma = 3**$. Suppose $x = 1$. Then:

\[z=\frac{x-**\mu**}{**\sigma**}=\frac{1 - **12**}{**3**}= -\frac{11}{3} \]
This means that $x = 11$ is about **four standard deviations** $(\approx 4\sigma)$ below or to the left of the mean $\mu = 12$.



:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 5, xscale = 2]
\draw[<->] (-2.5,0) -- (2.5,0);
\draw[domain = -2.5:2.5] plot (\x,{gauss(\x,0,1)});
\node at (2,0.3) {$N(12,3)$};
\foreach \x [evaluate = \x as \text using {\x*3+12}] in {-2,-1,0,1,2}
{
\draw (\x, 0.02) --+ (0, -0.04) node[below] {\text};
}
\draw[red, ->] (-3.3,0.1) --(-3.3,0);
\end{tikzpicture}
:::


*The z-score of 1 in normal distribution $N(12,3)$*


:::





:::example

You took a physics exam and a chemistry exam and got 65 points and 80 points respectively. The physics exam has an average of 55 and a standard deviation of 2, and the chemistry exam has an average of 68 and a standard deviation of 3. Assuming that scores are normally distributed, which exam did you perform better relatively to the classes? 

:::


:::solution

We can compare our two scores using z-scores. For the physics exam, your z-score is
\[ z = \frac{x - \mu}{\sigma} = \frac{65-55}{2}= 5\]
Likewise, your z-score for the chemistry exam is
\[z = \frac{x - \mu}{\sigma} = \frac{80-68}{3} = 4\]
Since your z-score for physics exam is higher than that for chemistry exam, you performed relatively better in physics.

:::
