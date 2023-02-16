class ChangeAvatarToADifferentType < ActiveRecord::Migration[6.1]
  def up
    change_column :users, :avatar, :binary
  end

  def up
    change_column :users, :avatar, :string
  end
end
