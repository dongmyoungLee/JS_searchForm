const data = [
    {
        id: 1,
        name: '귀여운 푸들 1',
        image: 'https://economistphd.com/wp-content/uploads/2021/07/%EB%AF%B8%EB%8B%88%EC%96%B4%EC%B2%98-%ED%91%B8%EB%93%A4.png'
    }, {
        id: 2,
        name: '귀여운 푸들 2',
        image: 'https://d1bg8rd1h4dvdb.cloudfront.net/img/storypick/monamipet/2019/01/1811_pet_dog_poodle_01.jpg'
    }
]

export default {
    list(query) {
        return new Promise(res => {
            setTimeout(() => {
                res(data)
            }, 200);
        })
    }
}