import './index.scss';

requirejs(['/micro-app.min.js'], (microApp) => {

    microApp.capable = true;
    microApp.title = 'Demo of AMD';
    microApp.icon = 'icon.jpg#autosize';

});
