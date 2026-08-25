'use client';

import { useState } from 'react';

const steps = [
  ['Matched input', 'Two résumés; one controlled difference', 'Skills, experience, target role, and CV content are held fixed. Only the career-history field changes.'],
  ['Stage 1', 'Private panel assessment', 'Gatekeeper, Advocate, and Pragmatist agents independently produce structured assessments and votes.'],
  ['Process signal', 'Scrutiny becomes measurable', 'SCOPED records private risk cues and virtual investigation desires as audit fields before selection.'],
  ['Stage 2', 'Independent final review', 'The first-stage recommendation enters a new panel. The final decision can remain the same despite a different trajectory.'],
] as const;

const landscape = {
  gpt: { gap: [0.035, 0.038, 0.483, 0.054, 0.044, 0.749], proxy: [0.02, 0.03, 0.08, 0.02, 0.04, 0.10], identity: [0.029, 0.028, 0.032, 0.029, 0.069, 0.27] },
  gemini: { gap: [0.045, 0.067, 0.529, 0.045, 0.058, 0.486], proxy: [0.04, 0.06, 0.05, 0.04, 0.01, 0.53], identity: [0.056, 0.042, 0.074, 0.053, 0.534, 0.55] },
  qwen: { gap: [0.016, 0.032, 0.276, 0.016, 0, 0.33], proxy: [0.05, 0.05, 0.03, 0.05, 0.04, 0.21], identity: [0.029, 0.064, 0.025, 0.027, 0.043, 0.272] },
} as const;

const patterns = {
  gpt: [['Career gap', '0.102 → 0.514', '5.02×'], ['Proxy cues', '0.015 → 0.111', '7.41×'], ['Identity cues', '0.135 → 0.357', '2.65×']],
  gemini: [['Career gap', '0.102 → 0.485', '4.75×'], ['Proxy cues', '0.070 → 0.330', '4.72×'], ['Identity cues', '0.214 → 0.644', '3.01×']],
  qwen: [['Career gap', '0.043 → 0.282', '6.58×'], ['Proxy cues', '0.059 → 0.135', '2.27×'], ['Identity cues', '0.165 → 0.404', '2.44×']],
} as const;

const burdens = {
  total: [8.59, 10.07, 8.84, 2.38],
  procedure: [18.41, 18.21, 7.60, 0.33],
  outcome: [3.80, 4.15, 11.29, 1.53],
  structure: [3.38, 3.81, 11.26, 1.66],
  dynamic: [13.55, 20.03, 2.74, 6.85],
} as const;

const lensInfo = [
  ['S', 'Statistical', 'Do groups receive different final outcomes or scores?'],
  ['C', 'Counterfactual', 'Does changing one controlled cue alter treatment?'],
  ['O', 'Procedural', 'Who receives unequal scrutiny before a decision?'],
  ['P', 'Pathway', 'At which stage does burden concentrate?'],
  ['E', 'Dynamic', 'How does burden evolve during deliberation?'],
  ['D', 'Design', 'Which system choices induce or repair burden?'],
] as const;

