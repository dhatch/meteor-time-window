Package.on_use(function (api, where) {
    api.use(['deps'], 'client');
    api.add_files("lib/time_window.js", 'client');
    api.export("TimeWindow");
});