import React, { useRef, useState } from 'react';
import './styles.css';

const workflow = [
  ['01', 'Upload notice', 'Start a case'],
  ['02', 'Notice analysis', 'Confirm extracted facts'],
  ['03', 'Upload evidence', 'Add supporting files'],
  ['04', 'Evidence & research', 'Review findings'],
  ['05', 'Draft response', 'Edit and review'],
];

const sampleFiles = [
  { name: 'GSTR-1_Jul-Sep_2026.xlsx', type: 'Return summary', size: '84 KB', status: 'Matched', detail: 'Outward supplies reported in GSTR-1' },
  { name: 'GSTR-3B_Jul-Sep_2026.xlsx', type: 'Return summary', size: '71 KB', status: 'Matched', detail: 'Tax discharged in GSTR-3B' },
  { name: 'Sales_Register_Q2_2026.xlsx', type: 'Ledger extract', size: '212 KB', status: 'Partial match', detail: 'Transactions are available; reconciliation needs review' },
  { name: 'Credit_Notes_Q2_2026.pdf', type: 'Supporting documents', size: '1.2 MB', status: 'Review needed', detail: 'Credit-note adjustments need transaction-level validation' },
];

const initialDraft = `Subject: Response to GST mismatch notice — July–September 2026\n\nTo the Proper Officer,\n\nWith reference to the notice concerning the reported difference between outward supplies in GSTR-1 and tax discharged in GSTR-3B for July–September 2026, we are reviewing the underlying return data and supporting records.\n\nThe preliminary reconciliation indicates that credit-note and amendment entries may contribute to the difference. The exact treatment and amount remain subject to transaction-level verification. The reconciled working and supporting documents will be provided after the outstanding items listed in this workspace have been validated.\n\nWe request that the reconciliation and supporting evidence be considered as part of the review.\n\nRegards,\nApex Manufacturing Pvt. Ltd.\n\n[REVIEW REQUIRED: Confirm all facts, amounts, legal provisions and references before use.]`;