export default function Home() {
  const [step, setStep] = useState(0);
  const [model, setModel] = useState<keyof typeof landscape>('gpt');
  const [signal, setSignal] = useState<keyof (typeof landscape)['gpt']>('gap');
  const [lens, setLens] = useState(2);
  const [layer, setLayer] = useState<keyof typeof burdens>('total');
  const values = landscape[model][signal];
  const activeLens = lensInfo[lens];
  const modelLabel = model === 'gpt' ? 'GPT' : model === 'gemini' ? 'Gemini' : 'Qwen';

  return (
    <main>
      <nav className="topbar">
        <a className="brand" href="#top"><b>S</b> SCOPED-Hiring</a>
        <div className="navlinks"><a href="#walkthrough">Walkthrough</a><a href="#framework">Framework</a><a href="#evidence">Evidence</a><a href="#repair">Repair</a></div>
        <a className="badge" href="#resources">EMNLP 2026</a>
      </nav>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">PROCESS-AWARE FAIRNESS DIAGNOSIS</p>
          <h1>A balanced hire rate can still hide unequal scrutiny.</h1>
          <p className="lede">SCOPED-Hiring audits how LLM agents reach hiring decisions—not only who they select—so fairness risks can be located within a multi-agent decision trajectory.</p>
          <div className="actions"><a className="button primary" href="#walkthrough">Explore the trajectory <span>↓</span></a><span className="button muted">Paper · coming soon</span></div>
          <p className="byline">Beyond Outcome Gaps: Process-Aware Fairness Diagnosis for LLM-based Multi-Agent Decision Systems</p>
        </div>
        <div className="proof">
          <div className="proof-title"><i /> What outcome-only audits miss</div>
          <div><span>Final outcome</span><strong>HIRE</strong><small>can appear balanced</small></div>
          <div className="risk"><span>Process burden</span><strong>↑</strong><small>can accumulate earlier</small></div>
          <div><span>Audit location</span><strong className="small-strong">Stage · role · interaction</strong></div>
          <p>Six lenses turn trajectories into localized fairness evidence.</p>
        </div>
      </section>

      <section className="section walkthrough" id="walkthrough">
        <div className="section-copy"><p className="eyebrow">CONTROLLED AUDIT VIGNETTE</p><h2>One changed field. Two visibly different paths.</h2><p>This synthetic pair follows the actual two-stage SCOPED-Hiring architecture. It illustrates recorded audit fields rather than a real candidate or a verbatim model trajectory.</p></div>
        <div className="pair-shell">
          <div className="pair-header"><span>MERIT-EQUIVALENT CANDIDATE PAIR</span><small>Fictional, controlled audit illustration</small></div>
          <div className="pair-profiles">
            <Profile side="A" title="Continuous history" cue="No career gap" tone="calm" />
            <Profile side="B" title="Career-gap variant" cue="12-month gap" tone="risk" />
          </div>
          <div className="pair-footer"><b>Held fixed</b> Skills: Python · APIs · SQL &nbsp; / &nbsp; Experience: 4 years &nbsp; / &nbsp; Target role: Java Developer</div>
        </div>

        <div className="trajectory-wide">
          <header><span>STEP THROUGH THE TWO-STAGE TRAJECTORY</span><button onClick={() => setStep((step + 1) % steps.length)}>{step === 3 ? 'Restart walkthrough ↺' : 'Advance step →'}</button></header>
          <div className="track">{steps.map((item, index) => <button key={item[0]} className={`${index === step ? 'current' : ''} ${index < step ? 'done' : ''}`} onClick={() => setStep(index)}><b>{index + 1}</b><span>{item[0]}</span><i /></button>)}</div>
          <div className="parallel-stage">
            <div className="stage-intro"><p className="eyebrow">{steps[step][0]}</p><h3>{steps[step][1]}</h3><p>{steps[step][2]}</p></div>
            <TracePair step={step} />
          </div>
        </div>
      </section>

      <section className="architecture" id="framework"><p>THE ACTUAL PIPELINE</p><div><b>01</b> Controlled variants</div><i>→</i><div><b>02</b> Independent panel review</div><i>→</i><div><b>03</b> Debate if disagreement</div><i>→</i><div><b>04</b> Independent final review</div></section>

      <section className="section lenses-section">
        <div className="section-copy"><p className="eyebrow">THE SCOPED FRAMEWORK</p><h2>Six lenses turn an opaque trajectory into an audit map.</h2><p>Each lens asks a distinct fairness question over recorded outcomes, counterfactual pairs, private assessments, stage transitions, debate dynamics, and system conditions.</p></div>
        <div className="lens-layout">
          <div className="lens-grid">{lensInfo.map((item, index) => <button key={item[0]} className={index === lens ? 'lens-card selected' : 'lens-card'} onClick={() => setLens(index)}><b>{item[0]}</b><span>{item[1]}</span></button>)}</div>
          <div className="lens-detail"><p className="eyebrow">{activeLens[0]} · {activeLens[1]}</p><h3>{activeLens[2]}</h3><p>Click any lens to see the question it contributes to the process-aware audit.</p></div>
        </div>
      </section>

      <section className="evidence-section" id="evidence">
        <div className="section evidence-inner"><div className="section-copy"><p className="eyebrow">DIAGNOSTIC LANDSCAPE</p><h2>Risk has a location, not only a rate.</h2><p>Read across a row to see which fairness lens is most salient. Switch model backends and recurring signal families to see how the diagnostic map changes.</p></div>
          <div className="control-row"><div className="chips" aria-label="Model selector">{(['gpt', 'gemini', 'qwen'] as const).map((key) => <button className={model === key ? 'selected' : ''} onClick={() => setModel(key)} key={key}>{key === 'gpt' ? 'GPT' : key === 'gemini' ? 'Gemini' : 'Qwen'}</button>)}</div><div className="chips signal-chips">{(['gap', 'proxy', 'identity'] as const).map((key) => <button className={signal === key ? 'selected' : ''} onClick={() => setSignal(key)} key={key}>{key === 'gap' ? 'Career gap' : key === 'proxy' ? 'Proxy cues' : 'Identity cues'}</button>)}</div></div>
          <div className="heatmap-wrap"><div className="heatmap-label"><span>{modelLabel} · {signal === 'gap' ? 'Uncertainty → suspicion' : signal === 'proxy' ? 'Qualification sensitivity' : 'Investigation asymmetry'}</span><small>relative salience from the released landscape</small></div><div className="heatmap">{lensInfo.map((item, index) => <div key={item[0]} className="heat-cell" style={{ '--heat': values[index] } as React.CSSProperties}><b>{item[0]}</b><span>{item[1]}</span><small>{values[index].toFixed(3)}</small></div>)}</div><p className="heatmap-note">This is a fairness-risk map: horizontally, it locates the decision layer; by signal family, it shows which controlled cues activate risk; color intensity compares relative salience.</p></div>
          <div className="pattern-grid">{patterns[model].map((item) => <article key={item[0]}><p>{item[0]}</p><strong>{item[1]}</strong><b>{item[2]}</b><small>outcome-oriented → process-aware salience</small></article>)}</div>
        </div>
      </section>

      <section className="section repair-section" id="repair">
        <div className="section-copy"><p className="eyebrow">FROM DIAGNOSIS TO REPAIR</p><h2>Repair is most useful when it targets the mechanism that creates the burden.</h2><p>Fair Skills activates a trigger-aware, process-integrated intervention. It does not simply raise hiring rates: it constrains unsupported suspicion, proxy scoring, and unequal investigation where the trajectory reveals them.</p></div>
        <div className="repair-grid"><div className="skills-flow"><span className="flow-label">INT3 · FAIR SKILLS</span><div className="flow-box">Agent reasoning</div><i>↓</i><div className="flow-box">Trigger check</div><i>↓</i><div className="flow-branches"><div>Uncertainty<br /><b>→ evidence</b></div><div>Proxy cue<br /><b>→ ability</b></div><div>Investigation<br /><b>→ symmetry</b></div></div><i>↓</i><div className="flow-box repair">Invariant + repair</div></div>
          <div className="burden-panel"><header><span>LAYERED FAIRNESS BURDEN</span><small>lower is better · pooled Java + HR</small></header><div className="layer-tabs">{(Object.keys(burdens) as Array<keyof typeof burdens>).map((key) => <button className={layer === key ? 'selected' : ''} onClick={() => setLayer(key)} key={key}>{key}</button>)}</div><div className="bars">{burdens[layer].map((value, index) => <div key={index} className={index === 3 ? 'bar-group best' : 'bar-group'}><div className="bar" style={{ height: `${Math.max(10, value / Math.max(...burdens[layer]) * 160)}px` }}><span>{value.toFixed(2)}</span></div><b>INT{index}</b></div>)}</div><p>{layer === 'total' ? 'INT3 reduces total layered burden from 8.59 to 2.38 (72.3%).' : `INT3 is lowest on the ${layer} layer in this intervention comparison.`}</p></div></div>
      </section>

      <section className="credit-section"><div className="section credit-inner"><div><p className="eyebrow">APPENDIX EXTENSION</p><h2>Rebind the domain interface. Keep the audit logic.</h2><p>In simulated credit underwriting, SCOPED changes the outcome space, signal library, score rubrics, and agent roles while preserving controlled variants, structured trajectories, and direction-aligned diagnosis.</p><p className="credit-caveat">This is an appendix-only portability check—not a credit-deployment recommendation, a legal claim, or evidence that hiring metrics transfer unchanged.</p></div><div className="domain-swap"><article><span>HIRING</span><b>Hire / reject</b><small>CV cues · recruitment roles</small></article><i>⇄</i><article><span>CREDIT</span><b>Approve / decline</b><small>Application cues · underwriting roles</small></article><p>same process-aware audit logic</p></div></div></section>

      <section className="section resources" id="resources"><p className="eyebrow">RESOURCES</p><h2>Audit the trajectory, not only the answer.</h2><div className="resource-grid"><span><b>Paper</b><small>Camera-ready PDF · coming soon</small></span><span><b>Code</b><small>GitHub repository · coming soon</small></span><span><b>Data</b><small>Hugging Face aggregates · coming soon</small></span></div><p className="citation">Zhao*, Chen*, Wu, Fang, Liu, Xu, and Zhou. <i>Beyond Outcome Gaps: Process-Aware Fairness Diagnosis for LLM-based Multi-Agent Decision Systems.</i> EMNLP 2026.</p></section>
      <footer><span>SCOPED-Hiring · EMNLP 2026</span><span>Process-aware fairness diagnosis for multi-agent decisions</span></footer>
    </main>
  );
}

