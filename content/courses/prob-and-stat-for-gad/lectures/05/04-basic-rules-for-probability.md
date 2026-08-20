---
week: 5
order: 4
slug: "basic-rules-for-probability"
title: "Basic rules for probability"
source: "tex/lecture05.tex"
---

## Basic properties for probability

Instead of having to determine the sample space and the set of outcomes every time, we can use some properties and rules to help us.

:::theorem

For any event $A$ in the sample space $S$, the followings are true:


- $0 \leq P(A) \leq 1$ 

- $P(A^c) + P(A) = 1$. Recall that $A^c$ is the complement of $A$. 

- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$


:::

Note that the third property is also known as inclusion-exclusion principle in counting principles.





:::example

What is the probability of flipping 6 coins and getting at least 2 heads?

:::


:::solution

Let $A$ = at least one coin shows a head. Lots of outcomes are in $A$, for example $HHTTHH, HTTTHH, \ldots$, so it might be better to look for $A^c$. The complement of $A$ is the set of outcomes where there are **at most** 1 head, so either 0 heads or 1 head. Here, we can easily see that 
\begin{eq*} 
A^c &=& \{TTTTTT, HTTTTT, THTTTT, TTHTTT, 

&\qquad& TTTHTT, TTTTHT, TTTTTH\}
\end{eq*}
Now we have $P(A^c) = \frac{|A|}{|S|} = \frac{7}{2^6} = \frac{7}{64}$. Thus, we have $P(A) = 1- P(A^c) = 1 - \frac{7}{64} = \frac{57}{64}$.

:::






:::example

Let $S$ be the set of standard deck of cards $\{A\heartsuit, A\diamondsuit, A\spadesuit, A\clubsuit, 2\heartsuit, \ldots, K\clubsuit\}$. What is the probability of drawing a card that is either an ace **or** a heart.

:::


:::solution

Let $A$ = the event of drawing an ace, and $\heartsuit$ = the event of drawing a heart. We know that 


- Since there are 4 aces in the deck, we have $P(A) = \frac{4}{52}$.

- Since there are 13 hearts in the deck, $P(\heartsuit) = \frac{13}{52}$. 

- Since there is only 1 card that is both and ace and a heart (namely $A\heartsuit$), $P(A \cap \heartsuit) = \frac{1}{52}$

Therefore, the probability of getting an ace or a heart, namely $A \cup B$, is
\[P(A \cup B) = P(A) + P(B) - P(A \cap B) = \frac{4}{52} + \frac{13}{52} - \frac{1}{52} = \frac{16}{52}\]

:::






## The Multiplication Rule

The rule of addition for counting principles can be translated to probability term.

:::definition

Events $A$ and $B$ are **independent** if the knowledge that one occurred does not affect the chance the other occurs. Formally, $A$ and $B$ are independent if we have $P(A|B) = P(A).$

:::



:::theorem

If events $A$ and $B$ are **independent**, then we have
\begin{equation}
P(A \cap B) = P(A) P(B)
\end{equation}

:::






:::example

Suppose we roll 3 fair dice. What is the probability that each of them shows at least 5.

:::


:::solution

From now on, we will assume that dice results are independent.


Let $A_1$ = the first dice showing at least 5, $A_2$ = the second dice showing at least $5$, and $A_3$ = the third dice showing at least $5$. We see that $P(A_1) = P(A_2) = P(A_3) = \frac{2}{6}$. 

Therefore, the probability of getting all numbers at least 5 is $P_1 \cap P_2 \cap P_3$, which gives
\[P(A_1 \cap A_2 \cap A_3) = P(A_1) P(A_2) P(A_3) = \frac{2}{6} \times \frac{2}{6} \times \frac{2}{6} = \frac{1}{27}\]

:::





## The Addition Rule

The rule of addition for counting principles can be translated to probability term.

:::theorem

If events $A$ and $B$ are **mutually exclusive** (i.e. $A \cap B = \{\}$), then we have
\begin{equation}
P(A \cup B) = P(A) + P(B)
\end{equation}

:::

This is simply division into several cases, where each case is different. The theorem emphasizes the word ``mutually exclusive''.





:::example

Suppose there are 9 players in a match of Among Us, with 5 Asians and 4 Americans. If two players are randomly selected as impostors with equal chance, what is the probability that they share the same race?

:::


:::figure among_us — Everyone else smells like a traitor.
:::





:::solution

Let $A$ = both players are Asians and $B$ = both players are Americans. Since we don't care about the order, this is a problem about combination.


- If there is no restriction, the number of combinations of two players is $C(9,2) = \frac{9!}{7!2!} = 36$. Thus, $|S| = 36$. 

- If they are both Asians, then the number of combinations is $C(5,2) = \frac{5!}{3!2!} = 10$. Thus, $P(A) = \frac{10}{36}$

- If they are both Americans, the number of combinations is $C(4,2) = \frac{4!}{2!2!} = 6$. Thus, $P(B) = \frac{6}{36}$

Since both events are mutually exclusive, the probability that either event occurs is
\[ P(A \cup B) = P(A) + P(B) = \frac{10}{36} + \frac{6}{36} = \frac{16}{36} = \frac{4}{9}\]


:::





:::exercise

Suppose that you have eight cards. Five are green and three are yellow. The five green cards are numbered 1, 2, 3, 4, and 5. The three yellow cards are numbered 1, 2, and 3. The cards are well shuffled. You randomly draw one card.


Let $G$ be the event where the card drawn is green, and $E$ be the event where the card drawn is even.


- List the sample space.

- Find $P(G), P(G|E), P(G \cap E), P(G \cup E)$.

- Are G and E mutually exclusive? Justify your answer numerically.


:::
