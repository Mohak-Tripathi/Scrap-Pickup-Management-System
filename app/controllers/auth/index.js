'use strict'


exports.engine = 'hbs';

exports.view = function(req, res, next){
  res.render('view', {});
};
