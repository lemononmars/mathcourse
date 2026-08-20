---
week: 11
order: 3
slug: "m-x-n-x"
title: "การหาปริพันธ์ของฟังก์ชันตรีโกณมิติยกกำลัง ในรูปแบบ \\tan^m x \\sec^n x"
source: "tex/lecture11.tex"
---

ในทำนองเดียวกัน ถ้าฟังก์ชันที่ต้องการหาปริพันธ์อยู่ในรูปแบบ $\tan^m x \sec^n x$ เช่น
\[ \tan^2 x \sec x, \quad \tan^4 x, \quad \tan^3 x \sec ^{-3} x, \quad \sec^{1.3} x \tan^3 x \] 
เราสามารถใช้หลักการเดียวกันกับการหาปริพันธ์ของฟังก์ชันในรูปแบบ $\sin^m x \cos^n x$ ได้เช่นกัน โดยใช้เอกลักษณ์
\[ \tan^2 x = \sec^2 x - 1, \quad \sec^2 x = \tan^2 x + 1 \]
และอนุพันธ์ 
\[ \dx \tan x = \sec^2 x, \quad \dx \sec x = \sec x \tan x\] 
ในการแปลง $\tan x$ เป็น $\sec x$ หรือกลับกัน



## หลักการแทนค่าเพื่อหาปริพันธ์ในรูปแบบ \tan^m x \sec^n x



- กรณีที่ 1 - ถ้า $m$ เป็นจำนวนเต็มบวกและ $n=0$ จะเปลี่ยนรูป $\tan^m x = \tan^{m-2}x \tan^2 x = \tan^{m-2} x (\sec^2 x -1)$ 

- กรณีที่ 2 - ถ้า $n$ เป็นจำนวนเต็มคู่บวก จะเปลี่ยนรูป $\sec^n x = \sec^{n-2} x \sec^2 x = (\tan^2 x + 1)^{\frac{n-2}{2}} \sec^2 x$

- กรณีที่ 3 - ถ้า $m$ เป็นจำนวนเต็มคี่บวก จะเปลี่ยนรูป $\tan^m x \sec^n x = (\tan^{m-1} x \sec^{n-1} x) (\tan x \sec x)$

- กรณีที่ 4 - ถ้า $m=0$ หรือเป็นจำนวนเต็มคู่บวก และ $n$ เป็นจำนวนเต็มคี่บวก ให้ใช้ปริพันธ์แยกส่วน





:::example

จงหาค่าของ $ \int \tan^5 x \sec^2 x \, dx$

:::


:::solution

เนื่องจาก $\tan x$ มีเลขชี้กำลังเป็นเลขคี่ จึงอยู่ในกรณีที่ 3 ให้ $u = \sec x$ จะได้ $du = \sec x \tan x\, dx$ และแปลง $\tan^2 x = \sec^2 x - 1 = u^2-1$ จะได้ 
\begin{eqnarray*}
\int \tan^5 x \sec^2 x \, dx &=& \int\tan^5 x \sec^2 x \left( \frac{du}{\sec x \tan x} \right) 

&=& \int \tan^4 x \sec x \, du = \int (u^2-1)^2 u \, du 

&=& \int (u^4 - 2u^2 + 1) u \, du = \int u^5 - 2u^3 + u \, du 

&=& \tfrac{1}{6} u^6 - \tfrac{1}{2} u^4 + \tfrac{1}{2} u^2 + C 

&=& \tfrac{1}{6} \sec^6 x - \tfrac{1}{2} \sec^4 x + \tfrac{1}{2} \sec^2 x + C
\end{eqnarray*}

:::
