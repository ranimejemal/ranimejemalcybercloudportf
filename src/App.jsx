import React, { useEffect, useRef, useState, useCallback } from 'react';
import { workshops, projects, timeline, certificates, threatMessages } from './data';

/* ── tiny helpers ─────────────────────────────────────── */
const Tag = ({ label, color }) => (
  <span style={{
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '.6rem', letterSpacing: '1px',
    padding: '.2rem .5rem', borderRadius: '2px',
    border: `1px solid var(--${color})`,
    color: `var(--${color})`,
    background: `rgba(${color === 'green' ? '0,255,65' : color === 'red' ? '255,0,60' : color === 'cyan' ? '0,245,255' : '255,102,0'},.05)`,
  }}>{label}</span>
);

/* ── styles objects ───────────────────────────────────── */
const S = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '55px',
    background: 'rgba(0,0,0,.92)', borderBottom: '1px solid var(--green)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 2rem', backdropFilter: 'blur(10px)',
    animation: 'flicker 10s infinite',
  },
  navLogo: {
    fontFamily: "'Orbitron', monospace", fontSize: '.9rem', fontWeight: 900,
    color: 'var(--green)', letterSpacing: '3px', textShadow: '0 0 10px var(--green)',
  },
  section: {
    position: 'relative', zIndex: 2, padding: '5rem 2rem',
    maxWidth: '1200px', margin: '0 auto',
  },
  sHead: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' },
  sNum: { fontFamily: "'Share Tech Mono', monospace", fontSize: '.7rem', color: 'var(--red)', letterSpacing: '2px' },
  sTitle: {
    fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.1rem,3vw,1.7rem)',
    fontWeight: 700, color: 'var(--green)', letterSpacing: '3px',
    textShadow: '0 0 15px rgba(0,255,65,.5)',
  },
  sLine: { flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--green),transparent)', marginLeft: '1rem' },
  card: {
    background: 'var(--card)', border: '1px solid var(--border)',
    padding: '1.4rem', borderRadius: '2px', transition: '.3s',
  },
  pcard: {
    background: 'var(--card)', border: '1px solid var(--border)',
    borderRadius: '2px', overflow: 'hidden', transition: '.3s',
    animation: 'fadeUp .5s ease both',
  },
  btn: {
    fontFamily: "'Share Tech Mono', monospace", fontSize: '.72rem',
    letterSpacing: '2px', padding: '.7rem 1.6rem',
    border: '1px solid var(--green)', background: 'transparent',
    color: 'var(--green)', textDecoration: 'none', cursor: 'pointer',
    transition: '.2s', display: 'inline-block',
  },
  pdfBtn: {
    fontFamily: "'Share Tech Mono', monospace", fontSize: '.64rem',
    letterSpacing: '1px', padding: '.4rem .9rem',
    border: '1px solid var(--green)', color: 'var(--green)',
    background: 'transparent', cursor: 'pointer', transition: '.2s',
  },
  pdfBtnCyan: {
    fontFamily: "'Share Tech Mono', monospace", fontSize: '.64rem',
    letterSpacing: '1px', padding: '.4rem .9rem',
    border: '1px solid var(--cyan)', color: 'var(--cyan)',
    background: 'transparent', cursor: 'pointer', transition: '.2s',
  },
  status: {
    fontFamily: "'Share Tech Mono', monospace", fontSize: '.6rem',
    color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '5px',
  },
};

