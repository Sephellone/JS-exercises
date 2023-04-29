const isQ3=(e,t)=>e<=0&&t>=0,getAngle=(e,t)=>{let n=0;return n=isQ3(e,t)?Math.round(180*(2*Math.PI-Math.atan2(t,e))/Math.PI):Math.round(180*-Math.atan2(t,e)/Math.PI),n},isInside=(e,t,n)=>{const o=n.getBoundingClientRect();return e>=o.x&&e<=o.x+o.width&&t>=o.y&&t<=o.y+o.height},initRoundPhone=()=>{const e=document.querySelector('[data-round-phone="parent"]');if(!e)return;const t=e.querySelector('[data-round-phone="input"]'),n=e.querySelector('[data-round-phone="plane"]'),o=e.querySelector('[data-round-phone="round"]'),r=e.querySelector('[data-round-phone="stop"]');if(!(t&&n&&o&&r))return;let a,d,s,i,u,l,c,h,p,g,y,m;const v=e=>{Math.sqrt(Math.pow(e.clientX-s,2)+Math.pow(e.clientY-i,2))<100||(c=e.clientX-s,h=e.clientY-i,g=getAngle(c,h),y=p-g,y<0||(y>323&&(y=323),o.style.setProperty("--angle",`${y}deg`)))};o.addEventListener("mousedown",(e=>{if(a=e.target,"round"===a.dataset.roundPhone)return;d=a.dataset.roundPhone;const t=n.getBoundingClientRect();s=t.x+t.width/2,i=t.y+t.height/2,u=e.clientX-s,l=e.clientY-i,p=getAngle(u,l),document.addEventListener("mousemove",v)})),document.addEventListener("mouseup",(e=>{e.target.closest('[data-round-phone="plane"]')&&(isInside(e.clientX,e.clientY,r)&&(t.value+=d),document.removeEventListener("mousemove",v),m=4*y,o.style.setProperty("--time",`${m}ms`),o.classList.add("rotated"),setTimeout((()=>{o.classList.remove("rotated"),o.style.setProperty("--time","0"),o.style.setProperty("--angle","0")}),m))})),e.querySelector(".phones__reset").addEventListener("click",(()=>{t.value=""}))};export{initRoundPhone};