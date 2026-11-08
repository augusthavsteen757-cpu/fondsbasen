(function(){
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var A={};
var Q=[
{id:'hvem',t:'Hvem har givet dig afgiften?',o:[['priv','Et privat parkeringsselskab (fx Q-Park, Apcoa, Gardian, ParkZone, Europark)'],['kom','Kommunen (parkeringsafgift)'],['pol','Politiet (parkeringsbøde)']],h:'Står øverst på sedlen eller brevet.'},
{id:'hvor',t:'Hvordan fik du afgiften?',o:[['bil','Den sad på bilen, eller en vagt gav mig den'],['post','Den kom bagefter med posten, e-Boks, sms eller mail'],['vi','Ved ikke']],h:'Mange pladser med kamera (nummerpladescanning) sender afgiften bagefter.'},
{id:'dato',t:'Hvornår fik du afgiften?',d:1,h:'Datoen for parkeringen.'},
{id:'grund',t:'Hvad skriver selskabet, at du har gjort forkert?',o:[['betalt','Ikke betalt, men jeg havde betalt (automat eller app)'],['skive','Manglende eller forkert p-skive'],['tid','Overskredet tid'],['till','Manglende tilladelse, men jeg havde en'],['andet','Noget andet']]},
{id:'fejl',t:'Hvordan havde du betalt?',if:function(a){return a.grund==='betalt'},o:[['ok','Korrekt, og jeg har kvittering'],['taste','Jeg tastede forkert nummerplade eller zone'],['ingen','Jeg har ingen kvittering']]},
{id:'skilt',t:'Hvordan var skiltningen på pladsen?',o:[['ok','Tydelig: P-skilt ved indkørslen og skilte med regler og afgiftens størrelse'],['daarlig','Utydelig, skjult eller manglede afgiftens størrelse'],['vi','Lagde ikke mærke til det']],h:'Tag gerne billeder af skiltene nu, hvis du kan komme forbi.'},
{id:'seddel',t:'Står alt dette på afgiften?',o:[['ja','Ja, det hele står der'],['nej','Nej, noget mangler'],['vi','Ved ikke']],h:'Hvilket vilkår du har overtrådt, tid og sted, nummerplade, betalingsfrist og hvor du kan klage.'},
{id:'klaget',t:'Har du allerede klaget til selskabet?',o:[['nej','Nej, ikke endnu'],['afslag','Ja, og de har sagt nej'],['intet','Ja, men de har ikke svaret i over 3 måneder']]}
];
var i=0,W=document.getElementById('wiz'),P=document.getElementById('prog'),R=document.getElementById('res');
function vis(){return Q.filter(function(q){return !q.if||q.if(A)})}
function draw(){var L=vis(),q=L[i],h='<div class="step"><p class="label">Spørgsmål '+(i+1)+' af '+L.length+'</p><h3>'+q.t+'</h3>';
P.innerHTML=L.map(function(x,j){return '<i class="'+(j<=i?'on':'')+'"></i>'}).join('');
if(q.o){h+='<div class="opts" role="radiogroup">';q.o.forEach(function(o){h+='<label><input type="radio" name="w_'+q.id+'" value="'+o[0]+'"'+(A[q.id]===o[0]?' checked':'')+'> <span>'+o[1]+'</span></label>'});h+='</div>'}
else{h+='<label class="fld"><span>Dato</span><input id="w_'+q.id+'" type="date" value="'+(A[q.id]||'')+'"></label>'}
if(q.h)h+='<p class="hint">'+q.h+'</p>';
h+='<div class="nav">'+(q.o?'':'<button class="btn" type="button" id="nx">Næste</button>')+(i?'<button class="back" type="button" id="bk">Tilbage</button>':'')+'</div></div>';
W.innerHTML=h;
var bk=document.getElementById('bk');if(bk)bk.onclick=function(){i--;draw()};
if(q.o){[].forEach.call(W.querySelectorAll('input'),function(r){r.onchange=function(){A[q.id]=r.value;setTimeout(function(){if(q.id==='hvem'&&r.value!=='priv')return result();next()},180)}})}
else{var inp=document.getElementById('w_'+q.id);document.getElementById('nx').onclick=function(){if(!inp.value){inp.focus();return}A[q.id]=inp.value;next()}}
}
function next(){if(i<vis().length-1){i++;draw()}else result()}
function result(){
var a=A,lvl=1,why=[],sel=[];
if(a.hvem!=='priv'){lvl=-1;why.push(a.hvem==='kom'?'Parkeringsafgifter fra kommunen følger andre regler end private kontrolafgifter. Du skal klage direkte til kommunen, typisk via kommunens hjemmeside. Det dækker P-klagen ikke.':'Parkeringsbøder fra politiet klager du over til politiet. Det dækker P-klagen ikke.')}
else{
var efter=a.dato&&a.dato>='2025-07-01';
if(a.hvor==='post'&&efter){lvl=3;sel.push('post');why.push('Afgiften er sendt bagefter. Siden 1. juli 2025 skal en kontrolafgift sættes synligt på bilen eller gives til føreren. En afgift, der kun er sendt med posten, e-Boks eller mail, er som udgangspunkt ikke gyldig.')}
else if(a.hvor==='post'){lvl=Math.max(lvl,2);sel.push('post');why.push('Afgiften er sendt bagefter. Før 1. juli 2025 måtte det kun ske, hvis det ikke var muligt at sætte den på bilen. Selskabet skal kunne vise, at det var tilfældet.')}
if(a.skilt==='daarlig'){lvl=Math.max(lvl,2);sel.push('skilt');why.push('Skiltningen skal opfylde faste krav: et skilt med hvidt P på sort bund ved indkørslen og skilte på pladsen med reglerne, afgiftens størrelse og selskabets navn. Er den utydelig, er du ikke bundet af vilkårene. Tag billeder som bevis.')}
if(a.seddel==='nej'){lvl=Math.max(lvl,2);sel.push('seddel');why.push('Afgiften skal oplyse, hvilket vilkår du har overtrådt, tid og sted, nummerplade, betalingsfrist og hvor du kan klage. Mangler noget, er den ikke udstedt efter reglerne.')}
if(a.grund==='betalt'&&a.fejl==='ok'){lvl=Math.max(lvl,3);sel.push('betalt');why.push('Du havde betalt og har kvittering. Det er et stærkt argument. Vedlæg kvitteringen eller et skærmbillede fra appen.')}
if(a.grund==='betalt'&&a.fejl==='taste'){lvl=Math.max(lvl,2);sel.push('taste');why.push('Du betalte, men med en tastefejl. Selskaberne afviser ofte den slags, men mange frafalder afgiften, når du viser, at du betalte for den rigtige tid og plads. Det er værd at prøve.')}
if(a.grund==='till'){lvl=Math.max(lvl,2);sel.push('till');why.push('Du havde tilladelse. Vedlæg kopi af tilladelsen og et billede af, hvor den lå i bilen.')}
if(a.grund==='skive'){sel.push('skive');why.push('Ved p-skive skal den være stillet til det nærmeste hele eller halve kvarter efter ankomst og ligge synligt. Har du et billede af den, så vedlæg det.')}
if(a.grund==='tid'){sel.push('tid');why.push('Ved overskredet tid står det svagere, medmindre skiltningen var utydelig, eller selskabet har regnet tiden forkert.')}
if(a.hvor==='vi'||a.skilt==='vi'||a.seddel==='vi')why.push('Du svarede "ved ikke" på et spørgsmål. Kig på afgiften og skiltene igen. Det kan give dig et stærkere argument.')
if(a.klaget==='afslag'||a.klaget==='intet')why.push('Du har allerede klaget til selskabet. Næste skridt er Parkeringsklagenævnet. Gebyret er 175 kr, og du får det tilbage, hvis du får medhold. Klagen til nævnet er med i pakken.')}
var lab={'-1':'Det dækker vi ikke',1:'Svag sag',2:'Værd at klage',3:'Stærk sag'}[lvl];
var out='<div class="verdict">'+(lvl>0?'<div class="meter l'+lvl+'"><i></i><i></i><i></i></div>':'')+'<span class="v">'+lab+'</span></div>';
out+='<ul class="list">'+why.map(function(w){return '<li>'+w+'</li>'}).join('')+'</ul>';
if(lvl>=2)out+='<div class="row"><a class="btn" href="#pris">Få din færdige klage for 99 kr</a></div><p class="small">Pengene tilbage, hvis selskabet fastholder afgiften.</p>';
else if(lvl===1)out+='<p class="small">Ud fra dine svar ser sagen svag ud, og vi anbefaler ikke, at du køber klagen. Har du billeder eller andet, der viser, at afgiften er forkert, kan det ændre billedet.</p>';
out+='<p class="small">En vejledende vurdering ud fra reglerne i kontrolafgiftsbekendtgørelsen. <button class="back" type="button" id="again">Tag tjekket igen</button></p>';
R.className='result '+(lvl>=2?'good':lvl<0?'bad':'');R.innerHTML=out;R.hidden=false;W.hidden=true;P.hidden=true;
document.getElementById('again').onclick=function(){i=0;A={};R.hidden=true;W.hidden=false;P.hidden=false;draw()};
a.grunde=sel;store('pklagen',a);R.scrollIntoView({behavior:'smooth',block:'start'});
}
draw();
})();
