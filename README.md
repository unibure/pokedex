# 📒 포켓몬 도감 (Pokedex) Project

React와 Vite를 사용하여 개발한 **1세대 포켓몬 도감** 웹 애플리케이션입니다.  
PokeAPI를 활용하여 포켓몬 데이터를 실시간으로 가져오며, Framer Motion을 이용한 부드러운 애니메이션과 직관적인 UI를 제공합니다.

## ✨ 주요 기능 (Features)

### 1. 포켓몬 목록 조회 및 무한 스크롤

- 1세대 포켓몬(1번 ~ 151번) 데이터를 불러옵니다.
- **Intersection Observer API**를 도입하여, 스크롤이 하단에 닿을 때마다 추가 데이터를 자동으로 로드하는 **무한 스크롤(Infinite Scroll)**을 구현했습니다.

### 2. 실시간 검색 (Search)

- 포켓몬의 **한글 이름**으로 실시간 검색이 가능합니다.
- 검색 결과가 없을 경우 사용자에게 알림 메시지를 표시합니다.

### 3. 상세 정보 모달 (Detail Modal)

- 포켓몬 카드를 클릭하면 상세 정보를 확인할 수 있는 모달창이 팝업됩니다.
- 배경 블러 처리(Glassmorphism)와 줌인 애니메이션으로 몰입감을 높였습니다.

### 4. UI/UX 인터랙션

- **Scroll to Top**: 스크롤이 일정 깊이 이상 내려가면 최상단으로 이동할 수 있는 플로팅 버튼이 나타납니다.
- **Micro-interactions**: 버튼 호버, 클릭, 카드 로딩 시 자연스러운 애니메이션 효과를 적용했습니다.

## 🛠 기술 스택

React, Vite, JavaScript, CSS, Framer Motion, Axios

---

_Developed by goun_
