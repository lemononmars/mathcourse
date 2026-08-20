---
week: 4
order: 4
slug: "composite"
title: "Composite Function"
source: "tex/lecture04.tex"
---

## Example of a composite system


:::youtube v-tFGm9nCV0 | (Source)
:::





## composite function

We can combite two (or more) functions by chaining them.

:::definition

Let $f(x)$ and $g(x)$ be functions. A composite function, denoted $f \circ g$, is defined as
\[ (f \circ g)(x)= f(g(x))\]
In other words, we replace $x$ in $f(x)$ by another function $g(x)$.

:::







:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.5]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[teal] at (1,-1) {$A$};
\filldraw[fill = red!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[red] at (5,-1) {$B$};
\filldraw[fill = blue!20!white] (9,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[blue] at (9,-1) {$C$};
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (5,4) (b1) {p};
\node at (5,3) (b2) {q};
\node at (5,2) (b3) {r};
\node at (5,1) (b4) {s};
\node at (9,4) (c1) {w};
\node at (9,3) (c2) {x};
\node at (9,2) (c3) {y};
\node at (9,1) (c4) {z};
\draw[->, red] (a1) -- (b1);
\draw[->, purple] (a2) -- (b3);
\draw[->, red] (a3) -- (b1);
\draw[->, green] (a4) -- (b2);
\draw[->, red] (b1) -- (c2);
\draw[->, green] (b2) -- (c3);
\draw[->, purple] (b3) -- (c1);
\draw[->] (b4) -- (c2);
\node at (3, 5) {$f: A \rightarrow B$};
\node at (7, 5) {$g: B \rightarrow C$};
\begin{scope}[yshift = -7cm]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[teal] at (1,-1) {$A$};
\filldraw[fill = blue!20!white] (9,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[blue] at (9,-1) {$C$};
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (9,4) (c1) {w};
\node at (9,3) (c2) {x};
\node at (9,2) (c3) {y};
\node at (9,1) (c4) {z};
\draw[->, red] (a1) -- (c2);
\draw[->, purple] (a2) -- (c1);
\draw[->, red] (a3) -- (c2);
\draw[->, green] (a4) -- (c3);
\node at (5, 5) {$g\circ f: A \rightarrow C$};
\end{scope}
\end{tikzpicture}
:::


*Creating the composite function $g \circ f$ using set diagram*







:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.6]
\filldraw[blue!40] (0,0) rectangle (3,2);
\foreach \x in {-0.8,0.8}
{
	\foreach \y in {-0.8,0.8}
	{
		\draw[->] ({1.5+\x}, {1+\y}) -- ({1.5+(0.2*\x)},{1+(0.2*\y)});
	}
}
\filldraw[red!40] (6,0) rectangle (9,2);
\filldraw[ball color = teal] (-2.5,1) circle [radius = 1cm];
\filldraw[ball color = teal] (4.5,1) circle [radius = 0.5cm];
\filldraw[ball color = red] (10.5,1) circle [radius = 0.5cm];
\foreach \x in {-1, 3.25, 5.25, 9.25}
{
	\draw[->] (\x,1) -- ({\x+0.5},1);
}
\node[scale = 2] at (1.5, 2.5) {$f$};
\node[scale = 2] at (7.5, 2.5) {$g$};
\begin{scope}[yshift = -4cm]
\filldraw[purple!40] (0,0) rectangle (9,2);
\foreach \x in {-1,1}
\foreach \x in {-0.8,0.8}
{
	\foreach \y in {-0.8,0.8}
	{
		\draw[->, red] ({4.5+\x}, {1+\y}) -- ({4.5+(0.2*\x)},{1+(0.2*\y)});
	}
}
\filldraw[ball color = teal] (-2.5,1) circle [radius = 1cm];
\filldraw[ball color = red] (10.5,1) circle [radius = 0.5cm];
\foreach \x in {-1, 9.25}
{
	\draw[->] (\x,1) -- ({\x+0.5},1);
}
\node[scale = 2] at (4.5, 2.5) {$g \circ f$};
\end{scope}
\end{tikzpicture}
:::


*Creating a composite function as a chain of machines*





:::figure function_composite_meme1 — The difference between $f \circ g$ and $g \circ f$
:::






:::example

Let $f(x) = x+1$ and $g(x) = x^2$. Find the followings.


- $(f \circ g)(x)$

- $(g \circ f)(x)$

- $(f \circ f)(x)$

- $(g \circ g)(x)$


:::


:::solution

\begin{eqnarray*}
(f \circ g)(x) &=& f(**g(x)**) = **g(x)** + 1 = x^2 + 1 

(g \circ f)(x) &=& g(**f(x)**) = **f(x)**^2 = **(x+1)**^2
\end{eqnarray*}
Notice that $(f \circ g)(x) \neq (g \circ f)(x)$, so the order matters.
\begin{eqnarray*}
(f \circ f)(x) &=& f(**f(x)**) = **f(x)** + 1 = **x+1** + 1 = x+2 

(g \circ g)(x) &=& g(**g(x)**) = (**g(x)**)^2 = (**x^2**)^2 = x^4
\end{eqnarray*}

:::






:::example

Let $f(x) = \sqrt{x} $ and $g(x) = 2x+1$. Find the followings.


- $(f \circ g)(x)$

- $(f \circ g)(4)$

- $(g \circ f)(x)$

- $(g \circ f)(4)$


:::


:::solution

\begin{eqnarray*}
(f \circ g)(x) &=& f(**g(x)**) = \sqrt{**g(x)**} = \sqrt{2x+1} 

(f \circ g)(4) &=& \sqrt{2(4) + 1 } = \sqrt{9} = 3 

(g \circ f)(x) &=& g(**f(x)**) = 2**f(x)**+1 = 2\green{\sqrt{x}} + 1 

(g \circ f)(4) &=& 2\sqrt{4} + 1 = 2(2) + 1 = 5
\end{eqnarray*}

:::



lldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\filldraw[fill = blue!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2.5];
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (5,4) (b1) {w};
\node at (5,3) (b2) {x};
\node at (5,2) (b3) {y};
\node at (5,1) (b4) {z};
\draw[->] (a1) -- (b3);
\draw[->] (a2) -- (b1);
\draw[->] (a3) -- (b4);
\draw[->] (a4) -- (b2);
\node at (3,5) {$f_1$};
\begin{scope}[xshift = 8cm]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\filldraw[fill = blue!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2.5];
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (5,4) (b1) {w};
\node[draw, circle, fill = red!40] at (5,3) (b2) {x};
\node at (5,2) (b3) {y};
\node at (5,1) (b4) {z};
\draw[->,red] (a1) -- (b2);
\draw[->] (a2) -- (b1);
\draw[->] (a3) -- (b4);
\draw[->,red] (a4) -- (b2);
\node at (3,5) {$f_2$};
\end{scope}
\end{tikzpicture}
*ตัวอย่างฟังก์ชันหนึ่งต่อหนึ่ง $f_1$ และฟังก์ชันที่ไม่ใช่ฟังก์ชันหนึ่งต่อหนึ่ง $f_2$*





## นิยามฟังก์ชันผกผัน


:::definition

กำหนดให้ $f$ เป็นฟังก์ชัน 1 ต่อ 1 ** ฟังก์ชันผกผันของ ** $\mathbf{f}$ (เขียนแทนด้วย $f^{\, -1}$) คือฟังก์ชันที่มีสมบัติว่า
\[\text{ถ้า } y = f(x) \text{ แล้ว }f^{\, -1}(y) = x\]

:::




ถ้ากำหนดฟังก์ชัน $f$ ในรูปแบบเซต เราสามารถสร้างฟังก์ชันผกผันได้ด้วยการสลับตำแหน่งเซต $A$ และ $B$ แล้วทำการสลับทิศทางลูกศรทั้งหมด




:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.8]
\filldraw[fill = red!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[red] at (1,-1) {$A$};
\filldraw[fill = teal!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[teal] at (5,-1) {$B$};
\node at (1,4) (a1) {a};
\node at (1,3) (a2) {b};
\node at (1,2) (a3) {c};
\node at (1,1) (a4) {d};
\node at (5,4) (b1) {1};
\node at (5,3) (b2) {2};
\node at (5,2) (b3) {3};
\node at (5,1) (b4) {4};
\draw[->] (a1) -- (b3);
\draw[->] (a2) -- (b2);
\draw[->] (a3) -- (b4);
\draw[->] (a4) -- (b1);
\node at (3, 5) {$f: A \rightarrow B$};
\begin{scope}[xshift = 7cm]
\filldraw[fill = teal!20!white] (1,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[teal] at (1,-1) {$B$};
\filldraw[fill = red!20!white] (5,2.5) ellipse [x radius = 1, y radius = 2.5];
\node[red] at (5,-1) {$A$};
\node at (5,4) (a1) {a};
\node at (5,3) (a2) {b};
\node at (5,2) (a3) {c};
\node at (5,1) (a4) {d};
\node at (1,4) (b1) {1};
\node at (1,3) (b2) {2};
\node at (1,2) (b3) {3};
\node at (1,1) (b4) {4};
\draw[<-] (a1) -- (b3);
\draw[<-] (a2) -- (b2);
\draw[<-] (a3) -- (b4);
\draw[<-] (a4) -- (b1);
\node at (3, 5) {$f\,^{-1}: B \rightarrow A$};
\end{scope}
\end{tikzpicture}
:::


*การสร้างฟังก์ชันผกผัน $f\,^{-1*$ ในรูปแบบความสัมพันธ์}




ถ้ากำหนดฟังก์ชัน $f$ ในรูปแบบการทำงานของเครื่องจักร เราสามารถสร้างฟังก์ชันผกผันได้ด้วยการหาว่าการทำงานแบบใดที่มีผลลัพธ์ตรงกันข้ามกับ $f$ เช่น ถ้า $f$ คือการลดขนาด แล้ว $f\,^{-1}$ คือการเพิ่มขนาด




:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.7]
\filldraw[blue!40] (0,0) rectangle (3,2);
\foreach \x in {-0.8,0.8}
{
	\foreach \y in {-0.8,0.8}
	{
		\draw[->] ({1.5+\x}, {1+\y}) -- ({1.5+(0.2*\x)},{1+(0.2*\y)});
	}
}
\filldraw[ball color = teal] (-2.5,1) circle [radius = 1cm];
\filldraw[ball color = teal] (4.5,1) circle [radius = 0.5cm];
\foreach \x in {-1, 3.25}
{
	\draw[->] (\x,1) -- ({\x+0.5},1);
}
\node[scale = 2] at (1.5, 2.5) {$f$};
\begin{scope}[yshift = -4cm]
\filldraw[blue!40] (0,0) rectangle (3,2);
\foreach \x in {-0.8,0.8}
{
	\foreach \y in {-0.8,0.8}
	{
		\draw[<-, red] ({1.5+\x}, {1+\y}) -- ({1.5+(0.2*\x)},{1+(0.2*\y)});
	}
}
\filldraw[ball color = teal] (-2,1) circle [radius = 0.5cm];
\filldraw[ball color = teal] (5,1) circle [radius = 1cm];
\foreach \x in {-1, 3.25}
{
	\draw[->] (\x,1) -- ({\x+0.5},1);
}
\node[scale = 2] at (1.5, 2.5) {$f\,^{-1}$};
\end{scope}
\end{tikzpicture}
:::


*การสร้างฟังก์ชันผกผัน $f\,^{-1*$ ในรูปการทำงานของเครื่องจักร}




ถ้ากำหนดฟังก์ชัน $f$ ในรูปแบบกราฟ เราสามารถสร้างฟังก์ชันผกผันได้ด้วยการแปลงจุด $(a,b)$ บนกราฟทั้งหมดให้กลายเป็นจุด $(b,a)$ ซึ่งมีค่าเท่ากับการสะท้อนกราฟฟังก์ชัน $y=f(x)$ บนเส้นแทยงมุม $y=x$ 




:::tikz TikZ diagram
\begin{tikzpicture}
\axes{-2}{2}{-2}{2};
\draw[blue] plot[domain = -2:1.4] (\x, {exp(\x)-1.5}) node[left] {$y=f\,^{-1}(x)$};
\draw[red] plot[domain = -1.4:2] (\x, {ln(\x+1.5)}) node[right] 
{$y=f(x)$};
\draw[dashed] (-2,-2) -- (2,2) node {$y=x$};
\draw[red] (-0.5, 0) circle [radius = 0.05cm] node [above left] {$(a,b)$};
\draw[blue] (0, -0.5) circle [radius = 0.05cm] node [below right] {$(b,a)$};
\draw[dotted, ->] (-0.5,0) -- (0,-0.5);
\end{tikzpicture}
:::


*ตัวอย่างการหาฟังก์ชันผกผันจากกราฟ*





:::figure function_inverse_meme — ภาพ meme เปรียบเทียบฟังก์ชันปกติ และฟังก์ชันผกผัน
:::





## วิธีหาฟังก์ชันผกผัน


:::note



- กำหนดตัวแปร $y$ โดยที่ $y = f(x)$ 

- สลับตัวแปรใหม่ ให้อยู่ในรูป $x = f(y)$ 

- จัดรูปสมการให้ฝั่งซ้ายมี $y$ พจน์เดียว และฝั่งขวามีพจน์ $x$ และค่าคงตัวทั้งหมด 

- สมการที่ได้จะอยู่ในรูป $y = f^{\, -1}$ ซึ่งเป็นฟังก์ชันผกผันที่ต้องการ


:::






:::example

กำหนดให้ $f(x) = x+2$ จงหา $f^{\, -1}(x)$

:::


:::solution



- ขั้นแรกกำหนดตัวแปร $y = f(x)$ ขึ้นมาใหม่ จะได้ 
\[y = x+2\] 

- จากนั้นสลับตัวแปรใหม่จะได้เป็น 
\[x = y+2\] 

- จัดรูปให้ $y$ อยู่ฝั่งซ้าย จะได้
\[y = x-2\] 
นั่นคือ $f^{-1}\,(x) = x-2$ เป็นฟังก์ชันผกผันที่ต้องการ


:::






:::example

กำหนดให้ $f(x) = x^2-3$ โดยที่ $x \geq 0$ จงหา $f^{\, -1}(x)$

:::


:::solution



- ขั้นแรกกำหนดตัวแปร $y = f(x)$ ขึ้นมาใหม่ จะได้ 
\[y = x^2-3, \text{ โดยที่ } x \geq 0\] 

- สลับตัวแปรเป็น 
\[x = y^2-3, \text{ โดยที่ } y \geq 0\] 
จากนั้นจัดรูปใหม่ จะได้ 
\[y^2 = x+3 \qquad \rightarrow \qquad y = \pm \sqrt{x+3}\]
แต่เนื่องจากเรากำหนดโดเมนที่มีค่า $y \geq 0$ ฉะนั้นเราจึงได้ $y = \sqrt{x+3}$ นั่นคือเราได้ฟังก์ชันผกผันเป็น $f^{\, -1}(x) = \sqrt{x+3}$


:::





## สมบัติของฟังก์ชันผกผัน


:::property

กำหนดให้ $f: A \to B$ เป็นฟังก์ชันหนึ่งต่อหนึ่ง $D_f$ และ $R_f$ เป็นโดเมนและเรนจ์ของฟังก์ชันตามลำดับ


- $f^{-1}: R_f \to A$ และเป็นฟังก์ชันหนึ่งต่อหนึ่งเช่นกัน

- $(f \circ f^{-1}) (x) = x$ สำหรับทุก $x$ ใน $R_f$

- $(f^{-1} \circ f)(x) = x$ สำหรับทุก $x$ ใน $A$


:::

เช่น จากตัวอย่างก่อนหน้านี้เราทราบว่า $f(x) = x^2-3$ และ $f^{-1}(x) = \sqrt{x+3}$ ฉะนั้น

:::slide

\[(f \circ f^{-1})(x) = f( f^{-1}(x)) = f( \sqrt{x+3} ) = \sqrt{x+3}^2 - 3 = (x+3) - 3 = x\]

:::


\fi
