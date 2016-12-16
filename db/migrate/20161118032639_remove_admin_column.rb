class RemoveAdminColumn < ActiveRecord::Migration[5.0]
  def change
    remove_column :groups, :admin, :boolean
  end
end
