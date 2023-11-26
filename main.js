const express=require("express");
const ejs=require("ejs");
const path=require("path");
const qrcode=require("qrcode");
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs")
app.set("views",path.join(__dirname,'view'))
app.use(express.static("public"));
app.get('/',(req,res)=>{
    res.render('index');
});
app.post('/scan',(req,res)=>{
  const inputText=req.body.text;
  qrcode.toDataURL(inputText,(err,src)=>{
    if(err) res.send("wrong");
    res.render('scan',{
     qr_code:src
    });
  });  
})
const port=process.env.port || 4000;
app.listen(port,console.log('Listening on port', port))
