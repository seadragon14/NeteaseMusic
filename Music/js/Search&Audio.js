// 播放器功能，搜索展示，歌词展示(⓿_⓿)

// 定义一个数组，用于存储一些标记用作开关
// 按顺序为（是否暂停）（是否没有音量）（是否播放其他歌曲）（专辑图片是否点击）
var isTag=[true,true,false,false];

// (首页---0)（歌手榜----1）（热门50曲----2）(搜索----3)（mv排行榜----4）（mv播放----5）
// 用于监测上一次打开的是什么页面
var LastPage=0;
// 播放顺序开关
var sequences=0;

// 当前鼠标在进度条上的位置
var currentX,VoicecurrentX;

// 获取歌曲在进度条上占的比值
var occupy;

// 当前播放歌曲的下标
var currentSongIndex;


// 歌曲id,歌手id,专辑图像,歌手名字,歌曲标题,歌词解析得到的的时间和 内容(暂时没用到)
var SongId=[];
var SingerId=[];
var AlbumsPicUrl=[];
var singer=[];
var songtitle=[];
var Time=[];
var sentences=[];

// 歌手类型,歌手图片地址,歌手简述
var SingerType;
var SingerUrl;
var briefDesc;

// 请求URL(搜索，歌手信息，歌词,歌曲id,首页发现)
        
var URL=["https://netease-cloud-music-api-alpha-henna.vercel.app/cloudsearch?keywords=",
         "https://netease-cloud-music-api-alpha-henna.vercel.app/artist/detail?id=",
         "https://netease-cloud-music-api-alpha-henna.vercel.app/lyric?id=",
         "https://netease-cloud-music-api-alpha-henna.vercel.app/song/url?id=",
         "https://netease-cloud-music-api-alpha-henna.vercel.app/homepage/block/page"
];


// 搜索请求------------------------------------

$('.search').keyup(function (event) {

    if (event.keyCode==13) {

        // 上一页置为搜索页面
        LastPage=3;

        // 当搜索歌曲时，把上一次搜索的数据清空
        SongId=[];AlbumsPicUrl=[];
        singer=[];songtitle=[];
        SingerId=[];
        $('#displaySongs').html('');

        // 清空歌手榜
        $('.singerInfo').html('');
        $('.singerList').css("display","none");

        // 清空热门50曲
        $('#Top50').html('');
        $('#MainTop50').css("display","none");
        $('.sentence').eq(3).css("display","none");

        // 隐藏mv排行榜和mv播放页面（清除数据显示）
        $('.MvInfo').html('');
        $('.MvList').css("display","none");
        $('.MvVedioInfo').css("display","none");
        // 执行搜索函数
        searchIt();
    }
});
// ------------


// 歌曲搜索显示函数---------------------------------

function searchIt() {

    // 获取搜索参数
    var keyword=$('.search').val();

    function success(data) {

        // 请求成功将内容显示出来,同时其他页面隐藏
        $('#mainText').css("display","flex");
        $('.lyric').css("display","none");
        $('.MyHome').css("display","none");
        $("#searchDisplay").css("display","flex");

        // 请求成功
        $('.isLoading').text('')

        // 关闭了歌词界面
        isTag[3]=false;

        // 获得所有搜索到的参数信息
        for (var i = 0; i < data.result.songs.length; i++) {

            // 如果歌曲副标题没有则不显示
            if (data.result.songs[i].alia[0]==undefined) {

                data.result.songs[i].alia[0]="";

            }

            // 获取歌手名字,歌名,专辑图片地址,歌曲id
            singer.push(data.result.songs[i].ar[0].name);
            songtitle.push(data.result.songs[i].name);
            AlbumsPicUrl.push(data.result.songs[i].al.picUrl);
            SongId.push(data.result.songs[i].id);
            SingerId.push(data.result.songs[i].ar[0].id);

            // 将所搜索的信息显示出来
            $('#displaySongs').append('<li>'+
            '<div class="MusicTitle">'+data.result.songs[i].name+" "+data.result.songs[i].alia[0]+'</div>'+
            '<div class="MusicPlayer">'+data.result.songs[i].ar[0].name+'</div>'+
            '<div class="MusicAlbums">'+data.result.songs[i].al.name+'</div>'+
            '<div class=MusicTime>'+toMiniute(data.result.songs[i].dt)+'</div>'+'</li>');

            // 添加相应的属性
            $("ul li").eq(i).attr("class","songs-list");
            $("ul li").eq(i).attr("index",i);

            // 显示搜索信息
            $('#mainText').css("display","flex");
            console.log(SongId[i]+"--------"+i);
        }
    }

    function error(params) {

        alert("请求失败");
    }
    function beforeSend() {
        $('.isLoading').text('缓冲中...')
    }

    MyAjaxPro(URL[0]+keyword,beforeSend,success,error,true)

}
// ------------


