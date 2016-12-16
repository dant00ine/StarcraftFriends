class Vote < ApplicationRecord
  belongs_to :voter, class_name: :User, foreign_key: "voter_id"
  belongs_to :votee, class_name: :User, foreign_key: "votee_id"
  belongs_to :group
  belongs_to :character
end
