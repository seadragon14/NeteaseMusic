// 首页，歌手榜，MV排行榜

// var HomeUrls=["https://musiccoud.herokuapp.com/toplist/artist",
//               "https://musiccoud.herokuapp.com/artist/top/song?id="]

// 请求url地址
var HomeUrls=["https://netease-cloud-music-api-alpha-henna.vercel.app/toplist/artist",
              "https://netease-cloud-music-api-alpha-henna.vercel.app/artist/top/song?id=",
              "https://netease-cloud-music-api-alpha-henna.vercel.app/top/mv?limit=30",
              "https://netease-cloud-music-api-alpha-henna.vercel.app/mv/url?id=",
             ]
      
var SingerList=[];
var MvList=[];

// 歌手榜数据(singer name/singer id/singer picture/singer nickname/music albums/music size)
var Sname=[];
var Sid=[];
var SpicUrl=[];
var Salias=[];
var Salbumsize=[];
var Smusicsize=[];

// 歌手热门50曲页面数据（song id/song time/song albums）
var MusicId=[];
var MusicTime=[];
var MusicAlName=[];

// mv排行的数据(mv id,mv标题,mv播放次数,mv简述,艺术家)
var MvId=[];
var MvName=[];
var MvPlayCount=[];
var MvBrif=[];
var MvArtistName=[];

// 当前歌手和当前mv
var currentSinger;
var currentMv;

// 轮播图数量
var BannerLength;


// 首页得到banner------------------------------------

function HomeBanner() {

    function success(data) {

        for (var i = 0; i < data.data.blocks[0].extInfo.banners.length; i++) {

            // 将长度传给轮播定时器
            BannerLength=data.data.blocks[0].extInfo.banners.length;

            // 得到banner数据
            var BannerPic=data.data.blocks[0].extInfo.banners[i].pic;
            var BannerTitle=data.data.blocks[0].extInfo.banners[i].typeTitle;

            // 为轮播图添加新元素
            $('.Contain-imgs').append('<a class="bannerUrl"><img class="imgs" title='+BannerTitle+' src=' +BannerPic+'></a>');

            // 有些图片没有herf属性，判断一手
            if (typeof(data.data.blocks[0].extInfo.banners[i].url)!="undefined") {

                $('.bannerUrl').eq(i).attr({
                    "href":data.data.blocks[0].extInfo.banners[i].url,
                    "target":"_blank" });               
            }
            
        }
    }

    function error(params) {
        alert("请检查网络")
    }

    MyAjax(URL[4],success,error,true);
}
// ------------

// 首页侧边栏点击事件-------------------------

$('.sentence').eq(0).click(function () {

    // 上一页置为首页
    LastPage=0;

    // 首页显示
    $('.MyHome').css("display","flex");

    // 歌手榜隐藏，侧边栏隐藏
    $('.singerList').css("display","none");
    $('.sentence').eq(1).css("display","none");

    // 歌手热门50曲隐藏，侧边栏隐藏，数据清除
    $('#Top50').html('');
    $('#MainTop50').css("display","none");
    $('.sentence').eq(3).css("display","none");

    // 搜索页隐藏，数据清除
    $('#displaySongs').html('');
    $('#mainText').css("display","none");

    // 隐藏歌词页面
    $('.lyric').css("display","none");

    // 隐藏mv榜和mv播放页面mv暂停
    $('.MvList').css("display","none");

    $('#MvVedio')[0].pause();
    $('.MvVedioInfo').css("display","none");
    $('.sentence').eq(2).css("display","none");

});
// -----------------


// 歌手榜侧边栏点击 显示歌手榜------------------

$('.sentence').eq(1).click(function () {

    // 上一页置为歌手榜
    LastPage=1;

    // 清空热门50曲
    $('#Top50').html('');
    $('#MainTop50').css("display","none");
    $('.sentence').eq(3).css("display","none");

    // 清除搜素页面数据
    $('#displaySongs').html('');
    $('#mainText').css("display","none");

    // 显示歌手榜   
    getSingerList();

});
// -----------------

// MV排行榜侧边栏点击事件----------------------------

$('.sentence').eq(2).click(function (){

    //把上一页置为mv排行榜 
    LastPage=4;

    // 暂停播放vedio，显示mv排行榜
    $('#MvVedio')[0].pause();
    $('.MvList').css("display","flex");
    $('.MvVedioInfo').css("display","none");

    // 清空搜索页面数据
    $('#displaySongs').html('');
    $('#mainText').css("display","none");

    $('.lyric').css("display","none");

    getMvList();

})
// --------------

