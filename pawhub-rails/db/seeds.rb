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
  avatar: 'https://i.imgur.com/IVtGnJj.png'
})

user2 = User.create({
  username: 'jonix',
  email: 'nikko@test.com',
  password: '123456789',
  dog_name: 'Bear',
  breed: 'Bernese Mountain',
  description: 'A giant goofball',
  avatar: 'https://designoholic.com/wp-content/uploads/2017/07/avatar-rogemon.png'
})

user3 = User.create({
  username: 'udon',
  email: 'udon@gmail.com',
  password: 'pass',
  dog_name: 'Udon',
  breed: 'Coton De Tulear',
  description: 'A splooting floof',
  avatar: 'https://www.publicdomainpictures.net/pictures/250000/nahled/dog-puppy-illustration.jpg'
})

user4 = User.create({
  username: 'fluffy',
  email: 'fluffy@gmail.com',
  password: 'pass',
  dog_name: 'Fluffy',
  breed: 'Golden Retriever',
  description: 'One big golden retriever. Loves people!',
  avatar: 'https://www.rover.com/blog/wp-content/uploads/2018/11/golden-retriever-2061715_1920.jpg'
})

user5 = User.create({
  username: 'wonton',
  email: 'wonton@gmail.com',
  password: 'pass',
  dog_name: 'Wonton',
  breed: 'Havanese',
  description: 'Looks like a wonton. Loves to eat wontons too! You are what you eat!',
  avatar: 'https://www.rd.com/wp-content/uploads/2021/03/GettyImages-560640849-e1617043874845.jpg?resize=1536,1025'
})

user6 = User.create({
  username: 'bloopy',
  email: 'bloopy@gmail.com',
  password: 'pass',
  dog_name: 'Bloopy',
  breed: 'Siberian Husky',
  description: 'Woof woof!!',
  avatar: 'https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1200336846.jpg?resize=1536,1024'
})

user7 = User.create({
  username: 'tootsie',
  email: 'tootsie@gmail.com',
  password: 'pass',
  dog_name: 'Tootsie',
  breed: 'Pomeranian',
  description: 'Small dog. Big attitude.',
  avatar: 'https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1014940472-scaled.jpg?resize=1536,1024'
})

