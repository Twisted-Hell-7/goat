import './styles.css';
import { mount } from './app';

// wait for fonts so initial layout doesn't shift
const start = () => mount(document.getElementById('app')!);

if ('fonts' in document) {
  // @ts-ignore
  document.fonts.ready.then(start).catch(start);
} else {
  start();
}
