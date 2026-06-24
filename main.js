// ===== THEME TOGGLE =====
let isDark = localStorage.getItem('theme') !== 'light';

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('themeBtn').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleTheme() {
  isDark = !isDark;
  applyTheme();
}

// Initial apply
applyTheme();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('navLinks').classList.remove('open');
}));

// ===== TYPING EFFECT =====
const arTitles = ['مطورة Full-Stack محترفة', 'خبيرة Flutter & Laravel', 'مدمجة للذكاء الاصطناعي 🤖', 'مهندسة حلول برمجية متكاملة'];
const enTitles = ['Full-Stack Developer', 'Flutter & Laravel Expert', 'AI Integration Engineer 🤖', 'Scalable Systems Architect'];
let titleIndex = 0, charIndex = 0, isDeleting = false, currentLang = 'ar';
const typingEl = document.getElementById('typingText');

function type() {
  const titles = currentLang === 'ar' ? arTitles : enTitles;
  const current = titles[titleIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; titleIndex = (titleIndex + 1) % titles.length; setTimeout(type, 500); return; }
  } else {
    typingEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { isDeleting = true; setTimeout(type, 1800); return; }
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// ===== SLIDER =====
const sliderState = {};
function initSlider(trackId, dotsId) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const count = track.children.length;
  sliderState[trackId] = { index: 0, count };
  if (!dotsId) return;
  const dotsEl = document.getElementById(dotsId);
  if (!dotsEl) return;
  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(trackId, i, dotsId);
    dotsEl.appendChild(d);
  }
}
function goTo(trackId, idx, dotsId) {
  const state = sliderState[trackId];
  state.index = idx;
  document.getElementById(trackId).style.transform = `translateX(${idx * 100}%)`;
  if (dotsId) {
    const dots = document.getElementById(dotsId)?.querySelectorAll('.dot');
    dots?.forEach((d, i) => d.classList.toggle('active', i === idx));
  }
}
function slide(trackId, dir) {
  const state = sliderState[trackId];
  if (!state) return;
  const dotsId = trackId.replace('track', 'dots');
  const newIdx = (state.index + dir + state.count) % state.count;
  goTo(trackId, newIdx, document.getElementById(dotsId) ? dotsId : null);
}

initSlider('track1', 'dots1');
initSlider('track2', 'dots2');
initSlider('track3', null);
initSlider('track4', null);

// Auto-slide
setInterval(() => { if (sliderState['track1']) slide('track1', 1); }, 4000);
setInterval(() => { if (sliderState['track2']) slide('track2', 1); }, 5000);

// ===== AOS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('visible');
        // Animate skill bars
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('style').match(/width:(\S+)/)?.[1] || '0';
        });
      }, i * 100);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Also animate skill bars when skills section visible
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        const target = bar.parentElement.previousElementSibling?.previousElementSibling?.textContent;
        bar.style.width = bar.dataset.width || bar.style.width;
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(c => skillObserver.observe(c));

// ===== PARTICLES =====
const particleContainer = document.getElementById('particles');
for (let i = 0; i < 40; i++) {
  const p = document.createElement('div');
  p.style.cssText = `
    position:absolute; width:${Math.random()*3+1}px; height:${Math.random()*3+1}px;
    background:rgba(124,58,237,${Math.random()*0.5+0.1}); border-radius:50%;
    left:${Math.random()*100}%; top:${Math.random()*100}%;
    animation: particleFloat ${Math.random()*10+8}s ease-in-out infinite;
    animation-delay:${Math.random()*-10}s;
  `;
  particleContainer.appendChild(p);
}
const pStyle = document.createElement('style');
pStyle.textContent = `@keyframes particleFloat {
  0%,100%{transform:translateY(0) translateX(0)}
  25%{transform:translateY(-${Math.random()*30+20}px) translateX(${Math.random()*20}px)}
  75%{transform:translateY(${Math.random()*20}px) translateX(-${Math.random()*20}px)}
}`;
document.head.appendChild(pStyle);


