define([
    'parts/header',
    'parts/auth',
    'parts/photos-view',
    'parts/photo-view',
    'model/user',
    'jstorage',
    ], function (
        Header,
        Auth,
        PhotosListView,
        PhotoView,
        User
) {

    MyApp = Marionette.Application.extend({});

    myApp = new MyApp({container: '#app'});

    myApp.addInitializer(() => {
        myApp.header.show(new Header());

        if (Backbone.history) {
            Backbone.history.start({
                pushState: true,
                root: "/",
                silent: false
            });
        } else {
            console.error("Can't start app");
        }
    });

    myApp.addRegions({
        header: "header",
        content: "main"
    });

    routeController = {
        auth() {
            $.jStorage.set('user-token', getToken());
            Backbone.history.navigate('/', true);
        },
        index() {
            checkAuth(() => {
                User.fetchPhotos().then(() => {
                    myApp.content.show(new PhotosListView({collection: User.get('photos')}));
                });
            });

        },
        showPhoto(id) {
            checkAuth(() => {
                let photo = User.get('photos').get(id);

                if (typeof photo === "undefined") {
                    User.getPhotoById(id).then((res) => {
                        myApp.content.show(new PhotoView({model: res}));
                    });
                } else {
                    myApp.content.show(new PhotoView({model: photo}))
                }
            });

        }
    };

    new Marionette.AppRouter({
        controller: routeController,
        appRoutes: {
            '':'index',
            'auth': 'auth',
            'photo/:id': 'showPhoto'
        }
    });

    // TODO:  CheckAuth надо вынести в роутер, чтобы вызывался по каждому переходу по роуту, кроме /auth
    function checkAuth(callback) {
        let jstorage_token = $.jStorage.get('user-token');

        if (jstorage_token === null || typeof jstorage_token === "undefined") {
            myApp.content.show(new Auth());
            return;
        } else {
            User.set('token', jstorage_token);
        }

        User.fetchUserData().then( () => callback() );
    }

    function getToken() {
        return window.location.hash.split('&')[0].split('=')[1];
    }

    return myApp;
});
