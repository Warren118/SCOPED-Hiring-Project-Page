'use client';

import { useEffect, useState } from 'react';

const microscopeSteps = [
  { label: 'Controlled pair', title: 'One field changes. Merit evidence stays fixed.', description: 'Two synthetic résumés are matched on skills, experience, and target role. The only controlled difference is career history.' },
  { label: 'Stage 1 · private panel', title: 'The same cue can change what agents choose to scrutinize.', description: 'Each role records a structured private assessment before selection. These are audit fields—not recovered chain-of-thought.' },
  { label: 'Scrutiny signal', title: 'An extra evidentiary burden becomes observable.', description: 'SCOPED logs a virtual investigation desire when the panel asks for additional verification. It is an audit signal, not a live tool call.' },
  { label: 'Stage 2 · final review', title: 'The final answer can converge after unequal treatment upstream.', description: 'A fresh final panel can reach the same decision while the trajectory has already recorded different scrutiny.' },
] as const;

const lensInfo = [
  ['S', 'Statistical', 'Do groups receive different final outcomes or scores?', 'Compare hire-rate gaps, composite scores, and component-score differences.'],
  ['C', 'Counterfactual', 'Does one controlled cue change treatment for merit-equivalent candidates?', 'Flip one field—such as career gap—then compare votes, scores, and decisions.'],
  ['O', 'Procedural', 'Who receives unequal scrutiny before the decision?', 'Compare private risk cues and investigation-request rates across matched variants.'],
  ['P', 'Pathway', 'At which pipeline stage does disadvantage concentrate?', 'Read Stage-1 pass rates, Stage-2 conversion, and their pathway decomposition.'],
  ['E', 'Dynamic', 'How does burden evolve as agents deliberate?', 'Track score drift, bias pressure, and support or opposition across debate rounds.'],
  ['D', 'Design', 'Which system choices induce, suppress, or relocate burden?', 'Contrast backends, agent topologies, memory, pressure settings, and interventions.'],
] as const;

