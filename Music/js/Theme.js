// 点击头像事件（1.匹配邮箱格式，2.根据api返回的头像和昵称修改对应的值）---->返回中文昵称会乱码


// 伪登录事件-------------------------------------
$("#headImg").click(function () {

    var numbers=[1,2,3,4,5,6,7,8,9,0];
    var format=true;

    var QQnumber=prompt("Please input your QQ number : ");

    if (QQnumber==""||QQnumber==null) {
    
        alert("your QQ is null");
        return;
    
    }else if(QQnumber.length<5||QQnumber.length>10){
    
        alert("The QQ length is not right");
        return;
    
    }else{
    
        // 判断每一个字符是否都是数字
        for (let j = 0; j < QQnumber.length; j++) {
    
            var result=(QQnumber[j] in numbers);
            if (result==false) format=false;
        }
    }
    
    if (format==false) {
    
        alert("The QQ format is not right")
        return;
    }
    
    var url="https://tenapi.cn/qqname/?qq="+QQnumber;
    
        function success(data) {
            $('#headImg').attr("src",data.imgurl+"&size=60");
            $("#nickName").text(data.name);
            $("#loginMsg").text("已登录");
        }
    
        function beforeSend() {
            $("#loginMsg").text("登录中...");
            
        }
        
        function error() {
            alert("获取QQ信息失败");
        }
        MyAjaxPro(url,beforeSend,success,error,true)
  
});
// --------------

// 搜索框焦点事件---------------------------------

$(".search").focus(function () {

    $(".search").css({
        "width":"250px",
        "transition":"0.6s"
    });
});
$(".search").blur(function () {

    $(".search").css({
        "width":"150px",
        "transition":"0.6s"
    });
});
// -------------


// 轮播图控制-----------------------------

var i=1;
setInterval(function () {

    $('.Contain-imgs')[0].style.transform = `translateX(${i * -850}px)`;
    
    i++;
    
    if (i>BannerLength-1) {
        i=0;
    }
    
},3000);
// ------------

// 更新为当前时间--------------------------
setInterval(function () {

    var currentTime=new Date().toTimeString().substr(0, 8);
    $(".currentTime").text(currentTime);

},1000);
// ---------------

// 加载主题颜色-----------------------------------

function changeTheme() {

    Themes();
};
// -------------


// 当其他文件都加载完后加载------------------------

window.onload=function () {

    // （适配当前audio的音量）
    currentV=$('#Music')[0].volume;

    $('.Voicefilldiv').css("width",currentV*100);
    $('.VoiceroundDot').css("left",currentV*100);

    Themes();
    HomeBanner();
    $('.sentence').eq(0).css("display","block");
}
// -------------


// 改变外观函数------------------------------------