function App() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [noticeName, setNoticeName] = useState('');
  const [noticeReady, setNoticeReady] = useState(false);
  const [evidence, setEvidence] = useState([]);
  const [evidenceAnalyzed, setEvidenceAnalyzed] = useState(false);
  const [draft, setDraft] = useState(initialDraft);
  const [reviewed, setReviewed] = useState(false);
  const [statusNote, setStatusNote] = useState('');
  const noticeInput = useRef(null);
  const evidenceInput = useRef(null);

  const loadSampleNotice = () => {
    setNoticeName('GST_ASMT10_Apex_Manufacturing.pdf');
    setNoticeReady(true);
    setStatusNote('Sample notice loaded. This fictional case is ready for the demo analysis.');
  };

  const onNoticeFile = (file) => {
    if (!file) return;
    setNoticeName(file.name);
    setNoticeReady(true);
    setStatusNote('File attached. For this prototype, extraction is represented by the synthetic sample analysis.');
  };

  const addFiles = (files) => {
    const rows = Array.from(files || []).map(file => ({
      name: file.name,
      type: /gstr/i.test(file.name) ? 'Return / tax record' : /invoice/i.test(file.name) ? 'Invoice' : 'Supporting document',
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      status: 'Uploaded',
      detail: 'File attached; content parsing is not enabled in this demo',
      id: `${file.name}-${file.size}-${file.lastModified}`,
    }));
    if (rows.length) {
      setEvidence(prev => [...prev, ...rows]);
      setEvidenceAnalyzed(false);
      setReviewed(false);
      setStatusNote(`${rows.length} evidence file(s) added.`);
    }
  };

  const loadEvidenceBundle = () => {
    setEvidence(sampleFiles.map(file => ({ ...file, id: file.name, sample: true })));
    setEvidenceAnalyzed(false);
    setReviewed(false);
    setStatusNote('Four fictional evidence files added. Run evidence analysis to view the sample findings.');
  };

  const analyzeEvidence = () => {
    const analysed = evidence.map((file, i) => {
      if (file.sample) return { ...file, status: sampleFiles[i % sampleFiles.length].status, detail: sampleFiles[i % sampleFiles.length].detail };
      return { ...file, status: 'Needs review', detail: 'File is listed, but its contents have not been parsed in this prototype' };
    });
    setEvidence(analysed);
    setEvidenceAnalyzed(true);
    setStatusNote('Demo analysis complete. Findings below are illustrative, not calculated from uploaded files.');
    setCompleted(3);
    setStep(3);
  };

  const go = (to) => {
    setStep(to);
    setStatusNote('');
  };

  const downloadDraft = () => {
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'GST_notice_response_draft.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const statusClass = (status) => status === 'Matched' ? 'green' : status === 'Partial match' ? 'blue' : 'amber';

  return <div className="appShell">
    <aside className="sidebar">
      <div className="brand"><div className="brandMark">✦</div><div><b>TaxResolve</b><small>NOTICE WORKSPACE</small></div></div>
      <div className="sideLabel">WORKSPACE</div>
      <div className="workspace"><div className="workspaceAvatar">AM</div><div><b>Apex Manufacturing</b><small>GST workspace</small></div><span>⌄</span></div>
      <div className="sideLabel caseLabel">NOTICE CASE</div>
      <nav className="steps" aria-label="Notice resolution steps">
        {workflow.map((item, i) => <button key={item[1]} disabled={i > completed} onClick={() => go(i)} className={`stepButton ${i === step ? 'current' : ''} ${i < completed ? 'done' : ''}`}>
          <span className="stepNumber">{i < completed ? '✓' : item[0]}</span><span className="stepWords"><b>{item[1]}</b><small>{item[2]}</small></span>{i === step && <span className="chevron">›</span>}
        </button>)}
      </nav>
      <div className="sideBottom"><div className="privacy"><span>▣</span><div>Demo data only<small>No portal submission</small></div></div><div className="account"><span className="avatar">AJ</span><div><b>Tax reviewer</b><small>Reviewer workspace</small></div><span className="dots">···</span></div></div>
    </aside>

    <main className="mainArea">
      <header className="topbar"><div className="breadcrumbs"><span>Notice workspace</span><span>›</span><b>GST mismatch case</b></div><div className="topbarTools"><span className="demoPill"><i/> Prototype demo</span><button title="About this demo" className="infoIcon">ⓘ</button></div></header>
      <div className="content">
        <div className="pageHeading"><div><div className="eyebrow">GST NOTICE RESOLUTION <span>•</span> CASE GST-2026-018</div><h1>{['Start a notice case','Review extracted notice details','Upload the supporting evidence','Evidence assessment & tax research','Prepare a response for review'][step]}</h1><p>{[
          'Add a GST notice so the assistant can identify the allegation, tax period and response deadline.',
          'Confirm the notice facts before asking the assistant to examine supporting records.',
          'Upload the records needed to evaluate the alleged mismatch. You can add more documents later.',
          'Review potential matches, unresolved gaps and source material before generating a response.',
          'Edit the proposed response and mark it reviewed. Nothing is filed automatically.',
        ][step]}</p></div><div className="due"><small>Illustrative response date</small><b>18 Oct 2026</b></div></div>
        <div className="progress"><div><span style={{ width: `${(step + 1) * 20}%` }}/></div><small>Step {step + 1} of 5 <span>{(step + 1) * 20}%</span></small></div>
        {statusNote && <div className="statusNote">ⓘ {statusNote}</div>}

        {step === 0 && <>
          <section className="hero"><div className="heroIcon">▤</div><div><h2>Start with the notice</h2><p>Upload a notice or load the fictional sample case to explore the prototype. Analysis uses prepared demo data.</p></div><span className="heroTag">GST / MISMATCH</span></section>
          <section className="panel">
            <div className="panelHeader"><div><h3>Notice document</h3><p>PDF recommended</p></div><button className="textLink" onClick={() => noticeInput.current?.click()}>＋ Browse files</button></div>
            <input ref={noticeInput} className="hiddenFile" type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={e => onNoticeFile(e.target.files?.[0])}/>
            <div className={`dropzone ${noticeReady ? 'fileReady' : ''}`} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); onNoticeFile(e.dataTransfer.files?.[0]); }}>
              {noticeReady ? <><span className="fileBadge pdf">PDF</span><div className="fileInfo"><b>{noticeName}</b><small>Attached · Ready for demo analysis</small></div><span className="readyTag">✓ Added</span><button className="miniButton" onClick={() => { setNoticeReady(false); setNoticeName(''); }}>Remove</button></> : <><div className="uploadGlyph">⇧</div><b>Drag a notice file here</b><span>or browse your computer · PDF, DOCX, PNG or JPG</span><button className="outlineButton" onClick={() => noticeInput.current?.click()}>Choose file</button></>}
            </div>
            <div className="orDivider"><span>OR TRY THE DEMO</span></div>
            <div className="sampleCard"><span className="sampleIcon">▤</span><div className="fileInfo"><b>GST mismatch notice — Apex Manufacturing Pvt. Ltd.</b><small>Fictional ASMT-10-style scenario · Q2 FY 2026–27 · 1.8 MB</small></div><button className="textLink" onClick={loadSampleNotice}>{noticeReady ? 'Reload sample' : 'Use sample notice'} →</button></div>
            <div className="panelFooter"><span className="muted">▣ Synthetic data for this demonstration</span><button className="primaryButton" disabled={!noticeReady} onClick={() => { setCompleted(1); go(1); }}>Analyze notice →</button></div>
          </section>
          <div className="callout">ⓘ <span><b>What happens next?</b> The assistant extracts key facts for your confirmation. It does not determine legal liability or submit anything.</span></div>
        </>}

        {step === 1 && <section className="panel">
          <div className="panelHeader"><div><h3>✦ Extracted notice summary</h3><p>Sample AI output · Review before continuing</p></div><span className="pill amber">Needs confirmation</span></div>
          <div className="summary"><b>Alleged outward-supply mismatch</b><p>The sample notice alleges a difference between outward supplies reported in GSTR-1 and tax discharged in GSTR-3B for July–September 2026.</p></div>
          <div className="fieldGrid">
            <div className="field"><label>Taxpayer</label><b>Apex Manufacturing Pvt. Ltd.</b></div><div className="field"><label>Notice reference</label><b>GST/ASMT-10/2026/1842</b></div>
            <div className="field"><label>Tax period</label><b>Jul–Sep 2026</b></div><div className="field"><label>Difference stated</label><b className="amount">₹4,80,000</b></div>
            <div className="field"><label>Illustrative reply-by date</label><b>18 Oct 2026</b></div><div className="field"><label>Potential issue</label><b>Return reconciliation</b></div>
          </div>
          <div className="warningBox"><b>⚠ Confirm before proceeding</b><span>These fields are illustrative demo data. A real product should show page-level extraction references and let users correct uncertain values.</span></div>
          <div className="panelFooter"><button className="secondaryButton" onClick={() => go(0)}>← Back</button><button className="primaryButton" onClick={() => { setCompleted(2); go(2); }}>Confirm details & add evidence →</button></div>
        </section>}

        {step === 2 && <>
          <div className="infoBox"><b>Notice issue:</b> GSTR-1 vs GSTR-3B reported outward-supply difference · <b>₹4.8L</b> (illustrative)</div>
          <section className="panel">
            <div className="panelHeader"><div><h3>Supporting documents</h3><p>Upload records a tax professional would use to validate the notice.</p></div><span className="countPill">{evidence.length} files</span></div>
            <input ref={evidenceInput} className="hiddenFile" type="file" multiple accept=".pdf,.xlsx,.xls,.csv,.doc,.docx,.png,.jpg,.jpeg" onChange={e => addFiles(e.target.files)}/>
            <div className="evidenceDrop" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files); }}><div className="uploadGlyph">⇧</div><b>Drag and drop supporting documents</b><span>Returns, invoices, sales register, credit/debit notes, reconciliations</span><div className="dropActions"><button className="outlineButton" onClick={() => evidenceInput.current?.click()}>Browse files</button><button className="textLink" onClick={loadEvidenceBundle}>✦ Add sample evidence bundle</button></div></div>
            {evidence.length > 0 && <div className="fileList"><div className="listHead"><b>Uploaded files</b><button className="textLink" onClick={() => { setEvidence([]); setEvidenceAnalyzed(false); }}>Remove all</button></div>{evidence.map(file => <div className="fileRow" key={file.id}><span className={`fileBadge ${file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'sheet'}`}>{file.name.split('.').pop().toUpperCase().slice(0,4)}</span><div className="fileInfo"><b>{file.name}</b><small>{file.type} · {file.size}</small></div><span className="pill grey">{file.status}</span><button className="removeButton" aria-label={`Remove ${file.name}`} onClick={() => setEvidence(prev => prev.filter(e => e.id !== file.id))}>×</button></div>)}</div>}
            <div className="panelFooter"><span className="muted">ⓘ Content parsing is simulated</span><button className="primaryButton" disabled={!evidence.length} onClick={analyzeEvidence}>Analyze evidence →</button></div>
          </section>
          <div className="callout">▣ <span><b>Evidence-first workflow</b> — analysis starts only after you add documents and select Analyze evidence.</span></div>
        </>}

        {step === 3 && <>
          {!evidenceAnalyzed && <div className="warningBox">Please add evidence and run the demo analysis first.</div>}
          <div className="metrics"><div className="metric"><span>Notice difference</span><b>₹4.80L</b><small>Alleged · sample data</small></div><div className="metric"><span>Matched documents</span><b>{evidence.filter(x => x.status === 'Matched').length}</b><small>Other items need review</small></div><div className="metric"><span>Open evidence gap</span><b>₹1.20L</b><small>Illustrative, not verified</small></div></div>
          <div className="resultGrid">
            <section className="panel"><div className="panelHeader"><div><h3>Evidence assessment</h3><p>Potential support for the notice allegation</p></div><span className="pill amber">Review required</span></div>
              <div className="assessmentList">{(evidence.length ? evidence : sampleFiles).map(file => <div className="assessmentRow" key={file.id || file.name}><span className={`assessmentMark ${file.status === 'Matched' ? 'good' : file.status === 'Partial match' ? 'partial' : 'needs'}`}>{file.status === 'Matched' ? '✓' : '▤'}</span><div className="assessmentText"><b>{file.name}</b><small>{file.detail || file.type}</small></div><span className={`pill ${file.status === 'Matched' ? 'green' : file.status === 'Partial match' ? 'blue' : 'amber'}`}>{file.status}</span></div>)}</div>
              <div className="warningBox"><b>⚠ Unresolved evidence gap</b><span>The sample assumes ₹1.2L remains unexplained. A real system must calculate this from source records and show the transaction-level working.</span></div>
            </section>
            <section className="panel"><div className="panelHeader"><div><h3>Tax research sources</h3><p>Sources to verify, not legal conclusions</p></div></div>
              <div className="sourceRow"><span className="sourceIcon">▤</span><div><b>Notice document</b><small>Verify allegation, date and paragraph against the original notice.</small><em>Case file · page-level citation needed</em></div></div>
              <div className="sourceRow"><span className="sourceIcon">§</span><div><b>CBIC — CGST Act and rules</b><small>Check provisions cited by the notice and whether they apply.</small><em><a href="https://cbic-gst.gov.in/" target="_blank" rel="noreferrer">Open official CBIC portal ↗</a></em></div><span className="official">OFFICIAL</span></div>
              <div className="sourceRow"><span className="sourceIcon">↗</span><div><b>GST portal guidance</b><small>Verify return data, notice details and procedural guidance.</small><em><a href="https://www.gst.gov.in/" target="_blank" rel="noreferrer">Open GST portal ↗</a></em></div><span className="official">OFFICIAL</span></div>
              <div className="infoBox slim">Production AI must retrieve exact documents, versions and pinpoint references before using them in a draft.</div>
            </section>
          </div>
          <div className="bottomActions"><button className="secondaryButton" onClick={() => go(2)}>← Back to evidence</button><button className="primaryButton" disabled={!evidenceAnalyzed} onClick={() => { setCompleted(5); go(4); }}>Prepare response draft →</button></div>
        </>}

        {step === 4 && <>
          <div className="infoBox"><b>Human review required.</b> This is a working draft, not tax advice or a filing. Resolve open items and verify every statement before use.</div>
          <div className="draftLayout"><section className="panel"><div className="panelHeader"><div><h3>✎ Response draft</h3><p>Editable text · Synthetic sample content</p></div><span className={`pill ${reviewed ? 'green' : 'amber'}`}>{reviewed ? 'Marked reviewed' : 'Needs review'}</span></div>
              <div className="draftToolbar"><span>✦ AI-assisted draft · Demo output</span><button className="textLink" onClick={() => { setDraft(d => d + '\n\n[REVIEW REQUIRED] Insert verified reconciliation figures and cite the exact notice paragraph before finalisation.'); setReviewed(false); }}>＋ Add review reminder</button></div>
              <textarea className="draftEditor" aria-label="Editable response draft" value={draft} onChange={e => { setDraft(e.target.value); setReviewed(false); }}/>
              <div className="draftFoot"><span>{draft.trim().split(/\s+/).filter(Boolean).length} words · Editable</span><button className="textLink" onClick={downloadDraft}>⇩ Download .txt</button></div>
              <div className="panelFooter"><button className="secondaryButton" onClick={() => go(3)}>← Back to findings</button><button className={`primaryButton ${reviewed ? 'reviewed' : ''}`} onClick={() => { setReviewed(true); setStatusNote('Review status updated for the demo. The response has not been filed or sent.'); }}>{reviewed ? '✓ Marked reviewed' : 'Mark as reviewed ✓'}</button></div>
              {reviewed && <div className="successBox"><b>✓ Review status updated (demo).</b> The response has not been filed or sent.</div>}
            </section>
            <aside className="reviewSide"><section className="panel"><div className="panelHeader"><div><h3>Pre-submission checklist</h3><p>Items to verify before approval</p></div></div>{['Validate notice reference and deadline','Reconcile the full ₹4.8L difference to source records','Resolve the illustrative ₹1.2L evidence gap','Verify exact legal provisions and current wording','Confirm taxpayer details and supporting attachments'].map(item => <label className="checkItem" key={item}><input type="checkbox"/><span>{item}</span></label>)}</section><section className="panel humanPanel"><div className="humanMark">✓</div><b>Human in the loop</b><p>AI supports analysis and drafting. A tax professional remains responsible for legal interpretation and the final response.</p><small>▣ No automatic submission</small></section></aside>
          </div>
        </>}
        <footer className="appFooter"><span>TaxResolve AI · Interview assignment prototype</span><span>ⓘ Synthetic scenario · Not connected to GST systems</span></footer>
      </div>
    </main>
  </div>;
}

export default App;
