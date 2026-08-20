---
week: 12
order: 2
slug: "1-2-tailed"
title: "One-Tailed and Two-Tailed Tests"
source: "tex/lecture12.tex"
---

## One-Tailed and Two-Tailed Tests

Suppose we have the following null hypothesis and alternative hypothesis

:::note

\[H_0: \mu \geq 1,000\]
\[H_1: \mu < 1,000\]

:::


:::slide

In this case, only when $\overline{X}$ is significantly less than 1,000 will we reject $H_0$, or only when $Z$ falls significantly below zero will we reject $H_0$. Thus the rejection occurs only when $Z$ takes a significantly low value in the *left tail* of its distribution. Such a case is called a **left-tailed test**.


We can also perform a **right-tailed test** and **two-tailed test**.

:::





## Rejection region for H_0: \mu \geq \mu_0


:::note A right-tailed test

\[H_0: \mu \geq \mu_0\]
\[ p = P\left( Z < \frac{\overline{X} - \mu_0}{\sigma/\sqrt{n}}\right) \]

:::


:::figure l08i02.png — The rejection region for a right-tailed test.
:::





## Rejection region for H_0: \mu \leq \mu_0


:::note A left-tailed test

\[H_0: \mu \leq \mu_0\]
\[ p = P\left( Z > \frac{\overline{X} - \mu_0}{\sigma/\sqrt{n}}\right) \]

:::


:::figure l08i03.png — The rejection region for a left-tailed test.
:::





## Rejection region for H_0: \mu = \mu_0


:::note A two-tailed test

\[H_0: \mu = \mu_0\]
\[ p = P\left( Z < -\left|\frac{\overline{X} - \mu_0}{\sigma/\sqrt{n}}\right|\right) + P\left( Z > \left|\frac{\overline{X} - \mu_0}{\sigma/\sqrt{n}}\right|\right) = **2** P\left( Z > \left|\frac{\overline{X} - \mu_0}{\sigma/\sqrt{n}}\right|\right) \]

:::


:::figure l08i04.png — The rejection region for a two-tailed test. We need to consider both the left tail and the right tail for the p-value.
:::
