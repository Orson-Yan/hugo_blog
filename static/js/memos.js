var bbMemo={memos:'https://demo.usememos.com/',limit:'10',creatorId:'101',domId:'#bber',}
if(typeof(bbMemos)!=="undefined"){for(var key in bbMemos){if(bbMemos[key]){bbMemo[key]=bbMemos[key];}}}
function loadCssCode(code){var style=document.createElement('style');style.type='text/css';style.rel='stylesheet';style.appendChild(document.createTextNode(code));var head=document.getElementsByTagName('head')[0];head.appendChild(style);}
var allCSS=""
loadCssCode(allCSS);var limit=bbMemo.limit
var memos=bbMemo.memos
var page=1,offset=0,nextLength=0,nextDom='';var bbDom=document.querySelector(bbMemo.domId);var load='<div class="bb-load"><button class="load-btn button-load">加载中</button></div>'
if(bbDom){getFirstList()
meNums()
var btn=document.querySelector("button.button-load");btn.addEventListener("click",function(){btn.textContent='加载中';updateHTMl(nextDom)
if(nextLength<limit){document.querySelector("button.button-load").remove()
return}
getNextList()});}
function getFirstList(){bbDom.insertAdjacentHTML('afterend',load);var bbUrl=memos+"api/memo?creatorId="+bbMemo.creatorId+"&rowStatus=NORMAL&limit="+limit;fetch(bbUrl).then(res=>res.json()).then(resdata=>{updateHTMl(resdata.data)
var nowLength=resdata.data.length
if(nowLength<limit){document.querySelector("button.button-load").remove()
return}
page++
offset=limit*(page-1)
getNextList()});}
function getNextList(){var bbUrl=memos+"api/memo?creatorId="+bbMemo.creatorId+"&rowStatus=NORMAL&limit="+limit+"&offset="+offset;fetch(bbUrl).then(res=>res.json()).then(resdata=>{nextDom=resdata.data
nextLength=nextDom.length
page++
offset=limit*(page-1)
if(nextLength<1){document.querySelector("button.button-load").remove()
return}})}
function meNums(){var bbLoad=document.querySelector('.bb-load')
var bbUrl=memos+"api/memo/amount?userId="+bbMemo.creatorId
fetch(bbUrl).then(res=>res.json()).then(resdata=>{if(resdata.data){var allnums=''
bbLoad.insertAdjacentHTML('afterend',allnums);}})}
function updateHTMl(data){var result="",resultAll="";const TAG_REG=/#([^\s#]+?) /g,BILIBILI_REG=/<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g,NETEASE_MUSIC_REG=/<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g,QQMUSIC_REG=/<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g,QQVIDEO_REG=/<a.*?href="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g,YOUKU_REG=/<a.*?href="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g,YOUTUBE_REG=/<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;marked.setOptions({breaks:!0,smartypants:!0,langPrefix:'language-'});for(var i=0;i<data.length;i++){var bbContREG=data[i].content.replace(TAG_REG,"<span class='tag-span'>#$1</span> ")
bbContREG=marked.parse(bbContREG).replace(BILIBILI_REG,"<div class='video-wrapper'><iframe src='//player.bilibili.com/player.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>").replace(NETEASE_MUSIC_REG,"<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>").replace(QQMUSIC_REG,"<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>").replace(QQVIDEO_REG,"<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>").replace(YOUKU_REG,"<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>").replace(YOUTUBE_REG,"<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")
if(data[i].resourceList&&data[i].resourceList.length>0){var resourceList=data[i].resourceList;var imgUrl='',resUrl='',resImgLength=0;for(var j=0;j<resourceList.length;j++){var restype=resourceList[j].type.slice(0,5);if(restype=='image'){imgUrl+='<figure class="gallery-thumbnail"><img class="img thumbnail-image" src="'+memos+'o/r/'+resourceList[j].id+'/'+resourceList[j].filename+'"/></figure>'
resImgLength=resImgLength+1}
if(restype!=='image'){resUrl+='<a target="_blank" rel="noreferrer" href="'+memos+'o/r/'+resourceList[j].id+'/'+resourceList[j].filename+'">'+resourceList[j].filename+'</a>'}}
if(imgUrl){var resImgGrid=""
if(resImgLength!==1){var resImgGrid="grid grid-"+resImgLength}
bbContREG+='<div class="resimg '+resImgGrid+'">'+imgUrl+'</div></div>'}
if(resUrl){bbContREG+='<p class="datasource">'+resUrl+'</p>'}}
result+="<li class='bb-list-li'><div class='bb-div'><span class='datatime'>"+new Date(data[i].createdTs*1000).toLocaleString()+"</span><span class='datakoobai'>@koobai</span><div class='datacont'>"+bbContREG+"</div></div></li>"}
var bbBefore="<section class='bb-timeline'><ul class='bb-list-ul'>"
var bbAfter="</ul></section>"
resultAll=bbBefore+result+bbAfter
bbDom.insertAdjacentHTML('beforeend',resultAll);fetchDB()
document.querySelector('button.button-load').textContent='加载更多';window.ViewImage&&ViewImage.init('.datacont img')
window.Lately&&Lately.init({target:'.datatime'});}
function fetchDB(){var dbAPI="https://douban.edui.fun/";var dbA=document.querySelectorAll(".bb-timeline a[href*='douban.com/subject/']:not([rel='noreferrer'])")||'';if(dbA){for(var i=0;i<dbA.length;i++){_this=dbA[i]
var dbHref=_this.href
var db_reg=/^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;var db_type=dbHref.replace(db_reg,"$1");var db_id=dbHref.replace(db_reg,"$2").toString();if(db_type=='movie'){var this_item='movie'+db_id;var url=dbAPI+"movies/"+db_id;if(localStorage.getItem(this_item)==null||localStorage.getItem(this_item)=='undefined'){fetch(url).then(res=>res.json()).then(data=>{let fetch_item='movies'+data.sid;let fetch_href="https://movie.douban.com/subject/"+data.sid+"/"
localStorage.setItem(fetch_item,JSON.stringify(data));movieShow(fetch_href,fetch_item)});}else{movieShow(dbHref,this_item)}}else if(db_type=='book'){var this_item='book'+db_id;var url=dbAPI+"v2/book/id/"+db_id;if(localStorage.getItem(this_item)==null||localStorage.getItem(this_item)=='undefined'){fetch(url).then(res=>res.json()).then(data=>{let fetch_item='book'+data.id;let fetch_href="https://book.douban.com/subject/"+data.id+"/"
localStorage.setItem(fetch_item,JSON.stringify(data));bookShow(fetch_href,fetch_item)});}else{bookShow(dbHref,this_item)}}}}}
function movieShow(fetch_href,fetch_item){var storage=localStorage.getItem(fetch_item);var data=JSON.parse(storage);var db_star=Math.ceil(data.rating);var db_html="<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='"+fetch_href+"'>《"+data.name+"》</a></h4><div class='rating'><div class='rating-star allstar"+db_star+"'></div><div class='rating-average'>"+data.rating+"</div></div><time class='post-preview--date'>导演："+data.director+" / 类型："+data.genre+" / "+data.year+"</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>"+data.intro.replace(/\s*/g,"")+"</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src="+data.img+"></div>"
var db_div=document.createElement("div");var qs_href=".bb-timeline a[href='"+fetch_href+"']"
var qs_dom=document.querySelector(qs_href)
qs_dom.parentNode.replaceChild(db_div,qs_dom);db_div.innerHTML=db_html}
function bookShow(fetch_href,fetch_item){var storage=localStorage.getItem(fetch_item);var data=JSON.parse(storage);var db_star=Math.ceil(data.rating.average);var db_html="<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='"+fetch_href+"'>《"+data.title+"》</a></h4><div class='rating'><div class='rating-star allstar"+db_star+"'></div><div class='rating-average'>"+data.rating.average+"</div></div><time class='post-preview--date'>作者："+data.author+" </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>"+data.summary.replace(/\s*/g,"")+"</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src="+data.images.medium+"></div>"
var db_div=document.createElement("div");var qs_href=".bb-timeline a[href='"+fetch_href+"']"
var qs_dom=document.querySelector(qs_href)
qs_dom.parentNode.replaceChild(db_div,qs_dom);db_div.innerHTML=db_html}