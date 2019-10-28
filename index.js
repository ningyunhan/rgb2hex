var RgbToHex = null;

(function($){
    RgbToHex = {
        form: $("#rgb-2-hex-form"),
        convertBtn: $("#rgb-2-hex-form button[data-type='convert']"),
        result: $("#result-container .result"),
        resultDemo: $("#result-container .result-demo"),
        formValidator: null,

        clearForm: function() {
            $.map(this.form.find("input"), function(input) {
                $(input).val("");
            });
            this.formValidator.resetForm();
        },

        copyToClipboard: function(value) {
            var temp = $("<input>");
            $("body").append(temp);
            temp.val(value).select();
            document.execCommand("copy");
            temp.remove();
        },

        onClickConvertBtn: function() {
            var self = this;
            this.convertBtn.off("click");
            this.convertBtn.on("click", function(){
                if(self.form.valid()) {
                    var result = "#";
                    $.map(self.form.find("input"), function(input){
                        var target = $(input);
                        var res = (target.val() * 1).toString(16);
                        if(res.length === 1) {
                            res = "0" + res;
                        }
                        result += res.toUpperCase();
                    });

                    self.result.empty().text(result);
                    self.copyToClipboard(result);
                    self.resultDemo.css({
                        background: result
                    });
                    self.clearForm();
                }
            })
        },

        initForm: function() {
            this.formValidator = this.form.validate({
                rules: {
                    r: {
                        min: 0,
                        max: 255,
                        step: 1
                    },
                    g: {
                        min: 0,
                        max: 255,
                        step: 1
                    },
                    b: {
                        min: 0,
                        max: 255,
                        step: 1
                    }
                },
                errorPlacement: function(error, element) {
                    error.appendTo( element.closest("div.error-container") );
                }
            })
        },

        init: function(){
            this.initForm();

            this.onClickConvertBtn();
        }
    };

    RgbToHex.init();
})(jQuery);