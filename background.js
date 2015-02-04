
$(document).ready(function() {

var dButton=document.createElement('div');
    dButton.setAttribute("id", "dButton");    
$("<div/>", {
      "class": "label",
      text: "Download list",
      click: function(){

			var ttFLNMList = [];
			var ttFLNMListUnique = [];
			$("div.audio[id^='audio']").each(function(){
				var title = $("span.title", $(this)).text();

				var singer=[];
				// var singer = "";
				$("b>a>span", $(this)).each(function(){
					singer.push($(this).text());
				});
				singer = singer.join(" ");
				var song ="" + singer+" - "+title;
				song = (song.replace(/([^%-\d\w\s\u0400-\u04FF\(\)])|(\s{2,})/gi,'')).trim();
				// console.log(song);
				var key = song.toLowerCase().replace(/(\s+)/gi,'');
				if (!(ttFLNMListUnique.indexOf(key) > -1)) {
					ttFLNMListUnique.push(key);
					// var param = "&/"+ encodeURIComponent(song)+".mp3";
					var param = "&/"+ decodeURIComponent(song)+".mp3";
					var link = ""+$("input[id^='audio_info']", $(this)).attr('value');
					link=link.replace(/,\d.+/g,param);
					ttFLNMList.push(link);
					// console.log(param);
				}
			});

			var tmpData = ttFLNMList.join("\n");
			var ttFLNMArray = location.search.match(new RegExp("([?&]q=)([^&]*)"));
			var lst = document.createElement('a');
			lst.setAttribute('data-auto-download', '1');
			lst.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(tmpData));
			lst.setAttribute('download', decodeURIComponent(ttFLNMArray[2]));
			lst.click();

      }
}).appendTo(dButton);

$("div#album_filters").append(dButton);
});
// console.log("INJECTED");
