const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 2 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '';
  if (hand === cpu) {
    judgement = '引き分け';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});



app.get("/takara",(req,res) => {
  let number = req.query.number;
  let attempt = Number(req.query.try)||0;
  console.log({number,attempt});
  const num = Math.floor( Math.random() * 100 + 1 );
  let cpu = '';
  cpu = num;

  let judgement = '';
  if (number == cpu){
    judgement = '一等，大当たりです';
  }else if (cpu - 3 >= number <= cpu +3) {
    judgement = '二等，あたりです';
    attempt += 1;
  }else if (cpu -5 >= number <= cpu +5) {
    judgement = '三等，ニアピン賞';
    attempt += 1;
  }else {
    judgement = '外れです';
  }

  const display = {
    your: number,
    cpu: cpu,
    judgement: judgement,
    attempt: attempt
  }
  res.render('takara',display);

});


app.get("/hantyo",(req,res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  let rate = win /total||1;
  
  console.log( {hand, win, total,rate});
  const num = Math.floor( Math.random() * 6 + 1 );
  let cpu = '';
  if( num == 1 ) cpu = '半';
  else if( num == 2 ) cpu = '丁';
  else if( num == 3 ) cpu = '半';
  else if( num == 4 ) cpu = '丁';
  else if( num == 5 ) cpu = '半';
  else if( num == 6 ) cpu = '丁';
 
  let judgement = '';
  if (hand === cpu) {
    judgement = 'あたりです';
    win += 1;
  } else  {
    judgement = '外れです';
  } 
  total += 1;

  

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total,
    rate: rate
  }

  res.render('hantyo',display);
})

app.listen(8080, () => console.log("Example app listening on port 8080!"));
