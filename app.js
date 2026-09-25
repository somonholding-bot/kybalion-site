(function(){
var C=window.SITE_CONFIG,$=function(s){return document.querySelector(s)};
$('#yr').textContent=new Date().getFullYear();
var data={zip:'',insured:'',year:'',make:'',model:'',age:'',timing:'',name:'',phone:'',email:''},step=0;
var steps=['ZIP code','Current coverage','Your vehicle','Driver','Timing','Contact','Review'];
function consentReady(){var k=C.CONSENT;return !!(k.VERSION&&k.TEXT&&k.BUYER_DISCLOSURE&&C.AUTHORIZED_PARTNERS.length)}
function utm(){try{return JSON.parse(sessionStorage.getItem('utm')||'{}')}catch(e){return{}}}
function el(h){var d=document.createElement('div');d.innerHTML=h;return d}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function opts(name,list,cb){return '<div class="opts">'+list.map(function(o){return '<button type="button" class="opt" data-v="'+esc(o[0])+'">'+esc(o[1])+'</button>'}).join('')+'</div>'}
function years(){var y=new Date().getFullYear()+1,h='<option value="">Select year</option>';for(;y>=1995;y--)h+='<option>'+y+'</option>';return h}
function render(){
 $('#stepname').textContent=steps[step];$('#stepcount').textContent='Step '+(step+1)+' of '+steps.length;$('#bar').style.width=((step+1)/steps.length*100)+'%';
 var b=$('#stepbody'),h='';
 if(step===0)h='<h2 style="margin-top:0">Where do you live?</h2><div class="field"><input id="f_zip" inputmode="numeric" maxlength="5" value="'+esc(data.zip)+'"><div class="err" id="e"></div></div><button class="cta" id="next">Continue</button>';
 if(step===1)h='<h2 style="margin-top:0">Are you currently insured?</h2>'+opts('insured',[['insured','Yes'],['uninsured','No']]);
 if(step===2)h='<h2 style="margin-top:0">Tell us about your vehicle</h2><div class="field"><label>Year</label><select id="f_year">'+years()+'</select></div><div class="g2"><div class="field"><label>Make</label><input id="f_make" value="'+esc(data.make)+'" placeholder="e.g. Toyota"></div><div class="field"><label>Model</label><input id="f_model" value="'+esc(data.model)+'" placeholder="e.g. Camry"></div></div><div class="err" id="e"></div><button class="cta" id="next">Continue</button>';
 if(step===3)h='<h2 style="margin-top:0">Primary driver age</h2>'+opts('age',[['<25','Under 25'],['25-34','25 to 34'],['35-49','35 to 49'],['50-64','50 to 64'],['65+','65 or older']]);
 if(step===4)h='<h2 style="margin-top:0">When do you need coverage?</h2>'+opts('timing',[['now','As soon as possible'],['within_7_days','Within 7 days'],['within_30_days','Within 30 days'],['researching','Just researching']]);
 if(step===5)h='<h2 style="margin-top:0">How can professionals reach you?</h2><div class="field"><label>Full name</label><input id="f_name" autocomplete="name" value="'+esc(data.name)+'"></div><div class="field"><label>Mobile phone</label><input id="f_phone" type="tel" autocomplete="tel" inputmode="tel" value="'+esc(data.phone)+'"></div><div class="field"><label>Email</label><input id="f_email" type="email" autocomplete="email" value="'+esc(data.email)+'"></div><div class="err" id="e"></div><button class="cta" id="next">Continue</button>';
 if(step===6){var k=C.CONSENT;h='<h2 style="margin-top:0">Review and submit</h2><p class="fine" style="margin-top:0">ZIP '+esc(data.zip)+' · '+esc(data.year)+' '+esc(data.make)+' '+esc(data.model)+'</p>';
  if(consentReady())h+='<label class="consent"><input type="checkbox" id="f_consent"><span>'+k.TEXT+'</span></label><p class="fine">'+k.BUYER_DISCLOSURE+'</p><div class="err" id="e"></div><button class="cta" id="submit" style="width:100%">Submit</button>';
  else h+='<div class="notice"><strong>Preview.</strong> This form is not accepting requests yet, and nothing you enter is sent anywhere.</div><button class="cta" id="submit" style="width:100%;margin-top:14px" disabled>Submit unavailable in preview</button>';
  var tk=(C.CALL.enabled&&window.getTracking)?getTracking():null;if(tk&&tk.number)h+='<p class="fine">Prefer to talk? <a class="callbtn on" href="tel:'+esc(tk.number)+'">'+esc(tk.number)+'</a></p>'}
 if(step>0&&step<7)h+='<div><button class="ghost" id="back" type="button">&larr; Back</button></div>';
 b.innerHTML=h;window.scrollTo({top:$('#flow').offsetTop-70,behavior:'smooth'});
 if(step===2&&data.year)$('#f_year').value=data.year;
 b.querySelectorAll('.opt').forEach(function(o){o.onclick=function(){var key=step===1?'insured':step===3?'age':'timing';data[key]=o.dataset.v;step++;render()}});
 if($('#back'))$('#back').onclick=function(){step--;render()};
 if($('#next'))$('#next').onclick=next;
 if($('#submit')&&!$('#submit').disabled)$('#submit').onclick=submit;
}
function err(m){$('#e').textContent=m;return false}
function next(){
 if(step===0){var z=$('#f_zip').value.trim();if(!/^\d{5}$/.test(z))return err('Enter a valid 5-digit ZIP code.');data.zip=z}
 if(step===2){data.year=$('#f_year').value;data.make=$('#f_make').value.trim();data.model=$('#f_model').value.trim();if(!data.year||!data.make||!data.model)return err('Please complete year, make and model.')}
 if(step===5){data.name=$('#f_name').value.trim();data.phone=$('#f_phone').value.replace(/\D/g,'').replace(/^1(?=\d{10}$)/,'');data.email=$('#f_email').value.trim();
  if(data.name.length<2)return err('Enter your full name.');if(!/^\d{10}$/.test(data.phone))return err('Enter a valid 10-digit phone number.');if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))return err('Enter a valid email address.')}
 step++;render()}
