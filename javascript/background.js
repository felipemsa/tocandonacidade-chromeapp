$(function() {
	verifyNewSong();
	$('a').click(function(){
		window.open(this.href);
	});
});

function verifyNewSong() {
	if (localStorage.last) {
		$('.song-info').eq(0).html(localStorage.last.split('-')[0] + '-' + localStorage.last.split('-')[1]);
	}
	$.ajax({
			url: "http://www.radiocidade.fm/tools/marquee_cidade.html",
			context: document.body
		}).success(function(data) {
			var strs = data.split('|');
			var now = strs[1];
			if (now && (!localStorage.last || localStorage.last != now)) {
				localStorage.last = now;
				$('.song-info').eq(0).html(now.split('-')[0] + '-' + now.split('-')[1]);
			}
		});

	setTimeout(verifyNewSong, 10000);
}