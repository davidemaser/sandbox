#Organizr Usage

Organizr is an advanced jQuery plugin that can build and populate an html page with data pulled from a single json file. Organizr can also import into your page other javascript libraries and css files allowing you to build a complex html page just by specifying it's structure and content in a json file. 

###Page structure

To use this plugin you will only need to start with a basic html page structure. Below is an example.
```sh
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>

</body>
</html>
```
###Adding the scripts to the page

To add the organizr function, first add your jquery script followed by the orgnizr.js (or organizr.min.js) file. 
```sh
<head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="assets/js/organizr.js"></script>
</head>
<body>
```
###Function Structure

The organizr function has an array of settings that can be used to personalize the layout of your page. The main function called organizr can be called in your basic html page as below. The list of options can be found farther on in this document. 
```sh
<script>
    $(document).ready(function(){
        $(this).organizr({
		//options
        });
    });
</script>
```
>Within the organizr plugin are two other javascript functions whose roles are to build the html structure and populate the page with data. 

The buildBones function creates the skeleton of your page, organizing the html blocks as you defined them as well as adding any extra javascript or css files. 

The buildBones function has two options : 
- opt : true or false. Defines wether the script should populate the data of the page once the skeleton has been completed. 
- errors : true or false. If set to true, an error log will appear at the top of your page. 

The buildGuts function adds data from the json file into the page elements also defined in the json file. This function works by querying the json data and placing content into defined elements at defined positions (see json file structure for more information). 

The buildGuts function has no options. 

##JSON File Structure

The json file is sectioned into four node arrays. 

###The Element Node

The first named “element” is where the html architecture of the page is defined. 
```sh
"element":[
  {
    "tag":"section",
    "id":"main",
    "class":"",
    "count":1,
    "parent":"",
    "parentMap":"",
    "parentChild":0
  },
  {
    "tag":"div",
    "id":"content",
    "class":"flex",
    "count":5,
    "parent":"main",
    "parentMap":"id",
    "parentChild":0
  }]
```
In the above example is displayed only a few objects of our demo json file.

“element” is a top level node and contains 7 children. Since “element” is an array, we can place as many sub-items as we want in the object. In the example above there are two child nodes.
Deconstruction

tag : this element defines the kind of html tag. It can be any closed html tag (i.e. div, span, section, footer, etc..). 
id : defines the id to be attributed to the above mentioned tag. Make sure to leave ID empty if you are planning to have more than one occurence of this tag. 
class : defines the class name of the above mentioned tag. 
count : defines the number of times the tag (or block) will be created. In the example above, 1 instance of <section id=”main”></section> will be created. 
parent : defines the parent element into which the block will be appended. In the example above, our section main is the parent so the value is empty. The second node becomes a child of section main as we have defined it's parent as being main.
parentMap : defines the mapping relation to the parent element. Can be ID, class or tag. In the example above, the second node will be created in an element having the ID main. 
parentChild : if we are creating multiple instances of a tag, the parentChild attribute let's you define into which instance of the parent element, the child is to be appended. (i.e. If we create 5 div elements with class=myClass and we want to append another div into the 3rd div element created above. To do so we would set the parent value to “myClass”, the parentMap to “class” and the parentChild value to 3). If the element into which you are appending the child is unique, the value should be 0. 

###The elementContent node
```sh
,
  "elementContent":[
    {
      "parent":"content",
      "parentType":"id",
      "parentCount":1,
      "content":"<b>Hello there</b>",
      "bgColor":"#efefef",
      "font":""
    },
    {
      "parent":"flex",
      "parentType":"class",
      "parentCount":2,
      "content":"<p>How's it going</p>",
      "bgColor":"#fff",
      "font":""
    }]
```
“elementContent” is another top level node and contains 6 children. Since “elementContent” is an array, we can place as many sub-items as we want in the object. In the example above there are two child nodes.

>NOTE : Don't forget the comma (line 1) since this is a new node.

###Deconstruction

- parent : this defines the element that was created previously to which this content is paired. In the example above, the content will be inserted into the content div.
- id : similar to parentMap, this defines the mapping relation to the parent element. Can be ID, class or tag. In the example above, the content will be placed into an element having the ID content. 
- parentCount : similar to parentChild, this option let's you define into which instance of an element the content will be created. In the example above, the content will be placed in the first occurence. In the second node, the content will be placed in the second div that has the class flex. 
- content : this is the actual content that will be placed into the element you have defined. The content can be html. 
- bgColor : defines the hex or rgba value of an elements background. 
- font: defines the font for the specified element.
##Plugin Options

The plugin allows you to define a number of options or settings in your function call. A list of these options and their usage is below. 

To add options to the function call, use the syntax shown below.
```sh
$(document).ready(function(){
    $(this).organizr({
        jsonData:'assets/ajax/bones.json',
        jsFiles: false,
        dataAsync:true
    });
});
```
- parent : Defines the parent element of the page. If you want your organizr instance to be built inside a specific element, you would define the parent here (i.e. #wrapper). Default = body
- margin : Defines the body margins of the page. Deprecated V 1.1
- padding : Defines the bod padding of the page. Deprecated V 1.1
- dataType : Defines the type of data to be received by the ajax call. For now the plugin only supports json formatted data.
- jsonData : Defines the path to the external json file. Required
- dataCache : Defines whether the data received from the json file is to be cached by the browser. Default is false. 
- dataAsync : Defines whether the data is to be load asynchronously. Default is true.
- jsFiles : Defines whether external javascript files are to be loaded into the page. This option allows you to use other functionalities and features.  Default is false.
- jsFileRoot : Defines the root directory where the external js files reside. Only needs to be defined if jsFiles is set to true.
- cssFiles : Like jsFiles, this options defines whether external CSS files are to be loaded into the page. This allows you to style the page and any extra components to your liking.  Default is false
- cssFileRoot : Defines the root directory where the external css files reside. Only needs to be defined if cssFiles is set to true.
