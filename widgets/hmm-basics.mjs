const hidden = [
  0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1,
];

const observed = [...hidden];
[3, 11, 19, 26].forEach((index) => {
  observed[index] = 1 - observed[index];
});

function forwardBackward(switchProbability, emissionError) {
  const n = observed.length;
  const transition = [
    [1 - switchProbability, switchProbability],
    [switchProbability, 1 - switchProbability],
  ];
  const emission = (value, state) =>
    value === state ? 1 - emissionError : emissionError;

  const forward = Array.from({ length: n }, () => [0, 0]);
  forward[0] = [
    0.5 * emission(observed[0], 0),
    0.5 * emission(observed[0], 1),
  ];
  normalize(forward[0]);

  for (let t = 1; t < n; t += 1) {
    for (let state = 0; state < 2; state += 1) {
      forward[t][state] =
        (forward[t - 1][0] * transition[0][state] +
          forward[t - 1][1] * transition[1][state]) *
        emission(observed[t], state);
    }
    normalize(forward[t]);
  }

  const backward = Array.from({ length: n }, () => [1, 1]);
  for (let t = n - 2; t >= 0; t -= 1) {
    for (let state = 0; state < 2; state += 1) {
      backward[t][state] =
        transition[state][0] * emission(observed[t + 1], 0) * backward[t + 1][0] +
        transition[state][1] * emission(observed[t + 1], 1) * backward[t + 1][1];
    }
    normalize(backward[t]);
  }

  return forward.map((probability, t) => {
    const p0 = probability[0] * backward[t][0];
    const p1 = probability[1] * backward[t][1];
    return p1 / (p0 + p1);
  });
}

function normalize(values) {
  const total = values[0] + values[1];
  values[0] /= total;
  values[1] /= total;
}

