import {ADJECTIVES, ADVERBS, NOUNS, VERBS}from "./sentences"

const generateFourDigitNumericId = () => {
  const randomBuffer = crypto.getRandomValues(new Uint32Array(1));
  const randomNumber = randomBuffer[0] % 10000;
  return randomNumber.toString().padStart(4, '0');
}

const getRandomWord = (arr: string[]) => {
  const randomBuffer = crypto.getRandomValues(new Uint32Array(1));
  const randomNumber = randomBuffer[0] % arr.length;
  return arr[randomNumber];
}

export const generateMemorableId = () => {
  const adjective = getRandomWord(ADJECTIVES);
  const adverb = getRandomWord(ADVERBS);
  const verb = getRandomWord(VERBS);
  const noun = getRandomWord(NOUNS);
  const fourDigitNumericId = generateFourDigitNumericId();

  return `${adjective}-${adverb}-${verb}-${noun}-${fourDigitNumericId}`;
}
