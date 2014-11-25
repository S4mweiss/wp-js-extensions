wp-js-extensions
================

A set of additional JavaScript classes for Wordpress websites

## NewsLoader
This class provides the possibility for loading posts from the server dynamically using ajax requests.
### Constructor
Arguments | Description | Default value
----------|-------------|--------------
simultaniouslyLoadedPosts | (int) The number of posts which should be attempted to load at once. | 2
ajaxDestination | (String) The destination for all ajax requests. | ../wp-admin/admin-ajax.php

#### Examlpe
```javascript
var simultaniouslyLoad = 4; //Load 4 posts at once.
var ajaxPhpScript = 'ajaxScripts/loadPosts.php'; //Direct all ajax requests to this php script
var myNewsLoader = new NewsLoader(simultaniouslyLoad, ajaxPhpScript); //Create new Instance of NewsLoader;
```

### Methods
#### .fillPage()
Loads new Posts from server until either no further posts are available or the document height exceeds the window height.

**Arguments:**

*No arguments*

**Usage:**

```javascript
//Fill the page with news posts
var myNewsLoader = new NewsLoader(); //Create new instance of NewsLoader with default values;
myNewsLoader.fillPage(); //Get the posts;
```

#### .getNextPosts()
Loads next news posts if available. The amount of posts loaded by this method depends on the argument *simultaniouslyLoadedPosts* that was forwardet to the constructor.

**Arguments:**

Name       | Description 
-----------|------------
callback (optional) | A function that should be called after the server's response has been successfully processed.

**Usage:**

```javascript
//Load 5 posts from the server
var simultaniouslyLoad = 4; //Set number of posts to 4
var myNewsLoader = new NewsLoader(); //Create new instance of NewsLoader with default values;
myNewsLoader.getNextPosts(); //Get the posts;
```

#### .hasMore()
Indicates, wether or not there are more posts that can be loaded from the server. Returns `true`, if more posts are available, and `false` in any other case.

**Arguments:**

*No arguments*

**Usage:**

```javascript
//Load 5 posts from the server
var myNewsLoader = new NewsLoader(); //Create new instance of NewsLoader with default values;
if(myNewsLoader.hasMore()){
  //More posts available
  alert('You could load some more posts.');
} else {
  //No more posts available
  alert('Sorry, no more posts available.');
}
```

#### .lazyLoad()
Loads more posts, if the website is scrolled to the bottom at the moment. This method can be called whenever the scroll event fires.

**Arguments:**

*No arguments*

**Usage:**

```javascript
//Load some more posts whenever the user has scrolled to the bottom (lazy loading)
var myNewsLoader = new NewsLoader(); //Create new instance of NewsLoader with default values;
$(window).scroll(myNewsLoader.lazyLoad); //Register scroll event by using jQuery and specify the NewsLoader method as function that should be called;
```

## MessageHandler
*Class description follows*
