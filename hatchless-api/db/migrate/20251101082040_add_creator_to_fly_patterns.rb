class AddCreatorToFlyPatterns < ActiveRecord::Migration[8.0]
  def change
    add_column :fly_patterns, :creator_id, :integer
    add_column :fly_patterns, :creator_type, :string
    add_column :fly_patterns, :approved, :boolean, default: false
    add_column :fly_patterns, :public, :boolean, default: false

    add_index :fly_patterns, [ :creator_type, :creator_id ]
    add_index :fly_patterns, :approved
    add_index :fly_patterns, :public
  end
end
