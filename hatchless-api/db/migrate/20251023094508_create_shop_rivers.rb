class CreateShopRivers < ActiveRecord::Migration[8.0]
  def change
    create_table :shop_rivers do |t|
      t.references :fly_shop, null: false, foreign_key: true
      t.references :river, null: false, foreign_key: true

      t.timestamps
    end
  end
end
