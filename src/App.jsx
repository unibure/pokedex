import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import pokeLogo from "./assets/pokelogo.webp";
import { getAllPokemonDetails } from "./api/pokemon";
import PokemonModal from "./components/PokemonModal";
import { motion } from "framer-motion";

function App() {
  //포켓몬 목록이 바뀔 때마다 화면이 갱신되어야하기때문에 변수에 담아두는게 아닌 리액트가 감시하는 변수(State)에 담아두기
  const [pokemons, setPokemons] = useState([]); //데이터가 오기 전에도 화면이 에러 없이 잘 나오게 하기위해 초기값을 빈배열
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const targetRef = useRef(null);
  const observerRef = useRef(null);
  const MAX_POKEMON = 151; //1세대 포켓몬 최대 개수

  const [search, setSearch] = useState(""); //검색어 상태

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // 포켓몬 데이터 가져오기
  const fetchData = useCallback(
    async (currentOffset) => {
      setLoading(true);

      try {
        // 남은 포켓몬 개수 계산
        const remaining = MAX_POKEMON - pokemons.length;
        if (remaining <= 0) {
          setLoading(false);
          return;
        }

        const limit = Math.min(50, remaining); //최대 50개 또는 남은 개수중 작은 값

        // offset번호에 맞는 포켓몬 가져오기
        const newPokemons = await getAllPokemonDetails(limit, currentOffset);

        // 원래 있던 목록(prev) 뒤에 새로운 목록을 붙이기 (중복 제거)
        setPokemons((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNewPokemons = newPokemons.filter(
            (p) => !existingIds.has(p.id),
          );
          return [...prev, ...uniqueNewPokemons];
        });
      } catch (error) {
        console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    },
    [pokemons.length],
  );

  //앱이 켜지자마자 데이터 가져오기
  //화면이 처음 마운트될때 생성해둔 api 함수 실행, 비동기여서 별도의 함수를 만들어서 실행시킨다
  useEffect(() => {
    if (pokemons.length >= MAX_POKEMON) {
      return;
    }
    fetchData(offset);
  }, [offset, fetchData, pokemons.length]);

  // IntersectionObserver 설정
  useEffect(() => {
    const handleIntersect = (entries) => {
      // 투명 박스가 화면에 들어왔거나, 로딩중이 아니고, 아직 151개 미만일 때만
      if (
        entries[0].isIntersecting &&
        !loading &&
        pokemons.length < MAX_POKEMON
      ) {
        //다음 50마리를 가져와서 번호표를 50 증가시키기
        setOffset((prev) => {
          const nextOffset = prev + 50;
          // 151개를 넘지 않도록 제한
          return nextOffset >= MAX_POKEMON ? MAX_POKEMON : nextOffset;
        });
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect);

    // 투명 박스 감시 시작
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observerRef.current?.unobserve(currentTarget);
      }
      observerRef.current?.disconnect();
    };
  }, [loading, pokemons.length]);

  //가져온 데이터를 화면에 보여주기 pokemonList 라는 이름표 붙여서 선물

  const filteredPokemons = useMemo(() => {
    if (!search.trim()) return pokemons;
    return pokemons.filter((pokemon) => pokemon.koreanName.includes(search));
  }, [search, pokemons]);

  const isSearching = search.trim().length > 0; //검색어가 비어 있는지 확인

  const handlePokemonClick = (poke) => {
    setSelectedPokemon(poke);
    console.log(poke);
  };
  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="poke-container"
    >
      <div className="wrapper">
        <motion.div
          className="head"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img src={pokeLogo} alt="pokemon logo" className="m-auto" />
          </motion.h1>
          <motion.div
            className="search-box"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="포켓몬을 검색하세요..."
              className="search-input"
            />
          </motion.div>
        </motion.div>

        {/* 검색 결과가 없을때 메시지 표시 */}
        {isSearching && filteredPokemons.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="no-results"
          >
            검색결과가 없습니다.
          </motion.div>
        )}

        {/* 검색중일때는 결과만, 검색 중이 아닐때 포켓몬 카드 표시 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {isSearching ? (
            filteredPokemons.length > 0 && (
              <PokemonCard pokemonList={filteredPokemons} />
            )
          ) : (
            <PokemonCard
              pokemonList={pokemons}
              handlePokemonClick={handlePokemonClick}
            />
          )}
        </motion.div>

        {/* 검색 중이 아닐때만 무한 스크롤 활성화 */}
        {!isSearching && pokemons.length < MAX_POKEMON && (
          <div className="loading" ref={targetRef}></div>
        )}

        {selectedPokemon && (
          <PokemonModal
            pokemon={selectedPokemon}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    </motion.div>
  );
}

export default App;
