class FlyPattern < HatchlessRecord
  has_many :insect_fly_patterns, dependent: :destroy
  has_many :insects, through: :insect_fly_patterns
  has_many :hot_flies, dependent: :nullify

  scope :actively_hatching, -> {
    joins(insects: :hatch_windows)
      .where('hatch_windows.start_day_of_year <= ? AND hatch_windows.end_day_of_year >= ?', current_day_of_year, current_day_of_year)
      .distinct
  }

  searchable_by :name
end
