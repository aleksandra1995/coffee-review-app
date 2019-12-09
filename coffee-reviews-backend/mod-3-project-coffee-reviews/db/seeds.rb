# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


users = [
 'Prince',
 'Dick',
 'Garry',
 'Jason',
 'Matt',
 'Noah',
 'Adam',
 'Arthur'
]

user_collection = []

users.each do |name|
 user_collection << User.create(username: name)
end

Review.create(shop_id: 1, user_id: 1, rating: 7, comment: "This is not the best coffee I have ever had" , title:"I have had better")
Review.create(shop_id: 1, user_id: 2, rating: 6, comment: "Coffee was DELICIOUS, probably best one out there. Not a fan of the danishes." , title:"Best coffee, okay pastries ")
Review.create(shop_id: 2, user_id: 2, rating: 8, comment: "Now this is what I call great coffee place. Location is beautiful! Def reommend" , title:"Perfect for a morning coffee")
Review.create(shop_id: 2, user_id: 1, rating: 9, comment: "The wait staff is on point here. Love em! Good coffee too." , title:"Shoutout to the Waiters!!")
Review.create(shop_id: 3, user_id: 4, rating: 10, comment: "Fav." , title:"I'm speachless")


Shop.create(name: "Bella's Shop", location: "New Heaven", img: "https://dutchreview.com/wp-content/uploads/tranquilo-coffeeshop-amsterdam-04.jpg")
Shop.create(name: "Smokey", location: "Amsterdam", img: "https://media.timeout.com/images/105302793/630/472/image.jpg")
Shop.create(name: "Bob Marley", location: "Rotterdam", img: "https://getsmokin.nl/assets/coffeeshopcontent/bob-marley.jpg")
Shop.create(name: "Mellow Yellow", location: "Brazil", img: "https://www.amsterdamtourist.info/wp-content/uploads/2017/06/Coffeeshop-in-amsterdam-mellow-yellow-closed.jpg")
Shop.create(name: "Paradise", location: "Heaven", img: "https://www.amsterdam-travel-guide.net/images/coffeeshops/coffeeshop-paradise-amsterdam-damstraat.jpg")
