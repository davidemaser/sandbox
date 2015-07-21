#builder.js jQuery plugin 

Plugin creates an image gallery that handles optional parameters to display a responsive, multi column, lazy loading gallery. Refer to this document for options and call parameters. 

##Supporting Document

###Adding the script to the page 

The image gallery plugin enables the creation of a multi-image gallery without adding code to your html. Include the builder.js file after the jquery.js file to enable the gallery function. 

<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="assets/js/builder.js"></script>

The gallery builder also supports lazy loading features. The jquery.lazyload.js script is located in the assets/js directory. When you set the lazyloading option to true, the script will be added to the head of your document. 
###Initiating the function call

The function call can be initiated from an html page (in the head or at before the final body tag) or from within the builder.js file itself. Use the following code to initiate call to the function.
```sh
<script>
$(document).ready(function () {
    /**
     * bind function call to whatever page element you want.
     * The gallery will be created within that element.
     * In this example, the gallery is created in an element
     * with id "demo"
     */
    $("#demo").galleryBuilder({
        dir: 'assets/img/'
    });
});
</script>
```
Add the above code to the end of the builder.js file if you want to initiate the call from the js file itself (remove the <script></script> tags).

###Binding the function to a selector

You can bind the gallery builder function to any page element that is in the body of your page. You can bind the image gallery to the body tag as well but this will place your gallery right at the beginning of your page. In the example above, we've created a div with the id demo on our page and bound the function to that element. 
```sh
$("#demo").galleryBuilder({
        dir: 'assets/img/'
    });
```
This way, the gallery will be created inside that div. 

>You can play with different selectors to get the gallery to display exactly as you wish.

###Function Options

The builder function only has one required option; the dir option. This tells the script where the images for the gallery are located. You can use the other options below or take a look in the script at lines 74 to 85
```sh
$("#demo").galleryBuilder({
    dir: 'assets/img/',
    prefix: 'coat_',
    columns: 4,
    extension: '.jpg',
    responsive: true,
    shadow: true,
    lazy: true,
    randomize: true,
    limit: 5,
    total: 10,
     modal: false
});
```
>We've already identified the dir option. We'll define the other options below. 

- prefix – this defines the prefix of the images you want to include in the gallery. This allows you to filter certain images within the dir folder. If you don't define this option, the script will take all images from within the dir folder
- columns – this defines the number of columns you want to display. 4 columns is the default but you can play around with this number to tweak the display to your requirements. Default is 4
- extension – this defines the image extension you want to call for your gallery. It's best practice to only call the same image formats for this extension so multiple formats are not supported. By default, the script will use the jpeg (.jpg) extension. You can change this in the function call by changing the extension. Default is .jpg
- responsive – this options can accept one of two boolean values : true or false. If you want your gallery images to adapt to the viewport size, overriding the columns option, set it to true. If you want your gallery to be a fixed size, set it to false. Default is false
- shadow – this option adds a shadow around each image block. The box-shadow parameters can be changed on line 133 of the script. Default is false
- lazy – this enables the lazy loading of images via Mika Tuuppla's lazyloading plugin. Default is false
- randomize – this option allows for the randomization of the images of your gallery. The images will be displayed in a random order regardless of their name or the order they were called. Default is false
- limit – this option defines the number of images to be displayed at once in your gallery. If the number of images your gallery has is superior to the limit (see option TOTAL), a see more – see less link will appear below the last row. The see more links functionalities are on lines 146 to 165 of the script. Default is 4
- total – this option defines the total number of images in your gallery. Make sure to test this and set the number to the correct number of images in order to avoid blank images. Default is 10
- modal – this options lets you define whether clicking on an image will open's large format in a modal window. This options can accept one of two boolean values : true or false. Default is false 
