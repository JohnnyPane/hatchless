class SeedRiverChart
  attr_reader :config, :river

  def initialize(config)
    @config = config.deep_symbolize_keys
  end

  def call
    seed_river
    puts "🦟 seeding insects for #{river[:name]}... 🦟"
    seed_insects
    puts "🪲 seeding fly patterns for #{river[:name]}... 🪲"
    seed_fly_patterns
    puts "🐣 seeding hatch windows for #{river[:name]}... 🐣"
    seed_hatch_windows
    puts "🐉 Finished seeding river chart for #{river[:name]}. 🐉"
  end

  private

  def seed_river
    @river = River.find_or_create_by!(name: config[:river][:name]) do |r|
      r.assign_attributes(config[:river].except(:name))
    end
  end

  def seed_insects
    @insects = {}
    Array(config[:insects]).each do |insect_data|
      insect = Insect.find_or_create_by!(scientific_name: insect_data[:scientific_name], common_name: insect_data[:common_name]) do |i|
        i.assign_attributes(insect_data.except(:scientific_name, :common_name))
      end
      @insects["#{insect.scientific_name}|#{insect.common_name}"] = insect
    end
  end

  def seed_fly_patterns
    @fly_patterns = {}

    Array(config[:fly_patterns]).each do |attrs|
      fly_insect_names = attrs.delete(:insects) || []

      fly_pattern = FlyPattern.find_or_initialize_by(name: attrs[:name])
      fly_pattern.assign_attributes(attrs.except(:name))
      fly_pattern.save! if fly_pattern.changed?

      fly_insect_names.each do |insect_key|
        insect = @insects[insect_key]
        unless insect
          Rails.logger.warn "⚠️ No insect found for '#{insect_key}' while seeding fly pattern #{fly_pattern.name}"
          next
        end

        InsectFlyPattern.find_or_create_by!(fly_pattern: fly_pattern, insect: insect)
      end

      @fly_patterns[fly_pattern.name] = fly_pattern
    end
  end

  def seed_hatch_windows
    Array(config[:hatch_windows]).each do |hw|
      insect = @insects[hw[:insect]]
      next unless insect
      HatchWindow.find_or_create_by!(
        river: river,
        insect: insect,
        start_day_of_year: hw[:start_day_of_year],
        end_day_of_year: hw[:end_day_of_year]
      )
    end
  end
end
