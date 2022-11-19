import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import axios from "axios";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { useState } from "react";
import Head from "next/head";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  // fallback: "blocking", a página fica bloqueada e não renderiza até carregar o produto
  //Em caso de fallback: true, aplicar a função abaixo
  const { isFallback } = useRouter();
  if (isFallback) {
    return <h1>Loading...</h1>;
  }

  async function handleBuyProduct() {
    // const router = useRouter();
    setIsCreatingCheckoutSession(true);
    try {
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });
      const { checkoutUrl } = response.data;

      //direcionar usuário para página externa.
      window.location.href = checkoutUrl;

      /*Para direcionar o usuário para uma página interna da aplicação
        router.push('/checkoutProdut');
      */
    } catch (error) {
      //Conectar com 1 tool de observação como Datadog ou Sentry
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar o checkout" + error);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

/*Páginas estaticas que recebem parametros, acusam o erro getStaticPaths is required.
Isso ocorre porque essas paginas não recebem parametro na consulta, pois ela fica em
cache após o build e depois ela recarrega em certo intervalo de tempo. Então, é 
necessário definir o getStaticPaths para evitar o erro.*/

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MocKeupldHQNvM" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params ? String(params.id) : "No id in params";

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount ? price.unit_amount / 100 : 0),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, //1 hour
  };
};
