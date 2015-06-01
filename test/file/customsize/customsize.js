var arrMenu = [ {
	title : 'All Categories',
	id : 'menuID',
	icon : 'fa fa-reorder',
	items : [ {
		name : 'Devices',
		id : 'itemID',
		icon : 'fa fa-laptop',
		link : '#',
		items : [ {
			title : 'Devices',
			icon : 'fa fa-laptop',
			items : [ {
				name : 'Mobile Phones',
				icon : 'fa fa-phone',
				link : '#',
				items : [ {
					title : 'Mobile Phones',
					icon : 'fa fa-phone',
					link : '#',
					items : [ {
						name : 'Super Smart Phone',
						link : '#'
					}, {
						name : 'Thin Magic Mobile',
						link : '#'
					}, {
						name : 'Performance Crusher',
						link : '#'
					}, {
						name : 'Futuristic Experience',
						link : '#'
					} ]
				} ]
			}, {
				name : 'Televisions',
				icon : 'fa fa-desktop',
				link : '#',
				items : [ {
					title : 'Televisions',
					icon : 'fa fa-desktop',
					link : '#',
					items : [ {
						name : 'Flat Super Screen',
						link : '#'
					}, {
						name : 'Gigantic LED',
						link : '#'
					}, {
						name : 'Power Eater',
						link : '#'
					}, {
						name : '3D Experience',
						link : '#'
					}, {
						name : 'Classic Comfort',
						link : '#'
					} ]
				} ]
			}, {
				name : 'Cameras',
				icon : 'fa fa-camera-retro',
				link : '#',
				items : [ {
					title : 'Cameras',
					icon : 'fa fa-camera-retro',
					link : '#',
					items : [ {
						name : 'Smart Shot',
						link : '#'
					}, {
						name : 'Power Shooter',
						link : '#'
					}, {
						name : 'Easy Photo Maker',
						link : '#'
					}, {
						name : 'Super Pixel',
						link : '#'
					} ]
				} ]
			} ]
		} ]
	}, {
		name : 'Magazines',
		icon : 'fa fa-book',
		link : '#',
		items : [ {
			title : 'Magazines',
			icon : 'fa fa-book',
			items : [ {
				name : 'National Geographics',
				link : '#'
			}, {
				name : 'Scientific American',
				link : '#'
			}, {
				name : 'The Spectator',
				link : '#'
			}, {
				name : 'Rambler',
				link : '#'
			}, {
				name : 'Physics World',
				link : '#'
			}, {
				name : 'The New Scientist',
				link : '#'
			} ]
		} ]
	}, {
		name : 'Store',
		icon : 'fa fa-shopping-cart',
		link : '#',
		items : [ {
			title : 'Store',
			icon : 'fa fa-shopping-cart',
			items : [ {
				name : 'Clothes',
				icon : 'fa fa-tags',
				link : '#',
				items : [ {
					title : 'Clothes',
					icon : 'fa fa-tags',
					items : [ {
						name : 'Women\'s Clothing',
						icon : 'fa fa-female',
						link : '#',
						items : [ {
							title : 'Women\'s Clothing',
							icon : 'fa fa-female',
							items : [ {
								name : 'Tops',
								link : '#'
							}, {
								name : 'Dresses',
								link : '#'
							}, {
								name : 'Trousers',
								link : '#'
							}, {
								name : 'Shoes',
								link : '#'
							}, {
								name : 'Sale',
								link : '#'
							} ]
						} ]
					}, {
						name : 'Men\'s Clothing',
						icon : 'fa fa-male',
						link : '#',
						items : [ {
							title : 'Men\'s Clothing',
							icon : 'fa fa-male',
							items : [ {
								name : 'Shirts',
								link : '#'
							}, {
								name : 'Trousers',
								link : '#'
							}, {
								name : 'Shoes',
								link : '#'
							}, {
								name : 'Sale',
								link : '#'
							} ]
						} ]
					} ]
				} ]
			}, {
				name : 'Jewelry',
				link : '#'
			}, {
				name : 'Music',
				link : '#'
			}, {
				name : 'Grocery',
				link : '#'
			} ]
		} ]
	}, {
		name : 'Collections',
		link : '#'
	}, {
		name : 'Credits',
		link : '#'
	} ]
} ];

$(document).ready(
		function() {
			// HTML markup implementation, overlap mode
			$('#menu').multilevelpushmenu({
				menu : arrMenu,
				menuWidth : 200, // '450px', '30em', '25%' will also work
				menuHeight : 400
			});

			var postClick = function() {
				Core9.sentMessageToParent(
						{ action : "menuClick",
						  href : this.href,
						  data : this.textContent });
			}
			var addItemsToMenu = function(title, items) {
				//console.log('adding to menu : ..');
				$('a').unbind('click',postClick);
				var $addTo = $('#menu').multilevelpushmenu('findmenusbytitle',
						title).first();
				$('#menu').multilevelpushmenu('additems', items, $addTo, 0);

				$('a').on('click',postClick);

			}
			$('a').on('click',postClick);

			var removeItemsFromMenu = function(title) {
				var item = $('#menu').multilevelpushmenu('finditemsbyname',
						title);
				$('#menu').multilevelpushmenu('removeitems', item);
			}


			var callback = function(event) {

				if (event.data.action == 'addItems') {
					addItemsToMenu(event.data.findmenusbytitle,
							event.data.addItems);

				}
			}

			Core9.listenToPostMessages(callback);

		});