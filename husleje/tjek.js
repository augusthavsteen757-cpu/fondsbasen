(function(){
function kr(x){return Math.round(x).toLocaleString('da-DK')}
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
// hurtig udregning
var ql=document.getElementById('qleje'),qm=document.getElementById('qm2');
function quick(){var l=+ql.value,m=+qm.value,pm=m>0?l*12/m:0;
document.getElementById('qout').textContent=pm?kr(pm):'–';
var p=Math.max(0,Math.min(1,(pm-500)/1500));document.getElementById('qpin').style.left=(p*100)+'%';
var t=pm>1100?'Højt for en ældre ejendom med 7+ lejligheder. Tag tjekket og se, om reglerne gælder for dig.':pm>850?'Midt i feltet. Om det er for meget, afhænger af ejendommen. Tag tjekket.':pm?'Lavt niveau. Er bygningen fra før 1992, ser lejen ud til at være i orden.':'';
document.getElementById('qtxt').textContent=t;document.getElementById('qstamp').classList.toggle('on',pm>1100);
A.leje=ql.value;A.m2=qm.value}
var A={};
ql.addEventListener('input',quick);qm.addEventListener('input',quick);quick();
// trinvis tjek
var Q=[
{id:'type',t:'Hvilken slags bolig lejer du?',o:[['priv','Lejlighed hos en privat udlejer'],['ejer','Ejer- eller andelslejlighed, som ejeren lejer ud'],['vaer','Værelse'],['alm','Almen bolig (boligforening)']]},
{id:'aar',t:'Hvornår blev bygningen taget i brug?',o:[['f92','Før 1992'],['e92','I 1992 eller senere'],['vi','Ved ikke']],h:'Står ofte i lejekontrakten. Ellers kan du slå adressen op på bbr.dk.'},
{id:'str',t:'Hvor mange lejligheder er der i ejendommen?',o:[['lille','1-6 lejligheder'],['stor','7 eller flere'],['vi','Ved ikke']],h:'Tæl alle lejligheder i opgangen og bygningen, ikke kun lejeboliger.'},
{id:'mod',t:'Var lejligheden lige blevet totalrenoveret, da du flyttede ind?',o:[['ja','Ja, fx nyt køkken og nyt bad'],['nej','Nej'],['vi','Ved ikke']]},
{id:'leje',t:'Hvad betaler du i husleje om måneden?',n:'kr pr. måned',h:'Uden varme, vand og el.'},
{id:'m2',t:'Hvor mange kvadratmeter er boligen?',n:'m²',h:'Står i lejekontrakten.'},
{id:'forh',t:'Har du fået varsel om en huslejestigning inden for de sidste 6 uger?',o:[['ja','Ja'],['nej','Nej']]},
{id:'bor',t:'Bor du der stadig?',o:[['ja','Ja'],['u1','Nej, flyttet for under 1 år siden'],['o1','Nej, flyttet for over 1 år siden']]},
{id:'kom',t:'Hvilken kommune ligger boligen i?',x:'fx København',h:'Bruges til at adressere din klage til det rigtige huslejenævn.'}
];
var i=0,W=document.getElementById('wiz'),P=document.getElementById('prog'),R=document.getElementById('res');
P.innerHTML=Q.map(function(){return '<i></i>'}).join('');
function draw(){var q=Q[i],h='<div class="step"><p class="label">Spørgsmål '+(i+1)+' af '+Q.length+'</p><h3>'+q.t+'</h3>';
if(q.o){h+='<div class="opts" role="radiogroup">';q.o.forEach(function(o){h+='<label><input type="radio" name="w_'+q.id+'" value="'+o[0]+'"'+(A[q.id]===o[0]?' checked':'')+'> <span>'+o[1]+'</span></label>'});h+='</div>'}
else{h+='<label class="fld"><span>'+(q.n||'Kommune')+'</span><input id="w_'+q.id+'" type="'+(q.n?'number':'text')+'"'+(q.n?' inputmode="numeric" min="0"':'')+' placeholder="'+(q.x||'')+'" value="'+(A[q.id]||'')+'"></label>'}
if(q.h)h+='<p class="hint">'+q.h+'</p>';
h+='<div class="nav">'+(q.o?'':'<button class="btn" type="button" id="nx">'+(i===Q.length-1?'Se mit resultat':'Næste')+'</button>')+(i?'<button class="back" type="button" id="bk">Tilbage</button>':'')+'</div></div>';
W.innerHTML=h;
[].forEach.call(P.children,function(e,j){e.className=j<=i?'on':''});
var bk=document.getElementById('bk');if(bk)bk.onclick=function(){i--;draw()};
if(q.o){[].forEach.call(W.querySelectorAll('input'),function(r){r.onchange=function(){A[q.id]=r.value;setTimeout(next,180)}})}
else{var inp=document.getElementById('w_'+q.id),nx=document.getElementById('nx');
function go(){if(!inp.value.trim()){inp.focus();return}A[q.id]=inp.value.trim();next()}
nx.onclick=go;inp.onkeydown=function(e){if(e.key==='Enter'){e.preventDefault();go()}}}
}
function next(){if(i<Q.length-1){i++;draw();var f=W.querySelector('input');if(f&&f.type!=='radio')f.focus()}else result()}
function result(){
var a=A,leje=+a.leje,m2=+a.m2,pm=m2>0?leje*12/m2:0,lvl=1,why=[],target=0;
if(a.type==='alm'){lvl=0;why.push('Almene boliger har deres egne regler. Klager går typisk til beboerklagenævnet eller boligorganisationen, og det dækker klagepakken ikke.')}
else if(a.bor==='o1'){lvl=0;why.push('Er du flyttet for over 1 år siden, er det som udgangspunkt for sent at rejse kravet for huslejenævnet.')}
else{
if(a.aar==='e92'){lvl=1;why.push('Boliger i ejendomme taget i brug efter 1991 har som regel fri leje. Så kan lejen kun ændres, hvis den er åbenlyst urimelig.')}
else{var big=a.str==='stor'&&a.type==='priv';
if(big&&a.mod!=='ja'){target=950;lvl=pm>1100?3:pm>850?2:1;why.push('I ældre ejendomme med 7 eller flere lejligheder skal lejen som udgangspunkt beregnes ud fra udlejers faktiske udgifter (omkostningsbestemt leje). Det giver ofte en lavere leje end markedsprisen.')}
else if(big&&a.mod==='ja'){target=1500;lvl=pm>1800?2:1;why.push('Udlejer må kun tage markedsleje for en moderniseret lejlighed, hvis en række krav er opfyldt, bl.a. at der er brugt et minimumsbeløb på forbedringer. Udlejer skal kunne dokumentere det. Er kravene ikke opfyldt, kan nævnet sætte lejen ned.')}
else{target=1050;lvl=pm>1250?3:pm>950?2:1;why.push('I ejendomme med 6 eller færre lejligheder må lejen ikke være væsentligt højere end en tilsvarende omkostningsbestemt leje. Nævnet kan sætte den ned, hvis den er mere end ca. 10 % for høj.')}
if(a.aar==='vi'||a.str==='vi'||a.mod==='vi')why.push('Du svarede "ved ikke" på et spørgsmål. Find svaret i din lejekontrakt eller på bbr.dk for at få et mere sikkert billede.')}
if(a.forh==='ja'){lvl=Math.max(lvl,2);why.push('Du har fået varsel om en lejestigning. Du har kun 6 uger fra varslingen til at protestere skriftligt. Gør det nu.')}
if(a.bor==='u1')why.push('Du er flyttet. Kravet skal være rejst for huslejenævnet inden 1 år fra fraflytningen.')}
var lab=['Vi dækker ikke din bolig','Lav chance','Mulig chance','Høj chance'][lvl];
var out='<div class="verdict"><div class="meter l'+lvl+'"><i></i><i></i><i></i></div><span class="v">'+lab+'</span></div>';
if(pm)out+='<p>Din leje svarer til <b class="num">'+kr(pm)+' kr</b> pr. m² om året, uden forbrug.</p>';
out+='<ul class="list">'+why.map(function(w){return '<li>'+w+'</li>'}).join('')+'</ul>';
if(lvl>=2&&target&&pm>target)out+='<p><b>Regneeksempel:</b> Hvis nævnet satte lejen ned til ca. '+kr(target)+' kr pr. m², ville du spare ca. <b class="num">'+kr((pm-target)*m2)+' kr</b> om året, og du kunne kræve det for meget betalte tilbage. Det er kun et eksempel. Nævnet fastsætter selv lejen ud fra din bolig.</p>';
if(lvl>=2)out+='<div class="row"><a class="btn" href="#pakke">Få din færdige klage for 499 kr</a></div>';
else if(lvl===1)out+='<p class="small">Ud fra dine svar ser chancen lav ud. Vi anbefaler ikke, at du køber klagepakken, medmindre du har andre grunde til at tro, at lejen er forkert.</p>';
out+='<p class="small">En vejledende vurdering ud fra tommelfingerregler. Kun huslejenævnet kan fastsætte din leje. <button class="back" type="button" id="again">Tag tjekket igen</button></p>';
R.className='result '+(lvl>=2?'good':lvl===0?'bad':'');R.innerHTML=out;R.hidden=false;W.hidden=true;P.hidden=true;
document.getElementById('again').onclick=function(){i=0;R.hidden=true;W.hidden=false;P.hidden=false;draw()};
store('huslejetjek',a);R.scrollIntoView({behavior:'smooth',block:'start'});
}
draw();
})();