user8 = User.create({
  username: 'charlie',
  email: 'charlie@gmail.com',
  password: 'pass',
  dog_name: 'Charlie',
  breed: 'Labrador Retriever',
  description: 'Hello, my name is Charlie :D.',
  avatar: 'https://i.pinimg.com/originals/e9/46/02/e946026df22acfc533f37e95634cdf3e.jpg'
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

user4.discussions.create({
  title: 'Dog is getting fat...',
  content: 'So my doggy is getting a lil chonky. Anyone have tips on how to slowly help a dog lose weight? He is a picky one..',
  category: 'Other',
})

user5.discussions.create({
  title: 'Anyone have this problem?',
  content: 'My puppy has been really mean to me and I cannot figure out why. He is turning one, and I have not done anything bad! ',
  category: 'Other',
})

user6.discussions.create({
  title: 'Anyone want to meet at the dog park later?',
  content: 'I will be going at 2 PM. See you there.',
  category: 'Meetup',
})

user7.discussions.create({
  title: 'Extra peepads.',
  content: 'Bought too many peepads on Amazon. Would anyone like to take some off my hands?',
  category: 'Swap',
})

user8.discussions.create({
  title: 'Looking to sell my crate!',
  content: 'My puppy quickly outgrew this crate I bought, and I am looking to sell it. Anyone interested, please comment!',
  category: 'Swap',
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

# Post 4
Comment.create({body: 'Hahaha please upload some pictures!', user_id: 2, discussion_id: 4})
Comment.create({body: 'Give him more food', user_id: 6, discussion_id: 4})
Comment.create({body: 'Fluffy is eating better than me!', user_id: 8, discussion_id: 4})

# Post 5
Comment.create({body: 'Hmmm, give him more treats!', user_id: 6, discussion_id: 5})

# Post 6
Comment.create({body: 'Meow', user_id: 2, discussion_id: 6})
Comment.create({body: 'Will be there if it does not rain!', user_id: 3, discussion_id: 6})
Comment.create({body: 'Great, see you there!', user_id: 6, discussion_id: 6})
Comment.create({body: 'Yes, cant wait!', user_id: 3, discussion_id: 6})

# Post 7
Comment.create({body: 'Interested! I have some extra puzzle toys that my puppy does not use anymore. How many pads do you have?', user_id: 2, discussion_id: 7})
Comment.create({body: 'Woof woof', user_id: 3, discussion_id: 7})
Comment.create({body: 'Which brand have you been using? I am considering the AmazonBasics ones', user_id: 5, discussion_id: 7})
Comment.create({body: 'They are the AmazonBasics ones! Very good for the price. Super absorbent and works great for my pupper', user_id: 7, discussion_id: 7})

# Post 8
Comment.create({body: 'I am very interested! How much are you looking for?', user_id: 5, discussion_id: 8})
Comment.create({body: 'What are the dimensions of the crate? How long have you owned it?', user_id: 6, discussion_id: 8})
Comment.create({body: 'Sold, sorry friends :( Thanks for the interest though!', user_id: 8, discussion_id: 8})

def base64_encode(file)
  require 'base64'
  Base64.strict_encode64(File.open(file, 'rb').read)
end

Image.destroy_all

# Bella :D
Image.create(user_id: 1, file_data: base64_encode(File.open(Rails.root.join("public/images/bella/bella1.jpg"))))
Image.create(user_id: 1, file_data: base64_encode(File.open(Rails.root.join("public/images/bella/bella2.jpg"))))
Image.create(user_id: 1, file_data: base64_encode(File.open(Rails.root.join("public/images/bella/bella3.jpg"))))
Image.create(user_id: 1, file_data: base64_encode(File.open(Rails.root.join("public/images/bella/bella4.jpg"))))
Image.create(user_id: 1, file_data: base64_encode(File.open(Rails.root.join("public/images/bella/bella5.jpg"))))
Image.create(user_id: 1, file_data: base64_encode(File.open(Rails.root.join("public/images/bella/bella6.jpg"))))
Image.create(user_id: 1, file_data: base64_encode(File.open(Rails.root.join("public/images/bella/bella7.jpg"))))
Image.create(user_id: 1, file_data: base64_encode(File.open(Rails.root.join("public/images/bella/bella8.jpg"))))
Image.create(user_id: 1, file_data: base64_encode(File.open(Rails.root.join("public/images/bella/bella9.jpeg"))))

# Udon :D
Image.create(user_id: 3, file_data: base64_encode(File.open(Rails.root.join("public/images/udon/udon (1).jpeg"))))
Image.create(user_id: 3, file_data: base64_encode(File.open(Rails.root.join("public/images/udon/udon (2).jpeg"))))
Image.create(user_id: 3, file_data: base64_encode(File.open(Rails.root.join("public/images/udon/udon (3).jpeg"))))
Image.create(user_id: 3, file_data: base64_encode(File.open(Rails.root.join("public/images/udon/udon (4).jpeg"))))
Image.create(user_id: 3, file_data: base64_encode(File.open(Rails.root.join("public/images/udon/udon (5).jpeg"))))
Image.create(user_id: 3, file_data: base64_encode(File.open(Rails.root.join("public/images/udon/udon (6).jpeg"))))
Image.create(user_id: 3, file_data: base64_encode(File.open(Rails.root.join("public/images/udon/udon (7).jpeg"))))
Image.create(user_id: 3, file_data: base64_encode(File.open(Rails.root.join("public/images/udon/udon (8).jpeg"))))
Image.create(user_id: 3, file_data: base64_encode(File.open(Rails.root.join("public/images/udon/udon (9).jpeg"))))
Image.create(user_id: 3, file_data: base64_encode(File.open(Rails.root.join("public/images/udon/udon (10).jpeg"))))

# Bear :D
Image.create(user_id: 2, file_data: base64_encode(File.open(Rails.root.join("public/images/bear/bear (1).jpg"))))
Image.create(user_id: 2, file_data: base64_encode(File.open(Rails.root.join("public/images/bear/bear (2).jpg"))))
Image.create(user_id: 2, file_data: base64_encode(File.open(Rails.root.join("public/images/bear/bear (3).jpg"))))
Image.create(user_id: 2, file_data: base64_encode(File.open(Rails.root.join("public/images/bear/bear (4).jpg"))))
Image.create(user_id: 2, file_data: base64_encode(File.open(Rails.root.join("public/images/bear/bear (5).jpg"))))
Image.create(user_id: 2, file_data: base64_encode(File.open(Rails.root.join("public/images/bear/bear (6).jpg"))))
Image.create(user_id: 2, file_data: base64_encode(File.open(Rails.root.join("public/images/bear/bear (7).jpg"))))
Image.create(user_id: 2, file_data: base64_encode(File.open(Rails.root.join("public/images/bear/bear (8).jpg"))))
Image.create(user_id: 2, file_data: base64_encode(File.open(Rails.root.join("public/images/bear/bear (9).jpg"))))



Image.create(user_id: 6, file_data: base64_encode(File.open(Rails.root.join("public/images/d1.webp"))))
Image.create(user_id: 4, file_data: base64_encode(File.open(Rails.root.join("public/images/d2.webp"))))
Image.create(user_id: 5, file_data: base64_encode(File.open(Rails.root.join("public/images/d4.jpg"))))
Image.create(user_id: 6, file_data: base64_encode(File.open(Rails.root.join("public/images/d6.jpg"))))
Image.create(user_id: 5, file_data: base64_encode(File.open(Rails.root.join("public/images/d7.jpg"))))
Image.create(user_id: 7, file_data: base64_encode(File.open(Rails.root.join("public/images/d8.jpg"))))
Image.create(user_id: 4, file_data: base64_encode(File.open(Rails.root.join("public/images/d9.jpg"))))
Image.create(user_id: 7, file_data: base64_encode(File.open(Rails.root.join("public/images/d10.jpg"))))
Image.create(user_id: 8, file_data: base64_encode(File.open(Rails.root.join("public/images/husky.jpeg"))))
Image.create(user_id: 8, file_data: base64_encode(File.open(Rails.root.join("public/images/iam21.jpeg"))))
Image.create(user_id: 4, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (1).jpeg"))))
Image.create(user_id: 5, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (2).jpeg"))))
Image.create(user_id: 4, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (3).jpeg"))))
Image.create(user_id: 5, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (4).jpg"))))
Image.create(user_id: 6, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (5).jpg"))))
Image.create(user_id: 7, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (6).jpg"))))
Image.create(user_id: 8, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (7).jpg"))))
Image.create(user_id: 7, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (8).jpg"))))
Image.create(user_id: 6, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (9).jpg"))))
Image.create(user_id: 5, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (10).jpg"))))
Image.create(user_id: 4, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (11).jpg"))))
Image.create(user_id: 6, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (12).jpg"))))
Image.create(user_id: 7, file_data: base64_encode(File.open(Rails.root.join("public/images/more_dogs/more_dogs (13).jpg"))))
