---
week: 9
order: 4
slug: "section-4"
title: "เทคนิคการจัดรูป เมื่อลิมิตอยู่ในรูปแบบ \\infty - \\infty"
source: "tex/lecture09.tex"
---

รูปแบบไม่กำหนด 
\[ \infty - \infty\]
แม้อาจจะดูเหมือนได้ 0 แต่ต้องระวังว่าที่จริงแล้ว $\infty$ ไม่ใช่จำนวน จึงเอามาลบกันไม่ได้ ลิมิตต่อไปนี้อยู่ในรูปแบบ $\infty - \infty$ เหมือนกันหมด แต่มีค่าต่างกัน เช่น
\begin{eq*}
\limx{\infty} 2x - x &=& 
:::slide
+\infty 
:::


\limx{\infty} x - x &=&
:::slide
0
:::


\limx{\infty} (x+1) - x &=& 
:::slide
1
:::


\limx{0} \frac{1}{x} - \frac{1+x}{x} &=& 
:::slide
-1
:::

\end{eq*}




:::remark

กำหนดฟังก์ชัน $u(x)$ และ $v(x)$ ที่ $\limx{c} u(x) = \limx{c} v(x) = \infty$ ในการหาลิมิต
\[\limx{c} u(x) - v(x)\]
ให้จัดรูปด้วยวิธีใดวิธีหนึ่งดังต่อไปนี้


- บวกลบเศษส่วนรวมกัน จนได้เป็นเศษส่วนเดียวในรูปแบบไม่กำหนด $\frac{0}{0}$ หรือ $\frac{\infty}{\infty}$

- คูณ $u(x) - v(x)$ ด้วยสังยุค $u(x) + v(x)$ ทั้งตัวเศษและตัวส่วน

- อื่น ๆ

และใช้กฎโลปิตาลในการหาค่าของลิมิตต่อไป

:::







:::example

จงหา $\limx{\infty} \ln (x+1) - \ln x $ โดยกฎของโลปิตาล

:::


:::solution

สังเกตว่าเมื่อแทนค่า $x=\infty$ แล้วจะอยู่ในรูป $\infty - \infty$ แต่ว่าในที่นี้เราไม่จำเป็นต้องใช้กฎของโลปิตาล สามารถใช้สมบัติของฟังก์ชันลอการิทึมได้ดังนี้
\begin{eq*}
\limx{\infty} \ln (x+1) - \ln x &=& \limx{\infty} \ln \left( \frac{x+1}{x} \right) 

&=& \limx{\infty} \ln \left(1 + \frac{1}{x}\right) 

&=& \ln (1 + 0) 

&=& 0
\end{eq*}

:::






:::example

จงหา $\limx{\infty} \sqrt{x^2+3x} - x $ โดยกฎของโลปิตาล

:::


:::solution

สังเกตว่าเมื่อแทนค่า $x=\infty$ แล้วจะอยู่ในรูป $\infty - \infty$ ฉะนั้นเราจึงใช้การคูณด้วยสังยุคในการจัดรูป ได้เป็น
\begin{eq*}
\sqrt{x^2+3x} - x &=& \frac{\sqrt{x^2+3x} + x}{\sqrt{x^2+3x} + x} ( \sqrt{x^2+3x} - x ) 

&=& \frac{(x^2+3x)-x^2}{\sqrt{x^2+3x} + x} = \frac{3x}{\sqrt{x^2+3x} + x} 
\end{eq*}
ซึ่งอยู่ในรูป $\frac{\infty}{\infty}$ ฉะนั้นสามารถใช้กฎของโลปิตาลเพื่อหาลิมิตได้ดังนี้
\begin{eq*}
\limx{\infty} \frac{3x}{\sqrt{x^2+3x} + x} = \limx{\infty} \frac{3}{ \frac{2x+3}{2\sqrt{x^2+3x}} + 1 }= \frac{3}{1+1} = \frac{3}{2}
\end{eq*}

:::







:::example

จงหา $\limx{0^-} \frac{1}{x} - \frac{1}{\sin x} $ โดยกฎของโลปิตาล

:::


:::solution

สังเกตว่าเมื่อแทนค่า $x=0$ แล้วจะอยู่ในรูป $\frac{1}{0} - \frac{1}{0} = \infty - \infty$ ฉะนั้นเราจึงจัดรูปใหม่เป็น
\[\frac{1}{x} - \frac{1}{\sin x} = \frac{\sin x - x}{x\sin x}\]
ซึ่งกลายเป็นรูป $\frac{0}{0}$

:::





:::solution
(ต่อ)
\begin{eq*}
\limx{0^-} \frac{1}{x} - \frac{1}{\sin x} &=& \limx{0^-} \frac{\sin x - x}{x\sin x} 

&=& \limx{0^-} \frac{\cos x -1}{x\cos x - \sin x} \boxed{\text{ใช้กฎโลปิตาล}}

&=& \limx{0^-} \frac{-\sin x}{- x \sin x + 2 \cos x} \boxed{\text{ใช้กฎโลปิตาลอีกครั้งหนึ่ง}}

&=& \frac{0}{0+2} \boxed{\text{แทนค่า $x=0$ ในลิมิตได้แล้ว}} 

&=& 0
\end{eq*}

:::
