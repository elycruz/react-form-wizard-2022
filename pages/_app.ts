import '../src/css/index.css';
import App from '../src/App';

export default function ServerSideApp({Component, ...pageProps}) {
  return (<App>
    <Component {...pageProps} />
  </App>);
}
