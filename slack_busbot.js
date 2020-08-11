var SLACK_WEBHOOK = '***********';  // Incomig Webhook URL
var SLACK_CHANNEL = '#bus_open'; // channel名
var EMOJI_ICON = ':oncoming_bus:'; // アイコン(slackのスタンプを使っているのでお好みで)
var BOT_NAME = '三茶バスbotくん'; // BOTの名前

function scrapingS24_3_Odakyu() {  
  var url = 'https://odakyu.bus-navigation.jp/wgsys/wgp/bus.htm?tabName=signpoleTab&selectedLandmarkCatCd=&selectfiftySoundCharacter=&from=%E4%B8%89%E8%BB%92%E8%8C%B6%E5%B1%8B&fromType=1&to=&toType=&locale=ja&fromlat=&fromlng=&tolat=&tolng=&fromSignpoleKey=37922&routeLayoutCd=&bsid=2&fromBusStopCd=&toBusStopCd=&mapFlag=false&existYn=N&routeKey=&nextDiagramFlag=0&diaRevisedDate=';
  var content = UrlFetchApp.fetch(url).getContentText('UTF-8');
  var waitTime =  Parser.data(content).from('<font size="4">').to('</font>').iterate(); //待ち時間を含む部分を抽出
  return waitTime;
}

function scrapingS24_3() {  
  var url = 'http://tokyu.bus-location.jp/blsys/navi?VID=rsl&EID=nt&PRM=&SCT=1&DSMK=2343&DSN=%E4%B8%89%E8%BB%92%E8%8C%B6%E5%B1%8B&ASMK=2336&ASN=%E6%B8%8B%E8%B0%B7%E9%A7%85&FDSN=0&FASN=0&RAMK=5';
  var destList = ['渋谷駅行'];  
  var content = UrlFetchApp.fetch(url).getContentText('UTF-8');
  
  var dest = Parser.data(content).from('<dd>').to(' <em>').iterate(); //行き先を抽出
  var waitTime =  Parser.data(content).from(' <em>').to('/em></dd>').iterate(); //待ち時間を含む部分を抽出
  
  var bus = new Array()
  var busTime = new Array()
  
  for(let i = 0; i < dest.length; i++) {
    if(destList.includes(dest[i]) && waitTime[i] !== '<'){
      bus.unshift(dest[i]); //pushかunshiftかは上りor下りにより調整
      busTime.unshift(waitTime[i].substring(-1,waitTime[i].length-1));
    }
  }
  return [bus, busTime];
}

function scrapingS22_3() {  
  var url = 'http://tokyu.bus-location.jp/blsys/navi?VID=rsl&EID=nt&PRM=&SCT=1&DSMK=2343&DSN=%E4%B8%89%E8%BB%92%E8%8C%B6%E5%B1%8B&ASMK=2336&ASN=%E6%B8%8B%E8%B0%B7%E9%A7%85&FDSN=0&FASN=0&RAMK=171';
  var destList = ['渋谷駅行'];  
  var content = UrlFetchApp.fetch(url).getContentText('UTF-8');
  
  var dest = Parser.data(content).from('<dd>').to(' <em>').iterate(); //行き先を抽出
  var waitTime =  Parser.data(content).from(' <em>').to('/em></dd>').iterate(); //待ち時間を含む部分を抽出
  
  var bus = new Array()
  var busTime = new Array()
  
  for(let i = 0; i < dest.length; i++) {
    if(destList.includes(dest[i]) && waitTime[i] !== '<'){
      bus.push(dest[i]);
      busTime.push(waitTime[i].substring(-1,waitTime[i].length-1));
    }
  } 
  return [bus, busTime];
}

function scrapingS21S23_3() {  
  var url = 'http://tokyu.bus-location.jp/blsys/navi?VID=rsl&EID=nt&PRM=&SCT=1&DSMK=2343&DSN=%E4%B8%89%E8%BB%92%E8%8C%B6%E5%B1%8B&ASMK=2336&ASN=%E6%B8%8B%E8%B0%B7%E9%A7%85&FDSN=0&FASN=0&RAMK=4';
  var destList = ['渋谷駅行'];  
  var content = UrlFetchApp.fetch(url).getContentText('UTF-8');
  
  var dest = Parser.data(content).from('<dd>').to(' <em>').iterate(); //行き先を抽出
  var waitTime =  Parser.data(content).from(' <em>').to('/em></dd>').iterate(); //待ち時間を含む部分を抽出
  
  var bus = new Array()
  var busTime = new Array()
  
  for(let i = 0; i < dest.length; i++) {
    if(destList.includes(dest[i]) && waitTime[i] !== '<'){
      bus.push(dest[i]);
      busTime.push(waitTime[i].substring(-1,waitTime[i].length-1));
    }
  }
  return [bus, busTime];
}

