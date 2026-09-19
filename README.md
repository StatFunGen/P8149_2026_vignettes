# P8149 Human Population Genetics

Computational vignettes for BIST P8149 Human Population Genetics at Columbia University.

Website

[https://statfungen.github.io/P8149_2026_vignettes/](https://statfungen.github.io/P8149_2026_vignettes/)

## Local use

Pixi provides the R kernel, Jupyter Book, JupyterLab, and the packages needed to build the site.

```bash
pixi install
pixi run execute
pixi run build
```

Use `pixi run serve` for a live local preview. Use `pixi run jupyter lab` to work with the notebooks in JupyterLab.

## Publication

The GitHub Actions workflow runs both notebooks in the locked Pixi environment, builds the MyST site, and publishes `_build/html` to GitHub Pages. Pull requests run the same execution and build checks without publishing.

After the first push, open the repository settings on GitHub and select **GitHub Actions** as the Pages source. Later pushes to `main` publish the site automatically.
