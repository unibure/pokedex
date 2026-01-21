import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

//비동기 async 실행

// 포켓몬 리스트 가져오기
export const getPokemonList = async (limit = 50, offset = 0) => {
  //limit = 한번에 가져올때 기본값 , offset = 몇번째 부터 가져올건지
  try {
    //일단 시도해봐
    const response = await axios.get(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    );
    return response.data; //결과값이있으면 반환해
  } catch (error) {
    //에러가 발생하면
    console.error("Error fetching pokemon list:", error);
    return { results: [] }; //결과값이 없으면 빈배열을 반환해
  }
};

//포켓몬 상세정보 가져오기
export const getPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon details", error);
    return null;
  }
};

// 포켓몬 중(species) 정보 가져오기
export const getPokemonSpecies = async (speciesUrl) => {
  try {
    const response = await axios.get(speciesUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon species", error);
    return null;
  }
};

// 한글 이름 추출하기
const getKoreanName = (speciesData) => {
  if (!speciesData || !speciesData.names) return null; //speciesData가 없거나 names가 없으면 null 반환

  const koreanName = speciesData.names.find(
    (name) => name.language.name === "ko", //language.name이 ko인 이름을 찾음
  );
  return koreanName ? koreanName.name : null; //한글 이름이 있으면 한글 이름 반환, 없으면 null 반환
};

// 타입 상세 정보가져오기
export const getTypeDetail = async (typeUrl) => {
  try {
    const response = await axios.get(typeUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching type detail", error);
    return null;
  }
};

//한글 타입 이름 추출하기
const getKoreanTypeName = (typeData) => {
  if (!typeData || !typeData.names) return null;

  const koreanType = typeData.names.find((name) => name.language.name === "ko");

  return koreanType ? koreanType.name : null;
};

// 모든 포켓몬의 상세정보를 가져오기 (한글 이름 포함)
export const getAllPokemonDetails = async (limit , offset = 0) => {
  const data = await getPokemonList(limit, offset); //현재 자세한정보는 없고 이름하고 상세정보주소만 확보
  const promises = data.results.map(async (pokemon) => {
    //map을 돌면서 상세정보를 가져와야함
    const pokemonData = await getPokemonDetails(pokemon.url); //포켓몬 상세정보를 가져옴

    //species 정보 가져오기
    if (pokemonData && pokemonData.species) {
      const speciesData = await getPokemonSpecies(pokemonData.species.url);
      const koreanName = getKoreanName(speciesData);

      // 타입 한글 이름 가져오기
      const typesWithKorean = await Promise.all(
        pokemonData.types.map(async (typeInfo) => {
          const typeData = await getTypeDetail(typeInfo.type.url);
          const koreanTypeName = getKoreanTypeName(typeData);
          return {
            ...typeInfo,
            type: {
              ...typeInfo.type,
              koreanName: koreanTypeName || typeInfo.type.name,
            },
          };
        }),
      );
      // 한글 이름을 포켓몬 데이터에 추가
      return {
        ...pokemonData,
        koreanName: koreanName || pokemonData.name, //한글이 없으면 영어 이름 사용
        type: typesWithKorean,
      };
    }
    return pokemonData;
  });
  const results = await Promise.all(promises); //전부다 가져올때까지 기다림
  return results.filter(Boolean); // null 값 제거
};
