class CreateVotes < ActiveRecord::Migration[5.0]
  def change
    create_table :votes do |t|
      t.references :voter, foreign_key: true
      t.references :votee, foreign_key: true
      t.references :group, foreign_key: true
      t.references :character, foreign_key: true

      t.timestamps
    end
  end
end
