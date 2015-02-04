
$(document).ready(function() {

setTimeout(function(){

		function vkmp3list_download(link, filename)
		{
			var lst = document.createElement('a');
			lst.setAttribute('data-auto-download', '1');
			lst.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(link));
			lst.setAttribute('download', decodeURIComponent(filename));
			lst.click();
		}

		function vkmp3file_download(link, filename)
		{
			var lst = document.createElement('a');
			lst.setAttribute('data-auto-download', '1');
			lst.setAttribute('href','data:audio/mpeg3,' + encodeURIComponent(link))
			lst.setAttribute('download', filename);
			console.log(filename);
			lst.click();
		}


		function vkmp3list_process_item(item)
		{
			var title = $("span.title", $(item)).text();

			var singer = $(".area>.info>.title_wrap>b>a", $(item)).text();

			//clear 
			singer = (singer.replace(/([^%-\d\w\s\u0400-\u0457\(\)])|(\s{2,})/gi,''));
			title = (title.replace(/([^%-\d\w\s\u0400-\u0457\(\)])|(\s{2,})/gi,''));

			//format
			singer = (singer.replace(/([^%-\d\w\s\u0400-\u0457\(\)])|(\s{2,})/gi,'')).trim();
			title = (title.replace(/([^%-\d\w\s\u0400-\u0457\(\)])|(\s{2,})/gi,'')).trim().substr(0, 35);

			// singer = singer.replace( /([a-z])([A-Z])/g, "$1 $2");
			// singer = singer.replace( /([\u0430-\u0457])([\u0400-\u042F])/g, "$1 $2");

			var song ="" + singer+" - "+title;
			// song = (song.replace(/([^%-\d\w\s\u0400-\u0457\(\)])|(\s{2,})/gi,'')).trim();
			
			var param = "&/"+ decodeURIComponent(song)+".mp3";

			var link = ""+$("input[id^='audio_info']", $(item)).attr('value');
			link=link.replace(/,\d.+/g,param);
			return link;
		}

		function vkmp3list_download_process(sender)
		{
			var item = $(sender).parents("div.audio[id^='audio']");
			var link = vkmp3list_process_item(item);
			console.log(link);
			var song = link.replace(/[^]*&\//g,'');
			vkmp3file_download(link,song);
			
		}

		var dButton=document.createElement('div');
		    dButton.setAttribute("id", "dButton");    
		
		$("<div/>", {
		      "class": "label",
		      text: "Download list",
		      click: function(){

					var ttFLNMList = [];
					var ttFLNMListUnique = [];
					$("div.audio[id^='audio']").each(function(){
						var link = vkmp3list_process_item(this);
						var song = link.replace(/[^]*&\//g,'');
						var key = song.toLowerCase().replace(/(\s+)/gi,'');
						if (!(ttFLNMListUnique.indexOf(key) > -1)) {
							ttFLNMListUnique.push(key);
							ttFLNMList.push(link);
						}
					});
					var tmpData = ttFLNMList.join("\n");
					
					var ttFLNMArray = location.search.match(new RegExp("([?&]q=)([^&]*)"));
					vkmp3list_download(tmpData,ttFLNMArray[2]);
		      }
		}).appendTo(dButton);

		$("div#album_filters").append(dButton);

		var dButton2=document.createElement('div');
		dButton2.setAttribute("class", "vkmp3listdl");
		var dtriangle=document.createElement('div');
		dtriangle.setAttribute("class", "arrow-down");
		dButton2.appendChild(dtriangle);

		$(dButton2).bind( "click", function(e) {
  			vkmp3list_download_process(this);
  			e.preventDefault();
		});

		$("div.play_btn_wrap").append(dButton2);

}, 3000);


});
// console.log("INJECTED");
