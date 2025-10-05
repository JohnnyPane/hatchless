class CreateHatchWindows < ActiveRecord::Migration[8.0]
  def change
    create_table :hatch_windows do |t|
      t.references :insect, null: false, foreign_key: true
      t.references :river, null: false, foreign_key: true
      t.integer :start_day_of_year, null: false
      t.integer :end_day_of_year, null: false
      t.text :notes

      t.timestamps
    end
  end
end
