/*!
 * simpleDialog
 * by Ovaqlab
 *
 * Copyright 2017-2018, Ovaqlab
 * Licensed under the MIT License:
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

;(function ($) {
$.simpleDialog = function (options) {
        var template = null;
        var currentID = Date.now();

        function valdateOptions(success) {
            if ((options.title || options.message) && options.modalContent) {
                console.error("simpleDialog only accepts either modal content or title and message");
                return;
            } else {
                success();
            }
        }


        /**
         * Initializing modal with modal options
         */
        function init() {
            if (options.modalContent) {
                options.modalContent = options.modalContent.strReplace({
                    title: options.title,
                    message: options.message
                });
            } else {
                console.error("Empty modal content. simpleDialog only accepts either modal content or title and message");
                return;
            }

            if (!options.closeButton)
                options.closeButtonTemplate = '';
            else {
                options.closeButtonTemplate = options.closeButtonTemplate.strReplace({
                    closeBtnText: options.closeBtnText,
                    closeBtnClass: options.closeBtnClass
                });
            }

            template = '<div class="modal fade window-t-xs-40" id="simple-dialog-modal-' + currentID + '" tabindex="-1" role="dialog" data-backdrop="' + options.backdrop + '"' +
                '           aria-labelledby="eventDetailsModal">' +
                '           <div class="modal-dialog" role="document">' +
                '               <div class="modal-content">' + options.modalContent +
                '                   <div class="modal-footer no-border">' + options.closeButtonTemplate +
                '                       <button type="button" id="confirm-btn" class=" btn ' + options.confirmBtnClass + '">' + options.confirmBtnText + '</button>' +
                '                   </div>' +
                '               </div>' +
                '           </div>' +
                '       </div>';
            if (!$('body').hasClass('model-open')) {
                $('body').append(template);
                $('#simple-dialog-modal-' + currentID).modal('show');
            }
        }

        /**
         * Handling confirm button click event. If callback is available perform callback operation
         */
        $(document).on('click', "#confirm-btn", function (event) {
            event.preventDefault();
            if (typeof options.onSuccess === 'function' && options.onSuccess) {
                var data = options.onSuccess();
                setTimeout(function () {
                    if (data || data === undefined) {
                        $('#simple-dialog-modal-' + currentID).modal('hide');
                    }
                }, 0);
            } else {
                $('#simple-dialog-modal-' + currentID).modal('hide');
            }
        });
        /**
         * Handling close button events
         */
        $(document).on('click', "#cancel-btn", function (event) {
            event.preventDefault();
            $('#simple-dialog-modal-' + currentID).modal('hide');
            if (typeof options.onCancel === 'function' && options.onCancel())
                options.onCancel();
        });

        /**
         * removing appended modal from body and reset callback to null when modal become hidden
         */
        $(document).on('hidden.bs.modal', '#simple-dialog-modal-' + currentID, function () {
            if (options.onSuccess)
                options.onSuccess = null;
            if (options.onCancel)
                options.onCancel = null;
            return $('#simple-dialog-modal-' + currentID).remove();
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
                modalContent: '<div class="modal-header bg-white">' +
                '                  <h4 class="modal-title capitalize-first-letter" id="exampleModalLabel">{title}</h4>' +
                '               </div>' +
                '               <div class="modal-body ">{message}' +
                '               </div>',
                confirmBtnText: 'Okay',
                closeBtnText: 'close',
                confirmBtnClass: 'btn-primary',
                closeBtnClass: 'btn-default',
                backdrop: true,
                closeButton: true,
                closeButtonTemplate: '<button type="button" id ="cancel-btn" class="btn {closeBtnClass}">{closeBtnText}</button>',
                onSuccess: null,
                onCancel: null
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
