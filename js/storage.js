// js/storage.js
// 저장 후 다음 페이지로 이동시키는 유틸

/**
 * key: 'space' | 'style' | 'furniture'
 * value: 선택 값 (예: '거실', '모던', '소파')
 */
function saveChoice(key, value) {
  try {
    localStorage.setItem(key, value);
    // 간단한 UX: 잠깐 버튼 누른 걸 보여주고 이동
    // 다음 페이지 결정
    if (key === 'space') {
      // 공간 다음은 스타일 선택 페이지
      setTimeout(() => location.href = 'style.html', 180);
    } else if (key === 'style') {
      setTimeout(() => location.href = 'furniture.html', 180);
    } else if (key === 'furniture') {
      setTimeout(() => location.href = 'result.html', 180);
    } else {
      // 알 수 없는 키면 홈으로
      setTimeout(() => location.href = 'index.html', 180);
    }
  } catch (e) {
    console.error('저장 실패', e);
    alert('선택 저장에 실패했습니다. 브라우저 저장소 권한을 확인하세요.');
  }
}

// (선택) clearAll() : 개발/디버그용
function clearAllChoices() {
  localStorage.removeItem('space');
  localStorage.removeItem('style');
  localStorage.removeItem('furniture');
}
