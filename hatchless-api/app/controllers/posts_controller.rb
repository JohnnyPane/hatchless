class PostsController < HatchlessController
  before_action :authenticate_user!, except: [ :index, :show ]

  private

  def preloaded_polymorphic_resources
    [ :creator ]
  end

  def included_show_resources
    [ :river, { images_attachments: :blob } ]
  end

  def included_index_resources
    [ :river, { images_attachments: :blob } ]
  end

  def post_params
    permitted_params = params.require(:post).permit(:river_id, :caption, images: [])

    creator = if current_user.fly_shop.present?
                current_user.fly_shop
              else
                current_user
              end

    permitted_params.merge(creator: creator)
  end
end
