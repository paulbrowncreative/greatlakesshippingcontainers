"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/analytics";

type Q = { id: "use" | "amount" | "space"; legend: string; options: { value: string; label: string }[] };

const questions: Q[] = [
  {
    id: "use",
    legend: "What will you keep in it?",
    options: [
      { value: "tools", label: "Tools, materials, small equipment" },
      { value: "household", label: "Household or garage items" },
      { value: "inventory", label: "Pallets or business inventory" },
      { value: "tall", label: "Tall equipment or machinery" },
      { value: "convert", label: "Workshop, office or conversion" },
    ],
  },
  {
    id: "amount",
    legend: "Roughly how much?",
    options: [
      { value: "small", label: "Up to ~10 pallets’ worth" },
      { value: "medium", label: "10–20 pallets’ worth" },
      { value: "large", label: "More than 20 pallets’ worth" },
    ],
  },
  {
    id: "space",
    legend: "How much room is on site?",
    options: [
      { value: "tight", label: "Tight — driveway or small lot" },
      { value: "open", label: "Open — yard, farm or large lot" },
    ],
  },
];

type Answers = Partial<Record<Q["id"], string>>;
type Result = { size: string; slug: string; sizeParam: string; why: string };

export function recommend(a: Required<Answers>): Result {
  const tall = a.use === "tall" || a.use === "convert";
  if (a.space === "tight") {
    if (a.amount === "small" || !tall) {
      return {
        size: "20 ft standard",
        slug: "20-ft-shipping-containers",
        sizeParam: "20-standard",
        why:
          a.amount === "small"
            ? "It holds about 1,170 cu ft and needs the least room for delivery — the right fit for a driveway or compact lot."
            : "A tight site limits what a delivery truck can place. A 20-footer is the safe choice; if you need more space, ask us whether two 20s or a 40 can work on your site.",
      };
    }
    return {
      size: "40 ft high cube — if it fits",
      slug: "40-ft-high-cube-containers",
      sizeParam: "40-high-cube",
      why: "You need height and volume, but your site is tight. Send photos with your quote request so we can confirm a 40 can be placed — or discuss a 20 ft high cube.",
    };
  }
  if (tall) {
    return {
      size: "40 ft high cube",
      slug: "40-ft-high-cube-containers",
      sizeParam: "40-high-cube",
      why: "The extra foot of height (about 8 ft 5 in at the door) clears taller equipment and leaves headroom for shelving, insulation or lighting.",
    };
  }
  if (a.amount === "small") {
    return {
      size: "20 ft standard",
      slug: "20-ft-shipping-containers",
      sizeParam: "20-standard",
      why: "About 150 sq ft of floor space covers this comfortably. If you expect to grow, compare a 40 — it often costs less per square foot.",
    };
  }
  return {
    size: "40 ft standard",
    slug: "40-ft-shipping-containers",
    sizeParam: "40-standard",
    why:
      a.amount === "large"
        ? "About 300 sq ft of floor per unit. For more than 20 pallets, plan on one 40 per ~20 pallets — we can quote multiple units in one delivery plan."
        : "About 300 sq ft of floor and 2,390 cu ft — roughly 20 pallets — for a delivery cost usually close to a 20's.",
  };
}

export function ContainerChooser() {
  const [answers, setAnswers] = useState<Answers>({});
  const complete = questions.every((q) => answers[q.id]);
  const result = complete ? recommend(answers as Required<Answers>) : null;

  const choose = (id: Q["id"], value: string) => {
    const nextAnswers = { ...answers, [id]: value };
    setAnswers(nextAnswers);
    if (questions.every((q) => nextAnswers[q.id])) {
      track("container_chooser_result", { result: recommend(nextAnswers as Required<Answers>).sizeParam });
    }
  };

  return (
    <div className="chooser" id="size-chooser">
      <h2 style={{ fontSize: "var(--fs-h3)" }}>Which size do I need?</h2>
      <p className="muted mt-2">Three quick questions. You’ll get a starting recommendation you can send straight into a quote.</p>
      <div className="form mt-5">
        {questions.map((q) => (
          <fieldset key={q.id} className="field">
            <legend>{q.legend}</legend>
            <div className="choice-grid">
              {q.options.map((o) => (
                <label key={o.value} className="choice">
                  <input type="radio" name={`chooser-${q.id}`} value={o.value} checked={answers[q.id] === o.value} onChange={() => choose(q.id, o.value)} />
                  <span>{o.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div aria-live="polite">
        {result && (
          <div className="chooser__result">
            <p className="eyebrow">Our starting recommendation</p>
            <h3>{result.size}</h3>
            <p>{result.why}</p>
            <div className="cluster mt-5">
              <Link className="btn" href={`/quote?size=${result.sizeParam}`}>
                Quote this size
              </Link>
              <Link className="btn btn--light" href={`/containers/${result.slug}`}>
                See specs
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