function Themes() {

    var Theme=$('#selectTheme option:selected').val();

    console.log(Theme);

    if (Theme=="GreenWhite") {

        // 导航栏左侧
        $('.LeftTopNavigation').css({
            "backgroundColor":"white",
            "border-color":"#42B583"
        });

        // 导航栏右侧
        $('.RightTopNavigation').css({
            "backgroundColor":"white",
            "border-color":"#42B583"
        });

        // 输入框
        $(".search").css("border-color","#42B583");

        $("#nickName").css("color","black");

        // 多选框
        $("#selectTheme").css("border-color","#42B583");

        // 登录状态
        $('.loginStatus').css({
            "backgroundColor":"white",
            "border-color":"#42B583",
            "color":"black"
        });
        // 改变时间字体颜色
        $('.currentTime').css("color","#42B583");
        // 改变主题
        $('.changeTheme').css({
            "backgroundColor":"white",
            "border-color":"#42B583",
            "color":"black"
        }); 

        // 主要内容盒子
        $('#mainBox').css("background-color","#c1dfd2"); 

        // 首页主要内容背景
        $(".MyHome").css(
            "background-color","#c1dfd2"
        );

        // 首页两个list
        $("#OtherList").css(
            "background-color","rgb(180, 209, 188)"
        );

        // 轮播图背景
        $("#banner").css(
            "background-color","rgb(180, 209, 188)"
        );

        // 首页歌手榜list
        $("#SingerList").css(
            "border-color","#42B583"
        );

        // 首页mv排行榜list
        $("#MVPlay").css(
            "border-color","#42B583"
        );

        // mv排行榜主页
        $('.MvList').css("background-color","#c1dfd2")
             
        // 侧边栏
        $("#sidebar").css({
            "backgroundColor":"white",
            "border-color":"#42B583"
        });

        $(".sentence").eq(0).css({
            "background-color":"#42B583",
            "color":"white"
        });
        $(".sentence").eq(1).css({
            "background-color":"#42B583",
            "color":"white"
        });
        $(".sentence").eq(2).css({
            "background-color":"#42B583",
            "color":"white"
        });
        $(".sentence").eq(3).css({
            "background-color":"#42B583",
            "color":"white"
        });
        // 侧边栏内容
          $(".sentence").eq(0).hover(function(){
            $(".sentence").eq(0).css({
                "background-color":"#c1dfd2",
                "color":"#42B583"
            });

            },function(){
            $(".sentence").eq(0).css({
                "background-color":"#42B583",
                "color":"white"
            });
          });
          $(".sentence").eq(1).hover(function(){
            $(".sentence").eq(1).css({
                "background-color":"#c1dfd2",
                "color":"#42B583"
            });

            },function(){
            $(".sentence").eq(1).css({
                "background-color":"#42B583",
                "color":"white"
            });
          });
          $(".sentence").eq(2).hover(function(){
            $(".sentence").eq(2).css({
                "background-color":"#c1dfd2",
                "color":"#42B583"
            });

            },function(){
            $(".sentence").eq(2).css({
                "background-color":"#42B583",
                "color":"white"
            });
          });
          $(".sentence").eq(3).hover(function(){
            $(".sentence").eq(3).css({
                "background-color":"#c1dfd2",
                "color":"#42B583"
            });

            },function(){
            $(".sentence").eq(3).css({
                "background-color":"#42B583",
                "color":"white"
            });
          });
          
        // 歌曲列表颜色变更
          $(".MusicTitleTop50").css("color","#42B583");
          $(".MusicPlayers").css("color","#42B583");

          $('.MusicAlbums').css({
            "background-color":"white",
            "color":"#42B583"   });

        $('.MusicTime').css({
            "background-color":"white",
            "color":"#42B583" });

        //底部导航栏右侧 
        $(".rightBar").css("background-color","#42B583");

        // 专辑小图片
        $('#playerImg').css({
            "background-color":"#42B583",
        });
        
        // 底部歌名
        $('.SongTitle').css({
            "background-color":"#42B583",
            "color":"white"
        });

        // 底部歌手
        $('.Singer').css({
            "background-color":"#42B583",
            "color":"white"
        });

        // 按钮控件
        $('.btns').css({
            "background-color":"#42B583",
        });

        // 播放栏
        $('.MusicPlayBar').css({
            "background-color":"#42B583",
        });

        // 时间显示
        $('.playTime').css({
            "background-color":"#42B583",
        });

        // 
        $('.playText').css({
            "background-color":"#42B583",
            "color":"white"
        });

        // 播放顺序
        $('.playSequence').css({
            "background-color":"#42B583",   
        });

        // 音量条
        $('.voiceBar').css({
            "background-color":"#42B583",   
        });

        // 
        $('.contain-Img').css({
            "background-color":"#42B583",   
        });

        // 搜索页面主体
        $('#mainText').css({
            "background-color":"white",
            "color":"#42B583"  
        });

        // 搜索页面音乐标题
        $('.MusicTitle').css({
            "background-color":"white",
            "color":"#42B583"  
        });

        // 搜索页面音乐人
        $('.MusicPlayer').css({
            "background-color":"white",
            "color":"#42B583"  
        });

        // 播放栏
        $('#PlayBar').css({
            "background-color":"white",
        });

        // 歌词页面
        $('.lyric').css({
            "background-color":"#84d4b2",
        });
        $('#yric').css({
            "background-color":"#84d4b2",
        });

    }else if (Theme=="RedWhite") {
         // 导航栏左侧
         $('.LeftTopNavigation').css({
            "backgroundColor":"#FD544E",
            "border-color":"white"
        });

        // 导航栏右侧
        $('.RightTopNavigation').css({
            "backgroundColor":"#FD544E",
            "border-color":"white"
        });

        // 输入框
        $(".search").css("border-color","#FD544E");

        // 多选框
        $("#selectTheme").css("border-color","#42B583");

        // 改变时间字体颜色
        $('.currentTime').css("color","white");

        // 昵称
        $("#nickName").css("color","white");

        // 登录状态
        $('.loginStatus').css({
            "backgroundColor":"#FD544E",
            "border-color":"white",
            "color":"white"
        });

        // 改变主题
        $('.changeTheme').css({
            "backgroundColor":"#FD544E",
            "border-color":"white",
            "color":"white"
        }); 

        // 主要内容盒子
        $('#mainBox').css("background-color","#F08080"); 

        // 首页主要内容背景
        $(".MyHome").css(
            "background-color","#ffa3a3"
        );

        // 首页两个list
        $("#OtherList").css(
            "background-color","#FFE4E1"
        );

        // 轮播图背景
        $("#banner").css(
            "background-color","#FFE4E1"
        );

        // 首页歌手榜list
        $("#SingerList").css(
            "border-color","#FD544E"
        );

        // 首页mv排行榜list
        $("#MVPlay").css(
            "border-color","#FD544E"
        );

        // mv排行榜主页
        $('.MvList').css("background-color","#ffa3a3")
             
        // 侧边栏
        $("#sidebar").css({
            "backgroundColor":"white",
            "border-color":"#FD544E"
        });
        $(".sentence").eq(0).css({
            "background-color":"#FD544E",
            "color":"white"
        });
        $(".sentence").eq(1).css({
            "background-color":"#FD544E",
            "color":"white"
        });
        $(".sentence").eq(2).css({
            "background-color":"#FD544E",
            "color":"white"
        });
        $(".sentence").eq(3).css({
            "background-color":"#FD544E",
            "color":"white"
        });

        // 侧边栏内容hover效果
          $(".sentence").eq(0).hover(function(){
            $(".sentence").eq(0).css({
                "background-color":"#ffa3a3",
                "color":"#FD544E"
            });

            },function(){
            $(".sentence").eq(0).css({
                "background-color":"#FD544E",
                "color":"white"
            });
          });
          $(".sentence").eq(1).hover(function(){
            $(".sentence").eq(1).css({
                "background-color":"#ffa3a3",
                "color":"#FD544E"
            });

            },function(){
            $(".sentence").eq(1).css({
                "background-color":"#FD544E",
                "color":"white"
            });
          });
          $(".sentence").eq(2).hover(function(){
            $(".sentence").eq(2).css({
                "background-color":"#ffa3a3",
                "color":"#FD544E"
            });

            },function(){
            $(".sentence").eq(2).css({
                "background-color":"#FD544E",
                "color":"white"
            });
          });
          $(".sentence").eq(3).hover(function(){
            $(".sentence").eq(3).css({
                "background-color":"#ffa3a3",
                "color":"#FD544E"
            });

            },function(){
            $(".sentence").eq(3).css({
                "background-color":"#FD544E",
                "color":"white"
            });
          });
          
        // 歌曲列表颜色变更
          $(".MusicTitleTop50").css("color","#42B583");
          $(".MusicPlayers").css("color","#42B583");

          $('.MusicAlbums').css({
            "background-color":"white",
            "color":"#42B583"   });

        $('.MusicTime').css({
            "background-color":"white",
            "color":"#42B583" });


        $('.LI').css("border-color","FD544E");
        
        //底部导航栏右侧 
        $(".rightBar").css("background-color","#FD544E");

        // 专辑小图片
        $('#playerImg').css({
            "background-color":"#FD544E",
        });
        
        // 底部歌名
        $('.SongTitle').css({
            "background-color":"#FD544E",
            "color":"white"
        });

        // 底部歌手
        $('.Singer').css({
            "background-color":"#FD544E",
            "color":"white"
        });

        // 按钮控件
        $('.btns').css({
            "background-color":"#FD544E",
        });

        // 播放栏
        $('.MusicPlayBar').css({
            "background-color":"#FD544E",
        });

        // 时间显示
        $('.playTime').css({
            "background-color":"#FD544E",
        });

        // 
        $('.playText').css({
            "background-color":"#FD544E",
            "color":"white"
        });

        // 播放顺序
        $('.playSequence').css({
            "background-color":"#FD544E",   
        });

        // 音量条
        $('.voiceBar').css({
            "background-color":"#FD544E",   
        });

        // 
        $('.contain-Img').css({
            "background-color":"#FD544E",   
        });

        // 搜索页面主体
        $('#mainText').css({
            "background-color":"white",
            "color":"#FD544E"  
        });

        // 搜索页面音乐标题
        $('.MusicTitle').css({
            "background-color":"white",
            "color":"#FD544E"  
        });

        // 歌手热门50曲的歌名
        $('.MusicTitleTop50').css({
            "background-color":"white",
            "color":"#FD544E"  
        });

        // 歌手热门50曲的歌手
        $('.MusicPlayers').css({
            "background-color":"white",
            "color":"#FD544E"  
        });

        // 搜索页面音乐人
        $('.MusicPlayer').css({
            "background-color":"white",
            "color":"#FD544E"  
        });

        // 搜索页专辑
        $('.MusicAlbums').css({
            "background-color":"white",
            "color":"#FD544E"  
        });

        // 搜索页时长
        $('.MusicTime').css({
            "background-color":"white",
            "color":"#FD544E"  
        });

        // 播放栏
        $('#PlayBar').css({ 
            "background-color":"white",
        });

        // 歌词页面
        $('.lyric').css({
            "background-color":"#ffa3a3",
        });
        $('#yric').css({
            "background-color":"#ffa3a3",
        });
        
    } else if(Theme=="BlueWhite"){
        // 导航栏左侧
        $('.LeftTopNavigation').css({
            "backgroundColor":"#00BFFF",
            "border-color":"white"
        });

        // 导航栏右侧
        $('.RightTopNavigation').css({
            "backgroundColor":"#00BFFF",
            "border-color":"white"
        });

        // 输入框
        $(".search").css("border-color","#1D82FE");

        // 多选框
        $("#selectTheme").css("border-color","#1D82FE");

        // 昵称
        $("#nickName").css("color","white");
    
        $('.currentTime').css("color","white");
        // 登录状态
        $('.loginStatus').css({
            "backgroundColor":"#00BFFF",
            "border-color":"white",
            "color":"white"
        });

        // 改变主题
        $('.changeTheme').css({
            "backgroundColor":"#00BFFF",
            "border-color":"white",
            "color":"white"
        }); 

        // 主要内容盒子
        $('#mainBox').css("background-color","#87CEFA"); 

        // 首页主要内容背景
        $(".MyHome").css(
            "background-color","#87CEFA"
        );

        // 首页两个list
        $("#OtherList").css(
            "background-color","#ADD8E6"
        );

        // 轮播图背景
        $("#banner").css(
            "background-color","#ADD8E6"
        );

        // 首页歌手榜list
        $("#SingerList").css(
            "border-color","#00BFFF"
        );

        // 首页mv排行榜list
        $("#MVPlay").css(
            "border-color","#00BFFF"
        );

        // mv排行榜主页
        $('.MvList').css("background-color","#87CEFA");
             
        // 侧边栏
        $("#sidebar").css({
            "backgroundColor":"white",
            "border-color":"#00BFFF"
        });
        $(".sentence").eq(0).css({
            "background-color":"#00BFFF",
            "color":"white"
        });
        $(".sentence").eq(1).css({
            "background-color":"#00BFFF",
            "color":"white"
        });
        $(".sentence").eq(2).css({
            "background-color":"#00BFFF",
            "color":"white"
        });
        $(".sentence").eq(3).css({
            "background-color":"#00BFFF",
            "color":"white"
        });

        // 侧边栏内容hover效果
          $(".sentence").eq(0).hover(function(){
            $(".sentence").eq(0).css({
                "background-color":"#87CEFA",
                "color":"#00BFFF"
            });

            },function(){
            $(".sentence").eq(0).css({
                "background-color":"#00BFFF",
                "color":"white"
            });
          });
          $(".sentence").eq(1).hover(function(){
            $(".sentence").eq(1).css({
                "background-color":"#87CEFA",
                "color":"#00BFFF"
            });

            },function(){
            $(".sentence").eq(1).css({
                "background-color":"#00BFFF",
                "color":"white"
            });
          });
          $(".sentence").eq(2).hover(function(){
            $(".sentence").eq(2).css({
                "background-color":"#87CEFA",
                "color":"#00BFFF"
            });

            },function(){
            $(".sentence").eq(2).css({
                "background-color":"#00BFFF",
                "color":"white"
            });
          });
          $(".sentence").eq(3).hover(function(){
            $(".sentence").eq(3).css({
                "background-color":"#87CEFA",
                "color":"#00BFFF"
            });

            },function(){
            $(".sentence").eq(3).css({
                "background-color":"#00BFFF",
                "color":"white"
            });
          });
          
        // 歌曲列表颜色变更
          $(".MusicTitleTop50").css("color","#42B583");
          $(".MusicPlayers").css("color","#42B583");

          $('.MusicAlbums').css({
            "background-color":"white",
            "color":"#42B583"   });

        $('.MusicTime').css({
            "background-color":"white",
            "color":"#42B583" });


        $('.LI').css("border-color","FD544E");
        
        //底部导航栏右侧 
        $(".rightBar").css("background-color","#00BFFF");

        // 专辑小图片
        $('#playerImg').css({
            "background-color":"#00BFFF",
        });
        
        // 底部歌名
        $('.SongTitle').css({
            "background-color":"#00BFFF",
            "color":"white"
        });

        // 底部歌手
        $('.Singer').css({
            "background-color":"#00BFFF",
            "color":"white"
        });

        // 按钮控件
        $('.btns').css({
            "background-color":"#00BFFF",
        });

        // 播放栏
        $('.MusicPlayBar').css({
            "background-color":"#00BFFF",
        });

        // 时间显示
        $('.playTime').css({
            "background-color":"#00BFFF",
        });

        // 
        $('.playText').css({
            "background-color":"#00BFFF",
            "color":"white"
        });

        // 播放顺序
        $('.playSequence').css({
            "background-color":"#00BFFF",   
        });

        // 音量条
        $('.voiceBar').css({
            "background-color":"#00BFFF",   
        });

        // 
        $('.contain-Img').css({
            "background-color":"#00BFFF",   
        });

        // 搜索页面主体
        $('#mainText').css({
            "background-color":"white",
            "color":"#00BFFF"  
        });

        // 搜索页面音乐标题
        $('.MusicTitle').css({
            "background-color":"white",
            "color":"#00BFFF"  
        });

        // 歌手热门50曲的歌名
        $('.MusicTitleTop50').css({
            "background-color":"white",
            "color":"#00BFFF"  
        });

        // 歌手热门50曲的歌手
        $('.MusicPlayers').css({
            "background-color":"white",
            "color":"#00BFFF"  
        });

        // 搜索页面音乐人
        $('.MusicPlayer').css({
            "background-color":"white",
            "color":"#00BFFF"  
        });

        // 搜索页专辑
        $('.MusicAlbums').css({
            "background-color":"white",
            "color":"#00BFFF"  
        });

        // 搜索页时长
        $('.MusicTime').css({
            "background-color":"white",
            "color":"#00BFFF"  
        });

        // 播放栏
        $('#PlayBar').css({ 
            "background-color":"white",
        });

        // 歌词页面
        $('.lyric').css({
            "background-color":"#87CEFA",
        });
        $('#yric').css({
            "background-color":"#87CEFA",
        });
    }
}
// -------------