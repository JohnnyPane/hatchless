class CreateFlyShops < ActiveRecord::Migration[8.0]
  def change
    create_table :fly_shops do |t|
      t.string :name, null: false
      t.text :description
      t.string :website_url
      t.string :phone_number
      t.string :email
      t.references :owner, null: true, foreign_key: { to_table: :users }

      t.timestamps
    end

    add_index :fly_shops, :name, unique: true
  end
end
