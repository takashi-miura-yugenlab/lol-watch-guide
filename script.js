const API_URL = 'https://script.google.com/macros/s/AKfycbzerQqO3f0G6LwvdtKU75xnK7ItPRxJzB79jjnPOfYjWZTG7b8oi48qEZWksuHetFKOwg/exec';

const lanes = ['Top', 'Jungle', 'Mid', 'Bot', 'Support'];

let champions = [];

async function init() {
  const response = await fetch(API_URL);
  champions = await response.json();

  createSelectors('blue');
  createSelectors('red');
}

function createSelectors(team) {
  const wrapper = document.getElementById(`${team}Selectors`);

  wrapper.innerHTML = lanes.map(lane => `
    <div class="champion-search">
      <label>${lane}</label>
      <input
        type="text"
        placeholder="キャラ名で検索"
        data-team="${team}"
        data-lane="${lane}"
        autocomplete="off"
      >
      <div class="suggestions"></div>
    </div>
  `).join('');

  wrapper.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', handleSearch);
    input.addEventListener('focus', handleSearch);
  });
}

function handleSearch(event) {
  const input = event.target;
  const keyword = input.value.trim().toLowerCase();
  const box = input.nextElementSibling;

  const results = champions
    .filter(champ => {
      const name = String(champ['キャラ名'] || '').toLowerCase();
      const riotId = String(champ.riot_id || '').toLowerCase();
      return name.includes(keyword) || riotId.includes(keyword);
    })
    .slice(0, 10);

  box.innerHTML = results.map(champ => `
    <button
      type="button"
      class="suggestion-item"
      data-team="${input.dataset.team}"
      data-lane="${input.dataset.lane}"
      data-riot-id="${champ.riot_id}"
      data-name="${champ['キャラ名']}"
    >
      ${champ['キャラ名']} <span>${champ.riot_id}</span>
    </button>
  `).join('');

  box.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', selectChampion);
  });
}

function selectChampion(event) {
  const button = event.currentTarget;
  const team = button.dataset.team;
  const lane = button.dataset.lane;
  const riotId = button.dataset.riotId;
  const name = button.dataset.name;

  const input = document.querySelector(
    `input[data-team="${team}"][data-lane="${lane}"]`
  );

  input.value = name;
  input.dataset.riotId = riotId;
  input.nextElementSibling.innerHTML = '';

  renderTeams();
}

function renderTeams() {
  renderTeam('blue');
  renderTeam('red');
}

function renderTeam(team) {
  const target = document.getElementById(`${team}Team`);
  const inputs = document.querySelectorAll(`input[data-team="${team}"]`);

  target.innerHTML = Array.from(inputs).map(input => {
    const riotId = input.dataset.riotId;
    const lane = input.dataset.lane;
    const champ = champions.find(item => item.riot_id === riotId);

    if (!champ) {
      return `
        <article class="card empty">
          <h3>${lane}</h3>
          <p>未選択</p>
        </article>
      `;
    }

    return createCard(champ, lane);
  }).join('');
}

function createCard(champ, lane) {
  return `
    <article class="card">
      <h3>${lane}：${champ['キャラ名']}</h3>
      <p>${champ['ロール']} / ${champ['戦闘位置']} / ${champ['タイプ']}</p>
      <p><strong>強い時間帯：</strong>${champ['強い時間帯']}</p>
      <p><strong>勝ち筋：</strong>${champ['勝ち筋']}</p>
      <p><strong>強み：</strong>${champ['強み']}</p>
      <p><strong>弱み：</strong>${champ['弱み']}</p>
      <p><strong>観戦ポイント：</strong>${champ['観戦ポイント']}</p>
      <p><strong>集団戦の役割：</strong>${champ['集団戦の役割']}</p>
      <p><strong>危険度：</strong>${champ['危険度']}</p>
      <p>${champ['初心者向け一言']}</p>
    </article>
  `;
}

init();