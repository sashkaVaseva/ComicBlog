/*globals $ */
"use strict";
import templates from "../../../helpers/templates.js";
import notifier from "../../../helpers/notifier.js";
import data from "../data/blogs-data.js";

export default {
    all: function(context) {
        Promise.all([data.all(), templates.load("list-blogs")])
            .then(function([blogs, template]) {
                console.log(blogs);
                context.$element().html(template({
                    blogs: blogs
                }));
            });
    },
    home: function(context) {
        Promise.all([data.all(), templates.load("home")])
            .then(function([blogs, template]) {
                console.log(blogs);
                /*let homePageBlogs = [];
                homePageBlogs.push(blogs[3]);
                homePageBlogs.push(blogs[6]);
                homePageBlogs.push(blogs[1]);*/

                context.$element().html(template({
                    // blogs: homePageBlogs,
                    blogs: blogs
                }));
            });
    },
    byId: function(context) {
        let id = context.params.id;
        Promise.all([data.byId(id), templates.load("single-blog")])
            .then(function([blog, template]) {
                let user = localStorage.getItem("user");
                let newUser = JSON.parse(user);

                context.$element().html(template(blog.blog));
                $("#leave-reply-submit").on("click", function(ev) {
                    ev.preventDefault();
                    let comment = {
                        content: $("#leave-reply-text").val(),
                        postedBy: newUser.username || "Stranger"
                    };
                    data.addComment(id, comment);
                    location.reload(true);
                });
            });
    },
    post: function(context) {
        templates.load("blog-create")
            .then(template => {
                context.$element().html(template());

                $("#btn-create-post").on("click", function() {
                    let user = localStorage.getItem("user");
                    let newUser = JSON.parse(user);

                    let post = {
                        title: $("#title").val(),
                        category: $("#category").val(),
                        subcategory: $("#subcategory").val(),
                        image: $("#image").val(),
                        videoUrl: $("#videoUrl").val(),
                        article: $("#article").val(),
                        postedBy: newUser.username
                    };

                    data.create(post)
                        .then(() => {
                            notifier.send("Post created!");
                            context.redirect("#/home");
                        });
                });
            });

    }
};