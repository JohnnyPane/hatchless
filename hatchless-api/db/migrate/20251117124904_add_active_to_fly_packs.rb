class AddActiveToFlyPacks < ActiveRecord::Migration[8.0]
  def change
    add_column :fly_packs, :active, :boolean, default: true, null: false
  end
end
