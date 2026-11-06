import os
OUT="/mnt/project-files/fondsbasen/site"; BUY="https://buy.stripe.com/00weVd8muf0x3p12lv6Vq00"; BUY2="https://buy.stripe.com/4gM6oH5ai2dLe3Ff8h6Vq01"
FONTS='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Source+Sans+3:wght@400;600&display=swap">'
F=[("Kommunens § 18-midler","Frivilligt socialt arbejde. Alle kommuner har en pulje.","social patient"),
("Kommunens folkeoplysningsmidler","Aktiviteter for børn og unge.","idraet born"),
("Nordea-fonden","Lokale projekter: sundhed, motion, natur, kultur.","idraet patient kultur"),
("Lokale og Anlægsfonden","Byggeri og faciliteter til idræt og fritid.","idraet"),
("Tuborgfondet","Fællesskaber for unge.","born kultur"),
("Spar Nord Fonden","Lokale foreninger og projekter.","idraet kultur social"),
("Salling Fondene","Sport, kultur og lokale aktiviteter.","idraet kultur"),
("Augustinus Fonden","Kultur og sociale formål.","kultur social"),
("A.P. Møller Fonden","Lokalsamfund og kultur.","kultur"),
("Velux Fonden","Ældre og sociale projekter.","social"),
("Helsefonden","Sundhed og trivsel.","patient"),
("Beckett-Fonden","Sundhed og forebyggelse.","patient"),
("TrygFonden","Tryghed, sundhed og førstehjælp.","patient social"),
("Sygeforsikringen \"danmark\"s fond","Sundhedsfremmende projekter.","patient"),
("Egmont Fonden","Børn og unge.","born"),
("Lauritzen Fonden","Børn og unge i udsatte positioner.","born social"),
("Friluftsrådets udlodningsmidler","Friluftsliv og natur.","idraet"),
("DIF og DGI Foreningspuljen","Idrætsforeninger.","idraet"),
("Slots- og Kulturstyrelsens puljer","Kultur, idræt og almennyttige formål.","kultur idraet"),
("Lokale sparekasse- og forsyningsfonde","Små lokale beløb. Søg på \"[din by] fond forening\".","idraet kultur social patient born")]
CATS=[("alle","Alle"),("idraet","Idræt"),("patient","Sundhed og patient"),("born","Børn og unge"),("kultur","Kultur"),("social","Socialt")]
def cards(cat=None):
    L=[(n,d,c) for n,d,c in F if not cat or cat in c.split()]
    out="".join(f'<div class="card{" more" if (not cat and i>=6) else ""}" data-c="{c}"{" hidden" if (not cat and i>=6) else ""}><h3>{n}</h3><p class="meta">{d}</p></div>' for i,(n,d,c) in enumerate(L))
    if not cat: out='<div class="grid">'+out+'</div><p><button type="button" class="btn ghost" id="all">Vis alle 20 fonde</button></p>'
    else: out='<div class="grid">'+out+'</div>'
    return out
