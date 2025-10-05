class InsectsController < HatchlessController

  private

  def insect_params
    params.require(:insect).permit(:common_name, :scientific_name, :description)
  end
end
