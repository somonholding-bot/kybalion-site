(function(){var c=window.SITE_CONFIG;document.querySelectorAll('[data-brand]').forEach(function(e){e.textContent=c.BRAND});
document.querySelectorAll('[data-domain]').forEach(function(e){e.textContent=c.DOMAIN});
document.querySelectorAll('[data-email]').forEach(function(e){e.textContent=c.CONTACT_EMAIL||'';if(c.CONTACT_EMAIL)e.href='mailto:'+c.CONTACT_EMAIL});
var q=new URLSearchParams(location.search),utm={};['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){if(q.get(k))utm[k]=q.get(k)});
try{if(Object.keys(utm).length)sessionStorage.setItem('utm',JSON.stringify(utm))}catch(e){}
function tracking(){var u={};try{u=JSON.parse(sessionStorage.getItem('utm')||'{}')}catch(e){}
var hit=(c.CALL.numbers||[]).find(function(n){return Object.keys(n.match||{}).every(function(k){return u[k]===n.match[k]})});
return hit||(c.CALL.defaultNumber?{number:c.CALL.defaultNumber}:null)}
window.getTracking=tracking;
var t=c.CALL.enabled?tracking():null;
document.querySelectorAll('.callbtn').forEach(function(a){if(t&&t.number){a.href='tel:'+t.number;a.textContent='Call '+t.number;a.classList.add('on')}});var tl=document.getElementById('talk');if(tl&&t&&t.number)tl.hidden=false;
})();
