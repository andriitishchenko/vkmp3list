# vkmp3list
Chrome extension for downloading mp3 list URLs


MAC OS X<br>
<code>
file_name=<FILE NAME HERE> && cur_path=$(pwd) split -l 50 $file_name PARTDEF && find . -name "PARTDEF*" -print0 | xargs -0 -I f osascript -e 'tell application "Terminal" to do script "cd $cur_path && cat f | while read CMD; do curl -O $CMD; done; rm f;"' 
</code>
<br><br>Linux<br>
<code>
cat <FILE NAME HERE> | while read CMD; do curl -O $CMD; done;
</code>
<br><br>Windows<br> 
use any of Downloader  wich allow use list of files<br>
for example <a href="http://www.leniel.net/2010/07/automate-batch-download-mass-list-urls.html#sthash.67UnYwuv.dpbs">this</a>