class PostsController < HatchlessController
  before_action :authenticate_user!, except: [ :index, :show ]

  private

  def preloaded_polymorphic_resources
    [ :creator ]
  end

  def included_show_resources
    [ :river, { images_attachments: { blob: :variant_records } } ]
  end

  def included_index_resources
    [ :river, { images_attachments: { blob: :variant_records } } ]
  end

  def post_params
    params.require(:post).permit(:river_id, :caption, images: [])
  end
end
