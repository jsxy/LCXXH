/**
 *
 */
/* Extend */

kendo.data.DataSource.prototype.xquery = function(options,callback){
	var _this = this;
	options = _this._mergeState(options);

	_this.read(options).then(function() {
		if(callback && $.isFunction(callback)){
			//options.complete = callback;
			callback(_this);
		}
	});
};



/* Adaptor */
$.fn.hcMenu = $.fn.kendoMenu;
$.fn.hcGrid = $.fn.kendoGrid;
$.fn.hcButton = $.fn.kendoButton;
$.fn.hcDateTimePicker = $.fn.kendoDateTimePicker;
$.fn.hcNumericTextBox = $.fn.kendoNumericTextBox;
$.fn.hcWindow = $.fn.kendoWindow;

$.fn.hcAutoComplete = $.fn.kendoAutoComplete;
$.fn.hcCalendar = $.fn.kendoCalendar;
$.fn.hcComboBox = $.fn.kendoComboBox;
$.fn.hcDatePicker = $.fn.kendoDatePicker;
$.fn.hcDropDownList = $.fn.kendoDropDownList;
$.fn.hcGantt = $.fn.kendoGantt;
$.fn.hcMaskedTextBox = $.fn.kendoMaskedTextBox;
$.fn.hcMultiSelect = $.fn.kendoMultiSelect;
$.fn.hcNotification = $.fn.kendoNotification;
$.fn.hcPanelBar = $.fn.kendoPanelBar;
$.fn.hcPivotGrid = $.fn.kendoPivotGrid;
$.fn.hcScheduler = $.fn.kendoScheduler;
$.fn.hcSlider = $.fn.kendoSlider;
$.fn.hcTabStrip = $.fn.kendoTabStrip;
$.fn.hcTimePicker = $.fn.kendoTimePicker;
$.fn.hcTooltip = $.fn.kendoTooltip;
$.fn.hcValidator = $.fn.kendoValidator;
$.fn.hcWindow = $.fn.kendoWindow;
$.fn.hcTreeList = $.fn.kendoTreeList;
$.fn.hcMultiSelect = $.fn.kendoMultiSelect;

var hc = kendo;
