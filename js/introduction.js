define(function(require, exports, module) {
	require("zepto");
	require("common");
	require("swiper");
	var template = require("template");
	var $ = Zepto;

	var app = {

		initIntroduction: function() {
			var arrlist = {};

			/*container内容*/
			var JS_general_introduction = $("#JS_general_introduction");
			var JS_conference_forum = $("#JS_conference_forum");
			var JS_exhibition_guide = $("#JS_exhibition_guide");
			var JS_booth_building = $("#JS_booth_building");
			var JS_conference_service = $("#JS_conference_service");
			var JS_exhibition_list = $("#JS_exhibition_list");
			var JS_past_review = $("#JS_past_review");

			/*li按钮*/
			var JS_zongtijieshao = $("#JS_zongtijieshao");
			var JS_dahuiluntan = $("#JS_dahuiluntan");
			var JS_canzhanzhinan = $("#JS_canzhanzhinan");
			var JS_zhanweidajian = $("#JS_zhanweidajian");
			var JS_dahuifuwu = $("#JS_dahuifuwu");
			var JS_canzhanmingdan = $("#JS_canzhanmingdan");
			var JS_wangqihuigu = $("#JS_wangqihuigu");

			function setDisplay() {
				JS_general_introduction.css('display', 'none');
				JS_conference_forum.css('display', 'none');
				JS_exhibition_guide.css('display', 'none');
				JS_booth_building.css('display', 'none');
				JS_conference_service.css('display', 'none');
				JS_exhibition_list.css('display', 'none');
				JS_past_review.css('display', 'none');

				JS_zongtijieshao.removeClass("current");
				JS_dahuiluntan.removeClass("current");
				JS_canzhanzhinan.removeClass("current");
				JS_zhanweidajian.removeClass("current");
				JS_dahuifuwu.removeClass("current");
				JS_canzhanmingdan.removeClass("current");
				JS_wangqihuigu.removeClass("current");
			}
			JS_zongtijieshao.on('click', function() {
				setDisplay();
				JS_zongtijieshao.addClass("current");
				JS_general_introduction.css('display', 'block');
				$(".hyjs").click();
			})
			JS_dahuiluntan.on('click', function() {
				setDisplay();
				JS_dahuiluntan.addClass("current");
				JS_conference_forum.css("display", "block");
				$(".ltjs").click();
			})
			JS_canzhanzhinan.on('click', function() {
				setDisplay();
				JS_canzhanzhinan.addClass("current");
				JS_exhibition_guide.css("display", "block");
				$(".yuan.ch").click();
			})
			JS_zhanweidajian.on('click', function() {
				setDisplay();
				JS_zhanweidajian.addClass("current");
				JS_booth_building.css("display", "block");

				arrlist = Util.getAjax(Util.Interface['article'].params("zhanweidajian"));
				$(".zhanweidajian>.zhanhui").html(arrlist.data.content);
			})
			JS_dahuifuwu.on('click', function() {
				setDisplay();
				JS_dahuifuwu.addClass("current");
				JS_conference_service.css("display", "block");
				$(".yuan.czsc").click();
			})

			//参展名单
			JS_canzhanmingdan.on('click', function() {
				setDisplay();
				JS_canzhanmingdan.addClass("current");
				JS_exhibition_list.css("display", "block");
				var i = 1,no_more = false;

				arrlist = Util.getAjax(Util.Interface['enterprise'].params(1, 20));
				$(".exhibition>.exhibition_list").empty();
				$.each(arrlist.rows, function(index, item) {
					var li = "<li class='concern-list-item'><a href='unitInformation.html?id=" + item.id + "'><div class='company-name'>" + item.name +
						"</div><div class='company-project'>" + item.industry +
						"</div><div class='company-address'>" +(item.regionCity=="地级市"?item.regionProv:(item.regionProv+item.regionCity)) +
						"</div></a></li>";
					$(".exhibition>.exhibition_list").append(li);					
				});
				i++;//增加页数
				//滚动条到页面底部加载更多案例 
				$(window).scroll(function(){
					var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
					var scrollHeight = $(document).height(); //当前页面的总高度
					var clientHeight = $(this).height(); //当前可视的页面高度
					if(scrollTop+clientHeight >= scrollHeight){ 
						if(no_more==false){
							$.ajax({
								url: Util.Interface['enterprise'].params(i,20),
								async:false,
								beforeSend:function(){									
									$(".loadmore").css("display","block");
								},
								success:function(result){
									//判断返回的数据是否存在
							    	if(result.code==0 && result.rows.length>0){
							    		$.each(result.rows, function(index, item) {
											var li = "<li class='concern-list-item'><a href='unitInformation.html?id=" + item.id + "'><div class='company-name'>" + item.name +
												"</div><div class='company-project'>" + item.industry +
												"</div><div class='company-address'>" +(item.regionProv?(item.regionCity=="地级市"?item.regionCity:(item.regionProv+item.regionCity)):item.regsiterAddress) +
												"</div></a></li>";
											$(".exhibition>.exhibition_list").append(li);
										});
										
										//$(".loadmore").css("display","none");
										i++; //页数增加
							    	}else{
		       							$(".loadmore span").html("没有更多了");
		       							no_more = true;
									}
	       						}
							})
						}
					}
				})
				
				
			})
			JS_wangqihuigu.on('click', function() {
				setDisplay();
				JS_wangqihuigu.addClass("current");
				JS_past_review.css("display", "block");
				$(".yuan.zdzg").click();
			})

			/**总体介绍**/
			$(".hyjs").on('click', function() {
				setZTJS();
				$('.zhengwen-meeting-introduction').css('display', 'block');
				$(".hyjs").addClass('current');
				arrlist = Util.getAjax(Util.Interface['article'].params("huiyijieshao"));
				$(".zhengwen-meeting-introduction>.intro").html(arrlist.data.content);
			})
			$(".zyrc").on('click', function() {
				setZTJS();
				$('.zhengwen-main-agenda').css('display', 'block');
				$(".zyrc").addClass('current');
				arrlist = Util.getAjax(Util.Interface['article'].params("zhuyaoricheng"));
				$(".zhengwen-main-agenda>.intro").html(arrlist.data.content);
			})
			$(".hyhd").on('click', function() {
				setZTJS();
				$('.zhengwen-meeting-activity').css('display', 'block');
				$(".hyhd").addClass('current');
				arrlist = Util.getAjax(Util.Interface['article'].params("zhuyaohuiyi"));
				$(".zhengwen-meeting-activity>.intro").html(arrlist.data.content);
			})
			$(".qybz").on('click', function() {
				setZTJS();
				$('.zhengwen-contract-recognition').css('display', 'block');
				$(".qybz").addClass('current');
				arrlist = Util.getAjax(Util.Interface['article'].params("tuijianqianyue"));
				$(".zhengwen-contract-recognition>.intro").html(arrlist.data.content);
			})
			$(".zggh").on('click', function() {
				setZTJS();
				$('.zhengwen-exhibition-hall-planning').css('display', 'block');
				$(".zggh").addClass('current');
				arrlist = Util.getAjax(Util.Interface['exhibitionMap'].params());
				$(".zhengwen-exhibition-hall-planning>.intro").empty();
				$.each(arrlist.rows, function(index, item) {
					$(".zhengwen-exhibition-hall-planning>.intro").append(item.content);
				});
			})

			function setZTJS() {
				$('.zhengwen-meeting-introduction').css('display', 'none');
				$('.zhengwen-main-agenda').css('display', 'none');
				$('.zhengwen-meeting-activity').css('display', 'none');
				$('.zhengwen-contract-recognition').css('display', 'none');
				$('.zhengwen-exhibition-hall-planning').css('display', 'none');

				$(".hyjs").removeClass("current");
				$(".zyrc").removeClass("current");
				$(".hyhd").removeClass("current");
				$(".qybz").removeClass("current");
				$(".zggh").removeClass("current");
			}

			/**大会论坛**/
			$(".ltjs").on('click', function() {
				setDHLT();
				$('.zhengwen-forum-introduction').css('display', 'block');
				$(".ltjs").addClass('current');
				arrlist = Util.getAjax(Util.Interface['article'].params("luntanzhengtijieshao"));
				$(".zhengwen-forum-introduction>.intro").html(arrlist.data.content);
			})
			$(".ltyc").on('click', function() {
				setDHLT();
				$('.zhengwen-forum-agenda').css('display', 'block');
				$(".ltyc").addClass('current');
				arrlist = Util.getAjax(Util.Interface['forumAgenda'].params(0, 0));
				$(".zhengwen-forum-agenda>.forum-agenda-list").empty();
				$.each(arrlist.rows, function(index, item) {
					var li = "<li class='agenda-item'><a style='display:bliock' href='detail.html?forumAgenda.id=" + item.id + "'><header class='agenda-header'><span class='agenda-name'>" + item.title +
						"</span></header><div class='agenda-content'><span class='agenda-address'>" + item.location +
						"</span><span class='agenda-time'>" + item.beginTime + "</span></div></a></li>";

					$(".zhengwen-forum-agenda>.forum-agenda-list").append(li);
				});
			})

			function setDHLT() {
				$('.zhengwen-forum-introduction').css('display', 'none');
				$('.zhengwen-forum-agenda').css('display', 'none');

				$(".ltjs").removeClass("current");
				$(".ltyc").removeClass("current");
			}

			/**参展指南**/
			$(".yuan.ch").on('click', function() {
				setCHZN();
				$('.zhengwen-ch').css('display', 'block');
				$(".yuan.ch").addClass('current');

				arrlist = Util.getAjax(Util.Interface['article'].params("gerencanhuizhinan"));
				$(".zhengwen-ch>.disc").html(arrlist.data.content);
				$("img").css("width","100%");
				$(".content").find("a").parent().find("img").css("width","inherit");
				$(".content").find("a").parent().prev("img").css("width","inherit");
			})
			$(".yuan.cz").on('click', function() {
				setCHZN();
				$('.zhengwen-cz').css('display', 'block');
				$(".yuan.cz").addClass('current');

				arrlist = Util.getAjax(Util.Interface['article'].params("danweicanzhanzhinan"));
				$(".zhengwen-cz").html(arrlist.data.content);
				$("img").css("width","100%");
				$(".content").find("a").parent().find("img").css("width","inherit");
				$(".content").find("a").parent().prev("img").css("width","inherit");
			})
			$(".yuan.mt").on('click', function() {
				setCHZN();
				$('.zhengwen-mt').css('display', 'block');
				$(".yuan.mt").addClass('current');

				arrlist = Util.getAjax(Util.Interface['article'].params("meiticanhui"));
				$(".zhengwen-mt").html(arrlist.data.content);
			})

			function setCHZN() {
				$('.zhengwen-ch').css('display', 'none');
				$('.zhengwen-cz').css('display', 'none');
				$('.zhengwen-mt').css('display', 'none');

				$(".yuan.ch").removeClass("current");
				$(".yuan.cz").removeClass("current");
				$(".yuan.mt").removeClass("current");
			}

			/**大会服务**/
			$(".yuan.czsc").on('click', function() {
				setDHFW();
				$('.zhengwen-mt.pd').css('display', 'block');
				$(".yuan.czsc").addClass('current');
				arrlist = Util.getAjax(Util.Interface['article'].params("canzhanshouce"));
				$(".zhengwen-mt.pd>.intro").html(arrlist.data.content);				
				$(".zhengwen-mt.pd .intro p").css("text-indent","0");
				$(".zhengwen-mt.pd img").parent().css({"text-indent": "0","display": "inline"});
			})
			$(".yuan.tjjd").on('click', function() {
				setDHFW();
				$('.zhengwen-tjjd').css('display', 'block');
				$(".yuan.tjjd").addClass('current');
				arrlist = Util.getAjax(Util.Interface['article'].params("tuijianjiudian"));
				$(".zhengwen-tjjd>.intro").html(arrlist.data.content);
			})
			$(".yuan.jtzn").on('click', function() {
				setDHFW();
				$('.zhengwen-traffic-guide').css('display', 'block');
				$(".yuan.jtzn").addClass('current');
				arrlist = Util.getAjax(Util.Interface['article'].params("jiaotongzhinan"));
				$(".zhengwen-traffic-guide>.intro").html(arrlist.data.content);
			})

			function setDHFW() {
				$('.zhengwen-mt.pd').css('display', 'none');
				$('.zhengwen-tjjd').css('display', 'none');
				$('.zhengwen-traffic-guide').css('display', 'none');

				$(".yuan.czsc").removeClass("current");
				$(".yuan.tjjd").removeClass("current");
				$(".yuan.jtzn").removeClass("current");
			}

			/**往期回顾**/
			$(".yuan.zdzg").on('click', function() {
				setWQHG();
				$('.zhengwen-qdzg').css('display', 'block');
				$(".yuan.zdzg").addClass('current');

				arrlist = Util.getAjax(Util.Interface['historyAchievement'].params(0, 0));
				$(".zhengwen-qdzg>.tongzhi-list").empty();
				$.each(arrlist.rows, function(index, item) {
					var li = "<li class='tongzhi-list-item'><a href='historyAchievementDetail.html?historyAchievement.id=" + item.id + "'><div class='image'>" +
						"<img src='" + Util.CiepUrl + item.imageUrl + "' width='100%' height='100%' /></div><div class='info'>" +
						"<div class='title'><span>" + item.title + "</span></div>" +
						"<div class='content'><span>" + item.intro + "</span>" +
						"<a href='javascript:void(0);' class='more'>更多</a></div>" +
						"<div class='time'>" + item.exhibitTime + "</div></div></a></li>";
					$(".zhengwen-qdzg>.tongzhi-list").append(li);
				});
			})
			$(".yuan.xgsp").on('click', function() {
				setWQHG();
				$('.zhengwen-xgsp').css('display', 'block');
				$(".yuan.xgsp").addClass('current');

				$.get(Util.CiepUrl + "/history-video/list.action", function(data) {
					console.log(data);
					var htmlvideo = template("JS_dahuishipin_item", data);
					$(".bonus-ad").html(htmlvideo);
				})

			})
			$(".yuan.zsml").on('click', function() {
				setWQHG();
				$('.zhengwen-zsml').css('display', 'block');
				$(".yuan.zsml").addClass('current');

				arrlist = Util.getAjax(Util.Interface['historyExhibitor'].params(0, 0));
				console.log(arrlist);
				$(".zhengwen-zsml>.concern-list").empty();
				$.each(arrlist.rows, function(index, item) {
					var li = "<li class='concern-list-item'><a href='javascript:void(0);'>" +
						"<div class='company-name'>" + item.name + "</div>" +
						"<div class='company-lianxiren'>联系人：" + item.contacts + "</div>" +
						"<p><span class='company-iphone'>电&nbsp;&nbsp;&nbsp;话：" + item.phone + "</span>" +
						"<span class='company-iphone'></span></p></a></li>";
					$(".zhengwen-zsml>.concern-list").append(li);
				});
			})

			function setWQHG() {
				$('.zhengwen-qdzg').css('display', 'none');
				$('.zhengwen-xgsp').css('display', 'none');
				$('.zhengwen-zsml').css('display', 'none');

				$(".yuan.zdzg").removeClass("current");
				$(".yuan.xgsp").removeClass("current");
				$(".yuan.zsml").removeClass("current");
			}

			template.helper('imgsrc', function(item) {
				if(item) {
					var src = item;
					src = Util.CiepUrl + src;
					return src;
				}
			});

			var uri =window.location.hash.replace(/#\/?/,'');
			console.log("uri:"+uri);
			if(uri == "dahuijieshao") {
				tansform(0);
				JS_zongtijieshao.click();
			}
			if(uri == "canzhanzhinan") {
				
				JS_canzhanzhinan.click();
			}
			if(uri == "dahuiluntan") {
				tansform(0);
				JS_dahuiluntan.click();
			}
			if(uri == "dahuifuwu") {
				tansform(220);
				JS_dahuifuwu.click();
			}
			if(uri == "wangqihuigu") {
				tansform(220);
				JS_wangqihuigu.click();
			}
			if(uri == "canzhanmingdan") {
				tansform(220);
				JS_canzhanmingdan.click();
			}
			if(uri == "zhanweidajian"){
				tansform(105);
				JS_zhanweidajian.click();
			}
			
			//function onHashChange(){
			//	var val = window.location.hash.replace(/#\/?/,'');
			//	console.log(val);
			//}
			
			//window.addEventListener("hashchange",onHashChange);
			
		    var swiper = new Swiper('.swiper-container', {
		    	direction: 'horizontal',
				freeMode: true,
		        slidesPerView: 'auto',
		    });
		    
		    
		    function tansform(num){
		    	var num = num/23.4375*(document.documentElement.offsetWidth/16);
		    	var ddc=document.getElementById("dd");
		  		ddc.style.transform="translate3d(-"+num+"px, 0px, 0px)";
		    }

		}

	}

	module.exports = app;
})