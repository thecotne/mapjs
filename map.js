(function($) {
	$.fn.ITDCmap = function(opts) {
		var ITDCmaps = {
			canvas : null,
			$map : null,
			map: null,
			zoom : 8,
			center_lat : 42.110449,
			center_lng : 44.004879,
			point_icon : '',
			init : function(map){
				this.canvas = $(map).find('.map-canvas').get(0);
				this.$map = $(map);
				google.maps.event.addDomListener(window, 'load', this.initializeMap() );
			},
			initializeMap : function (){
				this.zoom = Number(this.$map.data('zoom')) || this.zoom;
				this.center_lat = Number(this.$map.data('center-lat')) || this.center_lat;
				this.center_lng = Number(this.$map.data('center-lng')) || this.center_lng;
				this.point_icon = this.$map.data('point-icon') || this.point_icon;
				this.map = new google.maps.Map(this.canvas,{
					zoom: this.zoom,
					center: new google.maps.LatLng(this.center_lat,this.center_lng),
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});
				this.$map.find('[data-info-window-list] [data-info-window]').each($.proxy(function(key,item){
					this.showMarker(item);
				},this));
			},
			showMarker : function (item){
				var latitude = Number($(item).data('latitude')) || 0;
				var longitude = Number($(item).data('longitude')) || 0;
				var marker = new google.maps.Marker({
					map: this.map,
					animation: google.maps.Animation.DROP,
					position: new google.maps.LatLng(latitude,longitude),
					icon: this.point_icon
				});
				var infowindow = new google.maps.InfoWindow();
				google.maps.event.addListener(marker, 'click', $.proxy(function(item,marker,infowindow,mt){
					infowindow.setContent( $(item).html() );
					infowindow.open(this.map, marker);
					if(this.infowindow && this.infowindow.close){
						this.infowindow.close();
					}
					infowindow.open(this.map, marker);
					this.infowindow = infowindow;
				},this,item,marker,infowindow));
			}
		};
		$(this).each(function(){
			var _ITDCmaps = Object.create(ITDCmaps);
			_ITDCmaps.init(this);
		});
	}
	$(function(){
		$("[data-googlemap]").ITDCmap();
	});
})(jQuery);