const PokemonCard = ({ pokemonList, handlePokemonClick }) => {
  // function typeColor(type) {
  //   return `var(--type-${type})`;
  // }

  return (
    <div className="poke-content">
      <ul className="poke-list">
        {pokemonList.map((pokemon) => (
          <li
            className="list"
            key={pokemon.id}
            onClick={() => handlePokemonClick(pokemon)}
          >
            <div className="top">
              <span className="name">{pokemon.koreanName}</span>
              <span className="number">
                #{String(pokemon.id).padStart(3, "0")}
                {/* 문자열의 길이를 최소 3자리로 맞추고 짧다면 부족한 만큼 앞을 0으로 채우기 */}
              </span>
            </div>
            <img
              loading="lazy"
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.koreanName}
            />
            <div className="type">
              {pokemon.type.map((typeInfo) => (
                <span
                  key={typeInfo.type.koreanName}
                  style={{
                    "--type-color": `var(--type-${typeInfo.type.name})`,
                  }}
                >
                  {typeInfo.type.koreanName}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonCard;
