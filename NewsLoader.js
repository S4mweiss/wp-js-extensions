/*
    Class NewsLoader
    This function handles AJAX based loading of news posts from Wordpress.
*/
var NewsLoader = function (args) {
    var postsTotal;                                 //The number of posts totaly available on the server
    var postsPerPage;                               //The number of posts loaded at once
    var lastPageID;                                 //Number of the last loaded news page
    var ajaxUrl;                                    //The script on the server which handles ajax requests
    var working;                                    //Muttex variable for preventing two executions of an ajax-request at once
    var self;                                       //Reference to itself

    //-----------------Constructor part-----------------
    if (typeof (args) == 'object') {

    }
    postsPerPage = typeof (simultaniouslyLoadedPosts) !== 'undefined' ? simultaniouslyLoadedPosts : 2;      //Assign the number of posts loaded at once, default value = 2
    ajaxUrl = typeof (ajaxDestination) !== 'undefined' ? ajaxDestination : '../wp-admin/admin-ajax.php';    //Assing the destination for ajax requests, default value = '../wp-admin/admin-ajax.php'
    postsTotal = 1;
    lastPageID = 0;
    working = false;
    self = this;
    //-----------------End of constructor part-----------------


    //-----------------Internal methods-----------------

    /*
        Function which is called when the response from the ajax request arrives
    */
    function displayNewPosts(data, callback) {

        var postsDiv = document.getElementById("posts");

        if (typeof (data.posts) !== 'undefined') {
            var posts = data.posts;

            $.each(posts, function (index, obj) {
                var newPost = document.createElement("div");
                var postTitle = document.createElement("div");
                var postDate = document.createElement("div");
                var postContent = document.createElement("p");

                newPost.className = "news";

                postTitle.className = "news_title";
                postTitle.innerHTML = obj.title;

                postDate.className = "news_date";
                postDate.innerHTML = obj.date;

                postContent.innerHTML = obj.content;

                newPost.appendChild(postTitle);
                newPost.appendChild(postDate);
                newPost.appendChild(postContent);

                postsDiv.appendChild(newPost);
            });
        }

        if (data.numberOfPosts !== undefined && data.numberOfPosts.publish !== undefined) {
            postsTotal = data.numberOfPosts.publish;
        }
        else {
            postsTotal = 0;
        }

        lastPageID++;
        working = false;

        if (typeof (callback) === 'function') {
            callback();
        }
    }

    //-----------------End of internal methods-----------------


    //-----------------Public methods-----------------

    /*
        Function for loading news posts until the document height exceeds the window height
    */
    this.fillPage = function () {
        if ($('body').height() <= $(window).height()) {
            try{
                self.getNextPosts(function () { self.fillPage(); });            //Load more posts, if page is not full yet
            }
            catch (err) {
                throw err;
            }
        }
    }

    /*
        Function to be called by scroll event
    */
    this.lazyLoad = function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 10) {
            try{
                self.getNextPosts();                                            //Load more posts, if page is scrolled to bottom
            }
            catch (err) {
                throw err;
            }
        }
    }

    /*
        Sends an ajax request to the server in order to get more news posts
    */
    this.getNextPosts = function (callback) {
        if (working !== true && self.hasMore()) {
            working = true;

            $.ajax({
                type: "POST",
                url: ajaxUrl,
                dataType: 'json',
                data: ({ action: 'ajaxGetPosts', lastPageID: lastPageID, numberOfPosts: postsPerPage }),
                success: function (data) { displayNewPosts(data, callback); },
                error: function (data) {
                    throw 'The ajax request resulted in an error.';
                }
            });
        } else {
            if (working) {
                return { status: 'error', message: 'An other ajax request is currently being processed.' };
            } else {
                return { status: 'error', message: 'An other ajax request is currently being processed.' };
            }
        }

        return { status: 'ok' }
    }

    /**
    *    Function that returns true, if more posts can be loaded. Otherwise it returns false.
    */
    this.hasMore = function () {
        var returnValue = false;

        if (postsTotal > postsPerPage * lastPageID) {
            returnValue = true;
        }
        return returnValue;
    }

    //-----------------End of public methods-----------------
}