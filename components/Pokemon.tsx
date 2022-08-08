import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { IPokemon } from "../interfaces";

export interface IPokemonProps {
  pokemon: IPokemon;
}

function Pokemon({ pokemon }: IPokemonProps) {
  const router = useRouter();

  const viewPokemon = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };
  return (
    <div onClick={viewPokemon}>
      <Image src={`/${pokemon.image}`} alt="pokemon" width={250} height={250} />
      <h2>{pokemon.id}</h2>
      <h2>{pokemon.name}</h2>
    </div>
  );
}

export default Pokemon;