function render({ model, el }) {
  const parameter = model.get("parameter") === "error" ? "error" : "switch";
  const values = parameter === "switch"
    ? [0.01, 0.03, 0.05, 0.10, 0.20, 0.35, 0.50]
    : [0.01, 0.05, 0.10, 0.20, 0.35, 0.49];
  const title = parameter === "switch"
    ? "What does the transition probability change?"
    : "What does emission error change?";
  const labelText = parameter === "switch"
    ? "Switch probability s"
    : "Emission error e";

  const style = document.createElement("style");
  style.textContent = [
    ":host { color: #20262d; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }",
    ".hmm-card { border: 1px solid #d9e0e7; border-radius: 10px; padding: 14px 16px 12px; background: #fff; box-shadow: 0 1px 3px rgba(23, 40, 55, 0.08); }",
    ".hmm-title { margin: 0 0 8px; font-size: 17px; font-weight: 650; }",
    ".hmm-chart { display: block; width: 100%; height: auto; min-height: 300px; }",
    ".hmm-controls { display: grid; grid-template-columns: auto minmax(180px, 1fr) auto; gap: 12px; align-items: center; margin-top: 4px; }",
    ".hmm-button { border: 1px solid #24567a; border-radius: 6px; padding: 6px 14px; color: #fff; background: #24567a; font: inherit; cursor: pointer; }",
    ".hmm-button:hover { background: #173e5b; }",
    ".hmm-slider { width: 100%; accent-color: #b31b34; }",
    ".hmm-value { min-width: 145px; text-align: right; font-variant-numeric: tabular-nums; font-weight: 600; }",
    "@media (max-width: 620px) { .hmm-controls { grid-template-columns: auto 1fr; } .hmm-value { grid-column: 1 / -1; text-align: left; } }",
  ].join("\n");

  const card = document.createElement("div");
  card.className = "hmm-card";

  const heading = document.createElement("div");
  heading.className = "hmm-title";
  heading.textContent = title;

  const chart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  chart.setAttribute("class", "hmm-chart");
  chart.setAttribute("viewBox", "0 0 860 390");
  chart.setAttribute("role", "img");
  chart.setAttribute("aria-label", title);

  const controls = document.createElement("div");
  controls.className = "hmm-controls";

  const button = document.createElement("button");
  button.className = "hmm-button";
  button.type = "button";
  button.textContent = "Play";

  const slider = document.createElement("input");
  slider.className = "hmm-slider";
  slider.type = "range";
  slider.min = "0";
  slider.max = String(values.length - 1);
  slider.step = "1";
  slider.value = "0";
  slider.setAttribute("aria-label", labelText);

  const valueLabel = document.createElement("div");
  valueLabel.className = "hmm-value";

  controls.append(button, slider, valueLabel);
  card.append(heading, chart, controls);
  el.append(style, card);

  let timer = null;

  function draw(index) {
    const current = values[index];
    const switchProbability = parameter === "switch" ? current : 0.08;
    const emissionError = parameter === "error" ? current : 0.15;
    const posterior = forwardBackward(switchProbability, emissionError);

    const left = 62;
    const right = 828;
    const top = 58;
    const bottom = 326;
    const x = (i) => left + (i * (right - left)) / (observed.length - 1);
    const y = (value) => bottom - value * (bottom - top);
    const points = (series) => series.map((value, i) => x(i) + "," + y(value)).join(" ");
    const observedPoints = observed.map((value, i) =>
      '<circle cx="' + x(i) + '" cy="' + y(value) + '" r="4.2" fill="#b31b34"><title>Position ' + (i + 1) + ': observed ' + value + '</title></circle>'
    ).join("");
    const xTicks = [4, 8, 12, 16, 20, 24, 28, 32].map((tick) =>
      '<line x1="' + x(tick - 1) + '" y1="' + bottom + '" x2="' + x(tick - 1) + '" y2="' + (bottom + 5) + '" stroke="#4d5963"/>' +
      '<text x="' + x(tick - 1) + '" y="' + (bottom + 22) + '" text-anchor="middle" font-size="12" fill="#4d5963">' + tick + '</text>'
    ).join("");
    const yTicks = [0, 0.5, 1].map((tick) =>
      '<line x1="' + (left - 5) + '" y1="' + y(tick) + '" x2="' + right + '" y2="' + y(tick) + '" stroke="#e4e9ee"/>' +
      '<text x="' + (left - 12) + '" y="' + (y(tick) + 4) + '" text-anchor="end" font-size="12" fill="#4d5963">' + tick + '</text>'
    ).join("");

    chart.innerHTML = [
      '<rect x="0" y="0" width="860" height="390" fill="#fff"/>',
      yTicks,
      '<line x1="' + left + '" y1="' + bottom + '" x2="' + right + '" y2="' + bottom + '" stroke="#4d5963"/>',
      xTicks,
      '<polyline points="' + points(hidden) + '" fill="none" stroke="#7a8793" stroke-width="2.5" stroke-dasharray="6 5"/>',
      '<polyline points="' + points(posterior) + '" fill="none" stroke="#24567a" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>',
      observedPoints,
      '<text x="445" y="375" text-anchor="middle" font-size="13" fill="#303943">Position</text>',
      '<text x="16" y="190" text-anchor="middle" font-size="13" fill="#303943" transform="rotate(-90 16 190)">State or probability</text>',
      '<line x1="110" y1="25" x2="145" y2="25" stroke="#7a8793" stroke-width="2.5" stroke-dasharray="6 5"/><text x="151" y="29" font-size="12" fill="#303943">Hidden state</text>',
      '<line x1="280" y1="25" x2="315" y2="25" stroke="#24567a" stroke-width="4"/><text x="321" y="29" font-size="12" fill="#303943">Posterior P(Zt = 1)</text>',
      '<circle cx="515" cy="25" r="4.2" fill="#b31b34"/><text x="526" y="29" font-size="12" fill="#303943">Observed X</text>',
    ].join("");

    valueLabel.textContent = labelText + " = " + current.toFixed(2);
    model.set("index", index);
  }

  function stop() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    button.textContent = "Play";
  }

  slider.addEventListener("input", () => {
    stop();
    draw(Number(slider.value));
  });

  button.addEventListener("click", () => {
    if (timer !== null) {
      stop();
      return;
    }
    button.textContent = "Pause";
    timer = setInterval(() => {
      slider.value = String((Number(slider.value) + 1) % values.length);
      draw(Number(slider.value));
    }, 900);
  });

  draw(0);

  return () => {
    stop();
    card.remove();
    style.remove();
  };
}

export default { render };