OFFER=f'''<section class="band" id="pakken"><div class="in offer">
<div style="display:grid;gap:18px"><h2>Få hjælp til ansøgningen</h2>
<p>En konsulent tager 5.000-20.000 kr for en fondsansøgning. Vælg selv: skriv den med vores pakke, eller lad os skrive den for jer.</p>
<ul class="list"><li>Skabelon med de 8 afsnit, næsten alle fonde spørger om</li><li>6 færdige AI-prompts, der skriver første udkast for jer</li><li>Budgetskabelon med eksempel</li><li>En færdig eksempelansøgning</li><li>De 10 fejl, der oftest giver afslag</li><li>Skabelon til afrapportering</li></ul></div>
<div style="display:grid;gap:16px"><div class="price" style="border-width:1.5px;border-color:var(--line)"><p class="old">Gør det selv · PDF · 13 sider</p><p class="big">199 kr</p><a class="btn ghost" href="{BUY}">Køb Ansøgningspakken</a><p class="old">Du får PDF'en med det samme.</p></div>
<div class="price"><p class="old"><span class="mark">Vi gør det for jer</span></p><p class="big">1.995 kr</p><p>Vi skriver hele ansøgningen til én fond ud fra jeres svar på 6 spørgsmål. Klar inden for 5 hverdage, med budget og 1 rettelsesrunde.</p><a class="btn" href="{BUY2}">Bestil ansøgningen</a><p class="old">En konsulent tager typisk 5.000-20.000 kr. Sikker betaling via Stripe.</p></div></div>
</div></section>'''
def page(fn,title,desc,body):
    html=f'''<!doctype html><html lang="da"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title><meta name="description" content="{desc}">{FONTS}<link rel="stylesheet" href="style.css"></head><body>
<header class="top"><div class="in"><a class="logo" href="index.html">Fonds<span>basen</span></a><a class="btn sm" href="#pakken">Ansøgningspakken</a></div></header>
{body}
<footer><div class="in">Fondsbasen · Gratis fondsoversigt for små danske foreninger · Oplysningerne er vejledende. Tjek altid fondens egen hjemmeside for frister og krav.</div></footer>
<script>document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{{document.querySelectorAll(".filters button").forEach(x=>x.setAttribute("aria-pressed",x===b));const c=b.dataset.c;document.querySelectorAll("#fonde .card").forEach(k=>k.hidden=c==="alle"?(k.classList.contains("more")&&!window.showAll):!k.dataset.c.split(" ").includes(c));const a=document.getElementById("all");if(a)a.hidden=c!=="alle"||window.showAll}}));const a=document.getElementById("all");if(a)a.addEventListener("click",()=>{{window.showAll=true;document.querySelectorAll("#fonde .more").forEach(k=>k.hidden=false);a.hidden=true}})</script>
</body></html>'''
    open(os.path.join(OUT,fn),"w").write(html)
