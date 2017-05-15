requirejs.config({
    baseUrl: '/src/js/',
    paths: {
        'app': 'app',
        'jstorage': 'jstorage'
    }
});

requirejs( ['app'], (App) => App.start() );