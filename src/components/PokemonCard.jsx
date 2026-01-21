import { motion } from "framer-motion";

const PokemonCard = ({ pokemonList, handlePokemonClick }) => {
  return (
    <motion.div className="poke-content">
      <motion.ul className="poke-list">
        {pokemonList.map((pokemon) => {
          const mainType = pokemon.type[0].type.name;

          return (
            <motion.li
              className="list"
              key={pokemon.id}
              onClick={() => handlePokemonClick(pokemon)}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: `var(--type-${mainType})`,
                boxShadow: `0 0 20px var(--type-${mainType})`,
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                "--main-type-color": `var(--type-${mainType})`,
              }}
            >
              <div className="card-header">
                <span className="name">{pokemon.koreanName}</span>
                <span className="number">
                  #{String(pokemon.id).padStart(3, "0")}
                </span>
              </div>

              <div className="image-container">
                <motion.div
                  className="image-bg-glow"
                  style={{ backgroundColor: `var(--type-${mainType})` }}
                  initial={{ opacity: 0.3, scale: 0.8 }}
                  whileHover={{ opacity: 0.6, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.img
                  loading="lazy"
                  width={120}
                  height={120}
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.koreanName}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>

              <div className="type-container">
                {pokemon.type.map((typeInfo) => (
                  <span
                    key={typeInfo.type.koreanName}
                    className="type-badge"
                    style={{
                      backgroundColor: `var(--type-${typeInfo.type.name})`,
                    }}
                  >
                    {typeInfo.type.koreanName}
                  </span>
                ))}
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
};

export default PokemonCard;
