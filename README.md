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
	overflow
});
```
<h1>config options:</h1>

| Option         | data type  	| values              				 | description                |
| ---------------|--------------|------------------------------------|----------------------------|
| ul  			 | string     	| '#images'      					 | id/class of parent <ul> |
| fit        	 | string/float | 'cover','landscape','portrait', .5 | decimal is a percentage value of images original size |
| auto 			 | float      	| true, false  	     				 | auto or manual slide show |
| countdown 	 | float      	| 3000   	     					 | time in ms till next slide |
| speed			 | int		  	| 400 								 | transition speed in ms |
| startPosition	 | int		  	| 1, 'last' 						 | choose where you want you show to start from |
| transition	 | string	  	| 'vertical','horizontal','blend' 	 | transition types |
| ease			 | string	  	| 'normal','in','out',$custom 		 | if adding a custom - you must prepend $ to your string first |
| direction		 | string	  	| 'forward','backward' 				 | 'next' or 'previous' directions for auto mode |
| overflow		 | boolean	  	| true, false 						 | hide the overflow? |

<h1>usage example</h1>
```javascript
$('.container').conveyor({
	ul:'.images',
	fit:'portrait',
	transition:'blend',
	startPosition:'last',
	direction:'backward'
});
```