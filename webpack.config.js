const path = require('path');

const appPath = (...names) => path.join(process.cwd(), ...names);

//This will be merged with the config from the flavor
module.exports = {
    entry: {
        options: [appPath('src', 'options.tsx'), appPath('src', 'styles', 'options.scss')]
    },
    output: {
        filename: '[name].js',
        path: appPath('build'),
    }
};
