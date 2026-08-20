---
week: 9
order: 4
slug: "empirical"
title: "The Empirical Rule"
source: "tex/lecture09.tex"
---

All normal distributions share the common important feature: given two z-scores, the area between those z-scores is equal.

:::figure empirical_rule_comparison — Comparison between two normal distributions
:::





## Relationship between Z-scores and Areas




:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 10,xscale = 1.5]
\foreach \a/\b/\color in {-3.5/-3/yellow, -3/-2/blue, -2/-1/green, -1/1/red, 1/2/green, 2/3/blue, 3/3.5/yellow}
{
\fill[fill = \color!20, domain = \a:\b] (\a,0) --  plot (\x,{gauss(\x,0,1)}) -- (\b,0) -- cycle;
}
\draw[domain = -3.5:3.5, smooth] plot (\x,{gauss(\x,0,1)});
\draw[<->] (-3.5,0) -- (3.5,0);
\foreach \x/\text in {-3/\mu-3\sigma,-2/\mu-2\sigma,-1/\mu-\sigma,0/\mu,1/\mu+\sigma,2/\mu+2\sigma,3/\mu+3\sigma}
{
\draw (\x, 0.01) --+ (0, -0.02) node[below] {$\text$};
}
\node at (0, 0.15) {34\%};
\node at (-1.5, 0.05) {13.5\%};
\node at (1.5, 0.05) {13.5\%};
\node at (-2.5, 0.05) {2.35\%};
\node at (2.5,0.05) {2.35\%};
\node at (-3.5, 0.05) {0.15\%};
\node at (3.5,0.05) {0.15\%};
\end{tikzpicture}
:::


*Relationship between z-scores and areas under the curve.*







:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 10,xscale = 1.5]
\foreach \a/\b/\color in {-3.5/-3/yellow, -3/-2/blue, -2/-1/green, -1/1/red, 1/2/green, 2/3/blue, 3/3.5/yellow}
{
\fill[fill = \color!20, domain = \a:\b] (\a,0) --  plot (\x,{gauss(\x,0,1)}) -- (\b,0) -- cycle;
}
\draw[domain = -3.5:3.5, smooth] plot (\x,{gauss(\x,0,1)});
\draw[<->] (-3.5,0) -- (3.5,0);
\foreach \x/\text in {-3/\mu-3\sigma,-2/\mu-2\sigma,-1/\mu-\sigma,0/\mu,1/\mu+\sigma,2/\mu+2\sigma,3/\mu+3\sigma}
{
\draw (\x, 0.01) --+ (0, -0.02) node[below] {$\text$};
}
\draw[<->] (-1, 0.15) --+ (2,0) node [above, black, pos =0.5] {68\%};
\draw[<->] (-2, 0.07) --+ (4, 0) node [above, black,pos =0.5] {95\%};
\draw[<->] (-3, 0.01) --+ (6,0) node [above, black,pos =0.5] {99.7\%};
\end{tikzpicture}
:::


*The Empirical Rule (68-95-99.7)*





## The Empirical Rule


:::theorem

If X is a random variable and has a normal distribution with mean $\mu$ and standard deviation $\sigma$, then the Empirical Rule states the following:



- About 68\% of the $x$ values lie between $-1\sigma$ and $+1\sigma$ of the mean $\mu$ (within one standard deviation of the mean).

- About 95\% of the $x$ values lie between $-2\sigma$ and $+2\sigma$ of the mean $\mu$ (within two standard deviations of the mean).

- About 99.7\% of the $x$ values lie between $-3\sigma$ and $+3\sigma$ of the mean $\mu$ (within three standard deviations of the mean). 


:::

Notice that almost all the $x$ values lie within three standard deviations of the mean.
