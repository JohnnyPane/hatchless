class HatchlessController < ApplicationController
  include Renderable

  def index
    paginated_resources = resource_class
                            .page(page)
                            .per(per_page)
                            .apply_ordering(ordering)
                            .apply_scopes(scopes)
                            .apply_filters(filters)
                            .apply_search(search)

    paginated_resources = paginated_resources.includes(*included_index_resources) if included_index_resources.present?
    paginated_resources = paginated_resources.preload(*preloaded_polymorphic_resources) if preloaded_polymorphic_resources.present?
    paginated_resources = paginated_resources.public_send("with_attached_#{attachment_name}") if attachment_name.present?

    render_resource_collection(paginated_resources, resource_serializer, { image_type: image_size })
  end

  def show
    render_resource(resource, resource_serializer, { image_type: :main_image, show_page: true })
  end

  def create
    new_resource = resource_class.new(resource_params)

    if new_resource.save
      render_resource(new_resource, resource_serializer, { image_type: :main_image })
    else
      render_errors(new_resource.errors, status: :unprocessable_entity)
    end
  end

  def update
    if resource.update(resource_params)
      render_resource(resource, resource_serializer, { image_type: :main_image })
    else
      render_errors(resource.errors, status: :unprocessable_entity)
    end
  end

  def destroy
    if resource.destroy
      head :no_content
    else
      render_errors(resource.errors, status: :unprocessable_entity)
    end
  end

  def upload_images
    attachment_config = resource.class.imageable_config
    attachment_name = attachment_config[:attachment_name]
    attachment_proxy = resource.send(attachment_name)
    files_to_attach = params[:images]

    if attachment_config[:type] == :one
      files_to_attach = Array(params[:images]).first
    end

    if attachment_proxy.attach(files_to_attach)
      render_resource(resource, resource_serializer)
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end


  private

  def resource
    @resource ||= resource_class.find(params[:id])
  end

  def resource_class
    controller_name.classify.constantize
  end

  def resource_params
    if respond_to?("#{resource_class.name.underscore}_params", true)
      send("#{resource_class.name.underscore}_params")
    end

  rescue ActionController::ParameterMissing => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def resource_serializer
    "#{resource_class}Serializer".constantize
  end

  def page
    (params[:page] || 1).to_i
  end

  def per_page
    (params[:per_page] || 25).to_i
  end

  def filters
    params[:filters] || {}
  end

  def scopes
    params[:scopes] || []
  end

  def sort_column
    params[:sort_column] || 'id'
  end

  def sort_direction
    direction = params[:sort_direction] || 'asc'
    raise "Invalid sort direction: #{direction}" unless %w[asc desc].include?(direction)

    direction
  end

  def ordering
    { field: sort_column, direction: sort_direction }
  end

  def search
    params[:search] || {}
  end

  def image_size
    params[:image_size] || :default
  end

  def included_index_resources
    []
  end

  def included_show_resources
    []
  end

  def preloaded_polymorphic_resources
    []
  end

  def attachment_name
    if resource_class.respond_to?(:imageable_config)
      resource_class.imageable_config[:attachment_name]
    end
  end

  def render_errors(errors, status: :unprocessable_content)
    render json: { errors: errors.full_messages }, status: status
  rescue NoMethodError
    render json: { errors: errors }, status: status
  end
end
