'use client';

import { useState } from 'react';

type CaseKey = 'gap' | 'proxy' | 'identity';

const cases: Record<CaseKey, {
  tab: string; eyebrow: string; title: string; summary: string; pair: [string, string]; controlled: string;
  privateLabel: string; privateValue: string; privateNote: string; scrutinyLabel: string; scrutinyNote: string;
  outcomeLabel: string; outcomeValue: string; outcomeNote: string; footer: string;
}> = {
  gap: {
    tab: 'Career gap', eyebrow: 'CAREER GAP · UNCERTAINTY → SUSPICION',
    title: 'A matched employment history can attract more risk framing before selection.',
    summary: 'Across GPT, Gemini, and Qwen, career-gap risk is much more salient in process-aware lenses than in outcome-oriented checks.',
    pair: ['Continuous history', 'Career-gap variant'],
    controlled: 'Matched on target role, skills, and experience; career history is the controlled field.',
    privateLabel: 'Gap-related private risk cue', privateValue: '94% vs 32%',
    privateNote: 'GPT: career-gap versus no-gap candidates. This is a private-assessment rate.',
    scrutinyLabel: 'Virtual investigation desire',
    scrutinyNote: 'Skeptical verification requests are recorded as audit fields before selection—not as executed tool calls.',
    outcomeLabel: 'Final selection', outcomeValue: 'small hire-rate gap',
    outcomeNote: 'The endpoint can appear comparatively balanced while scrutiny has already diverged upstream.',
    footer: '5.02× GPT salience shift: outcome-oriented → process-aware lenses.',
  },
  proxy: {
    tab: 'University proxy', eyebrow: 'UNIVERSITY TIER · PROXY → QUALIFICATION JUDGMENT',
    title: 'A proxy cue can accumulate in scoring without a large final-outcome gap.',
    summary: 'University tier, city tier, and hobbies/SES become visible when they enter ability, stability, or fit judgments.',
    pair: ['Tier 1 university', 'Tier 3 university'], controlled: 'Matched merit evidence; university tier is the controlled proxy cue.',
    privateLabel: 'Qualification-related assessment', privateValue: 'ability · stability · fit',
    privateNote: 'The audit locates when a proxy starts to stand in for job-relevant evidence.',
    scrutinyLabel: 'Score accumulation',
    scrutinyNote: 'Tier 1 candidates receive composite scores 0.14–0.32 points higher across the three model backends.',
    outcomeLabel: 'Final selection', outcomeValue: '1–2 pp hire gap',
    outcomeNote: 'Small hire-rate gaps do not reveal the intermediate score separation.',
    footer: '7.41× GPT salience shift: the largest proxy-cue amplification in the audit.',
  },
  identity: {
    tab: 'Identity cue', eyebrow: 'IDENTITY · MATCHED EVIDENCE → UNEQUAL INVESTIGATION',
    title: 'The same evidence can be placed behind different verification thresholds.',
    summary: 'Identity-related signals concentrate in investigation behavior: who receives extra scrutiny, and how it is framed.',
    pair: ['UK White reference', 'UK Black comparison'],
    controlled: 'Matched evidence; the identity-related group label is the controlled comparison field.',
    privateLabel: 'Evidence enters a committee', privateValue: 'same GPT backbone',
    privateNote: 'The relevant audit location is the committee’s allocation of investigation, not a presumed attribute effect in isolation.',
    scrutinyLabel: 'Committee investigation rate',
    scrutinyNote: '0.305 vs 0.357 for the UK White/Black comparison; the single-agent rates are both above .87.',
    outcomeLabel: 'Process diagnosis', outcomeValue: 'unequal investigation',
    outcomeNote: 'SCOPED isolates the point where matched evidence receives differently distributed scrutiny.',
    footer: '2.65× GPT salience shift: identity-related burden becomes clearer in process-aware evidence.',
  },
};

const lenses = [
  ['S', 'Statistical', 'Final outcomes & scores', 'Hire-rate and score gaps across groups.'],
  ['C', 'Counterfactual', 'Controlled pair', 'Treatment changes after one matched cue flips.'],
  ['O', 'Procedural', 'Private scrutiny', 'Risk cues and verification burdens before selection.'],
  ['P', 'Pathway', 'Stage transitions', 'Where disadvantage concentrates across the pipeline.'],
  ['E', 'Dynamic', 'Deliberation', 'How scores, support, and pressure evolve.'],
  ['D', 'Design', 'System choice', 'How backends and MAS configurations move burden.'],
] as const;

