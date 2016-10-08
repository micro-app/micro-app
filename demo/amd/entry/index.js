import './index.scss';

requirejs(['/dist/micro-app.min.js'], (microApp) => {

    microApp.capable = true;
    microApp.title = 'Demo of AMD';
    microApp.icon = 'icon.jpg#autosize';

});
