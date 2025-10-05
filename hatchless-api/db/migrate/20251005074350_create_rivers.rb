class CreateRivers < ActiveRecord::Migration[8.0]
  def change
    create_table :rivers do |t|
      t.string :name
      t.string :description
      t.integer :water_type
      t.string :designation
      t.string :designation_system
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
