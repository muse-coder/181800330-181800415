﻿var json = [];//json数组

function setJson()
{   
   
    var data = localStorage.getItem("str");
    var teaCnt = 0;
    var teacherIndex = new Array();//获得教师位置下标
    var teacherPatt = /导师：/g;
    var block = new Array();//块数组
    
    while(teacherPatt.test(data) == true){
       teacherIndex[teaCnt++] = teacherPatt.lastIndex - 3; 
    }

    //将data数据按导师划分成不同块
    //若只有一块这默认放置block[0]
    if(teacherIndex.length < 1){
        block[0] = data;
    }else{
        for(var i = 0; i < teacherIndex.length; i++){
            block[i] = '';
            var last = i + 1 == teacherIndex.length? data.length : teacherIndex[i + 1];
            for(var j = teacherIndex[i]; j < last; j++){
                block[i] += data[j];
            }
        }
    }

   
    
    for(var k = 0; k < block.length; k++){
        //导师节点
        json[k] = {};
        json[k].name = block[k].match(/(?<=导师：).*/) + '';//name属性
        console.log(json[k].name);
        json[k].code = json[k].name;
        json[k].icon = "icon-th";
        json[k].child = [];
        var count = 0;//确定子节点
        //分不同类学生节点

        //博士生
        if(/级博士生/.test(data)){
            //博士生节点
            var doc = {};
            doc.name = "博士生";
            doc.code =json[k].code + doc.name;
            doc.icon = "icon-minus-sign";
            doc.parentCode = json[k].code;
            doc.child = [];
            var docArray = block[k].match(/\d{4}级博士生\：.*/g);
           // console.log(docArray);

            //分不同级博士生
            for(var i = 0; i < docArray.length; i++){
                
                var year = {};
                year.name = docArray[i].match(/\d{4}/) + '';
               // console.log(year.name);
                year.code = doc.code + year.name;
                year.icon = "icon-minus-sign";
                year.parentCode = doc.code;
                year.child = [];

                //学生名节点
                var stuName = docArray[i].match(/(?<=级博士生：).*/) + '';
                console.log(stuName);
                var stuNameArray = stuName.split("、");
                //console.log(stuNameArray);
                //同级不同学生
                for(var j = 0; j < stuNameArray.length; j++){
                    var stu = {};
                    stu.name = stuNameArray[j];
                    stu.code = year.code + stu.name;
                    stu.icon = "";
                    stu.parentCode = year.code;
                    stu.child = [];
                    var cnt=0;
                    var reg1=new RegExp(("(?<="+stu.name+"：).*"));
                    var skill=data.match(reg1)+'';
                    if(skill!='null'){
                        var attribute1={};
                        attribute1.name="工作经历或科研方向";
                        attribute1.code=stu.code+attribute1.name;
                        attribute1.icon="";
                        attribute1.parentCode=stu.code;
                        attribute1.child=[];
                        
                        var skillArray=skill.split("、");
                        for(var p=0;p<skillArray.length;p++){
                            var newskill={};
                            newskill.name=skillArray[p];
                            newskill.code=attribute1.code+newskill.name;
                            newskill.icon="";
                            newskill.parentCode=attribute1.code;
                            newskill.child=[];
                            attribute1.child[p]=newskill;
                        }                     
                        stu.child[cnt++]=attribute1; 
                    }
                    var reg2=new RegExp(("(?<="+stu.name+"的联系方式：).*"));
                    var message=data.match(reg2)+'';
                    if(message!='null'){
                        var attribute2={};
                        attribute2.name="联系方式";
                        attribute2.code=stu.code+attribute2.name;
                        attribute2.icon="";
                        attribute2.parentCode=stu.code;
                        attribute2.child=[];
                        var messageArray=message.split("、");
                        for(var m=0;m<messageArray.length;m++){
                           var mes={};
                           mes.name=messageArray[m];
                           mes.code=attribute2.code+mes.name;
                           mes.icon="";
                           mes.parentCode=attribute2.code;
                           mes.child=[];
                           attribute2.child[m]=mes; 
                        }
                        console.log(stu.child)
                            stu.child[cnt]=attribute2;
                    } 
                 
                    //stu.child[1]=attribute2; 
                   // console.log(skill);
                    console.log(skillArray);
                    year.child[j] = stu;
                    console.log(stu.name);
                    
                }

                doc.child[i] = year;
            }
            json[k].child[count++] = doc;
        }


        //硕士生
        if(/级硕士生/.test(data)){
            //博士生节点
            var doc = {};
            doc.name = "硕士生";
            doc.code = json[k].code + doc.name;
            doc.icon = "icon-minus-sign";
            doc.parentCode = json[k].code;
            doc.child = [];
            var docArray = block[k].match(/\d{4}级硕士生\：.*/g);
          //  console.log(docArray);
//
            //分不同级博士生
            for(var i = 0; i < docArray.length; i++){
                
                var year = {};
                year.name = docArray[i].match(/\d{4}/) + '';
               // console.log(year.name);
                year.code = doc.code + year.name;
                year.icon = "icon-minus-sign";
                year.parentCode = doc.code;
                year.child = [];

                //学生名节点
                var stuName = docArray[i].match(/(?<=级硕士生：).*/) + '';
                console.log(stuName);
                var stuNameArray = stuName.split("、");
                console.log(stuNameArray);

                for(var j = 0; j < stuNameArray.length; j++){
                    var stu = {};
                    stu.name = stuNameArray[j];
                    stu.code = year.code + stu.name;
                    stu.icon = "";
                    stu.parentCode = year.code;
                    stu.child = [];
                    var cnt=0;
                    var reg1=new RegExp(("(?<="+stu.name+"：).*"));
                    var skill=data.match(reg1)+'';
                    if(skill!='null'){
                        var attribute1={};
                        attribute1.name="工作经历或科研方向";
                        attribute1.code=stu.code+attribute1.name;
                        attribute1.icon="";
                        attribute1.parentCode=stu.code;
                        attribute1.child=[];
                        
                        var skillArray=skill.split("、");
                        for(var p=0;p<skillArray.length;p++){
                            var newskill={};
                            newskill.name=skillArray[p];
                            newskill.code=attribute1.code+newskill.name;
                            newskill.icon="";
                            newskill.parentCode=attribute1.code;
                            newskill.child=[];
                            attribute1.child[p]=newskill;
                        }
                        
                    stu.child[cnt++]=attribute1; 
                    } 
                    var reg2=new RegExp(("(?<="+stu.name+"的联系方式：).*"));
                    var message=data.match(reg2)+'';
                    if(message!='null'){
                        var attribute2={};
                        attribute2.name="联系方式";
                        attribute2.code=stu.code+attribute2.name;
                        attribute2.icon="";
                        attribute2.parentCode=stu.code;
                        attribute2.child=[];
                        var messageArray=message.split("、");
                        for(var m=0;m<messageArray.length;m++){
                           var mes={};
                           mes.name=messageArray[m];
                           mes.code=attribute2.code+mes.name;
                           mes.icon="";
                           mes.parentCode=attribute2.code;
                           mes.child=[];
                           attribute2.child[m]=mes; 
                        }
                            stu.child[cnt]=attribute2;       
                    } 
                    console.log(skill);
                    console.log(skillArray);
                    year.child[j] = stu;
                    console.log(stu.name);
                    
                }

                doc.child[i] = year;
            }
            json[k].child[count++] = doc;
        }

        //本科生
        if(/级本科生/.test(data)){
            //博士生节点
            var doc = {};
            doc.name = "本科生";
            doc.code = json[k].name + doc.name;
            doc.icon = "icon-minus-sign";
            doc.parentCode = json[k].code;
            doc.child = [];
            var docArray = block[k].match(/\d{4}级本科生\：.*/g);
          //  console.log(docArray);

            //分不同级博士生
            for(var i = 0; i < docArray.length; i++){
                
                var year = {};
                year.name = docArray[i].match(/\d{4}/) + '';
               // console.log(year.name);
                year.code = doc.code + year.name;
                year.icon = "icon-minus-sign";
                year.parentCode = doc.code;
                year.child = [];

                //学生名节点
                var stuName = docArray[i].match(/(?<=级本科生：).*/) + '';
                console.log(stuName);
                var stuNameArray = stuName.split("、");
                console.log(stuNameArray);

               for(var j = 0; j < stuNameArray.length; j++){
                var stu = {};
                stu.name = stuNameArray[j];
                stu.code = year.code + stu.name;
                stu.icon = "";
                stu.parentCode = year.code;
                stu.child = [];
                var cnt=0;
                var reg1=new RegExp(("(?<="+stu.name+"：).*"));
                var skill=data.match(reg1)+'';
                if(skill!='null'){
                    var attribute1={};
                    attribute1.name="技能树";
                    attribute1.code=stu.code+attribute1.name;
                    attribute1.icon="";
                    attribute1.parentCode=stu.code;
                    attribute1.child=[];
                    
                    var skillArray=skill.split("、");
                    for(var p=0;p<skillArray.length;p++){
                        var newskill={};
                        newskill.name=skillArray[p];
                        newskill.code=attribute1.code+newskill.name;
                        newskill.icon="";
                        newskill.parentCode=attribute1.code;
                        newskill.child=[];
                        attribute1.child[p]=newskill;
                    }   
                stu.child[cnt++]=attribute1; 
                }
                var reg2=new RegExp(("(?<="+stu.name+"的联系方式：).*"));
                var message=data.match(reg2)+'';
                if(message!='null'){
                    var attribute2={};
                    attribute2.name="联系方式";
                    attribute2.code=stu.code+attribute2.name;
                    attribute2.icon="";
                    attribute2.parentCode=stu.code;
                    attribute2.child=[];
                    var messageArray=message.split("、");
                    for(var m=0;m<messageArray.length;m++){
                       var mes={};
                       mes.name=messageArray[m];
                       mes.code=attribute2.code+mes.name;
                       mes.icon="";
                       mes.parentCode=attribute2.code;
                       mes.child=[];
                       attribute2.child[m]=mes; 
                    }
                        stu.child[cnt]=attribute2;
                }  
                    console.log(skill);
                    console.log(skillArray);
                    year.child[j] = stu;
                   console.log(stu.name);
                    
                }

                doc.child[i] = year;
            }
            json[k].child[count++] = doc;
        }
        //console.log(json[k]);
   }
   
}


