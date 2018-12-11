var API_URL = 'https://api.github.com/';

$(document).ready(function() {

	function getUserFollowers(id, selector) {

		/**
		Function that gets the followers from GITHUB
		* @param {id} Id to identify the current row
		* @param {selector} Current button selector 
		**/

		var currentList = $('#followers-'+id);
		var followersUrl = $(currentList).attr('data-url');
		var page = $(currentList).attr('data-page');
		var newPage = Number(page) + 1;
		

		$.get(followersUrl +'?page=' + newPage, function(response) {

			var followers = response;

			if (response.length > 0) {

				$(currentList).attr('data-page', newPage);				
				followers.forEach(function(value, index){
					$(currentList).append('<li class="list-inline-item"> <img src="'+
						value.avatar_url +'" width="40" height="40"></li>')
				});
			
			} else {
				$(selector).hide();
			}

		});	
	}

	function search() {

		/**
		Function that search users in GITHUB
		**/

		var quantity = 0;

		var query = $('#search').val();

		$.get(API_URL + 'search/users?q='+ query, function(response) {

			var items = response.items;

			var result = $('#results');
			$(result).empty();

			items.forEach(function(value, index) {
				
				if (quantity > 5)
					return;

				var followersId = 'followers-' + index;

				$(result).append('<tr><td scope="row">'+index+'</td><td><img src="'+
					value.avatar_url+'" width="60" height="60"><span>'+
					value.login+'</span></td><td data-position="'+index+'"><ul class="list-inline" data-page=0 data-url="'+
					value.followers_url+'" id="'+ followersId +'"></ul>'+
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
