class AddUserToDiscussions < ActiveRecord::Migration[6.1]
  def change
    add_reference :discussions, :user
  end
end
