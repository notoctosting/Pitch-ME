import "./styles.css";
import { ParallaxProvider } from "react-scroll-parallax";

function App({ Component, pageProps }) {
  return (
    <ParallaxProvider>
      <Component {...pageProps} />
    </ParallaxProvider>
  );
}
export default App;
