fetch("http://localhost:3000/shops")
.then(resp => resp.json())
.then(data => postShopsOnDom(data))

function postShopsOnDom(data) {
  data.forEach(postEachShopOnDom)
}

function postEachShopOnDom(data) {
  const divForEachShop = document.createElement('div')
  const bodyTag = document.getElementById('body')
  divForEachShop.innerHTML += `<img src= "${data.img}"/>
  <h1>${data.name}</h1>`
  

  bodyTag.append(divForEachShop)
}
