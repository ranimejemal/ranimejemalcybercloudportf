// ── WORKSHOPS ─────────────────────────────────────────────
export const workshops = [
  {
    id: 'w1', num: '01', fascicule: 'FASCICULE 1', name: 'VULNERABILITY ANALYSIS', icon: '🔍',
    pdf: '/pdfs/workshop1.pdf',
    desc: 'VMware setup, Kali Linux, Metasploitable2. Network scanning and full vulnerability assessment pipeline using Nmap and Nessus.',
    tools: [
      { label: 'Nmap 7.95', color: 'green' }, { label: 'Nessus 10.11.2', color: 'cyan' }, { label: 'VMware', color: 'green' },
    ],
    taskLabel: '// KEY TASKS',
    tasks: [
      '4 hosts discovered on 192.168.23.0/24',
      'OS fingerprinting — aggressive mode',
      'Nessus Essentials configured & scanning',
    ],
  },
  {
    id: 'w2', num: '02', fascicule: 'FASCICULE 2', name: 'NETWORK ATTACKS', icon: '⚔️',
    pdf: '/pdfs/workshop1.pdf',
    desc: 'Offensive security lab: ARP Spoofing (identity hijacking), MITM sniffing with Ettercap, TCP SYN Flood via Metasploit, Smurf DDoS with Scapy, and credential harvesting via Social Engineering Toolkit.',
    tools: [
      { label: 'Ettercap', color: 'red' }, { label: 'Metasploit', color: 'red' },
      { label: 'Scapy', color: 'orange' }, { label: 'SET', color: 'green' }, { label: 'arpspoof', color: 'cyan' },
    ],
    taskLabel: '// ATTACKS SIMULATED',
    tasks: [
      'ARP Spoofing — MAC ↔ Gateway IP poisoning',
      'MITM with Ettercap + Wireshark capture',
      'TCP SYN Flood (DoS) — Metasploit synflood',
      'Smurf DDoS — Scapy ICMP broadcast amplification',
      'SET Credential Harvester — site cloning phishing',
    ],
  },
  {
    id: 'w3', num: '03', fascicule: 'FASCICULE 3', name: 'CRYPTOGRAPHY', icon: '🔐',
    pdf: "/pdfs/crypto.pdf",
    desc: 'Applied cryptography with OpenSSL — symmetric & asymmetric encryption, digital signatures, and full certificate authority chain.',
    tools: [
      { label: 'OpenSSL', color: 'cyan' }, { label: 'RSA 2048', color: 'green' },
      { label: 'AES-256', color: 'green' }, { label: 'X.509', color: 'orange' },
    ],
    taskLabel: '// IMPLEMENTATIONS',
    tasks: [
      'RC4 / DES symmetric encryption',
      'RSA key pair + AES-wrapped private key',
      'Digital signature (MD5/SHA1)',
      'CA + server certificate (X.509)',
    ],
  },
  {
    id: 'w4', num: '04', fascicule: 'FASCICULE 4', name: 'pfSENSE FIREWALL', icon: '🛡️',
    pdf: '/pdfs/workshop4.pdf',
    desc: 'Full pfSense deployment — WAN/LAN/DMZ segmentation, 11 security rules, aliases, scheduled content filtering. All rules verified.',
    tools: [
      { label: 'pfSense 2.6', color: 'green' }, { label: 'DMZ', color: 'cyan' },
      { label: 'NAT', color: 'green' }, { label: 'VMware', color: 'orange' },
    ],
    taskLabel: '// RULES (11)',
    tasks: [
      'Block Facebook / Instagram',
      'Block FTP, Telnet, plain HTTP',
      'Schedule-based YouTube/Netflix block',
      'DMZ → LAN isolation enforced',
    ],
  },
  {
    id: 'w5', num: '05', fascicule: 'SOC HOME LAB', name: 'WAZUH SIEM', icon: '🚨',
    pdf: '/pdfs/wazuh.pdf',
    desc: 'Built a hands-on SOC lab using Ubuntu as the victim machine 🖥️, Kali Linux as the attacker 🕵️, and Wazuh SIEM for real-time log collection and dashboards 📊. Simulated SSH brute-force attacks, monitored alerts, and visualized malicious activity in real time — exactly what Tier-1 SOC analysts do every day.',
    tools: [
      { label: 'Wazuh v4.7.5', color: 'red' }, { label: 'Ubuntu', color: 'orange' },
      { label: 'Kali Linux', color: 'green' }, { label: 'MITRE ATT&CK', color: 'cyan' }, { label: 'PCI DSS', color: 'green' },
    ],
    taskLabel: '// SOC ANALYST SKILLS',
    tasks: [
      'SSH brute-force simulation — 8 alerts detected in real time',
      'SIEM deployment, agent onboarding & log correlation',
      'MITRE ATT&CK mapping — Password Guessing (T1110.001)',
      'Alert triage, severity classification & timeline reconstruction',
      'PCI DSS compliance monitoring — 110 events logged',
    ],
  },
  {
    id: 'w6', num: '06', fascicule: 'PERSONAL LAB PROJECT', name: 'RED TEAM / BLUE TEAM', icon: '🔴🔵',
    pdf: '/pdfs/red team blue team.pdf',
    desc: 'Full Red Team vs Blue Team simulation on a 3-VM virtualized network (pfSense + Kali + Ubuntu). Executed 5 attack techniques end-to-end while simultaneously defending with Snort IDS — 100% detection rate.',
    tools: [
      { label: 'Nmap', color: 'green' }, { label: 'Hydra', color: 'red' },
      { label: 'DVWA', color: 'orange' }, { label: 'Snort IDS', color: 'cyan' },
      { label: 'John', color: 'red' }, { label: 'ngrok', color: 'green' },
    ],
    taskLabel: '// ATTACK CHAIN (5 TECHNIQUES)',
    tasks: [
      'Nmap recon — SSH & HTTP mapped, OS fingerprinted',
      'Hydra SSH brute-force — hello123 cracked (1,230 attempts)',
      'SQL Injection on DVWA — full DB dump + 5 user hashes',
      'John the Ripper — 4/4 MD5 hashes cracked in <5 sec',
      'Reflected XSS + ngrok — remote victim data captured silently',
    ],
    badge: 'COMPLETED — MAY 2026',
  },
];

