import { motion } from "framer-motion";

export default function PokemonModal({ pokemon, handleCloseModal }) {
  console.log(pokemon.sprites);
  return (
    <div className="pokemon-modal">
      <div className="dimmer" onClick={handleCloseModal}></div>
      <div className="modal-content">
        <div className="modal-close" onClick={handleCloseModal}>
          ✕
        </div>
        <div className="modal-body">
          <div className="modal-header-section">
            <div className="modal-image">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.koreanName}
              />
            </div>

            <h2 className="modal-name">{pokemon.koreanName}</h2>
            {/* <div className="modal-number">#{String(pokemon.id).padStart(3, "0")}</div> */}
            <div className="modal-types">
              {pokemon.type.map((typeInfo) => (
                <span
                  key={typeInfo.type.koreanName}
                  className="modal-type-badge"
                  style={{
                    "--type-color": `var(--type-${typeInfo.type.name})`,
                  }}
                >
                  {typeInfo.type.koreanName}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-info-section">
            <div className="info-row">
              <div className="info-item">
                <span className="info-label">키</span>
                <span className="info-value">{pokemon.height / 10}m</span>
              </div>
              <div className="info-item">
                <span className="info-label">몸무게</span>
                <span className="info-value">{pokemon.weight / 10}kg</span>
              </div>
            </div>
          </div>

          <div className="modal-stats-section">
            <h3 className="stats-title">능력치</h3>
            <div className="stats-list">
              {pokemon.stats.map((stat, id) => (
                <div className="stat-item" key={id}>
                  <div className="stat-header">
                    <span className="stat-name">{stat.stat.name}</span>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                  <div className="stat-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="stat-bar-fill"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
