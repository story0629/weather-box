$(document).ready(function(){
	$.ajax({
		// url:"http://api.openweathermap.org/data/2.5/forecast/daily?q=taipei,tw&units=metric&cnt=7&appid=237a207f74671a1732470609b0089e2e",
		url:"http://api.openweathermap.org/data/2.5/forecast/daily?q=tokyo,jp&units=metric&cnt=7&appid=237a207f74671a1732470609b0089e2e",
		dataType:"json",
		success: function(e){
			$(".address").html(e.city.name+" City");
			var today_weather = e.list[0].weather[0].main;
			console.log(today_weather);
			if(today_weather == "Rain"){
				var icon = "<div class='cloudrain'><div class='rain rain1'></div><div class='rain rain2'></div><div class='rain rain3'></div></div>";
			}else if(today_weather == "Clouds"){
				var icon = "<svg class='sun sun2' viewbox='-75 -17 100 100'><circle cx='0' cy='0' r='5'></circle></svg><div class='cloudrain'></div>";
			}else{
				var icon = "<svg class='sun' viewbox='-72 -17 100 100'><circle cx='0' cy='0' r='7'></circle></svg>";
			}
			// console.log(icon);
			$(".top").append(icon);
			$(e.list).each(function(){
				//一天
				var today = new Date(e.list[0].dt * 1000);
				var YY = today.getFullYear();
				var MM = today.getMonth()+1;
				var DD = today.getDate();
				
				$(".time").html(YY+"/"+MM+"/"+DD);
				$(".temperature").html(parseInt(e.list[0].temp.day)+"&deg;C");
				// ----------------------------------------------
				// 取一個禮拜
				var myDate = new Date(this.dt * 1000);
				var W = myDate.getDay();
				if(W==0){
					W="星期日";
				}else if(W==1){
					W="星期一";
				}else if(W==2){
					W="星期二";
				}else if(W==3){
					W="星期三";
				}else if(W==4){
					W="星期四";
				}else if(W==5){
					W="星期五";
				}else if (W==6){
					W="星期六";
				}
				var weather = this.weather[0].main;
				for(var i=0;i<7; i++){
					var j =i+1;
					var tem = parseInt(e.list[i].temp.day);
					if(j<7){
						var temj = parseInt(e.list[j].temp.day);
					}
					$(".temsvg text:nth-of-type("+j+")").text(tem+"℃");
					var yyy = ((tem*-5)+170)*1.2;
					$(".temsvg circle:nth-of-type("+j+")").attr("cy",yyy).attr("cx",i*70);
					$(".temsvg line:nth-of-type("+j+")").attr("x1",i*70).attr("x2",(i*70)+70).attr("y1",yyy).attr("y2",((temj*-5)+170)*1.2);
					$(".temsvg text:nth-of-type("+j+")").attr("x",i*70).attr("y",yyy+5);
				};
				var dayweather = "<div class='dayweather'><h3>{{day}}</h3><svg viewbox='-50 -50 100 100'>{{weather}}</svg></div>";
				if(weather == "Rain"){
					var ssvvgg = "<line class='rain' x1='-25' y1='15' x2='-25' y2='35'></line><line class='rain' x1='-14' y1='5' x2='-14' y2='25'></line><line class='rain' x1='-5' y1='20' x2='-5' y2='45'></line><circle class='cloud' cx='0' cy='30' r='20'></circle><circle class='cloud' cx='-15' cy='30' r='20'></circle><circle class='cloud' cx='-30' cy='30' r='20'></circle><circle class='cloud' cx='-25' cy='10' r='15'></circle><circle class='cloud' cx='-7' cy='15' r='15'></circle>";
				}else if(weather == "Clouds"){
					var ssvvgg = "<circle class='sun' cx='0' cy='0' r='22'></circle><circle class='cloud' cx='0' cy='30' r='20'></circle><circle class='cloud' cx='-15' cy='30' r='20'></circle><circle class='cloud' cx='-30' cy='30' r='20'></circle><circle class='cloud' cx='-25' cy='10' r='15'></circle><circle class='cloud' cx='-7' cy='15' r='15'></circle>";
				}else{
					var ssvvgg = "<circle class='sun' cx='0' cy='0' r='22'></circle>";
				}
				var currentday = dayweather.replace("{{day}}",W)
										   .replace("{{weather}}",ssvvgg);
				$(".bottom").append(currentday);
			});
		},
		error:function(){
			console.log("error");
		},
	})
});