// ── PROJECTS ──────────────────────────────────────────────
export const projects = [
  {
    id: 'school',
    abbr: 'SCH',
    category: 'FULL-STACK WEB APP',
    name: 'SCHOOLAPP',
    icon: '🎓',
    pdf: '/pdfs/schoolapp.pdf',
    pdfLabel: '📄 VIEW REPORT',
    desc: 'Complete school management system — multi-role (Admin, Professor, Student), 2FA security, REST API with Swagger, MySQL, MVC/Repository/DTO patterns.',
    tools: [
      { label: 'React', color: 'cyan' }, { label: 'MySQL', color: 'orange' },
      { label: 'Swagger API', color: 'green' }, { label: '2FA', color: 'red' }, { label: 'MVC/DTO', color: 'cyan' },
    ],
    taskLabel: '// FEATURES',
    tasks: [
      '2FA with QR code (Google Authenticator)',
      'Account lockout after 5 failed attempts',
      'Real-time notifications + audit trail',
      'Full CRUD: students, professors, absences',
    ],
    badge: 'COMPLETED — MAI 2026',
  },
  {
    id: 'cloud',
    abbr: 'CLD',
    category: 'INTEGRATION PROJECT · SCRUM',
    name: 'CLOUD CNAM INFRA',
    icon: '☁️',
    pdf: '/pdfs/ProjetIntg.pdf',
    pdf2: '/pdfs/cloud_cnam.pdf',
    pdfLabel: '📄 RAPPORT APP',
    pdf2Label: '📄 RAPPORT PROJET',
    desc: 'Secure Cloud IaaS infrastructure inspired by the CNAM system — GNS3 simulation, VyOS firewall, VLAN segmentation, Wazuh SIEM, and Honeynet (Cowrie).',
    tools: [
      { label: 'GNS3', color: 'cyan' }, { label: 'VyOS', color: 'green' },
      { label: 'Wazuh', color: 'red' }, { label: 'Cowrie', color: 'orange' }, { label: 'OpenStack', color: 'cyan' },
    ],
    taskLabel: '// ARCHITECTURE',
    tasks: [
      'VLANs: Web / DB / Admin / Supervision',
      'Honeynet trap — brute-force detection',
      'SIEM dashboard (Wazuh) — real-time alerts',
      '99.9% uptime · <500ms response · 4 sprints',
    ],
    badge: 'COMPLETED',
  },
  {
    id: 'ml',
    abbr: 'ML',
    category: 'EXAM — ML FOR CYBERSECURITY',
    name: 'INTRUSION DETECTION',
    icon: '🤖',
    pdf: "/pdfs/Ranime-JEMAL_ML.ipynb",
    pdfLabel: '📄 VIEW NOTEBOOK',
    desc: 'Machine Learning applied to network intrusion detection on the NSL-KDD dataset — full pipeline from data exploration and preprocessing to KMeans clustering, SVM classification, and MLP neural network comparison.',
    tools: [
      { label: 'Python', color: 'green' }, { label: 'sklearn', color: 'cyan' },
      { label: 'KMeans', color: 'green' }, { label: 'SVM', color: 'red' },
      { label: 'ANN/MLP', color: 'orange' }, { label: 'NSL-KDD', color: 'cyan' },
    ],
    taskLabel: '// MODELS IMPLEMENTED',
    tasks: [
      'Data exploration — pandas, shape, types, missing values',
      'Preprocessing — LabelEncoder + StandardScaler + train/test split',
      'K-Means clustering — Elbow method (k=1..10)',
      'SVM linear & RBF kernels — accuracy comparison',
      'MLP Neural Network (128,64) layers, max_iter=300',
    ],
    badge: 'COMPLETED — EXAM 4CC1',
    isNotebook: true,
  },
];

