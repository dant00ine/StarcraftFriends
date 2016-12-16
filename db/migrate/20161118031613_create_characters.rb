class CreateCharacters < ActiveRecord::Migration[5.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :sprite_url
      t.string :description

      t.timestamps
    end
  end
end
