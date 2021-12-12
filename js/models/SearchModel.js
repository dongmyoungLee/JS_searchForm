const data = [
    {
        id: 1,
        name: '회색 푸들',
        image: 'https://previews.123rf.com/images/aniuta28/aniuta281402/aniuta28140200007/26184662-%EB%85%B9%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%ED%9A%8C%EC%83%89-%ED%91%B8%EB%93%A4.jpg'
    }, 
    {
        id: 2,
        name: '갈색 푸들',
        image: 'https://pbs.twimg.com/media/DPuTL3HVAAAagIu.jpg'
    },
    {
        id: 3,
        name: '검은색 푸들',
        image: 'https://mblogthumb-phinf.pstatic.net/20151101_165/df1809_1446388186701ivkpF_JPEG/DSC_3651_copy.jpg?type=w2'
    },
    {
        id: 4,
        name: '흰색 푸들',
        image: 'https://cdn.crowdpic.net/list-thumb/thumb_l_3B23199369A8F40230F5F3676E938C48.jpg'
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