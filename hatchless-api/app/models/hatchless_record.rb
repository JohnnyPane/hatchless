class HatchlessRecord < ApplicationRecord
  self.abstract_class = true
  include Filterable
  include Orderable
  include Searchable

  def self.current_day_of_year
    Time.zone.now.yday
  end

  def current_day_of_year
    self.class.current_day_of_year
  end
end
