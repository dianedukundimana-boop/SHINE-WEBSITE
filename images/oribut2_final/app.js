document.addEventListener('DOMContentLoaded',()=>{
  const header=document.getElementById('site-header');
  if(header){window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>8));}
  const targets=document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');o.unobserve(e.target)}}),{threshold:.12});targets.forEach(t=>o.observe(t));}else targets.forEach(t=>t.classList.add('in-view'));

  const cards=[...document.querySelectorAll('[data-product]')];
  const buttons=[...document.querySelectorAll('[data-smart-filter]')];
  const search=document.getElementById('smartProductSearch');
  const empty=document.getElementById('smartNoProducts');
  let active='all';
  function filter(){let q=(search?.value||'').toLowerCase().trim(), count=0;cards.forEach(c=>{let ok=(active==='all'||c.dataset.category===active)&&(!q||c.dataset.name.includes(q));c.style.display=ok?'':'none';if(ok)count++});if(empty)empty.hidden=count>0}
  buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');active=b.dataset.smartFilter;filter()}));
  search?.addEventListener('input',filter); filter();

  const params=new URLSearchParams(location.search), p=params.get('product'), select=document.getElementById('orderProduct');
  if(p&&select){[...select.options].forEach(o=>{if(o.text===p)select.value=p})}
  document.getElementById('orderForm')?.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('orderName').value,phone=document.getElementById('orderPhone').value,prod=document.getElementById('orderProduct').value,qty=document.getElementById('orderQty').value,note=document.getElementById('orderNote').value;const msg=`Hello Oribut, I would like to order:%0A%0AProduct: ${encodeURIComponent(prod)}%0AQuantity: ${encodeURIComponent(qty)}%0ACustomer: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ANote: ${encodeURIComponent(note)}`;window.open('https://wa.me/250783456891?text='+msg,'_blank')});
});
function handleContactForm(e){e.preventDefault();const n=document.getElementById('contactName').value,email=document.getElementById('contactEmail').value,t=document.getElementById('contactTopic').value,m=document.getElementById('contactMessage').value;const subject=encodeURIComponent('Oribut enquiry - '+t);const body=encodeURIComponent(`Name: ${n}\nEmail: ${email}\nTopic: ${t}\n\n${m}`);window.location.href=`mailto:oributcoltd@gmail.com?subject=${subject}&body=${body}`;document.getElementById('contactSuccess').hidden=false;return false}
