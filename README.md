# Gulp Starter Web Dev Workflow

Based on [gulp-starter by zellwk](https://github.com/zellwk/gulp-starter-csstricks)

Features separate development and build tasks. 

Uses Sass and includes Susy.

## Setup

1. Clone the repo
2. Install Node dependencies
`$ npm install`
3. Install Bower dependencies
`$ bower install`

## Usage

Use default gulp command for development workflow which will compile Sass, create a sourcemap, and use Browsersync for live reload on changes to SCSS, HTML, or JavaScript.
`$ gulp`

Use gulp build command to concatenate and minify CSS + JS files, optimize images, copy fonts, clean, and create all production ready files in dist folder.
`$ gulp build`