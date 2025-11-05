class CreatePosts < ActiveRecord::Migration[8.0]
  def change
    create_table :posts do |t|
      t.references :creator, polymorphic: true, null: false
      t.references :river, null: true, foreign_key: true
      t.text :caption

      t.timestamps
    end
  end
end
