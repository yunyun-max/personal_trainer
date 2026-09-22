const { chromium } = require('playwright');
const SRC='file:///home/user/personal_trainer/docs/claude-desktop-guide.html';
const OUT='/home/user/personal_trainer/docs/';
const foot='<div style="font-size:8px;color:#888;width:100%;text-align:center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for (const land of [false,true]){
 const p=await b.newPage();await p.emulateMedia({media:'print',colorScheme:'light'});
 await p.goto(SRC,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 if(land){await p.evaluate(()=>document.documentElement.classList.add('ls'));
   await p.addStyleTag({content:'@page{size:A4 landscape;margin:10mm 14mm}'});}
 await p.pdf({path:OUT+(land?'claude-desktop-guide-landscape.pdf':'claude-desktop-guide.pdf'),printBackground:true,scale:0.8,preferCSSPageSize:true,
  displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:foot});
 await p.close();}
await b.close();})();
