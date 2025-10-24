class CreateHatchReports < ActiveRecord::Migration[8.0]
  def change
    create_table :hatch_reports do |t|
      t.references :river, null: true, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :fly_shop, null: true, foreign_key: true
      t.text :notes
      t.date :observed_on, null: false
      t.boolean :verified, default: false

      t.timestamps
    end
  end
end
