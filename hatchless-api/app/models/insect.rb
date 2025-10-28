class Insect < HatchlessRecord
  has_many :hatch_windows, dependent: :destroy
  has_many :rivers, through: :hatch_windows
  has_many :insect_fly_patterns, dependent: :destroy
  has_many :fly_patterns, through: :insect_fly_patterns
  has_many :hatch_report_insects, dependent: :destroy
  has_many :hatch_reports, through: :hatch_report_insects

  scope :currently_hatching_for_river, ->(river_id) {
    joins(:hatch_windows)
      .where(hatch_windows: { river_id: river_id })
      .where('hatch_windows.start_day_of_year <= ? AND hatch_windows.end_day_of_year >= ?', current_day_of_year, current_day_of_year)
      .select(:id, :common_name, :scientific_name, :description, :min_size, :max_size)
      .distinct
      .includes(:fly_patterns)
  }

  searchable_by :common_name, :scientific_name
end
