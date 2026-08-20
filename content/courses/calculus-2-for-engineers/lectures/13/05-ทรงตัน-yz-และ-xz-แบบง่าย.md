---
week: 13
order: 5
slug: "ทรงตัน-yz-และ-xz-แบบง่าย"
title: "ปริพันธ์สามชั้นบนทรงตัน yz และ xz แบบง่าย"
source: "tex/lecture13.tex"
---

## ปริพันธ์สามชั้นบนทรงตัน yz แบบง่าย


:::theorem

กำหนดให้ $S$ เป็นทรงตัน $yz$ แบบง่าย ซึ่งเป็นทรงตันที่ปิดล้อมด้านหน้าด้วยพื้นผิว $x = g_1(y,z)$ ด้านหลังด้วยพื้นผิว $x = g_2(y,z)$ และโปรเจคชันบนระนาบ $yz$ เป็นพื้นผิว $R$ ถ้า $f(x,y,z)$ เป็นฟังก์ชันต่อเนื่องบน $S$ แล้ว 
\begin{equation} 
\iiint\limits_S f(x,y,z) \, dV = \iint\limits_R \left( \int_{g_1(y,z)}^{g_2(y,z)} f(x,y,z) \, dx \right)\, dA
\end{equation}
เมื่อ $dA = dy\,dz$ หรือ $dA = dz\, dy$ 

:::







:::figure l13i04
:::

*ทรงตัน $yz$ แบบง่าย*





## ปริพันธ์สามชั้นบนทรงตัน xz แบบง่าย


:::theorem

กำหนดให้ $S$ เป็นทรงตัน $xz$ แบบง่าย ซึ่งเป็นทรงตันที่ปิดล้อมด้านซ้ายด้วยพื้นผิว $y = g_1(x,z)$ ด้านขวาด้วยพื้นผิว $y = g_2(x,z)$ และโปรเจคชันบนระนาบ $xz$ เป็นพื้นผิว $R$ ถ้า $f(x,y,z)$ เป็นฟังก์ชันต่อเนื่องบน $S$ แล้ว 
\begin{equation} 
\iiint\limits_S f(x,y,z) \, dV = \iint\limits_R \left( \int_{g_1(x,z)}^{g_2(x,z)} f(x,y,z) \, dy \right) \, dA
\end{equation} 
เมื่อ $dA = dx\,dz$ หรือ $dA = dz\, dx$ 

:::







:::figure l13i05
:::

*ทรงตัน $xz$ แบบง่าย*