/* ═══════════════════════════════════════════════════════ */
export default function App() {
  const canvasRef = useRef(null);
  const [threatIdx, setThreatIdx] = useState(0);
  const [pdfModal, setPdfModal]   = useState({ open: false, src: '', title: '' });
  const [detModal, setDetModal]   = useState({ open: false, id: '' });
  const [certModal, setCertModal] = useState({ open: false, cert: null });
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [hovered, setHovered]     = useState({});

  /* matrix rain */
  useEffect(() => {
    const cv = canvasRef.current;
    const cx = cv.getContext('2d');
    const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const CH = '01アイウエオABCDEF';
    let dp = Array(Math.floor(cv.width / 16)).fill(1);
    window.addEventListener('resize', () => { dp = Array(Math.floor(cv.width / 16)).fill(1); });
    const id = setInterval(() => {
      cx.fillStyle = 'rgba(0,0,0,.05)'; cx.fillRect(0, 0, cv.width, cv.height);
      cx.fillStyle = '#00ff41'; cx.font = '14px Share Tech Mono';
      dp.forEach((d, i) => {
        cx.fillText(CH[Math.floor(Math.random() * CH.length)], i * 16, d * 16);
        if (d * 16 > cv.height && Math.random() > .975) dp[i] = 0;
        dp[i]++;
      });
    }, 50);
    return () => { clearInterval(id); window.removeEventListener('resize', resize); };
  }, []);

  /* threat log cycle */
  useEffect(() => {
    const id = setInterval(() => setThreatIdx(i => (i + 1) % threatMessages.length), 2400);
    return () => clearInterval(id);
  }, []);

  /* keyboard close */
  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape') {
        setPdfModal(p => ({ ...p, open: false }));
        setDetModal(p => ({ ...p, open: false }));
        setCertModal(p => ({ ...p, open: false }));
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const openPDF = useCallback((src, title) => {
    setPdfLoaded(false);
    setPdfModal({ open: true, src, title });
    document.body.style.overflow = 'hidden';
  }, []);
  const closePDF = useCallback(() => {
    setPdfModal(p => ({ ...p, open: false }));
    document.body.style.overflow = '';
  }, []);
  const openDet = useCallback(id => {
    setDetModal({ open: true, id });
    document.body.style.overflow = 'hidden';
  }, []);
  const closeDet = useCallback(() => {
    setDetModal(p => ({ ...p, open: false }));
    document.body.style.overflow = '';
  }, []);
  const openCert = useCallback(cert => {
    setCertModal({ open: true, cert });
    document.body.style.overflow = 'hidden';
  }, []);
  const closeCert = useCallback(() => {
    setCertModal(p => ({ ...p, open: false }));
    document.body.style.overflow = '';
  }, []);

  const th = threatMessages[threatIdx];
  const isWarn = th.match(/BLOCK|WARN|ALERT/);

  /* ── render ─────────────────────────────────────────── */
  return (
    <>
      {/* CANVAS */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: .07, pointerEvents: 'none' }} />

      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.navLogo}>R<span style={{ color: 'var(--red)' }}>.</span>JEMAL</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['about','workshops','projects','timeline','certificates','contact'].map(s => (
            <a key={s} href={`#${s}`} style={{
              fontFamily: "'Share Tech Mono', monospace", color: 'var(--dim)',
              textDecoration: 'none', fontSize: '.72rem', letterSpacing: '2px', transition: '.2s',
            }}
              onMouseEnter={e => e.target.style.cssText += 'color:var(--green);text-shadow:0 0 8px var(--green)'}
              onMouseLeave={e => { e.target.style.color = 'var(--dim)'; e.target.style.textShadow = ''; }}
            >{s.toUpperCase()}</a>
          ))}
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.62rem', color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 6px var(--red)', animation: 'blink 1s infinite', display: 'inline-block' }} />
          INTRUSION DETECTED
        </div>
      </nav>

      {/* HERO */}
      <div id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 2rem 2rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.7rem', color: 'var(--red)', letterSpacing: '4px', marginBottom: '1rem', animation: 'fadeUp .8s ease both' }}>
            // SECURITY ENGINEER IN TRAINING — ESPRIM 4CC1 · 2025-2026
          </div>
          <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(2.5rem,7vw,5.5rem)', fontWeight: 900, color: 'var(--green)', textShadow: '0 0 20px var(--green),0 0 60px rgba(0,255,65,.3)', animation: 'fadeUp .8s .2s ease both, glitch 7s 4s infinite', lineHeight: 1, marginBottom: '.5rem' }}>
            RANIME JEMAL
          </h1>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(.75rem,2vw,1rem)', color: 'var(--cyan)', letterSpacing: '4px', marginBottom: '2rem', animation: 'fadeUp .8s .4s ease both', textShadow: '0 0 10px var(--cyan)' }}>
            CYBERSECURITY · ML FOR SECURITY · CLOUD DEFENSE · FULL-STACK
          </div>

          {/* Terminal */}
          <div style={{ background: 'rgba(0,20,0,.8)', border: '1px solid var(--green)', borderRadius: '4px', padding: '1.4rem', textAlign: 'left', fontFamily: "'Share Tech Mono', monospace", fontSize: '.78rem', maxWidth: '650px', margin: '0 auto 2.5rem', boxShadow: '0 0 30px rgba(0,255,65,.12)', animation: 'fadeUp .8s .6s ease both' }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '.9rem', paddingBottom: '.7rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--red)', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
              <span style={{ marginLeft: 'auto', color: 'var(--dim)', fontSize: '.62rem' }}>ranime@kali:~$</span>
            </div>
            {[
              { prompt: true, text: 'whoami --verbose' },
              { out: true, color: 'green', text: '▸ Ranime Jemal — 4th Year Engineering Student @ ESPRIM' },
              { out: true, color: 'cyan', text: '▸ Specialization: Information Security + Cloud + ML' },
              { prompt: true, text: 'ls ./projects/' },
              { out: true, text: 'workshops/ SchoolApp/ CloudCNAM/ ML_Cyber/ Projet_Integration/' },
              { prompt: true, text: 'nmap -sV portfolio.ranime.sec', cursor: true },
            ].map((l, i) => (
              <div key={i} style={{ marginBottom: '.35rem', lineHeight: 1.65 }}>
                {l.prompt && <span style={{ color: 'var(--green)' }}>ranime@kali:~$ </span>}
                <span style={{ color: l.color === 'green' ? 'var(--green)' : l.color === 'cyan' ? 'var(--cyan)' : l.out ? 'var(--dim)' : 'var(--text)', paddingLeft: l.out ? '1rem' : 0 }}>{l.text}</span>
                {l.cursor && <span style={{ display: 'inline-block', width: '8px', height: '14px', background: 'var(--green)', animation: 'blink .8s infinite', verticalAlign: 'middle', marginLeft: '2px' }} />}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp .8s .8s ease both' }}>
            {[['#workshops', 'VIEW WORKSHOPS', 'green'], ['#projects', 'VIEW PROJECTS', 'cyan'], ['https://github.com/ranimejemal', 'GITHUB', 'red']].map(([href, label, color]) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                style={{ ...S.btn, borderColor: `var(--${color})`, color: `var(--${color})` }}
                onMouseEnter={e => { e.currentTarget.style.background = `var(--${color})`; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = `0 0 20px var(--${color})`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = `var(--${color})`; e.currentTarget.style.boxShadow = ''; }}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={S.section}>
        <div style={S.sHead}><span style={S.sNum}>01//</span><h2 style={S.sTitle}>ABOUT_ME</h2><div style={S.sLine} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
          {[
            { title: '// PROFILE', body: (
              <>
                <p style={{ color: 'var(--dim)', fontSize: '.92rem', lineHeight: 1.7 }}>4th year engineering student at ESPRIM specializing in Information Security. Passionate about ethical hacking, secure cloud architectures, ML-driven threat detection and full-stack development.</p>
                <p style={{ color: 'var(--dim)', fontSize: '.92rem', lineHeight: 1.7, marginTop: '.7rem' }}>Experienced across the full security spectrum: offensive labs, firewall deployment, IDS/VPN, web app exploitation, ML models on NSL-KDD, and cloud IaaS simulation.</p>
              </>
            )},
            { title: '// TECH ARSENAL', body: (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginTop: '.5rem' }}>
                {[['Kali Linux','green'],['pfSense','green'],['Metasploit','red'],['Nessus','cyan'],['Nmap','green'],['Ettercap','red'],['OpenSSL','cyan'],['Snort','green'],['OpenVPN','orange'],['VMware','green'],['WebGoat','cyan'],['Docker','green'],['OWASP','orange'],['GNS3','green'],['Wazuh SIEM','red'],['VyOS','cyan'],['React.js','cyan'],['Node.js','green'],['MySQL','orange'],['Swagger','green'],['Python/sklearn','red'],['SVM · KMeans · ANN','cyan']].map(([l,c]) => <Tag key={l} label={l} color={c} />)}
              </div>
            )},
            { title: '// SECURITY DOMAINS', body: <p style={{ color: 'var(--dim)', fontSize: '.92rem', lineHeight: 1.7 }}>Network pentesting · Firewall architecture · IDS/IPS · VPN · Web security (OWASP) · Cloud IaaS (GNS3/OpenStack) · SIEM (Wazuh) · Honeynet · ML for intrusion detection · Full-stack secure app development</p> },
            { title: '// EDUCATION', body: (
              <>
                <p style={{ color: 'var(--text)', fontSize: '.92rem' }}><strong style={{ color: 'var(--green)' }}>ESPRIM</strong> — Engineering Degree</p>
                <p style={{ color: 'var(--dim)', fontSize: '.85rem', marginTop: '.3rem' }}>2025–2026 · 4th Year · Computer Science · Class 4CC1</p>
                <p style={{ color: 'var(--dim)', fontSize: '.82rem', marginTop: '.3rem' }}>6 Security Workshops · Cloud IaaS Project · SchoolApp · ML Exam · Projet Intégration (PI)</p>
                <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginTop: '.7rem' }}>
                  <Tag label="4CC1" color="cyan" /><Tag label="AY 2025–2026" color="green" /><Tag label="ESPRIM" color="orange" />
                </div>
              </>
            )},
          ].map(({ title, body }) => (
            <div key={title} style={S.card}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,65,.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; }}
            >
              <h3 style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.72rem', color: 'var(--cyan)', letterSpacing: '2px', marginBottom: '.9rem' }}>{title}</h3>
              {body}
            </div>
          ))}
        </div>
      </section>

      {/* WORKSHOPS */}
      <section id="workshops" style={S.section}>
        <div style={S.sHead}><span style={S.sNum}>02//</span><h2 style={S.sTitle}>WORKSHOPS</h2><div style={S.sLine} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '1.5rem' }}>
          {workshops.map((w, i) => (
            <WorkshopCard key={w.id} w={w} i={i} openPDF={openPDF} openDet={openDet} />
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={S.section}>
        <div style={S.sHead}><span style={S.sNum}>03//</span><h2 style={S.sTitle}>PROJECTS</h2><div style={S.sLine} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} openPDF={openPDF} openDet={openDet} />
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" style={S.section}>
        <div style={S.sHead}><span style={S.sNum}>04//</span><h2 style={S.sTitle}>TIMELINE</h2><div style={S.sLine} /></div>
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg,var(--green),transparent)' }} />
          {timeline.map((t, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: '2rem' }}>
              <div style={{ position: 'absolute', left: '-2.35rem', top: '.35rem', width: '8px', height: '8px', border: '1px solid var(--green)', background: 'var(--bg)', transform: 'rotate(45deg)', boxShadow: '0 0 6px var(--green)' }} />
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.63rem', color: 'var(--red)', letterSpacing: '2px', marginBottom: '.35rem' }}>{t.date}</div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '.92rem', color: 'var(--green)', marginBottom: '.35rem' }}>{t.title}</div>
              <div style={{ color: 'var(--dim)', fontSize: '.86rem', lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" style={S.section}>
        <div style={S.sHead}><span style={S.sNum}>05//</span><h2 style={S.sTitle}>CERTIFICATES</h2><div style={S.sLine} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.5rem' }}>
          {certificates.map(c => (
            <CertCard key={c.id} c={c} openCert={openCert} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={S.section}>
        <div style={S.sHead}><span style={S.sNum}>06//</span><h2 style={S.sTitle}>CONTACT</h2><div style={S.sLine} /></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'var(--card)', border: '1px solid var(--green)', padding: '2.5rem 3rem', borderRadius: '4px', boxShadow: '0 0 40px rgba(0,255,65,.08)', animation: 'pulseB 3s infinite' }}>
            <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.1rem', color: 'var(--green)', marginBottom: '.5rem', letterSpacing: '2px' }}>⌨ FIND ME ON GITHUB</h3>
            <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.72rem', color: 'var(--dim)', marginBottom: '1.5rem' }}>Workshop code, configs, scripts, ML notebooks — all open source.</p>
            <a href="https://github.com/ranimejemal" target="_blank" rel="noreferrer"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.78rem', color: 'var(--cyan)', textDecoration: 'none', border: '1px solid var(--cyan)', padding: '.55rem 1.3rem', display: 'inline-block', transition: '.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = '0 0 20px var(--cyan)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.boxShadow = ''; }}
            >github.com/ranimejemal</a>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.2rem' }}>
              <a href="mailto:ranimejmal@gmail.com" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.7rem', color: 'var(--green)', textDecoration: 'none' }}>[MAIL] ranimejmal@gmail.com</a>
              <a href="tel:+21697017061" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.7rem', color: 'var(--green)', textDecoration: 'none' }}>[TEL] +216 97 017 061</a>
            </div>
            <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
              {[['pfSense Labs','green'],['Attack Scripts','red'],['Crypto Tools','cyan'],['SIEM Configs','orange'],['ML Notebooks','green'],['SchoolApp','cyan']].map(([l,c]) => <Tag key={l} label={l} color={c} />)}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: 'relative', zIndex: 2, borderTop: '1px solid var(--border)', padding: '1.8rem', textAlign: 'center', fontFamily: "'Share Tech Mono', monospace", fontSize: '.63rem', color: 'var(--dim)', letterSpacing: '2px' }}>
        <span style={{ color: 'var(--green)' }}>RANIME JEMAL</span> · ESPRIM 4CC1 · SÉCURITÉ INFORMATIQUE · 2025–2026 · ALL THREATS NEUTRALIZED ✓
      </footer>

      {/* THREAT LOG */}
      <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 50, width: '255px', background: 'rgba(0,4,0,.92)', border: '1px solid var(--border)', borderRadius: '2px', padding: '.75rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '.58rem', color: 'var(--dim)', opacity: .75 }}>
        <div style={{ color: 'var(--red)', letterSpacing: '2px', marginBottom: '.5rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--red)', animation: 'blink 1s infinite' }} />
          LIVE THREAT LOG
        </div>
        <div style={{ color: 'var(--green)', marginBottom: '.2rem' }}>[OK] pfSense: 11 rules active</div>
        <div style={{ marginBottom: '.2rem' }}>[INFO] Snort: monitoring eth0</div>
        <div style={{ color: isWarn ? 'var(--red)' : 'var(--green)', animation: 'fadeUp .3s ease' }}>{th}</div>
      </div>

      {/* PDF MODAL */}
      {pdfModal.open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex', flexDirection: 'column', background: '#000' }}>
          <div style={{ background: 'rgba(0,15,0,.97)', borderBottom: '1px solid var(--green)', padding: '.8rem 1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '.88rem', color: 'var(--green)', letterSpacing: '2px' }}>{pdfModal.title}</div>
            <button onClick={closePDF} style={{ fontFamily: "'Share Tech Mono', monospace", color: 'var(--red)', background: 'none', border: '1px solid var(--red)', cursor: 'pointer', padding: '.3rem .9rem', fontSize: '.78rem', letterSpacing: '1px' }}>✕ CLOSE</button>
          </div>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {!pdfLoaded && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '.78rem', color: 'var(--green)' }}>
                <div>LOADING DOCUMENT...</div>
                <div style={{ width: '200px', height: '2px', background: 'var(--border)', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-100%', top: 0, width: '100%', height: '100%', background: 'var(--green)', animation: 'loadBar 1.5s infinite' }} />
                </div>
              </div>
            )}
            <iframe
              src={pdfModal.src}
              title={pdfModal.title}
              style={{ width: '100%', height: '100%', border: 'none', background: '#fff', display: pdfLoaded ? 'block' : 'none' }}
              onLoad={() => setPdfLoaded(true)}
            />
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {detModal.open && (
        <div onClick={e => e.target === e.currentTarget && closeDet()} style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,.92)' }}>
          <DetailsContent id={detModal.id} close={closeDet} />
        </div>
      )}

      {/* CERT MODAL */}
      {certModal.open && certModal.cert && (
        <div onClick={e => e.target === e.currentTarget && closeCert()} style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,.95)' }}>
          <div style={{ background: '#0a1a0a', border: '1px solid var(--cyan)', maxWidth: '600px', width: '100%', borderRadius: '3px', boxShadow: '0 0 60px rgba(0,245,255,.2)', animation: 'fadeUp .3s ease' }}>
            <div style={{ background: 'rgba(0,245,255,.06)', borderBottom: '1px solid var(--border)', padding: '1rem 1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: '.88rem', color: 'var(--cyan)', letterSpacing: '2px' }}>CERTIFICATE</h2>
              <button onClick={closeCert} style={{ fontFamily: "'Share Tech Mono', monospace", color: 'var(--red)', background: 'none', border: '1px solid var(--red)', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '.8rem' }}>{certModal.cert.icon}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.65rem', color: 'var(--red)', letterSpacing: '2px', marginBottom: '.4rem' }}>{certModal.cert.issuer}</div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '.95rem', color: 'var(--cyan)', marginBottom: '.8rem' }}>{certModal.cert.name}</div>
              <p style={{ color: 'var(--dim)', fontSize: '.88rem', lineHeight: 1.7, marginBottom: '1rem' }}>{certModal.cert.desc}</p>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.65rem', color: 'var(--green)', marginBottom: '1rem' }}>{certModal.cert.date}</div>
              {certModal.cert.img && <img src={certModal.cert.img} alt="certificate" style={{ width: '100%', borderRadius: '2px', marginBottom: '1rem' }} />}
              <a href={certModal.cert.url} target="_blank" rel="noreferrer"
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.72rem', color: 'var(--cyan)', textDecoration: 'none', border: '1px solid var(--cyan)', padding: '.45rem 1rem', display: 'inline-block' }}>↗ VERIFY ONLINE</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── WORKSHOP CARD ────────────────────────────────────── */
function WorkshopCard({ w, i, openPDF, openDet }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...S.pcard, animationDelay: `${i * .1}s`, borderColor: hov ? 'var(--green)' : 'var(--border)', boxShadow: hov ? '0 0 28px rgba(0,255,65,.13)' : '', transform: hov ? 'translateY(-3px)' : '' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ background: 'rgba(0,255,65,.04)', borderBottom: '1px solid var(--border)', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '.9rem' }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.5rem', fontWeight: 900, color: 'rgba(0,255,65,.2)', minWidth: '2.4rem', lineHeight: 1 }}>{w.num}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.58rem', color: 'var(--red)', letterSpacing: '2px', marginBottom: '.2rem' }}>{w.fascicule}</div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '.82rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '1px' }}>{w.name}</div>
        </div>
        <div style={{ fontSize: '1.4rem', marginLeft: 'auto' }}>{w.icon}</div>
      </div>
      <div style={{ padding: '1.2rem' }}>
        <p style={{ color: 'var(--dim)', fontSize: '.88rem', lineHeight: 1.6, marginBottom: '.9rem' }}>{w.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '.9rem' }}>
          {w.tools.map(t => <Tag key={t.label} {...t} />)}
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.62rem', color: 'var(--dim)', letterSpacing: '2px', marginBottom: '.5rem', borderTop: '1px solid var(--border)', paddingTop: '.8rem' }}>{w.taskLabel}</div>
        {w.tasks.map(t => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '.45rem', marginBottom: '.3rem', fontSize: '.8rem', color: 'var(--dim)' }}>
            <span style={{ color: 'var(--green)', fontSize: '.6rem' }}>▸</span>{t}
          </div>
        ))}
      </div>
      <div style={{ padding: '.8rem 1.2rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ ...S.status }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 5px var(--green)', display: 'inline-block' }} />
          {w.badge || 'COMPLETED'}
        </div>
        <PdfBtn label="📄 VIEW REPORT" onClick={() => w.pdf ? openPDF(w.pdf, `${w.fascicule} — ${w.name}`) : openDet(w.id)} color="green" />
      </div>
    </div>
  );
}

/* ── PROJECT CARD ─────────────────────────────────────── */
function ProjectCard({ p, i, openPDF, openDet }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...S.pcard, animationDelay: `${i * .1}s`, borderColor: hov ? 'var(--cyan)' : 'var(--border)', boxShadow: hov ? '0 0 28px rgba(0,245,255,.13)' : '', transform: hov ? 'translateY(-3px)' : '' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ background: 'rgba(0,245,255,.04)', borderBottom: '1px solid var(--border)', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '.9rem' }}>
        <div style={{ width: '44px', height: '44px', background: 'rgba(0,245,255,.1)', border: '1px solid var(--cyan)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', monospace", fontWeight: 900, color: 'var(--cyan)', fontSize: '.75rem', flexShrink: 0 }}>{p.abbr}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.58rem', color: 'var(--red)', letterSpacing: '2px', marginBottom: '.2rem' }}>{p.category}</div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '.82rem', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '1px' }}>{p.name}</div>
        </div>
        <div style={{ fontSize: '1.4rem', marginLeft: 'auto' }}>{p.icon}</div>
      </div>
      <div style={{ padding: '1.2rem' }}>
        <p style={{ color: 'var(--dim)', fontSize: '.88rem', lineHeight: 1.6, marginBottom: '.9rem' }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '.9rem' }}>
          {p.tools.map(t => <Tag key={t.label} {...t} />)}
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.62rem', color: 'var(--dim)', letterSpacing: '2px', marginBottom: '.5rem', borderTop: '1px solid var(--border)', paddingTop: '.8rem' }}>{p.taskLabel}</div>
        {p.tasks.map(t => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '.45rem', marginBottom: '.3rem', fontSize: '.8rem', color: 'var(--dim)' }}>
            <span style={{ color: 'var(--green)', fontSize: '.6rem' }}>▸</span>{t}
          </div>
        ))}
      </div>
      <div style={{ padding: '.8rem 1.2rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem' }}>
        <div style={S.status}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 5px var(--green)', display: 'inline-block' }} />
          {p.badge || 'COMPLETED'}
        </div>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          {p.pdf
            ? <PdfBtn label={p.pdfLabel} onClick={() => openPDF(p.pdf, p.name)} color="cyan" />
            : <PdfBtn label={p.pdfLabel} onClick={() => openDet(p.id)} color="cyan" />
          }
          {p.pdf2 && <PdfBtn label={p.pdf2Label} onClick={() => openPDF(p.pdf2, `${p.name} — PROJET`)} color="cyan" />}
        </div>
      </div>
    </div>
  );
}

