const blueTeam = [
  { name: 'マルファイト', lane: 'Top', role: 'タンク', point: '岩が飛んだら戦闘開始' },
  { name: 'リー・シン', lane: 'Jungle', role: 'ファイター', point: '蹴った方向を見る' },
  { name: 'アーリ', lane: 'Mid', role: 'メイジ/アサシン', point: 'ハートが当たったらチャンス' },
  { name: 'ジンクス', lane: 'Bot', role: 'マークスマン', point: '1人倒した後が本番' },
  { name: 'レオナ', lane: 'Support', role: 'タンク', point: '光った敵が標的' }
];

const redTeam = [
  { name: 'オーン', lane: 'Top', role: 'タンク', point: '巨大な羊が来たら注目' },
  { name: 'ヴァイ', lane: 'Jungle', role: 'ファイター', point: '狙われた人に注目' },
  { name: 'オリアナ', lane: 'Mid', role: 'メイジ', point: 'ボールの位置が重要' },
  { name: 'ケイトリン', lane: 'Bot', role: 'マークスマン', point: '遠くから撃つ狙撃手' },
  { name: 'スレッシュ', lane: 'Support', role: 'タンク/サポート', point: '鎖とランタンを見る' }
];

function createCard(champ) {
  return `
    <article class="card">
      <h3>${champ.lane}：${champ.name}</h3>
      <p>${champ.role}</p>
      <p><strong>観戦ポイント：</strong>${champ.point}</p>
    </article>
  `;
}

document.getElementById('blueTeam').innerHTML = blueTeam.map(createCard).join('');
document.getElementById('redTeam').innerHTML = redTeam.map(createCard).join('');