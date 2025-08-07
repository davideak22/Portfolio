module. exports = function (eleventyConfig){
    eleventyConfig.addPassthroughCopy("./src/style.css");
    eleventyConfig.addPassthroughCopy("./src/photo1.jpg");
    eleventyConfig.addPassthroughCopy("./src/photo2.jpg");
    eleventyConfig.addPassthroughCopy("./src/photo3.jpg");
    eleventyConfig.addPassthroughCopy("./src/assets");
    eleventyConfig.addPassthroughCopy("./src/admin");

    eleventyConfig.addFilter("postDate", (dateObj) => {
        // Can use toLocaleString the same way we were before
        return dateObj.toLocaleString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      });
      eleventyConfig.addFilter("projectDate", (dateObj) => {
        // Can use toLocaleString the same way we were before
        return dateObj.toLocaleString(undefined, {
          year: "numeric",
        });
      });
      
    return{
        dir: {
            input: "src",
            output: "public",
            includes: "_includes"
        },
        markdownTemplateEngine: "njk", // allow Nunjucks in markdown
        dataTemplateEngine: "njk",     // allow Nunjucks in .json/.11tydata files
        htmlTemplateEngine: "njk"      // allow layouts to be njk
    };
};
