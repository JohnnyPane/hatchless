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
    def acts_as_imageable_one(name = :image)
      has_one_attached name
      @imageable_config = { type: :one, attachment_name: name }
    end

    def acts_as_imageable_many(name = :images)
      has_many_attached name
      @imageable_config = { type: :many, attachment_name: name }
    end

    def imageable_config
      @imageable_config || { type: :many, attachment_name: :images }
    end
  end

  def attached_images
    config = self.class.imageable_config

    if config[:type] == :many
      send(config[:attachment_name]).attached? ? send(config[:attachment_name]) : []

    else
      send(config[:attachment_name])
    end
  end

  def image_variants(size_key = :default)
    images = attached_images
    images = [ images ] unless images.is_a?(Array)

    images.map do |image|
      size = IMAGE_SIZES[size_key] || IMAGE_SIZES[:main_image]
      image.variant(resize_to_fit: size).processed
    end
  end

  def image_urls(size_key = :default)
    image_proxy = attached_images

    if !image_proxy.is_a?(Array) && !image_proxy.attached? && respond_to?(:imageable_fallback_url)
      return [
        {
          id: "default",
          image_url: imageable_fallback_url
        }
      ]
    end

    image_variants(size_key).map do |image|
      {
        id: image.blob.id,
        image_url: Rails.application.routes.url_helpers.rails_blob_url(image, only_path: false)
      }
    end
  end

  def thumbnail_image_urls
    image_urls(:thumbnail)
  end

  def cart_image_urls
    image_urls(:cart)
  end
end