export default function Home() {
  const [step, setStep] = useState(0);
  const [lens, setLens] = useState(2);

  useEffect(() => {
    const timer = window.setInterval(() => setStep((current) => (current + 1) % microscopeSteps.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const active = microscopeSteps[step];

  return (
    <main>
      <nav className="topbar">
        <a className="brand" href="#top"><b>S</b><span>SCOPED-Hiring</span></a>
        <div className="navlinks"><a href="#microscope">Microscope</a><a href="#framework">Framework</a><a href="#evidence">Evidence</a><a href="#repair">Repair</a></div>
        <span className="badge">EMNLP 2026</span>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">PROCESS-AWARE FAIRNESS DIAGNOSIS</p>
          <h1>Fairness is more than the final decision.</h1>
          <p className="lede">SCOPED-Hiring maps how LLM agents score, scrutinize, debate, and decide—so fairness risk can be located within a multi-agent trajectory.</p>
          <div className="actions"><a className="button primary" href="#microscope">Follow one trajectory <span>↓</span></a><span className="paper-status"><a href="https://github.com/Warren118/SCOPED" target="_blank" rel="noreferrer">Code</a> · <a href="https://huggingface.co/datasets/warrenlvlmgo/SCOPED-Hiring-Trajectories" target="_blank" rel="noreferrer">Data</a> now available</span></div>
        </div>
        <div className="hero-visual" aria-label="A process trajectory that converges on the same hiring outcome after different scrutiny">
          <div className="visual-caption"><span className="pulse" /> OUTCOME CAN CONVERGE · PROCESS CAN DIVERGE</div>
          <div className="mini-candidates"><div className="mini-candidate"><i>CV A</i><b>Matched merit</b><span>continuous history</span></div><div className="mini-candidate risk"><i>CV B</i><b>Matched merit</b><span>career-gap field</span></div></div>
          <div className="hero-panel"><span>STAGE 1 PANEL</span><div className="agent-orbit"><i>Gatekeeper</i><i>Advocate</i><i>Pragmatist</i></div></div>
          <div className="visual-flow">
            <div className="flow-row calm"><b>CV A</b><i /><span>standard review</span><strong>HIRE</strong></div>
            <div className="flow-row risk"><b>CV B</b><i /><span><em>+ scrutiny</em> clarify gap context</span><strong>HIRE</strong></div>
          </div>
          <p className="outcome-lockup">same final decision · different preceding scrutiny</p>
        </div>
      </section>

      <section className="section microscope" id="microscope">
        <div className="section-copy"><p className="eyebrow">PROCESS MICROSCOPE</p><h2>Look inside the decision, one recorded trace at a time.</h2><p>The vignette reflects the two-stage SCOPED-Hiring architecture and a controlled career-gap comparison. It illustrates the kind of structured audit evidence the system records.</p></div>
        <div className="microscope-shell">
          <div className="microscope-top"><span>CONTROLLED AUDIT VIGNETTE</span><small>Illustrative structured audit fields</small></div>
          <div className="stepper" aria-label="Walkthrough steps">{microscopeSteps.map((item, index) => <button key={item.label} className={index === step ? 'active' : index < step ? 'passed' : ''} onClick={() => setStep(index)} aria-current={index === step ? 'step' : undefined}><b>{index + 1}</b><span>{item.label}</span></button>)}</div>
          <div className="microscope-stage">
            <aside><p className="eyebrow">{active.label}</p><h3>{active.title}</h3><p>{active.description}</p><button className="next-step" onClick={() => setStep((step + 1) % microscopeSteps.length)}>{step === 3 ? 'Replay trace ↺' : 'Next trace →'}</button></aside>
            <TraceCanvas step={step} />
          </div>
          <p className="instrument-note"><b>Interpretation note.</b> Private-assessment and investigation-request fields are elicited audit artifacts. They are not raw model chain-of-thought or executed investigations.</p>
        </div>
      </section>

      <section className="section framework" id="framework">
        <div className="section-copy"><p className="eyebrow">SIX FAIRNESS LENSES</p><h2>One trajectory. Six fairness questions.</h2><p>Each lens reads a different slice of the recorded decision trajectory—from final selections to controlled comparisons, scrutiny, stage transitions, deliberation, and system design.</p></div>
        <div className="lens-rail">{lensInfo.map((item, index) => <button className={lens === index ? 'selected' : ''} onClick={() => setLens(index)} key={item[0]}><b>{item[0]}</b><span>{item[1]}</span></button>)}</div>
        <div className="lens-readout"><p><b>{lensInfo[lens][0]}</b> {lensInfo[lens][1]}</p><h3>{lensInfo[lens][2]}</h3><span>{lensInfo[lens][3]}</span></div>
      </section>

      <section className="evidence" id="evidence">
        <div className="section evidence-inner">
          <div className="evidence-heading"><div><p className="eyebrow">DIAGNOSTIC LANDSCAPE</p><h2>A risk map, not a dashboard.</h2></div><p>Across model backends and controlled signal families, the landscape makes visible where outcome-oriented checks understate process-aware risk.</p></div>
          <figure className="landscape-figure"><img src="/figures/landscape.svg" alt="SCOPED diagnostic landscape heatmap showing fairness risk across six lenses, three models, and three signal families." /><figcaption><b>How to read it.</b> Across each row, the map locates risk by fairness lens. Across signal families, it shows which controlled cues activate it. Darker cells mark stronger relative salience.</figcaption></figure>
          <div className="evidence-takeaways"><article><b>5.02×</b><span>career-gap salience in GPT rises from outcome-oriented to process-aware lenses</span></article><article><b>7.41×</b><span>the largest GPT amplification occurs for proxy cues</span></article><article><b>3 backends</b><span>show the same broad shift from result-only to trajectory-aware evidence</span></article></div>
        </div>
      </section>

      <section className="section repair" id="repair">
        <div className="repair-heading"><div><p className="eyebrow">FROM DIAGNOSIS TO REPAIR</p><h2>Diagnose the mechanism. Then repair the burden it creates.</h2></div><p>Fair Skills is a trigger-aware intervention that constrains unsupported suspicion, proxy scoring, and unequal investigation at the point where they arise.</p></div>
        <div className="repair-board"><figure><img src="/figures/fairskills.svg" alt="Fair Skills intervention design and its layered fairness-burden results." /></figure><aside><p className="eyebrow">INT3 · FAIR SKILLS</p><strong>72.3%</strong><h3>lower total layered burden</h3><p>In the pooled Java + HR comparison, the total burden score falls from <b>8.59</b> to <b>2.38</b>.</p><small>The accompanying paper figure reports the intervention logic and full layer-level results.</small></aside></div>
      </section>

      <section className="credit-section"><div className="section credit-inner"><div><p className="eyebrow">APPENDIX EXTENSION</p><h2>A reusable audit logic for high-stakes MAS decisions.</h2><p>SCOPED is designed to travel across high-stakes multi-agent decisions. Its controlled-variant procedure, role- and stage-indexed traces, six lenses, and direction-aware burden analysis stay in place; the domain interface is what changes.</p><p className="credit-boundary">Our simulated credit-underwriting extension rebinds the outcome, applicant cues, score rubrics, and agent roles. It demonstrates portability of the audit design, not deployment readiness or a universal metric set.</p></div><div className="domain-swap"><article><span>WHAT STAYS</span><b>Audit procedure</b><small>matched variants · structured traces · six lenses</small></article><i>→</i><article><span>WHAT CHANGES</span><b>Domain interface</b><small>outcome · attributes · roles · rubrics</small></article><p>Hiring: hire / reject &nbsp; → &nbsp; Credit: approve / decline</p></div></div></section>

      <section className="section resources" id="resources"><p className="eyebrow">RESOURCES</p><h2>Follow the trajectory.</h2><div className="resource-grid"><span><b>Paper</b><small>Camera-ready version · coming soon</small></span><a href="https://github.com/Warren118/SCOPED" target="_blank" rel="noreferrer" aria-label="Open the SCOPED code repository on GitHub"><b>Code <em>↗</em></b><small>GitHub repository</small></a><a href="https://huggingface.co/datasets/warrenlvlmgo/SCOPED-Hiring-Trajectories" target="_blank" rel="noreferrer" aria-label="Open the SCOPED-Hiring Trajectories dataset on Hugging Face"><b>Data <em>↗</em></b><small>Hugging Face release</small></a></div><div className="cite-card"><div><p className="eyebrow">CITE US</p><h3>Preprint coming soon.</h3><p>The complete BibTeX entry will appear here once the arXiv version is online.</p></div><button disabled>Copy BibTeX · coming soon</button></div></section>
      <footer><span>SCOPED-Hiring · EMNLP 2026</span><span>Process-aware fairness diagnosis for multi-agent decisions</span></footer>
    </main>
  );
}

function TraceCanvas({ step }: { step: number }) {
  return <div className={'trace-canvas stage-' + step}>
    {step === 0 && <div className="trace-scene pair-scene"><div className="pair-inputs"><CandidateCard title="Continuous history" detail="No career gap" tone="calm" /><CandidateCard title="Career-gap variant" detail="12-month gap" tone="risk" /></div><div className="hold-fixed">Matched: Python · APIs · SQL · 4 years · Java Developer</div></div>}
    {step === 1 && <div className="trace-scene panel-scene"><div className="scene-kicker">ONE CONTROLLED FIELD ENTERS THE PANEL</div><div className="agent-panel"><div className="panel-label">STAGE 1 · PRIVATE PANEL</div><AuditBubble role="Gatekeeper" tone="risk" body="Evidence to verify: career-gap context" /><AuditBubble role="Advocate" tone="calm" body="Task-relevant skills remain matched" /><AuditBubble role="Pragmatist" tone="neutral" body="Decision signal: pending panel review" /></div></div>}
    {step === 2 && <div className="trace-scene signal-scene"><span>VIRTUAL SCRUTINY SIGNAL</span><b>Request: clarify employment gap</b><p>An additional verification request is recorded for the career-gap variant before selection.</p><div><strong>94%</strong><i>vs</i><strong>32%</strong></div><small>private risk-cue rate · career-gap vs no-gap · GPT</small></div>}
    {step === 3 && <div className="trace-scene final-scene"><div className="final-convergence"><div><b>HIRE</b><span>Continuous history</span></div><i>same final outcome</i><div><b>HIRE</b><span>Career-gap variant</span></div><p>Outcome agreement does not erase the earlier difference in scrutiny.</p></div></div>}
  </div>;
}

function CandidateCard({ title, detail, tone }: { title: string; detail: string; tone: 'calm' | 'risk' }) {
  return <article className={`candidate-card ${tone}`}><span>MERIT-EQUIVALENT CV</span><b>{title}</b><small>Career history</small><strong>{detail}</strong></article>;
}

function AuditBubble({ role, tone, body }: { role: string; tone: 'calm' | 'risk' | 'neutral'; body: string }) {
  return <article className={`audit-bubble ${tone}`}><span>{role}</span><p>{body}</p></article>;
}
