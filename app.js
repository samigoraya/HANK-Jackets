/* HANK shared script: cart, product page, hero, menu, forms. Runs on every page. */
(function(){
"use strict";
var $=function(id){return document.getElementById(id)},money=function(n){return "Rs. "+n.toLocaleString("en-US")};
var P=[{"i": 0, "color": "Black", "sw": "#1c1c1e", "vb": "#4169e1", "url": "/bomber-jacket-black", "img": ["/img/bomber-black-front.jpg", "/img/bomber-black-back.jpg"], "name": "Bomber Jacket – Black", "price": 5800, "was": 8300, "off": 30}, {"i": 1, "color": "Blue", "sw": "#1e60c8", "vb": "#ffc58a", "url": "/bomber-jacket-blue", "img": ["/img/bomber-blue-front.jpg", "/img/bomber-blue-back.jpg"], "name": "Bomber Jacket – Blue", "price": 5800, "was": 8300, "off": 30}, {"i": 2, "color": "Navy", "sw": "#1b2c4e", "vb": "#d4f56a", "url": "/bomber-jacket-navy", "img": ["/img/bomber-navy-front.jpg", "/img/bomber-navy-back.jpg"], "name": "Bomber Jacket – Navy", "price": 5800, "was": 8300, "off": 30}, {"i": 3, "color": "Red", "sw": "#a3192d", "vb": "#a9ecd0", "url": "/bomber-jacket-red", "img": ["/img/bomber-red-front.jpg", "/img/bomber-red-back.jpg"], "name": "Bomber Jacket – Red", "price": 5800, "was": 8300, "off": 30}, {"i": 4, "color": "White", "sw": "#f4f4f2", "vb": "#d3c6ff", "url": "/bomber-jacket-white", "img": ["/img/bomber-white-front.jpg", "/img/bomber-white-back.jpg"], "name": "Bomber Jacket – White", "price": 5800, "was": 8300, "off": 30}, {"i": 5, "color": "Dark Green", "sw": "#1c4630", "vb": "#3ddc84", "url": "/bomber-jacket-dark-green", "img": ["/img/bomber-green-front.jpg", "/img/bomber-green-back.jpg"], "name": "Bomber Jacket – Dark Green", "price": 5800, "was": 8300, "off": 30}];
var SZ=["S","M","L","XL","XXL"];
var CITIES=["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Gujranwala","Hyderabad","Other city in Pakistan"];

/* storage can be blocked (private window, previews), so every access is wrapped */
function sget(st,k){try{return window[st].getItem(k)}catch(e){return null}}
function sset(st,k,v){try{window[st].setItem(k,v)}catch(e){}}
var cart={};
try{var c0=JSON.parse(sget("localStorage","hank-cart")||"{}");if(c0&&typeof c0==="object"){Object.keys(c0).forEach(function(k){var m=k.split("|");if(P[+m[0]]&&SZ.indexOf(m[1])>-1&&c0[k]>0)cart[k]=Math.min(99,Math.floor(+c0[k]))})}}catch(e){}
function saveCart(){sset("localStorage","hank-cart",JSON.stringify(cart))}
var sel={size:null,qty:1,v:0};
try{var s0=JSON.parse(sget("sessionStorage","hank-sel")||"{}");if(s0&&SZ.indexOf(s0.size)>-1)sel.size=s0.size;if(s0&&s0.qty>=1&&s0.qty<=10)sel.qty=Math.floor(s0.qty)}catch(e){}
function saveSel(){sset("sessionStorage","hank-sel",JSON.stringify({size:sel.size,qty:sel.qty}))}

var main=document.querySelector("[data-p]"),cur=main?+main.dataset.p:-1;

/* cart drawer. Shipping is free everywhere in Pakistan. */
function openCart(){draw();$("dr").classList.add("o");$("sc").classList.add("o");$("dr").removeAttribute("aria-hidden");setTimeout(function(){var c=$("dr").querySelector("[data-close]");if(c)c.focus()},60)}
function closeCart(){$("dr").classList.remove("o");$("sc").classList.remove("o");$("dr").setAttribute("aria-hidden","true")}
function buy(i){
  if(!sel.size){var e=$("err");e.textContent="Please choose a size first.";e.scrollIntoView({block:"center",behavior:"smooth"});return}
  var k=i+"|"+sel.size;cart[k]=Math.min(99,(cart[k]||0)+sel.qty);saveCart();openCart()
}
function draw(){
  var ks=Object.keys(cart),d=$("dr"),n=0,sub=0,was=0;
  var rows=ks.map(function(k){var a=k.split("|"),p=P[+a[0]],q=cart[k];n+=q;sub+=p.price*q;was+=p.was*q;
    return '<div class="li"><img src="'+p.img[0]+'" alt="" width="60" height="60"><div><b>'+p.name+'</b><small>'+a[1]+' × '+q+'</small><button class="rm" data-rm="'+k+'">Remove</button></div><b>'+money(p.price*q)+'</b></div>'}).join("");
  $("cn").textContent=n;
  var head='<div class="dh"><h2>Your cart</h2><button class="x" data-close aria-label="Close cart">×</button></div>';
  if(!ks.length){d.innerHTML=head+'<p>Your cart is empty.</p><a class="btn pop" href="/products">Shop jackets →</a>';return}
  d.innerHTML=head+rows+
    '<div class="tl sv"><span>You save</span><span>'+money(was-sub)+'</span></div>'+
    '<div class="tl"><span>Shipping (Pakistan)</span><span>Free</span></div>'+
    '<div class="tl t"><span>Total · Cash on Delivery</span><span>'+money(sub)+'</span></div>'+
    '<p class="hint ok">Free shipping applied.</p>'+
    '<form id="cf" style="margin-top:16px"><label for="on">Full name</label><input id="on" required autocomplete="name"><label for="op">Phone</label><input id="op" required pattern="(\\+92|0)3\\d{9}" placeholder="03XXXXXXXXX" autocomplete="tel"><label for="oc">City</label><select id="oc">'+CITIES.map(function(c){return "<option>"+c+"</option>"}).join("")+'</select><label for="oa">Delivery address</label><textarea id="oa" rows="2" required autocomplete="street-address"></textarea><button class="btn pop w big">Place order – Cash on Delivery</button></form>';
  var f=$("cf");
  f.onsubmit=function(e){e.preventDefault();cart={};saveCart();draw();
    d.innerHTML='<div class="dh"><h2>Order received</h2><button class="x" data-close aria-label="Close">×</button></div><p>Thank you! We’ll call to confirm and deliver within Pakistan in 3–5 working days. Shipping is free. Pay cash on delivery.</p><button class="btn pop" data-close>Close</button>'}
}

/* product page: gallery, size, quantity */
function setView(k){
  if(cur<0)return;k=((k%2)+2)%2;sel.v=k;var p=P[cur],im=$("mainimg");if(!im)return;
  im.src=p.img[k];im.alt=p.name+" – "+(k?"back":"front")+" view";
  var g=$("gc");if(g)g.textContent=(k+1)+" / 2";
  document.querySelectorAll(".th button").forEach(function(b){var on=+b.dataset.view===k;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)})
}
function applySize(){
  document.querySelectorAll(".sz").forEach(function(x){x.setAttribute("aria-pressed",x.dataset.size===sel.size)});
  var l=$("szl");if(l)l.textContent="Size · "+(sel.size||"pick one");
  var q=$("qv");if(q)q.textContent=sel.qty
}
if(cur>=0){
  applySize();
  var e1=$("eta");
  if(e1){var f=function(n){var d=new Date();d.setDate(d.getDate()+n);return d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})};
    e1.textContent="order today, get it between "+f(3)+" and "+f(5)+". Free shipping."}
}

