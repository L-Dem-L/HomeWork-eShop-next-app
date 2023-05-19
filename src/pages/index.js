
import CardProduct from "@/components/Product/CardProduct";
import Slide from "@/components/Slide/Slide";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }) {
  return (
    <>
      <div className='container'>
        <div className="row">
          <div className="col-12">
            <Slide />
            <ul style={{
              display: 'flex',
              flexWrap: 'wrap',
              listStyle: 'none',
              padding: 0,

            }}>
              {products && products.map(product => (
                <li
                  key={product.id}
                  style={{
                    width: "25%",
                    padding: "0 10px",
                  }}
                >
                  <CardProduct product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://fakestoreapi.com/products?limit=4');
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}


