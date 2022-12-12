import { extendTheme } from '@chakra-ui/react';
import Input from './Input';
import Button from './Button';

export default extendTheme({
  colors: {
    mapGreen: {
      50: '#F8F9F0',
      100: '#DDE4C6',
      200: '#CBDAB1',
      300: '#B8CF9D',
      400: '#A2C389',
      500: '#8BB775',
      600: '#6DA165',
      700: '#568B5B',
      800: '#477555',
      900: '#385E4C'
    }
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50'
      }
    }
  },
  components: {
    Input,
    Button
  }
});
