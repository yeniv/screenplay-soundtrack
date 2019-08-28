export const longestWord = (tweet) => {
  const stripPunctuation = tweet.replace(/[.,\/#!$%\^&\*;:{}=\-_`'"~()]/g,"")
  const words = stripPunctuation.split(" ")

  let longestWord = ''

  words.forEach((word) => {
    if (word.length > longestWord.length) {
      longestWord = word
    }
  })

  return longestWord
}
