            var mainButton = document.querySelector(".main-button");//获取按钮主体
			var daytimeBackgrond = document.getElementsByClassName("daytime-backgrond");//获取按钮背后的虚影
			var cloud = document.querySelector(".cloud");//获取云层
			var cloudLight = document.querySelector(".cloud-light");//获取云层虚影
			var components = document.querySelector(".components");//获取最外层元素
			var moon = document.getElementsByClassName("moon");//获取陨石坑
			var stars = document.querySelector(".stars");//获取所有星星
			var body = document.querySelector("body");//获取body
			var isMoved = false;//按钮状态，判断是否白天黑夜,默认为白天
			
			mainButton.addEventListener("click", function() {
			  if (isMoved) {
				//白天按钮样式
			    mainButton.style.transform = "translateX(0)";//水平平移距离为0px
				mainButton.style.backgroundColor = "rgba(255, 195, 35,1)";//按钮主体的背景颜色变为黄色(太阳)
				// 盒子阴影
				mainButton.style.boxShadow = "3px 3px 5px rgba(0, 0, 0, 0.5), inset  -3px -5px 3px -3px rgba(0, 0, 0, 0.5), inset  4px 5px 2px -2px rgba(255, 230, 80,1)";
				//云朵上升-云朵显示
				daytimeBackgrond[0].style.transform = "translateX(0)";
				daytimeBackgrond[1].style.transform = "translateX(0)";
				daytimeBackgrond[2].style.transform = "translateX(0)";
				cloud.style.transform = "translateY(10px)";
				cloudLight.style.transform = "translateY(10px)";
				components.style.backgroundColor = "rgba(70, 133, 192,1)"
				//月亮陨石坑完全透明-隐藏
				moon[0].style.opacity = "0";
				moon[1].style.opacity = "0";
				moon[2].style.opacity = "0";
				//星星上升-星星隐藏
				stars.style.transform = "translateY(-125px)";
				stars.style.opacity = "0";
				//网页背景颜色变为浅色
				body.style.backgroundColor = "aliceblue";
			  } else {
				//黑夜按钮样式
			    mainButton.style.transform = "translateX(110px)";//水平平移距离为110px
				mainButton.style.backgroundColor = "rgba(195, 200,210,1)";//按钮主体的背景颜色变为黄色(月亮)
				// 盒子阴影
				mainButton.style.boxShadow = "3px 3px 5px rgba(0, 0, 0, 0.5), inset  -3px -5px 3px -3px rgba(0, 0, 0, 0.5), inset  4px 5px 2px -2px rgba(255, 255, 210,1)";
				//云朵下降-云朵隐藏
				daytimeBackgrond[0].style.transform = "translateX(110px)";
				daytimeBackgrond[1].style.transform = "translateX(80px)";
				daytimeBackgrond[2].style.transform = "translateX(50px)";
				cloud.style.transform = "translateY(80px)";
				cloudLight.style.transform = "translateY(80px)";
				components.style.backgroundColor = "rgba(25,30,50,1)"
				//月亮陨石坑完全不透明-显示
				moon[0].style.opacity = "1";
				moon[1].style.opacity = "1";
				moon[2].style.opacity = "1";
				//星星下降-星星显示
				stars.style.transform = "translateY(-62.5px)";
				stars.style.opacity = "1";
				//网页背景颜色变为深色
				body.style.backgroundColor = "#424242";
			  }
			
			  isMoved = !isMoved;
			});