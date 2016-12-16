class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :groups
  has_many :votes
  has_many :friends, through: :friends
  has_many :friendships, foreign_key: "user_id", class_name: "Friend"
  has_many :groups, through: :members
end
