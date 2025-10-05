class River < HatchlessRecord
  enum :water_type, { tailwater: 0, freestone: 1, spring_creek: 2 }

  validates :name, presence: true

  has_many :hatch_windows, dependent: :destroy
  has_many :insects, through: :hatch_windows

  def currently_hatching_insects
    insects.joins(:hatch_windows)
           .where('hatch_windows.start_day_of_year <= ? AND hatch_windows.end_day_of_year >= ?', current_day_of_year, current_day_of_year)
           .distinct
  end
end
