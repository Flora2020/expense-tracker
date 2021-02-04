//preserve the selected option of category
const categoryRecord = document.getElementById('categoryRecord')

if (categoryRecord) {
  const options = categoryRecord.children
  const selectedOption = categoryRecord.dataset.selected

  for (let i = 1; i < options.length; i++) {
    if (options[i].innerText === selectedOption) {
      options[i].selected = true
      break
    }
  }
}