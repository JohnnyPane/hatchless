class HatchlessRecord < ApplicationRecord
  self.abstract_class = true
  include Filterable
  include Orderable
  include Searchable

  def current_day_of_year
    Time.zone.now.yday
  end
end
