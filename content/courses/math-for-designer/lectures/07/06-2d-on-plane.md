---
week: 7
order: 6
slug: "2d-on-plane"
title: "2D Transformation on the Plane"
source: "tex/lecture07.tex"
---

:::figure 2dtransform_golf — [](https://teacher.desmos.com/activitybuilder/custom/59b01d08f4d48d0a0ee7526e
:::
)




## Analytical Approach

Consider a plane that consists of all points $(x,y)$ where $x,y$ are real numbers.

We think of 2D transformation as a function 
\[ T(\vec{v}) = \vec{v}'\]
In other words,
\[\begin{pmatrix}v_1
v_2\end{pmatrix} \to \begin{pmatrix}v_1'
v_2'\end{pmatrix}\]
where $v_1, v_2, v_1', v_2'$ are real numbers.





:::example

Describe how each transformation change the square consisting of points $(0,0), (0,1), (1,1)$ and $(1,0)$.


- $\begin{pmatrix}x
y\end{pmatrix} \to \begin{pmatrix}2x
y\end{pmatrix}$

- $\begin{pmatrix}x
y\end{pmatrix} \to \begin{pmatrix}x
-2y\end{pmatrix}$

- $\begin{pmatrix}x
y\end{pmatrix} \to \begin{pmatrix}y
-x\end{pmatrix}$

- $\begin{pmatrix}x
y\end{pmatrix} \to \begin{pmatrix}x+y
x-y\end{pmatrix}$


:::





:::solution

(a) Compute the image of transformation of each point. 
\[\green{\begin{pmatrix}0
0\end{pmatrix} \to \begin{pmatrix}0
0\end{pmatrix}} \qquad 
\textcolor{yellow}{\begin{pmatrix}1
0\end{pmatrix} \to \begin{pmatrix}2
0\end{pmatrix}} \qquad
\blue{\begin{pmatrix}1
1\end{pmatrix} \to \begin{pmatrix}2
1\end{pmatrix}} \qquad 
\red{\begin{pmatrix}0
1\end{pmatrix} \to \begin{pmatrix}0
1\end{pmatrix}} \]




:::tikz TikZ diagram
\begin{tikzpicture}[draw = black]
\draw[<->] (-2.2,0) -- (2.2,0) node [right] {$x$};
\draw[<->] (0,-2.2) -- (0,2.2) node [above] {$y$};
\filldraw[fill = green!50] (0,0) rectangle (0.5,0.5);
\filldraw[fill = green!50] (0,0) circle (0.1cm);
\filldraw[fill = yellow!50] (0.5,0) rectangle (1,0.5);
\filldraw[fill = yellow!50] (1,0) circle (0.1cm);
\filldraw[fill = blue!50] (0.5,0.5) rectangle (1,1);
\filldraw[fill = blue!50](1,1) circle (0.1cm);
\filldraw[fill = red!50] (0,0.5) rectangle (0.5,1);
\filldraw[fill = red!50] (0,1) circle (0.1cm);
\begin{scope}[xshift = 5cm]
\draw[<->] (-2.2,0) -- (2.2,0) node [right] {$x$};
\draw[<->] (0,-2.2) -- (0,2.2) node [above] {$y$};
\filldraw[fill = green!50] (0,0) rectangle (1,0.5);
\filldraw[fill = green!50] (0,0) circle (0.1cm);
\filldraw[fill = yellow!50] (1,0) rectangle (2,0.5);
\filldraw[fill = yellow!50] (2,0) circle (0.1cm);
\filldraw[fill = blue!50] (1,0.5) rectangle (2,1);
\filldraw[fill = blue!50] (2,1) circle (0.1cm);
\filldraw[fill = red!50] (0,0.5) rectangle (1,1);
\filldraw[fill = red!50] (0,1) circle (0.1cm);
\end{scope}
\end{tikzpicture}
:::



This is a dilation in the x-axis by a factor of 2.

:::





:::solution

(b)
\[\green{\begin{pmatrix}0
0\end{pmatrix} \to \begin{pmatrix}0
0\end{pmatrix}} \qquad 
\textcolor{yellow}{\begin{pmatrix}1
0\end{pmatrix} \to \begin{pmatrix}1
0\end{pmatrix}} \qquad
\blue{\begin{pmatrix}1
1\end{pmatrix} \to \begin{pmatrix}1
-2\end{pmatrix}} \qquad 
\red{\begin{pmatrix}0
1\end{pmatrix} \to \begin{pmatrix}0
-2\end{pmatrix}}\] 


:::tikz TikZ diagram
\begin{tikzpicture}[draw = black]
\draw[<->] (-2.2,0) -- (2.2,0) node [right] {$x$};
\draw[<->] (0,-2.2) -- (0,2.2) node [above] {$y$};
\filldraw[fill = green!50] (0,0) rectangle (0.5,0.5);
\filldraw[fill = green!50] (0,0) circle (0.1cm);
\filldraw[fill = yellow!50] (0.5,0) rectangle (1,0.5);
\filldraw[fill = yellow!50] (1,0) circle (0.1cm);
\filldraw[fill = blue!50] (0.5,0.5) rectangle (1,1);
\filldraw[fill = blue!50](1,1) circle (0.1cm);
\filldraw[fill = red!50] (0,0.5) rectangle (0.5,1);
\filldraw[fill = red!50] (0,1) circle (0.1cm);
\begin{scope}[xshift = 5cm]
\draw[<->] (-2.2,0) -- (2.2,0) node [right] {$x$};
\draw[<->] (0,-2.2) -- (0,2.2) node [above] {$y$};
\filldraw[fill = green!50] (0,0) rectangle (0.5,-1);
\filldraw[fill = green!50] (0,0) circle (0.1cm);
\filldraw[fill = yellow!50] (0.5,0) rectangle (1,-1);
\filldraw[fill = yellow!50]  (1,0) circle (0.1cm);
\filldraw[fill = blue!50] (0.5,-1) rectangle (1,-2);
\filldraw[fill = blue!50] (1,-2) circle (0.1cm);
\filldraw[fill = red!50] (0,-1) rectangle (0.5,-2);
\filldraw[fill = red!50] (0,-2) circle (0.1cm);
\end{scope}
\end{tikzpicture}
:::



This is a dilation in the y-axis by a factor of -2.

:::





:::solution

(c)
\[\green{\begin{pmatrix}0
0\end{pmatrix} \to \begin{pmatrix}0
0\end{pmatrix}} \qquad 
\textcolor{yellow}{\begin{pmatrix}1
0\end{pmatrix} \to \begin{pmatrix}0
-1\end{pmatrix}} \qquad
\blue{\begin{pmatrix}1
1\end{pmatrix} \to \begin{pmatrix}-1
1\end{pmatrix}} \qquad 
\red{\begin{pmatrix}0
1\end{pmatrix} \to \begin{pmatrix}-1
0\end{pmatrix}} \]


:::tikz TikZ diagram
\begin{tikzpicture}[draw = black]
\draw[<->] (-2.2,0) -- (2.2,0) node [right] {$x$};
\draw[<->] (0,-2.2) -- (0,2.2) node [above] {$y$};
\filldraw[fill = green!50] (0,0) rectangle (0.5,0.5);
\filldraw[fill = green!50] (0,0) circle (0.1cm);
\filldraw[fill = yellow!50] (0.5,0) rectangle (1,0.5);
\filldraw[fill = yellow!50] (1,0) circle (0.1cm);
\filldraw[fill = blue!50] (0.5,0.5) rectangle (1,1);
\filldraw[fill = blue!50](1,1) circle (0.1cm);
\filldraw[fill = red!50] (0,0.5) rectangle (0.5,1);
\filldraw[fill = red!50] (0,1) circle (0.1cm);
\begin{scope}[xshift = 5cm]
\draw[<->] (-2.2,0) -- (2.2,0) node [right] {$x$};
\draw[<->] (0,-2.2) -- (0,2.2) node [above] {$y$};
\filldraw[fill = green!50] (0,0) rectangle (0.5,-0.5);
\filldraw[fill = green!50] (0,0) circle (0.1cm);
\filldraw[fill = yellow!50] (0,-0.5) rectangle (0.5,-1);
\filldraw[fill = yellow!50] (0,-1) circle (0.1cm);
\filldraw[fill = blue!50] (0.5,-0.5) rectangle (1,-1);
\filldraw[fill = blue!50] (1,-1) circle (0.1cm);
\filldraw[fill = red!50] (0.5,0) rectangle (1,-0.5);
\filldraw[fill = red!50] (1,0) circle (0.1cm);
\end{scope}
\end{tikzpicture}
:::



This is a rotation around the origin $(0,0)$ by 90 degrees.

:::





:::solution

(d)
\[\green{\begin{pmatrix}0
0\end{pmatrix} \to \begin{pmatrix}0
0\end{pmatrix}} \qquad 
\textcolor{yellow}{\begin{pmatrix}1
0\end{pmatrix} \to \begin{pmatrix}1
1\end{pmatrix}} \qquad
\blue{\begin{pmatrix}1
1\end{pmatrix} \to \begin{pmatrix}2
0\end{pmatrix}} \qquad 
\red{\begin{pmatrix}0
1\end{pmatrix} \to \begin{pmatrix}1
-1\end{pmatrix}} \]


:::tikz TikZ diagram
\begin{tikzpicture}[draw = black]
\draw[<->] (-2.2,0) -- (2.2,0) node [right] {$x$};
\draw[<->] (0,-1.5) -- (0,1.5) node [above] {$y$};
\filldraw[fill = green!50] (0,0) rectangle (0.5,0.5);
\filldraw[fill = green!50] (0,0) circle (0.1cm);
\filldraw[fill = yellow!50] (0.5,0) rectangle (1,0.5);
\filldraw[fill = yellow!50] (1,0) circle (0.1cm);
\filldraw[fill = blue!50] (0.5,0.5) rectangle (1,1);
\filldraw[fill = blue!50](1,1) circle (0.1cm);
\filldraw[fill = red!50] (0,0.5) rectangle (0.5,1);
\filldraw[fill = red!50] (0,1) circle (0.1cm);
\begin{scope}[xshift = 5cm]
\draw[<->] (-2.2,0) -- (2.2,0) node [right] {$x$};
\draw[<->] (0,-1.5) -- (0,1.5) node [above] {$y$};
\filldraw[fill = green!50] (0,0) --++ (0.5,0.5) --++ (0.5, -0.5) --++ (-0.5, -0.5) --++ (-0.5, 0.5);
\filldraw[fill = green!50] (0,0) circle (0.1cm);
\filldraw[fill = yellow!50] (0.5,0.5) --++ (0.5,0.5) --++ (0.5, -0.5) --++ (-0.5, -0.5) --++ (-0.5, 0.5);
\filldraw[fill = yellow!50] (1,1) circle (0.1cm);
\filldraw[fill = blue!50] (1,0) --++ (0.5,0.5) --++ (0.5, -0.5) --++ (-0.5, -0.5) --++ (-0.5, 0.5)  ;
\filldraw[fill = blue!50](2,0) circle (0.1cm);
\filldraw[fill = red!50] (0.5,-0.5) --++ (0.5,0.5) --++ (0.5, -0.5) --++ (-0.5, -0.5) --++ (-0.5, 0.5);
\filldraw[fill = red!50] (1,-1) circle (0.1cm);
\end{scope}
\end{tikzpicture}
:::



This is a rotation around the origin $(0,0)$ by 45 degree, and also a dilation in both directions by a factor of $\sqrt{2}$.

:::




:::exercise

Describe how each transformation change the square consisting of points $(0,0), (0,1), (1,1)$ and $(1,0)$. Also, explain in your own words what kind of transformation it looks like.


- $\begin{pmatrix}x
y\end{pmatrix} \to \begin{pmatrix}3x
2y\end{pmatrix}$

- $\begin{pmatrix}x
y\end{pmatrix} \to \begin{pmatrix}-x
2y\end{pmatrix}$

- $\begin{pmatrix}x
y\end{pmatrix} \to \begin{pmatrix}4-x
2-y\end{pmatrix}$


:::
