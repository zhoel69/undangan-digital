window.addEventListener("load", () => {
  document.getElementById("preloader").style.display="none";
});

const $ = id => document.getElementById(id);

$("coverNames").innerText = CONFIG.groomName+" & "+CONFIG.brideName;
$("coverDate").innerText = CONFIG.weddingDate;
$("groomName").innerText = CONFIG.groomFullName;
$("groomParent").innerText = CONFIG.groomParent;
$("brideName").innerText = CONFIG.brideFullName;
$("brideParent").innerText = CONFIG.brideParent;

$("akadDetail").innerHTML =
  `${CONFIG.akadDate}<br>${CONFIG.akadTime}<br>${CONFIG.akadVenue}`;
$("resepsiDetail").innerHTML =
  `${CONFIG.resepsiDate}<br>${CONFIG.resepsiTime}<br>${CONFIG.resepsiVenue}`;

$("akadMaps").href = CONFIG.akadMaps;
$("resepsiMaps").href = CONFIG.resepsiMaps;

$("bankInfo").innerHTML =
  `${CONFIG.bankName}<br>${CONFIG.accountNumber}<br>a.n ${CONFIG.accountHolder}`;

$("openBtn").addEventListener("click",()=>{
  document.querySelector(".cover").style.display="none";
  $("mainContent").style.display="block";
  document.getElementById("bgMusic").play();
});

const target = new Date(CONFIG.countdownDate).getTime();
setInterval(()=>{
  const now = new Date().getTime();
  const dist = target - now;
  const d=Math.floor(dist/(1000*60*60*24));
  const h=Math.floor((dist/(1000*60*60))%24);
  const m=Math.floor((dist/(1000*60))%60);
  const s=Math.floor((dist/1000)%60);
  $("timer").innerHTML=`${d}H ${h}J ${m}M ${s}D`;
},1000);

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("active");
  });
},{threshold:0.15});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const modal=$("modal"), modalImg=$("modalImg");
document.querySelectorAll(".gallery-img").forEach(img=>{
  img.onclick=()=>{ modal.style.display="block"; modalImg.src=img.src; };
});
$("closeModal").onclick=()=>modal.style.display="none";

function sendRSVP(){
  const name=$("rsvpName").value;
  const status=$("rsvpStatus").value;
  const msg=`Konfirmasi Kehadiran\n\nNama: ${name}\nStatus: ${status}`;
  window.open(`https://wa.me/${CONFIG.rsvpPhone}?text=${encodeURIComponent(msg)}`,"_blank");
}

const params=new URLSearchParams(window.location.search);
if(params.get("to")){
  $("guestName").innerText="Kepada Yth. "+params.get("to");
}