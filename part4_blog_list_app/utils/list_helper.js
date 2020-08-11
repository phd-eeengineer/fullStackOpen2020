const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return array.length === 0
        ? 0
        : array.reduce(reducer, 0)
}

const transform = (object) => {
    delete object._id
    delete object.url
    delete object.__v
    return object
}

const maxLikes = (list) => {
    let favorite = list[0]

    list.forEach((item) => {item.likes > favorite.likes ? favorite = item : favorite = favorite})

    return transform(favorite)
}

const favoriteBlog = (list) => {
    //console.log("1: ",list)

    return list.length === 0 
        ? 0
        : list.length === 1
            ? transform(list[0])
            : maxLikes(list)
}

const authorBlogs = (author, number) => {
    let authorName = author
    let numberOfBlogs = number
     resultObject = {
         author: authorName,
         blogs: numberOfBlogs
     }

     return resultObject
}

const maxBlogs = (list) => {
    let favorite = list[0]

    list.forEach((item) => {item.blogs > favorite.blogs ? favorite = item : favorite = favorite})

    return favorite
}

const analyseListBlogs = (list) => {
    
    let newList = []
    newList.push(authorBlogs(list[0].author, 1))
    console.log("1: ", newList )

    for(var i = 1; i < list.length; i++) {
        if("find",newList.find(element => element.author  === list[i].author) === undefined){
            newList.push(authorBlogs(list[i].author, 1))
        } else {
            for(var j = 0; j < newList.length; j++){
                if(newList[j].author === list[i].author){
                    newList[j].blogs +=1
                }
            }
        }
    }
    return maxBlogs(newList)
}

const mostBlogs = (list) => {
    //let authors = []

    return list.length === 0 
        ? 0
        : list.length === 1
            ? authorBlogs(list[0].author, 1)
            : analyseListBlogs(list)
}

const authorLikes = (author, number) => {
    let authorName = author
    let numberOfLikes = number
     resultObject = {
         author: authorName,
         likes: numberOfLikes
     }
     return resultObject
}

const analyseListLikes = (list) => {    
    let newList = []

    newList.push(authorLikes(list[0].author, list[0].likes))

    for(var i = 1; i < list.length; i++) {
        if("find",newList.find(element => element.author  === list[i].author) === undefined){
            newList.push(authorLikes(list[i].author, list[i].likes))
        } else {
            for(var j = 0; j < newList.length; j++){
                if(newList[j].author === list[i].author){
                    newList[j].likes += list[i].likes
                }
            }
        }
    }
    return maxLikesOfAuthor(newList)
}

const maxLikesOfAuthor = (list) => {
    let favorite = list[0]

    list.forEach((item) => {item.likes > favorite.likes ? favorite = item : favorite = favorite})

    return favorite
}

const mostLikes = (list) => {
    return list.length === 0 
        ? 0
        : list.length === 1
            ? authorLikes(list[0].author, list[0].likes)
            : analyseListLikes(list)
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}