filters='<div class="filters">'+"".join(f'<button type="button" data-c="{k}" aria-pressed="{str(k=="alle").lower()}">{v}</button>' for k,v in CATS)+'</div>'
page("index.html","Fonde til foreninger: find pengene til jeres projekt | Fondsbasen","Gratis oversigt over fonde og puljer for små danske foreninger, plus en ansøgningspakke, der gør det nemt at søge.",
f'''<div class="in"><section class="hero"><h1>Find fonde til jeres forening. <span class="mark">Gratis.</span></h1>
<p class="sub">Overblik over de fonde og puljer, små foreninger faktisk kan søge. Til idræt, sundhed, børn og unge, kultur og socialt arbejde.</p>
<div class="row"><a class="btn" href="#fonde">Se fondene</a><a class="btn ghost" href="#pakken">Hjælp til ansøgningen</a></div></section></div>
<div class="in"><section class="sec" id="fonde" style="padding-top:0"><h2>Hvad laver jeres forening?</h2>{filters}{cards()}</section></div>
{OFFER}
<div class="in"><section class="sec"><h2>Sådan får I pengene</h2><div class="steps">
<div><h3>Find fonden</h3><p class="meta">Vælg 2-3 fonde, hvis formål passer til jeres projekt.</p></div>
<div><h3>Skriv ansøgningen</h3><p class="meta">Brug fondens egne ord, og vis med tal, hvem der får gavn.</p></div>
<div><h3>Send i god tid</h3><p class="meta">Send 3 dage før fristen. Systemerne går ofte ned på fristdagen.</p></div></div></section>
<section class="sec" style="padding-top:0"><h2>Spørgsmål</h2><div>
<details><summary>Er fondsoversigten gratis?</summary><p>Ja. Kun Ansøgningspakken koster penge.</p></details>
<details><summary>Kan vi bruge pakken, hvis vi aldrig har søgt før?</summary><p>Ja, den er lavet til foreninger uden erfaring. Den guider jer afsnit for afsnit.</p></details>
<details><summary>Skal vi bruge AI?</summary><p>Nej, men det sparer mange timer. Prompterne virker i Claude, ChatGPT og lignende gratis værktøjer.</p></details>
<details><summary>Hvor finder vi flere fonde?</summary><p>Mange biblioteker giver gratis adgang til fondsdatabaser som Legatbogen. Spørg på jeres lokale bibliotek.</p></details>
</div></section>
<section class="sec" style="padding-top:0"><h2>Guides</h2><div class="grid">
<a class="card" href="fonde-til-idraetsforeninger.html"><h3>Fonde til idrætsforeninger</h3><p class="meta">Udstyr, nye hold og faciliteter</p></a>
<a class="card" href="fonde-til-patientforeninger.html"><h3>Fonde til patientforeninger</h3><p class="meta">Pårørendegrupper og sundhedsprojekter</p></a>
<a class="card" href="paragraf-18-midler.html"><h3>Sådan søger I § 18-midler</h3><p class="meta">Kommunens pulje til frivilligt socialt arbejde</p></a>
<a class="card" href="fonde-til-spejdere.html"><h3>Fonde til spejdere</h3><p class="meta">Lejre, udstyr, hytter og ture</p></a>
<a class="card" href="fonde-til-boern-og-unge.html"><h3>Fonde til børn og unge</h3><p class="meta">Foreninger med aktiviteter for under 25 år</p></a>
<a class="card" href="hvordan-skriver-man-en-fondsansoegning.html"><h3>Sådan skriver I en fondsansøgning</h3><p class="meta">Trin for trin, med eksempel</p></a>
<a class="card" href="budget-til-fondsansoegning.html"><h3>Budget til fondsansøgning</h3><p class="meta">Skabelon og typiske fejl</p></a>
<a class="card" href="fonde-til-kulturforeninger.html"><h3>Fonde til kulturforeninger</h3><p class="meta">Musik, teater, kunst og lokalhistorie</p></a>
<a class="card" href="fonde-mod-ensomhed.html"><h3>Fonde til projekter mod ensomhed</h3><p class="meta">Besøgsvenner, caféer og netværk</p></a>
<a class="card" href="fonde-til-udstyr.html"><h3>Fonde til udstyr</h3><p class="meta">Sådan søger I penge til ting</p></a>
<a class="card" href="afslag-paa-fondsansoegning.html"><h3>Fik I afslag?</h3><p class="meta">Sådan står I stærkere næste gang</p></a>
<a class="card" href="hvornaar-skal-man-soege-fonde.html"><h3>Hvornår skal man søge?</h3><p class="meta">Frister og planlægning over året</p></a></div></section></div>''')
def guide(fn,title,desc,h1,intro,cat,prose):
    page(fn,title,desc,f'''<div class="in"><section class="hero"><h1>{h1}</h1><p class="sub">{intro}</p><div class="row"><a class="btn" href="#pakken">Hjælp til ansøgningen</a></div></section>
<section class="sec" style="padding-top:0">{"<h2>Fonde I kan søge</h2><div id='fonde'>"+cards(cat)+"</div>" if cat else ""}<div class="prose">{prose}</div></section></div>{OFFER}''')
guide("fonde-til-idraetsforeninger.html","Fonde til idrætsforeninger | Fondsbasen","Hvilke fonde kan idrætsforeninger søge? Puljer til udstyr, nye hold og faciliteter.","Fonde til idrætsforeninger","Kommunale puljer, udlodningsmidler og private fonde, der støtter idræt i lokale foreninger.","idraet",
"<h2>Det vurderer fondene</h2><ul><li>Hvor mange nye deltagere projektet giver</li><li>Om det når grupper, der ellers ikke dyrker idræt</li><li>Om aktiviteten fortsætter, når pengene er brugt</li></ul><p>Byggeri og faciliteter søges oftest hos Lokale og Anlægsfonden og kommunen.</p>")
guide("fonde-til-patientforeninger.html","Fonde til patientforeninger og pårørendegrupper | Fondsbasen","Fonde og puljer for patientforeninger, pårørendegrupper og sundhedsprojekter.","Fonde til patientforeninger","Fonde og puljer, der støtter sundhed, trivsel og fællesskab for patienter og pårørende.","patient",
"<h2>Gode projekter at søge til</h2><ul><li>Samtalegrupper for pårørende</li><li>Caféer og netværk for patienter</li><li>Motion for mennesker med kronisk sygdom</li><li>Uddannelse af frivillige</li></ul><p>Beskriv, hvordan I måler effekten, fx med et kort spørgeskema om trivsel før og efter.</p>")
guide("paragraf-18-midler.html","§ 18-midler: sådan søger I | Fondsbasen","Guide til kommunens § 18-midler til frivilligt socialt arbejde: hvem kan søge, og hvordan.","§ 18-midler: sådan søger I","Alle kommuner har en pulje til frivilligt socialt arbejde. Konkurrencen er ofte mindre end hos de store fonde.",None,
"<h2>Hvem kan søge?</h2><p>Foreninger og frivillige grupper, der laver socialt arbejde for borgere i kommunen, fx besøgsvenner, pårørendegrupper og netværk mod ensomhed.</p><h2>Hvad kan man få?</h2><p>Typisk aktiviteter, materialer, lokaler, forplejning og uddannelse af frivillige. Beløbene er ofte fra få tusinde til 50.000 kr.</p><h2>Find jeres kommunes pulje</h2><p>Søg på \"§ 18 [jeres kommune]\". De fleste kommuner har én fast frist om året, ofte i efteråret.</p>")