function Profile({ side, title, cue, tone }: { side: string; title: string; cue: string; tone: string }) { return <article className={`profile ${tone}`}><span>VARIANT {side}</span><h3>{title}</h3><p>Career history</p><strong>{cue}</strong><small>All merit-bearing fields remain matched.</small></article>; }

function TracePair({ step }: { step: number }) {
  const content = [
    [['CV fields', 'skills · experience · role'], ['CV fields', 'skills · experience · role']],
    [['Private assessment', 'No elevated risk cue'], ['Private assessment', 'Risk-oriented framing appears']],
    [['Virtual scrutiny', '32% private risk-cue rate'], ['Virtual scrutiny', '94% private risk-cue rate']],
    [['Final decision', 'HIRE'], ['Final decision', 'HIRE']],
  ][step];
  return <div className="trace-pair"><TraceSide tone="calm" label="Continuous history" detail={content[0]} /><TraceSide tone="risk" label="Career-gap variant" detail={content[1]} /></div>;
}

function TraceSide({ tone, label, detail }: { tone: string; label: string; detail: readonly string[] }) { return <article className={`trace-side ${tone}`}><span>{label}</span><h4>{detail[0]}</h4><strong>{detail[1]}</strong>{detail[0] === 'Final decision' && <small>Same outcome; different preceding burden.</small>}</article>; }