$(function () {
   setJson();
   //console.log(json);
   function tree(data) {
       for (var i = 0; i < data.length; i++) {
           var data2 = data[i];
           if (data[i].icon == "icon-th") {
               $("#rootUL").append("<li data-name='" + data[i].code + "'><span><i class='" + data[i].icon + "'></i> " + data[i].name + "</span></li>");
           } else {
               var children = $("li[data-name='" + data[i].parentCode + "']").children("ul");
               if (children.length == 0) {
                   $("li[data-name='" + data[i].parentCode + "']").append("<ul></ul>")
               }
               $("li[data-name='" + data[i].parentCode + "'] > ul").append(
                   "<li data-name='" + data[i].code + "'>" +
                   "<span>" +
                   "<i class='" + data[i].icon + "'></i> " +
                   data[i].name +
                   "</span>" +
                   "</li>")
           }
           for (var j = 0; j < data[i].child.length; j++) {
               var child = data[i].child[j];
               var children = $("li[data-name='" + child.parentCode + "']").children("ul");
               if (children.length == 0) {
                   $("li[data-name='" + child.parentCode + "']").append("<ul></ul>")
               }
               $("li[data-name='" + child.parentCode + "'] > ul").append(
                   "<li data-name='" + child.code + "'>" +
                   "<span>" +
                   "<i class='" + child.icon + "'></i> " +
                   child.name +
                   "</span>" +
                   "</li>")
               var child2 = data[i].child[j].child;
               tree(child2)
           }
           tree(data[i]);
       }

   }

   tree(json)


});