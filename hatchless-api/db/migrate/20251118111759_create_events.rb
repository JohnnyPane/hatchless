class CreateEvents < ActiveRecord::Migration[8.0]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.text :description
      t.datetime :start_time, null: false
      t.datetime :end_time
      t.string :location

      t.integer :price_cents
      t.integer :capacity
      t.integer :status, null: false, default: 0

      t.references :fly_shop, null: false, foreign_key: true
      t.timestamps
    end
  end
end
