// 一些封装好的函数

// 将秒数转化为分钟加秒数---------------------------

function toMiniute(seconds) {

    var secStr,sec,realM,realS,realTime;

    // 把获取到的秒数转成字符串
     secStr=seconds+"";

    //  只截取前三位，隐式转换为数字
    sec=secStr.substr(0,3)-0;

    // 获得分钟和秒钟
    realM=Math.floor(sec/60);
    realS=Math.floor(sec%60);

    // 防止余数是个位数时，秒钟只显示一位
    if(realS<10){

        realS="0"+realS
    }

    // 输出格式
    realTime=realM+": "+realS

    return realTime;
}
// ------------


// 封装ajax(地址，成功函数，失败函数，同步异步(同步为false))---------------------------------------

function MyAjax(Urls,successFun,errorFun,isAsync) {
    $.ajax({
        url:Urls,
        type:"get",
        async:isAsync,
        success:function (data) {
            successFun(data);
        },
        error:function () {
            errorFun();
        }
    });
}
// ------------

// ajax
function MyAjaxPro(Urls,beforeSend,successFun,errorFun,isAsync) {
    $.ajax({
        url:Urls,
        type:"get",
        async:isAsync,
        beforeSend:function () {
            beforeSend();
        },
        success:function (data) {
            successFun(data);
        },
        error:function () {
            errorFun();
        }
    });
    
}


// 解析歌词函数（得到时间和歌词内容，只适用一部分,因为正则表达式不会）----------------

function DoLyric(Lyric) {

// 1.统计\n的个数，一个代表一句，将每一句分隔开，可以装入一个数组
    var array =[];

    // 拿到每一句话
    var strings=[];
    
    getCount(0);

    // 获取每一句歌词素材
    for (let i = 0; i < array.length-1; i++) {

        strings.push(Lyric.substring(array[i],array[i+1]));
    }

    strings.unshift(Lyric.substring(0,22));

    // 获取时间和歌词
    for (let j = 0; j < strings.length; j++) {

        var k=strings[j].indexOf("]");
        
        //根据获取的歌词头部特殊性添加  
        if (k==11) {

            Time.push(strings[j].substring(2,k-4));
            sentences.push(strings[j].substring(k+1));

        }else{

            Time.push(strings[j].substring(2,k-3));
            sentences.push(strings[j].substring(k+1));

        }
    }
    Time[0]="00:00";//首句会有“号
    // 打印结果
    for (let index = 0; index < strings.length; index++) {

          console.log(Time[index]+"-----"+sentences[index]); 
    }

    // 获取歌词中断句的位置
    function getCount(count) {

        if (count<Lyric.length) {
    
            var counts=Lyric.indexOf("\n",count);
    
            array.push(counts);
    
            return getCount(counts+2);
        }  
    }
    

}
// ------------