guide("fonde-til-spejdere.html","Fonde til spejdere: lejre, udstyr og hytter | Fondsbasen","Hvilke fonde kan spejdergrupper søge? Oversigt over puljer til lejre, udstyr, hytter og friluftsliv.","Fonde til spejdere","Spejdergrupper kan søge både friluftspuljer, lokale fonde og fonde for børn og unge. Her er de mest relevante.","born",
"<h2>Typiske projekter spejdere får støtte til</h2><ul><li>Lejrture og sommerlejre, især for børn der ellers ikke har råd</li><li>Telte, kanoer og andet friluftsudstyr</li><li>Renovering af hytter og grunde</li><li>Uddannelse af ledere</li></ul><p>Friluftsrådets udlodningsmidler er oplagte til natur og friluftsliv. Til hytter og bygninger kan Lokale og Anlægsfonden være relevant.</p><h2>Gør ansøgningen stærkere</h2><ul><li>Fortæl hvor mange børn der deltager, og hvor mange nye I vil nå</li><li>Vis, at udstyret bliver brugt i mange år</li><li>Nævn frivillige ledertimer som jeres eget bidrag</li></ul>")
guide("fonde-til-boern-og-unge.html","Fonde til børn og unge: puljer for foreninger | Fondsbasen","Fonde og puljer, der støtter foreningsaktiviteter for børn og unge: fællesskab, idræt, kultur og udsatte unge.","Fonde til børn og unge","Mange fonde prioriterer projekter for børn og unge. Her er dem, små foreninger oftest kan søge.","born",
"<h2>Det kigger fondene efter</h2><ul><li>Fællesskab, især for børn og unge der står uden for</li><li>Aktiviteter, der får unge til selv at tage ansvar</li><li>Samarbejde med skoler, klubber eller kommunen</li></ul><p>Kommunens folkeoplysningsmidler er ofte et godt første sted at søge til faste aktiviteter for børn og unge.</p>")
guide("hvordan-skriver-man-en-fondsansoegning.html","Sådan skriver man en fondsansøgning: trin for trin | Fondsbasen","Lær at skrive en fondsansøgning til din forening: de 8 afsnit fonde forventer, eksempler og de typiske fejl.","Sådan skriver I en fondsansøgning","De fleste fonde spørger om de samme 8 ting. Skriv dem én gang, og tilpas dem til hver fond.",None,
"<h2>De 8 afsnit</h2><ol><li><strong>Resumé:</strong> hvad, hvem, hvor meget og hvornår, på 3-5 linjer</li><li><strong>Om foreningen:</strong> formål, medlemmer og hvad I har opnået</li><li><strong>Behovet:</strong> problemet med tal og et konkret eksempel</li><li><strong>Projektet:</strong> aktiviteter, tidsplan og hvem gør hvad</li><li><strong>Effekt:</strong> hvem får gavn, og hvordan I måler det</li><li><strong>Match med fonden:</strong> brug fondens egne ord fra dens formål</li><li><strong>Budget:</strong> udgifter, egenfinansiering og andre ansøgte fonde</li><li><strong>Forankring:</strong> hvad sker der, når pengene er brugt</li></ol><h2>Eksempel på et resumé</h2><p><em>Foreningen søger 28.000 kr til 12 samtalegrupper for pårørende til kræftramte i 2027. Grupperne ledes af en uddannet facilitator og når ca. 60 pårørende, som i dag ikke har et lokalt tilbud.</em></p><h2>De 3 mest almindelige fejl</h2><ul><li>I skriver om jer selv i stedet for fondens formål</li><li>Ingen tal, kun ord som \"mange\" og \"stor efterspørgsel\"</li><li>Budgettet hænger ikke sammen med teksten</li></ul>")
guide("budget-til-fondsansoegning.html","Budget til fondsansøgning: skabelon og eksempel | Fondsbasen","Sådan laver din forening et budget til en fondsansøgning: skabelon, eksempel og de fejl fondene oftest ser.","Budget til en fondsansøgning","Fonde læser budgettet for at se, om I har styr på projektet. Det behøver ikke være svært.",None,
"<h2>Sådan bygger I budgettet</h2><ol><li>List alle udgifter, og skriv hvordan I har regnet dem ud (fx 12 møder × 400 kr)</li><li>Rund til hele hundreder</li><li>Skriv jeres eget bidrag, fx kontingent eller sponsorater</li><li>Skriv hvilke andre fonde I har søgt</li><li>Træk det fra, så det tydeligt fremgår, hvad I søger hos netop denne fond</li></ol><h2>Typiske fejl</h2><ul><li>Aktiviteter i teksten, der ikke står i budgettet</li><li>Runde beløb uden forklaring, fx \"Diverse: 10.000 kr\"</li><li>Udgifter til drift som husleje, som mange fonde ikke støtter</li></ul><p>Tip: Søg flere fonde om dele af beløbet. Fonde kan godt lide at være med til noget sammen med andre.</p>")

