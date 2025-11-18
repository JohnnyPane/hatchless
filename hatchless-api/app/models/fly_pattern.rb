class FlyPattern < HatchlessRecord
  include Imageable
  include Ownable

  has_many :insect_fly_patterns, dependent: :destroy
  has_many :insects, through: :insect_fly_patterns
  has_many :hot_flies, dependent: :nullify
  belongs_to :creator, polymorphic: true, optional: true

  acts_as_imageable_one :photo

  scope :publicly_available, -> { where(public: true) }
  scope :approved, -> { where(approved: true) }
  scope :actively_hatching, -> {
    joins(insects: :hatch_windows)
      .where("hatch_windows.start_day_of_year <= ? AND hatch_windows.end_day_of_year >= ?", current_day_of_year, current_day_of_year)
      .distinct
  }

  searchable_by :name
  owned_by :creator

  def imageable_fallback_url
    unless self.category.present?
      return "#{ENV['AWS_BUCKET_ASSET_HOST']}/hatchless-default-fly-pattern.jpg"
    end

    category_slug = self.category.to_s.downcase.tr(" ", "-")

    "#{ENV['AWS_BUCKET_ASSET_HOST']}/hatchless-#{category_slug}.jpg"
  end
end
