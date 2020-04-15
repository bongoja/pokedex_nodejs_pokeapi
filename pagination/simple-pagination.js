(function(){
	var config = {
		max_results: 150,
		max_per_page: 12,
		page: 1
	},
	no_of_pages = Math.ceil( config.max_results / config.max_per_page ),
	results = [];

	function init(){
		for( var x = 0; x < config.max_results; x++ ){
			results[x] = "Result " + x;
		}
		document.getElementById("next").onclick = function() {
			pager("next");
			return false;
		};
		document.getElementById("previous").onclick = function() {
			pager("previous");
			return false;
		};
		document.getElementById("reset").onclick = function() {
			pager("reset");
			return false;
		};
		document.getElementById("goto").onclick = function() {
			pager("goto", document.getElementById("page_input").value);
			return false;
		};
		document.getElementById("page_nav").onclick = function(e) {
			var page = e.srcElement.getAttribute("data-page");
			if(page){
				pager("goto", page);
			}
			return false;
		};
		update_page();
	}


	function pager(action, page) {
		switch (action) {
			case "next":
				if( (config.page + 1) < no_of_pages ){
					++config.page;
				}
				break;

			case "previous":
				if( (config.page - 1) >= 1 ){
					 --config.page;
				}
				break;

			case "goto":
				config.page = page;
				break;

			case "reset":
				config.page = 1;
				break;

			default:
				break;
		}
		update_page();
	}
	function build_nav() {
		var i,
			page_nav = "";

		for( i = config.page; i < no_of_pages; i++ ){
			page_nav += "<li><a data-page=" + i + ">" + i + "</a></li>\n";
		}
		return page_nav;
	}
	function build_results(){
		var i,
			tmp = "",
			start = ( config.page !== 1 )? config.page * config.max_per_page : 1,
			end = start + config.max_per_page,
			result;

		for( i = start; i < end; i++ ){
			result = results[i];
			if(typeof result !== "undefined"){
				tmp += "<li>" + result + "</li>\n";
			}
			else {
				tmp = "";
			}
		}
		return tmp;
	}
	function update_page(){
		document.getElementById("curr_page").innerText = config.page;
		document.getElementById("page_nav").innerHTML = build_nav();
		document.getElementById("results").innerHTML = build_results();
	}
	window.addEventListener("load", function() {
		init();
	});
})();
