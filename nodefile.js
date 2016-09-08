var array1=[];
var arr=[];
var feArray=[];
var maArray=[];
var total=[];
var finalc=[];

var s=[];
var fvar;
var mvar;
var totvar;


var fs = require('fs');
var  readline = require('readline');


      lineByline = readline.createInterface({
        input :fs.createReadStream('filter.csv')
    });

    lineByline.on('line',function(line){
    var rows = line.split(",");
    array1.push(rows);

  });


  lineByline.on('close',function () {
    var a=[].concat.apply([],array1[0]);
    //console.log(a[1]);


  var t=1;
    for(var i=0;i<13704;i++)
    {
      var value=[];
      var obj={};
      value=[].concat.apply([],array1[t]);

 //console.log(value[0]);

      for(var j=0;j<6;j++)
       {
        obj[a[j]]=value[j];

      }
      arr.push(obj);
      t++;
      //console.log(JSON.stringify(obj));
    }
  //console.log(arr[0]);


    for(var i=0;i<arr.length;i++){
      if(arr[i].IndicatorName=="Life expectancy at birth female (years)"){
        feArray.push(arr[i]);
        //console.log(JSON.stringify(arr[i]));
      }
    }

    for(var i=0;i<arr.length;i++){
      if(arr[i].IndicatorName=="Life expectancy at birth male (years)"){
        maArray.push(arr[i]);
        //console.log(JSON.stringify(arr[i]));
      }
    }

for(var i=0;i<arr.length;i++)
{
    if(arr[i].IndicatorName=="Life expectancy at birth total (years)") {
      total.push(arr[i]);
    }
}
    function compare(a,b) {
  if (a.Value > b.Value)
    return -1;
  if (a.Value < b.Value)
    return 1;
  return 0;
}

for(var i=0;i<total.length;i++){
total.sort(compare);
s.push(total[i].Value);
}
//console.log(s);

for(var i=0;i<11;i++)
{
  for(var j=0;j<total.length;j++)
  {
    if(total[j].Value==s[i])
    {
      finalc[i]=total[j];
    }
  }
}
//console.log(finalc);
var disp=[];
for(var i=0;i<5;i++)
{
  var seen={};
  var uniqueCountry=finalc.filter(function(item){
    if(seen.hasOwnProperty(item.CountryName)){
      return false;
    }
    else
      {
        seen[item.CountryName]=true;
        return true
      }

  });
  disp[i]=uniqueCountry[i];
}

var totaljson=JSON.stringify(disp);
var malejson=JSON.stringify(maArray);
var femalejson=JSON.stringify(feArray);
var json1=fs.writeFile('tot.json',totaljson,function(err){
if(err){
 //console.log("error in json creation");
}
}
)
var json2=fs.writeFile('male.json',malejson,function(err){
if(err){
 //console.log("error in json creation");
}
}
)
var json3=fs.writeFile('female.json',femalejson,function(err){
if(err){
 //console.log("error in json creation");
}
}
)


});