guide("fonde-til-kulturforeninger.html","Fonde til kulturforeninger: musik, teater og kunst | Fondsbasen","Fonde og puljer for små kulturforeninger: musik, teater, kunst, lokalhistorie og kulturelle arrangementer.","Fonde til kulturforeninger","Kor, teatergrupper, lokalhistoriske foreninger og kunstforeninger kan søge både private fonde og offentlige kulturpuljer.","kultur",
"<h2>Gode projekter at søge til</h2><ul><li>Koncerter, forestillinger og udstillinger, der er åbne for alle</li><li>Workshops for børn og unge</li><li>Formidling af lokalhistorie</li><li>Instrumenter, scenelys og andet udstyr</li></ul><p>Tjek også jeres kommunes kulturpulje. De fleste kommuner har én, og den er ofte nemmere at få end de store fonde.</p><h2>Gør ansøgningen stærkere</h2><ul><li>Fortæl hvor mange publikummer eller deltagere I forventer</li><li>Vis hvordan arrangementet når nye grupper</li><li>Nævn samarbejdspartnere som bibliotek, skole eller forsamlingshus</li></ul>")
guide("fonde-mod-ensomhed.html","Fonde til projekter mod ensomhed | Fondsbasen","Hvilke fonde støtter foreningers projekter mod ensomhed? Besøgsvenner, caféer, netværk og fællesspisning.","Fonde til projekter mod ensomhed","Ensomhed er et af de områder, mange fonde og kommuner prioriterer. Her er de mest relevante muligheder for små foreninger.","social",
"<h2>Projekter der ofte får støtte</h2><ul><li>Besøgsvenner og gåvenner</li><li>Fællesspisning og caféer</li><li>Netværk for pårørende, enker og enkemænd eller nytilflyttere</li><li>Aktiviteter på tværs af generationer</li></ul><p>Kommunens § 18-midler er det oplagte første sted at søge. Læs vores <a href=\"paragraf-18-midler.html\">guide til § 18-midler</a>.</p><h2>Sådan viser I effekt</h2><p>Brug et kort spørgeskema før og efter, fx: \"Hvor ofte føler du dig ensom?\" Tal overbeviser fonde mere end ord.</p>")
guide("fonde-til-udstyr.html","Fonde til udstyr til foreninger | Fondsbasen","Sådan søger din forening penge til udstyr: hvilke fonde, hvad de kræver, og hvordan I skriver ansøgningen.","Fonde til udstyr","Mange foreninger mangler penge til ting: bolde, telte, instrumenter eller en ny computer. Det kan godt lade sig gøre at få støtte, hvis I fortæller det rigtigt.",None,
"<h2>Fortæl hvad udstyret gør muligt</h2><p>Fonde giver sjældent penge til ting i sig selv. De giver penge til det, tingene gør muligt. Skriv derfor ikke \"vi mangler 10 telte\", men \"10 nye telte gør det muligt at tage 40 børn med på sommerlejr\".</p><h2>Fonde der ofte støtter udstyr</h2><ul><li>Lokale sparekasse- og forsyningsfonde</li><li>Nordea-fonden og Spar Nord Fonden</li><li>DIF og DGI Foreningspuljen for idrætsforeninger</li><li>Friluftsrådet til friluftsudstyr</li></ul><h2>Husk i budgettet</h2><ul><li>Vedhæft et tilbud fra en leverandør</li><li>Skriv hvor længe udstyret holder</li><li>Skriv hvor det skal opbevares</li></ul>")
guide("afslag-paa-fondsansoegning.html","Afslag på fondsansøgning: hvad nu? | Fondsbasen","Fik jeres forening afslag på en fondsansøgning? Sådan finder I ud af hvorfor, og sådan står I stærkere næste gang.","Fik I afslag på jeres fondsansøgning?","Afslag er normalt. Selv gode ansøgninger bliver afvist, fordi fondene får langt flere ansøgninger, end de kan støtte.",None,
"<h2>Gør dette inden for en uge</h2><ol><li><strong>Spørg hvorfor.</strong> Skriv en kort, venlig mail og spørg, hvad der kunne have gjort ansøgningen stærkere. Mange fonde svarer.</li><li><strong>Tjek om I matchede fonden.</strong> Læs fondens formål igen. Passede projektet virkelig?</li><li><strong>Søg et andet sted.</strong> Tilpas ansøgningen til en ny fond. Det meste af teksten kan genbruges.</li></ol><h2>De 5 hyppigste grunde til afslag</h2><ul><li>Projektet passer ikke til fondens formål</li><li>Ansøgningen mangler tal og konkrete mål</li><li>Budgettet er uklart</li><li>Der søges til drift i stedet for et afgrænset projekt</li><li>Projektet er allerede gået i gang</li></ul>")
guide("hvornaar-skal-man-soege-fonde.html","Hvornår skal man søge fonde? Frister og planlægning | Fondsbasen","Sådan planlægger din forening fondsansøgninger over året: frister, hvor lang tid det tager, og hvornår I skal starte.","Hvornår skal man søge fonde?","Mange foreninger søger for sent. Her er en enkel plan, så I når fristerne.",None,
"<h2>Tommelfingerregler</h2><ul><li><strong>Start 3-6 måneder før</strong> projektet skal begynde. Mange fonde bruger 1-3 måneder på at behandle ansøgninger.</li><li><strong>Tjek fristen på fondens hjemmeside.</strong> Nogle fonde har faste frister, andre behandler løbende.</li><li><strong>Send 3 dage før fristen.</strong> Ansøgningssystemer går ofte ned på sidste dag.</li></ul><h2>En simpel årsplan</h2><ul><li><strong>Januar:</strong> Lav en liste over årets projekter og hvad de koster</li><li><strong>Februar-marts:</strong> Find 3-5 fonde pr. projekt, og noter frister</li><li><strong>Løbende:</strong> Skriv én ansøgning ad gangen, og genbrug teksten</li><li><strong>Efterår:</strong> Mange kommuner har frist for § 18-midler</li></ul><p>Fristerne ændrer sig fra år til år, så tjek altid den konkrete fond.</p>")

import datetime
urls=["","fonde-til-idraetsforeninger.html","fonde-til-patientforeninger.html","paragraf-18-midler.html","fonde-til-spejdere.html","fonde-til-boern-og-unge.html","hvordan-skriver-man-en-fondsansoegning.html","budget-til-fondsansoegning.html","fonde-til-kulturforeninger.html","fonde-mod-ensomhed.html","fonde-til-udstyr.html","afslag-paa-fondsansoegning.html","hvornaar-skal-man-soege-fonde.html"]
base="https://augusthavsteen757-cpu.github.io/fondsbasen/"
open(os.path.join(OUT,"sitemap.xml"),"w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+"".join(f"<url><loc>{base}{u}</loc><lastmod>2026-11-06</lastmod></url>" for u in urls)+"</urlset>\n")
open(os.path.join(OUT,"robots.txt"),"w").write("User-agent: *\nAllow: /\nDisallow: /tak-94d54d6b2240.html\nDisallow: /bestilt-7f3a91.html\nSitemap: "+base+"sitemap.xml\n")
print("ok")
