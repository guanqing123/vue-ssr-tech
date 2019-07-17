export default {
  // updateCount (state, num) {
  //   state.count = num
  // }
  updateCount (state, { num, num2 }) {
    console.log(num2)
    state.count = num
  }
}
