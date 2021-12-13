export const getTrees = async () => {
  return await fetch('https://public.ecologi.com/trees').then(response => response.json()).then(data => data);
};
