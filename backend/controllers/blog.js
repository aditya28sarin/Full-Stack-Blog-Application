const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tag');
const formidable = require('formidable'); //get form data 
const slugify = require('slugify');

const _ = require('lodash'); //to update the blogs
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');
const {stripHtml} = require('string-strip-html');  //to get html content sot hat we can create the excerpts, meta descs and etc..
const {smartTrim} = require('../helpers/blog'); 

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }

        const { title, body, categories, tags } = fields;

        if(!title || !title.length){
            return res.status(400).json({
                error: 'title is required'
            })
        }

        
        if(!body || body.length<200){
            return res.status(400).json({
                error: 'Content is too short.'
            })
        }

        
        if(!categories || categories.length === 0){
            return res.status(400).json({
                error: 'Atleast 1 category is required'
            })
        }

        
        if(!tags || !tags.length){
            return res.status(400).json({
                error: 'Atleast 1 tag is required'
            })
        }

        let blog = new Blog();
        blog.title = title;
        blog.body = body;
        blog.excerpt = smartTrim(body, 320, ' ', '...');
        blog.slug = slugify(title).toLowerCase();
        blog.mtitle = `${title} | ${process.env.APP_NAME}`;
        blog.mdesc = stripHtml(body.substring(0, 160)).result;
        // blog.postedBy = req.user._id;

        //categories and tags 

        let arrayOfCategories = categories && categories.split(',');
        let arrayOfTags = tags && tags.split(',');

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                });
            }
            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }

        blog.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
           // res.json(result);

           //we will use the blog Id now that it has been saved and we are going to find the blog one more time form the DB and we are going to push thecat and tags to it
           Blog.findByIdAndUpdate(result._id, {$push: {categories: arrayOfCategories}}, {new:true}).exec((err, result) => {
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err),
                    })
                }else{
                    Blog.findByIdAndUpdate(result._id, {$push:{tags: arrayOfTags}}, {new:true}).exec((err,result) => {
                        if(err){
                            return res.status(400).json({
                                error: errorHandler(err),
                            })
                        }else{
                            return res.json(result);
                        }
                    })
                }
           });
        });
    });
};