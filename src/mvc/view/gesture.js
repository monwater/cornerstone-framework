
define( [ 'backbone', 'underscore', 'jquery', 'jquery.hammer' ], function( Backbone, _, $ ) {

	return Backbone.View.extend( {
	
		constructor: function( attributes, options ) {
			
			// Backbone.View.apply가 실행이 되어야 this.$, this.$el을 사용할 수 있으므로 여기서는 다른 방법을 사용한다.
			var $el = $( this.el );
			var selectors = [];
		
			if ( this.events ) {
				_.each( this.events, function( value, key ) {
					var match = key.match( /^(\S+)\s*(.*)$/ );
					var eventName = match[ 1 ], selector = match[ 2 ];
					
					console.log( $el.__proto__ );
					
					// hammer.js에서 처리 가능한 이벤트를 정의한 selector들을 구한다.
					if ( _.contains( [ 'hold', 'tap', 'doubletap', 'transformstart', 'transform', 'transformend', 'dragstart', 'drag', 'dragend', 'swipe', 'release' ], eventName ) ) selectors.push( selector );
				} );
			}
			
			_.each( _.uniq( selectors ), function( value, index ) {
				( value ? $el.find( value ) : $el ).hammer( { prevent_default: true } );
			} );
			
			// 여기서 extend 된 View들의 initialize가 실행된다.
			// 따라서 extend 된 View들의 initialize보다 먼저 실행하려면 앞쪽에, 나중에 실행하려면 뒷쪽에 코드를 작성한다.
			Backbone.View.apply( this, arguments );
		}
	} );
} );