import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Pokemon from "../components/Pokemon";
import { IPokemon } from "../interfaces";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
      );
      const data = await response.json();
      // console.log(data);
      setPokemon(data);
    };

    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>POKEDEX</h1>

      <div className={styles.grid}>
        {pokemon.map((item) => (
          <Pokemon key={item.id} pokemon={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;

// https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json
