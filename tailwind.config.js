module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                iceland: ['Iceland', 'Arial', 'sans-serif']
            },
            colors: {
                primary: '#523295',
                secondary: '#D975B9',
                light: '#F4E2CA',
                blue: {
                    light: '#1A225C',
                    Dark: '#0A123C'
                }
            },
            backgroundImage: {
                'map': "url('assets/img/map.png')" // Stockages des maps pour les utiliser comme background ???
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}