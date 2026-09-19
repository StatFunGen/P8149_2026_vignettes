---
title: P8149 Human Population Genetics
short_title: Home
site:
  hide_title_block: true
  hide_outline: true
---

::::{div}
:class: p8149-hero

**BIST P8149 · Columbia University · 2026**

# Computational Vignettes

Short R notebooks connect population-genetic concepts to calculations that can be inspected, run, and changed.
::::

## Lecture 2

::::{grid} 1 1 2 3
:class: p8149-notebook-grid

:::{card} Allele frequency, likelihood, and EM
:link: P8149_Lecture_2_MAF_MLE_EM.ipynb

Move from direct allele counting to likelihood-based estimation, then account for genotyping error with latent genotypes and EM.

+++
R notebook · Lecture 2
:::

:::{card} A first hidden Markov model
:link: P8149_Lecture_2_HMM_Basics.ipynb

Change transition and emission assumptions, then watch how the posterior probabilities respond.

+++
Interactive R notebook · Lecture 2
:::

:::{card} Copy, switch, and impute with a Li–Stephens HMM
:link: P8149_Lecture_2_Li_Stephens_HMM.ipynb

Use a copying model to connect haplotypes, linkage disequilibrium, recombination, hidden states, and genotype imputation.

+++
R notebook · Lecture 2
:::
::::

## How to use these notebooks

Each vignette starts from one question, derives the basic approach, and finishes with a worked example. Read the narrative first, then run the code from top to bottom. Change one assumption at a time and check which result changes.

The site displays saved notebook outputs. Each GitHub Pages build also runs the notebooks in a clean Pixi environment before publishing them.