// 获取歌手信息函数---------------------------------

function getSingerInfo(index) {

    // 请求成功函数
    function success(data) {

        SingerUrl=data.data.artist.cover;
        briefDesc=data.data.artist.briefDesc;
        SingerType=data.data.identify.imageDesc;
        console.log(briefDesc+"--------"+SingerType);

    }

    // 请求错误函数
    function error(params) {
        console.log("歌手信息获取错误");
    }

    MyAjax(URL[1]+SingerId[index],success,error,false);

}
// ------------


// 点击歌曲并将他的songIndex给带有songid的数组，再传给audio

$('#displaySongs').on("click","li",function () {

    // 更新歌词部分
    $('#Lyric').html('');
    Time=[];sentences=[];

// 如果点击了其他歌曲当前播放暂停
    if (isTag[2]==true) {

        isTag[2]=false;
        
    }
    // 把当前点击的歌曲的下标给当前歌曲的全局变量
    currentSongIndex=$(this).attr("index");
    // 播放歌曲
    isPlay(currentSongIndex,"");

    isTag[2]=true;

});
// -------------


// 点击专辑头像时请求歌词同时具有显示和隐藏操作--------

$('#playerImg').click(function(){

    // 没有打开歌词页面，且歌词部分不为空
    if (isTag[3]==false&&($('#Lyric').text()!="")) {

        // 将歌词页面显示,搜索界面隐藏
        Open();

        isTag[3]=true;

    // 没打开歌词页面，歌词部分为空
    }else if (isTag[3]==false&&($('#Lyric').text()=="")) {

        console.log($('#Lyric').text());

        function success(data) {

            // 获取歌手信息
            getSingerInfo(currentSongIndex);
                            
            $('#Singer').text("歌手: "+singer[currentSongIndex]);
            $('#AlbumsImg').attr("src",SingerUrl);
            $('.isLoading').text('')

            if (briefDesc==null) {

                briefDesc="无";
            }

            if (typeof(SingerType)=="undefined") {

                SingerType="无";
            }

            $('#BriefDesc').text("歌手描述: "+briefDesc);
            $('#SingerType').text("歌手类型: "+SingerType);

            //将歌词页面显示,显示其他隐藏 
            Open();

            isTag[3]=true;

            // 解析歌词，并将数据存储进相应的数组中
            DoLyric(data.lrc.lyric);

            // 添加歌词信息
            for (var i = 0; i < sentences.length; i++) {

                $("#Lyric").append('<li>'+sentences[i]+'</li>');
                $("#Lyric li").eq(i).attr({"class":"lyric-item","index":i  });

            }
        }

        function error(params) {

            alert("歌词获取失败");
        }
        function beforeSend() {

            $('.isLoading').text('缓冲中...')
        }
        MyAjaxPro(URL[2]+SongId[currentSongIndex],beforeSend,success,error,true);
        
    // 已经打开歌词页面，关闭
    }else if(isTag[3]==true){

        Close();

        isTag[3]=false;

    }
    
});
// --------------

// 打开歌词页面-------------------------------------

