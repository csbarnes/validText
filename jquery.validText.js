(function($){
  $.fn.validText = function(options) {
		var defaults = {
			max_length: 20,
			min_length: 3,
			validate: true,
			add_class_failure: "vt-failure",
			add_class_success: "vt-success",
			callback_failure: function(){},
			callback_success: function(){},
			override: "username",
			override_regex: ""	//takes priority over override
		};

		var options = $.extend(defaults, options);
	
		//on object change
		return this.change(function() {
			//if the user wants to validate the field
			if(options.validate){
				//current object (either input or textfield)
				obj = $(this);
				
				var failed = false;
				var errors = [];
				
				//check min_length
				if(options.min_length > 0){
					if(obj.val().length < options.min_length){
						failed = true;
						errors.push("min_length");
					}
				}
				
				//check max_length
				if(options.max_length > 0){
					if(obj.val().length > options.max_length){
						failed = true;
						errors.push("max_length");
					}
				}
				
				//check override
				if(options.override != "" && options.override_regex == "" && !failed){
					//set default username regex
					if(options.override == "username"){
						options.override_regex = /^[a-zA-Z]+[a-zA-Z0-9]*$/;
					}
					//set default email regex
					else if(options.override == "email"){
						options.override_regex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/;
					}
				}
				
				//check override_regex
				if(options.override_regex != "" && !failed){
					if(!(obj.val()).match(options.override_regex)){
						failed = true;
						errors.push("invalid");
					}
				}
				
				//if failed
				if(failed){
					//add class to obj if not empty
					if(options.add_class_failure != ""){
						obj.addClass(options.add_class_failure);
					}
					
					if(options.add_class_success != ""){
						obj.removeClass(options.add_class_success);
					}
					
					options.callback_failure.call(this, errors);
				}
				//on success
				else{
					//remove failure class if not empty
					if(options.add_class_failure != ""){
						obj.removeClass(options.add_class_failure);
					}
					
					if(options.add_class_success != ""){
						obj.addClass(options.add_class_success);
					}
					
					options.callback_success.call(this);
				}
			}
		});
	};
})(jQuery);
