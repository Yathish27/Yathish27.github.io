/* ------------------------------------------------------------------
   Portfolio content. Edit this file to update the site.
   ------------------------------------------------------------------ */
window.DATA = {
  person: {
    name: 'Yathish Naraganahalli Veerabhadraiah',
    short: 'Yathish N. Veerabhadraiah',
    initials: 'YNV',
    title: 'Software Development Engineer',
    tagline: 'Security Automation · Cloud Services · Detection Tooling',
    location: 'New York, NY',
    email: 'yn2426@nyu.edu',
    phone: '+1 347 466 6215',
    phoneRaw: '+13474666215',
    linkedin: 'https://linkedin.com/in/yathish-n-veerabhadraiah',
    github: 'https://github.com/Yathish27',
    resume: 'assets/Yathish_Veerabhadraiah_Resume.pdf'
  },

  typed: [
    'Backend services on AWS',
    'Security automation & DevSecOps',
    'Threat-detection tooling',
    'LLM red-teaming'
  ],

  // Hero: full-body hello (plays once on load, replay with sound on tap)
  hello: {
    src: 'assets/video/body-wave.mp4',
    poster: 'assets/img/body-poster.jpg',
    text: "Hello! I'm Yathish."
  },

  // SOC console live feed: talking intro clips, played in sequence with a glitch cut.
  clips: [
    {
      src: 'assets/video/intro-1.mp4',
      poster: 'assets/img/hero-poster.jpg',
      label: 'INTRO · 1/3',
      text: "Hi, I'm Yathish. I'm a software engineer with a security background, building and running backend services and threat detection on AWS."
    },
    {
      src: 'assets/video/intro-2.mp4',
      poster: 'assets/img/hero-poster-2.jpg',
      label: 'INTRO · 2/3',
      text: "I hold a Master's in Cybersecurity from NYU with a 4.0 GPA, and I've led engineering as a CTO."
    },
    {
      src: 'assets/video/intro-3.mp4',
      poster: 'assets/img/hero-poster-3.jpg',
      label: 'INTRO · 3/3',
      text: "Scroll down to explore my work, and let's build something secure together."
    }
  ],

  skillGroups: {
    lang:  { label: 'Languages',          color: '#38e8ff' },
    back:  { label: 'Backend & APIs',     color: '#a78bfa' },
    cloud: { label: 'AWS & Cloud',        color: '#ffb547' },
    cicd:  { label: 'CI/CD & Automation', color: '#4ade80' },
    sec:   { label: 'Security',           color: '#fb7185' },
    cert:  { label: 'Certifications',     color: '#fde047' },
    rnd:   { label: 'Research & Robotics',color: '#2dd4bf' }
  },

  // r/c = grid row/column in the 18-column periodic layout (desktop).
  // mass = years of hands-on use.
  skills: [
    { sym: 'Py', name: 'Python',          g: 'lang',  r: 1, c: 1,  mass: 6, where: 'Automation, detection tooling, Spybot, research models' },
    { sym: 'Cr', name: 'CRTP',            g: 'cert',  r: 1, c: 18, mass: 1, where: 'Certified Red Team Professional (Active Directory attacks)' },

    { sym: 'Ja', name: 'Java',            g: 'lang',  r: 2, c: 1,  mass: 4, where: 'Spring Boot reactive APIs for the NYU OSIRIS Lab project' },
    { sym: 'Ts', name: 'TypeScript',      g: 'lang',  r: 2, c: 2,  mass: 3, where: 'Node.js services and MCP server at Plurall AI' },
    { sym: 'Ec', name: 'EC2',             g: 'cloud', r: 2, c: 13, mass: 4, where: 'Hosted AI services and Linux workloads' },
    { sym: 'La', name: 'Lambda',          g: 'cloud', r: 2, c: 14, mass: 3, where: 'Event-driven security automation' },
    { sym: 'S3', name: 'S3',              g: 'cloud', r: 2, c: 15, mass: 4, where: 'Artifacts, logs and model storage' },
    { sym: 'R5', name: 'Route 53',        g: 'cloud', r: 2, c: 16, mass: 3, where: 'DNS for production services' },
    { sym: 'Ia', name: 'IAM',             g: 'cloud', r: 2, c: 17, mass: 4, where: 'Least-privilege roles and policies' },
    { sym: 'Cp', name: 'CPTS',            g: 'cert',  r: 2, c: 18, mass: 0, where: 'HTB Certified Penetration Testing Specialist · in progress' },

    { sym: 'Js', name: 'JavaScript',      g: 'lang',  r: 3, c: 1,  mass: 5, where: 'Node.js/Express backends and tooling' },
    { sym: 'Sq', name: 'SQL',             g: 'lang',  r: 3, c: 2,  mass: 5, where: 'PostgreSQL schemas, queries and migrations' },
    { sym: 'Li', name: 'Linux',           g: 'cloud', r: 3, c: 13, mass: 6, where: 'RHEL/CentOS administration, patching, hardening' },
    { sym: 'Dk', name: 'Docker',          g: 'cloud', r: 3, c: 14, mass: 4, where: 'Containerised services at Schneider and Plurall' },
    { sym: 'K8', name: 'Kubernetes',      g: 'cloud', r: 3, c: 15, mass: 2, where: 'Orchestration proof-of-concepts' },
    { sym: 'Gh', name: 'GitHub Actions',  g: 'cicd',  r: 3, c: 16, mass: 4, where: 'Security-gated CI/CD for ~80 engineers' },
    { sym: 'Jk', name: 'Jenkins',         g: 'cicd',  r: 3, c: 17, mass: 3, where: 'Release pipelines with SAST/DAST/SCA stages' },
    { sym: 'Co', name: 'CRTO',            g: 'cert',  r: 3, c: 18, mass: 0, where: 'Certified Red Team Operator · in progress' },

    { sym: 'Ba', name: 'Bash',            g: 'lang',  r: 4, c: 1,  mass: 6, where: 'Automation scripts and ops glue' },
    { sym: 'Sb', name: 'Spring Boot',     g: 'back',  r: 4, c: 2,  mass: 2, where: 'Reactive REST APIs, 8s → 1.6s latency' },
    { sym: 'No', name: 'Node.js',         g: 'back',  r: 4, c: 3,  mass: 4, where: 'Backend services at Plurall AI' },
    { sym: 'Ex', name: 'Express',         g: 'back',  r: 4, c: 4,  mass: 4, where: 'REST API layer' },
    { sym: 'Re', name: 'REST Design',     g: 'back',  r: 4, c: 5,  mass: 5, where: 'API contracts, versioning, auth' },
    { sym: 'Pg', name: 'PostgreSQL',      g: 'back',  r: 4, c: 6,  mass: 4, where: 'Primary datastore for production services' },
    { sym: 'Jw', name: 'JWT / OAuth 2.0', g: 'back',  r: 4, c: 7,  mass: 4, where: 'Access control for AI services' },
    { sym: 'Mc', name: 'MCP Servers',     g: 'back',  r: 4, c: 8,  mass: 1, where: 'Connecting LLMs to tools and retrieval pipelines' },
    { sym: 'Sa', name: 'SAST',            g: 'cicd',  r: 4, c: 9,  mass: 3, where: 'SonarQube, Coverity gates in CI' },
    { sym: 'Da', name: 'DAST',            g: 'cicd',  r: 4, c: 10, mass: 3, where: 'Burp Suite scans in pipelines' },
    { sym: 'Sc', name: 'SCA',             g: 'cicd',  r: 4, c: 11, mass: 3, where: 'Snyk dependency checks' },
    { sym: 'An', name: 'Ansible',         g: 'cicd',  r: 4, c: 12, mass: 2, where: 'Configuration automation' },
    { sym: 'Td', name: 'Threat Detection',g: 'sec',   r: 4, c: 13, mass: 4, where: 'Spybot phishing detection, credential-leak monitoring' },
    { sym: 'Vt', name: 'Vuln Triage',     g: 'sec',   r: 4, c: 14, mass: 4, where: 'Severity × exploitability prioritisation to closure' },
    { sym: 'Ma', name: 'MITRE ATT&CK',    g: 'sec',   r: 4, c: 15, mass: 3, where: 'Red-team assessment mapping' },
    { sym: 'Ow', name: 'OWASP Top 10',    g: 'sec',   r: 4, c: 16, mass: 5, where: 'AppSec reviews and teaching labs' },
    { sym: 'Lr', name: 'LLM Red-Teaming', g: 'sec',   r: 4, c: 17, mass: 2, where: 'Prompt injection and data-leak testing before release' },
    { sym: 'Pt', name: 'Pen Testing',     g: 'sec',   r: 4, c: 18, mass: 4, where: 'Full-scope red team engagement' },

    { sym: 'Tb', name: 'Tableau',         g: 'lang',  r: 5, c: 1,  mass: 2, where: 'Security metrics dashboards' },
    { sym: 'Gi', name: 'Git',             g: 'lang',  r: 5, c: 2,  mass: 6, where: 'Everywhere' },
    { sym: 'Bu', name: 'Burp Suite',      g: 'sec',   r: 5, c: 3,  mass: 4, where: 'Web app testing and DAST' },
    { sym: 'Sn', name: 'Snyk',            g: 'sec',   r: 5, c: 4,  mass: 3, where: 'Dependency and container scanning' },
    { sym: 'Wz', name: 'Wiz',             g: 'sec',   r: 5, c: 5,  mass: 2, where: 'Cloud posture findings triage' },
    { sym: 'So', name: 'SonarQube',       g: 'sec',   r: 5, c: 6,  mass: 3, where: 'Static analysis quality gates' },
    { sym: 'Cv', name: 'Coverity',        g: 'sec',   r: 5, c: 7,  mass: 2, where: 'Static analysis in CI' },
    { sym: 'Gl', name: 'Gitleaks',        g: 'sec',   r: 5, c: 8,  mass: 3, where: 'Credential-leak monitoring' },
    { sym: 'Nw', name: 'Network Sec',     g: 'sec',   r: 5, c: 9,  mass: 3, where: 'Firewalls, IDS, NYU coursework' },
    { sym: 'Cy', name: 'Cryptography',    g: 'sec',   r: 5, c: 10, mass: 2, where: 'Information security coursework' },
    { sym: 'Ap', name: 'AppSec',          g: 'sec',   r: 5, c: 11, mass: 4, where: 'Healthcare app reviews at Hygia Health' },
    { sym: 'Cs', name: 'Cloud Security',  g: 'sec',   r: 5, c: 12, mass: 4, where: 'AWS hardening and monitoring' },
    { sym: 'Ai', name: 'LLM Systems',     g: 'rnd',   r: 5, c: 13, mass: 2, where: 'LLM-assisted detection, retrieval pipelines' },
    { sym: 'Ra', name: 'Risk Analysis',   g: 'sec',   r: 5, c: 14, mass: 3, where: 'Risk-scored remediation reports' },
    { sym: 'Bb', name: 'Bug Bounty',      g: 'sec',   r: 5, c: 15, mass: 2, where: 'Independent hunting and labs' },
    { sym: 'Ct', name: 'CTF',             g: 'sec',   r: 5, c: 16, mass: 4, where: 'Top-10 finish, PES University CTF' },
    { sym: 'Ss', name: 'Supply Chain',    g: 'sec',   r: 5, c: 17, mass: 2, where: 'Teaching software supply-chain security at NYU' },
    { sym: 'Os', name: 'Offensive Sec',   g: 'sec',   r: 5, c: 18, mass: 3, where: 'Graduate labs I teach at NYU' },

    { sym: 'Ro', name: 'ROS',             g: 'rnd',   r: 7, c: 3,  mass: 2, where: 'Modular agriculture robot' },
    { sym: 'Rp', name: 'Raspberry Pi',    g: 'rnd',   r: 7, c: 4,  mass: 2, where: 'Robot web server' },
    { sym: 'Ar', name: 'Arduino',         g: 'rnd',   r: 7, c: 5,  mass: 2, where: 'Sensors and motion control' },
    { sym: 'Gz', name: 'Gazebo',          g: 'rnd',   r: 7, c: 6,  mass: 1, where: 'E-yantra warehouse simulation (IIT Bombay)' },
    { sym: 'Cn', name: 'Computer Vision', g: 'rnd',   r: 7, c: 7,  mass: 3, where: 'Deepfake and crop/weed detection' },
    { sym: 'Dl', name: 'Deep Learning',   g: 'rnd',   r: 7, c: 8,  mass: 3, where: 'EfficientNet-B7, Xception, Inception-ResNet + LSTM' },
    { sym: 'Df', name: 'Deepfake Det.',   g: 'rnd',   r: 7, c: 9,  mass: 2, where: 'NYU capstone and Plurall AI' },
    { sym: 'Pb', name: 'Publishing',      g: 'rnd',   r: 7, c: 10, mass: 1, where: 'Springer Nature · SCF 2025, Hong Kong' }
  ],

  experience: [
    {
      role: 'Chief Technology Officer',
      org: 'Plurall AI',
      place: 'New York, NY',
      period: 'Jan 2025 – Apr 2026',
      tag: 'LEAD',
      points: [
        'Built and operated an AWS-hosted AI service as the sole technical hire, owning backend services, deployment, access control (IAM least-privilege, JWT/OAuth) and production reliability.',
        'Developed backend services and REST APIs in Node.js/Express with PostgreSQL, plus an MCP server connecting LLM components to application logic, tools and retrieval pipelines.',
        'Built Spybot, an LLM-assisted phishing and spam detection system deployed on AWS, and red-teamed LLM behaviour for prompt injection and data leakage before release.'
      ]
    },
    {
      role: 'Graduate Course Assistant',
      org: 'New York University',
      place: 'Brooklyn, NY',
      period: 'Aug 2025 – Present',
      tag: 'TEACH',
      points: [
        'Teach offensive security and software supply-chain security labs.',
        'Mentor graduate students on CI/CD pipeline risk and vulnerability triage.'
      ]
    },
    {
      role: 'DevOps & Security Intern',
      org: 'Hygia Health Services',
      place: 'Remote',
      period: 'Apr 2025 – Sep 2025',
      tag: 'HEALTH',
      points: [
        'Supported DevSecOps practices and application security reviews for a healthcare technology environment.'
      ]
    },
    {
      role: 'Founding Engineer',
      org: 'Plurall AI · NYU Leslie Lab',
      place: 'New York, NY',
      period: 'Oct 2024 – Jan 2025',
      tag: 'R&D',
      points: [
        'Developed an AI-powered deepfake detection system to prevent impersonation and fraud by identifying spatial inconsistencies in AI-generated faces.'
      ]
    },
    {
      role: 'DevSecOps / Security Engineer',
      org: 'Schneider Electric',
      place: 'Bengaluru, India',
      period: 'Aug 2022 – Aug 2024',
      tag: 'SCALE',
      points: [
        'Automated security checks in CI/CD (GitHub Actions, Jenkins) with SAST/DAST/SCA scanning, credential-leak monitoring and dependency checks across a development environment used by ~80 engineers.',
        'Triaged and drove remediation of findings from Snyk, Wiz, SonarQube, Coverity and Burp Suite, prioritising by severity and exploitability and tracking fixes to closure.',
        'Administered Linux and AWS workloads (EC2, Lambda, S3, Route 53) with least-privilege IAM, patching and monitoring; built Tableau dashboards for security metrics.',
        'Played a key role in the migration to Enterprise Cloud and the Salesforce–SAP–PIM integration for digital CRM.'
      ]
    },
    {
      role: 'Academic Tutor & Mentor (part-time)',
      org: 'IntrnForte',
      place: 'Bengaluru, India',
      period: 'Nov 2022 – Aug 2024',
      tag: 'TEACH',
      points: [
        'Delivered 20+ hours of lectures on AI, cybersecurity and robotics with hands-on sessions and industry-level projects.'
      ]
    },
    {
      role: 'Robotics & AI Research Intern',
      org: 'PES University',
      place: 'Bengaluru, India',
      period: 'Sep 2021 – Aug 2022',
      tag: 'R&D',
      points: [
        'Designed intelligent modular robots for agricultural applications using ROS and deep learning: crop and weed detection, fruit identification and pest monitoring.'
      ]
    }
  ],

  achievements: [
    { icon: '🏅', shape: 'cup', metal: 'gold', year: '2026', kicker: 'NYU · 2026', title: 'Academic Achievement Award', body: 'Distinguished academic achievement in the M.S. Cybersecurity program with a 4.0 CGPA.', accent: '#fde047' },
    { icon: '📚', shape: 'plaque', metal: 'gold', year: '2025', kicker: 'Springer Nature · 2025', title: 'Published research', body: 'Research published by Springer Nature and presented at the 21st International METAVERSE Conference (SCF 2025), Hong Kong.', accent: '#a78bfa' },
    { icon: '🥇', shape: 'medal', metal: 'gold', rank: '1', year: '2024', kicker: 'TCC NYU · Nov 2024', title: 'TCC Ideathon Winner', body: 'Pitched a gamified, Gen-AI-driven library experience for NYU students and staff, integrated with the cafeteria and Albert.', accent: '#38e8ff' },
    { icon: '🥈', shape: 'medal', metal: 'silver', rank: '2', year: '2024', kicker: 'Schneider Electric · Mar 2024', title: 'DTC Ideathon · 2nd place', body: 'Proposed Gen-AI creative advertising for B2C marketing, now on the roll-out roadmap.', accent: '#4ade80' },
    { icon: '⚡', shape: 'bolt', metal: 'cyan', year: '2025', kicker: 'NYU OSIRIS Lab', title: '75% latency reduction', body: 'Re-engineered REST APIs on Spring Boot reactive, cutting average response time from 8 s to 1.6 s and shipping an online payment system.', accent: '#ffb547' },
    { icon: '🛡️', shape: 'shield', metal: 'rose', year: 'CRTP', kicker: 'Certification', title: 'CRTP · Certified Red Team Professional', body: 'Hands-on Active Directory attack and defence certification. CPTS and CRTO in progress.', accent: '#fb7185' },
    { icon: '☁️', shape: 'star', metal: 'blue', year: '2023', kicker: 'Salesforce · Jun 2023', title: 'Trailblaze Ranger', body: 'Top Trailhead rank earned while integrating Salesforce Cloud with enterprise release pipelines.', accent: '#38e8ff' },
    { icon: '💧', shape: 'medal', metal: 'bronze', rank: '3', year: '2020', kicker: 'PES University · Sep 2020', title: 'Ideathon 2020 · Top 3', body: 'Smart solutions for water-wastage management under the theme "Rebuilding cities during pandemics and natural calamities".', accent: '#2dd4bf' },
    { icon: '🚩', shape: 'flag', metal: 'violet', year: '2019', kicker: 'PES University · Oct 2019', title: 'CTF Hackathon · Top 10', body: 'First hackathon as an ethical hacker, finishing in the top 10 participants.', accent: '#a78bfa' },
    { icon: '🎖️', shape: 'cup', metal: 'gold', year: '2018', kicker: 'Bharat Scouts & Guides · Mar 2018', title: 'President Scout Award', body: 'The highest scouting honour in India; marched in the state parade for Republic Day celebrations.', accent: '#fde047' },
    { icon: '⭐', shape: 'medal', metal: 'amber', rank: '★', year: '2017', kicker: 'Bharat Scouts & Guides · Aug 2017', title: 'Rashtrapati Scout', body: 'National-level recognition for leadership and service.', accent: '#ffb547' }
  ],

  projects: [
    {
      name: 'Spybot',
      kicker: 'LLM-assisted phishing & spam detection',
      body: 'Analyses behavioural patterns and contextual cues in email to flag threats. Deployed on AWS; red-teamed for prompt injection and data leakage before release. Born at HackNYU 2025.',
      tags: ['Python', 'LLM', 'AWS', 'Red-team'],
      accent: '#fb7185'
    },
    {
      name: 'OSIRIS Lab Industry Project',
      kicker: 'Reactive REST APIs · NYU',
      body: 'Engineered REST APIs with Java Spring Boot reactive, cutting average API response time from 8 s to 1.6 s (75% latency reduction) and implementing an online payment system.',
      tags: ['Java', 'Spring Boot', 'Payments'],
      accent: '#ffb547'
    },
    {
      name: 'Red Team Penetration Test',
      kicker: 'Full-scope assessment',
      body: 'Mapped every finding to MITRE ATT&CK and delivered a risk-scored remediation report that the client could act on in priority order.',
      tags: ['MITRE ATT&CK', 'Burp Suite', 'Reporting'],
      accent: '#a78bfa'
    },
    {
      name: 'MCP Server for LLM tooling',
      kicker: 'Plurall AI platform',
      body: 'A Model Context Protocol server that connects LLM components to application logic, tools and retrieval pipelines behind JWT/OAuth-protected Node.js APIs on AWS.',
      tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'MCP'],
      accent: '#38e8ff'
    },
    {
      name: 'Deepfake Detection System',
      kicker: 'NYU capstone · Plurall AI',
      body: 'EfficientNet-B7, Xception and Inception-ResNet features fused with LSTMs to catch spatial inconsistencies across video frames, with an ensembled comparative study.',
      tags: ['Computer Vision', 'Deep Learning', 'PyTorch'],
      accent: '#2dd4bf'
    },
    {
      name: 'AI Modular Agriculture Robot',
      kicker: 'PES University research',
      body: '3D-printed modular robot on ROS with a Raspberry Pi web server and Arduino sensor control: crop and weed detection, fruit identification, pest monitoring.',
      tags: ['ROS', 'Raspberry Pi', 'Arduino'],
      accent: '#4ade80'
    },
    {
      name: 'E-yantra Robotics Competition',
      kicker: 'IIT Bombay',
      body: 'Simulated an automated warehouse in the Gazebo 3D dynamic simulator for efficient order management.',
      tags: ['Gazebo', 'ROS', 'Simulation'],
      accent: '#fde047'
    }
  ],

  education: [
    {
      school: 'New York University · Tandon School of Engineering',
      degree: 'M.S., Cybersecurity',
      period: 'Aug 2024 – May 2026',
      gpa: 'GPA 4.0 / 4.0',
      notes: 'Information Security & Privacy · Network Security · Penetration Testing & Vulnerability Analysis · Computer Networking'
    },
    {
      school: 'PES University, Bengaluru',
      degree: 'B.Tech, Computer Science Engineering',
      period: '2018 – 2022',
      gpa: 'GPA 7.86 / 10',
      notes: 'Focus on AI, robotics and cybersecurity'
    }
  ],

  certs: [
    { name: 'CRTP', full: 'Certified Red Team Professional', status: 'Active' },
    { name: 'CPTS', full: 'Certified Penetration Testing Specialist', status: 'In progress' },
    { name: 'CRTO', full: 'Certified Red Team Operator', status: 'In progress' }
  ],
  // ---------- ops console: terminal, telemetry, hacker copy ----------
  terminal: {
    host: 'yathish@sec-ops',
    boot: [
      'SEC-OPS SHELL v2.6 · booting',
      'loading modules  [iam] [sast] [dast] [sca] [llm-redteam] [detect]',
      'mounting /portfolio  ............ ok',
      'identity verified  ............... YNV · clearance level 4',
      'motd: my other computer is your computer.',
      'you have been pwned ... by curiosity. welcome.',
      'type  help  to list commands'
    ],
    files: {
      'about.txt': [
        'Software engineer with a security background who builds and operates services on AWS:',
        'REST APIs and backend services (Java Spring Boot, Node.js), an LLM-assisted phishing and',
        'spam detection system deployed on AWS, and CI/CD pipelines with automated security checks.',
        'Comfortable across software, cloud infrastructure and security teams. M.S. Cybersecurity, NYU (GPA 4.0).'
      ]
    }
  },

  telemetry: [
    { label: 'Security engineering', value: 95, color: '#fb7185' },
    { label: 'AWS & cloud ops',      value: 90, color: '#ffb547' },
    { label: 'CI/CD · DevSecOps',    value: 92, color: '#4ade80' },
    { label: 'Backend & APIs',       value: 88, color: '#a78bfa' },
    { label: 'Threat detection',     value: 86, color: '#38e8ff' },
    { label: 'LLM red-teaming',      value: 82, color: '#2dd4bf' }
  ],

  feedLines: [
    'SAST scan complete · 0 critical · 2 medium queued for triage',
    'IAM policy audit · least-privilege ✓ · 0 wildcard actions',
    'Spybot classified inbound mail · phishing probability 0.97 · quarantined',
    'prompt-injection probe blocked · pattern: role-override · logged to SIEM',
    'dependency check · snyk · 1 high → patched in PR #214',
    'GitHub Actions gate · DAST pass · deploy allowed',
    'EC2 patch window · 12 hosts · kernel updated · reboot scheduled',
    'JWT rotation · keys rolled · 0 failed auth',
    'MITRE ATT&CK mapping · T1566 phishing · detection coverage ✓',
    'Spring Boot reactive · p95 latency 1.6 s · SLO met',
    'credential-leak monitor · gitleaks · 0 findings',
    'OWASP ZAP baseline · 0 alerts above low',
    'Route 53 health check · all endpoints healthy',
    'Lambda cold-start audit · 220 ms avg · within budget',
    'CTF practice · privilege escalation lab · root ✓',
    'MCP server · 14 tools registered · retrieval pipeline warm',
    'supply-chain scan · SBOM generated · signatures verified',
    'S3 bucket policy review · public access blocked ✓'
  ],
  ticker: [
    'YOU HAVE BEEN PWNED',
    "I'M WATCHING YOU",
    'MY OTHER COMPUTER IS YOUR COMPUTER',
    'SUDO HIRE YATHISH',
    'TRUST NOTHING · VERIFY EVERYTHING',
    'LEAST PRIVILEGE OR NOTHING',
    'ACCESS GRANTED · NEW YORK, NY'
  ],

  avatars: [
    {
      id: 'pwned',
      fx: 'glitch',
      title: 'YOU HAVE BEEN PWNED',
      sub: 'red-team mode',
      img: 'assets/img/avatar-terminal.jpg',
      body: 'CRTP-certified. I map every finding to MITRE ATT&CK and red-team LLMs for prompt injection before release. The only thing I pwn in production is my own test environment.'
    },
    {
      id: 'watching',
      fx: 'scan',
      title: "I'M WATCHING YOU",
      sub: 'detection mode',
      img: 'assets/img/avatar-watching.jpg',
      fallback: 'assets/img/gym-green-web.jpg',
      body: 'Threat detection is a habit, not a tool. Spybot watches inbound mail, gitleaks watches commits, and I watch the dashboards that watch the rest.'
    },
    {
      id: 'other',
      fx: 'ascii',
      title: 'MY OTHER COMPUTER IS YOUR COMPUTER',
      sub: 'cloud mode',
      img: 'assets/img/suit-portrait-upper.jpg',
      fallback: 'assets/img/white-stool-web.jpg',
      body: 'EC2, Lambda, S3, Route 53 and Kubernetes are my other computers. Least-privilege IAM, patched hosts and security-gated pipelines keep them yours, not someone else’s.'
    }
  ],
  // ---------- mascot guide ----------
  mascot: {
    // Optional video clips keyed out to transparency (set to null to use the puppet cutout).
    // Each entry needs <base>.webm (VP9 alpha) and <base>-stacked.mp4 (RGB over alpha matte) in assets/video.
    clips: { walk: null, talk: null },
    layers: { w: 393, h: 1216, hipY: 724, bodyH: 736, legsH: 492 },
    intro: "Hi, I'm Yathish. I'll walk you through my portfolio. Turn my voice on if you'd like me to talk.",
    guide: {
      intro: "This is me, live from CAM-02. Tap the frame to hear me say hello, or scroll and I'll follow you down.",
      ops: "Welcome to the SOC console. Play my intro on CAM-01, type help in the terminal, or run nmap yathish to scan me.",
      avatars: "Three faces of my threat model: red team, detection and cloud. Hover a card to break it a little.",
      about: "The short version: a security background with builder's habits. M.S. in Cybersecurity at NYU with a 4.0 GPA.",
      id: "My access badge. Flip it to get my email, phone and LinkedIn.",
      skills: "A periodic table of everything I work with. Hover an element to see where I used it, or filter by group.",
      experience: "My mission log: CTO at Plurall AI, DevSecOps at Schneider Electric, and teaching offensive security at NYU.",
      achievements: "The trophy cabinet. Keep scrolling to walk along it, and hover any trophy to read its plaque.",
      projects: "Things I built: Spybot, reactive APIs that cut latency by 75 percent, a red-team engagement and an MCP server.",
      education: "Training data: NYU Tandon and PES University, plus CRTP, with CPTS and CRTO in progress.",
      contact: "That's the tour. Email me, or type sudo hire yathish in the console. Let's build something secure together."
    }
  }
};