/* ── CERT CARD ────────────────────────────────────────── */
function CertCard({ c, openCert }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...S.card, borderColor: hov ? 'var(--cyan)' : 'var(--border)', boxShadow: hov ? '0 0 20px rgba(0,245,255,.1)' : '', cursor: 'pointer', transition: '.3s' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => openCert(c)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.8rem', marginBottom: '.8rem' }}>
        <div style={{ fontSize: '1.6rem' }}>{c.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.58rem', color: 'var(--cyan)', letterSpacing: '2px', marginBottom: '.25rem' }}>EARNED</div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.6rem', color: 'var(--dim)', letterSpacing: '1px', marginBottom: '.4rem' }}>{c.issuer}</div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '.78rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{c.name}</div>
        </div>
      </div>
      <p style={{ color: 'var(--dim)', fontSize: '.82rem', lineHeight: 1.6, marginBottom: '.8rem' }}>{c.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.62rem', color: 'var(--green)' }}>{c.date}</span>
        <button
  onClick={(e) => {
    e.stopPropagation();
    openCert(c);
  }}
  style={{
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '.62rem',
    color: 'var(--cyan)',
    border: '1px solid var(--cyan)',
    background: 'transparent',
    padding: '.25rem .65rem',
    cursor: 'pointer'
  }}
>
  VIEW PROOF ↗
</button>
      </div>
    </div>
  );
}

