class CreateFish < ActiveRecord::Migration[8.0]
  def change
    create_table :fish do |t|
      t.string :common_name, null: false
      t.string :scientific_name, null: false
      t.text :description
      t.integer :water_type, null: false, default: 0

      t.timestamps
    end

    add_index :fish, :common_name
  end
end
