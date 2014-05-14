$(function() {
	verifyNewSong();
});

function verifyNewSong() {
	$.ajax({
			url: "http://www.radiocidade.fm/tools/marquee_cidade.html",
			context: document.body
		}).done(function(data) {
			console.log("Tocando: ", data)
		});

	setTimeout(verifyNewSong, 5000);
}