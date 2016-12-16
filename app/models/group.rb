class Group < ApplicationRecord
  belongs_to :user
  has_many :members
  has_many :users, through: :members
  has_many :votes
end
