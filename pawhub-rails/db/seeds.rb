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
  avatar: 'https://imgur.com/a/xlfz5Ki'
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

comment1 = Comment.create({body: 'Vel pharetra vel turpis nunc eget lorem. In arcu cursus euismod quis. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Pharetra vel turpis nunc eget. Mi ipsum faucibus vitae aliquet.', user_id: 3, discussion_id: 1})
Comment.create({body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus aenean vel elit scelerisque. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Sagittis vitae et leo duis ut diam quam nulla. Id cursus metus aliquam eleifend. Amet justo donec enim diam vulputate ut pharetra sit amet. Sit amet nulla facilisi morbi tempus iaculis', user_id: 2, discussion_id: 3})
Comment.create({body: 'Vulputate mi sit amet mauris commodo quis. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Aliquet bibendum enim facilisis gravida neque convallis a cras. Et egestas quis ipsum suspendisse ultrices gravida. Egestas sed tempus urna et pharetra pharetra.', user_id: 1, discussion_id: 1})
Comment.create({body: 'Aliquet nec ullamcorper sit amet. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus.', user_id: 1, discussion_id: 1})
Comment.create({body: 'Mi ipsum faucibus vitae aliquet. Maecenas volutpat blandit aliquam etiam erat. Nibh sit amet commodo nulla facilisi. Nibh nisl condimentum id venenatis a.', user_id: 2, discussion_id: 2})
Comment.create({body: 'Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus. Morbi tristique senectus et netus et malesuada fames ac turpis.', user_id: 1, discussion_id: 3})
Comment.create({body: 'Pretium vulputate sapien nec sagittis aliquam malesuada. Eget egestas purus viverra accumsan in nisl.', user_id: 3, discussion_id: 1})
Comment.create({body: 'Nibh praesent tristique magna sit amet purus. Tempor commodo ullamcorper a lacus vestibulum sed. At varius vel pharetra vel. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Sit amet nisl purus in mollis nunc.', user_id: 3, discussion_id: 2})
Comment.create({body: 'Pulvinar mattis nunc sed blandit libero volutpat sed cras ornare. Nunc lobortis mattis aliquam faucibus purus in massa tempor. ', user_id: 2, discussion_id: 2})
Comment.create({body: 'Nisi est sit amet facilisis magna etiam. Arcu felis bibendum ut tristique et egestas quis ipsum. Netus et malesuada fames ac turpis egestas.', user_id: 3, discussion_id: 2})
Comment.create({body: 'A condimentum vitae sapien pellentesque. Lacinia at quis risus sed vulputate odio ut enim. Sodales ut eu sem integer vitae. Neque gravida in fermentum et sollicitudin ac orci. Etiam non quam lacus suspendisse faucibus interdum.', user_id: 3, discussion_id: 3})
Comment.create({body: 'Velit euismod in pellentesque massa placerat duis ultricies. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Id donec ultrices tincidunt arcu. Gravida in fermentum et sollicitudin ac.', user_id: 3, discussion_id: 1})
Comment.create({body: 'Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Phasellus vestibulum lorem sed risus ultricies.', user_id: 1, discussion_id: 3})
Comment.create({body: 'Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Orci porta non pulvinar neque laoreet suspendisse.', user_id: 2, discussion_id: 2})
Comment.create({body: 'Fermentum odio eu feugiat pretium. Quisque non tellus orci ac auctor augue mauris. Morbi tristique senectus et netus et malesuada. Feugiat sed lectus vestibulum mattis ullamcorper.', user_id: 1, discussion_id: 1})