// 歌手热门50曲点击事件
$('.sentence').eq(3).click(function () {

    // 上一页置为歌手榜
    LastPage=2;

    // 显示热门50曲
    $('#MainTop50').css("display","flex");
    $('#Top50').css("display","block");

    // 关闭歌词
    $('.lyric').css("display","none");

});

// 歌手榜单点击事件-------------------------------------

$('#SingerList').click(function () {

    // 上一页置为榜单页面
    LastPage=1;

    getSingerList();

})
// --------------


// 点击歌手榜数据项将歌手热门50曲显示，同时歌手榜数据隐藏---

$('.singerInfo').on("click","li",function () {

    // 清空歌曲列表的数据(防止搜索页面的数据与此页面数据混乱)
    SingerId=[];SongId=[];
    singer=[];songtitle=[];
    AlbumsPicUrl=[];

    // 将当前点击的歌手id取出来
    currentSinger=$(this).attr("index");


    // 提前把歌手id存入歌手id数组（避免歌词页面歌手描述还是之前的数据）
    // 因为歌手热门50曲的歌手id都是一致的
    for (let m = 0; m < 50; m++) {

        SingerId[m]=Sid[currentSinger];
    }

    function success(data) {

        // 上一页置为歌手热门50曲页面
        LastPage=2;

        // 请求成功显示内容,侧边栏
        $('#MainTop50').css("display","none");
        $('.sentence').eq(3).css("display","block");
        $('.isLoading').text('')

        for (var j = 0; j < data.songs.length; j++) {

            // 添加数据
            songtitle.push(data.songs[j].name);
            SongId.push(data.songs[j].id);
            MusicTime.push(data.songs[j].dt);
            MusicAlName.push(data.songs[j].al.name);
            AlbumsPicUrl.push(data.songs[j].al.picUrl);

            // 如果歌手有多位进行判断
            if (data.songs[j].ar.length>=2) {

                var players="";

                for (var i = 0; i < data.songs[j].ar.length; i++) {

                    // 将所有歌手存入一个变量中
                    players+=data.songs[j].ar[i].name+" ";
                }

                singer.push(players);

            }else{

                singer.push(data.songs[j].ar[0].name);
            }

            // 将数据显示出来
            $('#Top50').append('<li>'+
            '<div class="MusicTitleTop50">'+songtitle[j]+'</div>'+
            '<div class="MusicPlayers">'+singer[j]+'</div>'+
            '<div class="MusicAlbums">'+MusicAlName[j]+'</div>'+
            '<div class=MusicTime>'+toMiniute(MusicTime[j])+'</div>'+'</li>');
            
            // 添加属性
            $("#Top50 li").eq(j).attr("class","songs-list");
            $("#Top50 li").eq(j).attr("index",j);
        }

            // 显示歌手热门50曲,隐藏歌手榜
            $('#MainTop50').css("display","flex");
            $('.singerList').css("display","none");
    }

    function error(params) {

        alert("歌手歌曲获取失败");
    }
    function beforeSend() {

        $('.isLoading').text('缓冲中...')
    }
    MyAjaxPro(HomeUrls[1]+Sid[currentSinger],beforeSend,success,error,true);

})
// -----------------


// 歌手热门50曲点击事件----------------------------

$('#Top50').on("click","li",function () {

    // 上一页置为歌手热门50曲页面
    LastPage=2;

    // 把当前点击的歌曲的下标给当前歌曲的全局变量
    currentSongIndex=$(this).attr("index");

    // 播放歌曲
    isPlay(currentSongIndex,"");

});
// -----------------


// MV排行榜点击事件---------------------------------

$('#MVPlay').click(function () {

    // 上一页置为mv排行榜
    LastPage=4;

    getMvList();    
})
// --------------


