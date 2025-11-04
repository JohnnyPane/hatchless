class RemoveImageUrlFromFlyPattern < ActiveRecord::Migration[8.0]
  def change
    remove_column :fly_patterns, :image_url, :string
  end
end