function submit(){
 if(!$('#f_consent').checked)return err('Please confirm your consent to continue.');
 var rec={zip:data.zip,insurance_status:data.insured,vehicle:{year:+data.year,make:data.make,model:data.model},driver:{age_range:data.age},coverage_timing:data.timing,full_name:data.name,phone:data.phone,email:data.email,
  source:utm().utm_source||'direct',campaign:utm().utm_campaign,utm:utm(),consent:{version:C.CONSENT.VERSION,text_shown:C.CONSENT.TEXT,action:'checkbox',timestamp:new Date().toISOString(),ip:'server',url:location.href}};
 if(C.MODE!=='live'||!C.ENDPOINT){try{localStorage.setItem('kybalion_test_lead',JSON.stringify(rec))}catch(e){}return done('Test mode: saved locally on this device only. Nothing was sent.')}
 fetch(C.ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(rec)}).then(function(r){if(!r.ok)throw 0;done('Thank you. A licensed insurance professional may contact you shortly.')}).catch(function(){err('Something went wrong. Please try again.')})}
function done(m){$('#stepbody').innerHTML='<h2 style="margin-top:0">All set</h2><p>'+esc(m)+'</p>';$('#bar').style.width='100%'}
$('#zipform').addEventListener('submit',function(e){e.preventDefault();var z=$('#zip').value.trim();if(!/^\d{5}$/.test(z)){$('#ziperr').textContent='Enter a valid 5-digit ZIP code.';return}
 data.zip=z;$('#ziperr').textContent='';$('#flow').classList.add('open');step=1;render()});
if(C.SHOW_APPROVED_PARTNERS&&C.AUTHORIZED_PARTNERS.length){$('#partners').classList.add('on');$('#partnerlist').textContent=C.AUTHORIZED_PARTNERS.join(' · ')}
})();
