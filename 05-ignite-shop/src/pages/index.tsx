import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { HomeContainer, Product } from "../styles/pages/home";
import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";

interface homeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: homeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      {/* Cria o Header da pagina no navegador */}
      <Head>
        <title>Home | Ignite shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

/* Busca informações no server side do Next. Isso só pode ser usado quando as
informações devem estar disponiveis assim que a página for exibida em tela
ou seja, a maioria das chamadas de api ainda serao com useeffect por exemplo.
esse código não fica visivel para o usuario final. Ele não tem acesso. O método
getServerProps executa chamadas todas as vezes que a home é recarregada (F5). O
método getStaticProps roda somente no momento em que o NextJS estiver criando uma
versão em cache da página, no momento em que é feito o build da aplicação. Com 
isso, ele criará uma página estática para minha aplicação. Se eu rodar o npm 
start, eu poderei acessar localmente como seria minha página em produção. 
Ainda tenho o parâmetro revalidate, o qual estabelece um tempo de atualização 
da página em segundos. */

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};
