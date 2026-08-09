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
\[\cvec{v_1}{v_2} \to \cvec{v_1'}{v_2'}\]
where $v_1, v_2, v_1', v_2'$ are real numbers.





:::example

Describe how each transformation change the square consisting of points $(0,0), (0,1), (1,1)$ and $(1,0)$.


- $\cvec{x}{y} \to \cvec{2x}{y}$

- $\cvec{x}{y} \to \cvec{x}{-2y}$

- $\cvec{x}{y} \to \cvec{y}{-x}$

- $\cvec{x}{y} \to \cvec{x+y}{x-y}$


:::





:::solution

(a) Compute the image of transformation of each point. 
\[\green{\cvec{0}{0} \to \cvec{0}{0}} \qquad 
\textcolor{yellow}{\cvec{1}{0} \to \cvec{2}{0}} \qquad
\blue{\cvec{1}{1} \to \cvec{2}{1}} \qquad 
\red{\cvec{0}{1} \to \cvec{0}{1}} \]




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
\[\green{\cvec{0}{0} \to \cvec{0}{0}} \qquad 
\textcolor{yellow}{\cvec{1}{0} \to \cvec{1}{0}} \qquad
\blue{\cvec{1}{1} \to \cvec{1}{-2}} \qquad 
\red{\cvec{0}{1} \to \cvec{0}{-2}}\] 


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
\[\green{\cvec{0}{0} \to \cvec{0}{0}} \qquad 
\textcolor{yellow}{\cvec{1}{0} \to \cvec{0}{-1}} \qquad
\blue{\cvec{1}{1} \to \cvec{-1}{1}} \qquad 
\red{\cvec{0}{1} \to \cvec{-1}{0}} \]


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
\[\green{\cvec{0}{0} \to \cvec{0}{0}} \qquad 
\textcolor{yellow}{\cvec{1}{0} \to \cvec{1}{1}} \qquad
\blue{\cvec{1}{1} \to \cvec{2}{0}} \qquad 
\red{\cvec{0}{1} \to \cvec{1}{-1}} \]


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


- $\cvec{x}{y} \to \cvec{3x}{2y}$

- $\cvec{x}{y} \to \cvec{-x}{2y}$

- $\cvec{x}{y} \to \cvec{4-x}{2-y}$


:::
