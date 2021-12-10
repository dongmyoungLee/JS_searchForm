export default {
    data: [
      {keyword: '회색 푸들'}, 
      {keyword: '갈색 푸들'}, 
      {keyword: '검은색 푸들'}, 
      {keyword: '흰색 푸들'}
    ],
  
    list() {
      return new Promise(res => {
        setTimeout(() => {
          res(this.data)
        }, 200)
      })
    }
}