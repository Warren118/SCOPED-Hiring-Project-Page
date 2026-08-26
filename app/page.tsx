'use client';

import { useState } from 'react';

type CaseKey = 'gap' | 'proxy' | 'identity';

const caseData: Record<CaseKey, {
  number: string;
  tab: string;
  subtitle: string;
  eyebrow: string;
  title: string;
  pair: [string, string];
  fixed: string;
  ledgerTitle: string;
  ledgerValue: string;
  ledgerNote: string;
  scrutinyTitle: string;
  scrutinyNote: string;
  outcome: string;
  outcomeNote: string;
  close: string;
}> = {
  gap: {
    number: '01', tab: 'CAREER GAP', subtitle: 'Uncertainty → Suspicion', eyebrow: 'CAREER GAP · UNCERTAINTY → SUSPICION',
    title: 'A matched employment history can attract more risk framing before selection.',
    pair: ['Continuous history', 'Career-gap variant'], fixed: 'role · skills · experience',
    ledgerTitle: 'Private gap-related risk cue', ledgerValue: '94% vs 32%', ledgerNote: 'GPT · career-gap vs no-gap candidates · private-assessment rate',
    scrutinyTitle: 'Virtual clarification desire', scrutinyNote: 'A recorded audit signal for additional verification—not an executed tool call.',
    outcome: 'comparatively balanced endpoint', outcomeNote: 'The final hire-rate gap stays small while process burden has already diverged.',
    close: '5.02× GPT process-aware / outcome-oriented salience',
  },
  proxy: {
    number: '02', tab: 'UNIVERSITY PROXY', subtitle: 'Proxy → Qualification', eyebrow: 'UNIVERSITY TIER · PROXY → QUALIFICATION',
    title: 'A proxy can shape intermediate qualification judgments without a large final-outcome gap.',
    pair: ['Tier 1 university', 'Tier 3 university'], fixed: 'role · skills · experience',
    ledgerTitle: 'Qualification rubric channel', ledgerValue: '+0.14–0.32', ledgerNote: 'Composite-score difference across GPT, Gemini, and Qwen',
    scrutinyTitle: 'Potential · stability · fit', scrutinyNote: 'The audit marks when a proxy begins to stand in for job-relevant evidence.',
    outcome: '1–2 pp hire-rate gap', outcomeNote: 'The small endpoint difference does not reveal the intermediate score separation.',
    close: '7.41× GPT process-aware / outcome-oriented salience',
  },
  identity: {
    number: '03', tab: 'IDENTITY', subtitle: 'Matched evidence → Unequal Scrutiny', eyebrow: 'IDENTITY · MATCHED EVIDENCE → UNEQUAL SCRUTINY',
    title: 'The assembled committee creates a process location where unequal scrutiny becomes observable.',
    pair: ['UK White reference', 'UK Black comparison'], fixed: 'matched evidence · same GPT backbone',
    ledgerTitle: 'Committee investigation rate', ledgerValue: '.305 vs .357', ledgerNote: 'UK White / UK Black comparison after the committee is assembled',
    scrutinyTitle: 'Virtual investigation desire', scrutinyNote: 'Investigation allocation is a recorded audit field, not an external investigation.',
    outcome: 'unequal scrutiny is localized', outcomeNote: 'The audit identifies a trajectory location without claiming a general causal mechanism.',
    close: '2.65× GPT process-aware / outcome-oriented salience',
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
  const [lens, setLens] = useState(2);
  const [replay, setReplay] = useState(0);
  const active = caseData[caseKey];

  return <main>
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
      <div className="hero-visual" aria-label="A process diagram where controlled trajectories diverge before converging at the same outcome">
        <div className="visual-caption"><span className="pulse" /> PROCESS-AWARE FAIRNESS DIAGNOSIS</div>
        <div className="hero-inputs"><div><span>CV A</span><b>Matched merit</b><small>continuous history</small></div><div className="warm"><span>CV B</span><b>Matched merit</b><small>career-gap field</small></div></div>
        <div className="hero-stages"><span>PRIVATE ASSESSMENT</span><span>TRAJECTORY LEDGER</span><span>FINAL REVIEW</span></div>
        <div className="hero-track calm"><b>CV A</b><i /><span>standard review</span><strong>HIRE</strong></div>
        <div className="hero-track risk"><b>CV B</b><i /><span><em>PROCESS DIVERGES ·</em> + risk cue · clarify gap context</span><strong>HIRE</strong></div>
        <p>Two tracks can visibly converge at the endpoint while retaining different preceding audit records.<span className="outcome-inline">OUTCOME CONVERGES</span></p>
      </div>
    </section>

    <section className="section theatre-section" id="theatre">
      <div className="section-copy theatre-intro"><p className="eyebrow">INTERACTIVE MAS TRAJECTORY THEATRE</p><h2>See where unequal treatment enters a multi-agent decision.</h2><p>Each case shares one two-stage MAS architecture. What changes is the controlled cue and the audit location that becomes salient. Private assessments and investigation desires are elicited audit fields—not recovered chain-of-thought or live tool use.</p></div>
      <div className="case-tabs" role="tablist" aria-label="Choose a trajectory case">{(Object.keys(caseData) as CaseKey[]).map((key) => <button key={key} role="tab" aria-selected={key === caseKey} className={key === caseKey ? 'selected' : ''} onClick={() => setCaseKey(key)}><b>{caseData[key].number}</b><span>{caseData[key].tab}</span><small>{caseData[key].subtitle}</small></button>)}</div>
      <section className={`mas-theatre case-${caseKey}`} key={`${caseKey}-${replay}`} aria-label={`${active.tab} multi-agent trajectory`}>
        <header className="theatre-head"><div><p className="eyebrow">{active.eyebrow}</p><h3>{active.title}</h3></div><button onClick={() => setReplay((value) => value + 1)}>Replay trajectory ↺</button></header>
        <div className="mas-topline"><div className="controlled-pair"><p>CONTROLLED PAIR</p><div><b className="reference">{active.pair[0]}</b><i>↔</i><b className="comparison">{active.pair[1]}</b></div></div><p className="held-fixed"><b>HELD FIXED</b>{active.fixed}</p><div className="flow-key"><span className="candidate-key" /> Candidate evidence <span className="private-key" /> Private → ledger <span className="public-key" /> Peer-visible</div></div>
        <div className="mas-map">
          <section className="stage-one"><p className="stage-label">STAGE 1 · SCREENING</p><div className="candidate-feed"><span>controlled candidate evidence</span></div><p className="public-label">PUBLIC DELIBERATION · PEER-VISIBLE</p><div className="screening-agents"><AgentNode role="Tech Lead" /><AgentNode role="Peer Dev" /><AgentNode role="Recruiter" /></div></section>
          <section className="ledger"><div><p>TRAJECTORY LEDGER</p><small>private assessment · score / rubric · virtual scrutiny · vote / transition</small></div><article className="ledger-evidence"><span>{active.ledgerTitle}</span><b>{active.ledgerValue}</b><small>{active.ledgerNote}</small></article><article className="scrutiny-record"><span>VIRTUAL SCRUTINY</span><b>{active.scrutinyTitle}</b><small>{active.scrutinyNote}</small></article><p className="private-note">PRIVATE FIELD<br /><span>hidden from peers · elicited audit field</span></p></section>
          <div className="stage-transition"><span>STAGE TRANSITION</span><i>→</i></div>
          <section className="stage-two"><p className="stage-label">STAGE 2 · EXECUTIVE</p><div className="executive-agents"><AgentNode role="VP Engineering" /><AgentNode role="Hiring Manager" /><AgentNode role="HR Director" /></div></section>
          {caseKey === 'identity' && <div className="identity-morph"><p>SAME GPT BACKBONE</p><span>single agent: <b>&gt; .87</b></span><span>single agent: <b>&gt; .87</b></span><i>committee assembled →</i></div>}
        </div>
        <footer className="outcome-strip"><div><p>FINAL OUTCOME</p><b>{active.outcome}</b><small>{active.outcomeNote}</small></div><div className="quiet-outcomes"><span>HIRE</span><i>↔</i><span>HIRE</span></div><aside><p>{caseKey === 'gap' ? 'PROCESS DIVERGES' : caseKey === 'proxy' ? 'SCORING DIVERGES' : 'SCRUTINY DIVERGES'}</p><b>{active.close}</b></aside></footer>
      </section>
    </section>

    <section className="section framework" id="framework">
      <div className="section-copy"><p className="eyebrow">FROM TRACE TO DIAGNOSIS</p><h2>One decision record. Six ways to ask a fairness question.</h2><p>The first two lenses examine endpoints and controlled counterfactuals. The remaining four inspect how the multi-agent system allocates scrutiny, moves candidates through stages, changes over deliberation, and responds to design choices.</p></div>
      <div className="analytical-rail" aria-label="Six SCOPED fairness lenses"><span className="rail-label">OUTCOME-ORIENTED</span><div className="rail-nodes">{lenses.slice(0, 2).map((item, index) => <LensNode item={item} selected={lens === index} onClick={() => setLens(index)} key={item[0]} />)}</div><i className="rail-divider" /><div className="rail-nodes process-nodes">{lenses.slice(2).map((item, index) => <LensNode item={item} selected={lens === index + 2} onClick={() => setLens(index + 2)} key={item[0]} />)}</div><span className="rail-label process-label">PROCESS / DESIGN-AWARE</span></div>
      <div className="lens-readout"><b>{lenses[lens][0]}</b><div><p>{lenses[lens][1]} lens</p><h3>{lenses[lens][2]}</h3><span>{lenses[lens][3]}</span></div></div>
    </section>

    <section className="evidence" id="evidence"><div className="section evidence-inner">
      <div className="evidence-heading"><div><p className="eyebrow">DIAGNOSTIC LANDSCAPE</p><h2>Map the three cases across the audit.</h2></div><p>Aggregate evidence confirms where each controlled cue becomes more visible once the trajectory, not only its endpoint, is measured.</p></div>
      <figure className="landscape-figure"><img src="/figures/landscape.svg" alt="SCOPED diagnostic salience heatmap across six fairness lenses, three model backends, and multiple controlled signal families." /><figcaption><b>How to read it.</b> Read across a row to locate the decision layer; compare signal families to see which controlled cues activate risk; darker cells indicate stronger relative diagnostic salience.</figcaption></figure>
      <div className="evidence-takeaways"><article><span>01 · CAREER GAP</span><b>5.02×</b><small>process-aware salience in GPT</small></article><article><span>02 · PROXY</span><b>7.41×</b><small>process-aware salience in GPT</small></article><article><span>03 · IDENTITY</span><b>2.65×</b><small>process-aware salience in GPT</small></article></div>
    </div></section>

    <section className="section repair" id="repair">
      <div className="repair-heading"><div><p className="eyebrow">FROM DIAGNOSIS TO REPAIR</p><h2>Diagnose the mechanism. Then target the burden it creates.</h2></div><p>Fair Skills activates at the relevant decision point to constrain unsupported suspicion, proxy scoring, and unequal investigation.</p></div>
      <p className="repair-bridge"><b>DIAGNOSED ABOVE</b> · 01 Suspicion · 02 Proxy scoring · 03 Investigation asymmetry <i>→</i> <b>FAIR SKILLS</b></p>
      <div className="repair-board"><figure><img src="/figures/fairskills.svg" alt="Fair Skills intervention design and layered fairness-burden results." /></figure><aside><p className="eyebrow">INT3 · FAIR SKILLS</p><strong>72.3%</strong><h3>lower total layered burden</h3><p>The pooled Java + HR score falls from <b>8.59</b> to <b>2.38</b>, displayed as 10<sup>3</sup> × normalized positive burden.</p><p className="secondary-stat"><b>1.86 pp</b> hire-rate shift</p><small>Lower burden does not mean simply maximizing passing rates; the intervention is evaluated against the mechanism identified by the audit.</small></aside></div>
    </section>

    <section className="credit-section"><div className="section credit-inner"><div><p className="eyebrow">APPENDIX EXTENSION</p><h2>Rebind the audit logic to a second simulated domain.</h2><p>Controlled variants, structured trajectories, six lenses, and direction-aware analysis stay in place. The domain interface is what changes.</p><p className="credit-boundary">In simulated credit underwriting, we rebind the outcome, applicant cues, score rubrics, and agent roles. This tests portability of the audit design—not deployment readiness, legal compliance, or a universal metric set.</p></div><div className="domain-swap"><article><span>WHAT STAYS</span><b>Audit procedure</b><small>matched variants · structured traces · six lenses</small></article><i>→</i><article><span>WHAT CHANGES</span><b>Domain interface</b><small>outcome · attributes · roles · rubrics</small></article><p>Hiring: hire / reject &nbsp; → &nbsp; Credit: approve / decline</p></div></div></section>

    <section className="section resources" id="resources"><p className="eyebrow">RESOURCES</p><h2>Follow the trajectory.</h2><div className="resource-links"><span><b>Paper</b><small>Preprint coming soon</small></span><a href="https://github.com/Warren118/SCOPED" target="_blank" rel="noreferrer"><b>Code ↗</b><small>GitHub repository</small></a><a href="https://huggingface.co/datasets/warrenlvlmgo/SCOPED-Hiring-Trajectories" target="_blank" rel="noreferrer"><b>Data ↗</b><small>Hugging Face release</small></a></div><p className="quiet-cite">BibTeX will be added with the arXiv preprint.</p></section>
    <footer><span>SCOPED-Hiring · EMNLP 2026</span><span>Process-aware fairness diagnosis for multi-agent decisions</span></footer>
  </main>;
}

function AgentNode({ role }: { role: string }) { return <div className="agent-node"><i /><b>{role}</b><span>agent</span></div>; }
function LensNode({ item, selected, onClick }: { item: typeof lenses[number]; selected: boolean; onClick: () => void }) { return <button className={selected ? 'selected' : ''} onClick={onClick} aria-label={`${item[1]} lens`}><b>{item[0]}</b><span>{item[1]}</span></button>; }
