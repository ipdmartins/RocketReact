import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { HomeContainer, Product } from "../styles/pages/home";
import camiseta1 from "../assets/1.png";
import camiseta2 from "../assets/2.png";
import camiseta3 from "../assets/3.png";
import "keen-slider/keen-slider.min.css";
import { textSpanOverlap } from "typescript";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={camiseta1} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta2} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}

// Busca informações no server side do Next. Isso só pode ser usado quando as
// informações devem estar disponiveis assim que a página for exibida em tela
// ou seja, a maioria das chamadas de api ainda serao com useeffect por exemplo.
// esse código não fica visivel para o usuario final. Ele não tem acesso.

// export const getServerSideProps = () => {
//   return {
//     propos: {
//       list: [1, 2, 3],
//     },
//   };
// };
