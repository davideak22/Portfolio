const i18n = require('eleventy-plugin-i18n');
const translations = require('./src/_data/translations.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(i18n, {
    translations: translations,
    languages: ['en', 'hu', 'ro'],
    defaultLanguage: 'en', 
    fallbackLocales: {
      'hu' : 'en',
      'ro' : 'en',
      "*": "en"
    }
  }); 
  
  eleventyConfig.addPassthroughCopy("./src/style.css");
    eleventyConfig.addPassthroughCopy("./src/photo1.jpg");
    eleventyConfig.addPassthroughCopy("./src/photo2.jpg");
    eleventyConfig.addPassthroughCopy("./src/photo3.jpg");
    eleventyConfig.addPassthroughCopy("./src/assets");
    eleventyConfig.addPassthroughCopy("./src/admin");
    eleventyConfig.addPassthroughCopy("./src/_redirects");
    
    eleventyConfig.addFilter("postDate", (dateObj, locale = "en") => {
  if (!dateObj) return "";
  return new Date(dateObj).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

eleventyConfig.addFilter("projectDate", (dateObj, locale = "en") => {
  if (!dateObj) return "";
  return new Date(dateObj).toLocaleDateString(locale, {
    year: "numeric",
  });
});

  // Fix YouTube iframes for production (Cookiebot & Privacy)
  eleventyConfig.addTransform("youtube-fix", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      // Find all YouTube iframes and upgrade them (using [\s\S]*? to match across newlines)
      return content.replace(/<iframe[\s\S]*?src="https:\/\/www\.youtube\.com\/embed\/([^"]+)"[\s\S]*?>[\s\S]*?<\/iframe>/g, (match) => {
        let transformed = match;
        
        // 1. Switch to youtube-nocookie.com for better privacy/compatibility
        transformed = transformed.replace('www.youtube.com/embed', 'www.youtube-nocookie.com/embed');
        
        // 2. Add Cookiebot marketing consent attribute to prevent automatic blocking
        if (!transformed.includes('data-cookieconsent')) {
          transformed = transformed.replace('<iframe', '<iframe data-cookieconsent="marketing"');
        }
        
        // 3. Ensure a title attribute exists for accessibility
        if (!transformed.includes('title=')) {
          transformed = transformed.replace('<iframe', '<iframe title="YouTube video player"');
        }

        return transformed;
      });
    }
    return content;
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