/* ── PDF BUTTON ───────────────────────────────────────── */
function PdfBtn({ label, onClick, color = 'green' }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '.64rem', letterSpacing: '1px', padding: '.4rem .9rem', border: `1px solid var(--${color})`, color: hov ? '#000' : `var(--${color})`, background: hov ? `var(--${color})` : 'transparent', cursor: 'pointer', transition: '.2s', boxShadow: hov ? `0 0 12px var(--${color})` : '' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {label}
    </button>
  );
}

/* ── DETAILS MODAL CONTENT ────────────────────────────── */
function DetailsContent({ id, close }) {
  const content = {
    w3: { title: 'FASCICULE 3 — CRYPTOGRAPHY', html: `<h3>// SYMMETRIC ENCRYPTION</h3><ul><li>RC4 stream cipher — encrypt + decrypt + diff ✓</li><li>DES block cipher with hex key 0123456789ABCDEF</li></ul><h3>// RSA ASYMMETRIC</h3><ul><li>1024-bit RSA keypair (rsakey.pem)</li><li>Public key extracted (rsapubkey.pem)</li><li>Private key wrapped with AES-256</li><li>pkeyutl encrypt / decrypt verified</li></ul><h3>// DIGITAL SIGNATURES</h3><ul><li>MD5 + SHA1 hash with openssl dgst</li><li>Sign: SHA1 hash encrypted with private key</li><li>Verify: public key decryption confirmed ✓</li></ul><h3>// CERTIFICATE AUTHORITY</h3><ul><li>Self-signed cert: -new -x509 -days 365</li><li>Custom CA: RSA 2048-bit, 730 days</li><li>Server CSR signed by CA ✓</li></ul>` },
    w5: { title: 'FASCICULE 5 — IDS/IPS + VPN', html: `<h3>// SNORT IDS</h3><ul><li>Installed via pfSense Package Manager</li><li>Rule: alert icmp $HOME_NET any -> any any</li><li>SID: 1000001 | Rev: 1 — alert log exported</li></ul><h3>// OPENVPN — 7 STEPS</h3><ul><li>CA: RSA 2048, SHA256, 3650 days</li><li>Server cert signed by CA</li><li>Local user + user certificate created</li><li>SSL/TLS + User Auth, UDP, port 1194</li><li>Cipher: AES-256-CBC | Tunnel: 10.0.8.0/24</li><li>.ovpn exported via openvpn-client-export</li><li>Connection tested ✓</li></ul>` },
    ml: { title: 'ML FOR CYBERSECURITY — EXAM 4CC1', html: `<h3>// DATASET</h3><p>NSL-KDD — benchmark IDS dataset. Binary + multi-class classification.</p><h3>// PARTIE I — EXPLORATION</h3><ul><li>Shape, types, value counts, missing values</li><li>Distribution visualization with matplotlib</li><li>Class imbalance analysis</li></ul><h3>// PARTIE II — PREPROCESSING</h3><ul><li>LabelEncoder for categorical features</li><li>StandardScaler normalization</li><li>80/20 train/test split</li></ul><h3>// PARTIE III — MODELING</h3><ul><li>KMeans — Elbow method k=1..10</li><li>SVM linear kernel — baseline</li><li>SVM RBF kernel — grid search tuning</li><li>MLP (128,64) layers, max_iter=300</li><li>Metrics: accuracy, precision, recall, F1</li></ul>` },
  };
  const d = content[id];
  if (!d) return null;
  return (
    <div style={{ background: '#0a1a0a', border: '1px solid var(--green)', maxWidth: '700px', width: '100%', maxHeight: '85vh', overflowY: 'auto', borderRadius: '3px', boxShadow: '0 0 60px rgba(0,255,65,.18)', animation: 'fadeUp .3s ease' }}>
      <div style={{ background: 'rgba(0,255,65,.06)', borderBottom: '1px solid var(--border)', padding: '1.1rem 1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: '.9rem', color: 'var(--green)', letterSpacing: '2px' }}>{d.title}</h2>
        <button onClick={close} style={{ fontFamily: "'Share Tech Mono', monospace", color: 'var(--red)', background: 'none', border: '1px solid var(--red)', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      </div>
      <div style={{ padding: '1.4rem' }} dangerouslySetInnerHTML={{ __html: d.html.replace(/<h3>/g, '<h3 style="font-family:\'Share Tech Mono\',monospace;font-size:.7rem;color:var(--cyan);letter-spacing:2px;margin:1.1rem 0 .55rem">').replace(/<ul>/g, '<ul style="list-style:none">').replace(/<li>/g, '<li style="color:var(--dim);font-size:.85rem;padding:.28rem 0;border-bottom:1px solid rgba(0,255,65,.06)"><span style=\"color:var(--green);font-family:\'Share Tech Mono\',monospace\">[ ✓ ] </span>').replace(/<p>/g, '<p style="color:var(--dim);font-size:.88rem;line-height:1.7">') }} />
    </div>
  );
}
