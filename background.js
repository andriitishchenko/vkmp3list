
$(document).ready(function() {

// $(document).bind('domChanged', function(){
//    console.log("test");
// });



// $(document).bind('DOMNodeInserted DOMNodeRemoved', function() {
// console.log("DOMNodeInserted DOMNodeRemoved");
// });

// $("div#search_list").bind("DOMSubtreeModified",function(){
//   console.log("DOMSubtreeModified search_list");
// });



setTimeout(function(){

		function vkmp3list_download(link, filename)
		{
			var lst = document.createElement('a');
			lst.setAttribute('data-auto-download', '1');
			lst.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(link));
			lst.setAttribute('download', decodeURIComponent(filename));
			lst.click();
			console.log(link);
		}

		function vkmp3file_download(link, filename)
		{

			var lst = document.createElement('a');
			lst.setAttribute('data-auto-download', '1');
			lst.setAttribute('href',link + "&?/"+ encodeURIComponent(filename));
			lst.setAttribute('download', decodeURIComponent(filename));
			lst.click();
		}


		function vkmp3list_process_item(item)
		{
			var title = $("span.title", $(item)).text();
			var singer = $(".area .info>.title_wrap>b>a", $(item)).text();

			//clear 
			singer = (singer.replace(/([^%-\d\w\s\u0400-\u0457\(\)])|(\s{2,})/gi,''));
			title = (title.replace(/([^%-\d\w\s\u0400-\u0457\(\)])|(\s{2,})/gi,''));

			//format
			singer = (singer.replace(/([^%-\d\w\s\u0400-\u0457\(\)])|(\s{2,})/gi,'')).trim();
			title = (title.replace(/([^%-\d\w\s\u0400-\u0457\(\)])|(\s{2,})/gi,'')).trim().substr(0, 35);

			var song ="" + singer+" - "+title;			
			var param = "&/"+ decodeURIComponent(song)+".mp3";
			// var param = "&/"+ encodeURIComponent(song)+".mp3";

			var link = ""+$("input[id^='audio_info']", $(item)).attr('value');
			link=link.replace(/,\d.+/g,param);
			return link;
		}

		function vkmp3list_download_process(sender)
		{
			var item = $(sender).parents("div.audio[id^='audio']");
			var link = vkmp3list_process_item(item);
			var song = link.replace(/[^]*&\//g,'');


			link = link.replace(/&\/+.*/g,'');

			vkmp3file_download(link,song);
		}

		function ConstructorMenuItem(id, title,functionName)
		{
			var item=document.createElement('div');
		    item.setAttribute("id", id);   
		    item.setAttribute("class", "ui_rmenu_item"); 
		
			var obj = $("<div/>", {
		      "class": "label",
		      text: title,
		      click: functionName
			}).appendTo(item);
			$("div#narrow_column>.ui_rmenu").append(item);
			return obj;
		}


		//ConstructorMenuItem("dButton_download_list","Download list",download_list);
		ConstructorMenuItem("dButton_hq_add","Add HQ to Library",add_all_hq_to_library);
		ConstructorMenuItem("dButton_hq_only","Show HQ only",hide_non_hq_items);
		ConstructorMenuItem("test","testpos",testpos);


		function testpos(){

			var data = {
				"act":"reload_audio",
				"al":1,
				"ids":"30856798_157942874"
			} ;

			$.ajax({
			  url:"al_audio.php",
			  type:"POST",
			  data:data,
			  contentType:"application/x-www-form-urlencoded",
			  //dataType:"json",
			  success: function(){
			    
			  }
			})

			
		}


		function download_list(){
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
					var filename = "newMP3List";
					var ttFLNMArray = location.search.match(new RegExp("([?&]q=)([^&]*)"));
					if (ttFLNMArray!=null) {
						filename = ttFLNMArray[2];
					};
					vkmp3list_download(tmpData,filename);
		      }

		function hide_non_hq_items(){
			$("._audio_row:not(.hq)").remove();
		}


		function add_all_hq_to_library(){
			$("div.audio_hq_label","div.audio_row.hq").parent( "div.audio_duration_wrap").children("div.audio_acts").children("div#add").each(function(index) { 
			 var self= this; 
			 setTimeout(function(){ 
			  //console.log("click"); 
			  self.click(); 
			  }, index*3000); 
			}); 
		}




		var vkmp3listdlbtnSwitch = 0;

		$(document).bind("DOMSubtreeModified",function(e){
				if (vkmp3listdlbtnSwitch!=0) {
					e.stopPropagation();
					return;
				};
				$("div.play_btn_wrap:not(.vkmp3listdlbtn)").each(function(index) {
					vkmp3listdlbtnSwitch = 1;
					$(this).addClass( "vkmp3listdlbtn" );
					var dButton2=document.createElement('div');
					dButton2.setAttribute("class", "vkmp3listdl");
					var dtriangle=document.createElement('div');
					dtriangle.setAttribute("class", "arrow-down");
					dButton2.appendChild(dtriangle);

					$(dButton2).bind( "click", function(e) {
						e.preventDefault();
			  			vkmp3list_download_process(this);
					});
		        	$(this).append(dButton2);
		    	})
		    	.promise()
		    	.done( function() {
		        	vkmp3listdlbtnSwitch = 0;
		    	});
		});

}, 3000);


});