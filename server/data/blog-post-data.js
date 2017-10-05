/* gloabls Promise */
"use strict";
module.exports = function(BlogPost) {
    function create(options) {
        let blog = new BlogPost({
            title: options.title,
            article: options.article,
            image: options.image,
            videoUrl: options.videoUrl,
            category: options.category || "Common",
            subcategory: options.subcategory || "Common",
            postedBy: options.postedBy,
            postedOn: options.postedOn,
            comments: options.comments || {}
        });

        return new Promise((resolve, reject) => {
            blog.save((err) => {
                if (err) {
                    return reject(err);
                }
                BlogPost.findOne({ _id: blog._id },
                    (err, blog) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(blog);
                    });

            });
        });
    }

    function getById(id) {
        return new Promise((resolve, reject) => {
            BlogPost.find({ _id: id }, (err, blog) => {
                if (err) {
                    return reject(err);
                }
                return resolve(blog[0]);
            });
        });
    }

    function all() {
        return new Promise((resolve, reject) => {
            BlogPost.find((err, blogs) => {
                if (err) {
                    return reject(err);
                }

                return resolve(blogs);
            });
        });
    }

    function addComment(id, comment) {
        return new Promise((resolve, reject) => {
            BlogPost.findOne({ _id: id })
                .then(blog => {
                    blog.comments.push(comment);
                    blog.save();
                    return resolve(blog);
                });
        }).catch((err) => reject(err));
    }

    function sortByNewlyCreated() {
        let promise = new Promise((resolve, reject) => {
            BlogPost.find().sort({ 'postedOn': -1 })
                .limit(10)
                .exec((err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res);
                });
        });
        return promise;
    }

    function getCategoryByName(subcategory, category) {
        return new Promise((resolve, reject) => {
            BlogPost.find({ subcategory: subcategory, category: category }, (err, blogs) => {
                if (err) {
                    return reject(err);
                }
                return resolve(blogs);
            });
        });
    }

    function getSearchBlogsCategory(category) {
        return new Promise((resolve, reject) => {
            BlogPost.find({ category: category }, (err, blogs) => {
                if (err) {
                    return reject(err);
                }
                return resolve(blogs);
                console.log(blogs);
            });
        });
    }

    function getSearchBlogsSubcategory(subcategory) {
        return new Promise((resolve, reject) => {
            BlogPost.find({ subcategory: subcategory }, (err, blogs) => {
                if (err) {
                    return reject(err);
                }
                return resolve(blogs);
                console.log(blogs);
            });
        });
    }


    return {
        create,
        getById,
        all,
        addComment,
        sortByNewlyCreated,
        getCategoryByName,
        getSearchBlogsCategory,
        getSearchBlogsSubcategory
    };
};