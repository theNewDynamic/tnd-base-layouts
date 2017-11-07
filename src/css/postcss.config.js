module.exports = {
  plugins: {
   'postcss-import': { },
   'postcss-cssnext': {
	     browsers: ['last 2 versions', '> 5%'],
	     },
    'cssnano': {
      discardComments: {
        removeAll: true
      },
      minifyFontValues: false,
      autoprefixer: false
    }
	}
};

// module.exports = ({ file, options, env }) => ({
//   parser: file.extname === '.sss' ? 'sugarss' : false,
//   plugins: {
//     'postcss-import': { root: file.dirname },
//     'postcss-cssnext': options.cssnext ? options.cssnext : false,
//     'autoprefixer': env == 'production' ? options.autoprefixer : false,
//     'cssnano': env === 'production' ? options.cssnano : false
//   }
// })
