export default function stringEllipsis(str: string, length: number = 12) {
  if (str.length > length) {
    return str.substring(0, length) + '...';
  } else {
    return str;
  }
}
