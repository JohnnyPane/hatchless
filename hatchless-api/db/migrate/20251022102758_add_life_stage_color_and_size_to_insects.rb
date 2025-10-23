class AddLifeStageColorAndSizeToInsects < ActiveRecord::Migration[8.0]
  def change
    add_column :insects, :life_stage, :string
    add_column :insects, :colors, :json, default: []
    add_column :insects, :min_size, :integer
    add_column :insects, :max_size, :integer
  end
end
