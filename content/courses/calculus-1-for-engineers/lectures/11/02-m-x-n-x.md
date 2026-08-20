---
week: 11
order: 2
slug: "m-x-n-x"
title: "การหาปริพันธ์ของฟังก์ชันตรีโกณมิติยกกำลัง ในรูปแบบ \\sin^m x \\cos^n x"
source: "tex/lecture11.tex"
---

ถ้าเลขชี้กำลังสูงขึ้น หรือเป็นจำนวนที่ไม่ใช่จำนวนเต็ม เช่น
\[ \sin^2 x \cos x, \quad \sin^4 x, \quad \sin^3 x \cos ^{-3} x, \quad \sin^{1.3} x \cos^3 x \] 
ก็อาจจะหาได้หรือไม่ได้ก็ได้ ในที่นี้เราจะศึกษาเฉพาะรูปแบบที่หาได้ง่าย 

:::remark ผลคูณของ \sin x และ \cos x ยกกำลังค่าคงตัว

\[ \int \sin^m x \cos^n x \, dx\]

:::

\begin{exampleblock}{ตัวอย่าง}
\[ \int \sin^5 x\, dx \qquad \int \sin^2 x \cos^3 x\, dx \qquad \int \frac{\sin^3 x}{\cos^5 x} \, dx \qquad \int \sqrt{\sin x} \cos x \, dx\]
\end{exampleblock}




## แบบที่ 1: m หรือ n เป็นจำนวนเต็มบวกคี่

แบบที่ 1: $m$ หรือ $n$ เป็นจำนวนเต็มบวกคี่ 

:::slide



- ถ้าเลขชี้กำลังของ $\sin x$ (นั่นคือ $m$) เป็นจำนวนคี่ เราจะให้ $u = \cos x$ และแปลง $\sin x$ เป็น $\cos x$ ด้วย $\sin^2 x = 1-\cos^2 x = 1-u^2$ 

- ถ้าเลขชี้กำลังของ $\cos x$ (นั่นคือ $n$) เป็นจำนวนคี่ เราจะให้ $u = \sin x$ และแปลง $\cos x$ เป็น $\sin x$ ด้วย $\cos^2 x = 1-\sin^2 x = 1-u^2$

เสร็จแล้ว จะได้ปริพันธ์ในตัวแปร $u$ ตัวแปรเดียว ทำให้สามารถหาปริพันธ์ได้

:::






:::example

จงหาค่าของ $ \int \sin^3 x \cos^2 x \, dx$ 

:::



:::solution

เนื่องจาก $\sin x$ มีเลขชี้กำลังเป็นเลขคี่ ให้ $u = \cos x$ จะได้ $du = -\sin x\, dx$ 

และแปลง $\sin^2 x = 1- \cos^2 x$ จะได้ 
\begin{eqnarray*}
\int \sin^3 x \cos^2 x \, dx &=& \int\sin^2 x \cos^2 x (\sin x\, dx) 

&=& -\int (1-u^2) u^2\, du 

&=& -\int u^2 - u^4 \, du 

&=& -\frac{1}{3} u^3 + \frac{1}{5} u^5 + C = -\frac{1}{3} \cos^3 x + \frac{1}{5} \cos^5 x + C
\end{eqnarray*}

:::






:::example

จงหาค่าของ $ \int \sin^{-4} x \cos^3 x \, dx$ 

:::



:::solution

เนื่องจาก $\cos x$ มีเลขชี้กำลังเป็นเลขคี่ ให้ $u = \sin x$ จะได้ $du = \cos x\, dx$ 

และแปลง $\cos^2 x = 1- \sin^2 x$ จะได้ 
\begin{eqnarray*}
\int \sin^{-4} x \cos^3 x \, dx &=& \int\sin^{-4} x \cos^2 x (\cos x\, dx) 

&=& \int u^{-4} (1-u^2) \, du 

&=& \int u^{-4} - u^{-2} \, du 

&=& -\frac{1}{3} u^{-3} + u^{-1} + C = -\frac{1}{3} \sin^{-3} x - \sin^{-1} x + C
\end{eqnarray*}

:::





## แบบที่ 2: เลขชี้กำลังทั้งคู่เป็นคู่


ใช้เอกลักษณ์ต่อไปนี้ เพื่อทำให้เลขชี้กำลังลดลง

:::slide

\begin{eqnarray*}
\sin^2 x &=& \frac{1-\cos 2x}{2} 

&=& \frac{1}{2} - \frac{\cos 2x}{2} 

&\quad& 

\cos^2 x &=& \frac{1+\cos 2x}{2} 

&=& \frac{1}{2} + \frac{\cos 2x}{2} 
\end{eqnarray*}

:::






:::example

จงหาค่าของ $ \int \sin^2 x \cos^2 x \, dx$ 

:::



:::solution

เนื่องจากเลขชี้กำลังของทั้ง $\sin x$ และ $\cos x$ เป็นเลขคู่ ให้ใช้เอกลักษณ์ในการแปลงดังนี้ 

\begin{eqnarray*}
\int \sin^2 x \cos^2 x \, dx &=& \int\ \left( \frac{1-\cos 2x}{2} \right) \left( \frac{1+\cos 2x}{2} \right) \, dx 

&=& \int \frac{1}{4} \left(1 - \cos^2 2x \right) \, dx 

&=& \frac{1}{4} \int 1 \, dx - \frac{1}{4} \int \cos^2 2x \, dx 
\end{eqnarray*}

:::





:::solution
(ต่อ)
คำนวณหาปริพันธ์ส่วนหลัง $\int \cos^2 2x \, dx $ ต่อ จะได้
\begin{eqnarray*}
\int \cos^2 2x \, dx &=& \int \left( \frac{1+\cos 4x}{2} \right)\, dx 

&=& \frac{1}{2} \int 1 \, dx + \frac{1}{2} \int \cos 4x \, dx 

&=& \frac{x}{2} + \frac{1}{8} \sin 4x + C
\end{eqnarray*}
ฉะนั้น
\begin{eqnarray*}
\int \sin^2 x \cos^2 x \, dx &=&\frac{1}{4} \int 1 \, dx - \frac{1}{4} \int \cos^2 2x \, dx 

&=& \frac{1}{4} x - \frac{1}{4} \left( \frac{x}{2} - \frac{1}{8} \sin 4x + C \right) 

&=& \frac{x}{8} - \frac{1}{32} \sin 4x + C
\end{eqnarray*}

:::





:::example

จงหาค่าของ $ \int \sin^2 3x \, dx$ 

:::


:::solution

เนื่องจากเลขชี้กำลังของทั้ง $\sin x$ และ $\cos x$ เป็นเลขคู่ (ถ้าไม่เห็นพจน์ $\cos x$ แปลว่า $1 = \cos^0 x$ ซึ่ง $0$ เป็นเลขคู่) ให้ใช้เอกลักษณ์ในการแปลงดังนี้

\begin{eqnarray*}
\int \sin^2 3x \, dx &=& \int \left( \frac{1-\cos 6x}{2} \right) \, dx 

&=& \frac{1}{2} \int 1 \, dx - \frac{1}{2} \int \cos 6x \, dx 

&=& \frac{x}{2} - \frac{1}{12} \sin 6x + C
\end{eqnarray*}

:::
