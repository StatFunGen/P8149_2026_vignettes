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

::::{grid} 1 1 2 2
:class: p8149-notebook-grid

:::{card} A first EM algorithm
:link: P8149_Lecture_2_EM_Basics.ipynb

Learn the E and M steps with two groups and hidden labels.

+++
R notebook · Lecture 2
:::

:::{card} Allele counts, MAF estimation, and genotyping error
:link: P8149_Lecture_2_MAF_MLE_EM.ipynb

Use allele counting and an HWE likelihood, then add genotyping error with latent genotypes and EM.

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

## Lecture 3

::::{grid} 1 1 2 2
:class: p8149-notebook-grid

:::{card} Local IBD from linked markers
:link: P8149_Lecture_3_Local_IBD.ipynb

Use a small hidden Markov model to see why a run of matching markers supports a shared ancestral segment.

+++
R notebook · Lecture 3
:::

:::{card} Genome-wide kinship
:link: P8149_Lecture_3_Genome_Wide_Kinship.ipynb

Average genotype differences across independent SNPs and recover the expected kinship of unrelated pairs and siblings.

+++
R notebook · Lecture 3
:::

::::

## How to use these notebooks

Each vignette starts from one question, identifies the methodological insight, and finishes with a worked example. Read the narrative first, then run the code from top to bottom. Change one assumption at a time and check which result changes.

The site displays saved notebook outputs. Each GitHub Pages build also runs the notebooks in a clean Pixi environment before publishing them.