function Open() {

    // 点开歌词页面之前显示是首页
    if (LastPage==0) {

        $('.lyric').css("display","flex");
        $('.MyHome').css("display","none");

        // 显示的是歌手榜
    } else if (LastPage==1) {
        
        $('.lyric').css("display","flex");
        $('.singerList').css("display","none");

        // 显示的是热门50曲
    }else if(LastPage==2){

        $('.lyric').css("display","flex");
        $('#MainTop50').css("display","none");
        $('#Top50').css("display","none");

        // 显示的是搜索
    }else if (LastPage==3) {

        $('.lyric').css("display","flex");
        $('#searchDisplay').css("display","none");
        // $('#mainText').css("display","none");
        // $('#displaySongs').css("display","none");

    }else if (LastPage==4) {

        $('.lyric').css("display","flex");
        $('.MvList').css("display","none");

    }else if (LastPage==5) {

        $('.lyric').css("display","flex");
        $('.MvVedioInfo').css("display","none");

    }
}
// ---------------


// 关闭歌词页面------------------------------------

function Close() {

        // 点开歌词页面之前显示是首页
        if (LastPage==0) {

            $('.lyric').css("display","none");
            $('.MyHome').css("display","flex");
    
            // 显示的是歌手榜
        } else if (LastPage==1) {
            
            $('.lyric').css("display","none");
            $('.singerList').css("display","flex");
    
            // 显示的是热门50曲
        }else if(LastPage==2){
    
            $('.lyric').css("display","none");
            $('#MainTop50').css("display","flex");
            $('#Top50').css("display","block");
    
            // 显示的是搜索
        }else if (LastPage==3) {
    
            $('.lyric').css("display","none");
            // $('#mainText').css("display","flex");
            $('#searchDisplay').css("display","flex");
            // $('#displaySongs').css("display","block");

        }else if (LastPage==4) {

            $('.lyric').css("display","none");
            $('.MvList').css("display","flex");
    
        }else if (LastPage==5) {
    
            $('.lyric').css("display","none");
            $('.MvVedioInfo').css("display","flex");
    
        }
}
// --------------

// 设置播放标记 0顺序，1循环，2随机-------------------

$('.sequence').click(function () {

    // 点击播放顺序会更新相应的UI
    sequences++;

    // 使其构成循环
    if (sequences>2) {
        sequences=0;
    }
    if (sequences==0) {

        $('.sequence').attr("src","./music-img/顺序播放.png");
        $('.sequence').attr("title","顺序播放");
    } else if(sequences==1){

        $('.sequence').attr("src","./music-img/循环播放.png");
        $('.sequence').attr("title","循环播放");
    }else if(sequences==2){

        $('.sequence').attr("src","./music-img/随机播放.png");
        $('.sequence').attr("title","随机播放");
    }
    console.log(sequences);
});
// ----------------


// 更新播放进度条以及相关信息--------------------------

function updata() {

    // audio播放时的总时长
    var time=$('#Music')[0].duration;

    // audio播放时的当前时间
    var currentTime=$('#Music')[0].currentTime;

    // 进度条总长度所对应的播放进度比（进度条长度620px）
     occupy=620/time;

    // 当前进度条的进度
    var currents=occupy*currentTime;

    // 更改css样式
    $('.filldiv').css("width",currents);
    $('.roundDot').css("left",currents);

    var allTime=toMiniute(time);
    var realTime=toMiniute(currentTime);

    // 判断time是不是NaN,NaN不等于本身(判断是否在缓冲)
    if (time!=time) {
        $('.playText').text("缓冲中……");
    }else{
        $('.playText').text(realTime+"/"+allTime);
    }

// 将歌词与audio进行匹配
// 1.可以得到某句歌词的时间，根据更新的时间进行对比
    if (Time.length==0) {

    }else{

        // 在时间数组中遍历
        for (var curSen = 0; curSen <Time.length; curSen++) {
            var mintures=(Time[curSen].substring(0,2)-0)*60;
            var seconds=Time[curSen].substring(3)-0;
            var ms=mintures+seconds;

            // 如果当前播放时间大于时间数组中的时间，就改变css样式
            if (Math.floor(currentTime)>ms) {
                $('.lyric-item').eq(curSen).css("color","white");
            }
        }

    }
    // console.log(time+"----"+currentTime);
    // 播放完后更新播放按钮以及各种UI信息
    if (time==currentTime) {

        // 歌词颜色改变 
        $('.lyric-item').css({"color":"black","transition":"1s"});

        $('.btn-Play').attr("src","./music-img/播放.png");
        isTag[0]=true;

        // 顺序播放
        if (sequences==0) {

            currentSongIndex++;

            if (currentSongIndex>SongId.length-1) {

                currentSongIndex=0;
            }
            isPlay(currentSongIndex,"Down");
            // 循环播放
        } else if(sequences==1){

            $('#Music')[0].play();
            $('.btn-Play').attr("src","./music-img/暂停.png");
            isTag[0]=false;

            // 随机播放
        }else if(sequences==2){

            currentSongIndex=Math.round(Math.random()*(SongId.length-1));
            isPlay(currentSongIndex,"Down");
        }
    }
}
// --------------


