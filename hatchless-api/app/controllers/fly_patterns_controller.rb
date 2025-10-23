class FlyPatternsController < HatchlessController
  protected

  def included_index_resources
    [ :insect, :river ]
  end

  private

  def fly_pattern_params
    params.require(:fly_pattern).permit(:insect_id, :river_id, :start_day_of_year, :end_day_of_year)
  end
end