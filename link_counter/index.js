(function () {
	var links = {
		pdf: [],
		doc: [],
		mailto: [],
		image: [],
		other: [],
		all: [],
	};

	function checkLink () {
		//TODO: need a simple way to get that back into the html
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			console.log(this.status);
		};
		xhttp.open("GET", href, true);
		xhttp.send();
	}

	function get_links () {
		var link_elements = document.querySelectorAll('a');

		for (var i = 0; i < link_elements.length; i++) {
			if (!link_elements[i].href) {
				continue;
			}

			var href = link_elements[i].href;

			//checkLink();

			if (href.indexOf("mailto") === 0) {
				links.mailto.push(href);
			} else if (href.indexOf(".pdf") > -1) {
				links.pdf.push(href);
			} else if (
				href.indexOf(".doc") > -1 ||
				href.indexOf(".docx") > -1 ||
				href.indexOf(".odf") > -1
			) {
				links.doc.push(href);
			} else if (
				href.indexOf(".jpg") > -1 ||
				href.indexOf(".jpeg") > -1 ||
				href.indexOf(".webm") > -1 ||
				href.indexOf(".png") > -1 ||
				href.indexOf(".gif") > -1
			) {
				links.image.push(href);
			} else {
				links.other.push(href);
			}
			links.all.push(href);
		}
	}

	function clean () {
		links = {
			pdf: [],
			doc: [],
			mailto: [],
			image: [],
			other: [],
			all: [],
		};

		if (window.banani_link_counter_container) {
			document.body.removeChild(window.banani_link_counter_container);
			window.banani_link_counter_container = null;
		}
	}

	function get_details_html (title, links) {
		var detailStyles = [
			"background:#FFF",
			"color:#000",
			"margin: 0 0 16px",
		];
		var html = '<details style="' + detailStyles.join(";") + '">';
				html += '<summary>' + title + ' (' + links.length + ')</summary>';
				html += '<ol>';
					for (var i = 0; i < links.length; i++) {
						html += '<li>';
							html += '<a href ="' + links[i] + '">';
								html += links[i];
							html += '</a>';
						html += '</li>';
					}
				html += '</ol>';
			html += '</details>';
		return html;
	}

	function update_html () {
		var containerStyles = [
			"display:flex",
			"flex-direction:column",
			"position:fixed",
			"width:100vw",
			"height:80vh",
			"max-width: 900px",
			"overflow:auto",
			"left:50%",
			"top:50%",
			"transform:translate(-50%,-50%)",
			"background:#777",
			"padding:16px",
			"box-sizing:border-box",
			"z-index:99999",
		];

		var closeButtonStyle = [
			"display:flex",
			"justify-content:center",
			"align-items:center",
			"text-align:center",
			"position:fixed",
			"right:8px",
			"top:8px",
			"width:24px",
			"height:24px",
			"background:#d00",
			"border:0",
			"color:#fff",
		];

		var html = '<div id="banani_link_counter_container" style="' + containerStyles.join(";") + '">';
			html += '<button style="' + closeButtonStyle.join(";") + '" onclick="clear();">x</button>';
			html += get_details_html("PDFs", links.pdf);
			html += get_details_html("DOCs", links.doc);
			html += get_details_html("Mailtos", links.mailto);
			html += get_details_html("Images", links.image);
			html += get_details_html("Other", links.other);
			html += get_details_html("All in order", links.all);
		html += '</div>';

		document.body.innerHTML = html + document.body.innerHTML;
	}

	clean();
	get_links();
	update_html();
})();
