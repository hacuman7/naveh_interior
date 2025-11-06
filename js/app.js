document.addEventListener('DOMContentLoaded', async () => {
  const resultRoot = document.getElementById('result');

  const space = localStorage.getItem('space');
  const style = localStorage.getItem('style');
  const furniture = localStorage.getItem('furniture');

  if (!space || !style || !furniture) {
    resultRoot.innerHTML = `
      <div class="notice">
        <p>선택이 완료되지 않았습니다.</p>
        <div style="margin-top:12px">
          <button onclick="location.href='index.html'" class="btn-secondary">처음으로</button>
          <button onclick="location.href='space.html'" class="btn-primary">공간 선택하러 가기</button>
        </div>
      </div>
    `;
    return;
  }

  const header = document.createElement('div');
  header.className = 'selection-summary';
  header.innerHTML = `
    <div class="pill">공간: <strong>${space}</strong></div>
    <div class="pill">스타일: <strong>${style}</strong></div>
    <div class="pill">가구: <strong>${furniture}</strong></div>
  `;
  resultRoot.appendChild(header);

  try {
    const resp = await fetch('data/designs.json');
    if (!resp.ok) throw new Error('designs.json 로드 실패');
    const data = await resp.json();

    const match = data.find(item =>
      item.space === space && item.style === style && item.furniture === furniture
    );

    const content = document.createElement('div');
    content.className = 'result-content';

    if (!match) {
      content.innerHTML = `
        <h3>결과를 찾을 수 없습니다.</h3>
        <button class="btn-secondary" onclick="location.href='furniture.html'">이전으로</button>
      `;
      resultRoot.appendChild(content);
      return;
    }

    const titleHTML = document.createElement('div');
    titleHTML.className = 'result-header';
    titleHTML.innerHTML = `<h3>추천 디자인</h3><p class="desc">${match.description || ''}</p>`;
    content.appendChild(titleHTML);

    const gallery = document.createElement('div');
    gallery.className = 'image-gallery';
    gallery.id = 'resultImages';

    (match.images || [match.image]).forEach(img => {
      const imageEl = document.createElement('img');
      imageEl.src = `images/${img}`;
      imageEl.alt = `${space} ${style} ${furniture}`;
      gallery.appendChild(imageEl);
    });

    content.appendChild(gallery);

    const actions = document.createElement('div');
    actions.className = 'result-actions';
    actions.innerHTML = `
      <button class="btn-secondary" onclick="location.href='furniture.html'">다시 선택</button>
      <button class="btn-primary" onclick="alert('저장 기능은 추후 추가 예정입니다.')">저장하기</button>
    `;
    content.appendChild(actions);

    resultRoot.appendChild(content);

    // === 이미지 클릭 시 확대 ===
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.getElementsByClassName('close')[0];

    document.getElementById('resultImages').addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        modal.style.display = 'block';
        modalImg.src = e.target.src;
      }
    });

    closeBtn.onclick = function() {
      modal.style.display = 'none';
    }

    modal.onclick = function(e) {
      if (e.target === modal) modal.style.display = 'none';
    }

  } catch (e) {
    console.error(e);
    resultRoot.innerHTML = `<p class="error">데이터를 불러오는 중 오류가 발생했습니다.</p>`;
  }
});
