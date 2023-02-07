# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Users

User.destroy_all

user1 = User.create({
  username: 'bella',
  email: 'jimmy@test.com',
  password: '123',
  dog_name: 'bella',
  breed: 'poodle',
  description: 'woof',
  image: 'https://worldanimalfoundation.org/wp-content/uploads/2022/10/About-the-Breed-review-1.jpg',
  avatar: 'https://www.thesprucepets.com/thmb/G0MGCtP9uMt7AtPHWcirnm38T5w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1153019783-212f3a30f2874e01b82582f65010d569.jpg'
})

user2 = User.create({
  username: 'jonix',
  email: 'nikko@test.com',
  password: '123456789',
  dog_name: 'Bear',
  breed: 'Bernese Mountain',
  description: 'A giant goofball',
  image: 'https://www.pumpkin.care/wp-content/uploads/2021/03/BerneseMountainDog-Hero.jpg',
  avatar: 'https://designoholic.com/wp-content/uploads/2017/07/avatar-rogemon.png'
})

user3 = User.create({
  username: 'udon',
  email: 'udon@gmail.com',
  password: 'pass',
  dog_name: 'Udon',
  breed: 'Coton De Tulear',
  description: 'A splooting floof',
  image: 'https://static.wixstatic.com/media/d22c52_b54bd7439fad4724b0470943ad39c66d~mv2_d_2061_2359_s_2.jpg/v1/fill/w_323,h_370,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/d22c52_b54bd7439fad4724b0470943ad39c66d~mv2_d_2061_2359_s_2.jpg',
  avatar: 'https://www.publicdomainpictures.net/pictures/250000/nahled/dog-puppy-illustration.jpg'
})

# Discussions

Discussion.destroy_all

user1.discussions.create({
  title: 'Looking for friends!',
  content: 'My dog has been feeling lonely, and wants some new friends. Anyone want to meet up?',
  category: 'Meetup',
})

user2.discussions.create({
  title: 'Food puzzle',
  content: 'My pup has solved this food puzzle, does anyone have another puzzle they want to swap?',
  category: 'Swap',
})

user3.discussions.create({
  title: 'Dog exercise or workout',
  content: 'How often should I be bringing my dog to a dog park and for how long?',
  category: 'Other',
})

# Comments
Comment.destroy_all

comment1 = Comment.create({body: 'sick post!', user_id: 1, discussion_id: 1})




