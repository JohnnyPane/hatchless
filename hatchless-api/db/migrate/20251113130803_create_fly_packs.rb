class CreateFlyPacks < ActiveRecord::Migration[8.0]
  def change
    create_table :fly_packs do |t|
      t.string :name, null: false
      t.text :description
      t.integer :price_cents, null: false
      t.string :currency, null: false, default: 'USD'
      t.date :available_from, null: true
      t.date :available_to, null: true
      t.references :fly_shop, null: false, foreign_key: true

      t.timestamps
    end
  end
end
