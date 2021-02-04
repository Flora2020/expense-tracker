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

// confirm before deleting a record
const container = document.getElementById('container')
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-delete')) {
    const msg = '確定要刪除此筆支出嗎？'
    if (confirm(msg)) {
      return true
    }
    event.preventDefault()
  }
})
