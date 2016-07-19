var fs = require('fs');

module.exports = {
  controller: GalleryController,
  controllerAs: 'up',
  template: fs.readFileSync(__dirname + '/gallery.component.html', 'utf-8')
};

GalleryController.$inject = ['Gallery', 'Upload'];
function GalleryController(Gallery, Upload) {
  var $ctrl = this;
  
  $ctrl.allPicturesInfo = Gallery.getAllPicturesInfo;

  Gallery.fetchAllPicturesInfo();

  $ctrl.submit = function(){ 
    $ctrl.upload($ctrl.file);
  };

  $ctrl.progress = 0;
  
  $ctrl.getProgress = function () {
    return $ctrl.progress;
  };

  $ctrl.upload = function (file) {
    Upload.upload({
      url: '/api/gallery/upload',
      data: { file:file } 
    }).then(function (resp) { 
      if(resp.data.error_code === 0){ 
        console.log('Success: "' + resp.config.data.file.name + '" uploaded.');
        Gallery.fetchAllPicturesInfo();
      } else {
        console.log('Error:', resp);
      }
    }, function (resp) { 
      console.log('Error status: ' + resp.status);
    }, function (evt) { 
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      $ctrl.progress = progressPercentage;
    });
  };

}

