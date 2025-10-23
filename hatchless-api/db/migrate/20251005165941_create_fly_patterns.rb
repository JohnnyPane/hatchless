class CreateFlyPatterns < ActiveRecord::Migration[8.0]
  def change
    create_table :fly_patterns do |t|
      t.string :name, null: false
      t.text :notes
      t.string :category
      t.string :image_url

      t.timestamps
    end
  end
end
