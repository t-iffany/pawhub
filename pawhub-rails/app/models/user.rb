class User < ApplicationRecord
  has_secure_password #gives the following methods (password=, password_confirmation, authenticate)

  has_many :discussions
  has_many :comments
  has_many :images
end
