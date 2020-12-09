export const saveToLocalStorage = (arr) => {
    localStorage.setItem('bookmarked', JSON.stringify(arr))
}

export const removeBookmark = (slug, setBookmarkList) => {
    const saved = localStorage.getItem('bookmarked')
    const arr = JSON.parse(saved)
    const removed = arr.filter(item => item !== slug)
    setBookmarkList(removed)
    saveToLocalStorage(removed)
}

export const checkBookmark = (slug, bookmarkList) => {
    if(bookmarkList.includes(slug)){
        return true
    }else{
        return false
    }
}

export const bookmark = (slug, setBookmarkList) => {
    const saved = localStorage.getItem('bookmarked')
    const wrapper = JSON.parse(saved)
    wrapper.push(slug)
    setBookmarkList(wrapper)
    saveToLocalStorage(wrapper)
}