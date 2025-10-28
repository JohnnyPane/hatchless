class RiversController < HatchlessController
  protected

  def included_index_resources
    [ :fly_shops ]
  end

  def included_show_resources
    [ :fly_shops, hatch_windows:  { insect: :fly_patterns }, hatch_reports: [ :user, :fly_shop, { insects: :fly_patterns } ] ]
  end

  private

  def river_params
    params.require(:river).permit(:name, :description, :water_type, :designation, :designation_system, :latitude, :longitude)
  end
end
