# simpleDialog  [![Platform](https://img.shields.io/badge/Platform-jQuery-brightgreen.svg) ]() [![GitHub license](https://img.shields.io/badge/License-MIT-orange.svg)]() [![Author](https://img.shields.io/badge/Author-Ovaqlab-blue.svg)]()
Simple bootstrap-jquery modal with options to change contents and style

![Open Dialog Window](https://github.com/ovaqlab/simpleDialog/blob/master/screenshot.png)

## Features
* Content from html elements or string  
* Backdrop enable and disable (optional)
* Buttons show/hide options (optional)
* Callback functions for success/confirm operations (optional)
* Working with bootstrap
* Responsive UI

## Prerequisites
  * Bootstrap CSS
  * Bootstrap JS
  * jQuery

## Installing

Download and load the simpleDialog plugin's script after jQuery.

  ```<script type="text/javascript" src="/simpleDialog.js"></script>```
  
## Usage
##### Example: https://codepen.io/iamjithz/live/eymqmL
####  Basic Usage 
```
<script type="text/javascript" src="/simpleDialog.js"></script>
<script type="text/javascript>
$.simpleDialog();
</script>
```

#### Custom title and message 
```
$.simpleDialog({
  title:"Alert Dialog",
  message:"Alert Message"
});
```
####  simpleDialog with callback
```
<script type="text/javascript" src="/simpleDialog.js"></script>
<script type="text/javascript>
$.simpleDialog({
    onSuccess:function(){
        alert("You confirmed");
    },
    onCancel:function(){
        alert("You cancelled");
    }
});
</script>
```
####  simpleDialog with options and callback

```
<script type="text/javascript" src="/simpleDialog.js"></script>
<script type="text/javascript">
  $.simpleDialog({
    title:"Confirm",
    message:"Do you want to continue?",
    confirmBtnText: "Yes! I'm Sure",
    closeBtnText: "Cancel",
    backdrop:true,
    onSuccess:function(){
      alert("You confirmed");
    },
    onCancel:function(){
      alert("you cancelled");
    }
  });
</script>
```
####  simpleDialog with html strings
```
<script type="text/javascript" src="/simpleDialog.js"></script>
<script type="text/javascript">
var html = '<div class="modal-header bg-white">'+
            '   <h4 class="modal-title capitalize-first-letter" id="modalHeader">Confirm</h4>'+
            '</div>'+
            '<div class="modal-body">'+
            '   <div class="row">'+
            '     <div class="col-md-12">Do you want to continue?</div>'+
            '   </div>'+
            '</div>';
  $.simpleDialog({
    modalContent: html,
    closeBtnText: "Cancel",
    backdrop:true,
    onSuccess:function(){
      alert("You confirmed");
    }
  });
</script>
```
You can pass either modal content or title and message. 

#### Customize the text of confirm and cancel buttons
```
$.simpleDialog({
  title:"Alert Dialog",
  message:"Alert Message",
  confirmBtnText: 'Confirm',
  closeBtnText: 'Cancel',
  onSuccess:function(){
    alert("You confirmed");
  },
  onCancel:function(){
    alert("You cancelled");
  }
});

```
#### Decide whether to show the background overlay
```
$.simpleDialog({
  backdrop: true
});
```
#### Config the close button which allows you to close the dialog manually
```
$.simpleDialog({
  closeButton: true,
  closeButtonTemplate: '<button type="button" id ="cancel-btn" class="btn btn-default">{closeBtnText}</button>',
});```

#### Remove close button from modal
```$.simpleDialog({
  closeButton: false,
});```

## Built With
  * jQuery
  * Bootstrap

## License
  This project is licensed under the MIT License

## Acknowledgments
  * bootstrap modal

