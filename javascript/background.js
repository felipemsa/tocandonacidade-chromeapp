$(function() {
	setTimeout(function() {
	$('a').blur();
	}, 200);
	verifyNewSong();
	$('a').click(function(){
		window.open(this.href);
	});
	$('body').focus();
	if (localStorage.notify == 'true') {
		$('input[name=notify]').prop('checked', true);
	} else {
		$('input[name=notify]').prop('checked', false);
	}
	$('input[name=notify]').click(function() {
		if (this.checked) {
			localStorage.notify = true;
		} else {
			localStorage.notify = false;
		}
	});
});

function verifyNewSong() {
	if (localStorage.last) {
		var music = localStorage.last.split('-')[0] + '-' + localStorage.last.split('-')[1];
		$('.song-info').eq(0).html(music);
	}
	$.ajax({
			url: "http://www.radiocidade.fm/tools/marquee_cidade.html",
			context: document.body
		}).success(function(data) {
			var strs = data.split('|');
			var now = strs[1];
			if (now && (!localStorage.last || localStorage.last != now)) {
				localStorage.last = now;
				var music = localStorage.last.split('-')[0] + '-' + localStorage.last.split('-')[1];
				$('.song-info').eq(0).html(music);
				if (localStorage.notify == 'true') {
					var notification = webkitNotifications.createNotification('../images/ela-voltou.jpeg', 'Tocando na Cidade', music);
					notification.show();
					notification.onclick = function() {
						window.open('http://www.radiocidade.fm/player.php');
						notification.cancel();
					};
					setTimeout(function() {
						notification.cancel();
					}, 15000);
				}
			}
		});

	setTimeout(verifyNewSong, 5000);
}