const helpers = {
  objectToArray: object => {
    let resultArray = []
    for (let i in object) {
      if (object[i] && i !== 'description' && i !== 'address') {
        resultArray.push(object[i])
      }
    }
    return resultArray
  },

  randomNumber: (min, max) => {
    let rand = Math.random() * (max - min + 1) + min
    return Math.floor(rand)
  }
}
export default helpers
