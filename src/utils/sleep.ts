export default function sleep(sec: number) {
  const url = new URL(window.location.href);
  return new Promise(r => {
    url.searchParams.has("s") ? r() : setTimeout(r, sec * 1e3);
  });
}
