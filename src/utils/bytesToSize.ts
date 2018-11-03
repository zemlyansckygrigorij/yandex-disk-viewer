export default function (bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return 'n/a';
  }
  const magicIndex = Math.floor(Math.log(bytes) / Math.log(1024));
  const i = parseInt(`${magicIndex}`, 10);
  if (i === 0) {
    return `${bytes} ${sizes[i]})`;
  }
  const power = 1024 ** i;
  return `${(bytes / power).toFixed(2)} ${sizes[i]}`;
}
