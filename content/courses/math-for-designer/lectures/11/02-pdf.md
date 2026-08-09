---
week: 11
order: 2
slug: "pdf"
title: "Probability Distribution Function"
source: "tex/lecture11.tex"
---

## Motivation


:::remark



- Denote the probability that an outcome takes on the value $k$ as $P(X=k)$, or $P(k)$ in short.

- Since we can find $P(X = k)$ for all possible values $k$, then it is helpful to plot a graph of $k$ versus $P(k)$


- Such graph is called a **function**


:::





## Probability Distribution Function (PDF)


:::definition

A discrete **probability distribution function** has two characteristics:


- Each probability is between zero and one, inclusive.

- The sum of the probabilities is 1.


:::






:::example

Let $X$ be the value of a single die roll. \pa


- For all possible values $k$, find $P(X=k)$

- Find (a) $P(X=1)$ (b) $P(X\geq 5)$ (c) $P(X \text{ is an odd number})$


:::


:::solution

\begin{table}[h!]
\begin{tabular}{c |c || c | c| c| c| c | c}
Outcome & $x$ & 1 & 2 & 3 & 4 & 5 & 6 

\hline
Probability &$ P(X=x)$ & $\frac{1}{6}$ & $\frac{1}{6}$ & $\frac{1}{6}$ & $\frac{1}{6}$ & $\frac{1}{6}$ & $\frac{1}{6}$ 
\end{tabular}
\end{table}
\pa 


- $P(X=1) \pa = \frac{1}{6}$ \pa

- $P(X \geq 5) \pa = P(5) + P(6) \pa = \frac{2}{6}$ \pa

- $P(X \text{ is an odd number}) \pa = P(1) + P(3) + P(5) \pa = \frac{3}{6}$ \pa


:::






:::example

Let $Y$ be the sum of values when rolling two dice. 


- For all possible values $k$, find $P(Y=k)$

- Find (a) $P(Y=3)$ (b) $P(Y \leq 4)$ (c) $P(Y \text{ is a square})$


:::


:::solution

First, list out all $6 \times 6 = 36$ possible outcomes.
\begin{table}[h!]
\renewcommand{\arraystretch}{1.2}
\begin{tabular}{c||c|c|c|c|c|c}
Y & 1 & 2 & 3 & 4 & 5 & 6 

\hline
\hline
1 & 2 & 3 & 4 & 5 & 6 & 7 

\hline
2 & 3 & 4 & 5 & 6 & 7 & 8 

\hline
3 & 4 & 5 & 6 & 7 & 8 & 9 

\hline
4 & 5 & 6 & 7 & 8 & 9 & 10 

\hline
5 & 6 & 7 & 8 & 9 & 10 & 11 

\hline
6 & 7 & 8 & 9 & 10 & 11 & 12
\end{tabular}
\end{table}

:::






:::solution

Then, we can find the probabilities of each outcome as follows.
\begin{table}[h!]
\begin{tabular}{c || c | c| c| c| c | c|c|c|c|c|c}
$x$ & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 \pa 

\hline
$ P(Y=x)$ & $\tfrac{1}{36}$ & $\tfrac{2}{36}$ & $\tfrac{3}{36}$ & $\tfrac{4}{36}$ & $\tfrac{5}{36}$ & $\tfrac{6}{36}$ & $\tfrac{5}{36}$ & $\tfrac{4}{36}$ & $\tfrac{3}{36}$ & $\tfrac{2}{36}$ & $\tfrac{1}{36}$ 
\end{tabular}
\end{table} \pa
Thus, we have. \pa
\begin{eqnarray*}
P(Y=3) \pa &= &\frac{2}{36} 

P(Y \leq 4) \pa &=& P(2) + P(3) + P(4) \pa = \frac{1}{36} + \frac{2}{36} + \frac{3}{36} \pa = \frac{6}{36}
\pa
P(Y \text{ is a square}) \pa &=& P(4) + P(9) \pa = \frac{7}{36}
\end{eqnarray*}

:::



\iffalse

\begin{table}[h!]
\begin{tabular}{c || c | c| c| c| c | c|c|c|c|c|c}
$k$ & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 \pa 

\hline
$ P(Y=k)$ & $\frac{1}{36}$ & $\frac{2}{36}$ & $\frac{3}{36}$ & $\frac{4}{36}$ & $\frac{5}{36}$ & $\frac{6}{36}$ & $\frac{5}{36}$ & $\frac{4}{36}$ & $\frac{3}{36}$ & $\frac{2}{36}$ & $\frac{1}{36}$ 
\end{tabular}
\end{table} \pa


:::exercise

Compute the following


- $P(Y = 7)$

- $P(Y \geq 8)$

- $P(Y \mbox{ is even})$

- $P(Y \mbox{ is divisible by 3})$


:::


\fi
