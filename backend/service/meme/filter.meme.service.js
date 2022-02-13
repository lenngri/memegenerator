exports.filterMemes = function(memes, query) {

        if (query.newest) memes = memes.filter((element) => query.newest.setDate(query.newest.getDate()+1) >= element.createdAt)

        if (query.oldest) memes = memes.filter((element) => query.oldest <= element.createdAt)

        if (query.random) memes = memes.sort(() => Math.random() - 0.5)

        if (query.maxNumber) memes = memes.slice(0, query.maxNumber)

        return memes
}