class Insect < HatchlessRecord
  has_many :hatch_windows, dependent: :destroy
  has_many :rivers, through: :hatch_windows
  has_many :insect_fly_patterns, dependent: :destroy
  has_many :fly_patterns, through: :insect_fly_patterns
  has_many :hatch_report_insects, dependent: :destroy
  has_many :hatch_reports, through: :hatch_report_insects

  searchable_by :common_name, :scientific_name
end
