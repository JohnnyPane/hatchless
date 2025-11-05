module Imageable
  extend ActiveSupport::Concern

  IMAGE_SIZES = {
    main_image: [ 1000, 1000 ],
    default: [ 600, 600 ],
    thumbnail: [ 300, 300 ],
    small: [ 200, 200 ],
    cart: [ 150, 150 ]
  }.freeze

  class_methods do
    attr_accessor :imageable_config

    def acts_as_imageable_one(name = :image)
      has_one_attached name
      @imageable_config = { type: :one, attachment_name: name }
    end

    def acts_as_imageable_many(name = :images)
      has_many_attached name
      @imageable_config = { type: :many, attachment_name: name }
    end

    def imageable_config
      @imageable_config ||= { type: :many, attachment_name: :images }
    end
  end

  def attached_images
    config = self.class.imageable_config
    attachment_proxy = send(config[:attachment_name])

    return [] unless attachment_proxy.attached?

    if config[:type] == :many
      attachment_proxy.attachments
    else
      [ attachment_proxy ]
    end
  end

  def image_variants(size_key = :default)
    attached_images.map do |image|
      size = IMAGE_SIZES[size_key] || IMAGE_SIZES[:main_image]
      image.variant(resize_to_fit: size).processed
    end
  end

  def image_urls(size_key = :default)
    variants = image_variants(size_key)

    if variants.empty?
      return [
        {
          id: "default",
          image_url: imageable_fallback_url
        }
      ]
    end

    variants.map do |image|
      {
        id: image.blob.id,
        image_url: Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true)
      }
    end
  end

  def thumbnail_image_urls
    image_urls(:thumbnail)
  end

  def cart_image_urls
    image_urls(:cart)
  end

  def imageable_fallback_url
    "#{ENV['AWS_BUCKET_ASSET_HOST']}/hatchless-default-image.jpg"
  end
end
