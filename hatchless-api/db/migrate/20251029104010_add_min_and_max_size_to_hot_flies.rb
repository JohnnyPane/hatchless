class AddMinAndMaxSizeToHotFlies < ActiveRecord::Migration[8.0]
  def change
    add_column :hot_flies, :min_size, :integer
    add_column :hot_flies, :max_size, :integer
  end
end
