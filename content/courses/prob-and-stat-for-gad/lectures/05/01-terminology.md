---
week: 5
order: 1
slug: "terminology"
title: "Terminology"
source: "tex/lecture05.tex"
---

## Random?



:::figure l04intro1.png
:::


:::figure l04intro2.png
:::



:::figure l04intro3.png
:::


:::figure l04intro4.png
:::





## Know your vocabs


:::note



- is a planned operation carried out under controlled conditions.

- is a result of an experiment.

- of an experiment is the set of all possible outcomes (i.e. the universe).

- is any combination of outcomes (i.e. a subset of the sample space).


:::






:::example

Use the terminology (experiment, outcome, sample space, event) to describe rolling a single die.

:::


:::solution



- The action of rolling a single die is an experiment.

- An outcome could be any integer from 1 to 6.

- The sample space is the set $\{1,2,3,4,5,6\}$

- An event might be $\{2,4,6\}, \{1,2,3\}, \{5\}$ or $\{1,6\}$. It can even be the empty set $\phi$.


:::





## More vocabs


:::note

**A probability** is a **measure** that is associated with how certain we are of outcomes of a particular experiment or activity.

:::



:::note

The probability of any outcome is the **long-term relative frequency** of that outcome. It is between zero and one.


- The probability of zero means the event can **never** happen,

- The probability of one means the event **always** happens,

- The probability of one-half means the event is **equally likely** to occur or not to occur.


:::





:::figure prob_defn_scale — A probability scale from 0 to 1
:::





## Test!


{\Huge [Test Your Gut](https://www.menti.com/sn8imsvvw2)}





## Vocabs on events


:::note



- means that each outcome of an experiment occurs with equal probability.

- randomizer (such as a dice, a coin, a card) means that all possible outcomes are equally likely.


:::



:::theorem

If there are $n$ possible outcomes, and they are all equally likely, then the probability of each outcome is $\frac{1}{n}$

:::





## Mathematical Definition


:::definition

If all outcomes in the sample space are **equally likely**, then **the probability** of event $A$ is 
\begin{equation}
P(A) = \frac{|A|}{|S|}
\end{equation}
where $|A|$ is the number of elements in the set of the event $A$ and $|S|$ is the number of elements in the sample space $S$. 

:::






:::example

If we roll one fair die, what is the probability that the result is an odd number?

:::


:::figure l04intro1 — dice
:::


:::solution

First, we need to start with formal definitions:


- The outcome can be $\epsdice[black]{1}, \epsdice[black]{2}, \epsdice[black]{3}, \epsdice[black]{4}, \epsdice[black]{5}$ or $\epsdice[black]{6}$. To simplify, let's write them as numbers 1,2,3,4,5 and 6.

- The sample space is $\{1,2,3,4,5,6\}$


:::





:::solution
(Continued)


- To find the probability, let's define the event as

$A$ = the result is an odd number


- By inspecting all outcomes, the event can be represented as a set $A = \{1,3,5\}$

- Since each outcome is equally likely, the probability is
\[P(A) = \frac{|A|}{|S|} = \frac{3}{6} = \frac{1}{2}.\]

In conclusion, the probability that the result is an odd number is $\frac{1}{2}$ or $0.5$.

:::








:::example

If we flip two fair coins, what is the probability that at least one of them is head?

:::


:::figure coins_image — Coins
:::


:::solution

First, we need to start with formal definitions:


- Let a tail be $T$ and a head be $H$. Then, let's express the outcomes as a sequence of two letters. For example, $HT$ is the outcome where the first coin is head and the second coin is tail.

- The sample space is $\{ HH, HT, TH, TT\}$. 


:::





:::solution
(Continued)


- To find the probability, let's define the event as

$B$ = at least one coin shows a head.


- By inspecting all outcomes, the event can be represented as a set $B = \{HH, HT, TH\}$.

- Since each outcome is equally likely, the probability is
\[P(B) = \frac{|B|}{|S|} = \frac{3}{4}.\]

In conclusion, the probability that at least one of them is head is $\frac{3}{4}$ or $0.75$.

:::








:::example

What is the probability that a random 6-digit lottery contains one digit that appears exactly 5 times? (For instance, 999997)

:::


:::figure rare_lottery — \href{https://www.facebook.com/mathasitis/posts/179201643779460
:::
}





:::solution

Let $S$ be the set of all possible 6-digit lotteries. We know by the rule of product that $|S| = 10^6 = 1,000,000$.

For the specific event we are looking for, we need to use the rule of product to count. 


- First, choose a digit that will appear 5 times. There are 10 possible options.

- Second, choose a digit that will be the lone digit. There are now 9 options left.

- Finally, choose how to arrange those digits. The lone digit has 6 possible places to go, and the repeating digits will be fixed.

Because all these processes are independent, the number of lotteries with the specified pattern is $10 \times 9 \times 6 = 540$. Hence, the probability of such pattern to appear is $P(A) = \frac{|A|}{|S|} = \frac{540}{1,000,000} = 0.00054$

:::






:::exercise

Suppose you choose a random number from the set $\{1,2,3,4,5,6,7,8,9,10\}$.


- What is the probability that the number is divisible by 4?

- What is the probability that the number is greater than or equals to 5?

- What is the probability that the number is a square?


:::
