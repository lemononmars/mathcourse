---
week: 9
order: 2
slug: "inverse"
title: "Inverse Problem"
source: "tex/lecture09.tex"
---

## Inverse Problem

Alternatively, we might be interested in asking the question

:::note

Find the value $z$ such that $P(Z < z) = 0.8$.

:::

This corresponds to these types of questions:

:::slide



- If I want to be at top 10\% of the server, what score should I aim for?

- A factory machine discards 5\% of the products that differ too much from the standard quality.

- This ads can only target one-fourth of the people around the average age. For my ads to be most effective, what age range should I select?


:::






:::example



- Find $z_1$ such that $P(0 < Z < z_1) = 0.25$.

- Find $z_2$ such that $P(Z > z_2) = 0.2$.

- Find $z_3$ such that $P(Z \leq z_3) = 0.1$.


:::


:::solution




:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 5, xscale = 2]
\fill[fill = red!20, domain = -2.5:-1.2] (-2.5,0) --  plot (\x,{gauss(\x,0,1)}) -- (-1.2,0) -- cycle;
\fill[fill = blue!20, domain = 0:0.6] (0,0) -- plot (\x,{gauss(\x,0,1)}) -- (0.6,0) -- cycle;
\fill[fill = green!20, domain = 0.8:2.5] (0.8,0) -- plot (\x,{gauss(\x,0,1)}) -- (2.5,0) -- cycle;
\draw[domain = -2.5:2.5] plot (\x,{gauss(\x,0,1)});
\draw[<->] (-2.5,0) -- (2.5,0);
\foreach \x/\text in {-2/-2,-1.2/z_1,0/0,0.6/z_2,2/2}
{
\draw (\x, 0.02) --+ (0, -0.04) node[below] {$\text$};
}
\draw (0.8, 0.02) --+ (0, -0.04) node[below right] {$z_3$};
\node[red] at (-1.6, 0.05) {0.1};
\node[blue] at (0.3, 0.1) {0.25};
\node[green] at (1.3, 0.08) {0.2};
\end{tikzpicture}
:::


*A graph for example \theex*


:::





:::solution




:::tikz TikZ diagram
\begin{tikzpicture}[yscale = 5, xscale = 2]
\fill[fill = red!20, domain = -2.5:-1.2] (-2.5,0) --  plot (\x,{gauss(\x,0,1)}) -- (-1.2,0) -- cycle;
\fill[fill = blue!20, domain = 0:0.6] (0,0) -- plot (\x,{gauss(\x,0,1)}) -- (0.6,0) -- cycle;
\fill[fill = green!20, domain = 0.8:2.5] (0.8,0) -- plot (\x,{gauss(\x,0,1)}) -- (2.5,0) -- cycle;
\draw[domain = -2.5:2.5] plot (\x,{gauss(\x,0,1)});
\draw[<->] (-2.5,0) -- (2.5,0);
\foreach \x/\text in {-2/-2,-1.2/z_1,0/0,0.6/z_2,2/2}
{
\draw (\x, 0.02) --+ (0, -0.04) node[below] {$\text$};
}
\draw (0.8, 0.02) --+ (0, -0.04) node[below right] {$z_3$};
\node[red] at (-1.6, 0.05) {0.1};
\node[blue] at (0.3, 0.1) {0.25};
\node[green] at (1.3, 0.08) {0.2};
\end{tikzpicture}
:::



By using a calculator (or the web app), we see that $z_1 \approx 0.674 $, $z_2 \approx 0.841$, and $z_3 \approx -1.28$.

:::
