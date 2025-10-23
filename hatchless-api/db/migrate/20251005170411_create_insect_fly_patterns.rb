class CreateInsectFlyPatterns < ActiveRecord::Migration[8.0]
  def change
    create_table :insect_fly_patterns do |t|
      t.references :insect, null: false, foreign_key: true
      t.references :fly_pattern, null: false, foreign_key: true

      t.timestamps
    end
  end
end
