define(['model/photos-collection', 'model/photo'], function (PhotosCollection, PhotoModel) {
    let User = Backbone.Model.extend({
       defaults: {
           id: '',
           token: '',
           photos: new PhotosCollection(),
       },
       fetchUserData() {
           let self = this;

           return new Promise((resolve, reject) => {

               // TODO: ajax-запрос можно вынести в отдельную библиотеку
               $.ajax({
                   url: `https://api.vk.com/method/users.get?v=5.64&access_token=${self.get('token')}`,
                   type: 'GET',
                   dataType: 'jsonp',
                   crossDomain: true,
                   success(res){
                       self.set('id', res.response[0].id);
                       resolve();
                   },
                   error() {
                       reject();
                   }
               });
           });
       },
       fetchPhotos() {
           let self = this;

           return new Promise((resolve, reject) => {
               $.ajax({
                   url: `https://api.vk.com/method/photos.getAll?v=5.64&access_token=${self.get('token')}`,
                   type: 'GET',
                   dataType: 'jsonp',
                   crossDomain: true,
                   success(res){
                       self.get('photos').set(res.response.items);
                       resolve();
                   },
                   error() {
                       reject();
                   }
               });
           });
       },
       getPhotoById(id) {
           let self = this;

           return new Promise((resolve, reject) => {
               $.ajax({
                   url: `https://api.vk.com/method/photos.getById?v=5.64&access_token=${self.get('token')}&photos=${self.get('id')}_${id}`,
                   type: 'GET',
                   dataType: 'jsonp',
                   crossDomain: true,
                   success(res){
                       resolve(new PhotoModel(res.response[0]));
                   },
                   error() {
                       reject();
                   }
               });
           });
       }
   });

    window.User = new User();
    return window.User;
});