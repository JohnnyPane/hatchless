class HatchWindowsController < HatchlessController
  protected

  def included_index_resources
    [ insect: :fly_patterns ]
  end

  private

  def hatch_window_params
    params.require(:hatch_window).permit(:insect_id, :river_id, :start_day_of_year, :end_day_of_year)
  end
end
