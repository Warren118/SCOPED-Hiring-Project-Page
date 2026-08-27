'use client';

import { useState } from 'react';

type CaseKey = 'gap' | 'proxy' | 'identity';

const cases: Record<CaseKey, {
  number: string; tab: string; mechanism: string; title: string; pair: [string, string]; fixed: string;
  signal: string; value: string; signalNote: string; outcome: string; outcomeNote: string;
  repair: string; repairNote: string; detail: string; salience: string;
}> = {
  gap: {
    number: '01', tab: 'Career gap', mechanism: 'Uncertainty → suspicion',
    title: 'A matched employment history can attract more risk framing before selection.',
    pair: ['Continuous history', 'Career-gap variant'], fixed: 'Target role, skills, and experience are held fixed.',
    signal: 'Gap-related private risk cue', value: '94% vs 32%',
    signalNote: 'GPT private-assessment rate for career-gap versus no-gap candidates.',
    outcome: 'Comparatively balanced endpoint', outcomeNote: 'Final hire-rate differences can remain small after earlier scrutiny has diverged.',
    repair: 'Constrain unsupported suspicion', repairNote: 'Fair Skills targets unsupported risk framing and unnecessary clarification at the point it enters the decision.',
    detail: 'The recorded audit fields show a private gap-related cue and a virtual clarification desire before selection. These are elicited audit fields, not recovered chain-of-thought or executed tool calls.',
    salience: '5.02× GPT process-aware / outcome-oriented salience',
  },
  proxy: {
    number: '02', tab: 'University proxy', mechanism: 'Proxy → qualification',
    title: 'A proxy can shape intermediate qualification judgments without a large final-outcome gap.',
    pair: ['Tier 1 university', 'Tier 3 university'], fixed: 'Target role, skills, and experience are held fixed.',
    signal: 'Qualification rubric channel', value: '+0.14–0.32',
    signalNote: 'Composite-score difference observed across GPT, Gemini, and Qwen.',
    outcome: 'A small endpoint gap', outcomeNote: 'A 1–2 pp hire-rate difference does not expose the preceding score separation.',
    repair: 'Constrain proxy-based scoring', repairNote: 'Fair Skills checks whether a proxy begins to stand in for job-relevant evidence in a qualification judgment.',
    detail: 'The trajectory ledger records score and rubric fields alongside the controlled comparison, allowing the audit to locate the qualification channel before the final selection.',
    salience: '7.41× GPT process-aware / outcome-oriented salience',
  },
  identity: {
    number: '03', tab: 'Identity cue', mechanism: 'Matched evidence → unequal scrutiny',
    title: 'Committee assembly can create a process location where unequal scrutiny becomes observable.',
    pair: ['UK White reference', 'UK Black comparison'], fixed: 'Matched candidate evidence and the same GPT backbone are held fixed.',
    signal: 'Committee investigation rate', value: '.305 vs .357',
    signalNote: 'UK White / UK Black comparison after the multi-agent committee is assembled.',
    outcome: 'Unequal scrutiny is localized', outcomeNote: 'The audit identifies where scrutiny changes without asserting a universal causal mechanism.',
    repair: 'Constrain unequal investigation', repairNote: 'Fair Skills targets investigation allocation when unsupported asymmetry appears in the recorded decision path.',
    detail: 'The audit compares a shared single-agent backbone with the assembled committee and records virtual investigation desire as a structured process signal.',
    salience: '2.65× GPT process-aware / outcome-oriented salience',
  },
};

const lenses = [
  ['S', 'Statistical', 'Final outcomes and scores', 'Compare hire-rate gaps, composite scores, and component-score differences.'],
  ['C', 'Counterfactual', 'Matched variants', 'Ask what changes when one controlled signal changes for merit-equivalent candidates.'],
  ['O', 'Procedural', 'Private scrutiny', 'Inspect risk cues and verification burden before a selection is made.'],
  ['P', 'Pathway', 'Stage transitions', 'Locate where disadvantage concentrates across the hiring pipeline.'],
  ['E', 'Dynamic', 'Deliberation', 'Trace shifts in scores, support, and pressure across the decision.'],
  ['D', 'Design', 'System choice', 'Compare backends and MAS configurations that move burden.'],
] as const;

