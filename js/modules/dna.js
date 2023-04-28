const DIRECTION_STRINGS={35:"from 3' to 5'",53:"from 5' to 3'"},DNA_LETTERS=["A","T","C","G"],DNA_LIB={A:"T",T:"A",C:"G",G:"C"},RNA_LIB={A:"U",T:"A",C:"G",G:"C"},makeClearSequence=e=>{if(""===e)return;const t=e.split(/[\s\n]+/).join("");return""!==t?t.toUpperCase():void 0},checkNonDnaSymbols=e=>e.split("").every((e=>DNA_LETTERS.includes(e))),renderErrorMessage=e=>{const t=document.querySelector('[data-dna="result-container"]');t.innerHTML="";const n=document.querySelector("#error");if(!n)return void alert("There are non-DNA letters in the sequence!");const r=n.cloneNode(!0).content.querySelector('[data-dna="analysis-wrapper"]'),o=r.querySelector('[data-dna="initial"]');o.innerHTML="";e.split("").forEach((e=>{const t=document.createElement("span");t.textContent=e,DNA_LETTERS.includes(e)||t.classList.add("dna__error-letter"),o.append(t)})),t.append(r)},make35DNAStrand=e=>{const t=[];return e.split("").forEach((e=>{t.push(DNA_LIB[e])})),t.join("")},make35RNAStrand=e=>{const t=[];return e.split("").forEach((e=>{t.push(RNA_LIB[e])})),t.join("")},make53Strand=e=>e.split("").reverse().join(""),getNaOption=e=>e.querySelector('[name="na"]:checked')?e.querySelector('[name="na"]:checked').value:"dna",getDirectionOption=e=>e.querySelector('[name="direction"]:checked')?e.querySelector('[name="direction"]:checked').value:"53",copyButtonHandler=(e,t,n)=>{navigator.clipboard.writeText(e).then((()=>{t()}),(e=>{console.log(e),n()}))},renderResult=(e,t,n)=>{if(!document.querySelector("#result"))return;const r=document.querySelector('[data-dna="result-container"]');if(!r)return;r.innerHTML="";const o=document.querySelector("#result").cloneNode(!0).content.querySelector('[data-dna="result-wrapper"]');o.querySelector(".dna__result-title").textContent=`Complementary ${e.toUpperCase()} strand from ${t.split("")[0]}' to ${t.split("")[1]}':`;const a=o.querySelector('[data-dna="result"]');a.textContent=n,a.classList.add(`dna__result--${t}`);const c=o.querySelector('[data-dna="copy-button"]'),l=()=>{c.disable=!0;const e=c.textContent;c.textContent="Copied!",setTimeout((()=>{c.disable=!1,c.textContent=e}),1500)},d=()=>{console.log("error")};c.addEventListener("click",(()=>{var e,t,r;e=n,t=l,r=d,navigator.clipboard.writeText(e).then((()=>{t()}),(e=>{console.log(e),r()}))})),r.append(o)},createButtonClickHandler=(e,t)=>{const n=makeClearSequence(e.value);if(!n)return void console.log("empty");const r=(o=t).querySelector('[name="na"]:checked')?o.querySelector('[name="na"]:checked').value:"dna";var o;const a=getDirectionOption(t);if(!checkNonDnaSymbols(n))return void renderErrorMessage(n);let c,l,d;c="dna"===r?make35DNAStrand(n):make35RNAStrand(n),l=make53Strand(c),d="53"===a?l:c,renderResult(r,a,d)},initDnaComplement=()=>{const e=document.querySelector('[data-dna="parent"]');if(!e)return;const t=e.querySelector('[data-dna="input"]'),n=e.querySelector('[data-dna="button-create"]');t&&n&&n.addEventListener("click",(()=>{createButtonClickHandler(t,e)}))};export{initDnaComplement};