export function getIndexAndKey(str: string) {
  // Regular expression to match "education[1].keyName"
  const regex = /(\w+)\[(\d+)\]\.(\w+)/;

  // Executing the regex on the input string
  const match = regex.exec(str);

  if (match) {
    // Extracting index and key from the matched groups
    const index = parseInt(match[2]); // Convert matched index to integer
    const key = match[3];
    return { index, key, match };
  } else {
    // If no match is found, return null
    return { match: false };
  }
}
