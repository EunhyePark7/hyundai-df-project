import customMedia from 'postcss-custom-media';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    customMedia(),
    autoprefixer()
  ]
};
