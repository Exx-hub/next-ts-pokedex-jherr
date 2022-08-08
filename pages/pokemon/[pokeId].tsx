import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Selected } from "../../interfaces";
import styles from "../../styles/PokeById.module.css";

import { IPokemon } from "../../interfaces";

function PokeById({ selected }: { selected: Selected }) {
  const pokeTypes = selected?.type.map((e, i) => {
    if (i === selected.type.length - 1) {
      return <span key={i}>{e}</span>;
    }
    return <span key={i}>{e}, </span>;
  });

  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <a>Back To Home</a>
      </Link>

      <Image
        src={`/${selected?.image}`}
        alt="pokemon"
        width={250}
        height={250}
      />

      <div>
        <div>
          <h2>{selected?.name}</h2>
          <h3>{pokeTypes}</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            {selected?.stats.map((stat) => (
              <tr key={stat.name}>
                <td style={{ fontWeight: "bold" }}>{stat.name} </td>
                <td style={{ textAlign: "center" }}>{stat.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PokeById;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  const data: IPokemon[] = await response.json();

  const paths = data.map((item) => {
    return {
      params: { pokeId: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pokeId = context.params?.pokeId;

  const response = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${pokeId}.json`
  );
  const data: Selected = await response.json();

  return {
    props: {
      selected: data,
    },
  };
};
