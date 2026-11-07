(function(){
var Q=[
{id:'type',t:'Hvilken slags bolig lejer du?',o:[['priv','Lejlighed hos en privat udlejer'],['ejer','Ejer- eller andelslejlighed, som ejeren lejer ud'],['vaer','Værelse'],['alm','Almen bolig (boligforening)']]},
{id:'aar',t:'Hvornår blev bygningen taget i brug?',o:[['f92','Før 1992 (de fleste ældre ejendomme)'],['e92','I 1992 eller senere (nybyggeri)'],['vi','Ved ikke']],h:'Står ofte i lejekontrakten eller på BBR-meddelelsen (bbr.dk).'},
{id:'str',t:'Hvor mange lejligheder er der i ejendommen?',o:[['lille','1-6 lejligheder'],['stor','7 eller flere'],['vi','Ved ikke']]},
{id:'mod',t:'Var lejligheden lige blevet totalrenoveret, da du flyttede ind (fx nyt køkken og nyt bad)?',o:[['ja','Ja'],['nej','Nej'],['vi','Ved ikke']]},
{id:'leje',t:'Hvad betaler du i husleje om måneden, uden varme, vand og el?',n:'kr pr. måned'},
{id:'m2',t:'Hvor mange kvadratmeter er boligen?',n:'m²'},
{id:'forh',t:'Har du fået varsel om en huslejestigning inden for de sidste 6 uger?',o:[['ja','Ja'],['nej','Nej']]},
{id:'bor',t:'Bor du der stadig?',o:[['ja','Ja'],['u1','Nej, flyttet for under 1 år siden'],['o1','Nej, flyttet for over 1 år siden']]},
{id:'kom',t:'Hvilken kommune ligger boligen i?',x:'fx København'}
];
var f=document.getElementById('t'),h='';
Q.forEach(function(q,i){h+='<div class="q"><p>'+(i+1)+'. '+q.t+'</p>';
if(q.o){h+='<div class="opts">';q.o.forEach(function(o){h+='<label><input type="radio" name="'+q.id+'" value="'+o[0]+'"> <span>'+o[1]+'</span></label>'});h+='</div>'}
else if(q.n){h+='<label class="field"><input type="number" inputmode="numeric" min="0" name="'+q.id+'" placeholder="'+q.n+'"></label>'}
else{h+='<label class="field"><input type="text" name="'+q.id+'" placeholder="'+q.x+'"></label>'}
if(q.h)h+='<p class="small">'+q.h+'</p>';h+='</div>'});
f.innerHTML=h;
function v(n){var e=f.querySelector('[name="'+n+'"]:checked')||f.querySelector('input[type=number][name="'+n+'"],input[type=text][name="'+n+'"]');return e?e.value:''}
function kr(x){return Math.round(x).toLocaleString('da-DK')}
document.getElementById('go').addEventListener('click',function(){
var a={};Q.forEach(function(q){a[q.id]=v(q.id)});
var miss=Q.filter(function(q){return !a[q.id]});
var r=document.getElementById('res');r.hidden=false;
if(miss.length){r.className='result bad';r.innerHTML='<p>Svar på alle spørgsmål først. Du mangler nr. '+miss.map(function(q){return Q.indexOf(q)+1}).join(', ')+'.</p>';r.scrollIntoView({behavior:'smooth',block:'center'});return}
var leje=+a.leje,m2=+a.m2,pm=m2>0?leje*12/m2:0,lvl=1,why=[],target=0;
if(a.type==='alm'){lvl=0;why.push('Almene boliger har deres egne regler. Klager går typisk til beboerklagenævnet eller boligorganisationen, og det dækker klagepakken ikke.')}
else if(a.bor==='o1'){lvl=0;why.push('Er du flyttet for over 1 år siden, er det som udgangspunkt for sent at rejse kravet for huslejenævnet.')}
else{
if(a.aar==='e92'){lvl=1;why.push('Boliger i ejendomme taget i brug efter 1991 har som regel fri leje. Så kan lejen kun ændres, hvis den er åbenlyst urimelig.')}
else{
var big=a.str==='stor'&&a.type==='priv';
if(big&&a.mod!=='ja'){target=950;if(pm>1100){lvl=3}else if(pm>850){lvl=2}
why.push('I ældre ejendomme med 7 eller flere lejligheder skal lejen som udgangspunkt beregnes ud fra udlejers faktiske udgifter (omkostningsbestemt leje). Det giver ofte en lavere leje end markedsprisen.')}
else if(big&&a.mod==='ja'){target=1500;if(pm>1800){lvl=2}else{lvl=1}
why.push('Udlejer må kun tage markedsleje for en moderniseret lejlighed, hvis en række krav er opfyldt, bl.a. at der er brugt et minimumsbeløb på forbedringer. Udlejer skal kunne dokumentere det. Er kravene ikke opfyldt, kan nævnet sætte lejen ned.')}
else{target=1050;if(pm>1250){lvl=3}else if(pm>950){lvl=2}
why.push('I ejendomme med 6 eller færre lejligheder må lejen ikke være væsentligt højere end en tilsvarende omkostningsbestemt leje. Nævnet kan sætte den ned, hvis den er mere end ca. 10 % for høj.')}
if(a.aar==='vi'||a.str==='vi'||a.mod==='vi')why.push('Du svarede "ved ikke" på et spørgsmål. Find svaret i din lejekontrakt eller på bbr.dk for at få et mere sikkert billede.');
}
if(a.forh==='ja'){lvl=Math.max(lvl,2);why.push('Du har fået varsel om en lejestigning. Du har kun 6 uger fra varslingen til at gøre skriftlig indsigelse. Gør det nu.')}
if(a.bor==='u1')why.push('Du er flyttet. Kravet skal være rejst for huslejenævnet inden 1 år fra fraflytningen.');
}
var lab=['Huslejetjek dækker ikke din bolig','Lav chance','Mulig chance','Høj chance'][lvl];
var out='<div class="meter l'+lvl+'"><i></i><i></i><i></i></div><h3>'+lab+'</h3>';
if(pm)out+='<p>Din leje svarer til <b>'+kr(pm)+' kr pr. m² om året</b> (uden forbrug).</p>';
out+='<ul class="list">'+why.map(function(w){return '<li>'+w+'</li>'}).join('')+'</ul>';
if(lvl>=2&&target&&pm>target){var save=(pm-target)*m2;out+='<p><b>Regneeksempel:</b> Hvis nævnet satte lejen ned til ca. '+kr(target)+' kr pr. m², ville du spare ca. <b>'+kr(save)+' kr om året</b>, og du kunne kræve det for meget betalte tilbage. Det er kun et eksempel. Nævnet fastsætter selv lejen ud fra din konkrete bolig.</p>'}
if(lvl>=2)out+='<div class="row"><a class="btn" href="#pris">Få din færdige klage for 499 kr</a></div>';
else if(lvl===1)out+='<p class="small">Chancen ser lav ud ud fra dine svar. Vi anbefaler ikke, at du køber klagepakken, medmindre du har andre grunde til at tro, at lejen er forkert.</p>';
out+='<p class="small">Dette er en vejledende vurdering ud fra tommelfingerregler, ikke en afgørelse. Kun huslejenævnet kan fastsætte din leje.</p>';
r.className='result '+(lvl>=2?'good':'');r.innerHTML=out;
try{localStorage.setItem('huslejetjek',JSON.stringify(a))}catch(e){}
r.scrollIntoView({behavior:'smooth',block:'start'});
});
})();
