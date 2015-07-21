#BlockMaker Usage

Blockmaker is a jQuery plugin that lets you create a block based layout with data from a json file. Users are able to reorder blocks by dragging them. The script also uses local storage to memorize the position of the blocks and let users revert the block layout to the last state. To use blockmaker, add jQuery, jQuery ui and the blockmaker.js files to the head of your html page.
```sh
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<script src="assets/js/blockMaker.js"></script>
```
Call the blockmaker function by adding the following script to your page (preferably before the closing body tag)
```sh
<script>
$(document).ready(function(){
    $(document).blockMaker({
        //options
     });
});
</script>
```
Blockmaker relies on an external json file to pull data into the blocks and complete the page display. Make sure you format your json file as below.

{
  "1": "Product element",
  "2": "Here would be another product",
  "3": "Hey why not add pictures",
  "4": "Or whatever else we wish",
  "5": "Oh heck let's keep on going",
  "6": "Shall we"
}
>Your json data can also contain an array. If we wanted to include an array instead of “product element” on line 1, you would format your json as follows.

  "1": ["Product element","Product element","Product element"],

>Blockmaker has a number of configurable options that you can use to display exactly what you want. See below for a list of all the options (settings) and their usage.

- count : This determines the number of blocks to create. This is a requied element as there is no default value for this option. 

- type : The type of element for the function to return. This can be any closed html tag. By default, this will be div. 

- float : The css float value of each block element. By default this is none but can be set to left or right to display the blocks in a fluid layout.

- width : The width of each block. This option only accepts numeric data. Do not add the px after your width value. The script will add it. 

- height : The height of each block. This option only accepts numeric data. If this value is left empty, the block will size to the content. Do not add the px after your width value. The script will add it. 

- draggable : Define whether or not to allow each block to be dragged and reordered by the user. 

- background : Define the background color of the blocks. Use hex values and do not add the hash (i.e. fff for white).

- border : Define the border color of each block. This value can be either hex or rgb-rgba. For hex values, do not add the hash. The script will add it. 

- opacity : The transparency value of each block. 

- data : The path to your json file where block content data is stored. If no json link is provided, the data function will be skipped and only the blocks will be built. 

- clear : The css clear value of each block element. By default this is set to none. 

- margin : Defines the 4 point margin value of each block element.  This option only accepts numeric data. Do not add the px after your margin value. The script will add it. 

- padding : Defines the 4 point padding value of each block element.  This option only accepts numeric data. Do not add the px after your padding value. The script will add it. 

- parentitem : Defines the parent element into which the block layout will be built. If, for example, you want the blocks to be created in a div on your page that has the id myId, you would define the parentItem as #myId. The value can be a class, id or tag. Use css syntax (i.e. .class - #id – tag)

- display : Define the number of blocks to be displayed on one line. This value will override the width and height options and will dyamically resize your blocks. 
- displayatonce : Defines the number of blocks to display on the page at once. If the count setting value is greater than the displayAtOnce setting value, a show more/show less toggle will appear below the blocks. 
