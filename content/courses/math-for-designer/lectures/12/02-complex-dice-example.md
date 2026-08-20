---
week: 12
order: 2
slug: "complex-dice-example"
title: "Complex Dice Example"
source: "tex/lecture12.tex"
---

## Risk



- Attacker and Defender roll some dice. 

- Sort dice on each side from highest to lowest.

- Compare highest pair of dice. The smaller value loses 1 troop, when tied the attacker loses 1 troop.






:::figure dice_risk.png — Dice combat in Risk
:::





:::example

If attacker and defender each rolls a single die. Find the expected win for the attacker.

:::


:::solution

Create a table listing all possible outcomes.



:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.5, yscale = -1]
\draw (0,0) grid (7,7);
\draw[very thick] (1,0) -- (1,7) (0,1) -- (7,1);
\begin{scope}[xshift = 0.5cm, yshift = 0.5cm]
\node[red] at (3,-1) {Attacker};
\node[blue, rotate = 90] at (-1,3) {Defender};
\foreach \x in {1,2,3,4,5,6}
{
\node[red] at (\x, 0) {$\x$};
\node[blue] at (0, \x) {$\x$};
}
\foreach \attack in {1,2,3,4,5,6}
{
	\foreach \defend in {1,2,3,4,5,6}
	{
		\ifnum\attack > \defend
			\node[red] at (\attack, \defend) {A};
		\else
			\node[blue] at (\attack, \defend) {D};
		\fi 
	}
}
\end{scope}
\end{tikzpicture}
:::



We see that the attacker wins 15 out of 36 equally likely outcomes. Therefore, the expected win is $E(X) = \tfrac{15}{36} = \tfrac{5}{12}$ for each combat.

:::





:::example

If attacker rolls two dice and defender rolls one die. Find the expected loss for the attacker.

:::


:::solution

First, let $X$ be the maximum of two dice for the attacker and determine $P(X)$ for each possible value. 



:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.5, yscale = -1]
\draw (0,0) grid (7,7);
\draw[very thick] (1,0) -- (1,7) (0,1) -- (7,1);
\begin{scope}[xshift = 0.5cm, yshift = 0.5cm]
\node[orange] at (3,-1) {Attacker's first die};
\node[orange, rotate = 90] at (-1,3) {Attacker's second die};
\foreach \x in {1,2,3,4,5,6}
{
\node[orange] at (\x, 0) {$\x$};
\node[orange] at (0, \x) {$\x$};
}
\foreach \first in {1,2,3,4,5,6}
{
	\foreach \second in {1,2,3,4,5,6}
	{
		\ifnum\first > \second
			\node[red] at (\first, \second) {\first};
		\else
			\node[red] at (\first, \second) {\second};
		\fi 
	}
}
\end{scope}

\begin{scope}[xshift = 8cm, yshift = 2cm, scale = 1.5]
\draw (0,0) grid (7,2);
\node[red] at (3.5, -1) {Attacker's maximum};
\begin{scope}[xshift = 0.5cm, yshift = 0.5cm]
\node at (0,0) {$k$};
\node at (0,1) {$P(k)$};
\foreach \x /\p in {1/1,2/3,3/5,4/7,5/9,6/11}
{
\node[red] at (\x, 0) {$\x$};
\node at (\x,1) {$\frac{\p}{36}$};
}
\end{scope}
\end{scope}
\end{tikzpicture}
:::





:::





:::solution
(Continued)
Then, we can apply these values to the previous table, but replacing a single win (A) with the actual probability from the second table.



:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.8, yscale = -1]
\draw (0,0) grid (7,7);
\draw[very thick] (1,0) -- (1,7) (0,1) -- (7,1);
\begin{scope}[xshift = 0.5cm, yshift = 0.5cm]
\node[red] at (3,-1) {Attacker};
\node[blue, rotate = 90] at (-1,3) {Defender};
\foreach \x in {1,2,3,4,5,6}
{
\node[red] at (\x, 0) {$\x$};
\node[blue] at (0, \x) {$\x$};
}
\foreach \attack / \p in {1/1,2/3,3/5,4/7,5/9,6/11}
{
	\foreach \defend in {1,2,3,4,5,6}
	{
		\ifnum\attack > \defend
			\node[red, scale = 0.8] at (\attack, \defend) {$\frac{\p}{36}$};
		\else
			\node[blue] at (\attack, \defend) {D};
		\fi 
	}
}
\end{scope}
\end{tikzpicture}
:::




:::





:::solution
(Continued)
Here is how to interpret the table: in the first row when the defender rolls a 1, the attacker wins if they roll 2,3,4,5 or 6. Thus, the total in that case is $\frac{3}{36} + \frac{5}{36} + \frac{7}{36} + \frac{9}{36} + \frac{11}{36} = \frac{35}{36}$. 




:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.8, yscale = -1]
\draw (0,0) grid (7,2);
\draw[very thick] (1,0) -- (1,2) (0,1) -- (7,1);
\begin{scope}[xshift = 0.5cm, yshift = 0.5cm]
\node[red] at (3,-1) {Attacker};
\node[blue, rotate = 90] at (-1,1) {Defender};
\foreach \x in {1,2,3,4,5,6}
{
\node[red] at (\x, 0) {$\x$};
}
\node[blue] at (0,1) {1};
\foreach \attack / \p in {1/1,2/3,3/5,4/7,5/9,6/11}
{
	\ifnum\attack > 1
		\node[red, scale = 0.8] at (\attack, 1) {$\frac{\p}{36}$};
	\else
		\node[blue] at (\attack, 1) {D};
	\fi 
}
\end{scope}
\end{tikzpicture}
:::




Since the defender's values from 1-6 are equally likely, the expected number can be obtained by adding all red numbers. 
\[ E(X) = \frac{1}{6}\left(\frac{35}{36} + \frac{32}{36} + \frac{27}{36} + \frac{20}{36} + \frac{11}{36}\right) = \frac{125}{216}.\]

:::




## Yahtzee

Roll 5 dice. You can keep any number of dice and reroll the rest. Then, you can keep any number of dice (either previously rerolled or not), and reroll the rest. Then the result is compared to a poker-hand-like table.




:::figure dice_yahtzee — Dice hand in Yahtzee
:::





:::example

Find the probability of getting a Yahtzee if you are allowed to reroll once (with any number of dice).

:::


:::solution



- If our very first rolls give us a Yahtzee already, we win (yay!), with probability $\frac{6}{6^5}$.

- If the first roll is four-of-a-kind, then we would reroll the last die. Now, the probability of getting four-of-a-kind is 
\[\frac{6 \times C(5,4) \times 5}{6^5} = \frac{150}{6^5}.\] 
We first consider which value to be the four-of-a-kind (6 possibilities), then which die to be the fifth unmatched die (5 chooses 4), and lastly which value to be on the fifth die (5 possibilities since it can't be the same with the rest).


:::





:::solution
(Continued)
Therefore, the probability of getting a four-of-a-kind and then rerolling to get a Yahtzee is 
\[\frac{150}{6^5} \times \frac{1}{6} = \frac{25}{6^5}.\]


- If the first roll has three matching values, we apply a similar argument. The probability of getting such outcome is 
\[\frac{6 \times C(5,3) \times (5 \times 5)}{6^5} = \frac{1500}{6^5}.\] 
Then, the probability of rerolling two dice to match the first three is simply $\frac{1}{36}$. Thus, the probability is 
\[\frac{1500}{6^5} \times \frac{1}{36} = \frac{250}{6^6}.\]


:::
