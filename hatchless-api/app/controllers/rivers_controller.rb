class RiversController < HatchlessController
  private

  def river_params
    params.require(:river).permit(:name, :description, :water_type, :designation, :designation_system, :latitude, :longitude)
  end
end
