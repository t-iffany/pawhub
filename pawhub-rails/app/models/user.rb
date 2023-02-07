class User < ApplicationRecord
  has_many :discussions
  has_many :comments
end
