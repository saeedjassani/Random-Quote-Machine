$(document).ready(function() {
	var colors = [
		"#880E4F",
		"#F57F17",
		"#0D47A1",
		"#3E2723",
		"#b71c1c",
		"#4A148C",
		"#311B92",
		"#004D40",
		"#212121",
		"#D500F9",
		"#F57C00",
		"#76FF03",
		"#263238"
	];
	
	var gQuote = {};
	var i = 0;
	function tweetCurrentPage() {
		window.open(
			'https://twitter.com/intent/tweet?text="' +
				encodeURIComponent(gQuote.quoteText.trim() + '" ' + gQuote.quoteAuthor)
		);
		return false;
	}

	function getQuote() {
		i = Math.floor(Math.random() * (colors.length));
		console.log(i);
		$.getJSON(
			"https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
			function(quote) {
				gQuote = quote;
				
				document.getElementsByClassName("quote")[0].style.color = colors[i];
				document.getElementsByClassName("author")[0].style.color = colors[i];
				document
					.getElementById("refresh")
					.setAttribute("style", "color: " + colors[i] + ";");
				document
					.getElementsByClassName("twitter-share")[0]
					.setAttribute("style", "color: " + colors[i] + ";");
				$(".quote").html('"' + quote.quoteText + '"');
				$(".author").html("- " + (quote.quoteAuthor || 'Unknown'));
				document.getElementsByTagName("body")[0].style.backgroundColor = colors[i];
				$('.quote, .author, .twitter-share, #refresh, #body').addClass('animated fadeIn');
			}
		);
	}
	getQuote();

	$("#refresh").on("click", function() {
		getQuote();
		$('.quote, .author, .twitter-share, #refresh, #body').removeClass('animated fadeIn');
	});
	$(".twitter-share").on("click", function() {
		tweetCurrentPage();
	});
});