/* sticky buy bar: appears when the main buy button scrolls out of view */
var st=document.querySelector(".sticky"),bb=document.querySelector(".buy");
if(st){
  document.body.classList.add("hasS");
  if(bb&&"IntersectionObserver" in window)new IntersectionObserver(function(en){st.classList.toggle("show",!en[0].isIntersecting)}).observe(bb);
  else st.classList.add("show")
}

/* recently viewed (this browser only) */
function cardHtml(p){
  return '<a class="card" href="'+p.url+'" style="--sw:'+p.sw+'" aria-label="'+p.name+', '+money(p.price)+'"><span class="chip"><i class="dot"></i>'+p.color+'</span><span class="save mono">-'+p.off+'%</span>'+
    '<div class="ph"><img src="'+p.img[0]+'" alt="'+p.name+' – front view" width="800" height="800" loading="lazy" decoding="async"><img class="b" src="'+p.img[1]+'" alt="'+p.name+' – back view" width="800" height="800" loading="lazy" decoding="async"></div>'+
    '<div class="ci"><div><h3 class="ct">'+p.name+'</h3><span class="price">'+money(p.price)+'<s class="was">'+money(p.was)+'</s></span></div><span class="go" aria-hidden="true">→</span></div></a>'
}
var RV=[];
try{var r0=JSON.parse(sget("localStorage","hank-rv")||"[]");if(Array.isArray(r0))RV=r0.filter(function(x){return typeof x==="number"&&P[x]})}catch(e){}
if(cur>=0){RV=[cur].concat(RV.filter(function(x){return x!==cur})).slice(0,8);sset("localStorage","hank-rv",JSON.stringify(RV))}
var rv=$("rv");
if(rv){var rl=RV.filter(function(x){return x!==cur}).slice(0,4);if(rl.length){$("rvg").innerHTML=rl.map(function(i){return cardHtml(P[i])}).join("");rv.hidden=false}}

