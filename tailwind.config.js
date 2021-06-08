module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                iceland: ['"iceland"'],
                secondary: [],
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
            // backgroundImage: {
            //     'logo-play': "url('assets/img/jouer.png')",
            //     'logo-shattle': "url('assets/img/shattle.png')"
            // }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}