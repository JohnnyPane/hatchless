class HatchWindow < HatchlessRecord
  belongs_to :insect
  belongs_to :river

  scope :by_river, ->(river_id) { where(river_id: river_id) }
  scope :currently_hatching, -> {
    today = Date.today.yday
    normal_hatches = where("start_day_of_year <= end_day_of_year")
                       .where("start_day_of_year <= ? AND end_day_of_year >= ?", today, today)
    wraparound_hatches = where("start_day_of_year > end_day_of_year")
                           .where("start_day_of_year <= ? OR end_day_of_year >= ?", today, today)
    normal_hatches.or(wraparound_hatches)
  }

  def hatching?(date = Date.today)
    day_of_year = date.yday

    if hatch_start_day <= hatch_end_day
      day_of_year >= hatch_start_day && day_of_year <= hatch_end_day
    else
      (hatch_start_day..365).cover?(day_of_year) || (1..hatch_end_day).cover?(day_of_year)
    end
  end

  def hatch_duration
    if end_day_of_year >= hatch_start_day
      (end_day_of_year - hatch_start_day).to_i + 1
    else
      (end_day_of_year + 1.year - hatch_start_day).to_i + 1
    end
  end

  def hatch_start_day
    start_day_of_year
  end

  def hatch_end_day
    end_day_of_year
  end
end
