class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password
      t.string :dog_name
      t.string :breed
      t.text :description
      t.string :image
      t.string :avatar

      t.timestamps
    end
  end
end