// 上一曲------------------------------------------

$('.btn-Last').click(function () {

    // 当前歌曲index向前移动
    --currentSongIndex;
    
    if (currentSongIndex<0) {
        alert("已到顶部");
        return;
    }
    isPlay(currentSongIndex,"UP");
    console.log(currentSongIndex);
})
// --------------


// 下一曲------------------------------------------

$('.btn-Next').click(function (params) {

    // 当前歌曲index向后移动
    ++currentSongIndex;

    if (currentSongIndex>SongId.length-1) {
        alert("已到底部");
        return;
    }

    isPlay(currentSongIndex,"Down");
    console.log(currentSongIndex);
})
// --------------


// 获取鼠标在进度条的位置-----------------------------

$(".progress").mousemove(function (event) {
    var E=event||window.event;
    var mouseX=E.clientX;
    var proX=this.offsetLeft;
    currentX=mouseX-proX;
});
// --------------


//  改变进度条的播放的位置----------------------------

$(".progress").click(function() {
    // 将获得的鼠标位置除以那个比值就得到了歌曲当前应该播放到哪个位置
    var realTime=(currentX/occupy).toFixed(4);
    $('#Music')[0].currentTime=realTime;
});
// --------------


// 调整音量--------------------------------------
$('.Voiceprogress').click(function () {

    // 获取当前audio的音量
    volume=$('#Music')[0].volume;

    // 因为音乐条长度为100px,音量最大为1,所以音乐长度比 如下
    var VoiceOccupy=1/100;

    // 得到音乐条位置后计算得到音量
    var realVolume= VoicecurrentX*VoiceOccupy;
    $('#Music')[0].volume=realVolume;

    // 更新音乐跳UI
    $('.Voicefilldiv').css("width",realVolume*100);
    $('.VoiceroundDot').css("left",realVolume*100);

});
// ------------


// 鼠标在音乐条移动的时候获取到当前要移动的位置-----
$(".Voiceprogress").mousemove(function (event) {
    VoicecurrentX=event.offsetX;
});
// ------------


// 更新audio的播放和图标-------------------------

$(".btn-Play").click(function () {
    
    // 标记为true表示播放，同时更新标记和UI
    if(isTag[0]==true){

        $('#Music')[0].play();
        $('.btn-Play').attr("src","./music-img/暂停.png");
        isTag[0]=false;

    }else{

        $('#Music')[0].pause();
        $('.btn-Play').attr("src","./music-img/播放.png");
        isTag[0]=true;

    }
});
// -------------


// 点击音乐图标后，表现为静音和50%----------------

$(".voiceImg").click(function () {

    // 标记为true表示点击了静音图标，更新UI参数
    if (isTag[1]==true) {

        $('#Music')[0].volume=0;
        $('.Voicefilldiv').css("width",0);
        $('.voiceImg').attr("src","./music-img/43静音.png");
        $('.VoiceroundDot').css("left",0);
        isTag[1]=false;

    }else{

        $('#Music')[0].volume=0.5;
        $('.Voicefilldiv').css("width",50);
        $('.voiceImg').attr("src","./music-img/42音量.png");
        $('.VoiceroundDot').css("left",50);
        isTag[1]=true;

    }
});
// ------------


