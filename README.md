# vkmp3list
Chrome extension for VK.COM what allow to get list of mp3 URLs on the "Search page"

<ul>
	<li>1. Get urls list</li>
	<li>2. Download files from list</li>
	<li>3. Have fun :)</li>
</ul>

MAC OS X<br>
''''
file_name=newMP3List.txt && cur_path=$(pwd) && split -l 50 $file_name PART && find . -name "PART*" -print0 | xargs -0 -I f osascript -e "tell application \"Terminal\" to do script \"cd $cur_path && cat f | while read CMD; do curl -O \\\"\$CMD\\\"; done; rm f;\""
''''
<br><br>Linux<br>
<code>
cat <FILE NAME HERE> | while read CMD; do curl -O $CMD; done;
</code>
<br><br>Windows<br> 
use any of Downloader  wich allow use list of files<br>
for example <a href="http://www.leniel.net/2010/07/automate-batch-download-mass-list-urls.html#sthash.67UnYwuv.dpbs">this</a>