#Filter Blocks Usage

Filter Blocks is a jquery plugin that creates a matched set of buttons and blocks that can be filtered based on ID. This plugin gets it's data from an external json file and builds a row of buttons corresponding to each json data element as well as a number of blocks (defined in the json file) that are linked to each button. When a button is pressed, all of that button's child blocks will be displayed, masking the blocks whos are not direct children of that button. 

>I.E. A button with text Clothing will be linked to blocks with ID Clothing. All other blocks will fade out when this button is clicked. 

The script also adds an “ALL” button that will restore the display and show all blocks. 

To add this plugin to your page, add the jquery file and the filter script to the head of your page. You can either use the minified filter_ajax.min.js or the filter_ajax.js file.
```sh
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="assets/js/filter_ajax.min.js"></script>
```
Optionally, you can add an element (div, section, etc..) with an id to your html. You can tell the script to place the blocks within that element. 

Call the filterBlocks function by adding the following script to your page (preferably before the closing body tag). A complete model can be found at end of document.
```sh
<script>
$(document).ready(function(){
    $(document).filterBlocks({
        //options
     });
});
</script>
```
This plugin can also use optional easing plugins. There is no need to add the easing plugin's js file to the head of your page as it will be added dynamically if you set the script to use advanced easing methods.

>filterBlocks relies on an external json file for page and layout data. The json data's structure is as follows.

```sh
{"entry":[
    //parent node
  {
    "label":"Men's",
    "children":5,
    "color": "#E3E3E3",
    "display": [
        //child node
       {
      "id":1,
      "image":"img/src/assets/",
      "category":12,
      "reduction":0
    }
        //end of child node
        ,{
      "id":2,
      "image":"img/src/assets/",
      "category":12,
      "reduction":0
    }]
  }
    //end of parent node
]}
```
The parent element “entry” contains array data. In the example above, the node is wrapped with comments. To add more nodes, copy and paste the data between the comments, separated by commas. 

The json data also accepts child node arrays (see //child node comment). To add more child nodes, also copy and paste the data between the comments, separated by commas. 

>NOTE : It is important to keep the json data formatted properly. Any error in the json formatting will cause the data call to fail or display incorrectly. 

filterBlocks has a number of configurable options that you can use to display exactly what you want, how you want. See below for a list of all the options (settings) and their usage. Note that some options are grouped into an array of settings. 

- Parent : Defines the parent element into which the function will build the buttons and html structure. 
- FilterMethod : Defines the action elements that fire off the filter functionality. This can be either buttons or menu. The action elements will be built in consequence; either in a button group or a select menu.
- AllowQsFilter : This allows you to test your filterMethod in either button or menu format by adding the querystring ?filter= to your url. The value can be button or menu. 
- Buttons : Settings array – can't be called separately
- ButtonSectionId : Defines the ID of the section that contains the buttons. If allowQsFilter is set to true, this value will toggle between buttonSectionId and menuSectionId depending on the querystring value. This default cannot be changed in the function call. 
- ButtonGroupClass : Defines a class for the button group. This default cannot be changed in the function call. 
- ButtonTop : Defines the text value of the “ALL” button. Required
- ButtonClass : Defines a class for each button. This default cannot be changed in the function call. 
- FilterClass : Defines the class name of the buttons that will be used as block filters. This default cannot be changed in the function call. 
- SortMethod : Defines the method that will be used to link buttons and blocks and sort them. By default the attribute for a button is ID. This default cannot be changed in the function call. 
- Last : An optional last button item (unused V1.2).
- Menu : Settings array – can't be called separately
- MenuSectionId : Defines the ID of the section that contains the menu. If allowQsFilter is set to true, this value will toggle between buttonSectionId and menuSectionId depending on the querystring value. This default cannot be changed in the function call. 
- MenuGroupClass : Defines a class for the div that wraps the menu. This default cannot be changed in the function call. 
- MenuTop : Defines the text value of the “ALL” select option. Required
- FilterClass : Defines the class name of the select option that will be used as block filters. This default cannot be changed in the function call. 
- SortMethod : Defines the method that will be used to link select options and blocks and sort them. By default this is the “value” attribute of the select option. This default cannot be changed in the function call. 
- Last : An optional last select option item (unused V1.2).
- List : Settings array – can't be called separately
- ListLimit : Defines the number of block elements to be shown when the page loads. If the value is 0 all blocks will be displayed. 
- Items : Settings array – can't be called separately
- ItemSectionId : The class attributed to the section element that wraps all the blocks. This default cannot be changed in the function call. 
- ItemClass : The class name of each block within the parent section. This default cannot be changed in the function call. 
- ItemWidth : The width of each block. This option only accepts numeric data. Do not add the px after your margin value. 
- ItemHeight : The height of each block. This option only accepts numeric data. Do not add the px after your margin value. 
- ItemMargin : Defines the 4 point margin value of each block element. This option only accepts numeric data. Do not add the px after your margin value.
- Animation : Settings array – can't be called separately 
- Method : The animation methods for the block elements. Can be show or slide.
- Speed : The speed (in milliseconds) that the animation will take to accomplish it's effect.
- Easing : The easing method. If no easing plugin is used, used jQuery's default easing methods.
- EasingPlugin : Defines whether or not to use an external easing plugin. Can be TRUE of FALSE.
- EasingPluginPath : Defines the path to the easing plugin. Jquery Easing is included. It's path is “assets/js/jquery.easing.1.3.js”
Display : Unused version 1.2
- JsonData : Defines the path to the json file that contains functionality data. . Required

Below is a model function call. Place this script before the closing body tag. 
```sh
<script>
    $(document).ready(function(){
        $(this).filterBlocks({
            parent:'#container',
            filterMethod: 'buttons', 
            allowQsFilter: true,
            buttons: {
                buttonTop:'All'
            },
            menu: {
              menuTop:'All'
            },
            items: {
                itemWidth:'150',
                itemHeight:'150'
            },
            animation: {
                method:'show',
                speed:500,
                easing:'easeInOutBack',
                easingPlugin:true,
                easingPluginPath:'assets/js/jquery.easing.1.3.js'
            },
            jsonData : 'assets/ajax/data2.json'
        });
    })
</script>
```
