import { motion } from "framer-motion";

export default function PokemonModal({ pokemon, handleCloseModal }) {
  const mainType = pokemon.type[0].type.name;

  return (
    <div className="pokemon-modal">
      <motion.div
        className="dimmer"
        onClick={handleCloseModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button className="modal-close" onClick={handleCloseModal}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-body">
          <div className="modal-header-section">
            <motion.div
              className="modal-image-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="modal-image-glow"
                style={{ backgroundColor: `var(--type-${mainType})` }}
              />
              <img
                loading="lazy"
                width={150}
                height={150}
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.koreanName}
                className="modal-image"
              />
            </motion.div>

            <motion.div
              className="modal-title-group"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="modal-number">
                #{String(pokemon.id).padStart(3, "0")}
              </span>
              <h2 className="modal-name">{pokemon.koreanName}</h2>
            </motion.div>

            <div className="modal-types">
              {pokemon.type.map((typeInfo, index) => (
                <motion.span
                  key={typeInfo.type.koreanName}
                  className="modal-type-badge"
                  style={{
                    backgroundColor: `var(--type-${typeInfo.type.name})`,
                    boxShadow: `0 0 15px var(--type-${typeInfo.type.name})`,
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {typeInfo.type.koreanName}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            className="modal-info-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="info-box">
              <span className="label">키</span>
              <span className="value">{pokemon.height / 10}m</span>
            </div>
            <div className="info-box">
              <span className="label">몸무게</span>
              <span className="value">{pokemon.weight / 10}kg</span>
            </div>
          </motion.div>

          <div className="modal-stats-section">
            <h3 className="stats-title">능력치</h3>
            <div className="stats-list">
              {pokemon.stats.map((stat, id) => (
                <div className="stat-item" key={id}>
                  <div className="stat-header">
                    <span className="stat-name">{stat.stat.name}</span>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                  <div className="stat-bar-bg">
                    <motion.div
                      className="stat-bar-fill"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, (stat.base_stat / 255) * 100)}%`,
                      }}
                      transition={{
                        delay: 0.6 + id * 0.1,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      style={{
                        backgroundColor: `var(--type-${mainType})`,
                        boxShadow: `0 0 10px var(--type-${mainType})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
