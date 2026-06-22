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
    <label>
      ${lane}
      <select data-team="${team}" data-lane="${lane}">
        <option value="">選択してください</option>
        ${champions.map(champ => `
          <option value="${champ.riot_id}">${champ['キャラ名']}</option>
        `).join('')}
      </select>
    </label>
  `).join('');

  wrapper.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', renderTeams);
  });
}

function renderTeams() {
  renderTeam('blue');
  renderTeam('red');
}

function renderTeam(team) {
  const target = document.getElementById(`${team}Team`);
  const selects = document.querySelectorAll(`select[data-team="${team}"]`);

  target.innerHTML = Array.from(selects).map(select => {
    const riotId = select.value;
    const lane = select.dataset.lane;
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