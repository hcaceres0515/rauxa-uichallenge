
//https://api.github.com/search/users?q=a+repos&page=12
//https://api.github.com/users/amatiasq/followers

var API_URL = 'https://api.github.com/';
var CREDENTIALS = '&access_token=31f983c9efa6670b2503be9f5168fa5d205546d4'; 

$(document).ready(function() {

	function getUserFollowers(id, selector) {

		var currentList = $('#followers-'+id);
		var followersUrl = $(currentList).attr('data-url');
		var page = $(currentList).attr('data-page');
		var newPage = Number(page) + 1;
		

		$.get(followersUrl +'?page=' + newPage + CREDENTIALS, function(response) {

			var followers = response;

			if (response.length > 0) {

				$(currentList).attr('data-page', newPage);
				
				followers.forEach(function(value, index){
					$(currentList).append('<li class="list-inline-item"> <img src="' + value.avatar_url +'" width="40" height="40"></li>')
				});
			} else {
				$(selector).hide();
			}

		});	
	}

	function search() {

		var quantity = 0;

		var query = $('#search').val();

		$.get(API_URL + 'search/users?q='+ query +'+repos', function(response) {
			console.log(response);

			var items = response.items;

			var result = $('#results');
			$(result).empty();

			items.forEach(function(value, index) {
				
				if (quantity > 5)
					return;

				var followersId = 'followers-' + index;

				$(result).append('<tr><td scope="row">'+index+'</td><td><img src="'+
					value.avatar_url+'" width="60" height="60"><span>'+
					value.login+'</span></td><td data-position="'+index+'"><ul class="list-inline" data-page=0 data-url="'+value.followers_url+'" id="'+ followersId +'"></ul>'+
					'<button class="btn btn-primary btn-sm btnLoadMore"> + More </button></td>'+
					'<td>'+value.score+'</td>'+	
					'</tr>');

				quantity = quantity + 1;
				getUserFollowers(index);			

			});

			$('.btnLoadMore').click(function() {

				var id = $(this).parent().data('position');
				getUserFollowers(id, this)

			});
		
		});		

	}	
	

	$('#btnSearch').click(function() {
		search();
	});

});
