class AddCompleteToGroups < ActiveRecord::Migration[5.0]
  def change
      add_column :groups, :completed, :boolean, :default => false
  end
end
