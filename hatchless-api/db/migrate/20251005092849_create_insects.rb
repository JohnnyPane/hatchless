class CreateInsects < ActiveRecord::Migration[8.0]
  def change
    create_table :insects do |t|
      t.string :common_name
      t.string :scientific_name
      t.text :description

      t.timestamps
    end

    add_index :insects, :common_name
  end
end