// ── TIMELINE ──────────────────────────────────────────────
export const timeline = [
  {
    date: '// MAI 2026',
    title: 'SchoolApp — Full-Stack School Management System',
    desc: 'Complete web app with 2FA, multi-role access, REST API/Swagger, MySQL, MVC/Repository/DTO patterns. Built as a team project.',
  },
  {
    date: '// 2026 — PROJET INTÉGRATION',
    title: 'Secure Cloud IaaS — CNAM Model (Scrum · 4 sprints)',
    desc: 'GNS3+OpenStack simulation, VyOS firewall, VLANs, Wazuh SIEM, Cowrie Honeynet. 99.9% uptime — all cyber attacks detected and blocked.',
  },
  {
    date: '// 2026 — EXAM ML',
    title: 'ML for CyberSecurity — NSL-KDD Intrusion Detection',
    desc: 'Applied KMeans, SVM (linear/RBF), and ANN (MLP) on NSL-KDD network dataset. Full data preprocessing, modeling, and evaluation pipeline.',
  },
  {
    date: '// MAY 2026',
    title: 'Red Team / Blue Team — Penetration Testing & Network Defense',
    desc: '3-VM lab (pfSense + Kali + Ubuntu). Full attack chain: Nmap recon, Hydra SSH brute-force, SQL injection, hash cracking, XSS cookie theft. Snort IDS — 100% detection rate.',
  },
  {
    date: '// FEB 2026',
    title: 'SOC Home Lab — Wazuh SIEM + SSH Brute-Force Simulation',
    desc: 'Deployed Wazuh v4.7.5 on VMware. Simulated SSH brute-force from Kali against Ubuntu victim. 8 alerts detected in real time with MITRE ATT&CK auto-mapping (T1110). Tier-1 SOC analyst skills.',
  },
  {
    date: '// 2025–2026',
    title: 'Engineering Degree — ESPRIM · Class 4CC1',
    desc: 'Computer Engineering with Information Security specialization. 6 security workshops + 2 major projects completed.',
  },
];

