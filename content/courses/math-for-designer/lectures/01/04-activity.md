---
week: 1
order: 4
slug: "activity"
title: "Activity"
source: "tex/lecture01.tex"
---

## Let's Play! Things in Rings


:::figure set_things_in_rings — Things in Rings - a board game about guessing categories using Venn diagram as a mechanics [](https://boardgamegeek.com/boardgame/408547/things-in-rings
:::
)




## Let's Play! - Things in Rings



:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.8]
\draw[very thick] (-2.5, -4) rectangle (4, 3);
\draw[red!50!white] (0,0) circle (20mm);
\node at (0,2.5) {A};
\draw[blue!50!white] (1.5,0) circle (20mm);
\node at (1.5, 2.5) {B};
\draw[green!50!white] (0.75,-1) circle (20mm);
\node at (0.75, -3.5) {C};
\end{tikzpicture}
:::


*A blank Venn diagram for 3 sets*





## Guess My Set

**Goal**: Correctly place items three times in a row.

**Set up**: 


- Find a game master (GM). Open [https://things-in-rings.vercel.app/en](https://things-in-rings.vercel.app/en) to generate a question.

- Split players into 3 teams.

**Turn sequence**:


- The active team thinks of an object, and then guess where it belongs to in the Venn diagram.

- The GM says yes if the object is in the guessed region.

- The active player writes down the object in the correct section on the Venn diagram.

**Game end**: The first team who correctly place items three times in a row wins! (Note that you don't need to completely determine the categories)




:::figure set_things_in_rings_rule — Attribute, Word and Context
:::




## Example




:::tikz TikZ diagram
\begin{tikzpicture}[scale = 0.8]
\draw (-5, -5) rectangle (6.6,3.5);
\filldraw[opacity = 0.5, fill = yellow!20, draw = black] (0,0) circle (2cm);
\filldraw[opacity = 0.5, fill = blue!20, draw = black] (1.6,0) circle (2cm);
\filldraw[opacity = 0.5, fill = red!20, draw = black] (0.8,-1.2) circle (2cm);
\node[brown, align = center] at (-2.4,2.7) {[Word] \\ 6 or more letters};
\node[teal, align = center] at (4,2.7) {[Attribute] \\ Fit in a microwave};
\node[red, align =center] at (0.8,-4) {[Context] \\ Require electricity};
\node[scale = 0.5] at (0.8, 1) {Pencil};
\node[scale = 0.5] at (-1, 1) {Mountain};
\node[scale = 0.5] at (2.5, 0.5) {Paper};
\node[scale = 0.5] at (0.8, -2.5) {Car};
\node[scale = 1] at (0.8, -0.6) {Computer};
\end{tikzpicture}
:::







:::exercise Post-play

Answer the followings and submit them on Teams


- Take a photo of the final diagram

- Find 2 items which goes to the center (belongs to all categories)

- Find 2 items which goes outside the diagram (doesn't belong to any category)f

- In your opinion, which category is the hardest? Why?


:::
