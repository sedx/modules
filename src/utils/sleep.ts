export default function sleep(sec: number) {
  return new Promise(r => {
    setTimeout(r, sec * 1e3);
  });
}
