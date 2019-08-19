fetch("http://localhost:3000/reviews")
.then(resp => resp.json())
.then(data => console.log(data))
