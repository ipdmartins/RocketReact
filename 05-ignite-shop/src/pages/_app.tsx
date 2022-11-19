import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
import logo from "../assets/logo.svg";
import homeImg from "../assets/home.png";
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logo} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
