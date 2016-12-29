$(function(){
	

});

function doSearch() {
  var query = document.getElementById('query').value;
  console.log(query);
  var searchResult = document.getElementById("searchResult");
  searchResult.innerHTML = "";
  search(query);
}

var search = function(query) {
	$.ajax( {
    url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&list=search&origin=*&rvprop=content&srsearch=' + query,
    dataType: 'json',
    type: 'POST',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
       console.log('Search data');
       console.log(data['query']['search']);
       showSearchList(data.query.search);
    }
});
}

function showSearchList(content) {
	var searchResult = document.getElementById("searchResult");
	$.each(content, function(key) {
    console.log(content[key]);
    var title = content[key].title;
    var snippet = content[key].snippet;
    var link = 'https://en.wikipedia.org/wiki/' + title.replace(/ /g, '_');

    searchResult.innerHTML += "<a href='" + link + "' class='link' target='_blank'>" +
                              "<div class='jumbotron'>" +
                              "<h2>" + title + "</h2>" +
                              "<p>" + snippet + "...</p>" +
                              "</div>"
                              "</a>";
	});
}
