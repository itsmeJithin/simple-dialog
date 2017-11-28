# simpleDialog
simple bootstrap modal with multiple content options

![Open Dialog Window](https://github.com/ovaqlab/simpleDialog/blob/master/screenshot.png)

# Features
* Content from html elements or string  
* Backdrop enable and disable (optionsal)
* Buttons show/hide options (optional)
* Callback functions for success/confirm operations (optional)
* Working with bootstrap
* Responsive UI

# Usage

* Basic Usage 

```
<script type="text/javascript" src="/simpleDialog.js"></script>
<script type="text/javascript>
$.simpleDialog();
</script>
```
* simpleDialog with callback
```
<script type="text/javascript" src="/simpleDialog.js"></script>
<script type="text/javascript>
$.simpleDialog({},function(){
  alert("You confirmed");
});
</script>
```
* simpleDialog with options

```
<script type="text/javascript" src="/simpleDialog.js"></script>
<scripttype="text/javascript">
  $.simpleDialog({
    title:"Confirm",
    message:"Do you want to continue?",
    confirmBtnText: "Yes! I'm Sure",
    closeBtnText: "Cancel",
    backdrop:true
  },function(){
  alert("You confirmed");
});
</script>
```
