class CreateFlyPackItem < ActiveRecord::Migration[8.0]
  def change
    create_table :fly_pack_items do |t|
      t.references :fly_pack, null: false, foreign_key: true
      t.references :fly_pattern, null: false, foreign_key: true
      t.integer :quantity, null: false, default: 1

      t.timestamps
    end
  end
end
