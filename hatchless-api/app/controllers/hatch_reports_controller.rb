class HatchReportsController < HatchlessController
  before_action :authenticate_user!, only: [ :create, :update ]

  def create
    if current_user.nil?
      render json: { errors: ['Authentication required'] }, status: :unauthorized
      return
    end

    new_hatch_report = HatchReport.new(hatch_report_params.except(:insect_ids))
    new_hatch_report.user = current_user
    new_hatch_report.fly_shop = current_user.fly_shop if current_user.fly_shop.present?
    new_hatch_report.insect_ids = hatch_report_params[:insect_ids] if hatch_report_params[:insect_ids].present?

    if new_hatch_report.save
      render_resource(new_hatch_report, resource_serializer, { image_type: :main_image })
    else
      render_errors(new_hatch_report.errors, status: :unprocessable_entity)
    end
  end

  def update
    if current_user.nil?
      render json: { errors: ['Authentication required'] }, status: :unauthorized
      return
    end

    hatch_report = HatchReport.find_by(id: params[:id])

    if hatch_report.nil?
      render json: { errors: ['Hatch report not found'] }, status: :not_found
      return
    end

    if hatch_report.user != current_user
      render json: { errors: ['Permission denied'] }, status: :forbidden
      return
    end

    hatch_report.insect_ids = hatch_report_params[:insect_ids]

    if hatch_report.update(hatch_report_params.except(:insect_ids))
      render_resource(hatch_report, resource_serializer, { image_type: :main_image })
    else
      render_errors(hatch_report.errors, status: :unprocessable_entity)
    end
  end

  protected

  def included_index_resources
    [ :river, { hatch_report_insects: { insect: :fly_patterns } }, :user, :fly_shop ]
  end

  private

  def hatch_report_params
    params.require(:hatch_report).permit(
      :river_id,
      :notes,
      :observed_on,
      :verified,
      insect_ids: []
    )
  end
end