/* home hero: colour picker and gentle auto-rotate */
var hi=0,ht=null;
function stopHero(){if(ht){clearInterval(ht);ht=null}}
function setHero(k,user){
  var h=$("hero");if(!h){stopHero();return}
  if(user)stopHero();hi=k;var p=P[k];
  h.style.setProperty("--vb",p.vb);
  var im=$("himg");im.src=p.img[0];im.alt=p.name+" – front view";
  $("hcol").textContent=p.color;$("hbuy").href=p.url;$("hbuy").setAttribute("aria-label","Shop "+p.name);
  document.querySelectorAll(".pk").forEach(function(b){b.setAttribute("aria-pressed",+b.dataset.hero===k)})
}
if($("hero")){
  P.forEach(function(q){var im=new Image();im.src=q.img[0]});
  /* the photo changes colour by itself for one round, pauses while the visitor hovers or focuses it, and stops once they pick a colour */
  var held=false,steps=0;
  var pn=document.querySelector("#hero .panel");
  if(pn){["mouseenter","focusin"].forEach(function(n){pn.addEventListener(n,function(){held=true})});["mouseleave","focusout"].forEach(function(n){pn.addEventListener(n,function(){held=false})})}
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)ht=setInterval(function(){
    if(held||document.hidden)return;
    setHero((hi+1)%P.length);
    if(++steps>=P.length)stopHero()
  },3200)
}

/* forms (no backend yet: show a thank-you) */
var cf2=$("cf2");if(cf2)cf2.onsubmit=function(e){e.preventDefault();cf2.outerHTML="<p><b>Thanks!</b> We’ll reply within 1 working day.</p>"};
var nf=$("nf");if(nf)nf.onsubmit=function(e){e.preventDefault();nf.outerHTML="<p><b>Thanks, you’re on the list.</b></p>"};

/* clicks */
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-size],[data-qty],[data-buy],[data-rm],[data-close],[data-view],[data-nav],[data-sg],[data-hero],#cb,#mb");if(!b)return;var D=b.dataset;
  if(D.size){sel.size=D.size;saveSel();applySize();$("err").textContent=""}
  else if(D.qty){sel.qty=Math.max(1,Math.min(10,sel.qty+ +D.qty));saveSel();applySize()}
  else if(D.buy!==undefined)buy(+D.buy)
  else if(D.rm){delete cart[D.rm];saveCart();draw()}
  else if(D.view!==undefined)setView(+D.view)
  else if(D.nav!==undefined)setView(sel.v+ +D.nav)
  else if(D.sg!==undefined){var g=$("sg");if(g){g.open=true;g.scrollIntoView({block:"center",behavior:"smooth"})}}
  else if(D.hero!==undefined)setHero(+D.hero,true)
  else if(b.id==="mb"){var o=$("nav").classList.toggle("open");b.setAttribute("aria-expanded",o)}
  else if(b.id==="cb")openCart()
  else if(D.close!==undefined)closeCart()
});
document.addEventListener("keydown",function(e){
  if(e.key==="Escape")closeCart();
  else if(cur>=0&&(e.key==="ArrowLeft"||e.key==="ArrowRight")&&document.activeElement&&document.activeElement.closest&&document.activeElement.closest(".gmain"))setView(sel.v+(e.key==="ArrowRight"?1:-1))
});
var tx=0;
document.addEventListener("touchstart",function(e){tx=e.touches[0].clientX},{passive:true});
document.addEventListener("touchend",function(e){if(!e.target.closest("#gal"))return;var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)setView(sel.v+(dx<0?1:-1))},{passive:true});

draw();
})();