export default function Home() {
  const [caseKey, setCaseKey] = useState<CaseKey>('gap');
  const [lens, setLens] = useState(0);
  const [replay, setReplay] = useState(0);
  const active = cases[caseKey];

  return (
    <main>
      <nav className="topbar">
        <a className="brand" href="#top"><b>S</b><span>SCOPED-Hiring</span></a>
        <div className="navlinks"><a href="#theatre">Trajectories</a><a href="#framework">Framework</a><a href="#evidence">Evidence</a><a href="#repair">Repair</a></div>
        <span className="badge">EMNLP 2026</span>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">PROCESS-AWARE FAIRNESS DIAGNOSIS</p>
          <h1>Fairness is more than the final decision.</h1>
          <p className="lede">SCOPED-Hiring follows how LLM agents score, scrutinize, deliberate, and decide—so a fairness risk can be located in the trajectory that produced an outcome.</p>
          <p className="hero-proof"><b>Balanced outcomes can hide unequal treatment upstream.</b> The audit records the decision path as well as its endpoint.</p>
          <div className="actions"><a className="button primary" href="#theatre">Explore three trajectories <span>↓</span></a><span className="paper-status"><a href="https://github.com/Warren118/SCOPED" target="_blank" rel="noreferrer">Code</a> · <a href="https://huggingface.co/datasets/warrenlvlmgo/SCOPED-Hiring-Trajectories" target="_blank" rel="noreferrer">Data</a></span></div>
        </div>
        <div className="hero-visual" aria-label="Two controlled trajectories with the same visible outcome but different process burden">
          <div className="visual-caption"><span className="pulse" /> SAME OUTCOME · DIFFERENT PROCESS BURDEN</div>
          <div className="hero-inputs"><div><span>CV A</span><b>Matched merit</b><small>continuous history</small></div><div className="warm"><span>CV B</span><b>Matched merit</b><small>career-gap field</small></div></div>
          <div className="hero-stages"><span>PRIVATE ASSESSMENT</span><span>SCRUTINY LEDGER</span><span>FINAL REVIEW</span></div>
          <div className="hero-track calm"><b>CV A</b><i /><span>standard review</span><strong>HIRE</strong></div>
          <div className="hero-track risk"><b>CV B</b><i /><span><em>+ risk cue</em> · clarify gap context</span><strong>HIRE</strong></div>
          <p>Two tracks can visibly converge at the endpoint while retaining different preceding audit records.</p>
        </div>
      </section>

      <section className="section theatre-section" id="theatre">
        <div className="section-copy theatre-intro"><p className="eyebrow">INTERACTIVE TRAJECTORY THEATRE</p><h2>Three observed risk patterns, read through the decision path.</h2><p>Each scene translates a paper result into the recorded locations where SCOPED reads it. The numbers are aggregate findings from controlled comparisons; private assessments and investigation desires are elicited audit fields, not recovered chain-of-thought or live tool use.</p></div>
        <div className="case-tabs" role="tablist" aria-label="Choose a trajectory case">{(Object.keys(cases) as CaseKey[]).map((key) => <button key={key} role="tab" aria-selected={key === caseKey} className={key === caseKey ? 'selected' : ''} onClick={() => setCaseKey(key)}>{cases[key].tab}</button>)}</div>
        <div className="theatre" key={`${caseKey}-${replay}`}>
          <div className="theatre-heading"><div><p className="eyebrow">{active.eyebrow}</p><h3>{active.title}</h3></div><div><p>{active.summary}</p><button onClick={() => setReplay((value) => value + 1)}>Replay trajectory ↺</button></div></div>
          <div className="trajectory-flow">
            <article className="flow-stage pair-stage"><span className="stage-number">01</span><p>CONTROLLED PAIR</p><div className="comparison"><b>{active.pair[0]}</b><i>↔</i><b className="warm-text">{active.pair[1]}</b></div><small>{active.controlled}</small></article>
            <div className="flow-arrow" aria-hidden="true">→</div>
            <article className="flow-stage private-stage"><span className="stage-number">02</span><p>PRIVATE ASSESSMENT</p><b>{active.privateLabel}</b><strong>{active.privateValue}</strong><small>{active.privateNote}</small><span className="ledger-tag">elicited audit field</span></article>
            <div className="flow-arrow" aria-hidden="true">→</div>
            <article className="flow-stage scrutiny-stage"><span className="stage-number">03</span><p>SCRUTINY / SCORING LEDGER</p><b>{active.scrutinyLabel}</b><strong className="process-mark">{caseKey === 'identity' ? '0.305 vs 0.357' : caseKey === 'proxy' ? '+0.14–0.32 score' : 'extra verification'}</strong><small>{active.scrutinyNote}</small><span className="ledger-tag">recorded before selection</span></article>
            <div className="flow-arrow" aria-hidden="true">→</div>
            <article className="flow-stage outcome-stage"><span className="stage-number">04</span><p>OUTCOME / DIAGNOSIS</p><b>{active.outcomeLabel}</b><strong>{active.outcomeValue}</strong><small>{active.outcomeNote}</small></article>
          </div>
          <div className="theatre-footer"><span>How to read this scene</span><p>{active.footer}</p><a href="#evidence">See the diagnostic landscape ↓</a></div>
        </div>
      </section>

      <section className="section framework" id="framework">
        <div className="section-copy"><p className="eyebrow">FROM TRACE TO DIAGNOSIS</p><h2>One decision record. Six ways to ask a fairness question.</h2><p>The first two lenses examine endpoints and controlled counterfactuals. The remaining four inspect how the multi-agent system allocates scrutiny, moves candidates through stages, changes over deliberation, and responds to design choices.</p></div>
        <div className="lens-groups"><div><span>OUTCOME-ORIENTED</span><div className="lens-rail">{lenses.slice(0, 2).map((item, index) => <LensButton key={item[0]} item={item} selected={lens === index} onClick={() => setLens(index)} />)}</div></div><div><span>PROCESS / DESIGN-AWARE</span><div className="lens-rail process-lenses">{lenses.slice(2).map((item, index) => <LensButton key={item[0]} item={item} selected={lens === index + 2} onClick={() => setLens(index + 2)} />)}</div></div></div>
        <div className="lens-readout"><b>{lenses[lens][0]}</b><div><p>{lenses[lens][1]} lens</p><h3>{lenses[lens][2]}</h3><span>{lenses[lens][3]}</span></div></div>
      </section>

      <section className="evidence" id="evidence"><div className="section evidence-inner">
        <div className="evidence-heading"><div><p className="eyebrow">DIAGNOSTIC LANDSCAPE</p><h2>A risk map, not a single score.</h2></div><p>The same matrix connects the three theatre cases to all six lenses, model backends, and controlled signal families.</p></div>
        <figure className="landscape-figure"><img src="/figures/landscape.svg" alt="SCOPED diagnostic landscape heatmap across six lenses, three model backends, and controlled signal families." /><figcaption><b>How to read it.</b> Read across a row to locate the decision layer; compare signal families to see which controlled cues activate risk; darker cells indicate stronger relative diagnostic salience.</figcaption></figure>
        <div className="evidence-takeaways"><article><b>5.02×</b><span>career-gap salience in GPT rises from outcome-oriented to process-aware lenses</span></article><article><b>7.41×</b><span>the largest GPT amplification occurs for proxy cues</span></article><article><b>2.65×</b><span>identity-related risk becomes clearer when investigation is included</span></article></div>
      </div></section>

      <section className="section repair" id="repair">
        <div className="repair-heading"><div><p className="eyebrow">FROM DIAGNOSIS TO REPAIR</p><h2>Diagnose the mechanism. Then target the burden it creates.</h2></div><p>Fair Skills activates at the relevant decision point to constrain unsupported suspicion, proxy scoring, and unequal investigation.</p></div>
        <div className="repair-board"><figure><img src="/figures/fairskills.svg" alt="Fair Skills intervention design and layered fairness-burden results." /></figure><aside><p className="eyebrow">INT3 · FAIR SKILLS</p><strong>72.3%</strong><h3>lower total layered burden</h3><p>The pooled Java + HR score falls from <b>8.59</b> to <b>2.38</b>, displayed as 10<sup>3</sup> × normalized positive burden.</p><p className="secondary-stat"><b>1.86 pp</b> hire-rate shift</p><small>Lower burden does not mean simply maximizing passing rates; the intervention is evaluated against the mechanism identified by the audit.</small></aside></div>
      </section>

      <section className="credit-section"><div className="section credit-inner"><div><p className="eyebrow">APPENDIX EXTENSION</p><h2>The audit logic can be rebound to a second simulated domain.</h2><p>SCOPED’s controlled variants, role- and stage-indexed traces, six lenses, and direction-aware analysis remain in place across high-stakes multi-agent decisions. The domain interface is what must be changed.</p><p className="credit-boundary">In simulated credit underwriting, we rebind the outcome, applicant cues, score rubrics, and agent roles. This tests portability of the audit design; it is not a deployment, legal, or universal-metric claim.</p></div><div className="domain-swap"><article><span>WHAT STAYS</span><b>Audit procedure</b><small>matched variants · structured traces · six lenses</small></article><i>→</i><article><span>WHAT CHANGES</span><b>Domain interface</b><small>outcome · attributes · roles · rubrics</small></article><p>Hiring: hire / reject &nbsp; → &nbsp; Credit: approve / decline</p></div></div></section>

      <section className="section resources" id="resources"><p className="eyebrow">RESOURCES</p><h2>Follow the trajectory.</h2><div className="resource-links"><span><b>Paper</b><small>Preprint coming soon</small></span><a href="https://github.com/Warren118/SCOPED" target="_blank" rel="noreferrer"><b>Code ↗</b><small>GitHub repository</small></a><a href="https://huggingface.co/datasets/warrenlvlmgo/SCOPED-Hiring-Trajectories" target="_blank" rel="noreferrer"><b>Data ↗</b><small>Hugging Face release</small></a></div><div className="cite-card"><div><p className="eyebrow">CITE US</p><h3>Preprint coming soon.</h3><p>The complete BibTeX entry will appear here once the arXiv version is online.</p></div><button disabled>Copy BibTeX · coming soon</button></div></section>
      <footer><span>SCOPED-Hiring · EMNLP 2026</span><span>Process-aware fairness diagnosis for multi-agent decisions</span></footer>
    </main>
  );
}

function LensButton({ item, selected, onClick }: { item: typeof lenses[number]; selected: boolean; onClick: () => void }) {
  return <button className={selected ? 'selected' : ''} onClick={onClick}><b>{item[0]}</b><span>{item[1]}</span></button>;
}
