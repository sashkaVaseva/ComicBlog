/*globals Sammy, $ */
"use strict";
import blogsController from "./app/js/controllers/blogsController.js";
import usersController from "./app/js/controllers/usersController.js";
import notifier from "./helpers/notifier.js";
import "./helpers/loader.js";
import { nextPage as nextPage, prevPage as prevPage, getPage as getPage } from "./helpers/change-page.js";

((function() {
    let sammyApp = Sammy("#content", function() {
        this.get("#/", function() {
            this.redirect("#/home");
        });
        this.get("#/home", blogsController.home);
        this.get("#/blog/:id", blogsController.byId);
        this.get("#/blogs/category/:category", blogsController.allByCategoryName);
        this.get("#/blogs/add", blogsController.post);
        this.get("#/register", usersController.register);
        this.get("#/login", usersController.login);

    });

    $(function() {
        sammyApp.run("#/");
        $("#logout").on("click", function() {
            localStorage.clear();
            $("#register").show();
            $("#login").show();
            $("#logout").hide();
            notifier.send("You logged out");
        });
    });
})());

((function() {
    $(document).ready(() => {
        $(document).on("click", ".prev-page-link", () => {
            prevPage();
        });
        $(document).on("click", ".next-page-link", () => {
            nextPage();
        });
        /*$(document).on('click', '.reply-button', (ev) => {
            postComment(ev);
        });

        $(document).on('click', '.submit-button', (ev) => {
            postComment(ev);
        });*/
    });
})());