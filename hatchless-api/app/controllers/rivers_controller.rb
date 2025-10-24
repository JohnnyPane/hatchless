class RiversController < HatchlessController
  protected

  def included_index_resources
    [ :fly_shops, insects: :fly_patterns ]
  end

  def included_show_resources
    [ :fly_shops, insects: :fly_patterns ]
  end

  private

  def river_params
    params.require(:river).permit(:name, :description, :water_type, :designation, :designation_system, :latitude, :longitude)
  end
end
