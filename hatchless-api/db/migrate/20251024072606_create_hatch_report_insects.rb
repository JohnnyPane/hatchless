class CreateHatchReportInsects < ActiveRecord::Migration[8.0]
  def change
    create_table :hatch_report_insects do |t|
      t.references :hatch_report, null: false, foreign_key: true
      t.references :insect, null: false, foreign_key: true

      t.timestamps
    end
  end
end
