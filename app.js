var express=require("express");
var superagent = require('superagent');
var cheerio = require('cheerio');
var app=express();


var jdUrl = 'http://www.jd.com';

superagent.get(jdUrl).end(function(err,sres){
	if (err) {
			return console.error(err);
		}
    var $=cheerio.load(sres.text);
    

    var data=[];
    $("#nav-2014 .dd .dorpdown-layer .item-sub").each(function(index,element){
        var head=[];
        var body=[];
        var top=[];
        var bottom=[];

    	var a=$(element).find(".item-channels a")
        a.each(function(index,ele){
        	head.push(ele.innerText.replace(">",""));
        })


        var b=$(element).find(".subitems dl");
        b.each(function(index,ele){
        	var bold = '';
        	var normal =[]

        	if(!$(ele).find("dt a").html()){
        		   bold =$(ele).find("dt a").html();
        	}else{
        		   bold=$(ele).find("dt a").html().replace("<i>&gt;</i>","")
        	}
        	 
            $(ele).find("dd a").each(function(index,el){
                normal.push($(el).html());
            })
            body.push({bold:bold,normal:normal});

        })

        var c=$(element).find(".item-brands img");
        c.each(function(index,ele){
            top.push($(ele).attr("src"));
        });

        var d=$(element).find(".item-promotions img");
        d.each(function(index,ele){
            bottom.push($(ele).attr("src"));
        });

        data.push({content:{head:head,body:body,top:top,bottom:bottom}});

    })
        console.log(JSON.stringify({data:data}));

})