function scrapingS82_3() {  
  var url = 'http://tokyu.bus-location.jp/blsys/navi?VID=rsl&EID=nt&PRM=&SCT=1&DSMK=2343&DSN=%E4%B8%89%E8%BB%92%E8%8C%B6%E5%B1%8B&ASMK=2336&ASN=%E6%B8%8B%E8%B0%B7%E9%A7%85&FDSN=0&FASN=0&RAMK=15';
  var destList = ['渋谷駅行'];  
  var content = UrlFetchApp.fetch(url).getContentText('UTF-8');
  
  var dest = Parser.data(content).from('<dd>').to(' <em>').iterate(); //行き先を抽出
  var waitTime =  Parser.data(content).from(' <em>').to('/em></dd>').iterate(); //待ち時間を含む部分を抽出
  
  var bus = new Array()
  var busTime = new Array()
  
  for(let i = 0; i < dest.length; i++) {
    if(destList.includes(dest[i]) && waitTime[i] !== '<'){
      bus.push(dest[i]);
      busTime.push(waitTime[i].substring(-1,waitTime[i].length-1));
    }
  }
  return [bus, busTime];
}

function outputFormat(){
  
  var t0 = scrapingS24_3_Odakyu();
  var [b1, t1_] = scrapingS24_3();
  var [b2, t2] = scrapingS22_3();
  var [b3, t3] = scrapingS21S23_3();
  var [b4, t4] = scrapingS82_3();
  
  for(var j = 0; j < (t1_.length) ; j++){
    t1_[j]=Number(t1_[j].substring(0,t1_[j].length-3))
  }
  t1_.push.apply(t1_, t0)
  t1_.sort(function(a, b){
    var a_nan = (a !== a);
    var b_nan = (b !== b);
    if (a_nan && b_nan) return 0;
    if (a_nan) return 1;
    if (b_nan) return -1;
    //ここまで来ればaもbもNaNの可能性はない
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  var b1 = [];
  var t1 = [];
  
  for (var i = 0; i < t1_.length; i++){
    b1[i] = "渋谷駅行"
    t1[i] = ( '00' + Number(t1_[i])).slice( -2 ) + "分待ち"
    
  }
  
  const date1 = new Date();
  var text = date1.toLocaleString() +  '\n三軒茶屋→渋谷駅\n-----渋24系統-----\n';
  
  for (var i = 0; i < b1.length; i++){
    text = text
    + b1[i]
    + ': '
    + t1[i] 
    + '\n';
  }
  text = text + '-----渋22系統-----\n';
  for (var i = 0; i < b2.length; i++){
    text = text
    + b2[i]
    + ': '
    + t2[i]
    + '\n';
  }
  text = text + '-----渋21, 渋23系統-----\n';
  for (var i = 0; i < b3.length; i++){
    text = text
    + b3[i]
    + ': '
    + t3[i]
    + '\n';
  }
  text = text + '-----渋82系統-----\n';
  for (var i = 0; i < b4.length; i++){
    text = text
    + b4[i]
    + ': '
    + t4[i]
    + '\n';
  }
  return text;
}

function postMessage(message, hookPoint) {
  var payload = {
    "text": message,
    "icon_emoji": EMOJI_ICON,
    "username": BOT_NAME,
    "channel": SLACK_CHANNEL
  }
  var options = {
    "method" : "POST",
    "payload" : JSON.stringify(payload),
    "headers": {
      "Content-type": "application/json",
    }
  }
  var response = UrlFetchApp.fetch(hookPoint, options);
  
  if (response.getResponseCode() == 200) {
    return response;
  }
  return false;
}

function main() {  
  var message = "検索中";
  postMessage(message, SLACK_WEBHOOK);
}

function postResult() {  
  var message = outputFormat();
  postMessage(message, SLACK_WEBHOOK);
}

function doPost(e) {
  if(e.parameter.user_id == "USLACKBOT"){
    return;
  }
  if(e.parameter.text.match(/3/)){
    main();
    postResult();
    return;
  }
}