// ===== LANGUAGE TOGGLE =====
const translations = {
  ar: {
    'hero-badge-text': 'متاحة للعمل',
    'hero-name': 'نسمة عبدالله المعصار',
    'hero-desc': 'مهندسة تقنية معلومات خريجة جامعة صنعاء بمرتبة الشرف (95%)، متخصصة في بناء الحلول البرمجية المتكاملة، ودمج تقنيات الذكاء الاصطناعي لتحويل الأفكار إلى تطبيقات ذكية وتفاعلية.',
    'hero-btn1': 'استعرض أعمالي', 'hero-btn2': 'تواصل معي', 'hero-cv': 'تحميل السيرة الذاتية PDF',
    'stat1': 'المعدل التراكمي', 'stat2': 'مشاريع منجزة', 'stat3': 'شهادات مهنية',
    'skills-tag': 'المهارات', 'skills-title': 'الخبرات التقنية',
    'sk1-title': 'تطوير تطبيقات الموبايل', 'sk2-title': 'برمجة الويب والخلفية',
    'sk3-title': 'الذكاء الاصطناعي', 'sk4-title': 'إدارة قواعد البيانات',
    'sk5-title': 'لغات البرمجة', 'sk6-title': 'التصميم',
    'soft-title': 'المهارات الشخصية',
    'ss1':'حل المشكلات المعقدة','ss2':'التفكير النقدي','ss3':'العمل عن بُعد',
    'ss4':'إدارة الوقت','ss5':'العمل الجماعي','ss6':'المرونة والتكيف',
    'ss7':'البحث الأكاديمي','ss8':'التعلم الذاتي',
    'proj-tag': 'المشاريع', 'proj-title': 'أبرز الأعمال',
    'feat-badge': 'مشروع التخرج ⭐', 'mm-sub': 'الرفيق الذكي لحياة صحية',
    'mm-desc': 'منصة متكاملة تجمع Flutter وLaravel مع دمج Google Gemini GenAI لتحليل البيانات الصحية وتوليد خطط غذائية مخصصة آنياً.',
    'mm-link': '🌐 عرض المشروع',
    'hn-title': 'متجر محمد المعصار للعسل اليمني',
    'hn-desc': 'منصة تجارة إلكترونية متكاملة للعسل اليمني والتوابل الأصيلة مع ترشيح ذكي وربط ببوابات الدفع.',
    'hn-link': '🌐 عرض المشروع',
    'dn-desc': 'واجهة أمامية احترافية لعيادة أسنان — صفحة هبوط عربية نظيفة وسريعة.',
    'sn-title': 'مفكرتي الذكية', 'sn-desc': 'نموذج أولي لتطبيق إدارة المهام اليومية بواجهة بصرية محفِّزة للإنتاجية.',
    'om-title': 'OrderMeals', 'om-desc': 'تطبيق سطح مكتب لإدارة الحميات الغذائية مع تتبع الطلبات.',
    'edu-tag': 'التعليم', 'edu-title': 'التعليم والشهادات',
    'edu-degree': 'بكالوريوس تقنية معلومات',
    'edu-uni': 'جامعة صنعاء — كلية الحاسوب',
    'edu-badge': 'خريجة بمرتبة الشرف | المعدل: 95%',
    'c1':'دورة الذكاء الاصطناعي المكثفة — جامعة صنعاء',
    'c2':'دورة Laravel المتقدمة — جامعة صنعاء',
    'c3':'شهادة تدريب ميداني — سبأفون للاتصالات',
    'c4':'شهادة مهنية — بنك التسليف الزراعي CAC',
    'c5':'شهادة مهنية — بنك اليمن والكويت YKB',
    'c6':'شهادة HRMS — إبداع سوفت',
    'c7':'مقدمة الأمن السيبراني — Cisco',
    'c8':'دبلوم إدارة تقنية المعلومات — Alison',
    'con-tag': 'التواصل', 'con-title': 'هل لديك مشروع؟ لنتحدث!',
    'con-email-label':'البريد الإلكتروني','con-phone-label':'الهاتف',
    'con-loc-label':'الموقع','con-loc':'صنعاء، اليمن',
    'form-name-label':'الاسم','form-email-label':'البريد الإلكتروني','form-msg-label':'الرسالة',
    'form-submit-btn':'إرسال الرسالة 🚀',
    'footer-text': '© 2026 نسمة عبدالله المعصار — صُنع بـ ❤️ وشغف بالكود',
    'langBtn': 'EN', dir: 'rtl', lang: 'ar'
  },
  en: {
    'hero-badge-text': 'Available for work',
    'hero-name': 'Nesmah Abdallah Al-Measar',
    'hero-desc': 'Honors IT graduate (GPA 95%) from Sana\'a University. Full-Stack & AI Integration Engineer specializing in Flutter, Laravel, and Google Gemini — turning ideas into intelligent applications.',
    'hero-btn1': 'View My Work', 'hero-btn2': 'Contact Me', 'hero-cv': 'Download CV (PDF)',
    'stat1': 'GPA', 'stat2': 'Projects', 'stat3': 'Certifications',
    'skills-tag': 'Skills', 'skills-title': 'Technical Expertise',
    'sk1-title': 'Mobile App Development', 'sk2-title': 'Web & Backend Development',
    'sk3-title': 'AI & Machine Learning', 'sk4-title': 'Database Management',
    'sk5-title': 'Programming Languages', 'sk6-title': 'Design',
    'soft-title': 'Soft Skills',
    'ss1':'Problem Solving','ss2':'Critical Thinking','ss3':'Remote Work',
    'ss4':'Time Management','ss5':'Team Collaboration','ss6':'Adaptability',
    'ss7':'Academic Research','ss8':'Self-Learning',
    'proj-tag': 'Projects', 'proj-title': 'Featured Work',
    'feat-badge': 'Graduation Project ⭐', 'mm-sub': 'Your Smart Companion for a Healthy Life',
    'mm-desc': 'An integrated platform combining Flutter & Laravel with Google Gemini GenAI to analyze health profiles and generate personalized diet plans instantly.',
    'mm-link': '🌐 View Project',
    'hn-title': 'Mohammed Al-Measar Yemeni Honey Store',
    'hn-desc': 'A fully integrated e-commerce platform for premium Yemeni honey with smart recommendations and payment gateway integration.',
    'hn-link': '🌐 View Project',
    'dn-desc': 'A clean, professional front-end interface for a dental clinic — Arabic landing page with no complex libraries.',
    'sn-title': 'My Smart Note', 'sn-desc': 'A prototype for a daily task management app with a productivity-boosting visual UI and dark/light mode.',
    'om-title': 'OrderMeals', 'om-desc': 'A desktop diet management app to filter and order meals by dietary requirements with order tracking.',
    'edu-tag': 'Education', 'edu-title': 'Education & Certifications',
    'edu-degree': 'B.Sc. in Information Technology',
    'edu-uni': 'Sana\'a University — Faculty of Computer Science',
    'edu-badge': 'First-Class Honors | GPA: 95%',
    'c1':'AI Intensive Training Course — Sana\'a University',
    'c2':'Advanced Laravel Framework Course — Sana\'a University',
    'c3':'Field Training Certificate — Sabafon Telecom',
    'c4':'Corporate Training Certificate — CAC Bank',
    'c5':'Corporate Training Certificate — Yemen Kuwait Bank',
    'c6':'HRMS Certification — Ebda\'a Soft',
    'c7':'Introduction to Cybersecurity — Cisco',
    'c8':'IT Management Diploma — Alison Academy',
    'con-tag': 'Contact', 'con-title': 'Got a project? Let\'s talk!',
    'con-email-label':'Email','con-phone-label':'Phone',
    'con-loc-label':'Location','con-loc':'Sana\'a, Yemen',
    'form-name-label':'Name','form-email-label':'Email','form-msg-label':'Message',
    'form-submit-btn':'Send Message 🚀',
    'footer-text': '© 2026 Nesmah Al-Measar — Built with ❤️ and a passion for code',
    'langBtn': 'ع', dir: 'ltr', lang: 'en'
  }
};

function toggleLang() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  const t = translations[currentLang];
  document.documentElement.dir = t.dir;
  document.documentElement.lang = t.lang;
  Object.entries(t).forEach(([id, val]) => {
    if (id === 'dir' || id === 'lang') return;
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
  document.querySelectorAll('.gh-text').forEach(el => {
    el.textContent = currentLang === 'ar' ? 'عرض الكود' : 'View Code';
  });
  // Reset typing
  titleIndex = 0; charIndex = 0; isDeleting = false;
}