// MV播放页面-----------------------
$('.MvInfo').on("click","li",function (){

    // 上一页置为mv播放页面
    LastPage=5;

    // 隐藏MV排行榜
    $('.MvList').css("display","none");
    $('.MvVedioInfo').css("display","flex");

    // 得到当前的mv
    currentMv=$(this).attr("index");

    function success(data) {

        // 给播放页面添加对应的数据
        $('.briefs').text(MvBrif[currentMv]);
        $('#MvVedio').attr("src",data.data.url);
        $('.mvtitle').text(MvName[currentMv]+" "+data.data.r+"p");
        $('.isLoading').text('')

    }

    function error(params) {

        alert("mv获取失败");
    }

    function beforeSend() {

        $('.isLoading').text('缓冲中...')
    }
    MyAjaxPro(HomeUrls[3]+MvId[currentMv],beforeSend,success,error,true);

});


// 获取歌手榜数据并显示------------------------------

function getSingerList() {

    // 有数据显示，没有数据发送请求
    if ($('.singerInfo').text()!="") {

        // 显示数据
        $('.MyHome').css("display","none");
        $('.singerList').css("display","flex");
        $('.sentence').eq(1).css("display","block");

    } else {
 
    function success(data) {

        $('.isLoading').text('')

        for (var i = 0; i <30; i++) {

            // 存储数据到相应的数组中
            Sname.push(data.list.artists[i].name);
            Sid.push(data.list.artists[i].id);
            SpicUrl.push(data.list.artists[i].picUrl)
            Salbumsize.push(data.list.artists[i].albumSize)
            Smusicsize.push(data.list.artists[i].musicSize)
            Salias.push(data.list.artists[i].alias)

            // 显示数据
            $(".singerInfo").append('<li>'
            +'<div class="List">'+(i+1)+'</div>'
            +'<img class="singerImg"></>'
            +'<div class="singerName">'+Sname[i]+"   "+Salias[i]+'</div>'
            +'<div class="singerMsg">'+"专辑数: "+Salbumsize[i]+'</div>'
            +'<div class="singerMsg2">'+"歌曲数量: "+Smusicsize[i]+'</div>'
            +'</li>');

            // 为每个li添加属性
            $('.singerInfo li').eq(i).attr({
                "class":"LI",
                "index":i      });
            $('.singerImg').eq(i).attr("src",SpicUrl[i]);

            // 将数据显示出来
            $('.MyHome').css("display","none");
            $('.singerList').css("display","flex");
            $('.sentence').eq(1).css("display","block");

        }
    }

    function error(params) {

        alert("歌手榜获取失败");
    }

    function beforeSend() {

        $('.isLoading').text('缓冲中...')
    }
    MyAjaxPro(HomeUrls[0],beforeSend,success,error,true);

    }
}
// ------------------


// 获取mv排行榜数据--------------------------

function getMvList() {
    if ($('.MvInfo').text()!="") {

        $('.MyHome').css("display","none");
        $('.MvList').css("display","flex");
        $('.sentence').eq(2).css("display","block");
        
    } else {
        
        function success(data) {

            $('.isLoading').text('')

            for (var m = 0; m < data.data.length; m++) {
                
                // 添加数据 
                 MvId.push(data.data[m].id);
                 MvName.push(data.data[m].name);
                 MvPlayCount.push(data.data[m].playCount);
                 MvBrif.push(data.data[m].mv.desc);
    
                //  如果艺术家有多个进行判断添加
                 if (data.data[m].artists.length>=2) {
    
                    var artists="";
    
                    for (var k = 0; k < data.data[m].artists.length; k++) {
    
                        artists+=data.data[m].artists[k].name+" "
                
                    }

                    MvArtistName.push(artists);
                     
                 }else{
    
                    MvArtistName.push(data.data[m].artists[0].name);
    
                 }
    
                //  显示数据
                $('.MvInfo').append('<li class="LI"><div class="MVgrade">'+(m+1)+'</div>'+
                '<div class="MVtitle">'+MvName[m]+'</div>'+
                '<div class="MVartist">'+MvArtistName[m]+'</div>'+
                '<div class="MVplaycount">播放次数: '+MvPlayCount[m]+'</div>'
                +'</li>');
    
                // 添加属性(下标)
                $('.MvInfo li').eq(m).attr("index",m);
    
                // 请求成功显示侧边栏
                $('.MyHome').css("display","none");
                $('.MvList').css("display","flex");
                $('.sentence').eq(2).css("display","block");
            }
        }
    
        function error(params) {
            
            alert("MV排行榜获取失败");
        }
        function beforeSend() {

            $('.isLoading').text('缓冲中...')
        }
        MyAjaxPro(HomeUrls[2],beforeSend,success,error,true);
    }

}
// -------------------