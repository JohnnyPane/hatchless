class CreateHotFlies < ActiveRecord::Migration[8.0]
  def change
    create_table :hot_flies do |t|
      t.references :fly_shop, null: false, foreign_key: true
      t.references :fly_pattern, null: false, foreign_key: true
      t.references :river, null: true, foreign_key: true

      t.boolean :active, null: false, default: true
      t.datetime :expires_at, null: true
      t.text :notes, null: true

      t.timestamps
    end
  end
end
