import "@/styles/globals.scss";
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.css'
import Layouts from "@/layouts";

export default function App({ Component, pageProps }) {
  return (
    <Layouts>
      <Component {...pageProps} />
    </Layouts>
  );
}
