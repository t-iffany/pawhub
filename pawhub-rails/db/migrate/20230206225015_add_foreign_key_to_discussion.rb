class AddForeignKeyToDiscussion < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :discussions, :users
  end
end
