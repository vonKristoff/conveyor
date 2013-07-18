CONVEYOR-BELT
=============

<a href='http://bite-software.co.uk/conveyor'>Plugin Site</a>

PREREQUISITES:
<i>You need a DIV with a UL and a load of LI's with IMAGES</i>
Use CSS to set the height and width of your $('.example') element - this will be the size of your slideshow.
```html
<div class="example">
	<ul class="images">
		<li><img src="img.png"/></li>
		<li><img src="img.png"/></li>
		<li><img src="img.png"/></li>
		<li><img src="img.png"/></li>
	</ul>
</div>
```
BASIC USAGE:
<i>all are optional</i>
```javascript
$('.example').plugin({
	ul,
	fit,
	auto,
	countdown,
	speed,
	startPosition,
	transition,
	ease,
	direction,
	overflow,
	html,
	controls,
	buttonDimension

});
```
<h1>config options:</h1>

| Option         | data type  	| values              				 | default  	| description                |
| ---------------|--------------|------------------------------------|--------------|----------------------------|
| ul  			 | string     	| '#images'      					 | '#cb-images' | id/class of parent <ul> |
| fit        	 | string;float | 'cover','landscape','portrait', .5 | 'cover'     	| decimal is a percentage value of images original size |
| auto 			 | float      	| true, false  	     				 | true  		| auto or manual slide show |
| countdown 	 | float      	| 3000   	     					 | 3000  		| time in ms till next slide |
| speed			 | int		  	| 400 								 | 400  		| transition speed in ms |
| startPosition	 | int		  	| 1, 'last' 						 | 1  			| choose where you want you show to start from |
| transition	 | string	  	| 'vertical','horizontal','blend' 	 | 'blend'  	| transition types |
| ease			 | string	  	| 'normal','in','out',$custom 		 | 'normal'  	| if adding a custom - you must prepend $ to your string first |
| direction		 | string	  	| 'forward','backward' 				 | 'forward'  	| 'next' or 'previous' directions for auto mode |
| overflow		 | boolean	  	| true, false 						 | true  		| hides the overflow |
| html 			 | boolean		| true, false						 | false		| allows HTML content. Replace <img> with a <div> including your content |
| controls		 | boolean 		| true, false 						 | false 		| adds 'next' & 'previous' control buttons |
| buttonDimension| int			| 100								 | 20 			| value is in pixels - donates size of < and > buttons |

<h1>usage example</h1>
```javascript
$('.container').conveyor({
	ul:'.images',
	fit:'portrait',
	transition:'blend',
	startPosition:'last',
	direction:'backward',
	ease:'$cubic-bezier(0.230, 1.000, 0.320, 1.000)'
});
```