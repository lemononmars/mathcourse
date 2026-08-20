---
week: 11
order: 3
slug: "type-i-and-type-ii-errors"
title: "Type I and Type II Errors"
source: "tex/lecture11.tex"
---

## Evidence gathering


\setlength
- sep{20pt}

- Ideally, we could measure the whole population and calculate the exact value of the population parameter in question.

- Since that is almost impossible, the evidence is gathered from a random sample of the population.

- How confident we can be depends on the sample size and parameters such as the population variance.





## Type I and Type II Errors




- In our professional and personal lives we often have to make an accept-reject type of decision based on incomplete data.

- As long as such decisions are made based on evidence that does not provide $100\%$ confidence, there will be chances for error.



:::slide




| | $H_0$ true | $H_0$ false |
| --- | --- | --- |
| \multirow{2}{*}{Do not reject $H_0$} | \multirow{2}{*}{No error} | \textcolor{red}{Type II error} |
| | | (False positive) |
| \multirow{2}{*}{Reject $H_0$} | \textcolor{olive}{Type I error} | \multirow{2}{*}{No error} |
| | (False negative) | |



:::






## Suspicious Results


:::example

Pregnancy test - $H_0:$ The patient is pregnant.

:::




:::figure l08i05.png
:::






## Pollution

Consider the hypothesis: 

$H_0:$ water spray helps reducing level of PM 2.5.




:::figure l08i01.png
:::

*https://www.straitstimes.com/asia/se-asia/thai-government-apologises-for-bangkoks-suffocating-hazardous-smog*





## Example

Consider the hypothesis: 

$H_0:$ water spray helps reducing level of PM 2.5.




| | $H_0$ true | $H_0$ false |
| --- | --- | --- |
| | It helps. | It does not help. |
| Do not reject $H_0$ | **No error** | \textcolor{red}{Type II error} |
| Use water spray | Decrease PM 2.5 level :) | Waste water |
| Reject $H_0$ | \textcolor{olive}{Type I error} | **No error** |
| Do not use water spray | Lose opportunity | Save money :) |






:::example

Suppose the null hypothesis is $H_0$: The victim of an automobile accident is alive when he arrives at the emergency room of a hospital. List all possible scenarios.

:::


:::solution




| | $H_0$ true | $H_0$ false |
| --- | --- | --- |
| | **[Still alive](https://www.youtube.com/watch?v=Y6ljFaKRTrI)** | Already dead |
| Do not reject $H_0$ | **No error** | \textcolor{red}{Type II error} |
| Treat | The victim survives :) | Waste resources |
| Reject $H_0$ | \textcolor{olive}{Type I error} | **No error** |
| Do not treat | The victim dies horribly | Save resources :) |



:::





## Remarks 1

{ Can we reduce the probability of type I error (false positive) to zero?}



:::slide




| | $H_0$ true | $H_0$ false |
| --- | --- | --- |
| **Always** Do not reject $H_0$ | **No error** | \textcolor{red}{Type II error} |
| | | High |
| \sout{Reject $H_0$} | \textcolor{olive}{Type I error} | **No error** |
| | \textcolor{olive}{0\%} | |



:::





## Remarks 2

{ Can we reduce the probability of type II error (false negative) to zero? }



:::slide




| | $H_0$ true | $H_0$ false |
| --- | --- | --- |
| \sout{Do not reject $H_0$} | **No error** | \textcolor{red}{Type II error} |
| | | \textcolor{red}{0\%} |
| **Always** Reject $H_0$ | \textcolor{olive}{Type I error} | **No error** |
| | High | |



:::





## Remarks 3

{ So, it would be of our best interest to settle for some small, optimal probability of each type of error.}



:::slide




| | $H_0$ true | $H_0$ false |
| --- | --- | --- |
| **Sometimes** Do not reject $H_0$ | **No error** | \textcolor{red}{Type II error} |
| | | Some \% |
| **Sometimes** Reject $H_0$ | \textcolor{olive}{Type I error} | **No error** |
| | Some \% | |



:::
