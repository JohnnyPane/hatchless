class InsectsController < HatchlessController

  private

  def included_index_resources
    [ :fly_patterns ]
  end

  def insect_params
    params.require(:insect).permit(:common_name, :scientific_name, :description)
  end
end
