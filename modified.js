var fs=require("fs");
var readline = require('readline');

var Asian_Countries= ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
"Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam"];



 var rl = readline.createInterface({
   input: fs.createReadStream('Indicators.csv')

 });
 var outstream=fs.createWriteStream('life_expectancy_male_female.json');
 var outstream1=fs.createWriteStream('total_life_expectancy.json');
 outstream.readable=true;
 outstream.writable=true;
 outstream1.readable=true;
 outstream1.writable=true;

var countryIndex,
IndicatorNameIndex,
yearIndex;
 var headers=[];
 var obj={};
 var obj1=[];
 var obj2=[];
 var arr=[];
   var count=0;
   var male;
   var female;
   function First(countryName,indicator,year,values)
 {
   this.countryName =countryName;
   this.indicator=indicator;
   this.year=year;
   this.values=values;
 };
 function Second(year,values)
{
 this.year=year;
 this.values=values;
};
 rl.on('line', function (line) {
 //  console.log('Line from file:', line+"\n");

 if(count===0)
 {

   headers=line.split(",");
  countryIndex  =headers.indexOf("CountryName");
  countrycode=headers.indexOf("CountryCode");
    IndicatorNameIndex=headers.indexOf("IndicatorName");
    indicatorcode=headers.indexOf("IndicatorCode");
    yearIndex=headers.indexOf("Year");
    valueIndex=headers.indexOf("Value");

   count++;
 console.log(headers);
  //outstream.write("[");
//  outstream1.write("[");
 }
 else {
   var content1=[];

  var content=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  content.forEach(function(string)
  {
  content1.push(string.replace(/['"]+/g, ''));

  /*var country=content1.splice(0,1);
  var indicator= content1.splice(2,1);
  var year=content1.splice(4,1);
  var value=content1.splice(5,1);*/``
  });


for(var i=0;i<Asian_Countries.length;i++)
{
 if(content1[countryIndex]===Asian_Countries[i])
 {
   if((content1[yearIndex]<=2015)&&(content1[yearIndex]>=1960)&&(content1[IndicatorNameIndex]==='Life expectancy at birth, male (years)')||(content1[IndicatorNameIndex]==='Life expectancy at birth, female (years)'))
   {
     var value1 = new Second(content1[yearIndex],content1[valueIndex]);

             arr.push(value1);
            //console.log(arr);
  }
   else
    {

     if((content1[yearIndex]<=2015)&&(content1[yearIndex]>=1960)&&(content1[IndicatorNameIndex]==="Life expectancy at birth, total (years)"))
     {


        var value = new First(content1[countryIndex],content1[IndicatorNameIndex],content1[yearIndex],content1[valueIndex]);
         //console.log(value);
        obj1.push(value);

      }


      }

    }

  }
}
}).on('close', () => {
  var arr1=[];
  for (var i = 0; i < arr.length; i++) {
    if(i%2==0)
    {
      female=arr[i].values;


    }
    else {

      male=arr[i].values;

    }

    if((i+1)%2===0)
    {

		//console.log(female);
		//console.log(i);
		//console.log(male);
      arr1.push({"Year":arr[i].year,"Female":female,"Male":male});

    //console.log(arr1);
    }
}
  outstream.write(JSON.stringify(arr1));
for(var p=0;p<Asian_Countries.length;p++)
{
  //console.log("first for");
  var cname=Asian_Countries[p];
  var ccount=0;
  var ccount1=0;
  //console.log(obj1.length);
  for(var q=0;q<obj1.length;q++)
  {
  //  console.log("second for");
    if(cname===obj1[q].countryName)
    {
      //console.log("hi");
        //console.log("values "+ obj1[q].values);
      ccount=ccount+parseFloat(obj1[q].values);
      ccount1++;
    }
  }
  //console.log(cname);
  //console.log(parseFloat(ccount));
  //ccount=ccount/15;

  obj2.push({"countryName":cname,"value":parseFloat(ccount)/ccount1});
}
var obj3=[];
var obj4=[];
var obj5=[];
obj3=obj2.sort(function(a, b) {
    return parseFloat(a.value) - parseFloat(b.value);
});
  obj4=obj3.reverse();
  //outstream.write(JSON.stringify(obj));
  for(var i=0;i<5;i++)
  {
    obj5[i]=obj4[i];
 }
 //outstream.write(JSON.stringify(obj));
 outstream1.write(JSON.stringify(obj5));
 //outstream1.write("\n");
 //fs.writestream('total_life_expectancy.json', JSON.stringify(obj1) , 'utf-8');
 //console.log(obj);

   //console.log("hi");

 console.log(obj5);
 process.exit(0);
});

console.log("finished");
