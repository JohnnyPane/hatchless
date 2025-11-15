class CreateFlyPacksFish < ActiveRecord::Migration[8.0]
  def change
    create_table :fly_packs_fishes do |t|
      t.references :fly_pack, null: false, foreign_key: true
      t.references :fish, null: false, foreign_key: true

      t.timestamps
    end
  end
end
