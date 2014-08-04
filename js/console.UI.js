$(document).ready(function () {

	(function CONSOLE($) {

		var timers = new Array;
		var timersIndex = 0;

		var SIM_DELAY = 1500; // 1.5s delay
		
		var filters = new Filters;
		
		/** ... startup ........................................................ */
		
		setupEvents();
		
		function setupEvents() {


			// panel collapse page scrolling
			function scrollToPanelTop(panel) {
				var offset = panel.offset().top;
				if (offset) {
					$('html,body').animate({
						scrollTop: offset - 64	// - height of cluster toolbar
					}, 500); 
				}
			}
			
			// solo/accordion panel click
			$('.panel-heading > h5 > a').click(function (e) {
				e.preventDefault();
				accordion = $(this).attr("data-parent");
				if (accordion != "") {
					$(accordion).find('.in').collapse('hide');
				}
				$(this).parent().parent().next().collapse('toggle');
			});
			// create panel click
			$('.btn-row-over-panel > a').click(function (e) {
				e.preventDefault();
				$(this).parent().parent().next().collapse('toggle');
			});
			// management panel click
			$('.panel-panel-container > .panel-heading > a').click(function (e) {
				e.preventDefault();
				$(this).parent().next().collapse('toggle');
			});

			// solo panel or in accordion shown
			$('.panel-collapse').on('shown.bs.collapse', function (e) {
				e.stopPropagation();
				// scroll page
				scrollToPanelTop($(this).parent());
			});
			// solo panel or in accordion hidden
			$('.panel-collapse').on('hidden.bs.collapse', function (e) {
				e.stopPropagation();
			});
			// create template/blueprint/credential panel shown
			$('.panel-under-btn-collapse').on('shown.bs.collapse', function (e) {
				e.stopPropagation();
				// button switch
				$(this).parent().prev()
				.find('.btn').fadeTo("fast", 0, function () { 
					$(this).removeClass('btn-success').addClass('btn-info')
					.find('i').removeClass('fa-plus').addClass('fa-times').removeClass('fa-fw')
					.parent().find('span').addClass('hidden');
					$(this).fadeTo("slow", 1);
				});
				// scroll page
				scrollPanel($(this).parent().prev());	// btn-row-over-panel
			});
			// create template/blueprint/credential panel hidden
			$('.panel-under-btn-collapse').on('hidden.bs.collapse', function (e) {
				e.stopPropagation();
				$(this).parent().prev()
				.find('.btn').fadeTo("fast", 0, function () { 
					$(this).removeClass('btn-info').addClass('btn-success')
					.find('i').removeClass('fa-times').addClass('fa-plus').addClass('fa-fw')
					.parent().find('span').removeClass('hidden');
					$(this).fadeTo("slow", 1);
				});
			});			
			// management panel shown	
			$('.panel-btn-in-header-collapse').on('shown.bs.collapse', function (e) {
				// button switch
				$(this).parent().find('.panel-heading .btn i').removeClass('fa-angle-down').addClass('fa-angle-up');
				// scroll page
				scrollToPanelTop($(this).parent().parent());	// panel
			});
			// management panel hidden
			$('.panel-btn-in-header-collapse').on('hidden.bs.collapse', function (e) {
				// button switch
				$(this).parent().find('.panel-heading .btn i').removeClass('fa-angle-up').addClass('fa-angle-down');
			});
			

			// btn-segmented-control
			$('.btn-segmented-control a').click(function (e) {
				var selected = 'btn-info';
				var active = 'btn-default';
				var control = $(this).parent().parent();
				e.preventDefault();
				control.find('a').each(function () {
					$(this).removeClass(selected).addClass(active);
				});
				$(this).removeClass(active).addClass(selected);

				// do something...
			});

		}



		/** ... Filters ....................................................... */

		function Filters() {
			
			// date pickers
			
			$('#datePickerStart').datetimepicker({
				icons: {
					time: "fa fa-clock-o",
					date: "fa fa-calendar",
					up: "fa fa-arrow-up",
					down: "fa fa-arrow-down"
				},
				pickTime: false
			});
			$('#datePickerStart').data("DateTimePicker").setMaxDate(moment().subtract('days', 1));	// yesterday
			
			$('#datePickerEnd').datetimepicker({
				icons: {
					time: "fa fa-clock-o",
					date: "fa fa-calendar",
					up: "fa fa-arrow-up",
					down: "fa fa-arrow-down"
				},
				pickTime: false
			});
			$('#datePickerEnd').data("DateTimePicker").setMaxDate(moment());	// today
			
			
			// setup events

			// date pickers connected + filter active
			$("#datePickerStart").on("dp.change",function (e) {
				$('#datePickerEnd').data("DateTimePicker").setMinDate(e.date);
				// filter activated
				$('.col-xs-6').has(this).addClass('active');
			});
			$("#datePickerEnd").on("dp.change",function (e) {
				$('#datePickerStart').data("DateTimePicker").setMaxDate(e.date);
				// filter activated
				$('.col-xs-6').has(this).addClass('active');
      });

			// "generate" report
			$('#btnGenReport').click(function (e) {
				var self = this;
				e.preventDefault();
				// disable button, start spinner
				$(this).addClass('disabled')
					.find('i').removeClass('fa-table').addClass('fa-circle-o-notch fa-spin');
				// simulated delay				
				timers[timersIndex++] = window.setTimeout(function () {
					$('.table-report').removeClass('hidden');
					// enable button, stop spinner
					$(self).removeClass('disabled')
						.find('i').removeClass('fa-circle-o-notch fa-spin').addClass('fa-table');
				}, SIM_DELAY);
			});
			
			// clear filters
			$('#btnClearFilters').click(function (e) {
				$('.row-filter .col-xs-6').removeClass('active');
				$('.row-filter input').val('');
				$('.row-filter select').prop('selectedIndex',0);
			});	
			
			// filter activated
			$('.row-filter input, .row-filter select').change(function (e) {
				$('.col-xs-6').has(this).addClass('active');
			});

			/** ....................... public methods ........................... */


		} // Filters

	
	})(jQuery);	// CONSOLE

});