// ── CERTIFICATES ──────────────────────────────────────────
export const certificates = [
  {
    id: 'c1', icon: '🛡️', issuer: '// GOOGLE / COURSERA',
    name: 'Google Cybersecurity Professional Certificate',
    desc: '9-course program — Python, Linux, SQL, SIEM, IDS. Entry-level cybersecurity roles preparation. Covers all OWASP-aligned domains.',
    date: 'FEB 18, 2026',

    img: "/certs/Capture d'écran 2026-03-15 151710.png",
  },
  {
    id: 'c2', icon: '🤖', issuer: '// NVIDIA',
    name: 'Fundamentals of Deep Learning',
    desc: 'Certificate of Competency in deep learning foundations from NVIDIA. Hands-on neural network training and deployment.',
    date: 'JAN 11, 2026',
  
    img: "/certs/Capture d'écran 2026-01-11 155148.png",
  },
  {
    id: 'c10', icon: '💻', issuer: '// CISCO',
    name: 'Cybersecurity Defense Analyst Pathway Exam',
desc: 'Certification focused on cybersecurity defense fundamentals including threat detection, network monitoring, security operations (SOC), incident response, and defensive security principles.',
    date: 'MAY 16, 2026',
    img: "/certs/image.png",
  },
  {
    id: 'c3', icon: '💻', issuer: '// MICROSOFT / FREECODECAMP',
    name: 'Foundational C# with Microsoft',
    desc: 'Developer Certification covering C# fundamentals, OOP, and .NET ecosystem basics — authorized by Microsoft.',
    date: 'JAN 23, 2026',
    img: "/certs/Capture d'écran 2026-01-26 065109.png",
  },
  {
    id: 'c4', icon: '🔗', issuer: '// DAR BLOCKCHAIN / 4HACKS',
    name: 'Blockchain Fundamentals',
    desc: 'Distributed Ledger Technology Certification (DLTC) — blockchain core concepts, consensus mechanisms, and DLT ecosystem.',
    date: 'APR 25, 2026',
    img: "/certs/Capture d'écran 2026-04-30 140513.png",
  },
  {
    id: 'c5', icon: '⛓️', issuer: '// THE HASHGRAPH ASSOCIATION',
    name: 'Hedera Business Foundation HBF',
    desc: 'Hedera Hashgraph business fundamentals — enterprise DLT, tokenization, and real-world blockchain application design.',
    date: 'APR 25, 2026',
   
    img: "/certs/Capture d'écran 2026-05-18 232834.png",
  },
  {
    id: 'c6', icon: '👨‍💻', issuer: '// THE HASHGRAPH ASSOCIATION',
    name: 'Hashgraph Developer Course',
    desc: 'Technical developer training on the Hedera Hashgraph network — smart contracts, SDKs, token service, and consensus service.',
    date: 'APR 22, 2026',
    
    img: "/certs/Capture d'écran 2026-05-18 232853.png",
  },
  {
    id: 'c7', icon: '🌐', issuer: '// IMPERIAL ENGLISH UK / ESPRIT',
    name: 'Certificate of English Language — CEFR B2',
    desc: 'Upper-Intermediate English proficiency (IELTS equivalent: 6). Issued by Imperial English UK in partnership with Esprit School of Engineering.',
    date: 'OCT 18, 2025',
   
    img: "/certs/ranime_jemal_CA63JN2_8426709_page-0001.jpg",
  },
  {
    id: 'c8', icon: '🏆', issuer: '// IEEE ESPRIM STUDENT BRANCH',
    name: 'Insight Cybersecurity Hackathon 2025',
    desc: 'Certificate of Participation — 48-hour cybersecurity hackathon at Esprim. Recognized for commitment and contribution to the event.',
    date: 'NOV 29–30, 2025',
    
    img: "/certs/WhatsApp Image 2025-12-22 at 2.22.28 PM (1).jpeg",
  },
  
];

// ── THREAT LOG MESSAGES ───────────────────────────────────
export const threatMessages = [
  '[WARN] ARP spoof attempt blocked',
  '[BLOCK] Facebook.com — Rule_06',
  '[ALERT] SYN flood on port 80',
  '[INFO] SSH: admin@192.168.11.1',
  '[BLOCK] Telnet port 23 — Rule_08',
  '[WARN] XSS payload in request',
  '[OK] Snort rule 1000001 hit',
  '[BLOCK] YouTube — HeuresTravail',
  '[INFO] VPN tunnel established',
  '[ALERT] SQLi attempt /login',
  '[BLOCK] Instagram — ReseauxSociaux',
  '[OK] Wazuh alert processed',
  '[WARN] Brute-force SSH attempt',
  '[OK] Nessus scan complete',
];