// 判断当前歌曲是否能进行播放(参数为歌曲的id和往上播放还是往下播放)--------

function isPlay(index,UPorDown) {

    $('#Lyric').html('');
    Time=[];sentences=[];

    currentSongIndex=index;

    // 在请求之前先把当前的歌暂停
    isTag[0]=true;
    $("#Music")[0].pause();
    $('.btn-Play').attr("src","./music-img/播放.png");

    // 如果是上一曲
    if (UPorDown=="UP") {
        function success1(data) {

            // 有些歌曲的url是ull,避免加载这些歌曲
            var urls=data.data[0].url;

            if (urls==null) {

                alert("歌曲获取失败，自动播放上一首");

                if (currentSongIndex>0) {

                    return isPlay(--currentSongIndex,"UP");

                }else{

                    alert("已到顶部");
                    return;
                }

            }else{

                // 请求播放成功后更新各种UI信息
                $("#Music").attr("src",urls);
                $("#playerImg").attr("src",AlbumsPicUrl[currentSongIndex]);
                $('.SongTitle').text(songtitle[currentSongIndex]);
                $('.Singer').text(singer[currentSongIndex]);

                // 播放歌曲并将播放按钮更新为暂停按钮
                $("#Music")[0].play();
                $('.btn-Play').attr("src","./music-img/暂停.png");
                isTag[0]=false;

            }
        }

        function error1() {

            alert("歌曲获取失败，自动播放上一首");

            if (currentSongIndex>0) {

                return isPlay(--currentSongIndex,"UP");

            }else{

                alert("已到顶部");
                return;
            }
        }

        MyAjax(URL[3]+SongId[currentSongIndex],success1,error1,false);

    // 下一曲或者顺序播放  
    }else if (UPorDown=="Down") {
        
        function success2(data) {

            var urls=data.data[0].url;

            if (urls==null) {

                alert("歌曲获取失败，自动播放下一首");

                if (currentSongIndex<SongId.length-1) {

                    return isPlay(++currentSongIndex,"Down");

                }else{

                    alert("已到顶部");
                    return;
                }

            }else{

                $("#Music").attr("src",urls);
                $("#playerImg").attr("src",AlbumsPicUrl[currentSongIndex]);
                $('.SongTitle').text(songtitle[currentSongIndex]);
                $('.Singer').text(singer[currentSongIndex]);

                $("#Music")[0].play();
                $('.btn-Play').attr("src","./music-img/暂停.png");
                isTag[0]=false;

            }
        }
        function error2() {

            alert("歌曲获取失败，自动播放下一首");

            if (currentSongIndex<SongId.length-1) {

                return isPlay(--currentSongIndex,"Down");

            }else{

                alert("已到底部部");
                return;
            }
        }

        MyAjax(URL[3]+SongId[currentSongIndex],success2,error2,false);

    //点击播放 
    }else if (UPorDown=="") {

        function success3(data) {

            var urls=data.data[0].url;

                if (urls==null) {
                    
                    alert("歌曲获取失败")
                    console.log(data+"歌曲对应的数据audio src------");
    
                }else{

                    // 请求播放成功后更新各种ui信息
                    $("#Music").attr("src",urls);
                    $("#playerImg").attr("src",AlbumsPicUrl[currentSongIndex]);
                    $('.SongTitle').text(songtitle[currentSongIndex]);
                    $('.Singer').text(singer[currentSongIndex]);
    
                    // 获取到url后，代表可以播放，将播放按钮更新为暂停按钮
                    $("#Music")[0].play();
                    $('.btn-Play').attr("src","./music-img/暂停.png");
                    isTag[0]=false;

                }
        }

        function error3(params) {
            
            alert("歌曲获取失败");
        }

        MyAjax(URL[3]+SongId[currentSongIndex],success3,error3,true);

    }

}
// ------------