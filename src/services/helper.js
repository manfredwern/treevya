/**
 * Shared helper functions
 */

export const fetchDataFromApi = async (url, useToken = false) => {
  const token = localStorage.getItem('quiz_token');
  if (!url) return;
  if (token && useToken) {
    url += `&token=${token}`;
  }

  console.log('REQUEST URL: ', url);
  const res = await fetch(url);
  const data = await res.json();
  return data || [];
};

export const shuffleArray = (arr) => {
  arr.sort(() => Math.random() - 0.5);
};