export default function Home() {
  const [caseKey, setCaseKey] = useState<CaseKey>('gap');
  const [lens, setLens] = useState(2);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const active = cases[caseKey];

  return <main>
    <nav className="topbar">
      <a className="brand" href="#top"><b>S</b><span>SCOPED-Hiring</span></a>
      <div className="navlinks"><a href="#evidence">Evidence</a><a href="#theatre">Trajectories</a><a href="#extension">Extension</a><a href="#resources">Resources</a></div>
      <span className="badge">EMNLP 2026</span>
    </nav>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">PROCESS-AWARE FAIRNESS DIAGNOSIS</p>
        <h1>Fairness is more than the final decision.</h1>
        <p className="lede">SCOPED-Hiring follows how LLM agents score, scrutinize, deliberate, and decide—so a fairness risk can be located in the trajectory that produced an outcome.</p>
        <p className="hero-proof"><b>Balanced outcomes can hide unequal treatment upstream.</b> The audit records the decision path as well as its endpoint.</p>
        <div className="actions"><a className="button primary" href="#evidence">See the paper evidence <span>↓</span></a><span className="paper-status"><a href="https://github.com/Warren118/SCOPED" target="_blank" rel="noreferrer">Code</a> · <a href="https://huggingface.co/datasets/warrenlvlmgo/SCOPED-Hiring-Trajectories" target="_blank" rel="noreferrer">Data</a></span></div>
      </div>
      <div className="hero-visual" aria-label="Matched candidate trajectories diverge in process burden before converging at a final hiring outcome">
        <div className="visual-caption"><span className="pulse" /> SAME OUTCOME · DIFFERENT PROCESS BURDEN</div>
        <div className="hero-inputs"><div><span>CV A</span><b>Matched merit</b><small>continuous history</small></div><div className="warm"><span>CV B</span><b>Matched merit</b><small>career-gap field</small></div></div>
        <div className="hero-stages"><span>PRIVATE ASSESSMENT</span><span>TRAJECTORY LEDGER</span><span>FINAL REVIEW</span></div>
        <div className="hero-track calm"><b>CV A</b><i /><span>standard review</span><strong>HIRE</strong></div>
        <div className="hero-track risk"><b>CV B</b><i /><span><em>PROCESS DIVERGES ·</em> + risk cue · clarify gap context</span><strong>HIRE</strong></div>
        <p>Two tracks can visibly converge at the endpoint while retaining different preceding audit records.</p>
      </div>
    </section>

    <section className="evidence" id="evidence"><div className="section evidence-inner">
      <div className="evidence-heading"><div><p className="eyebrow">PAPER EVIDENCE</p><h2>One framework. Three forms of evidence.</h2></div><p>SCOPED reads decision trajectories through six lenses, maps recurring risk across model backends, and tests whether a mechanism-aware intervention reduces the burden it diagnoses.</p></div>
      <div className="evidence-block lenses-block"><div className="block-title"><span>01</span><div><p>THE FRAMEWORK</p><h3>Six lenses for one decision record.</h3></div></div><p className="block-copy">The first two lenses examine outcomes and controlled counterfactuals. The remaining four inspect the process and design choices that shape a decision trajectory.</p><div className="lens-grid" aria-label="Six SCOPED fairness lenses">{lenses.map((item, index) => <button key={item[0]} className={lens === index ? 'selected' : ''} onClick={() => setLens(index)}><b>{item[0]}</b><span>{item[1]}</span></button>)}</div><div className="lens-readout"><b>{lenses[lens][0]}</b><div><p>{lenses[lens][1]} lens</p><h4>{lenses[lens][2]}</h4><span>{lenses[lens][3]}</span></div></div></div>
      <div className="evidence-block landscape-block"><div className="block-title"><span>02</span><div><p>DIAGNOSTIC LANDSCAPE</p><h3>A risk map, not a single score.</h3></div></div><figure className="landscape-figure"><img src="/figures/landscape.svg" alt="SCOPED diagnostic salience heatmap across six fairness lenses, three model backends, and controlled signal families." /><figcaption><b>How to read it.</b> Read across a row to locate the decision layer; compare signal families to see which controlled cues activate risk; darker cells indicate stronger relative diagnostic salience.</figcaption></figure><div className="evidence-takeaways"><article><span>CAREER GAP</span><b>5.02×</b><small>GPT process-aware salience</small></article><article><span>UNIVERSITY PROXY</span><b>7.41×</b><small>GPT process-aware salience</small></article><article><span>IDENTITY CUE</span><b>2.65×</b><small>GPT process-aware salience</small></article></div></div>
      <div className="evidence-block repair-block" id="repair"><div className="block-title"><span>03</span><div><p>FROM DIAGNOSIS TO REPAIR</p><h3>Target the burden where it enters.</h3></div></div><p className="block-copy">Fair Skills activates at the relevant decision point to constrain unsupported suspicion, proxy scoring, and unequal investigation.</p><div className="repair-board"><figure><img src="/figures/fairskills.svg" alt="Fair Skills intervention design and layered fairness-burden results." /></figure><aside><p className="eyebrow">INT3 · FAIR SKILLS</p><strong>72.3%</strong><h4>lower total layered burden</h4><p>The pooled Java + HR score falls from <b>8.59</b> to <b>2.38</b>, displayed as 10<sup>3</sup> × normalized positive burden.</p><p className="secondary-stat"><b>1.86 pp</b> hire-rate shift</p><small>Lower burden does not simply mean maximizing passing rates; the intervention is evaluated against the mechanism identified by the audit.</small></aside></div></div>
    </div></section>

    <section className="section theatre-section" id="theatre">
      <div className="section-copy theatre-intro"><p className="eyebrow">INTERACTIVE TRAJECTORY THEATRE</p><h2>Three observed risk patterns, read through the decision path.</h2><p>Each scene translates a paper result into the audit locations where SCOPED reads it. The theatre explains the evidence above—it does not reproduce every component of the MAS architecture at once.</p></div>
      <div className="case-tabs" role="tablist" aria-label="Choose a risk pattern">{(Object.keys(cases) as CaseKey[]).map((key) => <button key={key} role="tab" aria-selected={key === caseKey} className={key === caseKey ? 'selected' : ''} onClick={() => { setCaseKey(key); setDetailsOpen(false); }}><b>{cases[key].number}</b><span>{cases[key].tab}</span><small>{cases[key].mechanism}</small></button>)}</div>
      <article className="storyboard" aria-label={`${active.tab} trajectory story`}><header><div><p className="eyebrow">{active.number} · {active.tab.toUpperCase()} · {active.mechanism.toUpperCase()}</p><h3>{active.title}</h3></div><p className="story-lead">The signal is recorded before selection, so a comparatively balanced outcome does not erase the earlier difference in burden.</p></header><div className="story-steps"><section><span>01</span><p>CONTROLLED PAIR</p><h4>{active.pair[0]} <i>↔</i> {active.pair[1]}</h4><small>{active.fixed}</small></section><i className="story-arrow">→</i><section className="risk-step"><span>02</span><p>RECORDED PROCESS SIGNAL</p><h4>{active.signal}</h4><b>{active.value}</b><small>{active.signalNote}</small></section><i className="story-arrow">→</i><section className="outcome-step"><span>03</span><p>WHAT THE ENDPOINT MISSES</p><h4>{active.outcome}</h4><small>{active.outcomeNote}</small></section><i className="story-arrow">→</i><section className="repair-step"><span>04</span><p>REPAIR LOCATION</p><h4>{active.repair}</h4><small>{active.repairNote}</small><a href="#repair">See Fair Skills evidence ↓</a></section></div><footer className="story-footer"><button onClick={() => setDetailsOpen((open) => !open)} aria-expanded={detailsOpen}>{detailsOpen ? 'Hide audit detail ↑' : 'View audit detail ↓'}</button><span>{active.salience}</span></footer>{detailsOpen && <div className="audit-detail"><div><p>RECORDED AUDIT FIELDS</p><b>Private assessment · score / rubric · virtual scrutiny · vote / transition</b><small>{active.detail}</small></div><div><p>TWO-STAGE MAS CONTEXT</p><b>Screening panel → executive review</b><small>Role- and stage-indexed records preserve where a process signal enters and how it travels before the final decision.</small></div><div><p>INTERPRETATION BOUNDARY</p><b>Structured audit evidence</b><small>These fields enable controlled comparisons; they are not raw model chain-of-thought or live external investigations.</small></div></div>}</article>
    </section>

    <section className="extension-section" id="extension"><div className="section extension-inner"><div><p className="eyebrow">PORTABILITY + RESOURCES</p><h2>The audit logic can be rebound to a second simulated domain.</h2><p>Controlled variants, structured trajectories, six lenses, and direction-aware analysis remain in place across high-stakes multi-agent decisions. The domain interface is what changes.</p><p className="extension-boundary">In simulated credit underwriting, we rebind the outcome, applicant cues, score rubrics, and agent roles. This is a portability study of the audit design, not a deployment, legal, or universal-metric claim.</p></div><div className="domain-swap"><article><span>WHAT STAYS</span><b>Audit procedure</b><small>matched variants · structured traces · six lenses</small></article><i>→</i><article><span>WHAT CHANGES</span><b>Domain interface</b><small>outcome · attributes · roles · rubrics</small></article><p>Hiring: hire / reject &nbsp; → &nbsp; Credit: approve / decline</p></div></div></section>
    <section className="section resources" id="resources"><p className="eyebrow">RESOURCES</p><h2>Follow the trajectory.</h2><div className="resource-links"><span><b>Paper</b><small>Preprint coming soon</small></span><a href="https://github.com/Warren118/SCOPED" target="_blank" rel="noreferrer"><b>Code ↗</b><small>GitHub repository</small></a><a href="https://huggingface.co/datasets/warrenlvlmgo/SCOPED-Hiring-Trajectories" target="_blank" rel="noreferrer"><b>Data ↗</b><small>Hugging Face release</small></a></div><div className="quiet-cite"><p>CITE US</p><b>Preprint coming soon.</b><span>The complete BibTeX entry will appear here once the arXiv version is online.</span></div></section>
    <footer><span>SCOPED-Hiring · EMNLP 2026</span><span>Process-aware fairness diagnosis for multi-agent decisions</span></footer>
  </main>;
}
