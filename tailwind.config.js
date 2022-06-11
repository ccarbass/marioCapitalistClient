module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    
    colors: {
      'blue': '#1fb6ff',
      'red':'#fa0d25',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'yellow-light':"#f9f8e3",
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundImage: {
        'main':"url('../public/asset/background.jpg')",
        'pipe':"url('../public/asset/ipe.png')"
    },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      width:{
        'small':"10%"
      }
    }
  },
}