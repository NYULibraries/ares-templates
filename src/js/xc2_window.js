// Xin Calendar 2.10 (Popup-Window Core)
// Copyright 2004  Xin Yang    All Rights Reserved.

// Last Modified: 09-Jan-2006
// Web Site: yxScripts.com
// Email: m_yangxin@hotmail.com

// the following copyright display settings should remain intact all the time if you are not a licensed user
// otherwise the use of Xin Calendar 2 is illegal
// --------------------------------------
var xcCalCopyright="Copyright 2004 Xin Yang";
var xcCalHome="http://www.yxScripts.com";
var xcCopyrightDisplay="&#169;";
var xcShowCopyright=1;
// --------------------------------------

var xcCore=2;var xc_ax=new Array(),xc_fc=new Array(),xc_ef={};var xc_bg=xc_df=xc_bs=null;var xc_dw=null;var xc_dl=xc_dm=0;var xc_ca=["","100%","50%","33%","25%","20%"];var xc_fj=" CELLPADDING='0' CELLSPACING='0' BORDER='0'>";var xc_fk=" CELLPADDING='0' CELLSPACING='0' BORDER='0' ALIGN='CENTER'>";var xc_fl=" CELLPADDING='0' CELLSPACING='"+xcGridWidth+"' BORDER='0' ALIGN='CENTER'>";var xc_fn="<TABLE"+xc_fj;var xc_fo="<TABLE"+xc_fk;var xc_fp="<TABLE WIDTH='100%'"+xc_fk;var xc_fq="<TABLE WIDTH='100%'"+xc_fl;var xc_fm="</TABLE>";var xc_fh="<TR VALIGN='TOP'>";var xc_fi="<TR ALIGN='CENTER' VALIGN='MIDDLE'>";var xc_fg="</TR>";var xcCSSOpen='this.className="';var xcCSSClose='"';var xc_da="yyyymmdd";var xc_bv="E",xc_ee="R",xc_am="1",xc_ds="0";var xcNav=navigator.userAgent.toLowerCase();var xcVer=parseInt(navigator.appVersion);var xcIsMac=(xcNav.indexOf("mac")!=-1);var xcIsOpera=(xcNav.indexOf("opera")!=-1);var xcIsSafari=(xcNav.indexOf("safari")!=-1);var xcIsKon=(xcNav.indexOf("konqueror")!=-1);var xcIsIE=(!xcIsOpera&&!xcIsKon&&xcNav.indexOf("msie")!=-1);var xcIsIE4=(xcIsIE&&xcNav.indexOf("msie 4")!=-1);var xcIsIE5=(xcIsIE&&!xcIsIE4);var xcIsIE55=(xcIsIE&&xcNav.indexOf("msie 5.5")!=-1);var xcIsIE6=(xcIsIE&&xcNav.indexOf("msie 6")!=-1);var xcIsIE55up=(xcIsIE55||xcIsIE6);var xcIsIEMac=xcIsIE&&xcIsMac;var xcIsN4=(xcNav.indexOf('mozilla')!=-1&&xcNav.search(/msie|gecko|opera|spoofer|compatible|webtv|hotjava/)==-1);var xcIsN6=(xcNav.indexOf("gecko")!=-1&&!xcIsSafari);var xcIsO7=(xcIsOpera&&/opera[\/ ][789]/.test(xcNav));var xcIsK3=(xcIsKon&&xcVer>=3);var xcCalSafe=(xcIsN6||xcIsIE5&&!xcIsMac||xcIsK3||xcIsO7||xcIsSafari)&&!xcIsN4&&!xcIsIE4;var ab=new Array(),ac=new Array(),ad=new Array();var ae=new Array(),af=new Array(),ag=new Array();function xc_fu(e){if(xcIsIE||xcIsK3){xc_dl=event.screenX;xc_dm=event.screenY;event.cancelBubble=false}else if(xcIsO7){xc_dl=event.clientX;xc_dm=event.clientY;event.cancelBubble=false}else if(xcIsSafari){xc_dl=e.pageX+window.screenX;xc_dm=e.pageY+window.screenY;event.cancelBubble=false}else{xc_dl=e.screenX;xc_dm=e.screenY;document.routeEvent(e)}};function xc_ey(l){l.style.visibility="visible"};function xc_gc(l,cp){l.innerHTML=cp};function xc_cd(n){return((n<10)?"0":"")+n};function xc_bt(y,m,d){return xcWeekdayShortNames[(new Date(y,m,d)).getDay()]};function xc_cp(){var hn={};for(var i=0;i<xcMonthShortNames.length;i++){hn[xcMonthShortNames[i].toLowerCase()]=i};return hn};function xc_de(mon){if(xc_df==null){xc_df=xc_cp()};return xc_df[mon.toLowerCase()]||0};function xc_cg(){var ev={};for(var i=0;i<xcWeekdayShortNames.length-1;i++){ev[xcWeekdayShortNames[i].toLowerCase()]=i};return ev};function xc_br(day){if(xc_bs==null){xc_bs=xc_cg()};return xc_bs[day.toLowerCase()]||0};function xc_fs(je,style,fo,title){return "<"+je+" "+fo+" "+(title?"TITLE='"+title.replace(/'/g,'&#39;')+"' ":"")+(style?"CLASS='"+style+"'":"")+">"};function xc_be(style,fo,title){return xc_fs("DIV",style,fo||"",title||"")};var xc_bd="</DIV>";function xcDIV(style,cp,fo,title){return xc_be(style,fo||"",title||"")+cp+xc_bd};function xc_ff(style,cp,width,fo,title){return "<TD"+(width!=""?" WIDTH='"+width+"'":"")+">"+xcDIV(style,cp,fo||"",title||"")+"</TD>"};function xc_fb(a,b){return a.order-b.order};function xc_ck(y,m,d){return y+xc_cd(m+1)+xc_cd(d)};function xc_bx(gw){return xc_ax[gw]};function xc_cb(ir,jg,iq,fe,kd,dx,dy){var du=null;for(var i=0;i<xc_ax.length;i++){if(xc_ax[i].jz||xc_ax[i].jg==jg&&jg!=null||xcMultiCalendar==0){du=xc_ax[i];du.jz=false;break}};if(du==null){du=new xc_av(xc_ax.length);xc_ax[xc_ax.length]=du}else{du.iu()};du.cn=xc_ef[ir]||{};du.jg=jg||null;du.iq=iq||jg;du.fe=fe||"";du.kd=kd;du.dx=dx||0;du.dy=dy||0;return du};function xc_eg(ir,hi,bd,value,hk){if(typeof(xc_ef[ir])=="undefined"){xc_ef[ir]={}};if(typeof(xc_ef[ir][hi])=="undefined"){xc_ef[ir][hi]={}};if(hk==0){xc_ef[ir][hi][bd]=value}else if(hk==1){if(typeof(xc_ef[ir][hi][bd])=="undefined"){xc_ef[ir][hi][bd]=new Array()};xc_ef[ir][hi][bd][xc_ef[ir][hi][bd].length]=value}else if(hk==2){if(typeof(xc_ef[ir][hi][bd])=="undefined"){xc_ef[ir][hi][bd]=""};xc_ef[ir][hi][bd]+=value}};function aj(f){var ec=f||xcDateFormat;ec=ec.replace(/\\/g,'\\\\');ec=ec.replace(/\//g,'\\\/');ec=ec.replace(/\[/g,'\\\[');ec=ec.replace(/\]/g,'\\\]');ec=ec.replace(/\(/g,'\\\(');ec=ec.replace(/\)/g,'\\\)');ec=ec.replace(/\{/g,'\\\{');ec=ec.replace(/\}/g,'\\\}');ec=ec.replace(/\</g,'\\\<');ec=ec.replace(/\>/g,'\\\>');ec=ec.replace(/\|/g,'\\\|');ec=ec.replace(/\*/g,'\\\*');ec=ec.replace(/\?/g,'\\\?');ec=ec.replace(/\+/g,'\\\+');ec=ec.replace(/\^/g,'\\\^');ec=ec.replace(/\$/g,'\\\$');ec=ec.replace(/dd/gi,'\\d\\d');ec=ec.replace(/mm/gi,'\\d\\d');ec=ec.replace(/yyyy/gi,'\\d\\d\\d\\d');ec=ec.replace(/yy/gi,'\\d\\d');ec=ec.replace(/day/gi,'\\w\\w\\w');ec=ec.replace(/mon/gi,'\\w\\w\\w');ec=ec.replace(/hr/gi,'\\d\\d');ec=ec.replace(/mi/gi,'\\d\\d');ec=ec.replace(/am/gi,'\\w\\w');return ec};function xc_ce(f){if(xc_bg==null){xc_bg=new RegExp('^'+aj(f)+'$')};return xc_bg};function xc_cs(date,ec){var y,m,d,aa=ec||xcDateFormat;var ke=aa.search(/yyyy/i);var hd=aa.search(/mm/i);var hc=aa.search(/mon/i);var dw=aa.search(/dd/i);y=date.substring(ke,ke+4)-0;if(hd!=-1){m=date.substring(hd,hd+2)-1}else{m=xc_de(date.substring(hc,hc+3))-0};d=date.substring(dw,dw+2)-0;return new Array(y,m,d)};function xc_cf(y,m,d,ec){var aa=ec||xcDateFormat;aa=aa.replace(/yyyy/i,y);aa=aa.replace(/mm/i,xc_cd(m+1));aa=aa.replace(/MON/,xcMonthShortNames[m].toUpperCase());aa=aa.replace(/mon/i,xcMonthShortNames[m]);aa=aa.replace(/dd/i,xc_cd(d));aa=aa.replace(/DAY/,xc_bt(y,m,d).toUpperCase());aa=aa.replace(/day/i,xc_bt(y,m,d));return aa};function xc_fv(date,ed,ee){if(date==""){return ""};var hv=xc_cs(date,ed);return xc_cf(hv[0],hv[1],hv[2],ee)};function xc_ct(y){var kh=y+"";return xcYearDigits[kh.charAt(0)]+xcYearDigits[kh.charAt(1)]+xcYearDigits[kh.charAt(2)]+xcYearDigits[kh.charAt(3)]};function xc_av(gw){this.gw=gw;this.jg=null;this.iq=null;this.fe="";this.kd="";this.dx=0;this.dy=0;this.gq=null;this.kc="";this.kb=null;this.jo=0;this.kf=0;this.month=0;this.date="";this.jz=false;this.gz="";this.ch=0;this.cf=0;this.cd=0;this.ce=0;this.cg=0;this.cn={};this.gd=xc_cc;this.ia=xc_ed;this.ix=xc_ex;this.bh=xc_ak;this.aq=xc_ag;this.ci=xc_ba;this.ej=xc_bj;this.ek=xc_bk;this.iz=xc_fd;this.hq=xc_dk;this.hp=xc_dj;this.cl=xc_dh;this.iu=xc_ek;this.it=xc_ei;this.cj=xc_bb;this.gc=xcGet;this.bf=xc_ai;this.ao=xc_ae;this.jx=xc_fw;this.bi=xc_al;this.ar=xc_ah;this.iw=xc_en;this.bg=xc_aj;this.ap=xc_af;this.bw=xc_aw;this.bm=xc_aq;this.bz=xc_az();this.br=xc_at;this.by=xc_ay;this.bv=xc_au;this.bk=xc_ao;this.bl=xc_ap;this.eq=xc_bq;this.bq=xc_as;this.bp=xc_ar;this.am=xc_ab;this.an=xc_ac};function xc_cc(hi,bd){return typeof(this.cn[hi])!="undefined"?this.cn[hi][bd]||null:null};function xc_bj(){return false};function xc_bk(date){return false};function xc_fd(){var gh=null;for(var i=0;i<xc_fc.length;i++){gh=xc_fc[i](this);if(gh){break}};return gh};function xc_ba(ff){};function xc_dk(){return ""};function xc_dj(){return ""};function xc_dh(){return ["",1]};function xc_ak(){};function xc_ag(){};function xc_ed(){var dx=this.dx+xc_dl,dy=this.dy+xc_dm;this.kc="xc"+(new Date()).getTime();if(this.kb&&typeof(this.kb.closed)!= "undefined"&&!this.kb.closed){this.kb.moveTo(dx,dy);this.kb.xc_et(null,this.kc,escape(this.kd));this.kb.focus()}else{this.kb=window.open(xcWindowTemplate+"?id="+this.kc+"&title="+escape(this.kd),this.kc,"toolbar=0,width="+xcWindowWidth+",height="+xcWindowHeight+",left="+dx+",top="+dy)}};function xc_ex(){var dv="",hz=null,bx=xc_ce(),bo="";this.bf();bo=this.ao(this.gc()||this.fe);if(this.gz==""){this.gz=bo?bo:getCurrentDate()};if(bo!=""&&bx.test(bo)){var ip=xc_cs(bo);hz=new Date(ip[0],ip[1],ip[2])}else{hz=new Date()};dv=xc_ck(hz.getFullYear(),hz.getMonth(),hz.getDate());this.kf=hz.getFullYear();this.month=hz.getMonth();this.ci(0);if(this.kf!=hz.getFullYear()||this.month!=hz.getMonth()){hz=new Date(this.kf,this.month,1);dv=""};xc_gc(this.gq,this.br()+this.bk(dv)+this.bq());this.bh();xc_ey(this.gq);this.aq()};function xc_ek(){this.cj();this.jg=null;this.iq=null;this.fe="";this.dx=0;this.dy=0;this.gq=null;this.kc="";this.kf=0;this.month=0;this.date="";this.jz=false;this.gz="";this.ch=0;this.cf=0;this.cd=0;this.ce=0;this.cg=0;this.cn={}};function xc_ei(){this.cj();this.jz=true};function xc_bb(){if(this.jo){clearTimeout(this.jo);this.jo=0}};function xc_aj(){};function xc_af(){};function xc_en(){var date=new Date(this.kf,this.month,1);var dv="",ak=null,bx=xc_ce(),bo="";this.bf();bo=this.ao(this.gc()||this.gz||this.fe);if(bo!=""&&bx.test(bo)){var ip=xc_cs(bo);ak=new Date(ip[0],ip[1],ip[2])}else{ak=new Date()};dv=xc_ck(ak.getFullYear(),ak.getMonth(),ak.getDate());this.bg();xc_gc(this.gq,this.br()+this.bk(dv)+this.bq());xc_ey(this.gq);this.ap()};function xc_ai(){beforeGetDateValue(this.iq,this.jg,this.gw)};function xc_ae(date){return afterGetDateValue(this.iq,this.jg,date,this.gw)};function xc_ch(fp){return fp?getDateValue(fp):""};function xcGet(){return xc_ch(this.iq)||xc_ch(this.jg)};function xc_al(date){return beforeSetDateValue(this.iq,this.jg,date,this.gw)};function xc_ah(date){afterSetDateValue(this.iq,this.jg,date,this.gw)};function xc_fw(date){if(this.jg){setDateValue(this.jg,date)}};function xc_bq(style,cp,width,fo){return xc_ff(style,cp,width,fo)};function xc_ab(){return ""};function xc_ac(){return ""};function xc_aw(){return xc_fn+xc_fh+"<TD>"+this.am()+xc_be(xcCSSPanel)+(xcIsIEMac?xc_fn+xc_fh+"<TD>":"")};function xc_aq(){return(xcIsIEMac?"</TD>"+xc_fg+xc_fm:"")+xc_bd+this.an()+"</TD>"+xc_fg+xc_fm};function xc_eu(id){var du=xc_by(id);if(xcAutoHide&&du){du.jo=setTimeout("xc_cv("+du.gw+")",xcAutoHide)}};function xc_ej(id){var du=xc_by(id);if(xcAutoHide&&du){du.cj()}};function xc_di(df,dc,de,fn,fl,fm){var s="";if(df||fn){s+=(xcIsIE55up&&!xcIsMac)?" onmouseenter='":" onmouseover='";if(df){s+=xcCSSOpen+df+xcCSSClose+";"};if(fn){s+=fn};s+="' "};if(dc){s+=" onmousedown='"+xcCSSOpen+dc+xcCSSClose+"' "};if(fl){s+=" onclick='"+fl+"' "};if(de||fm){s+=(xcIsIE55up&&!xcIsMac)?" onmouseleave='":" onmouseout='";if(de){s+=xcCSSOpen+de+xcCSSClose+";"};if(de){s+=fm};s+="' "};return s};function xc_an(gw){var ii="xc_dr("+gw+",-1)",hu="xc_dr("+gw+",1)";var ic="xc_dq("+gw+",-1)",hr="xc_dq("+gw+",1)";var bc="",bb="";if(xcArrowSwitch[0]==1){var az=xcCSSArrowYearPrev,ay=xcCSSArrowYearNext;bc=xc_ff(az[0],xcArrowYear[0],"",xc_di(az[1],az[2],az[0],"",ii,""));bb=xc_ff(ay[0],xcArrowYear[1],"",xc_di(ay[1],ay[2],ay[0],"",hu,""))};if(xcArrowSwitch[1]==1){var ax=xcCSSArrowMonthPrev,aw=xcCSSArrowMonthNext;bc+=xc_ff(ax[0],xcArrowMonth[0],"",xc_di(ax[1],ax[2],ax[0],"",ic,""));bb=xc_ff(aw[0],xcArrowMonth[1],"",xc_di(aw[1],aw[2],aw[0],"",hr,""))+bb};return [bc,bb]};function xc_au(){var yy=xcYearPrefix+xc_ct(this.kf)+xcYearSuffix,mm=xcMonthPrefix+xcMonthNames[this.month]+xcMonthSuffix;return xc_ff(xcCSSHead,xcHeadTagOrder==1?mm+xcHeadSeparator+yy:yy+xcHeadSeparator+mm,xcHeadTagAdjustment==1?"100%":"")};function xc_ay(){var ba=["",""];if(xcArrowPosition==0){ba=xc_an(this.gw)};s=xc_be(xcCSSHeadBlock)+(xcHeadTagAdjustment==1?xc_fp:xc_fo)+xc_fi;s+=ba[0];s+=this.bv();s+=ba[1];s+=xc_fg+xc_fm+xc_bd;return s};function xc_az(){var s=xc_be(xcCSSWeekdayBlock)+xc_fq+xc_fh;for(var i=xcWeekStart;i<xcWeekStart+7;i++){s+=xc_ff(xcCSSWeekday,xcWeekdayDisplay[i],"")};s+=xc_fg+xc_fm+xc_bd;return s};function xc_at(){return this.bw()+this.by()+this.bz};function xc_ap(hk,dv){var s="",gw=this.gw;if(hk==xc_ee){var bn='this.title="'+xcCalCopyright+'"';var bt='window.open("'+xcCalHome+'")';s=this.eq(ac["on"],xcCopyrightDisplay,"",xc_di(ac["hx"],ac["fi"],ac["on"],bn,bt,""))}else if(hk==xc_bv){s=this.eq(xcCSSDayEmpty,xcDayContents[0],"")}else{var ej=this.ej(),cw=this.iz();var fn=this.hq(),fm=this.hp(),ah=this.cl();var fl=ah[0]+(ah[1]?"xc_ec("+gw+",\""+this.date+"\");":"");var ca=null,cb=null,cc=null,cd=null;if(ej){cd=hk==xc_am?ab:ae;if(cw){ca=cw[1].split(":");cb=hk==xc_am?ca[0]:ca[1];cc=hk==xc_am?ad:ag;s=this.eq(cb||cc["hw"]||cd["hw"]||ab["hw"],xcDayContentsDisabled[this.cd],"")}else{s=this.eq(cd["hw"]||ab["hw"],xcDayContentsDisabled[this.cd],"")}}else if(dv==this.date&&xcShowCurrentDate){cc=hk==xc_am?ac:af;cd=ac;s=this.eq(cc["on"]||cd["on"],xcDayContentsCurrent[this.cd],"",xc_di(cc["hx"]||cd["hx"],cc["fi"]||cd["fi"],cc["on"]||cd["on"],fn,fl,fm))}else if(cw){ca=cw[0].split(":");cb=hk==xc_am?ca[0]:ca[1];cc=hk==xc_am?ad:ag;cd=hk==xc_am?ab:ae;s=this.eq(cb||cc["on"]||cd["on"],xcDayContents[this.cd],"",xc_di(cc["hx"]||cd["hx"],cc["fi"]||cd["fi"],cb||cc["on"]||cd["on"],fn,fl,fm))}else{cc=hk==xc_am?ab:ae;cd=ab;s=this.eq(cc["on"]||cd["on"],xcDayContents[this.cd],"",xc_di(cc["hx"]||cd["hx"],cc["fi"]||cd["fi"],cc["on"]||cd["on"],fn,fl,fm))}};return s};function xc_ao(dv){var dayOffset=0,er=1,fr=(new Date(this.kf,this.month,1)).getDay();var jh=new Date(this.kf,this.month+1,0),ha=jh.getDate();var ic=new Date(this.kf,this.month,0),ih=ic.getFullYear(),ig=ic.getMonth(),ib=ic.getDate();var hr=new Date(this.kf,this.month+1,1),ht=hr.getFullYear(),hs=hr.getMonth();if(xcWeekStart>0&&fr==0){fr=7};var s=xc_be(xcCSSDayBlock)+xc_fq;for(var i=0;i<6;i++){this.cg=i;s+=xc_fh;for(var j=xcWeekStart;j<xcWeekStart+7;j++){this.ce=j;this.date="";if(i==5&&j==xcWeekStart+6&&xcShowCopyright){s+=this.bl(xc_ee)}else if(i*7+j<fr||er>ha){if(xcShowPrevNextMonth&&i*7+j<fr){dayOffset=i*7+j-fr+1;this.ch=ih;this.cf=ig;this.cd=ib+dayOffset;this.date=xc_ck(this.ch,this.cf,this.cd);s+=this.bl(xc_ds,dv)}else if(xcShowPrevNextMonth&&er>ha){this.ch=ht;this.cf=hs;this.cd=(er++)-ha;this.date=xc_ck(this.ch,this.cf,this.cd);s+=this.bl(xc_ds,dv)}else{s+=this.bl(xc_bv)}}else{this.ch=this.kf;this.cf=this.month;this.cd=er++;this.date=xc_ck(this.ch,this.cf,this.cd);s+=this.bl(xc_am,dv)}};s+=xc_fg};s+=xc_fm+xc_bd;return s};function xc_ar(){var s="",fy=0,ga=xcCSSFootToday,ft=xcCSSFootClear,fs=xcCSSFootBack,fu=xcCSSFootClose,fx=xcCSSFootReset;var fz=xcFootTagSwitch.concat(xcFootButtonSwitch);for(var i=0;i<fz.length;i++){if(fz[i]){fy++}};if(fy>0){var gw=this.gw,ju=ge(new Date()),fe=ge(toJSDate(this.fe)),gz=ge(toJSDate(this.gz));var jv="xc_ec("+gw+",\""+xc_fv(getCurrentDate(),xcDateFormat,xc_da)+"\")",ck="xc_bc("+gw+")",be="xc_er("+gw+")",cm="xc_cv("+gw+")",iv="xc_el("+gw+")";var ai=[{"order":fz[0],"fg":xcFootTags[0],"cb":jv,"jw":"Today is "+ju,"ds":ga[0],"dt":ga[1],"dr":ga[2]},{"order":fz[1],"fg":xcFootTags[1],"cb":ck,"jw":"Clear the date input","ds":ft[0],"dt":ft[1],"dr":ft[2]},{"order":fz[2],"fg":xcFootTags[2],"cb":be,"jw":"Scroll to "+gz,"ds":fs[0],"dt":fs[1],"dr":fs[2]},{"order":fz[3],"fg":xcFootTags[3],"cb":cm,"jw":"Close the calendar","ds":fu[0],"dt":fu[1],"dr":fu[2]},{"order":fz[4],"fg":xcFootTags[4],"cb":iv,"jw":"Pick the default date of "+fe,"ds":fx[0],"dt":fx[1],"dr":fx[2]},{"order":fz[5],"fg":ju,"cb":jv,"jw":"Today","ds":ga[0],"dt":ga[1],"dr":ga[2]},{"order":fz[6],"fg":gz,"cb":be,"jw":"Scroll to this date","ds":fs[0],"dt":fs[1],"dr":fs[2]},{"order":fz[7],"fg":fe,"cb":iv,"jw":"Pick the default date","ds":fx[0],"dt":fx[1],"dr":fx[2]}];for(var i=0;i<xcFootButtonSwitch.length;i++){ai[ai.length] ={"order":xcFootButtonSwitch[i],"fg":typeof(xcFootButtons[i])=="function"?xcFootButtons[i](this.jg,this.iq,this.fe,this.gz,this.gw):xcFootButtons[i],"cb":xcFootButtonLinks[i]==null?"":"xc_bz("+gw+","+i+")","jw":"","ds":xcCSSFootOther[i][0],"dt":xcCSSFootOther[i][1],"dr":xcCSSFootOther[i][2]}};var fw=ai.sort(xc_fb);var ba=["",""];if(xcArrowPosition==1){ba=xc_an(gw)};w=xcFootTagAdjustment==1?xc_ca[fy>5?5:fy]:"";s+=xc_be(xcCSSFootBlock)+(xcFootTagAdjustment==0?xc_fo:xc_fp)+xc_fi;s+=ba[0];for(var i=0;i<fw.length;i++){if(fw[i].order!=0){s+=xc_ff(fw[i].ds,fw[i].fg,w,xc_di(fw[i].dt,fw[i].dr,fw[i].ds,"",fw[i].cb,""),fw[i].jw)}};s+=ba[1];s+=xc_fg+xc_fm+xc_bd};return s};function xc_as(){return this.bp()+this.bm()};function xc_dr(gw,dy){var du=xc_bx(gw);du.kf+=dy;du.ci(dy);du.iw()};function xc_dq(gw,dm){var du=xc_bx(gw);du.month+=dm;if(du.month<0){du.month=11;du.kf--};if(du.month>11){du.month=0;du.kf++};du.ci(dm);du.iw()};function xc_bc(gw){var du=xc_bx(gw);du.bi("");du.jx("");du.ar("");du.gz="";if(!xcStickyMode){xc_cv(gw)}else{du.iw()}};function xc_ec(gw,date){var du=xc_bx(gw);var eo=xc_cs(date,xc_da);du.kf=eo[0];du.month=eo[1];if(du.ek(date)){du.iw();return};var bo=du.bi(xc_fv(date,xc_da,xcDateFormat));du.jx(bo);du.ar(bo);du.gz=bo;if(!xcStickyMode){xc_cv(gw)}else{du.iw()}};function xc_er(gw){var du=xc_bx(gw),d=xc_cs(du.gz||getCurrentDate());du.kf=d[0];du.month=d[1];du.iw()};function xc_el(gw){var du=xc_bx(gw),d=xc_cs(xc_ce().test(du.fe)?du.fe:getCurrentDate());du.kf=d[0];du.month=d[1];xc_ec(gw,xc_ck(d[0],d[1],d[2]))};function xc_cv(gw){var du=xc_bx(gw);try{du.kb.close();du.it();window.focus()}catch(fk){}};function xc_by(kc){for(var gw in xc_ax){if(xc_ax[gw].kc==kc){return xc_ax[gw]}};return null};function xc_cy(gq,kc){var du=xc_by(kc);if(du){du.gq=gq;du.ix()}};function xc_bz(gw,i){var du=xc_bx(gw),fv=xcFootButtonLinks[i];fv(du.jg,du.iq,du.fe,du.gz,gw);if(!xcStickyMode){xc_cv(gw)}else{du.iw()}};function showCalendar(ir,jg,iq,fe,kd,dx,dy){if(!xcCalSafe){return};var du=xc_cb(ir,jg,iq,fe,kd,dx,dy);du.cj();du.ia()};function toCalendarDate(date){return xc_cf(date.getFullYear(),date.getMonth(),date.getDate())};var toCalDate=toCalendarDate;function toJSDate(date){var bx=xc_ce();if(bx.test(date)){var d=xc_cs(date);return(new Date(d[0],d[1],d[2]))}else{return(new Date())}};function getCurrentDate(){return toCalendarDate(new Date())};function ge(date){return date.getFullYear()+"-"+xc_cd(date.getMonth()+1)+"-"+xc_cd(date.getDate())};function checkDate(date){if(date){var bx=xc_ce();if(bx.test(date)){return 0}else{return 1}}else{return 2}};function compareDates(dz,ea){var bx=xc_ce();var d1=getDateNumbers(bx.test(dz)?dz:getCurrentDate()).join("");var d2=getDateNumbers(bx.test(ea)?ea:getCurrentDate()).join("");return(d1==d2?0:d1>d2?1:-1)};function getDateNumbers(date){var bx=xc_ce();if(bx.test(date)){var d=xc_cs(date);return new Array(xc_cd(d[0]),xc_cd(d[1]+1),xc_cd(d[2]))}else{return new Array("","","")}};var getNumbers=getDateNumbers;function beforeGetDateValue(iq,jg,gw){};function afterGetDateValue(iq,jg,date,gw){return date};function getDateValue(fp){return fp.value};function beforeSetDateValue(iq,jg,date,gw){return date};function afterSetDateValue(iq,jg,date,gw){};function setDateValue(fp,date){fp.value=date};function xc_eh(){if(xcIsN6){document.captureEvents(Event.MOUSEMOVE)};document.onmousemove=xc_fu;document.body.onmousemove=null;if(xc_dw){xc_dw()}};if(xcCalSafe){xc_ew();xc_dw=window.onload?window.onload:function(){};window.onload=xc_eh;var hj=xcMods.sort(xc_fb);for(var i=0;i<hj.length;i++){if(hj[i].order!=0){document.write("<scr"+"ipt language='javascript' src='"+xcModPath+hj[i].script+"' type='text/javascript'><\/scr"+"ipt>")}}};function xc_ew(){var ex=xcCSSDay,es=xcCSSDayCurrent,ey=xcCSSDayOther,fb=xcCSSDaySpecial;ab["on"]=ex[0];ab["hx"]=ex[1];ab["fi"]=ex[2];ab["hw"]=ex[3];ac["on"]=es[0];ac["hx"]=es[1];ac["fi"]=es[2];if(typeof(xcCSSVersion)=="undefined"){ad["on"]=fb[0];ad["hx"]="";ad["fi"]="";ad["hw"]=fb[1];ae["on"]=ey[0];ae["hx"]=ex[1];ae["fi"]=ex[2];ae["hw"]=ey[1];af["on"]=es[0];af["hx"]="";af["fi"]="";ag["on"]="";ag["hx"]="";ag["fi"]="";ag["hw"]=""}else if(xcCSSVersion=="2.9"){var ez=xcCSSDayOtherCurrent,fa=xcCSSDayOtherSpecial;ad["on"]=fb[0];ad["hx"]=fb[1];ad["fi"]=fb[2];ad["hw"]=fb[3];ae["on"]=ey[0];ae["hx"]=ey[1];ae["fi"]=ey[2];ae["hw"]=ey[3];af["on"]=ez[0];af["hx"]=ez[1];af["fi"]=ez[2];ag["on"]=fa[0];ag["hx"]=fa[1];ag["fi"]=fa[2];ag["hw"]=fa[3]}};
