/* Nikah Platform — static click-through prototype. No real functionality. */
'use strict';

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const target = document.getElementById('screen-'+id);
  if(target){
    target.classList.add('active');
    const scroller = target.querySelector('.scroll-area');
    if(scroller) scroller.scrollTop = 0;
  }
}

document.addEventListener('click', e=>{
  const goEl = e.target.closest('[data-go]');
  if(goEl){ showScreen(goEl.dataset.go); return; }

  const navEl = e.target.closest('.proto-group button[data-screen]');
  if(navEl){ showScreen(navEl.dataset.screen); return; }

  const tabEl = e.target.closest('.tab[data-tab]');
  if(tabEl){
    const tabsWrap = tabEl.closest('.screen');
    tabsWrap.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    tabEl.classList.add('active');
    tabsWrap.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    const panel = tabsWrap.querySelector('#'+tabEl.dataset.tab);
    if(panel) panel.classList.add('active');
    return;
  }

  const pillEl = e.target.closest('.pill');
  if(pillEl && pillEl.closest('.pill-row')){
    const row = pillEl.closest('.pill-row');
    if(row.classList.contains('pill-row-single')){
      // single-select row (radio-like) — used where only one choice makes sense
      row.querySelectorAll('.pill').forEach(p=>p.classList.remove('pill-on'));
      pillEl.classList.add('pill-on');
    } else {
      // simple visual toggle, no real filtering logic
      pillEl.classList.toggle('pill-on');
    }
    if(row.id === 'registeras-pills'){
      const waliCard = document.getElementById('reg-form-wali-details');
      if(waliCard) waliCard.classList.toggle('hidden', pillEl.textContent.trim() !== 'Wali');
    }
    return;
  }

  const chipEl = e.target.closest('.chip');
  if(chipEl){
    const input = chipEl.closest('.screen').querySelector('.chat-input-row input');
    if(input) input.value = chipEl.textContent + '...';
    return;
  }

  const dismissEl = e.target.closest('.dismiss-x');
  if(dismissEl){ dismissEl.closest('.chat-banner').style.display='none'; return; }

  const deviceBtn = e.target.closest('.device-toggle');
  if(deviceBtn){
    document.querySelectorAll('.device-toggle').forEach(b=>b.classList.remove('active'));
    deviceBtn.classList.add('active');
    const frame = document.getElementById('device-frame');
    frame.classList.toggle('web', deviceBtn.dataset.device==='web');
    return;
  }
});
