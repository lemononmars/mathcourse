---
week: 6
order: 4
slug: "identity"
title: "Identity"
source: "tex/lecture06.tex"
---

## Some Identity


:::note

\[\sin^2 \theta + \cos^2 \theta = 1\]

:::



:::proof

\begin{eqnarray*}
\sin^2 \theta + \cos^2 \theta &=& \left(\frac{a}{c}\right)^2 + \left(\frac{b}{c}\right)^2 

&=& \frac{a^2}{c^2} + \frac{b^2}{c^2} 

&=& \frac{a^2 + b^2}{c^2} 

&=& \frac{c^2}{c^2} 

&=& 1
\end{eqnarray*}

:::




\begin{alertblock}{}
\[\sin(\alpha + \beta) \neq \sin(\alpha) + \sin(\beta)\]
\end{alertblock}

You can see easily that this is not the case by trying some angles (say $\alpha = \beta = 30$).

Instead, we have 


:::note

\[\sin(\alpha + \beta) = \sin\alpha\cos\beta + \sin\beta\cos\alpha\]

:::


We do not need this for this introductory course, and the proof is quite complicated, so we'll leave it. Nevertheless, if you are given an identity, you should be able to use it to find some other values.





:::example

Given the identity $\sin^2 \alpha + \cos^2 \alpha = 1$ and that $\sin 37 \approx 0.6$, find $\cos 37$.

:::


:::solution

We can simplify the identity to be
\begin{eq*}
\cos^2 \alpha &=& 1 - \sin^2\alpha 

\cos\alpha &=& \sqrt{1-\sin^2\alpha}
\end{eq*}
Thus, if we plug it $\alpha = 37$, we get
\begin{eq*}
\cos 37 &=& \sqrt{1- \sin^2 (37)} 

&=& \sqrt{1 - (0.6)^2} 

&=& \sqrt{0.64} = 0.8
\end{eq*}

:::






:::example

Given the identity $\cos \frac{\alpha}{2} = \sqrt{\frac{1+\cos(\alpha)}{2}}$ and that $\cos 60 = \frac{1}{2}$. Find the value of $\cos 30$.

:::


:::solution

If we plug in the value $\alpha = 60$, we have
\begin{eq*}
\cos \frac{60}{2} &=& \sqrt{\frac{1+\cos 60}{2}} 

\cos 30 &=& \sqrt{\frac{1+\frac{1}{2}}{2}} 

&=& \sqrt{\frac{3}{4}} 

&=& \frac{\sqrt{3}}{2}
\end{eq*}

:::






:::example

Given the identity $\sin (2\alpha) = 2\sin\alpha \cos \alpha$ and that $\sin 30 = \frac{1}{2}$. Find the value of $\sin 60$.

:::


:::solution

If we plug in the value $\alpha = 30$, we have
\[\sin 60 = 2 \sin 30 \cos 30\]
We don't know the value of $\cos 30$ yet, but of course we can use the pythagorean theorem to get
\[\cos 30 = \sqrt{1-\sin^2 (30)} = \sqrt{1 - \left(\frac{1}{2}\right)^2} = \sqrt{\frac{3}{4}} = \frac{\sqrt{3}}{2}\]
Therefore,
\[\sin 60 = 2 \sin 30 \cos 30 = 2 \left(\frac{1}{2}\right) \left(\frac{\sqrt{3}}{2}\right) = \frac{\sqrt{3}}{2}\]

:::





## Trigoromantic




:::figure l09meme4
:::






## But There Is More!




:::figure l09meme5
:::






:::exercise



- Given that $\sin \beta = \frac{1}{4}$ for some angle $\beta$, find $\cos \beta$.

- Given the identity $\cos (2\alpha) = 1-2\sin^2 (\alpha)$ and the value $\sin (45) = \frac{\sqrt{2}}{2}$, find $\cos 90$.

- Use the identity $\cos (2\alpha) = 2\cos^2 (\alpha)-1$ to find the solutions of $\cos (2\alpha) = \cos\alpha$ for $0 \leq \alpha \leq 360$. Also plot the graph of $f(x) = \cos(2\alpha)$ and $g(x) = \cos\alpha$ to verify that you get all the solutions.


:::
