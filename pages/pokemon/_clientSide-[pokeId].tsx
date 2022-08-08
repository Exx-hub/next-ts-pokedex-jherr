import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Selected } from "../../interfaces";
import styles from "../../styles/PokeById.module.css";

export function PokeById() {
  const router = useRouter();
  const { pokeId } = router.query;

  const [selected, setSelected] = useState<Selected | null>(null);

  useEffect(() => {
    console.log("useEffect ran");
    const fetchData = async () => {
      const response = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${pokeId}.json`
      );
      const data = await response.json();
      console.log(data);
      setSelected(data);
    };

    if (pokeId) {
      fetchData();
    }
  }, [pokeId]);

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
