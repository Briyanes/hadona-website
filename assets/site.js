
(function(){
  var d=document;


  /* language toggle */
  var ID_DICT = {
    "Skip to content":"Lewati ke konten",
    "Work":"Karya","Capabilities":"Kapabilitas","Method":"Metode","Contact":"Kontak",
    "Start a project":"Mulai proyek","Lab":"Lab",
    "Independent performance studio · Jakarta":"Studio performance independen · Jakarta",
    "Booking Q1 2027 · 2 slots":"Slot Q1 2027 · tersisa 2",
    "We turn":"Kami ubah","attention":"perhatian","spend":"belanja","clicks":"klik",
    "into":"menjadi","revenue.":"pendapatan.",
    "Paid media, creative and measurement built as one system. We work with brands that already sell, and we judge ourselves on the number in your bank account, not the one in the dashboard.":"Media berbayar, kreatif, dan pengukuran sebagai satu sistem. Kami bekerja dengan brand yang sudah berjualan, dan menilai diri dari angka di rekening Anda, bukan angka di dashboard.",
    "See the work":"Lihat karya","brands managed":"brand dikelola","platform partners":"partner platform",
    "live reporting":"laporan real-time",
    "Signal / spend vs revenue, illustrative":"Sinyal / belanja vs pendapatan, ilustratif",
    "Read the shape, not the numbers":"Baca polanya, bukan angkanya",
    "Revenue influenced":"Pendapatan terpengaruh","Media spend":"Belanja media",
    "Illustrative pattern only. Client results are published with approval.":"Pola ilustratif. Hasil klien dipublikasikan hanya dengan persetujuan.",
    "Selected work":"Karya pilihan","Three accounts.":"Tiga akun.","Three different problems.":"Tiga masalah berbeda.",
    "Swipe the rail. Each card opens with the metric the client actually cares about.":"Geser rel ini. Setiap kartu dibuka dengan metrik yang benar-benar dipedulikan klien.",
    "03 cases · 2024 - 2026 · sample metrics":"03 kasus · 2024 - 2026 · metrik contoh",
    "F&B · sample metric":"F&B · metrik contoh","Travel · sample metric":"Travel · metrik contoh","Clinic · sample metric":"Klinik · metrik contoh",
    "Meta ads · Creative · 5 months":"Meta ads · Kreatif · 5 bulan",
    "Rebuilt a single-ad-set account into three campaigns with a monthly creative supply.":"Membangun ulang akun satu ad set menjadi tiga kampanye dengan pasokan kreatif bulanan.",
    "Meta + Google · Click to WhatsApp":"Meta + Google · Klik ke WhatsApp",
    "Seasonal pacing and a stricter definition of a qualified WhatsApp lead.":"Penjadwalan musiman dan definisi lead WhatsApp berkualitas yang lebih ketat.",
    "Beauty clinic group":"Grup klinik kecantikan",
    "Full service · Compliance · 6 months":"Layanan penuh · Kepatuhan · 6 bulan",
    "Whitelisted accounts and compliant creative that held through restriction season.":"Akun whitelisted dan kreatif patuh aturan yang bertahan saat musim pembatasan.",
    "Scroll horizontally · figures are sample formats until approved":"Geser horizontal · angka adalah format contoh sampai disetujui",
    "A small team":"Tim kecil","with a wide reach.":"dengan jangkauan luas.",
    "Four disciplines, one account lead, no handoff between vendors.":"Empat disiplin, satu lead akun, tanpa estafet antar vendor.",
    "01 / Paid media":"01 / Media berbayar","Daily buying, not monthly guessing.":"Belanja harian, bukan tebak-tebakan bulanan.",
    "Meta, Google and TikTok, with one media buyer owning each account and touching budget every working day.":"Meta, Google, dan TikTok, dengan satu media buyer memiliki tiap akun dan menyentuh budget setiap hari kerja.",
    "Account rebuild":"Rebuild akun","Whitelisted access":"Akses whitelisted","Budget pacing":"Pengaturan budget","Scaling rules":"Aturan scaling",
    "02 / Creative":"02 / Kreatif","Made for the feed.":"Dibuat untuk feed.",
    "Angles, hooks and edits refreshed monthly, judged on cost per result.":"Angle, hook, dan editing diperbarui bulanan, dinilai dari biaya per hasil.",
    "Static & video":"Statis & video",
    "03 / Measurement":"03 / Pengukuran","One dashboard.":"Satu dashboard.",
    "Spend, revenue, ROAS and CPA in one live view, checked before scaling.":"Belanja, pendapatan, ROAS, dan CPA dalam satu tampilan live, dicek sebelum scaling.",
    "Weekly review":"Review mingguan",
    "04 / Strategy":"04 / Strategi","Offer first.":"Penawaran dulu.",
    "Margin, angle and audience decided before a single rupiah moves.":"Margin, angle, dan audiens ditentukan sebelum satu rupiah bergerak.",
    "Channel mix":"Bauran kanal","Roadmap":"Peta jalan",
    "05 / Reporting SLA":"05 / SLA pelaporan","You always know what changed.":"Anda selalu tahu apa yang berubah.",
    "Daily optimization log, weekly review, monthly strategy. Every decision is written down with the reason attached, so the next month starts from evidence instead of memory.":"Log optimasi harian, review mingguan, strategi bulanan. Setiap keputusan dicatat dengan alasannya, jadi bulan berikutnya mulai dari bukti, bukan ingatan.",
    "Four moves, on repeat.":"Empat langkah, diulang.",
    "The same loop every month. Boring on purpose, because boring is what compounds.":"Siklus yang sama tiap bulan. Membosankan dengan sengaja, karena yang membosankan itulah yang bertumbuh.",
    "01 — 04 · monthly cycle":"01 — 04 · siklus bulanan",
    "Audit":"Audit",
    "Accounts, tracking and creative torn down. A written read on what leaks and why.":"Akun, tracking, dan kreatif dibedah. Bacaan tertulis soal apa yang bocor dan kenapa.",
    "Output: gap list + baseline":"Output: daftar celah + baseline",
    "Plan":"Rencana",
    "Offer, angle, audience and budget agreed before anything goes live.":"Penawaran, angle, audiens, dan budget disepakati sebelum apa pun tayang.",
    "Output: one-page plan":"Output: rencana satu halaman",
    "Run":"Jalankan",
    "Launch in clean structure. Daily budget calls, weekly creative refresh.":"Tayang dengan struktur bersih. Keputusan budget harian, penyegaran kreatif mingguan.",
    "Output: live account + log":"Output: akun live + log",
    "Scale":"Skalakan",
    "Winners funded, losers cut. The next month starts from evidence.":"Yang menang dapat budget, yang kalah dipotong. Bulan berikutnya mulai dari bukti.",
    "Output: scaled spend, protected margin":"Output: belanja naik, margin terjaga",
    "The lab":"Lab",
    "Small team. Senior hands. No relay.":"Tim kecil. Tangan senior. Tanpa estafet.",
    "Media buyers, creatives and analysts sit in the same room in Jakarta. The person who sees the data is the person who changes the campaign, which is why decisions land the same day instead of next week.":"Media buyer, kreatif, dan analis duduk di ruangan yang sama di Jakarta. Orang yang melihat data adalah orang yang mengubah kampanye, karena itu keputusan mendarat di hari yang sama, bukan minggu depan.",
    "Brands under management":"Brand dikelola","Official platform partners":"Partner platform resmi",
    "1 day":"1 hari","Reply time, business days":"Waktu balas, hari kerja",
    "Overlap EU mornings, US evenings":"Overlap pagi Eropa, malam US",
    "“Replace this with one real sentence from a client about what changed in their numbers.”":"“Ganti dengan satu kalimat nyata dari klien tentang apa yang berubah pada angka mereka.”",
    "Client name · role, company · approval required":"Nama klien · jabatan, perusahaan · butuh persetujuan",
    "Let's look at your":"Mari lihat","numbers.":"angka Anda.",
    "Send the brief. A strategist reads it, checks the account if you share access, and comes back with what we would change first. If we are not the right fit, we say so.":"Kirim brief. Seorang strategist membacanya, mengecek akun bila Anda memberi akses, lalu kembali dengan apa yang akan kami ubah lebih dulu. Kalau kami bukan pilihan tepat, kami bilang.",
    "Jakarta · GMT+7 · English / Indonesian":"Jakarta · GMT+7 · Inggris / Indonesia",
    "Reply within one business day":"Dibalas dalam satu hari kerja",
    "Name":"Nama","Tell us your name.":"Mohon isi nama Anda.",
    "Work email":"Email kerja","That email does not look right.":"Email ini sepertinya belum benar.",
    "Company or website":"Perusahaan atau website","Monthly ad budget":"Budget iklan bulanan",
    "Select a range":"Pilih rentang","Not running ads yet":"Belum beriklan",
    "Under $1,000":"Di bawah $1.000","$1,000 to $5,000":"$1.000 sampai $5.000",
    "$5,000 to $20,000":"$5.000 sampai $20.000","$20,000 and up":"$20.000 ke atas",
    "Pick a range.":"Pilih rentang.","What should we look at?":"Apa yang perlu kami lihat?",
    "Two or three sentences are enough.":"Dua atau tiga kalimat cukup.","Website":"Website",
    "I agree to Hadona processing these details to answer this enquiry, as described in the":"Saya setuju Hadona memproses data ini untuk menjawab pertanyaan, sesuai",
    "Privacy Policy":"Kebijakan Privasi","Send the brief":"Kirim brief",
    "Demo preview · production posts to /api/contact via Resend":"Pratinjau demo · produksi mengirim ke /api/contact via Resend",
    "Brief received.":"Brief diterima.",
    "A strategist replies within one business day, Jakarta time.":"Strategist membalas dalam satu hari kerja, waktu Jakarta.",
    "Independent performance studio. Jakarta, working with brands worldwide.":"Studio performance independen. Jakarta, bekerja dengan brand di seluruh dunia.",
    "Navigate":"Navigasi","Services":"Layanan","Paid media":"Media berbayar","Creative":"Kreatif",
    "Measurement":"Pengukuran","Strategy":"Strategi","Legal":"Legal","Terms":"Syarat","Privacy":"Privasi",
    "2 slots · Q1 2027":"2 slot · Q1 2027",
    "What happens next":"Apa yang terjadi berikutnya",
    "You send the brief":"Anda kirim brief",
    "We read it and check the account":"Kami baca dan cek akunnya",
    "You get the first fixes, free":"Anda dapat perbaikan pertama, gratis",
    "1 business day":"1 hari kerja",
    "No spam. No sales sequence.":"Tanpa spam. Tanpa urutan sales.",
    "Request your audit":"Minta audit Anda",
    "Five fields. Two minutes.":"Lima kolom. Dua menit.",
    "We reply with the first three fixes":"Kami balas dengan tiga perbaikan pertama",
    "You decide if the full audit is worth it":"Anda putuskan apakah audit penuh layak"
  };
  var ID_PLACEHOLDER = {
    "Where the ads are now, what is stalling, and the number you want six months from now.":"Di mana iklan sekarang, apa yang mandek, dan angka yang Anda mau enam bulan dari sekarang."
  };
  var ID_BUDGET={};

  /* inner pages strings */
  var ID_EXTRA = {
    "All work":"Semua karya","Filter":"Filter","All":"Semua","F&B":"F&B","Travel":"Travel","Clinic":"Klinik",
    "Accounts we run, and what changed.":"Akun yang kami jalankan, dan apa yang berubah.",
    "Live accounts":"Akun aktif","Sectors":"Sektor","Reporting":"Pelaporan","Weekly + monthly":"Mingguan + bulanan",
    "The challenge":"Tantangan","What we changed":"Apa yang kami ubah","Results":"Hasil",
    "What we would do next":"Apa yang akan kami lakukan berikutnya","Next case":"Kasus berikutnya","Back to":"Kembali ke",
    "Request the case study":"Minta studi kasus","Case study":"Studi kasus",
    "Moone Bakery & Caffe":"Moone Bakery & Caffe","Eja Tour & Travel":"Eja Tour & Travel",
    "Everything the ads need. Nothing they don't.":"Semua yang iklan butuhkan. Tidak lebih.",
    "How it runs":"Cara kerjanya","What we need from you":"Yang kami butuhkan dari Anda","The honest list":"Daftar jujurnya",
    "Access":"Akses","Creative inputs":"Input kreatif","Budget":"Budget","Patience for two weeks":"Sabar dua minggu",
    "Small on purpose.":"Kecil dengan sengaja.","How we work":"Cara kami bekerja","Who does what":"Siapa mengerjakan apa",
    "Strategy lead":"Lead strategi","Owns the plan":"Memegang rencana","Media buyer":"Media buyer","Owns the account":"Memegang akun",
    "Creative lead":"Lead kreatif","Owns the assets":"Memegang aset","Analyst":"Analis","Owns the numbers":"Memegang angka",
    "Tell us what isn't working.":"Ceritakan apa yang tidak berjalan.","Direct lines":"Jalur langsung",
    "Page not found":"Halaman tidak ditemukan","Off brief.":"Di luar brief.",
    "That page does not exist. It may have moved, or the link was typed wrong. The work is still where you left it.":"Halaman itu tidak ada. Mungkin sudah pindah, atau tautannya salah ketik. Karyanya masih di tempat.",
    "Back home":"Kembali ke awal",
    "Last updated 26 October 2026":"Terakhir diperbarui 26 Oktober 2026","On this page":"Di halaman ini"
  };
  var ID_MORE = {
    "One brief, one strategist, one honest read on your ads. If we are not the right team for it, we will say that in the reply.":"Satu brief, satu strategist, satu bacaan jujur soal iklan Anda. Kalau kami bukan tim yang tepat, kami akan bilang di balasan.",
    "English · Indonesian":"Inggris · Indonesia",
    "Reply time":"Waktu balas",
    "Timezone":"Zona waktu",
    "Languages":"Bahasa",
    "Home":"Beranda",
    "Channels":"Kanal",
    "Cadence":"Ritme",
    "Reporting":"Pelaporan",
    "Founded":"Berdiri",
    "Team":"Tim",
    "Capacity":"Kapasitas",
    "Based":"Basis",
    "Working hours":"Jam kerja",
    "Invoicing":"Invoice",
    "Live accounts":"Akun aktif",
    "Sectors":"Sektor",
    "Weekly + monthly":"Mingguan + bulanan",
    "Filter":"Filter",
    "All work":"Semua karya",
    "The honest list":"Daftar jujurnya",
    "No account-manager relay":"Tanpa estafet account manager",
  };
  for (var k2 in ID_MORE) { if(!ID_DICT[k2]) ID_DICT[k2]=ID_MORE[k2]; }
  for (var k in ID_EXTRA) { if(!ID_DICT[k]) ID_DICT[k]=ID_EXTRA[k]; }

  var langPairs=[], langRoot=d.documentElement, langBtn=d.getElementById('langToggle'), langCode=d.getElementById('langCode');
  function collectText(){
    var w=d.createTreeWalker(d.body, NodeFilter.SHOW_TEXT, {acceptNode:function(n){
      if(!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      var p=n.parentElement;
      if(!p || p.closest('script,style')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    var n;
    while((n=w.nextNode())){
      var raw=n.nodeValue, key=raw.trim().replace(/\s+/g,' ');
      if(ID_DICT[key]) langPairs.push({node:n, raw:raw, key:key});
    }
    d.querySelectorAll('option').forEach(function(o){
      var t=o.textContent.trim().replace(/\s+/g,' ');
      if(ID_DICT[t] && o.value){ langPairs.push({opt:o, key:t, en:t}); }
    });
    d.querySelectorAll('[placeholder]').forEach(function(el){
      var t=el.getAttribute('placeholder');
      if(ID_PLACEHOLDER[t]) langPairs.push({el:el, ph:t, key:t});
    });
  }
  function setLang(l){
    langRoot.setAttribute('lang', l==='id'?'id':'en');
    langPairs.forEach(function(o){
      if(o.node){ o.node.nodeValue = l==='id' ? o.raw.replace(o.key, ID_DICT[o.key]) : o.raw; }
      else if(o.opt){ if(l==='id'){ if(!ID_BUDGET[o.en]) ID_BUDGET[o.en]=o.opt.value; o.opt.value=ID_DICT[o.key]; o.opt.textContent=ID_DICT[o.key]; } else { o.opt.value=ID_BUDGET[o.en]||o.opt.value; o.opt.textContent=o.en; } }
      else { o.el.setAttribute('placeholder', l==='id' ? ID_PLACEHOLDER[o.ph] : o.ph); }
    });
    langCode.textContent = l==='id' ? 'EN' : 'ID';
    langBtn.setAttribute('aria-label', l==='id' ? 'Switch to English' : 'Switch to Indonesian');
    try{ localStorage.setItem('hadona-lang', l); }catch(e){}
  }
  collectText();
  var savedLang='en';
  try{
    var lp=new URLSearchParams(location.search).get('lang');
    var ls=localStorage.getItem('hadona-lang');
    savedLang = lp==='id'||lp==='en' ? lp : (ls==='id'||ls==='en' ? ls : 'en');
  }catch(e){}
  setLang(savedLang);
  langBtn.addEventListener('click', function(){ setLang(langRoot.getAttribute('lang')==='id'?'en':'id'); });

  /* theme */
  var rootEl=d.documentElement, tBtn=d.getElementById('themeToggle');
  function applyTheme(t){
    rootEl.setAttribute('data-theme',t);
    tBtn.setAttribute('aria-pressed',t==='dark'?'true':'false');
    tBtn.setAttribute('aria-label',t==='dark'?'Switch to light theme':'Switch to dark theme');
    var m=d.querySelector('meta[name="theme-color"]');
    if(m) m.setAttribute('content',t==='dark'?'#05060B':'#F7F6F2');
  }
  applyTheme(rootEl.getAttribute('data-theme')||'light');
  tBtn.addEventListener('click',function(){
    var next=rootEl.getAttribute('data-theme')==='dark'?'light':'dark';
    applyTheme(next);
    try{localStorage.setItem('hadona-theme',next);}catch(e){}
  });

  /* menu */
  var ov=d.getElementById('ov'),mb=d.getElementById('menuBtn'),mc=d.getElementById('ovClose');
  function setMenu(open){
    ov.classList.toggle('open',open);
    ov.setAttribute('aria-hidden',open?'false':'true');
    mb.setAttribute('aria-expanded',open?'true':'false');
    d.body.style.overflow=open?'hidden':'';
    if(open) mc.focus();
  }
  mb.addEventListener('click',function(){setMenu(true);});
  mc.addEventListener('click',function(){setMenu(false);mb.focus();});
  Array.prototype.forEach.call(ov.querySelectorAll('a'),function(a){a.addEventListener('click',function(){setMenu(false);});});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&ov.classList.contains('open')){setMenu(false);mb.focus();}});

  /* cursor glow (pointer only, respects reduced motion) */
  var glow=d.getElementById('glow');
  if(glow && window.matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches){
    d.querySelector('.hero').addEventListener('pointermove',function(e){
      var r=e.currentTarget.getBoundingClientRect();
      glow.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      glow.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  }

  /* sticky cta */
  var mcta=d.getElementById('mcta');
  function onScroll(){mcta.classList.toggle('show',window.scrollY>620);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  /* reveal */
  d.documentElement.classList.add('js');
  var rv=d.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    Array.prototype.forEach.call(rv,function(el){io.observe(el);});
  } else { Array.prototype.forEach.call(rv,function(el){el.classList.add('in');}); }
  setTimeout(function(){Array.prototype.forEach.call(d.querySelectorAll('.rv:not(.in)'),function(el){if(el.getBoundingClientRect().top<window.innerHeight*1.1)el.classList.add('in');});},900);

  /* form */
  var form=d.getElementById('leadForm');
  function err(id,on){d.getElementById(id).classList.toggle('show',on);}
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true;
    function check(el,id,valid){err(id,!valid);if(!valid&&ok){el.focus();ok=false;}}
    check(form.name,'e-name',form.name.value.trim().length>1);
    check(form.email,'e-email',/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.value.trim()));
    check(form.budget,'e-budget',form.budget.value!=='');
    check(form.message,'e-msg',form.message.value.trim().length>9);
    if(!form.consent.checked){ok=false;}
    if(!ok){return;}
    var btn=d.getElementById('submitBtn');
    btn.disabled=true;btn.textContent='Sending...';
    setTimeout(function(){form.style.display='none';d.getElementById('okState').classList.add('show');},600);
  });
  ['name','email','budget','message'].forEach(function(n){
    form[n].addEventListener('input',function(){
      var map={name:'e-name',email:'e-email',budget:'e-budget',message:'e-msg'};
      d.getElementById(map[n]).classList.remove('show');
    });
  });
})();

  /* client logos: hydrate from synced content */
  (function(){
    var d=document;
    var USE_SYNCED=false; // set true after dashboard logo assets are normalized
    var wall=d.querySelector('.logo-wall');
    if(!USE_SYNCED || !wall || !window.fetch) return;
    fetch('content/clients.json', {cache:'no-store'})
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(data){
        if(!data || !data.items || !data.items.length) return;
        var items=data.items.slice(0,24);
        wall.innerHTML=items.map(function(c){
          var name=String(c.name||'Client').replace(/[<>&"]/g,'');
          var url=String(c.logo_url||'').replace(/[<>"]/g,'');
          if(!url) return '';
          var tone=c.tone==='light'?' light':'';
          return '<div class="lg'+tone+'"><img src="'+url+'" alt="'+name+'" loading="lazy" decoding="async"></div>';
        }).join('');
        var note=d.querySelector('.client-head .small');
        if(note) note.textContent='Synced from dashboard · '+items.length+' active clients · logos used with permission.';
      })
      .catch(function(){});
  })();
