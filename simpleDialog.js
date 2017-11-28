;(function ($) {
$.simpleDialog = function (options, callback) {
        var template = null;

        function valdateOptions(success) {
            if ((options.title || options.message) && options.modalContent) {
                console.error("simpleDialog only accepts either modal content or title and message");
                return;
            }
            else {
                success();
            }
        }


        /**
         * Initializing modal with modal options
         */
        function init() {
            var closeButtonTemplate = '';

            if (options.modalHasContent == false) {
                options.modalContent = options.modalContent.strReplace({
                    title: options.title,
                    message: options.message
                });
            }

            closeButtonTemplate = '<button type="button" id ="cancel-btn" class="btn btn-default">' + options.closeBtnText + '</button>';

            template = '<div class="modal fade w-t-40" id="simple-dialog-modal" tabindex="-1" role="dialog" data-backdrop="' + options.backdrop + '"' +
                '           aria-labelledby="eventDetailsModal">' +
                '           <div class="modal-dialog" role="document">' +
                '               <div class="modal-content">' + options.modalContent +
                '                   <div class="modal-footer no-border">' + closeButtonTemplate +
                '                       <button type="button" id="confirm-btn" class=" btn btn-primary">' + options.confirmBtnText + '</button>' +
                '                   </div>' +
                '               </div>' +
                '           </div>' +
                '       </div>';
            if (!$('body').hasClass('model-open')) {
                $('body').append(template);
                $('#simple-dialog-modal').modal('show');
            }
        }

        /**
         * Handling confirm button click event. If callback is available perform callback operation
         */
        $('#confirm-btn').live('click', function (event) {
            event.preventDefault();
            $('#simple-dialog-modal').modal('hide');
            if (typeof callback === 'function' && callback())
                callback();
        });

        /**
         * Handling close button events
         */
        $('#cancel-btn').live('click', function (event) {
            event.preventDefault();
            return $('#simple-dialog-modal').modal('hide');
        });

        /**
         * removing appended modal from body and reset callback to null when modal become hidden
         */
        $(document).on('hidden.bs.modal', '#simple-dialog-modal', function () {
            callback = null;
            return $('#simple-dialog-modal').remove();
        });

        /**
         * Validating options in simpleDaialog
         */
        valdateOptions(function () {
            /**
             * Default options
             */
            options = $.extend({
                title: 'Confirm',
                message: 'Do you want to continue?',
                modalHasContent: false,
                modalContent: '<div class="modal-header bg-white">' +
                '                  <h4 class="modal-title capitalize-first-letter" id="exampleModalLabel">{title}</h4>' +
                '               </div>' +
                '               <div class="modal-body ">{message}' +
                '               </div>',
                confirmBtnText: 'Okay',
                closeBtnText: 'close',
                backdrop: false,
                closeButton: true
            }, options);
            init();
        });
    };

    /**
     * String replace function to replace variables with values in a string.
     * @type {{strReplace}}
     */
    var Strings = {
        strReplace: (function () {
            var regexp = /{([^{]+)}/g;
            return function (str, options) {
                return str.replace(regexp, function (ignore, key) {
                    return (key = options[key]) == null ? '' : key;
                });
            }
        })()

    };

    /**
     * Attaching strReplace to String.prototype,
     * thereby we can use "hai {name}".strReplace({name:"robert"});
     * or variable1.strReplace({example1:"example1"});
     * @param object options
     * @returns {*}
     */
    String.prototype.strReplace = function (options) {
        return Strings.strReplace(this, options);
    };
})(jQuery);