if (typeof Core9 === 'undefined') {
  Core9 = {}
};

Core9.blocks = function() {
  var data = {
    template: "/dashboard/data/accounts/easydrain/themes/bower_components/core9-theme-ess/templates/pages/home/versions/blue/index.html"
  };
  console.log(data.template);

  var rows = document.getElementsByClassName('row');

  for (var i = 0; i < rows.length; i++) {
      var columns = rows[i].getElementsByClassName("column");
      for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        console.log(column);
      }
  }


}

Core9.blocks();
