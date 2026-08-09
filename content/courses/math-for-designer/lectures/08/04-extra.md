---
week: 8
order: 4
slug: "extra"
title: "Extra"
source: "tex/lecture08.tex"
---

## Formula for Sine and Cosine of Angle Sums

We can prove the formula for angle sums using matrix multiplication. Consider the identity
\[\begin{pmatrix} \cos (A+B) & -\sin (A+B) 
\sin (A+B) & \cos (A+B) \end{pmatrix} = \begin{pmatrix} \cos A & -\sin A 
\sin A & \cos A \end{pmatrix} \begin{pmatrix} \cos B & -\sin B 
\sin B & \cos B \end{pmatrix}.\]
This says rotating a vector by angle $A+B$ is the same as rotating a vector by angle $A$, then rotating the vector by angle $B$. 




On the other hand, we can multiply matrices on the right hand side to get
\begin{eq*}
&&\begin{pmatrix} \cos A & -\sin A 
\sin A & \cos A \end{pmatrix} \begin{pmatrix} \cos B & -\sin B 
\sin B & \cos B \end{pmatrix} 

&=& \begin{pmatrix} \cos A \cos B - \sin A \sin B& -(\sin A \cos B + \cos A \sin B) 
\sin A \cos B + \cos A\sin B & \cos A \cos B - \sin A \sin B \end{pmatrix}
\end{eq*}
By comparing the entries, we have

:::note

\begin{eq*}
\cos (A+B) &=& \cos A \cos B - \sin A \sin B 

\sin (A+B) &=& \sin A \cos B + \cos A \sin B
\end{eq*}

:::

which are the formulas we have memorized before.
